import { prisma } from "@/server/db/prisma";

import { hashAdminPassword } from "./password";
import { adminCredentialsSchema } from "./validation";

export class AdminCreationError extends Error {
  constructor(public readonly code: "ALREADY_EXISTS" | "INVALID_INPUT") {
    super(code);
    this.name = "AdminCreationError";
  }
}

export class AdminResetError extends Error {
  constructor(public readonly code: "NOT_FOUND" | "INVALID_INPUT") {
    super(code);
    this.name = "AdminResetError";
  }
}

function isUniqueConstraintError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

export async function createInitialAdmin(login: string, password: string) {
  const credentials = adminCredentialsSchema.safeParse({ login, password });
  if (!credentials.success) {
    throw new AdminCreationError("INVALID_INPUT");
  }

  const existing = await prisma.adminUser.findFirst({ select: { id: true } });
  if (existing) throw new AdminCreationError("ALREADY_EXISTS");

  const passwordHash = await hashAdminPassword(credentials.data.password);

  try {
    return await prisma.adminUser.create({
      data: { login: credentials.data.login, passwordHash },
      select: { id: true, login: true },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw new AdminCreationError("ALREADY_EXISTS");
    }
    throw error;
  }
}

export async function resetAdminPassword(login: string, password: string) {
  const credentials = adminCredentialsSchema.safeParse({ login, password });
  if (!credentials.success) {
    throw new AdminResetError("INVALID_INPUT");
  }

  const passwordHash = await hashAdminPassword(credentials.data.password);

  return prisma.$transaction(async (transaction) => {
    const admin = await transaction.adminUser.findUnique({
      where: { login: credentials.data.login },
      select: { id: true, login: true },
    });
    if (!admin) throw new AdminResetError("NOT_FOUND");

    await transaction.adminUser.update({
      where: { id: admin.id },
      data: { passwordHash },
      select: { id: true },
    });

    await transaction.adminSession.updateMany({
      where: { adminUserId: admin.id, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    return admin;
  });
}
