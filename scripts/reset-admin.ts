import { Writable } from "node:stream";
import { createInterface } from "node:readline/promises";

import {
  AdminResetError,
  resetAdminPassword,
} from "../src/server/auth/admin-user";
import { adminCredentialsSchema } from "../src/server/auth/validation";
import { prisma } from "../src/server/db/prisma";

class PromptOutput extends Writable {
  muted = false;

  override _write(
    chunk: Buffer | string,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ) {
    if (!this.muted) process.stdout.write(chunk);
    callback();
  }
}

async function main() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error("Cette commande doit être exécutée dans un terminal interactif.");
  }

  const output = new PromptOutput();
  const prompt = createInterface({
    input: process.stdin,
    output,
    terminal: true,
  });

  try {
    const login = await prompt.question("Identifiant admin à réinitialiser : ");

    process.stdout.write("Nouveau mot de passe (12 caractères minimum) : ");
    output.muted = true;
    const password = await prompt.question("");
    output.muted = false;
    process.stdout.write("\nConfirmez le mot de passe : ");
    output.muted = true;
    const confirmation = await prompt.question("");
    output.muted = false;
    process.stdout.write("\n");

    if (password !== confirmation) {
      throw new Error("Les mots de passe ne correspondent pas.");
    }

    if (!adminCredentialsSchema.safeParse({ login, password }).success) {
      throw new Error(
        "Identifiant invalide ou mot de passe de moins de 12 caractères.",
      );
    }

    const admin = await resetAdminPassword(login, password);
    process.stdout.write(`Mot de passe réinitialisé pour « ${admin.login} ».\n`);
  } finally {
    output.muted = false;
    prompt.close();
  }
}

main()
  .catch((error: unknown) => {
    if (error instanceof AdminResetError && error.code === "NOT_FOUND") {
      process.stderr.write("Compte administrateur introuvable.\n");
    } else {
      process.stderr.write(
        `${error instanceof Error ? error.message : "Réinitialisation impossible."}\n`,
      );
    }
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
