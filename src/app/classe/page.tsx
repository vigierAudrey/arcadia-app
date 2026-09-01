import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { BrandMark } from "@/components/brand-mark";
import { getStudentCatalog } from "@/server/catalog/student-queries";
import { requireClassSessionPage } from "@/server/class-auth/require-class-session";

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
        <form action={leaveClassAction}>
          <button className={styles.leaveButton} type="submit">
            Quitter
          </button>
        </form>
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

        {classroom.teachingAreas.length === 0 ? (
          <p className={styles.emptyState}>
            Aucun enseignement disponible pour le moment. Reviens plus tard.
          </p>
        ) : null}

        {classroom.teachingAreas.map((area) => (
          <section
            className={styles.teachingArea}
            key={area.id}
            aria-labelledby={`teaching-${area.id}`}
          >
            <h2 id={`teaching-${area.id}`}>{area.name}</h2>

            {area.learningSequences.length === 0 ? (
              <p className={styles.emptyState}>
                Aucune mission ouverte pour cet enseignement.
              </p>
            ) : (
              <ol className={styles.missionList}>
                {area.learningSequences.map((sequence, sequenceIndex) => (
                  <li className={styles.mission} key={sequence.id}>
                    <span className={styles.missionNumber}>
                      {String(sequenceIndex + 1).padStart(2, "0")}
                    </span>
                    <div className={styles.missionCopy}>
                      <strong>{sequence.title}</strong>
                      {sequence.description ? (
                        <p>{sequence.description}</p>
                      ) : null}
                    </div>

                    {sequence.lessons.length > 0 ? (
                      <ol
                        className={styles.stepList}
                        aria-label={`Étapes de la mission ${sequence.title}`}
                      >
                        {sequence.lessons.map((lesson, lessonIndex) => (
                          <li key={lesson.id}>
                            <span>
                              Étape {String(lessonIndex + 1).padStart(2, "0")}
                            </span>
                            <strong>{lesson.title}</strong>
                            <small>
                              {lesson.activities.length} activité
                              {lesson.activities.length > 1 ? "s" : ""}
                            </small>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className={styles.emptyState}>
                        Aucune étape publiée pour cette mission.
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
