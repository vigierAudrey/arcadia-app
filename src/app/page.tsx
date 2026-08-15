import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageShell}>
      <header className={styles.header}>
        <BrandMark context="Espace élève" />
        <span className={styles.previewBadge}>
          <span aria-hidden="true" />
          Mode aperçu
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
              activités de ta classe. Aucun compte et aucune donnée personnelle.
            </p>

            <div className={styles.playerStatus} aria-label="Informations de confidentialité">
              <span>Joueur anonyme</span>
              <span>Progression locale</span>
              <span>0 donnée envoyée</span>
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

            <div className={styles.codeField}>
              <label htmlFor="class-code">Code de classe</label>
              <input
                id="class-code"
                name="class-code-preview"
                type="text"
                inputMode="text"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                maxLength={20}
                placeholder="7K4M-Q8HX"
                aria-describedby="access-help"
              />
            </div>

            <button className={styles.primaryButton} type="button" disabled>
              <span aria-hidden="true">▶</span>
              Lancer la session
            </button>
            <p className={styles.helpText} id="access-help">
              Commande bientôt disponible dans la prochaine version.
            </p>
          </section>
        </section>

        <section className={styles.missionPreview} aria-labelledby="mission-title">
          <header>
            <div>
              <p className={styles.eyebrow}>Aperçu du parcours</p>
              <h2 id="mission-title">PSE // Tes missions</h2>
            </div>
            <span className={styles.progressBadge}>2 / 3 ouvertes</span>
          </header>

          <ol className={styles.missionList}>
            <li className={styles.missionOpen}>
              <span className={styles.missionNumber}>01</span>
              <span className={styles.missionCopy}>
                <strong>Prévenir les risques</strong>
                <small>Mission ouverte</small>
              </span>
              <span className={styles.missionState} aria-label="Ouverte">
                ▶
              </span>
              <ol className={styles.lessonPreviewList} aria-label="Étapes de la mission 1">
                <li>
                  <span>Étape 01</span>
                  <strong>Identifier les situations à risque</strong>
                  <small>Disponible</small>
                </li>
                <li>
                  <span>Étape 02</span>
                  <strong>Choisir une mesure de prévention</strong>
                  <small>Disponible</small>
                </li>
              </ol>
            </li>
            <li className={styles.missionOpen}>
              <span className={styles.missionNumber}>02</span>
              <span className={styles.missionCopy}>
                <strong>Protéger sa santé</strong>
                <small>Mission ouverte</small>
              </span>
              <span className={styles.missionState} aria-label="Ouverte">
                ▶
              </span>
              <ol className={styles.lessonPreviewList} aria-label="Étapes de la mission 2">
                <li>
                  <span>Étape 01</span>
                  <strong>Observer les signaux du corps</strong>
                  <small>Disponible</small>
                </li>
                <li>
                  <span>Étape 02</span>
                  <strong>Adopter les bons réflexes</strong>
                  <small>À découvrir</small>
                </li>
              </ol>
            </li>
            <li className={styles.missionLocked}>
              <span className={styles.missionNumber}>03</span>
              <span className={styles.missionCopy}>
                <strong>Mission mystère</strong>
                <small>À débloquer prochainement</small>
              </span>
              <span className={styles.lockIcon} aria-label="Verrouillée">
                <span aria-hidden="true" />
              </span>
              <ol
                className={`${styles.lessonPreviewList} ${styles.lessonPreviewLocked}`}
                aria-label="Étapes verrouillées de la mission 3"
              >
                <li>
                  <span>Étape ??</span>
                  <strong>Contenu à débloquer</strong>
                  <small>Verrouillée</small>
                </li>
              </ol>
            </li>
          </ol>
          <p className={styles.previewNote}>
            Démonstration visuelle uniquement — aucune progression n’est encore
            enregistrée.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>PSE Interactif // Apprendre, tester, recommencer.</p>
        <Link href="/admin">Accès enseignante ↗</Link>
      </footer>
    </div>
  );
}
