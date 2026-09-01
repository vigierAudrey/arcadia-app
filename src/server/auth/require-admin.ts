import { redirect } from "next/navigation";

import { getAdminSessionSecret } from "./config";
import {
  getAdminBySessionToken,
  getAdminSessionCookie,
} from "./session";

export class AdminAccessError extends Error {
  constructor() {
    super("ADMIN_ACCESS_REQUIRED");
    this.name = "AdminAccessError";
  }
}

export async function requireAdminFromToken(token: string | undefined) {
  getAdminSessionSecret();
  const admin = await getAdminBySessionToken(token);
  if (!admin) throw new AdminAccessError();
  return admin;
}

export async function requireAdmin() {
  return requireAdminFromToken(await getAdminSessionCookie());
}

export async function requireAdminPage() {
  getAdminSessionSecret();
  const admin = await getAdminBySessionToken(await getAdminSessionCookie());
  if (!admin) redirect("/admin/login");
  return admin;
}
