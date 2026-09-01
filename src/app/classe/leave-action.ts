"use server";

import { redirect } from "next/navigation";

import {
  clearClassSessionCookie,
  getClassSessionCookie,
  revokeClassSession,
} from "@/server/class-auth/session";

export async function leaveClassAction() {
  await revokeClassSession(await getClassSessionCookie());
  await clearClassSessionCookie();
  redirect("/");
}
