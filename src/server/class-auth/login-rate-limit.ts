import { createHmac } from "node:crypto";

import { prisma } from "@/server/db/prisma";

import { getClassSessionSecret } from "./config";
import {
  CLASS_CODE_LOGIN_BLOCK_MS,
  CLASS_CODE_LOGIN_MAX_ATTEMPTS,
  CLASS_CODE_LOGIN_WINDOW_MS,
} from "./constants";

// HMAC (jamais un simple hash) : le secret serveur empêche de reconstituer
// l'IP par dictionnaire/rainbow table même si la base fuit. La valeur brute
// passée ici (ex: une IP) n'est jamais retournée ni journalisée.
export function getClassCodeRateLimitKey(subject: string) {
  return createHmac("sha256", getClassSessionSecret())
    .update(`class-code-attempt:${subject}`)
    .digest("hex");
}

export async function consumeClassCodeAttempt(
  subject: string,
  now = new Date(),
) {
  const keyHash = getClassCodeRateLimitKey(subject);

  return prisma.$transaction(async (transaction) => {
    await transaction.$queryRaw<Array<{ locked: number }>>`
      SELECT 1::integer AS locked
      FROM pg_advisory_xact_lock(hashtextextended(${keyHash}, 0))
    `;

    const current = await transaction.classCodeRateLimit.findUnique({
      where: { keyHash },
      select: {
        attemptCount: true,
        blockedUntil: true,
        windowStartedAt: true,
      },
    });

    if (current?.blockedUntil && current.blockedUntil > now) return false;

    const windowExpired =
      !current ||
      now.getTime() - current.windowStartedAt.getTime() >=
        CLASS_CODE_LOGIN_WINDOW_MS;
    const attemptCount = windowExpired ? 1 : current.attemptCount + 1;
    const blockedUntil =
      attemptCount >= CLASS_CODE_LOGIN_MAX_ATTEMPTS
        ? new Date(now.getTime() + CLASS_CODE_LOGIN_BLOCK_MS)
        : null;

    await transaction.classCodeRateLimit.upsert({
      where: { keyHash },
      create: {
        keyHash,
        attemptCount,
        windowStartedAt: now,
        blockedUntil,
      },
      update: {
        attemptCount,
        windowStartedAt: windowExpired ? now : current.windowStartedAt,
        blockedUntil,
      },
      select: { keyHash: true },
    });

    return true;
  });
}

export async function clearClassCodeAttempts(subject: string) {
  await prisma.classCodeRateLimit.deleteMany({
    where: { keyHash: getClassCodeRateLimitKey(subject) },
  });
}
