import { createHmac } from "node:crypto";

import { prisma } from "@/server/db/prisma";

import { getAdminSessionSecret } from "./config";
import {
  ADMIN_LOGIN_BLOCK_MS,
  ADMIN_LOGIN_MAX_ATTEMPTS,
  ADMIN_LOGIN_WINDOW_MS,
} from "./constants";

export function getAdminLoginRateLimitKey(subject: string) {
  return createHmac("sha256", getAdminSessionSecret())
    .update(`admin-login:${subject}`)
    .digest("hex");
}

export async function consumeAdminLoginAttempt(
  subject: string,
  now = new Date(),
) {
  const keyHash = getAdminLoginRateLimitKey(subject);

  return prisma.$transaction(async (transaction) => {
    await transaction.$queryRaw<Array<{ locked: number }>>`
      SELECT 1::integer AS locked
      FROM pg_advisory_xact_lock(hashtextextended(${keyHash}, 0))
    `;

    const current = await transaction.adminLoginRateLimit.findUnique({
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
        ADMIN_LOGIN_WINDOW_MS;
    const attemptCount = windowExpired ? 1 : current.attemptCount + 1;
    const blockedUntil =
      attemptCount >= ADMIN_LOGIN_MAX_ATTEMPTS
        ? new Date(now.getTime() + ADMIN_LOGIN_BLOCK_MS)
        : null;

    await transaction.adminLoginRateLimit.upsert({
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

export async function clearAdminLoginAttempts(subject: string) {
  await prisma.adminLoginRateLimit.deleteMany({
    where: { keyHash: getAdminLoginRateLimitKey(subject) },
  });
}
