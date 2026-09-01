import { prisma } from "@/server/db/prisma";

import { getClientIpSubject } from "./client-ip";
import { hashClassCode } from "./code";
import {
  clearClassCodeAttempts,
  consumeClassCodeAttempt,
} from "./login-rate-limit";
import { createClassSession } from "./session";
import { classCodeSchema } from "./validation";

export type ClassAuthenticationResult =
  | { authenticated: false }
  | { authenticated: true; token: string; expiresAt: Date };

export async function authenticateClassCode(
  rawCode: unknown,
  // Overridable only so tests can supply an isolated bucket instead of
  // reading the real request's IP (unavailable outside a request scope).
  subject?: string,
): Promise<ClassAuthenticationResult> {
  const parsed = classCodeSchema.safeParse(rawCode);
  if (!parsed.success) return { authenticated: false };

  const rateLimitSubject = subject ?? (await getClientIpSubject());
  if (!(await consumeClassCodeAttempt(rateLimitSubject))) {
    return { authenticated: false };
  }

  const access = await prisma.classAccessCode.findFirst({
    where: {
      codeHash: hashClassCode(parsed.data),
      active: true,
      classroom: { archivedAt: null },
    },
    select: { classroomId: true },
  });

  if (!access) return { authenticated: false };

  await clearClassCodeAttempts(rateLimitSubject);
  const session = await createClassSession(access.classroomId);
  return { authenticated: true, ...session };
}
