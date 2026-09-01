import { redirect } from "next/navigation";

import {
  getClassroomBySessionToken,
  getClassSessionCookie,
} from "./session";

export class ClassAccessError extends Error {
  constructor() {
    super("CLASS_ACCESS_REQUIRED");
    this.name = "ClassAccessError";
  }
}

export async function requireClassSessionFromToken(token: string | undefined) {
  const access = await getClassroomBySessionToken(token);
  if (!access) throw new ClassAccessError();
  return access;
}

export async function requireClassSession() {
  return requireClassSessionFromToken(await getClassSessionCookie());
}

export async function requireClassSessionPage() {
  const access = await getClassroomBySessionToken(
    await getClassSessionCookie(),
  );
  if (!access) redirect("/");
  return access;
}
