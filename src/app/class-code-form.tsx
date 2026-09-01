"use client";

import { useActionState } from "react";

import { enterClassAction, type ClassEntryState } from "./enter-class-action";
import styles from "./page.module.css";

const initialState: ClassEntryState = { message: null };

export function ClassCodeForm() {
  const [state, formAction, pending] = useActionState(
    enterClassAction,
    initialState,
  );

  return (
    <form action={formAction}>
      <div className={styles.codeField}>
        <label htmlFor="class-code">Code de classe</label>
        <input
          id="class-code"
          name="code"
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={20}
          placeholder="7K4M-Q8HX"
          required
          aria-describedby="access-help"
        />
      </div>

      <button className={styles.primaryButton} type="submit" disabled={pending}>
        <span aria-hidden="true">▶</span>
        {pending ? "Vérification…" : "Lancer la session"}
      </button>

      <p
        className={styles.helpText}
        id="access-help"
        role={state.message ? "alert" : undefined}
      >
        {state.message ?? "Demande le code à ton enseignant·e si tu ne l’as pas."}
      </p>
    </form>
  );
}
