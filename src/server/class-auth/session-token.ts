import { createHmac } from "node:crypto";

import { prisma } from "@/server/db/prisma";

import { getClassSessionSecret } from "./config";

export type AuthenticatedClass = {
  classroomId: string;
};

export function hashClassSessionToken(token: string) {
  return createHmac("sha256", getClassSessionSecret())
    .update(`class-session:${token}`)
    .digest("hex");
}

export function isClassSessionToken(token: string) {
  return /^[A-Za-z0-9_-]{43}$/.test(token);
}

export async function getClassroomBySessionToken(
  token: string | undefined,
  now = new Date(),
): Promise<AuthenticatedClass | null> {
  if (!token || !isClassSessionToken(token)) return null;

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
