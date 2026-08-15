"use client";

import type { FormEvent, ReactNode } from "react";
import { useActionState } from "react";

import {
  type AdminActionState,
  initialAdminActionState,
} from "./action-state";

type AdminAction = (
  state: AdminActionState,
  formData: FormData,
) => Promise<AdminActionState>;

type AdminFormProps = {
  action: AdminAction;
  children: ReactNode;
  className?: string;
  confirmMessage?: string;
  submitLabel: string;
  submitVariant?: "primary" | "secondary" | "danger";
};

function useConfirmation(confirmMessage?: string) {
  return (event: FormEvent<HTMLFormElement>) => {
    if (confirmMessage && !window.confirm(confirmMessage)) {
      event.preventDefault();
    }
  };
}

function ActionFeedback({ state }: { state: AdminActionState }) {
  if (state.status === "idle") return null;

  return (
    <p
      className={`admin-action-feedback admin-action-feedback--${state.status}`}
      aria-live="polite"
    >
      {state.message}
    </p>
  );
}

export function AdminForm({
  action,
  children,
  className,
  confirmMessage,
  submitLabel,
  submitVariant = "primary",
}: AdminFormProps) {
  const [state, formAction, pending] = useActionState(
    action,
    initialAdminActionState,
  );
  const handleSubmit = useConfirmation(confirmMessage);

  return (
    <form className={className} action={formAction} onSubmit={handleSubmit}>
      {children}
      <button
        className={`admin-submit admin-submit--${submitVariant}`}
        type="submit"
        disabled={pending}
      >
        {pending ? "Patientez…" : submitLabel}
      </button>
      <ActionFeedback state={state} />
    </form>
  );
}

type OrderFormProps = {
  action: AdminAction;
  canMoveDown: boolean;
  canMoveUp: boolean;
  className?: string;
};

export function OrderForm({
  action,
  canMoveDown,
  canMoveUp,
  className,
}: OrderFormProps) {
  const [state, formAction, pending] = useActionState(
    action,
    initialAdminActionState,
  );

  return (
    <form className={className} action={formAction}>
      <div className="admin-order-buttons">
        <button
          type="submit"
          name="direction"
          value="UP"
          disabled={pending || !canMoveUp}
          aria-label="Monter cet élément"
        >
          <span aria-hidden="true">↑</span> Monter
        </button>
        <button
          type="submit"
          name="direction"
          value="DOWN"
          disabled={pending || !canMoveDown}
          aria-label="Descendre cet élément"
        >
          <span aria-hidden="true">↓</span> Descendre
        </button>
      </div>
      <ActionFeedback state={state} />
    </form>
  );
}
