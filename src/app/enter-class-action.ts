"use server";

import { redirect } from "next/navigation";

import { authenticateClassCode } from "@/server/class-auth/authenticate";
import { getClassSessionSecret } from "@/server/class-auth/config";
import { setClassSessionCookie } from "@/server/class-auth/session";

export type ClassEntryState = {
  message: string | null;
};

const invalidCodeMessage =
  "Code invalide. Vérifie-le ou demande-le à ton enseignant·e.";

export async function enterClassAction(
  _previousState: ClassEntryState,
  formData: FormData,
): Promise<ClassEntryState> {
  // Configuration errors are intentionally not disguised as an invalid code.
  getClassSessionSecret();

  const result = await authenticateClassCode(formData.get("code"));

  if (!result.authenticated) {
    return { message: invalidCodeMessage };
  }

  await setClassSessionCookie(result.token, result.expiresAt);
  redirect("/classe");
}
