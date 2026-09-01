import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { BrandMark } from "@/components/brand-mark";
import { getAdminSessionSecret } from "@/server/auth/config";
import {
  getAdminBySessionToken,
  getAdminSessionCookie,
} from "@/server/auth/session";

import { AdminLoginForm } from "./login-form";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Connexion administration",
  description: "Accès sécurisé à l’administration de PSE Interactif.",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  await connection();
  getAdminSessionSecret();

  if (await getAdminBySessionToken(await getAdminSessionCookie())) {
    redirect("/admin");
  }

  return (
    <main className={styles.loginShell}>
      <div className={styles.scanlines} aria-hidden="true" />
      <section className={styles.loginPanel} aria-labelledby="login-title">
        <header>
          <BrandMark context="Accès sécurisé" />
          <span className={styles.status}>Admin // V1</span>
        </header>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Console pédagogique</p>
          <h1 id="login-title">Identification requise</h1>
          <p className={styles.intro}>
            Cette zone permet de gérer la structure des formations et des cours.
          </p>
          <AdminLoginForm />
        </div>

        <footer>
          <span>Session serveur sécurisée</span>
          <Link href="/">Retour à l’espace élève</Link>
        </footer>
      </section>
    </main>
  );
}
