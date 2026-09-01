"use client";

import { useActionState } from "react";

import { loginAdminAction, type AdminLoginState } from "./actions";
import styles from "./page.module.css";

const initialState: AdminLoginState = { message: null };

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAdminAction,
    initialState,
  );

  return (
    <form className={styles.form} action={formAction}>
      <label htmlFor="admin-login">
        <span>Identifiant</span>
        <input
          id="admin-login"
          name="login"
          type="text"
          required
          minLength={3}
          maxLength={100}
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
        />
      </label>

      <label htmlFor="admin-password">
        <span>Mot de passe</span>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          minLength={12}
          maxLength={256}
          autoComplete="current-password"
        />
      </label>

      <button type="submit" disabled={pending}>
        {pending ? "Vérification…" : "Ouvrir la console"}
      </button>

      {state.message ? (
        <p className={styles.error} role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
