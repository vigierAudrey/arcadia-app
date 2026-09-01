import { createHmac, randomBytes } from "node:crypto";

import { cookies } from "next/headers";

import { prisma } from "@/server/db/prisma";

import { getAdminSessionSecret } from "./config";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_DURATION_MS,
} from "./constants";

export type AuthenticatedAdmin = {
  id: string;
  login: string;
};

export function hashAdminSessionToken(token: string) {
  return createHmac("sha256", getAdminSessionSecret())
    .update(token)
    .digest("hex");
}

function isSessionToken(token: string) {
  return /^[A-Za-z0-9_-]{43}$/.test(token);
}

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

export async function getAdminBySessionToken(
  token: string | undefined,
  now = new Date(),
): Promise<AuthenticatedAdmin | null> {
  if (!token || !isSessionToken(token)) return null;

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
  if (!token || !isSessionToken(token)) return false;

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
