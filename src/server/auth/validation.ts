import { z } from "zod";

export const adminLoginSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(100)
  .regex(/^[a-z0-9._@+-]+$/);

export const adminPasswordSchema = z.string().min(12).max(256);

export const adminCredentialsSchema = z.object({
  login: adminLoginSchema,
  password: adminPasswordSchema,
});
