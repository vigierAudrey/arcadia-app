"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { AdminAccessError, requireAdmin } from "@/server/auth/require-admin";
import {
  disableClassAccessCode,
  rotateClassAccessCode,
} from "@/server/class-auth/access-code";

export type ClassAccessActionState = {
  status: "idle" | "success" | "error";
  message: string;
  code?: string;
};

const classroomIdSchema = z.uuid();

export async function rotateClassAccessCodeAction(
  classroomId: string,
  _previousState: ClassAccessActionState,
): Promise<ClassAccessActionState> {
  void _previousState;
  const parsed = classroomIdSchema.safeParse(classroomId);
  if (!parsed.success) {
    return { status: "error", message: "Classe invalide." };
  }

  try {
    await requireAdmin();
    const { code } = await rotateClassAccessCode(parsed.data);
    revalidatePath("/admin");
    return {
      status: "success",
      message: "Nouveau code généré. Il ne sera plus affiché ensuite.",
      code,
    };
  } catch (error) {
    if (error instanceof AdminAccessError) {
      return { status: "error", message: "Session expirée ou accès refusé." };
    }
    return {
      status: "error",
      message: "L’opération a échoué. Rechargez puis réessayez.",
    };
  }
}

export async function disableClassAccessCodeAction(
  classroomId: string,
  _previousState: ClassAccessActionState,
): Promise<ClassAccessActionState> {
  void _previousState;
  const parsed = classroomIdSchema.safeParse(classroomId);
  if (!parsed.success) {
    return { status: "error", message: "Classe invalide." };
  }

  try {
    await requireAdmin();
    await disableClassAccessCode(parsed.data);
    revalidatePath("/admin");
    return { status: "success", message: "Accès élèves désactivé." };
  } catch (error) {
    if (error instanceof AdminAccessError) {
      return { status: "error", message: "Session expirée ou accès refusé." };
    }
    return {
      status: "error",
      message: "L’opération a échoué. Rechargez puis réessayez.",
    };
  }
}
