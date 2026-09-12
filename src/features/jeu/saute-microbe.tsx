"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./saute-microbe.module.css";

/**
 * Récompense de fin de bloc : une partie de « Saute-Microbe ».
 *
 * Le jeu vit dans `public/jeux/saute-microbe/` et n'est chargé qu'au moment où
 * l'élève ouvre sa partie : tant que la fenêtre reste fermée, la page de séance
 * ne télécharge rien de plus.
 */
export function SauteMicrobeReward({ blockLabel }: { blockLabel: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      frameRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <div className={styles.reward}>
      <p className={styles.rewardText}>
        Sans faute sur {blockLabel} : tu as gagné une partie.
      </p>
      <button className={styles.rewardButton} onClick={() => setIsOpen(true)} type="button">
        Jouer à Saute-Microbe
      </button>
      <dialog
        aria-label="Saute-Microbe"
        className={styles.dialog}
        onClose={() => setIsOpen(false)}
        ref={dialogRef}
      >
        <div className={styles.dialogHeader}>
          <h3>Saute-Microbe</h3>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            type="button"
          >
            Fermer
          </button>
        </div>
        {isOpen ? (
          <iframe
            className={styles.frame}
            onLoad={() => {
              // Sans cela, la barre d'espace ferait défiler la page de séance
              // au lieu de faire sauter le personnage.
              frameRef.current?.focus();
              frameRef.current?.contentWindow?.focus();
            }}
            ref={frameRef}
            src="/jeux/saute-microbe/index.html"
            title="Saute-Microbe, mini-jeu de récompense"
          />
        ) : null}
      </dialog>
    </div>
  );
}
