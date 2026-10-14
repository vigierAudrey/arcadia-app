"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { LIVE_AVATARS, type LiveAvatarId } from "@/features/live/avatars";
import { useLiveSound } from "@/features/live/use-live-sound";

import styles from "./page.module.css";

type JoinState = {
  status: "idle" | "connecting" | "joined" | "error";
  message: string;
  displayName?: string;
};

type StudentQuestion = {
  id: string;
  roundId: string;
  type: "single-choice" | "true-false";
  title: string;
  prompt: string;
  choices: string[];
  timeLimitSeconds: number;
  points: number;
  sentAt: string;
};

type StudentReveal = {
  correctChoiceIndex: number;
  explanation: string;
  revealedAt: string;
};

type AnswerState = {
  status: "idle" | "sending" | "accepted" | "error";
  message: string;
  questionId?: string;
  selectedChoiceIndex?: number;
};

function getLiveSocketUrl() {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}/live`;
}

function getRemainingSeconds(question: StudentQuestion | null, nowMs: number) {
  if (!question) return 0;
  const deadline =
    new Date(question.sentAt).getTime() + question.timeLimitSeconds * 1_000;
  return Math.max(0, Math.ceil((deadline - nowMs) / 1_000));
}

function isStudentQuestion(value: unknown): value is StudentQuestion | null {
  if (value === null) return true;
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "roundId" in value &&
    "type" in value &&
    "title" in value &&
    "prompt" in value &&
    "choices" in value &&
    "timeLimitSeconds" in value &&
    "points" in value &&
    "sentAt" in value &&
    typeof value.id === "string" &&
    typeof value.roundId === "string" &&
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

function isStudentReveal(value: unknown): value is StudentReveal | null {
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

export function LiveJoinClient() {
  const [pin, setPin] = useState("");
  const [avatarId, setAvatarId] = useState<LiveAvatarId>(LIVE_AVATARS[0].id);
  const [currentQuestion, setCurrentQuestion] = useState<StudentQuestion | null>(
    null,
  );
  const [revealedAnswer, setRevealedAnswer] = useState<StudentReveal | null>(
    null,
  );
  const [answerState, setAnswerState] = useState<AnswerState>({
    status: "idle",
    message: "",
  });
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [joinState, setJoinState] = useState<JoinState>({
    status: "idle",
    message: "Choisis ton personnage puis entre le PIN affiché au tableau.",
  });
  const socketRef = useRef<WebSocket | null>(null);
  const joinedRef = useRef(false);
  const joinRequestRef = useRef<{ avatarId: LiveAvatarId; pin: string } | null>(
    null,
  );
  const reconnectAttemptRef = useRef(0);
  const [connectionNonce, setConnectionNonce] = useState(0);
  const sound = useLiveSound();
  const playSoundRef = useRef(sound.play);
  const lastQuestionSoundRef = useRef<string | null>(null);
  const lastRevealSoundRef = useRef<string | null>(null);
  const lastTickSoundRef = useRef<number | null>(null);

  const selectedAvatar = useMemo(
    () => LIVE_AVATARS.find((avatar) => avatar.id === avatarId) ?? LIVE_AVATARS[0],
    [avatarId],
  );

  useEffect(() => {
    playSoundRef.current = sound.play;
  }, [sound.play]);

  useEffect(() => {
    if (!currentQuestion || revealedAnswer) return;

    const timer = window.setInterval(() => {
      setNowMs(Date.now());
    }, 250);

    return () => window.clearInterval(timer);
  }, [currentQuestion, revealedAnswer]);

  function joinLiveSession() {
    const normalizedPin = pin.replace(/\D/g, "").slice(0, 6);
    setPin(normalizedPin);

    if (!/^\d{6}$/.test(normalizedPin)) {
      setJoinState({
        status: "error",
        message: "Entre les 6 chiffres du PIN affiché au tableau.",
      });
      return;
    }

    joinedRef.current = false;
    joinRequestRef.current = { avatarId, pin: normalizedPin };
    setJoinState({ status: "connecting", message: "Connexion à la session…" });
    const socket = socketRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({ type: "participant:join", pin: normalizedPin, avatarId }),
      );
      return;
    }
    setConnectionNonce((value) => value + 1);
  }

  useEffect(() => {
    let disposed = false;
    let reconnectTimer: number | undefined;

    function connect() {
      if (disposed) return;
      const socket = new WebSocket(getLiveSocketUrl());
      socketRef.current = socket;

      socket.addEventListener("open", () => {
        reconnectAttemptRef.current = 0;
        const request = joinRequestRef.current;
        if (request && !joinedRef.current) {
          socket.send(JSON.stringify({ type: "participant:join", ...request }));
        }
      });

      socket.addEventListener("message", (event) => {
      let message: unknown;
      try {
        message = JSON.parse(String(event.data));
      } catch {
        setJoinState({ status: "error", message: "Réponse live invalide." });
        return;
      }

      if (
        typeof message === "object" &&
        message !== null &&
        "type" in message &&
        message.type === "live:state" &&
        "currentQuestion" in message &&
        "revealedAnswer" in message &&
        "ownAnswer" in message &&
        isStudentQuestion(message.currentQuestion) &&
        isStudentReveal(message.revealedAnswer) &&
        (message.ownAnswer === null ||
          (typeof message.ownAnswer === "object" &&
            message.ownAnswer !== null &&
            "choiceIndex" in message.ownAnswer &&
            "roundId" in message.ownAnswer &&
            typeof message.ownAnswer.choiceIndex === "number" &&
            typeof message.ownAnswer.roundId === "string"))
      ) {
        const nextQuestion = message.currentQuestion;
        const nextReveal = message.revealedAnswer;
        const ownAnswer =
          message.ownAnswer === null
            ? null
            : {
                choiceIndex: Number(message.ownAnswer.choiceIndex),
                roundId: String(message.ownAnswer.roundId),
              };
        setCurrentQuestion((previousQuestion) => {
          if (previousQuestion?.roundId !== nextQuestion?.roundId) {
            setAnswerState(
              ownAnswer &&
              nextQuestion &&
              ownAnswer.roundId === nextQuestion.roundId
                ? {
                    status: "accepted",
                    message: "Réponse enregistrée.",
                    questionId: nextQuestion.id,
                    selectedChoiceIndex: ownAnswer.choiceIndex,
                  }
                : { status: "idle", message: "" },
            );
          } else if (
            ownAnswer &&
            nextQuestion &&
            ownAnswer.roundId === nextQuestion.roundId
          ) {
            setAnswerState({
              status: "accepted",
              message: "Réponse enregistrée.",
              questionId: nextQuestion.id,
              selectedChoiceIndex: ownAnswer.choiceIndex,
            });
          }
          return nextQuestion;
        });
        setRevealedAnswer(nextReveal);
        return;
      }

      if (
        typeof message === "object" &&
        message !== null &&
        "type" in message &&
        message.type === "participant:joined" &&
        "participant" in message &&
        typeof message.participant === "object" &&
        message.participant !== null &&
        "displayName" in message.participant &&
        typeof message.participant.displayName === "string"
      ) {
        joinedRef.current = true;
        joinRequestRef.current = null;
        setJoinState({
          status: "joined",
          message: "Tu es dans la session. Garde cette page ouverte.",
          displayName: message.participant.displayName,
        });
        return;
      }

      if (
        typeof message === "object" &&
        message !== null &&
        "type" in message &&
        message.type === "answer:accepted" &&
        "choiceIndex" in message &&
        "roundId" in message &&
        typeof message.choiceIndex === "number" &&
        typeof message.roundId === "string"
      ) {
        playSoundRef.current("answer");
        setAnswerState({
          status: "accepted",
          message: "Réponse enregistrée.",
          selectedChoiceIndex: message.choiceIndex,
        });
        return;
      }

      if (
        typeof message === "object" &&
        message !== null &&
        "type" in message &&
        message.type === "error"
      ) {
        if (joinedRef.current) {
          setAnswerState({
            status: "error",
            message: "Réponse refusée. Recharge si le problème continue.",
          });
        } else {
          setJoinState({
            status: "error",
            message: "Session ou personnage invalide.",
          });
        }
      }
      });

      socket.addEventListener("close", () => {
        if (disposed || socketRef.current !== socket) return;
        joinedRef.current = false;
        setJoinState((current) => ({
          status: "connecting",
          displayName: current.displayName,
          message: "Connexion interrompue, nouvelle tentative…",
        }));
        const attempt = reconnectAttemptRef.current++;
        const delay = Math.min(15_000, 1_000 * 2 ** Math.min(attempt, 4));
        reconnectTimer = window.setTimeout(connect, delay);
      });
    }

    connect();
    return () => {
      disposed = true;
      if (reconnectTimer !== undefined) window.clearTimeout(reconnectTimer);
      if (socketRef.current) socketRef.current.close();
    };
  }, [connectionNonce]);

  function submitAnswer(choiceIndex: number) {
    if (!currentQuestion || joinState.status !== "joined") return;
    if (revealedAnswer) return;
    if (remainingSeconds <= 0) {
      setAnswerState({
        status: "error",
        message: "Temps écoulé.",
        questionId: currentQuestion.id,
      });
      return;
    }
    if (answerState.status === "accepted" || answerState.status === "sending") {
      return;
    }

    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      setAnswerState({
        status: "error",
        message: "Connexion live interrompue.",
      });
      return;
    }

    setAnswerState({
      status: "sending",
      message: "Réponse en cours d’envoi…",
      questionId: currentQuestion.id,
      selectedChoiceIndex: choiceIndex,
    });
    socket.send(
      JSON.stringify({
        type: "answer:submit",
        choiceIndex,
        roundId: currentQuestion.roundId,
      }),
    );
  }

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
    <section className={styles.liveShell} aria-labelledby="live-title">
      <div className={styles.liveIntro}>
        <p className={styles.eyebrow}>Entrée joueur</p>
        <h1 id="live-title">Choisis ton personnage</h1>
        <p>
          Aucun pseudo libre : ton nom de joueur est généré automatiquement avec
          le personnage choisi.
        </p>
      </div>

      <div className={styles.avatarGrid} aria-label="Personnages disponibles">
        {LIVE_AVATARS.map((avatar) => (
          <button
            className={`${styles.avatarButton} ${avatarId === avatar.id ? styles.avatarSelected : ""}`}
            key={avatar.id}
            type="button"
            onClick={() => setAvatarId(avatar.id)}
            aria-pressed={avatarId === avatar.id}
          >
            <span
              className={`${styles.avatarFace} ${styles[`avatarColor${avatar.color}`]} ${styles[`avatarAccessory${avatar.accessory}`]}`}
              aria-hidden="true"
            />
            <span>{avatar.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.joinPanel}>
        <div
          className={`${styles.avatarPreview} ${styles[`avatarColor${selectedAvatar.color}`]} ${styles[`avatarAccessory${selectedAvatar.accessory}`]}`}
          aria-hidden="true"
        />
        <label>
          <span>PIN session</span>
          <input
            inputMode="numeric"
            maxLength={6}
            pattern="[0-9]{6}"
            value={pin}
            onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="000000"
          />
        </label>
        <button type="button" onClick={joinLiveSession}>
          Rejoindre
        </button>
      </div>

      <p
        className={`${styles.joinFeedback} ${styles[`joinFeedback${joinState.status}`]}`}
        aria-live="polite"
      >
        {joinState.displayName ? <strong>{joinState.displayName}</strong> : null}
        {joinState.message}
      </p>

      {joinState.status === "joined" ? (
        <section
          className={styles.studentQuestionPanel}
          aria-labelledby="student-question-title"
        >
          {currentQuestion ? (
            <>
              <div className={styles.studentQuestionHeading}>
                <div>
                  <p className={styles.eyebrow}>Question en cours</p>
                  <h2 id="student-question-title">{currentQuestion.title}</h2>
                </div>
                <div className={styles.studentQuestionTools}>
                  <button
                    type="button"
                    onClick={sound.enabled ? sound.disable : sound.enable}
                    disabled={!sound.available}
                    aria-pressed={sound.enabled}
                  >
                    {sound.enabled ? "Son activé" : "Son coupé"}
                  </button>
                  <span>{currentQuestion.points} pts</span>
                </div>
              </div>
              <div className={styles.studentCountdown}>
                <strong>{remainingSeconds}s</strong>
                <span
                  className={isCountdownUrgent ? styles.studentCountdownUrgent : ""}
                  aria-hidden="true"
                >
                  <i style={{ inlineSize: `${countdownRatio * 100}%` }} />
                </span>
              </div>
              <p className={styles.studentQuestionPrompt}>
                {currentQuestion.prompt}
              </p>
              <div className={styles.studentChoiceGrid}>
                {currentQuestion.choices.map((choice, index) => (
                  <button
                    className={[
                      answerState.selectedChoiceIndex === index
                        ? styles.studentChoiceSelected
                        : "",
                      revealedAnswer?.correctChoiceIndex === index
                        ? styles.studentChoiceCorrect
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    disabled={
                      revealedAnswer !== null ||
                      remainingSeconds <= 0 ||
                      answerState.status === "accepted" ||
                      answerState.status === "sending"
                    }
                    key={`${currentQuestion.id}-${choice}`}
                    onClick={() => submitAnswer(index)}
                    type="button"
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {choice}
                  </button>
                ))}
              </div>
              <p
                className={`${styles.studentQuestionHint} ${styles[`studentAnswer${answerState.status}`]}`}
                aria-live="polite"
              >
                {revealedAnswer
                  ? "Correction affichée."
                  : remainingSeconds <= 0
                    ? "Temps écoulé."
                  : answerState.message ||
                    "Choisis une réponse. Elle sera verrouillée après envoi."}
              </p>
              {revealedAnswer ? (
                <div className={styles.studentRevealPanel}>
                  <p className={styles.eyebrow}>Correction</p>
                  <strong>
                    Réponse{" "}
                    {String.fromCharCode(65 + revealedAnswer.correctChoiceIndex)}
                  </strong>
                  <p>{revealedAnswer.explanation}</p>
                </div>
              ) : null}
            </>
          ) : (
            <div className={styles.studentQuestionEmpty}>
              <p className={styles.eyebrow}>Question en cours</p>
              <h2 id="student-question-title">En attente</h2>
              <p>La question apparaîtra ici quand elle sera envoyée.</p>
            </div>
          )}
        </section>
      ) : null}
    </section>
  );
}
