import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";

import { BrandMark } from "@/components/brand-mark";
import { ReadingComfortBar } from "@/features/accessibility/reading-comfort-bar";
import { getStudentCatalog } from "@/server/catalog/student-queries";
import { requireClassSessionPage } from "@/server/class-auth/require-class-session";

import { leaveClassAction } from "../../leave-action";
import { StudentActivityGroup } from "../../student-activity";
import styles from "../../page.module.css";

export const metadata: Metadata = {
  title: "Enseignement | ArcadiA",
  robots: { index: false, follow: false },
};

export default async function TeachingAreaPage({
  params,
}: {
  params: Promise<{ teachingAreaId: string }>;
}) {
  await connection();
  const { classroomId } = await requireClassSessionPage();
  const { teachingAreaId } = await params;
  const classroom = await getStudentCatalog(classroomId);

  if (!classroom) redirect("/");

  const area = classroom.teachingAreas.find((item) => item.id === teachingAreaId);
  if (!area) notFound();

  const missionCount = area.learningSequences.length;

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
        <nav className={styles.breadcrumbs} aria-label="Fil d'Ariane">
          <Link href="/classe">Ma classe</Link>
          <span aria-hidden="true">/</span>
          <strong>{area.name}</strong>
        </nav>

        <section className={styles.classHero}>
          <p className={styles.eyebrow}>Enseignement sélectionné</p>
          <h1>{area.name}</h1>
          <span className={styles.missionCount}>
            {missionCount} module{missionCount > 1 ? "s" : ""} disponible
            {missionCount > 1 ? "s" : ""}
          </span>
        </section>

        {area.learningSequences.length === 0 ? (
          <p className={styles.emptyState}>
            Aucun module ouvert pour cet enseignement.
          </p>
        ) : (
          <ol className={styles.missionList}>
            {area.learningSequences.map((sequence, sequenceIndex) => (
              <li key={sequence.id}>
                <details className={styles.mission} open={sequenceIndex === 0}>
                  <summary className={styles.missionSummary}>
                    <span className={styles.missionNumber}>
                      {String(sequenceIndex + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.missionCopy}>
                      <strong>{sequence.title}</strong>
                      {sequence.description ? <span>{sequence.description}</span> : null}
                    </span>
                    <span className={styles.missionMeta}>
                      {sequence.lessons.length} étape(s)
                    </span>
                  </summary>

                  {sequence.lessons.length > 0 ? (
                    <ol className={styles.stepList} aria-label={`Étapes de ${sequence.title}`}>
                      {sequence.lessons.map((lesson, lessonIndex) => (
                        <li key={lesson.id}>
                          <details className={styles.stepDisclosure} open={lessonIndex === 0}>
                            <summary className={styles.stepSummary}>
                              <span>Étape {String(lessonIndex + 1).padStart(2, "0")}</span>
                              <strong>{lesson.title}</strong>
                              <small>
                                {lesson.activities.length} activité
                                {lesson.activities.length > 1 ? "s" : ""}
                              </small>
                            </summary>
                            {lesson.activities.length > 0 ? (
                              <StudentActivityGroup activities={lesson.activities} />
                            ) : (
                              <p className={styles.emptyState}>Aucun défi disponible pour cette étape.</p>
                            )}
                          </details>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className={styles.emptyState}>Aucune étape publiée pour ce module.</p>
                  )}
                </details>
              </li>
            ))}
          </ol>
        )}
      </main>
    </div>
  );
}
