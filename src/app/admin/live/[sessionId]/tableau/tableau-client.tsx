"use client";

import { useEffect, useRef, useState } from "react";

import { getLiveAvatar } from "@/features/live/avatars";
import { useLiveSound } from "@/features/live/use-live-sound";

import styles from "./page.module.css";

type BoardParticipant = {
  id: string;
  avatarId: string;
  displayName: string;
  score: number;
};

type BoardQuestion = {
  id: string;
  type: "single-choice" | "true-false";
  title: string;
  prompt: string;
  choices: string[];
  timeLimitSeconds: number;
  points: number;
  sentAt: string;
};

type BoardReveal = {
  correctChoiceIndex: number;
  explanation: string;
  revealedAt: string;
};

type LiveBoardClientProps = {
  initialAnswerSummary: AnswerSummary;
  expiresAt: string;
  initialParticipants: BoardParticipant[];
  initialRevealedAnswer: BoardReveal | null;
  initialQuestion: BoardQuestion | null;
  sessionId: string;
};

type AnswerSummary = {
  answeredCount: number;
  totalParticipants: number;
};

function getLiveSocketUrl(sessionId: string) {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const params = new URLSearchParams({ sessionId });
  return `${protocol}//${window.location.host}/live?${params.toString()}`;
}

function getRemainingSeconds(question: BoardQuestion | null, nowMs: number) {
  if (!question) return 0;
  const deadline =
    new Date(question.sentAt).getTime() + question.timeLimitSeconds * 1_000;
  return Math.max(0, Math.ceil((deadline - nowMs) / 1_000));
}

function isParticipantList(value: unknown): value is BoardParticipant[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "avatarId" in item &&
        "displayName" in item &&
        "score" in item &&
        typeof item.id === "string" &&
        typeof item.avatarId === "string" &&
        typeof item.displayName === "string" &&
        typeof item.score === "number",
    )
  );
}

function isAnswerSummary(value: unknown): value is AnswerSummary {
  return (
    typeof value === "object" &&
    value !== null &&
    "answeredCount" in value &&
    "totalParticipants" in value &&
    typeof value.answeredCount === "number" &&
    typeof value.totalParticipants === "number"
  );
}

function isBoardQuestion(value: unknown): value is BoardQuestion | null {
  if (value === null) return true;
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "type" in value &&
    "title" in value &&
    "prompt" in value &&
    "choices" in value &&
    "timeLimitSeconds" in value &&
    "points" in value &&
    "sentAt" in value &&
    typeof value.id === "string" &&
    (value.type === "single-choice" || value.type === "true-false") &&
    typeof value.title === "string" &&
    typeof value.prompt === "string" &&
    Array.isArray(value.choices) &&
    value.choices.every((choice) => typeof choice === "string") &&
    typeof value.timeLimitSeconds === "number" &&
    typeof value.points === "number" &&
    typeof value.sentAt === "string"
  );
}

function isBoardReveal(value: unknown): value is BoardReveal | null {
  if (value === null) return true;
  return (
    typeof value === "object" &&
    value !== null &&
    "correctChoiceIndex" in value &&
    "explanation" in value &&
    "revealedAt" in value &&
    typeof value.correctChoiceIndex === "number" &&
    typeof value.explanation === "string" &&
    typeof value.revealedAt === "string"
  );
}

export function LiveBoardClient({
  initialAnswerSummary,
  expiresAt,
  initialParticipants,
  initialRevealedAnswer,
  initialQuestion,
  sessionId,
}: LiveBoardClientProps) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);
  const [revealedAnswer, setRevealedAnswer] = useState(initialRevealedAnswer);
  const [answerSummary, setAnswerSummary] = useState(initialAnswerSummary);
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [status, setStatus] = useState<"connecting" | "connected" | "closed">(
    "connecting",
  );
  const sound = useLiveSound();
  const lastQuestionSoundRef = useRef(initialQuestion?.id ?? null);
  const lastRevealSoundRef = useRef(initialRevealedAnswer?.revealedAt ?? null);
  const lastTickSoundRef = useRef<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket(getLiveSocketUrl(sessionId));

    socket.addEventListener("open", () => {
      setStatus("connected");
    });

    socket.addEventListener("message", (event) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(String(event.data));
      } catch {
        return;
      }

      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "type" in parsed &&
        parsed.type === "live:state" &&
        "participants" in parsed &&
        "currentQuestion" in parsed &&
        "revealedAnswer" in parsed &&
        "answerSummary" in parsed &&
        isParticipantList(parsed.participants) &&
        isBoardQuestion(parsed.currentQuestion) &&
        isBoardReveal(parsed.revealedAnswer) &&
        isAnswerSummary(parsed.answerSummary)
      ) {
        setParticipants(parsed.participants);
        setCurrentQuestion(parsed.currentQuestion);
        setRevealedAnswer(parsed.revealedAnswer);
        setAnswerSummary(parsed.answerSummary);
      }
    });

    socket.addEventListener("close", () => {
      setStatus("closed");
    });

    socket.addEventListener("error", () => {
      setStatus("closed");
    });

    return () => socket.close();
  }, [sessionId]);

  useEffect(() => {
    if (!currentQuestion || revealedAnswer) return;

    const timer = window.setInterval(() => {
      setNowMs(Date.now());
    }, 250);

    return () => window.clearInterval(timer);
  }, [currentQuestion, revealedAnswer]);

  const remainingSeconds = getRemainingSeconds(currentQuestion, nowMs);
  const countdownRatio = currentQuestion
    ? Math.max(0, remainingSeconds / currentQuestion.timeLimitSeconds)
    : 0;
  const isCountdownUrgent =
    currentQuestion !== null && !revealedAnswer && remainingSeconds <= 5;

  useEffect(() => {
    if (!currentQuestion || currentQuestion.id === lastQuestionSoundRef.current) {
      return;
    }

    lastQuestionSoundRef.current = currentQuestion.id;
    lastTickSoundRef.current = null;
    sound.play("question");
  }, [currentQuestion, sound]);

  useEffect(() => {
    if (!revealedAnswer || revealedAnswer.revealedAt === lastRevealSoundRef.current) {
      return;
    }

    lastRevealSoundRef.current = revealedAnswer.revealedAt;
    sound.play("reveal");
  }, [revealedAnswer, sound]);

  useEffect(() => {
    if (
      !currentQuestion ||
      revealedAnswer ||
      remainingSeconds <= 0 ||
      remainingSeconds > 5 ||
      lastTickSoundRef.current === remainingSeconds
    ) {
      return;
    }

    lastTickSoundRef.current = remainingSeconds;
    sound.play("tick");
  }, [currentQuestion, remainingSeconds, revealedAnswer, sound]);

  return (
    <>
      <section
        className={styles.questionPanel}
        aria-labelledby="current-question-title"
      >
        {currentQuestion ? (
          <>
            <div className={styles.questionHeader}>
              <div>
                <p className={styles.eyebrow}>Question en cours</p>
                <h2 id="current-question-title">{currentQuestion.title}</h2>
              </div>
              <div className={styles.questionTools}>
                <button
                  type="button"
                  onClick={sound.enabled ? sound.disable : sound.enable}
                  disabled={!sound.available}
                  aria-pressed={sound.enabled}
                >
                  {sound.enabled ? "Son activé" : "Son coupé"}
                </button>
                <dl className={styles.questionStats}>
                  <div>
                    <dt>Temps</dt>
                    <dd>{remainingSeconds}s</dd>
                  </div>
                  <div>
                    <dt>Points</dt>
                    <dd>{currentQuestion.points}</dd>
                  </div>
                  <div>
                    <dt>Réponses</dt>
                    <dd>
                      {answerSummary.answeredCount}/
                      {answerSummary.totalParticipants}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div
              className={`${styles.countdownTrack} ${isCountdownUrgent ? styles.countdownUrgent : ""}`}
              aria-hidden="true"
            >
              <span style={{ inlineSize: `${countdownRatio * 100}%` }} />
            </div>
            <p className={styles.questionPrompt}>{currentQuestion.prompt}</p>
            <ol className={styles.choiceGrid}>
              {currentQuestion.choices.map((choice, index) => (
                <li
                  className={
                    revealedAnswer?.correctChoiceIndex === index
                      ? styles.choiceCorrect
                      : undefined
                  }
                  key={`${currentQuestion.id}-${choice}`}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  {choice}
                </li>
              ))}
            </ol>
            {revealedAnswer ? (
              <div className={styles.revealPanel}>
                <p className={styles.eyebrow}>Correction</p>
                <strong>
                  Réponse {String.fromCharCode(65 + revealedAnswer.correctChoiceIndex)}
                </strong>
                <p>{revealedAnswer.explanation}</p>
              </div>
            ) : null}
          </>
        ) : (
          <div className={styles.emptyQuestion}>
            <p className={styles.eyebrow}>Question en cours</p>
            <h2 id="current-question-title">En attente</h2>
            <p>Choisissez une question dans la banque live côté admin.</p>
          </div>
        )}
      </section>

      <section className={styles.playersPanel} aria-labelledby="players-title">
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.eyebrow}>Joueurs connectés</p>
            <h2 id="players-title">{participants.length}/24</h2>
          </div>
          <span className={styles.connectionStatus}>{status}</span>
        </div>

        <div className={styles.playerGrid}>
          {participants.length === 0 ? (
            <p className={styles.emptyPlayers}>En attente des joueurs…</p>
          ) : (
            participants.map((participant) => {
              const avatar = getLiveAvatar(participant.avatarId);
              return (
                <article className={styles.playerCard} key={participant.id}>
                  <span
                    className={`${styles.avatarFace} ${styles[`avatarColor${avatar?.color ?? "cyan"}`]} ${styles[`avatarAccessory${avatar?.accessory ?? "cap"}`]}`}
                    aria-hidden="true"
                  />
                  <strong>{participant.displayName}</strong>
                  <span>{participant.score} pts</span>
                </article>
              );
            })
          )}
        </div>

        <p className={styles.expiryHint}>
          Expiration automatique :{" "}
          {new Intl.DateTimeFormat("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(expiresAt))}
        </p>
      </section>
    </>
  );
}
