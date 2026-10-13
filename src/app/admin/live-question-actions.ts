"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import type { AdminActionState } from "@/features/admin/action-state";
import { AdminAccessError, requireAdmin } from "@/server/auth/require-admin";
import {
  revealLiveQuestionForSession,
  sendLiveQuestionToSession,
} from "@/server/live-sessions/store";

const sendLiveQuestionSchema = z.object({
  questionId: z.string().min(3).max(120).regex(/^[a-z0-9-]+$/),
  sessionId: z.uuid(),
});

const revealLiveQuestionSchema = z.object({
  sessionId: z.uuid(),
});

export async function sendLiveQuestionAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  void _previousState;

  const parsed = sendLiveQuestionSchema.safeParse({
    questionId: formData.get("questionId"),
    sessionId: formData.get("sessionId"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Question ou session invalide." };
  }

  try {
    await requireAdmin();
    sendLiveQuestionToSession(parsed.data);
    revalidatePath("/admin");
    return { status: "success", message: "Question envoyée au tableau." };
  } catch (error) {
    if (error instanceof AdminAccessError) {
      return { status: "error", message: "Session expirée ou accès refusé." };
    }

    return {
      status: "error",
      message: "Impossible d’envoyer cette question. Rechargez puis réessayez.",
    };
  }
}

export async function revealLiveQuestionAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  void _previousState;

  const parsed = revealLiveQuestionSchema.safeParse({
    sessionId: formData.get("sessionId"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Session invalide." };
  }

  try {
    await requireAdmin();
    revealLiveQuestionForSession(parsed.data);
    revalidatePath("/admin");
    return { status: "success", message: "Correction révélée." };
  } catch (error) {
    if (error instanceof AdminAccessError) {
      return { status: "error", message: "Session expirée ou accès refusé." };
    }

    return {
      status: "error",
      message:
        "Impossible de révéler la correction. Envoyez une question puis réessayez.",
    };
  }
}
