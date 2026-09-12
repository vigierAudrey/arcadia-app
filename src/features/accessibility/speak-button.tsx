"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { isSpeechSupported, speak, stopSpeaking } from "./speech";
import styles from "./accessibility.module.css";

type SpeakButtonProps = {
  /** Texte lu à voix haute, déjà mis en phrases compréhensibles. */
  text: string;
  /** Précision annoncée aux lecteurs d'écran, par exemple le titre de l'activité. */
  about: string;
};

/*
  Le bouton est dessiné dès le rendu serveur pour que la page ne bouge pas au
  chargement ; il disparaît juste après si le navigateur ne sait pas lire à voix haute.
*/
const subscribeNothing = () => () => {};
const assumeSupported = () => true;

export function SpeakButton({ text, about }: SpeakButtonProps) {
  const supported = useSyncExternalStore(subscribeNothing, isSpeechSupported, assumeSupported);
  const [speaking, setSpeaking] = useState(false);
  const speakingRef = useRef(false);

  const updateSpeaking = useCallback((value: boolean) => {
    speakingRef.current = value;
    setSpeaking(value);
  }, []);

  useEffect(() => {
    // Quitter la page pendant une lecture ne doit pas laisser la voix tourner,
    // mais une lecture lancée ailleurs ne doit pas être coupée non plus.
    return () => {
      if (speakingRef.current) stopSpeaking();
    };
  }, []);

  if (!supported) return null;

  return (
    <button
      aria-label={
        speaking ? `Arrêter la lecture de : ${about}` : `Écouter : ${about}`
      }
      className={`${styles.speakButton} ${speaking ? styles.speakButtonActive : ""}`}
      onClick={() => {
        if (speaking) {
          stopSpeaking();
          updateSpeaking(false);
          return;
        }
        updateSpeaking(true);
        speak(text, () => updateSpeaking(false));
      }}
      type="button"
    >
      <span aria-hidden="true">{speaking ? "■" : "▶"}</span>
      {speaking ? "Stop" : "Écouter"}
    </button>
  );
}
