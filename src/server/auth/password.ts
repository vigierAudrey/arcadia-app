import { argon2id, hash, verify } from "argon2";

const passwordHashOptions = {
  type: argon2id,
  memoryCost: 65_536,
  timeCost: 3,
  parallelism: 1,
  hashLength: 32,
} as const;

export function hashAdminPassword(password: string) {
  return hash(password, passwordHashOptions);
}

export async function verifyAdminPassword(
  passwordHash: string,
  password: string,
) {
  try {
    return await verify(passwordHash, password);
  } catch {
    return false;
  }
}
