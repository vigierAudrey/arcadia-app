import type { IncomingMessage, Server } from "node:http";
import type { Duplex } from "node:stream";

import { WebSocket, WebSocketServer } from "ws";

import { ADMIN_SESSION_COOKIE } from "@/server/auth/constants";
import {
  getAdminBySessionToken,
  hashAdminSessionToken,
  isAdminSessionToken,
} from "@/server/auth/session-token";
import { CLASS_SESSION_COOKIE } from "@/server/class-auth/constants";
import {
  getClassroomBySessionToken,
  hashClassSessionToken,
  isClassSessionToken,
} from "@/server/class-auth/session-token";
import {
  getLiveParticipantAnswer,
  getLiveSession,
  joinLiveSession,
  listLiveSessionsForClassroom,
  resumeLiveParticipant,
  submitLiveAnswer,
  type LiveParticipant,
  type LiveQuestionSnapshot,
  type LiveRevealSnapshot,
  subscribeLiveSessions,
} from "./store";

const LIVE_WS_PATH = "/live";
const MAX_MESSAGE_BYTES = 1_024;
const HEARTBEAT_INTERVAL_MS = 30_000;
const MESSAGE_WINDOW_MS = 10_000;
const MAX_MESSAGES_PER_WINDOW = 24;
const UPGRADE_WINDOW_MS = 60_000;
const MAX_UPGRADES_PER_CREDENTIAL = 10;
const MAX_SOCKETS_PER_CREDENTIAL = 3;
const MAX_JOIN_ATTEMPTS_PER_MINUTE = 5;

export type LiveWebSocketAuth = {
  getAdmin: (token: string | undefined) => Promise<object | null>;
  getClassroom: (
    token: string | undefined,
  ) => Promise<{ classroomId: string } | null>;
  hashAdminToken: (token: string) => string;
  hashClassToken: (token: string) => string;
  isAdminToken: (token: string) => boolean;
  isClassToken: (token: string) => boolean;
};

const defaultLiveWebSocketAuth: LiveWebSocketAuth = {
  getAdmin: getAdminBySessionToken,
  getClassroom: getClassroomBySessionToken,
  hashAdminToken: hashAdminSessionToken,
  hashClassToken: hashClassSessionToken,
  isAdminToken: isAdminSessionToken,
  isClassToken: isClassSessionToken,
};

type LiveSocketData = {
  authToken: string;
  classroomId: string;
  credentialKey: string;
  isAlive: boolean;
  joinAttemptTimes: number[];
  messageTimes: number[];
  participantId?: string;
  role: "admin" | "student";
  sessionId?: string;
  validatingAccess: boolean;
};
type LiveSocket = WebSocket & { arcadia?: LiveSocketData };
type SerializedLiveQuestion = Omit<LiveQuestionSnapshot, "sentAt"> & {
  sentAt: string;
};
type SerializedLiveReveal = Omit<LiveRevealSnapshot, "revealedAt"> & {
  revealedAt: string;
};
type PublicParticipant = Pick<
  LiveParticipant,
  "id" | "avatarId" | "displayName" | "score"
>;
type LiveServerMessage =
  | { type: "connected" }
  | {
      type: "live:state";
      active: boolean;
      expiresAt: string | null;
      phase: "waiting" | "question" | "reveal";
      currentQuestion: SerializedLiveQuestion | null;
      revealedAnswer: SerializedLiveReveal | null;
      ownAnswer: { choiceIndex: number; roundId: string } | null;
    }
  | {
      type: "live:state";
      active: boolean;
      expiresAt: string | null;
      phase: "waiting" | "question" | "reveal";
      currentQuestion: SerializedLiveQuestion | null;
      revealedAnswer: SerializedLiveReveal | null;
      answerSummary: { answeredCount: number; totalParticipants: number };
      participants: PublicParticipant[];
    }
  | { type: "participant:joined"; participant: PublicParticipant }
  | { type: "answer:accepted"; choiceIndex: number; roundId: string }
  | { type: "error"; message: string };

const upgradeAttempts = new Map<string, number[]>();

function serializeLiveQuestion(
  question: LiveQuestionSnapshot | null,
): SerializedLiveQuestion | null {
  if (!question) return null;
  return {
    ...question,
    choices: [...question.choices],
    sentAt: question.sentAt.toISOString(),
  };
}

function serializeLiveReveal(reveal: LiveRevealSnapshot | null) {
  if (!reveal) return null;
  return { ...reveal, revealedAt: reveal.revealedAt.toISOString() };
}

function toPublicParticipant(participant: LiveParticipant): PublicParticipant {
  return {
    id: participant.id,
    avatarId: participant.avatarId,
    displayName: participant.displayName,
    score: participant.score,
  };
}

function sendJson(socket: WebSocket, message: LiveServerMessage) {
  if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(message));
}

function parseCookies(cookieHeader: string | undefined) {
  const cookies = new Map<string, string>();
  if (!cookieHeader || cookieHeader.length > 4_096) return cookies;
  for (const part of cookieHeader.split(";")) {
    const separatorIndex = part.indexOf("=");
    if (separatorIndex <= 0) continue;
    const name = part.slice(0, separatorIndex).trim();
    const value = part.slice(separatorIndex + 1).trim();
    if (!name || cookies.has(name)) continue;
    try {
      cookies.set(name, decodeURIComponent(value));
    } catch {
      cookies.set(name, value);
    }
  }
  return cookies;
}

function getRequestUrl(request: IncomingMessage) {
  return new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
}

function firstHeaderValue(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.split(",", 1)[0]?.trim() ?? "";
}

export function isAllowedLiveOrigin(request: IncomingMessage) {
  const origin = firstHeaderValue(request.headers.origin);
  const forwardedHost = firstHeaderValue(request.headers["x-forwarded-host"]);
  const expectedHost = forwardedHost || firstHeaderValue(request.headers.host);
  if (!origin || !expectedHost || origin.length > 300 || expectedHost.length > 255) {
    return false;
  }
  try {
    const parsedOrigin = new URL(origin);
    const forwardedProtocol = firstHeaderValue(request.headers["x-forwarded-proto"]);
    const expectedProtocol =
      forwardedProtocol ||
      ((request.socket as typeof request.socket & { encrypted?: boolean })
        .encrypted
        ? "https"
        : "http");
    return (
      parsedOrigin.host === expectedHost &&
      parsedOrigin.protocol === `${expectedProtocol}:`
    );
  } catch {
    return false;
  }
}

function writeUpgradeRejection(
  socket: Duplex,
  status: 401 | 403 | 404 | 429,
) {
  const labels = {
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    429: "Too Many Requests",
  } as const;
  socket.write(
    `HTTP/1.1 ${status} ${labels[status]}\r\nConnection: close\r\nCache-Control: no-store\r\n\r\n`,
  );
  socket.destroy();
}

function consumeUpgradeAttempt(credentialKey: string, now = Date.now()) {
  const recent = (upgradeAttempts.get(credentialKey) ?? []).filter(
    (timestamp) => timestamp > now - UPGRADE_WINDOW_MS,
  );
  if (recent.length >= MAX_UPGRADES_PER_CREDENTIAL) return false;
  recent.push(now);
  upgradeAttempts.set(credentialKey, recent);
  if (upgradeAttempts.size > 200) {
    for (const [key, attempts] of upgradeAttempts) {
      if (!attempts.some((timestamp) => timestamp > now - UPGRADE_WINDOW_MS)) {
        upgradeAttempts.delete(key);
      }
    }
  }
  return true;
}

function consumeMessage(socket: LiveSocket, now = Date.now()) {
  const state = socket.arcadia;
  if (!state) return false;
  state.messageTimes = state.messageTimes.filter(
    (timestamp) => timestamp > now - MESSAGE_WINDOW_MS,
  );
  if (state.messageTimes.length >= MAX_MESSAGES_PER_WINDOW) return false;
  state.messageTimes.push(now);
  return true;
}

function consumeJoinAttempt(socket: LiveSocket, now = Date.now()) {
  const state = socket.arcadia;
  if (!state) return false;
  state.joinAttemptTimes = state.joinAttemptTimes.filter(
    (timestamp) => timestamp > now - 60_000,
  );
  if (state.joinAttemptTimes.length >= MAX_JOIN_ATTEMPTS_PER_MINUTE) return false;
  state.joinAttemptTimes.push(now);
  return true;
}

function sendParticipantJoined(socket: LiveSocket, participant: LiveParticipant) {
  sendJson(socket, {
    type: "participant:joined",
    participant: toPublicParticipant(participant),
  });
}

function sendLiveState(socket: LiveSocket) {
  const state = socket.arcadia;
  if (!state) return;
  const activeSession = state.sessionId
    ? getLiveSession(state.sessionId)
    : listLiveSessionsForClassroom(state.classroomId)[0] ?? null;
  const common = {
    type: "live:state" as const,
    active: activeSession !== null,
    expiresAt: activeSession?.expiresAt.toISOString() ?? null,
    phase:
      activeSession?.status === "question" || activeSession?.status === "reveal"
        ? activeSession.status
        : ("waiting" as const),
    currentQuestion: serializeLiveQuestion(activeSession?.currentQuestion ?? null),
    revealedAnswer: serializeLiveReveal(activeSession?.revealedAnswer ?? null),
  };
  if (state.role === "student") {
    sendJson(socket, {
      ...common,
      ownAnswer:
        activeSession && state.participantId
          ? getLiveParticipantAnswer(activeSession.id, state.participantId)
          : null,
    });
    return;
  }
  sendJson(socket, {
    ...common,
    answerSummary: activeSession?.answerSummary ?? {
      answeredCount: 0,
      totalParticipants: 0,
    },
    participants: activeSession?.participants.map(toPublicParticipant) ?? [],
  });
}

function handleClientMessage(socket: LiveSocket, data: WebSocket.RawData) {
  if (!socket.arcadia || socket.arcadia.role !== "student") {
    sendJson(socket, { type: "error", message: "Message invalide." });
    return;
  }
  if (!consumeMessage(socket)) {
    sendJson(socket, { type: "error", message: "Trop de messages." });
    socket.close(1008, "Rate limit exceeded");
    return;
  }
  if (Array.isArray(data) || data instanceof ArrayBuffer) {
    sendJson(socket, { type: "error", message: "Message invalide." });
    return;
  }
  const serialized = data.toString();
  const byteLength = Buffer.byteLength(serialized);
  if (byteLength > MAX_MESSAGE_BYTES) {
    sendJson(socket, { type: "error", message: "Message invalide." });
    socket.close(1009, "Message too large");
    return;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    sendJson(socket, { type: "error", message: "Message invalide." });
    return;
  }
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("type" in parsed) ||
    typeof parsed.type !== "string"
  ) {
    sendJson(socket, { type: "error", message: "Message invalide." });
    return;
  }

  if (parsed.type === "participant:join") {
    if (!consumeJoinAttempt(socket)) {
      sendJson(socket, { type: "error", message: "Trop de tentatives." });
      socket.close(1008, "Join rate limit exceeded");
      return;
    }
    if (
      socket.arcadia.participantId ||
      !("pin" in parsed) ||
      !("avatarId" in parsed) ||
      typeof parsed.pin !== "string" ||
      typeof parsed.avatarId !== "string" ||
      parsed.pin.length !== 6 ||
      parsed.avatarId.length > 80
    ) {
      sendJson(socket, { type: "error", message: "Message invalide." });
      return;
    }
    try {
      const { participant, session } = joinLiveSession({
        avatarId: parsed.avatarId,
        classroomId: socket.arcadia.classroomId,
        ownerKey: socket.arcadia.credentialKey,
        pin: parsed.pin,
      });
      socket.arcadia.participantId = participant.id;
      socket.arcadia.sessionId = session.id;
      sendParticipantJoined(socket, participant);
      sendLiveState(socket);
    } catch {
      sendJson(socket, {
        type: "error",
        message: "Session ou personnage invalide.",
      });
    }
    return;
  }

  if (parsed.type === "answer:submit") {
    if (
      !("choiceIndex" in parsed) ||
      !("roundId" in parsed) ||
      typeof parsed.choiceIndex !== "number" ||
      typeof parsed.roundId !== "string" ||
      parsed.roundId.length > 40 ||
      !socket.arcadia.participantId ||
      !socket.arcadia.sessionId
    ) {
      sendJson(socket, { type: "error", message: "Réponse invalide." });
      return;
    }
    try {
      submitLiveAnswer({
        choiceIndex: parsed.choiceIndex,
        classroomId: socket.arcadia.classroomId,
        participantId: socket.arcadia.participantId,
        roundId: parsed.roundId,
        sessionId: socket.arcadia.sessionId,
      });
      sendJson(socket, {
        type: "answer:accepted",
        choiceIndex: parsed.choiceIndex,
        roundId: parsed.roundId,
      });
      sendLiveState(socket);
    } catch (error) {
      const duplicate =
        error instanceof Error &&
        error.message === "LIVE_ANSWER_ALREADY_SUBMITTED";
      sendJson(socket, {
        type: "error",
        message: duplicate ? "Réponse déjà envoyée." : "Réponse invalide.",
      });
    }
    return;
  }
  if (parsed.type !== "ping") {
    sendJson(socket, { type: "error", message: "Message invalide." });
    return;
  }
  sendLiveState(socket);
}

async function validateSocketAccess(
  socket: LiveSocket,
  auth: LiveWebSocketAuth,
) {
  const state = socket.arcadia;
  if (!state || state.validatingAccess) return;
  state.validatingAccess = true;
  try {
    const valid =
      state.role === "admin"
        ? (await auth.getAdmin(state.authToken)) !== null &&
          !!state.sessionId &&
          getLiveSession(state.sessionId) !== null
        : (await auth.getClassroom(state.authToken))?.classroomId ===
          state.classroomId;
    if (!valid) socket.close(1008, "Access expired");
  } catch {
    socket.close(1011, "Access validation failed");
  } finally {
    state.validatingAccess = false;
  }
}

export function attachLiveWebSocketServer(
  server: Server,
  auth: LiveWebSocketAuth = defaultLiveWebSocketAuth,
) {
  const webSocketServer = new WebSocketServer({
    noServer: true,
    clientTracking: true,
    maxPayload: MAX_MESSAGE_BYTES,
    perMessageDeflate: false,
  });
  const unsubscribe = subscribeLiveSessions((classroomId) => {
    for (const client of webSocketServer.clients) {
      const socket = client as LiveSocket;
      if (socket.arcadia?.classroomId === classroomId) sendLiveState(socket);
    }
  });
  const heartbeat = setInterval(() => {
    for (const client of webSocketServer.clients) {
      const socket = client as LiveSocket;
      if (socket.arcadia?.isAlive === false) {
        socket.terminate();
        continue;
      }
      if (socket.arcadia) socket.arcadia.isAlive = false;
      socket.ping();
      void validateSocketAccess(socket, auth);
    }
  }, HEARTBEAT_INTERVAL_MS);
  heartbeat.unref();

  server.on("upgrade", async (request, socket, head) => {
    if (getRequestUrl(request).pathname !== LIVE_WS_PATH) {
      writeUpgradeRejection(socket, 404);
      return;
    }
    if (!isAllowedLiveOrigin(request)) {
      writeUpgradeRejection(socket, 403);
      return;
    }
    try {
      const cookies = parseCookies(request.headers.cookie);
      const requestedSessionId = getRequestUrl(request).searchParams.get("sessionId");
      const classToken = cookies.get(CLASS_SESSION_COOKIE);
      const adminToken = cookies.get(ADMIN_SESSION_COOKIE);
      const validClassToken =
        classToken && auth.isClassToken(classToken) ? classToken : null;
      const validAdminToken =
        adminToken && auth.isAdminToken(adminToken) ? adminToken : null;
      const wantsAdminConnection = requestedSessionId !== null;
      const credentialKey = wantsAdminConnection
        ? validAdminToken
          ? `admin:${auth.hashAdminToken(validAdminToken)}`
          : null
        : validClassToken
          ? `student:${auth.hashClassToken(validClassToken)}`
          : null;
      if (!credentialKey || !consumeUpgradeAttempt(credentialKey)) {
        writeUpgradeRejection(socket, credentialKey ? 429 : 401);
        return;
      }
      const openForCredential = Array.from(webSocketServer.clients).filter(
        (client) =>
          (client as LiveSocket).arcadia?.credentialKey === credentialKey,
      ).length;
      if (openForCredential >= MAX_SOCKETS_PER_CREDENTIAL) {
        writeUpgradeRejection(socket, 429);
        return;
      }

      const classAccess = !wantsAdminConnection && validClassToken
        ? await auth.getClassroom(validClassToken)
        : null;
      if (classAccess && validClassToken) {
        webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
          const liveSocket = webSocket as LiveSocket;
          liveSocket.arcadia = {
            authToken: validClassToken,
            classroomId: classAccess.classroomId,
            credentialKey,
            isAlive: true,
            joinAttemptTimes: [],
            messageTimes: [],
            role: "student",
            validatingAccess: false,
          };
          webSocketServer.emit("connection", liveSocket, request);
        });
        return;
      }

      const requestedSession = requestedSessionId
        ? getLiveSession(requestedSessionId)
        : null;
      const admin = validAdminToken
        ? await auth.getAdmin(validAdminToken)
        : null;
      if (!admin || !requestedSession || !validAdminToken) {
        writeUpgradeRejection(socket, 401);
        return;
      }
      webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
        const liveSocket = webSocket as LiveSocket;
        liveSocket.arcadia = {
          authToken: validAdminToken,
          classroomId: requestedSession.classroomId,
          credentialKey,
          isAlive: true,
          joinAttemptTimes: [],
          messageTimes: [],
          role: "admin",
          sessionId: requestedSession.id,
          validatingAccess: false,
        };
        webSocketServer.emit("connection", liveSocket, request);
      });
    } catch {
      writeUpgradeRejection(socket, 401);
    }
  });

  webSocketServer.on("connection", (socket: LiveSocket) => {
    sendJson(socket, { type: "connected" });
    if (socket.arcadia?.role === "student") {
      const resumed = resumeLiveParticipant(
        socket.arcadia.classroomId,
        socket.arcadia.credentialKey,
      );
      if (resumed) {
        socket.arcadia.participantId = resumed.participant.id;
        socket.arcadia.sessionId = resumed.session.id;
        sendParticipantJoined(socket, resumed.participant);
      }
    }
    sendLiveState(socket);
    socket.on("pong", () => {
      if (socket.arcadia) socket.arcadia.isAlive = true;
    });
    socket.on("message", (data) => handleClientMessage(socket, data));
  });
  webSocketServer.on("close", () => {
    unsubscribe();
    clearInterval(heartbeat);
  });
  return webSocketServer;
}
