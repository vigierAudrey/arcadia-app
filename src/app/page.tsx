import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { BrandMark } from "@/components/brand-mark";
import { getClassSessionSecret } from "@/server/class-auth/config";
import {
  getClassroomBySessionToken,
  getClassSessionCookie,
} from "@/server/class-auth/session";

import { ClassCodeForm } from "./class-code-form";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "PSE Interactif",
  description:
    "Accède aux activités de ta classe avec le code fourni par ton enseignant·e.",
};

export default async function Home() {
  await connection();
  // Configuration errors are intentionally not disguised as an invalid code.
  getClassSessionSecret();

  if (await getClassroomBySessionToken(await getClassSessionCookie())) {
    redirect("/classe");
  }

  return (
    <div className={styles.pageShell}>
      <header className={styles.header}>
        <BrandMark context="Espace élève" />
        <span className={styles.previewBadge}>
          <span aria-hidden="true" />
          Accès classe
        </span>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="student-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Session pédagogique // Prêt·e&nbsp;?</p>
            <h1 id="student-title">
              Entre dans ta <span>prochaine mission</span>
            </h1>
            <p className={styles.intro}>
              Utilise le code donné par ton enseignante pour retrouver les
              activités de ta classe. Aucun compte et aucune donnée
              personnelle.
            </p>

            <div
              className={styles.playerStatus}
              aria-label="Informations de confidentialité"
            >
              <span>Joueur anonyme</span>
              <span>Aucune donnée envoyée</span>
              <span>Session classe uniquement</span>
            </div>
          </div>

          <section className={styles.accessCard} aria-labelledby="access-title">
            <div className={styles.cardPixels} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className={styles.cardHeading}>
              <span className={styles.step} aria-hidden="true">
                A
              </span>
              <div>
                <p className={styles.cardKicker}>Player access</p>
                <h2 id="access-title">Entre ton code classe</h2>
              </div>
            </div>

            <ClassCodeForm />
          </section>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>PSE Interactif // Apprendre, tester, recommencer.</p>
        <Link href="/admin">Accès enseignante ↗</Link>
      </footer>
    </div>
  );
}
