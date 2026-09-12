/**
 * Réglages de confort de lecture choisis par l'élève.
 * Ils vivent uniquement dans le navigateur de l'élève (localStorage) :
 * rien n'est envoyé au serveur, aucun compte n'est nécessaire.
 */

export const TEXT_SIZES = ["normal", "grand", "tres-grand"] as const;
export const THEMES = ["sombre", "clair"] as const;
export const VOICE_SPEEDS = ["normale", "lente"] as const;

export type TextSize = (typeof TEXT_SIZES)[number];
export type Theme = (typeof THEMES)[number];
export type VoiceSpeed = (typeof VOICE_SPEEDS)[number];

export const STORAGE_KEYS = {
  textSize: "arcadia.lecture.taille",
  theme: "arcadia.lecture.theme",
  voiceSpeed: "arcadia.lecture.voix",
} as const;

/** Préfixe des pages élèves : le confort de lecture ne s'applique qu'à elles. */
export const STUDENT_PATH_PREFIX = "/classe";

export const VOICE_RATES: Record<VoiceSpeed, number> = {
  normale: 0.95,
  lente: 0.72,
};

function readStored<Value extends string>(
  key: string,
  allowed: readonly Value[],
  fallback: Value,
): Value {
  try {
    const stored = window.localStorage.getItem(key);
    return allowed.includes(stored as Value) ? (stored as Value) : fallback;
  } catch {
    return fallback;
  }
}

/*
  La page affichée fait foi pour la taille et les couleurs : le réglage reste
  visible même si le navigateur refuse d'enregistrer (navigation privée).
*/
export function readTextSize(): TextSize {
  const applied = document.documentElement.dataset.lectureTaille as TextSize | undefined;
  if (applied && TEXT_SIZES.includes(applied)) return applied;
  return "normal";
}

export function readTheme(): Theme {
  const applied = document.documentElement.dataset.lectureTheme as Theme | undefined;
  if (applied && THEMES.includes(applied)) return applied;
  return "sombre";
}

let voiceSpeedCache: VoiceSpeed | null = null;

export function readVoiceSpeed(): VoiceSpeed {
  voiceSpeedCache ??= readStored(STORAGE_KEYS.voiceSpeed, VOICE_SPEEDS, "normale");
  return voiceSpeedCache;
}

/** Petit abonnement pour que la barre reflète toujours le réglage en cours. */
const listeners = new Set<() => void>();

export function subscribePreferences(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function store(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Navigation privée ou stockage refusé : le réglage vaut alors pour la visite en cours.
  }
  for (const listener of listeners) listener();
}

export function applyTextSize(value: TextSize) {
  const root = document.documentElement;
  if (value === "normal") delete root.dataset.lectureTaille;
  else root.dataset.lectureTaille = value;
  store(STORAGE_KEYS.textSize, value);
}

export function applyTheme(value: Theme) {
  const root = document.documentElement;
  if (value === "sombre") delete root.dataset.lectureTheme;
  else root.dataset.lectureTheme = value;
  store(STORAGE_KEYS.theme, value);
}

export function applyVoiceSpeed(value: VoiceSpeed) {
  voiceSpeedCache = value;
  store(STORAGE_KEYS.voiceSpeed, value);
}

/**
 * Script exécuté avant le premier affichage : il remet les réglages de l'élève
 * en place sans provoquer de clignotement au chargement de la page.
 */
export const readingComfortInitScript = `(function(){try{
if(!location.pathname.startsWith(${JSON.stringify(STUDENT_PATH_PREFIX)}))return;
var r=document.documentElement;
var t=localStorage.getItem(${JSON.stringify(STORAGE_KEYS.textSize)});
if(t==="grand"||t==="tres-grand")r.dataset.lectureTaille=t;
if(localStorage.getItem(${JSON.stringify(STORAGE_KEYS.theme)})==="clair")r.dataset.lectureTheme="clair";
}catch(e){}})();`;
