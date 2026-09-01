import { prisma } from "@/server/db/prisma";

import { createAdminSession } from "./session";
import {
  clearAdminLoginAttempts,
  consumeAdminLoginAttempt,
} from "./login-rate-limit";
import { hashAdminPassword, verifyAdminPassword } from "./password";
import { adminCredentialsSchema } from "./validation";

export type AdminAuthenticationResult =
  | { authenticated: false }
  | { authenticated: true; token: string; expiresAt: Date };

export async function authenticateAdmin(
  rawLogin: unknown,
  rawPassword: unknown,
): Promise<AdminAuthenticationResult> {
  const credentials = adminCredentialsSchema.safeParse({
    login: rawLogin,
    password: rawPassword,
  });
  if (!credentials.success) return { authenticated: false };

  const admin = await prisma.adminUser.findUnique({
    where: { login: credentials.data.login },
    select: { id: true, passwordHash: true },
  });
  const rateLimitSubject = admin ? `account:${admin.id}` : "unknown-account";

  if (!(await consumeAdminLoginAttempt(rateLimitSubject))) {
    return { authenticated: false };
  }

  // Unknown accounts still pay the Argon2 cost without keeping a reusable dummy password.
  let passwordMatches = false;
  if (admin) {
    passwordMatches = await verifyAdminPassword(
      admin.passwordHash,
      credentials.data.password,
    );
  } else {
    await hashAdminPassword(credentials.data.password);
  }

  if (!admin || !passwordMatches) return { authenticated: false };

  await clearAdminLoginAttempts(rateLimitSubject);
  const session = await createAdminSession(admin.id);
  return { authenticated: true, ...session };
}
