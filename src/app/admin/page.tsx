import type { Metadata } from "next";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { DEMO_CATALOG } from "@/features/catalog/demo-catalog";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Administration",
  description: "Prototype de l’espace d’administration de PSE Interactif.",
  robots: {
    index: false,
    follow: false,
  },
};

const classroomCount = DEMO_CATALOG.reduce(
  (total, program) =>
    total +
    program.levels.reduce(
      (levelTotal, level) => levelTotal + level.classrooms.length,
      0,
    ),
  0,
);

const teachingCount = DEMO_CATALOG.reduce(
  (total, program) =>
    total +
    program.levels.reduce(
      (levelTotal, level) =>
        levelTotal +
        level.classrooms.reduce(
          (classTotal, classroom) =>
            classTotal + classroom.teachings.length,
          0,
        ),
      0,
    ),
  0,
);

export default function AdminPage() {
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
                Visualisation temporaire de la future organisation administrable.
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
          </ol>

          <section className={styles.stats} aria-label="Résumé de la démonstration">
            <article>
              <strong>{DEMO_CATALOG.length}</strong>
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

          <section className={styles.catalog} aria-label="Hiérarchie de démonstration">
            {DEMO_CATALOG.map((program, programIndex) => (
              <article className={styles.programCard} key={program.name}>
                <header className={styles.programHeader}>
                  <span className={styles.programIndex} aria-hidden="true">
                    {String(programIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p>Formation</p>
                    <h2>{program.name}</h2>
                  </div>
                  <span className={styles.demoTag}>Démonstration</span>
                </header>

                <div className={styles.levelList}>
                  {program.levels.map((level) => (
                    <section className={styles.level} key={level.name}>
                      <div className={styles.levelHeading}>
                        <span>Niveau</span>
                        <h3>{level.name}</h3>
                      </div>

                      <div className={styles.classGrid}>
                        {level.classrooms.map((classroom) => (
                          <article className={styles.classCard} key={classroom.name}>
                            <div className={styles.classHeading}>
                              <span>Classe</span>
                              <h4>{classroom.name}</h4>
                            </div>

                            {classroom.teachings.length > 0 ? (
                              <ul aria-label={`Enseignements de ${classroom.name}`}>
                                {classroom.teachings.map((teaching) => (
                                  <li key={teaching}>
                                    <span>{teaching}</span>
                                    <small>Séquences à venir</small>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className={styles.emptyTeaching}>
                                Enseignements à configurer
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
          </section>
        </main>
      </div>
    </div>
  );
}
