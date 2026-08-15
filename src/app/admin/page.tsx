import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";

import { BrandMark } from "@/components/brand-mark";
import { SequenceStatus, TeachingAreaKind } from "@/generated/prisma/enums";
import { getAdminCatalog } from "@/server/catalog/queries";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Administration",
  description: "Prototype de l’espace d’administration de PSE Interactif.",
  robots: {
    index: false,
    follow: false,
  },
};

const sequenceStatusLabels: Record<SequenceStatus, string> = {
  [SequenceStatus.DRAFT]: "Brouillon",
  [SequenceStatus.LOCKED]: "Verrouillée",
  [SequenceStatus.OPEN]: "Ouverte",
};

function getSequenceStatusClass(status: SequenceStatus) {
  switch (status) {
    case SequenceStatus.OPEN:
      return styles.sequenceOpen;
    case SequenceStatus.LOCKED:
      return styles.sequenceLocked;
    case SequenceStatus.DRAFT:
      return styles.sequenceDraft;
  }
}

export default async function AdminPage() {
  await connection();
  const catalog = await getAdminCatalog();
  const classroomCount = catalog.reduce(
    (total, program) =>
      total +
      program.levels.reduce(
        (levelTotal, level) => levelTotal + level.classrooms.length,
        0,
      ),
    0,
  );
  const teachingCount = catalog.reduce(
    (total, program) =>
      total +
      program.levels.reduce(
        (levelTotal, level) =>
          levelTotal +
          level.classrooms.reduce(
            (classTotal, classroom) =>
              classTotal + classroom.teachingAreas.length,
            0,
          ),
        0,
      ),
    0,
  );

  return (
    <div className={styles.adminShell}>
      <header className={styles.topbar}>
        <BrandMark context="Administration" />
        <Link className={styles.studentLink} href="/">
          Voir l’espace élève
          <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <div className={styles.previewWarning} role="status">
        <span aria-hidden="true">Prototype</span>
        <p>
          Cette page n’est pas encore protégée et aucune action n’enregistre de
          données.
        </p>
      </div>

      <div className={styles.workspace}>
        <aside className={styles.sidebar} aria-label="Navigation administration">
          <p className={styles.navLabel}>Gérer</p>
          <nav>
            <a className={styles.activeNavItem} href="#structure">
              <span aria-hidden="true">01</span>
              Structure pédagogique
            </a>
            <span className={styles.disabledNavItem} aria-disabled="true">
              <span aria-hidden="true">02</span>
              Séquences
            </span>
            <span className={styles.disabledNavItem} aria-disabled="true">
              <span aria-hidden="true">03</span>
              Activités
            </span>
          </nav>
          <p className={styles.sidebarNote}>
            Les outils de gestion seront ajoutés progressivement.
          </p>
        </aside>

        <main className={styles.content} id="structure">
          <div className={styles.headingRow}>
            <div>
              <p className={styles.eyebrow}>Console de gestion // Vue d’ensemble</p>
              <h1>Structure pédagogique</h1>
              <p className={styles.intro}>
                Organisation enregistrée dans la base locale. Cette étape reste
                entièrement en lecture seule.
              </p>
            </div>
            <button type="button" disabled>
              <span aria-hidden="true">＋</span>
              Ajouter une formation
            </button>
          </div>

          <ol className={styles.hierarchyPath} aria-label="Hiérarchie pédagogique">
            <li>Formation</li>
            <li>Niveau</li>
            <li>Classe</li>
            <li>Enseignement</li>
            <li>Séquence</li>
            <li>Activité</li>
          </ol>

          <section className={styles.stats} aria-label="Résumé de la démonstration">
            <article>
              <strong>{catalog.length}</strong>
              <span>formations</span>
            </article>
            <article>
              <strong>{classroomCount}</strong>
              <span>classes</span>
            </article>
            <article>
              <strong>{teachingCount}</strong>
              <span>enseignements renseignés</span>
            </article>
          </section>

          <section className={styles.catalog} aria-label="Hiérarchie pédagogique">
            {catalog.map((program, programIndex) => (
              <article className={styles.programCard} key={program.id}>
                <header className={styles.programHeader}>
                  <span className={styles.programIndex} aria-hidden="true">
                    {String(programIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p>Formation</p>
                    <h2>{program.name}</h2>
                  </div>
                  <span className={styles.demoTag}>Lecture seule</span>
                </header>

                <div className={styles.levelList}>
                  {program.levels.map((level) => (
                    <section className={styles.level} key={level.id}>
                      <div className={styles.levelHeading}>
                        <span>Niveau</span>
                        <h3>{level.name}</h3>
                      </div>

                      <div className={styles.classGrid}>
                        {level.classrooms.map((classroom) => (
                          <article className={styles.classCard} key={classroom.id}>
                            <div className={styles.classHeading}>
                              <span>Classe</span>
                              <h4>{classroom.name}</h4>
                            </div>

                            {classroom.teachingAreas.length > 0 ? (
                              <ul
                                className={styles.teachingList}
                                aria-label={`Enseignements de ${classroom.name}`}
                              >
                                {classroom.teachingAreas.map((teachingArea) => (
                                  <li key={teachingArea.id}>
                                    <div className={styles.teachingHeading}>
                                      <span>{teachingArea.name}</span>
                                      <small>
                                        {teachingArea.kind === TeachingAreaKind.BLOCK
                                          ? "Bloc"
                                          : "Matière"}
                                      </small>
                                    </div>

                                    {teachingArea.learningSequences.length > 0 ? (
                                      <ol className={styles.sequenceList}>
                                        {teachingArea.learningSequences.map(
                                          (learningSequence) => (
                                            <li key={learningSequence.id}>
                                              <div>
                                                <span>Séquence</span>
                                                <strong>{learningSequence.title}</strong>
                                              </div>
                                              <span
                                                className={`${styles.sequenceStatus} ${getSequenceStatusClass(learningSequence.status)}`}
                                              >
                                                {
                                                  sequenceStatusLabels[
                                                    learningSequence.status
                                                  ]
                                                }
                                              </span>
                                              <small>
                                                {learningSequence._count.activities}{" "}
                                                activité
                                                {learningSequence._count.activities > 1
                                                  ? "s"
                                                  : ""}
                                              </small>
                                            </li>
                                          ),
                                        )}
                                      </ol>
                                    ) : (
                                      <p className={styles.emptySequence}>
                                        Aucune séquence — les activités seront
                                        rattachées ici.
                                      </p>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className={styles.emptyTeaching}>
                                Aucun enseignement configuré
                              </p>
                            )}
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </article>
            ))}

            {catalog.length === 0 ? (
              <p className={styles.emptyCatalog}>
                Aucune formation active n’est disponible.
              </p>
            ) : null}
          </section>
        </main>
      </div>
    </div>
  );
}
