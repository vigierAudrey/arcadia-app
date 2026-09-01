import { z } from "zod";

const sessionSecretSchema = z
  .string()
  .min(32)
  .max(512)
  .refine((value) => value === value.trim());

export function getAdminSessionSecret() {
  const result = sessionSecretSchema.safeParse(
    process.env.ADMIN_SESSION_SECRET,
  );

  if (!result.success) {
    throw new Error(
      "ADMIN_SESSION_SECRET is required and must contain 32 to 512 non-whitespace-surrounded characters.",
    );
  }

  return result.data;
}
