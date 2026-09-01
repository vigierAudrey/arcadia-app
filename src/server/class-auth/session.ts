import { createHmac, randomBytes } from "node:crypto";

import { cookies } from "next/headers";

import { prisma } from "@/server/db/prisma";

import { getClassSessionSecret } from "./config";
import {
  CLASS_SESSION_COOKIE,
  CLASS_SESSION_DURATION_MS,
} from "./constants";

export type AuthenticatedClass = {
  classroomId: string;
};

export function hashClassSessionToken(token: string) {
  return createHmac("sha256", getClassSessionSecret())
    .update(`class-session:${token}`)
    .digest("hex");
}

function isSessionToken(token: string) {
  return /^[A-Za-z0-9_-]{43}$/.test(token);
}

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

export async function getClassroomBySessionToken(
  token: string | undefined,
  now = new Date(),
): Promise<AuthenticatedClass | null> {
  if (!token || !isSessionToken(token)) return null;

  const session = await prisma.classSession.findUnique({
    where: { tokenHash: hashClassSessionToken(token) },
    select: {
      expiresAt: true,
      revokedAt: true,
      classroom: {
        select: {
          id: true,
          archivedAt: true,
          classAccessCode: { select: { active: true } },
        },
      },
    },
  });

  if (
    !session ||
    session.revokedAt ||
    session.expiresAt <= now ||
    session.classroom.archivedAt ||
    !session.classroom.classAccessCode?.active
  ) {
    return null;
  }

  return { classroomId: session.classroom.id };
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
  if (!token || !isSessionToken(token)) return false;

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
