import { randomBytes } from "node:crypto";

import { cookies } from "next/headers";

import { prisma } from "@/server/db/prisma";

import {
  CLASS_SESSION_COOKIE,
  CLASS_SESSION_DURATION_MS,
} from "./constants";
import {
  getClassroomBySessionToken,
  hashClassSessionToken,
  isClassSessionToken,
  type AuthenticatedClass,
} from "./session-token";

export { getClassroomBySessionToken, hashClassSessionToken };
export type { AuthenticatedClass };

export async function createClassSession(
  classroomId: string,
  now = new Date(),
) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(now.getTime() + CLASS_SESSION_DURATION_MS);

  await prisma.classSession.create({
    data: {
      classroomId,
      tokenHash: hashClassSessionToken(token),
      expiresAt,
    },
    select: { id: true },
  });

  return { token, expiresAt };
}

export async function setClassSessionCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set(CLASS_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export async function revokeClassSession(
  token: string | undefined,
  now = new Date(),
) {
  void now;
  if (!token || !isClassSessionToken(token)) return false;

  const result = await prisma.classSession.updateMany({
    where: {
      tokenHash: hashClassSessionToken(token),
      revokedAt: null,
    },
    data: { revokedAt: now },
  });

  return result.count > 0;
}

export async function clearClassSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(CLASS_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
}

export async function getClassSessionCookie() {
  return (await cookies()).get(CLASS_SESSION_COOKIE)?.value;
}
