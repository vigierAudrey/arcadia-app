"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  startLiveSessionAction,
  stopLiveSessionAction,
  type LiveSessionActionState,
} from "@/app/admin/live-session-actions";

import styles from "@/app/admin/page.module.css";

type LiveSessionPanelProps = {
  classroomId: string;
  className: string;
  activeSession:
    | {
        id: string;
        pin: string;
        expiresAt: string;
      }
    | null;
};

const initialLiveActionState: LiveSessionActionState = {
  status: "idle",
  message: "",
};

function formatTime(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function LiveSessionPanel({
  classroomId,
  className,
  activeSession,
}: LiveSessionPanelProps) {
  const [startState, startAction, startPending] = useActionState(
    startLiveSessionAction.bind(null, classroomId),
    initialLiveActionState,
  );

  const currentSession = startState.session ?? activeSession;

  const [stopState, stopAction, stopPending] = useActionState(
    stopLiveSessionAction.bind(
      null,
      classroomId,
      currentSession?.id ?? "00000000-0000-0000-0000-000000000000",
    ),
    initialLiveActionState,
  );
  const visibleSession = stopState.status === "success" ? null : currentSession;

  return (
    <div className={styles.liveSessionPanel}>
      <div className={styles.liveSessionStatus}>
        <span>Activité en direct</span>
        <strong className={visibleSession ? styles.classAccessActive : styles.classAccessNone}>
          {visibleSession ? "Active" : "Aucune session"}
        </strong>
      </div>

      {visibleSession ? (
        <p className={styles.liveSessionPin} role="status">
          PIN tableau : <code>{visibleSession.pin}</code>
          <br />
          Expiration automatique vers {formatTime(visibleSession.expiresAt)}.
        </p>
      ) : (
        <p className={styles.liveSessionHint}>
          Lancez une session temporaire pour cette classe. Les élèves devront
          déjà être entrés avec leur code classe.
        </p>
      )}

      <div className={styles.classAccessActions}>
        {!visibleSession ? (
          <form action={startAction}>
            <button
              className="admin-submit admin-submit--secondary"
              type="submit"
              disabled={startPending}
            >
              {startPending ? "Lancement…" : "Lancer une session live"}
            </button>
          </form>
        ) : (
          <>
            <Link
              className="admin-submit admin-submit--secondary"
              href={`/admin/live/${visibleSession.id}/tableau`}
              target="_blank"
            >
              Ouvrir tableau
            </Link>
            <form action={stopAction}>
              <button
                className="admin-submit admin-submit--danger"
                type="submit"
                disabled={stopPending}
                onClick={(event) => {
                  if (
                    !window.confirm(
                      `Terminer la session live de « ${className} » ? Les réponses temporaires seront effacées.`,
                    )
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                {stopPending ? "Arrêt…" : "Terminer la session"}
              </button>
            </form>
          </>
        )}
      </div>

      {startState.status === "error" ? (
        <p className="admin-action-feedback admin-action-feedback--error" aria-live="polite">
          {startState.message}
        </p>
      ) : null}
      {stopState.status !== "idle" ? (
        <p
          className={`admin-action-feedback admin-action-feedback--${stopState.status}`}
          aria-live="polite"
        >
          {stopState.message}
        </p>
      ) : null}
    </div>
  );
}
