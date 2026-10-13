"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { AdminAccessError, requireAdmin } from "@/server/auth/require-admin";
import {
  startAdminLiveSession,
  stopAdminLiveSession,
} from "@/server/live-sessions/admin";

export type LiveSessionActionState = {
  status: "idle" | "success" | "error";
  message: string;
  session?: {
    id: string;
    pin: string;
    expiresAt: string;
  };
};

const idSchema = z.uuid();

export async function startLiveSessionAction(
  classroomId: string,
  _previousState: LiveSessionActionState,
): Promise<LiveSessionActionState> {
  void _previousState;
  const parsed = idSchema.safeParse(classroomId);
  if (!parsed.success) {
    return { status: "error", message: "Classe invalide." };
  }

  try {
    await requireAdmin();
    const session = await startAdminLiveSession(parsed.data);
    revalidatePath("/admin");
    return {
      status: "success",
      message: "Session live lancée.",
      session: {
        id: session.id,
        pin: session.pin,
        expiresAt: session.expiresAt.toISOString(),
      },
    };
  } catch (error) {
    if (error instanceof AdminAccessError) {
      return { status: "error", message: "Session expirée ou accès refusé." };
    }
    if (error instanceof Error && error.message === "LIVE_SESSION_ALREADY_ACTIVE") {
      return {
        status: "error",
        message: "Une session live est déjà active pour cette classe.",
      };
    }
    return {
      status: "error",
      message: "Impossible de lancer la session live. Rechargez puis réessayez.",
    };
  }
}

export async function stopLiveSessionAction(
  classroomId: string,
  sessionId: string,
  _previousState: LiveSessionActionState,
): Promise<LiveSessionActionState> {
  void _previousState;
  const parsedClassroomId = idSchema.safeParse(classroomId);
  const parsedSessionId = idSchema.safeParse(sessionId);

  if (!parsedClassroomId.success || !parsedSessionId.success) {
    return { status: "error", message: "Session live invalide." };
  }

  try {
    await requireAdmin();
    const stopped = await stopAdminLiveSession(
      parsedClassroomId.data,
      parsedSessionId.data,
    );
    revalidatePath("/admin");
    return {
      status: stopped ? "success" : "error",
      message: stopped
        ? "Session live terminée."
        : "La session live n’est plus active.",
    };
  } catch (error) {
    if (error instanceof AdminAccessError) {
      return { status: "error", message: "Session expirée ou accès refusé." };
    }
    return {
      status: "error",
      message: "Impossible de terminer la session live. Rechargez puis réessayez.",
    };
  }
}
