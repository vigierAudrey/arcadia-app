"use server";

import { redirect } from "next/navigation";

import { requireAdmin } from "@/server/auth/require-admin";
import {
  clearAdminSessionCookie,
  getAdminSessionCookie,
  revokeAdminSession,
} from "@/server/auth/session";

export async function logoutAdminAction() {
  await requireAdmin();
  await revokeAdminSession(await getAdminSessionCookie());
  await clearAdminSessionCookie();
  redirect("/admin/login");
}
