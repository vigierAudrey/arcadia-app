"use server";

import { redirect } from "next/navigation";

import { authenticateAdmin } from "@/server/auth/authenticate";
import { getAdminSessionSecret } from "@/server/auth/config";
import { setAdminSessionCookie } from "@/server/auth/session";

export type AdminLoginState = {
  message: string | null;
};

const invalidCredentialsMessage =
  "Connexion impossible. Vérifiez vos informations et réessayez plus tard.";

export async function loginAdminAction(
  _previousState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  // Configuration errors are intentionally not disguised as credential failures.
  getAdminSessionSecret();

  let result;
  try {
    result = await authenticateAdmin(
      formData.get("login"),
      formData.get("password"),
    );
  } catch {
    return { message: invalidCredentialsMessage };
  }

  if (!result.authenticated) {
    return { message: invalidCredentialsMessage };
  }

  await setAdminSessionCookie(result.token, result.expiresAt);
  redirect("/admin");
}
