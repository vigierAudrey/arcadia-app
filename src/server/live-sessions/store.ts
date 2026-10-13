import { randomBytes, randomUUID } from "node:crypto";

import { getLiveAvatar } from "@/features/live/avatars";
import {
  getLiveQuestion,
  type LiveQuestionType,
} from "@/features/live/question-bank";

const LIVE_SESSION_DURATION_MS = 2 * 60 * 60 * 1000;
const LIVE_PIN_LENGTH = 6;
const MAX_LIVE_SESSIONS = 20;
const MAX_LIVE_SESSIONS_PER_CLASSROOM = 1;
const MAX_PARTICIPANTS_PER_SESSION = 24;

export type LiveSessionStatus = "waiting" | "question" | "reveal" | "ended";

export type LiveParticipant = {
  id: string;
  avatarId: string;
  displayName: string;
  joinedAt: Date;
  score: number;
};

export type LiveQuestionSnapshot = {
  id: string;
  type: LiveQuestionType;
  title: string;
  prompt: string;
  choices: string[];
  timeLimitSeconds: number;
  points: number;
  sentAt: Date;
};

export type LiveRevealSnapshot = {
  correctChoiceIndex: number;
  explanation: string;
  revealedAt: Date;
};

export type LiveAnswerSummary = {
  answeredCount: number;
  correctCount: number;
  totalParticipants: number;
};

export type LiveSessionSummary = {
  id: string;
  classroomId: string;
  pin: string;
  status: LiveSessionStatus;
  createdAt: Date;
  expiresAt: Date;
  currentQuestion: LiveQuestionSnapshot | null;
  revealedAnswer: LiveRevealSnapshot | null;
  answerSummary: LiveAnswerSummary;
  participants: LiveParticipant[];
};

type LiveParticipantRecord = LiveParticipant;
type LiveAnswerRecord = {
  choiceIndex: number;
  correct: boolean;
  pointsAwarded: number;
  questionId: string;
  submittedAt: Date;
};

type LiveSessionRecord = Omit<
  LiveSessionSummary,
  "answerSummary" | "participants"
> & {
  answers: Map<string, LiveAnswerRecord>;
  participants: Map<string, LiveParticipantRecord>;
};

type LiveSessionStore = {
  listeners: Set<() => void>;
  sessions: Map<string, LiveSessionRecord>;
};

declare global {
  var __arcadiaLiveSessionStore: LiveSessionStore | undefined;
}

function getStore() {
  globalThis.__arcadiaLiveSessionStore ??= {
    listeners: new Set<() => void>(),
    sessions: new Map<string, LiveSessionRecord>(),
  };
  return globalThis.__arcadiaLiveSessionStore;
}

function notifyLiveSessionListeners() {
  for (const listener of getStore().listeners) {
    listener();
  }
}

export function subscribeLiveSessions(listener: () => void) {
  const listeners = getStore().listeners;
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function cloneSession(session: LiveSessionRecord): LiveSessionSummary {
  const answers = Array.from(session.answers.values());
  return {
    ...session,
    createdAt: new Date(session.createdAt),
    expiresAt: new Date(session.expiresAt),
    currentQuestion: session.currentQuestion
      ? {
          ...session.currentQuestion,
          choices: [...session.currentQuestion.choices],
          sentAt: new Date(session.currentQuestion.sentAt),
        }
      : null,
    revealedAnswer: session.revealedAnswer
      ? {
          ...session.revealedAnswer,
          revealedAt: new Date(session.revealedAnswer.revealedAt),
        }
      : null,
    answerSummary: {
      answeredCount: answers.length,
      correctCount: answers.filter((answer) => answer.correct).length,
      totalParticipants: session.participants.size,
    },
    participants: Array.from(session.participants.values()).map((participant) => ({
      ...participant,
      joinedAt: new Date(participant.joinedAt),
    })),
  };
}

function isExpired(session: LiveSessionRecord, now: Date) {
  return session.expiresAt <= now;
}

export function purgeExpiredLiveSessions(now = new Date()) {
  const store = getStore();
  let purged = 0;

  for (const [id, session] of store.sessions) {
    if (session.status === "ended" || isExpired(session, now)) {
      store.sessions.delete(id);
      purged += 1;
    }
  }

  if (purged > 0) notifyLiveSessionListeners();
  return purged;
}

function generatePin() {
  const value = randomBytes(4).readUInt32BE(0) % 1_000_000;
  return value.toString().padStart(LIVE_PIN_LENGTH, "0");
}

function hasPin(pin: string) {
  for (const session of getStore().sessions.values()) {
    if (session.pin === pin && session.status !== "ended") return true;
  }
  return false;
}

function generateUniquePin() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const pin = generatePin();
    if (!hasPin(pin)) return pin;
  }
  throw new Error("LIVE_PIN_GENERATION_FAILED");
}

export function createLiveSession(classroomId: string, now = new Date()) {
  purgeExpiredLiveSessions(now);

  const store = getStore();
  if (store.sessions.size >= MAX_LIVE_SESSIONS) {
    throw new Error("LIVE_SESSION_STORE_FULL");
  }

  const activeForClassroom = listLiveSessionsForClassroom(classroomId, now);
  if (activeForClassroom.length >= MAX_LIVE_SESSIONS_PER_CLASSROOM) {
    throw new Error("LIVE_SESSION_ALREADY_ACTIVE");
  }

  const session: LiveSessionRecord = {
    id: randomUUID(),
    classroomId,
    pin: generateUniquePin(),
    status: "waiting",
    createdAt: now,
    expiresAt: new Date(now.getTime() + LIVE_SESSION_DURATION_MS),
    currentQuestion: null,
    revealedAnswer: null,
    answers: new Map<string, LiveAnswerRecord>(),
    participants: new Map<string, LiveParticipantRecord>(),
  };

  store.sessions.set(session.id, session);
  notifyLiveSessionListeners();
  return cloneSession(session);
}

export function getLiveSession(sessionId: string, now = new Date()) {
  purgeExpiredLiveSessions(now);
  const session = getStore().sessions.get(sessionId);
  if (!session || session.status === "ended") return null;
  return cloneSession(session);
}

export function listLiveSessionsForClassroom(
  classroomId: string,
  now = new Date(),
) {
  purgeExpiredLiveSessions(now);
  const sessions: LiveSessionSummary[] = [];

  for (const session of getStore().sessions.values()) {
    if (session.classroomId === classroomId && session.status !== "ended") {
      sessions.push(cloneSession(session));
    }
  }

  return sessions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function sendLiveQuestionToSession({
  now = new Date(),
  questionId,
  sessionId,
}: {
  now?: Date;
  questionId: string;
  sessionId: string;
}) {
  purgeExpiredLiveSessions(now);

  const session = getStore().sessions.get(sessionId);
  if (!session || session.status === "ended" || isExpired(session, now)) {
    throw new Error("LIVE_SESSION_NOT_FOUND");
  }

  const question = getLiveQuestion(questionId);
  if (!question) {
    throw new Error("LIVE_QUESTION_NOT_FOUND");
  }

  session.currentQuestion = {
    id: question.id,
    type: question.type,
    title: question.title,
    prompt: question.prompt,
    choices: [...question.choices],
    timeLimitSeconds: question.timeLimitSeconds,
    points: question.points,
    sentAt: now,
  };
  session.status = "question";
  session.revealedAnswer = null;
  session.answers.clear();
  notifyLiveSessionListeners();

  return cloneSession(session);
}

export function revealLiveQuestionForSession({
  now = new Date(),
  sessionId,
}: {
  now?: Date;
  sessionId: string;
}) {
  purgeExpiredLiveSessions(now);

  const session = getStore().sessions.get(sessionId);
  if (!session || session.status === "ended" || isExpired(session, now)) {
    throw new Error("LIVE_SESSION_NOT_FOUND");
  }

  const question = session.currentQuestion;
  if (!question) {
    throw new Error("LIVE_QUESTION_NOT_ACTIVE");
  }

  const sourceQuestion = getLiveQuestion(question.id);
  if (!sourceQuestion) {
    throw new Error("LIVE_QUESTION_NOT_FOUND");
  }

  session.status = "reveal";
  session.revealedAnswer = {
    correctChoiceIndex: sourceQuestion.correctChoiceIndex,
    explanation: sourceQuestion.explanation,
    revealedAt: now,
  };
  notifyLiveSessionListeners();

  return cloneSession(session);
}

export function joinLiveSession({
  avatarId,
  classroomId,
  pin,
  now = new Date(),
}: {
  avatarId: string;
  classroomId: string;
  pin: string;
  now?: Date;
}) {
  purgeExpiredLiveSessions(now);

  if (!/^\d{6}$/.test(pin)) {
    throw new Error("LIVE_SESSION_INVALID_PIN");
  }

  const avatar = getLiveAvatar(avatarId);
  if (!avatar) {
    throw new Error("LIVE_SESSION_INVALID_AVATAR");
  }

  const session = Array.from(getStore().sessions.values()).find(
    (item) =>
      item.classroomId === classroomId &&
      item.pin === pin &&
      item.status !== "ended" &&
      !isExpired(item, now),
  );

  if (!session) {
    throw new Error("LIVE_SESSION_NOT_FOUND");
  }

  if (session.participants.size >= MAX_PARTICIPANTS_PER_SESSION) {
    throw new Error("LIVE_SESSION_FULL");
  }

  const sameAvatarCount = Array.from(session.participants.values()).filter(
    (participant) => participant.avatarId === avatar.id,
  ).length;
  const participant: LiveParticipantRecord = {
    id: randomUUID(),
    avatarId: avatar.id,
    displayName: `${avatar.label} ${sameAvatarCount + 1}`,
    joinedAt: now,
    score: 0,
  };

  session.participants.set(participant.id, participant);
  notifyLiveSessionListeners();

  return {
    session: cloneSession(session),
    participant: {
      ...participant,
      joinedAt: new Date(participant.joinedAt),
    },
  };
}

export function submitLiveAnswer({
  choiceIndex,
  classroomId,
  now = new Date(),
  participantId,
}: {
  choiceIndex: number;
  classroomId: string;
  now?: Date;
  participantId: string;
}) {
  purgeExpiredLiveSessions(now);

  if (!Number.isInteger(choiceIndex)) {
    throw new Error("LIVE_ANSWER_INVALID_CHOICE");
  }

  const session = listLiveSessionRecordsForClassroom(classroomId, now)[0] ?? null;
  if (!session) {
    throw new Error("LIVE_SESSION_NOT_FOUND");
  }

  const participant = session.participants.get(participantId);
  if (!participant) {
    throw new Error("LIVE_PARTICIPANT_NOT_FOUND");
  }

  const question = session.currentQuestion;
  if (!question) {
    throw new Error("LIVE_QUESTION_NOT_ACTIVE");
  }

  if (session.status !== "question") {
    throw new Error("LIVE_QUESTION_NOT_ACTIVE");
  }

  const answerDeadline =
    question.sentAt.getTime() + question.timeLimitSeconds * 1_000;
  if (now.getTime() > answerDeadline) {
    throw new Error("LIVE_QUESTION_CLOSED");
  }

  if (choiceIndex < 0 || choiceIndex >= question.choices.length) {
    throw new Error("LIVE_ANSWER_INVALID_CHOICE");
  }

  if (session.answers.has(participantId)) {
    throw new Error("LIVE_ANSWER_ALREADY_SUBMITTED");
  }

  const sourceQuestion = getLiveQuestion(question.id);
  if (!sourceQuestion) {
    throw new Error("LIVE_QUESTION_NOT_FOUND");
  }

  const correct = sourceQuestion.correctChoiceIndex === choiceIndex;
  const pointsAwarded = correct ? question.points : 0;
  participant.score += pointsAwarded;
  session.answers.set(participantId, {
    choiceIndex,
    correct,
    pointsAwarded,
    questionId: question.id,
    submittedAt: now,
  });
  notifyLiveSessionListeners();

  return {
    accepted: true,
    correct,
    pointsAwarded,
    session: cloneSession(session),
  };
}

function listLiveSessionRecordsForClassroom(
  classroomId: string,
  now = new Date(),
) {
  purgeExpiredLiveSessions(now);
  return Array.from(getStore().sessions.values())
    .filter(
      (session) =>
        session.classroomId === classroomId &&
        session.status !== "ended" &&
        !isExpired(session, now),
    )
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function endLiveSession(sessionId: string, classroomId?: string) {
  const session = getStore().sessions.get(sessionId);
  if (!session || session.status === "ended") return false;
  if (classroomId && session.classroomId !== classroomId) return false;

  session.status = "ended";
  getStore().sessions.delete(sessionId);
  notifyLiveSessionListeners();
  return true;
}

export function resetLiveSessionsForTests() {
  getStore().sessions.clear();
  notifyLiveSessionListeners();
}
