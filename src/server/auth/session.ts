import { randomBytes } from "node:crypto";

import { cookies } from "next/headers";

import { prisma } from "@/server/db/prisma";

import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_DURATION_MS,
} from "./constants";
import {
  getAdminBySessionToken,
  hashAdminSessionToken,
  isAdminSessionToken,
  type AuthenticatedAdmin,
} from "./session-token";

export { getAdminBySessionToken, hashAdminSessionToken };
export type { AuthenticatedAdmin };

export async function createAdminSession(
  adminUserId: string,
  now = new Date(),
) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(now.getTime() + ADMIN_SESSION_DURATION_MS);

  await prisma.adminSession.create({
    data: {
      adminUserId,
      tokenHash: hashAdminSessionToken(token),
      expiresAt,
    },
    select: { id: true },
  });

  return { token, expiresAt };
}

export async function setAdminSessionCookie(
  token: string,
  expiresAt: Date,
) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export async function revokeAdminSession(
  token: string | undefined,
  now = new Date(),
) {
  void now;
  if (!token || !isAdminSessionToken(token)) return false;

  const result = await prisma.adminSession.updateMany({
    where: {
      tokenHash: hashAdminSessionToken(token),
      revokedAt: null,
    },
    data: { revokedAt: now },
  });

  return result.count > 0;
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
}

export async function getAdminSessionCookie() {
  return (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
}
