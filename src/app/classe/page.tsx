import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { BrandMark } from "@/components/brand-mark";
import { ReadingComfortBar } from "@/features/accessibility/reading-comfort-bar";
import { getStudentCatalog } from "@/server/catalog/student-queries";
import { requireClassSessionPage } from "@/server/class-auth/require-class-session";
import { listLiveSessionsForClassroom } from "@/server/live-sessions/store";

import { leaveClassAction } from "./leave-action";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ma classe",
  description: "Missions et étapes disponibles pour ta classe.",
  robots: { index: false, follow: false },
};

export default async function ClassPage() {
  await connection();
  const { classroomId } = await requireClassSessionPage();
  const classroom = await getStudentCatalog(classroomId);
  const activeLiveSession = listLiveSessionsForClassroom(classroomId)[0] ?? null;

  if (!classroom) {
    redirect("/");
  }

  const missionCount = classroom.teachingAreas.reduce(
    (total, area) => total + area.learningSequences.length,
    0,
  );

  return (
    <div className={styles.pageShell}>
      <header className={styles.header}>
        <BrandMark context="Espace élève" />
        <div className={styles.headerTools}>
          <ReadingComfortBar />
          <form action={leaveClassAction}>
            <button className={styles.leaveButton} type="submit">
              Quitter
            </button>
          </form>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.classHero}>
          <p className={styles.eyebrow}>Classe connectée</p>
          <h1>{classroom.name}</h1>
          <span className={styles.missionCount}>
            {missionCount} mission{missionCount > 1 ? "s" : ""} disponible
            {missionCount > 1 ? "s" : ""}
          </span>
        </section>

        <section className={styles.liveSessionCard} aria-labelledby="live-title">
          <div>
            <p className={styles.eyebrow}>Activité en direct</p>
            <h2 id="live-title">Session live</h2>
            <p>
              {activeLiveSession
                ? "Une activité en direct est ouverte pour ta classe. Regarde le tableau et prépare le PIN affiché."
                : "Aucune activité en direct n’est ouverte pour le moment."}
            </p>
          </div>
          <span
            className={
              activeLiveSession
                ? styles.liveSessionActive
                : styles.liveSessionInactive
            }
          >
            {activeLiveSession ? "Active" : "En attente"}
          </span>
          {activeLiveSession ? (
            <Link className={styles.liveSessionLink} href="/classe/live">
              Rejoindre
            </Link>
          ) : null}
        </section>

        {classroom.teachingAreas.length === 0 ? (
          <p className={styles.emptyState}>
            Aucun enseignement disponible pour le moment. Reviens plus tard.
          </p>
        ) : null}

        <section className={styles.teachingArea} aria-labelledby="area-menu-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow} id="area-menu-title">Choisis ton enseignement</p>
            <span className={styles.sectionHint}>Un espace par matière</span>
          </div>
          <div className={styles.areaGrid}>
            {classroom.teachingAreas.map((area) => (
              <Link
                className={styles.areaCard}
                href={`/classe/enseignement/${area.id}`}
                key={area.id}
              >
                <span className={styles.areaCardIndex}>
                  {String(area.position + 1).padStart(2, "0")}
                </span>
                <span className={styles.areaCardCopy}>
                  <strong>{area.name}</strong>
                  <small>{area.learningSequences.length} module(s) disponible(s)</small>
                </span>
                <span className={styles.areaCardArrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
