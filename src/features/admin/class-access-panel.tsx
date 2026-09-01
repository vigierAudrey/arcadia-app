"use client";

import { useActionState } from "react";

import {
  disableClassAccessCodeAction,
  initialClassAccessActionState,
  rotateClassAccessCodeAction,
} from "@/app/admin/class-access-actions";

import styles from "@/app/admin/page.module.css";

type ClassAccessPanelProps = {
  classroomId: string;
  className: string;
  status: "none" | "active" | "disabled";
};

const statusLabels: Record<ClassAccessPanelProps["status"], string> = {
  none: "Aucun accès",
  active: "Actif",
  disabled: "Désactivé",
};

const statusStyles: Record<ClassAccessPanelProps["status"], string> = {
  none: styles.classAccessNone,
  active: styles.classAccessActive,
  disabled: styles.classAccessDisabled,
};

export function ClassAccessPanel({
  classroomId,
  className,
  status,
}: ClassAccessPanelProps) {
  const [rotateState, rotateAction, rotatePending] = useActionState(
    rotateClassAccessCodeAction.bind(null, classroomId),
    initialClassAccessActionState,
  );
  const [disableState, disableAction, disablePending] = useActionState(
    disableClassAccessCodeAction.bind(null, classroomId),
    initialClassAccessActionState,
  );

  const rotateLabel = status === "none" ? "Générer un code" : "Régénérer le code";
  const revealedCode =
    rotateState.status === "success" ? rotateState.code : undefined;

  return (
    <div className={styles.classAccessPanel}>
      <div className={styles.classAccessStatus}>
        <span>Accès élèves</span>
        <strong className={statusStyles[status]}>{statusLabels[status]}</strong>
      </div>

      {revealedCode ? (
        <p className={styles.classAccessCode} role="status">
          Code : <code>{revealedCode}</code>
          <br />
          Communiquez-le à la classe maintenant — il ne sera plus jamais affiché.
        </p>
      ) : null}

      <div className={styles.classAccessActions}>
        <form action={rotateAction}>
          <button
            className="admin-submit admin-submit--secondary"
            type="submit"
            disabled={rotatePending}
          >
            {rotatePending ? "Génération…" : rotateLabel}
          </button>
        </form>

        {status === "active" ? (
          <form action={disableAction}>
            <button
              className="admin-submit admin-submit--danger"
              type="submit"
              disabled={disablePending}
              onClick={(event) => {
                if (
                  !window.confirm(
                    `Désactiver l’accès élèves de « ${className} » ? Les sessions actives seront immédiatement coupées.`,
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              {disablePending ? "Désactivation…" : "Désactiver"}
            </button>
          </form>
        ) : null}
      </div>

      {rotateState.status === "error" ? (
        <p className="admin-action-feedback admin-action-feedback--error" aria-live="polite">
          {rotateState.message}
        </p>
      ) : null}
      {disableState.status !== "idle" ? (
        <p
          className={`admin-action-feedback admin-action-feedback--${disableState.status}`}
          aria-live="polite"
        >
          {disableState.message}
        </p>
      ) : null}
    </div>
  );
}
