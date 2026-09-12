import { readVoiceSpeed, VOICE_RATES } from "./preferences";

const MAX_CHUNK_LENGTH = 180;

/**
 * Découpe le texte en courtes phrases : certaines versions de Chrome
 * s'arrêtent au bout d'une quinzaine de secondes sur un seul long énoncé.
 */
export function splitForSpeech(text: string): string[] {
  const sentences = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?:;])\s+|\n+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (sentence.length > MAX_CHUNK_LENGTH) {
      if (current) {
        chunks.push(current);
        current = "";
      }
      for (const word of sentence.split(" ")) {
        if ((current + " " + word).trim().length > MAX_CHUNK_LENGTH) {
          chunks.push(current.trim());
          current = word;
        } else {
          current = `${current} ${word}`.trim();
        }
      }
      continue;
    }

    if ((current + " " + sentence).trim().length > MAX_CHUNK_LENGTH) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = `${current} ${sentence}`.trim();
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickFrenchVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) => voice.lang?.toLowerCase() === "fr-fr") ??
    voices.find((voice) => voice.lang?.toLowerCase().startsWith("fr")) ??
    null
  );
}

/** Une seule lecture à la fois : démarrer une nouvelle arrête la précédente. */
let releaseCurrent: (() => void) | null = null;

export function stopSpeaking() {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
  const release = releaseCurrent;
  releaseCurrent = null;
  release?.();
}

export function speak(text: string, onFinished: () => void) {
  if (!isSpeechSupported()) return;

  stopSpeaking();
  releaseCurrent = onFinished;

  const finish = () => {
    if (releaseCurrent === onFinished) releaseCurrent = null;
    onFinished();
  };

  const chunks = splitForSpeech(text);
  const rate = VOICE_RATES[readVoiceSpeed()];
  const voice = pickFrenchVoice();

  if (chunks.length === 0) {
    finish();
    return;
  }

  chunks.forEach((chunk, index) => {
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = "fr-FR";
    utterance.rate = rate;
    if (voice) utterance.voice = voice;
    utterance.onerror = finish;
    if (index === chunks.length - 1) utterance.onend = finish;
    window.speechSynthesis.speak(utterance);
  });
}
