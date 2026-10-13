import { createHmac } from "node:crypto";

import { prisma } from "@/server/db/prisma";

import { getAdminSessionSecret } from "./config";

export type AuthenticatedAdmin = {
  id: string;
  login: string;
};

export function hashAdminSessionToken(token: string) {
  return createHmac("sha256", getAdminSessionSecret())
    .update(token)
    .digest("hex");
}

export function isAdminSessionToken(token: string) {
  return /^[A-Za-z0-9_-]{43}$/.test(token);
}

export async function getAdminBySessionToken(
  token: string | undefined,
  now = new Date(),
): Promise<AuthenticatedAdmin | null> {
  if (!token || !isAdminSessionToken(token)) return null;

  const session = await prisma.adminSession.findUnique({
    where: { tokenHash: hashAdminSessionToken(token) },
    select: {
      expiresAt: true,
      revokedAt: true,
      adminUser: { select: { id: true, login: true } },
    },
  });

  if (!session || session.revokedAt || session.expiresAt <= now) return null;

  return session.adminUser;
}
