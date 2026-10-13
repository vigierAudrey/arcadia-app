"use client";

import { useCallback, useRef, useState } from "react";

type LiveSoundKind = "answer" | "question" | "reveal" | "tick";

function getAudioContext() {
  const AudioContextConstructor =
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  return AudioContextConstructor ? new AudioContextConstructor() : null;
}

function playTone(
  context: AudioContext,
  frequency: number,
  startAt: number,
  duration: number,
  gainValue = 0.035,
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(gainValue, startAt + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.02);
}

function playPattern(context: AudioContext, kind: LiveSoundKind) {
  const now = context.currentTime;

  switch (kind) {
    case "answer":
      playTone(context, 660, now, 0.08);
      playTone(context, 880, now + 0.08, 0.1);
      return;
    case "question":
      playTone(context, 523.25, now, 0.08);
      playTone(context, 659.25, now + 0.09, 0.08);
      playTone(context, 783.99, now + 0.18, 0.12);
      return;
    case "reveal":
      playTone(context, 392, now, 0.1);
      playTone(context, 523.25, now + 0.1, 0.1);
      playTone(context, 783.99, now + 0.2, 0.16);
      return;
    case "tick":
      playTone(context, 988, now, 0.045, 0.025);
      return;
  }
}

export function useLiveSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const enable = useCallback(async () => {
    const available = !unavailable;
    if (!available) return;

    audioContextRef.current ??= getAudioContext();
    const context = audioContextRef.current;
    if (!context) {
      setUnavailable(true);
      return;
    }

    if (context.state === "suspended") {
      await context.resume();
    }

    setEnabled(true);
    playPattern(context, "answer");
  }, [unavailable]);

  const disable = useCallback(() => {
    setEnabled(false);
  }, []);

  const play = useCallback(
    (kind: LiveSoundKind) => {
      const context = audioContextRef.current;
      if (!enabled || !context || context.state !== "running") return;
      playPattern(context, kind);
    },
    [enabled],
  );

  return { available: !unavailable, disable, enable, enabled, play };
}
