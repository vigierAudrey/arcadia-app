import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { z } from "zod";

import { PrismaClient } from "@/generated/prisma/client";

const databaseEnvironmentSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1)
    .refine(
      (value) => value.startsWith("postgresql://") || value.startsWith("postgres://"),
      "DATABASE_URL must use PostgreSQL",
    ),
});

function createPrismaClient() {
  const environment = databaseEnvironmentSchema.safeParse(process.env);

  if (!environment.success) {
    throw new Error("Database configuration is invalid.");
  }

  const adapter = new PrismaPg({
    connectionString: environment.data.DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 10_000,
    statement_timeout: 5_000,
    query_timeout: 6_000,
  });

  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
