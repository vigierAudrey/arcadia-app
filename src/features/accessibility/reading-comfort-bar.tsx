"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import {
  applyTextSize,
  applyTheme,
  applyVoiceSpeed,
  readTextSize,
  readTheme,
  readVoiceSpeed,
  subscribePreferences,
  type TextSize,
  type Theme,
  type VoiceSpeed,
} from "./preferences";
import { stopSpeaking } from "./speech";
import styles from "./accessibility.module.css";

const textSizeOptions: Array<{ value: TextSize; label: string }> = [
  { value: "normal", label: "Normal" },
  { value: "grand", label: "Grand" },
  { value: "tres-grand", label: "Très grand" },
];

const themeOptions: Array<{ value: Theme; label: string }> = [
  { value: "sombre", label: "Sombre" },
  { value: "clair", label: "Clair" },
];

const voiceOptions: Array<{ value: VoiceSpeed; label: string }> = [
  { value: "normale", label: "Normale" },
  { value: "lente", label: "Lente" },
];

const defaultTextSize = (): TextSize => "normal";
const defaultTheme = (): Theme => "sombre";
const defaultVoiceSpeed = (): VoiceSpeed => "normale";

export function ReadingComfortBar() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Les réglages vivent dans le navigateur : on les lit après affichage,
  // le rendu serveur partant toujours des valeurs par défaut.
  const textSize = useSyncExternalStore(subscribePreferences, readTextSize, defaultTextSize);
  const theme = useSyncExternalStore(subscribePreferences, readTheme, defaultTheme);
  const voiceSpeed = useSyncExternalStore(subscribePreferences, readVoiceSpeed, defaultVoiceSpeed);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.comfort} ref={containerRef}>
      <button
        aria-expanded={open}
        aria-label="Confort de lecture : taille du texte, couleurs et voix"
        className={styles.comfortToggle}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span aria-hidden="true" className={styles.comfortToggleIcon}>Aa</span>
        <span className={styles.comfortToggleLabel}>Confort</span>
      </button>

      {open ? (
        <div className={styles.comfortPanel}>
          <Choices
            legend="Taille du texte"
            onSelect={(value) => {
              applyTextSize(value);
            }}
            options={textSizeOptions}
            value={textSize}
          />
          <Choices
            legend="Couleurs"
            onSelect={(value) => {
              applyTheme(value);
            }}
            options={themeOptions}
            value={theme}
          />
          <Choices
            legend="Vitesse de la voix"
            onSelect={(value) => {
              applyVoiceSpeed(value);
              stopSpeaking();
            }}
            options={voiceOptions}
            value={voiceSpeed}
          />
          <p className={styles.comfortHint}>
            Ces réglages restent enregistrés sur cet appareil.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Choices<Value extends string>({
  legend,
  onSelect,
  options,
  value,
}: {
  legend: string;
  onSelect: (value: Value) => void;
  options: Array<{ value: Value; label: string }>;
  value: Value;
}) {
  return (
    <div className={styles.comfortGroup} role="group" aria-label={legend}>
      <span className={styles.comfortLegend}>{legend}</span>
      <div className={styles.comfortOptions}>
        {options.map((option) => (
          <button
            aria-pressed={option.value === value}
            className={`${styles.comfortOption} ${option.value === value ? styles.comfortOptionActive : ""}`}
            key={option.value}
            onClick={() => onSelect(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
