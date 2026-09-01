import { prisma } from "@/server/db/prisma";

import { formatClassCode, generateClassCode, hashClassCode } from "./code";

export class ClassAccessNotFoundError extends Error {
  constructor() {
    super("CLASS_ACCESS_NOT_FOUND");
    this.name = "ClassAccessNotFoundError";
  }
}

/**
 * Creates the classroom's access code if none exists yet, or replaces the
 * existing one (active or disabled) with a fresh code. Either way, every
 * live student session for this classroom is revoked immediately so a
 * rotated code always starts from a clean slate.
 *
 * Returns the plaintext code exactly once — it is never persisted or
 * retrievable afterwards.
 */
export async function rotateClassAccessCode(classroomId: string) {
  const code = generateClassCode();
  const codeHash = hashClassCode(code);

  await prisma.$transaction([
    prisma.classAccessCode.upsert({
      where: { classroomId },
      create: { classroomId, codeHash, active: true },
      update: { codeHash, active: true },
      select: { id: true },
    }),
    prisma.classSession.updateMany({
      where: { classroomId, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  return { code: formatClassCode(code) };
}

/**
 * Disables the classroom's access and revokes every live student session.
 * The code itself is left hashed in place (unusable while active=false) —
 * reopening access requires generating a new code via rotateClassAccessCode.
 */
export async function disableClassAccessCode(classroomId: string) {
  const [disabled] = await prisma.$transaction([
    prisma.classAccessCode.updateMany({
      where: { classroomId, active: true },
      data: { active: false },
    }),
    prisma.classSession.updateMany({
      where: { classroomId, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  if (disabled.count === 0) {
    throw new ClassAccessNotFoundError();
  }
}
