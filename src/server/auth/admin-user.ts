import { prisma } from "@/server/db/prisma";

import { hashAdminPassword } from "./password";
import { adminCredentialsSchema } from "./validation";

export class AdminCreationError extends Error {
  constructor(public readonly code: "ALREADY_EXISTS" | "INVALID_INPUT") {
    super(code);
    this.name = "AdminCreationError";
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
