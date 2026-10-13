import type { IncomingMessage, Server } from "node:http";
import type { Duplex } from "node:stream";

import { WebSocket, WebSocketServer } from "ws";

import { ADMIN_SESSION_COOKIE } from "@/server/auth/constants";
import { getAdminBySessionToken } from "@/server/auth/session-token";
import { CLASS_SESSION_COOKIE } from "@/server/class-auth/constants";
import { getClassroomBySessionToken } from "@/server/class-auth/session-token";

import {
  getLiveSession,
  joinLiveSession,
  listLiveSessionsForClassroom,
  submitLiveAnswer,
  type LiveQuestionSnapshot,
  type LiveRevealSnapshot,
  subscribeLiveSessions,
} from "./store";

const LIVE_WS_PATH = "/live";
const MAX_MESSAGE_BYTES = 1_024;
const HEARTBEAT_INTERVAL_MS = 30_000;

type LiveSocketData = {
  classroomId: string;
  isAlive: boolean;
  participantId?: string;
  sessionId?: string;
};

type LiveSocket = WebSocket & {
  arcadia?: LiveSocketData;
};

type LiveServerMessage =
  | { type: "connected" }
  | {
      type: "live:state";
      active: boolean;
      expiresAt: string | null;
      phase: "waiting" | "question" | "reveal";
      currentQuestion: SerializedLiveQuestion | null;
      revealedAnswer: SerializedLiveReveal | null;
      answerSummary: {
        answeredCount: number;
        totalParticipants: number;
      };
      participants: Array<{
        id: string;
        avatarId: string;
        displayName: string;
        score: number;
      }>;
    }
  | {
      type: "participant:joined";
      participant: {
        id: string;
        avatarId: string;
        displayName: string;
        score: number;
      };
    }
  | {
      type: "answer:accepted";
    }
  | { type: "error"; message: string };

type SerializedLiveQuestion = Omit<LiveQuestionSnapshot, "sentAt"> & {
  sentAt: string;
};

type SerializedLiveReveal = Omit<LiveRevealSnapshot, "revealedAt"> & {
  revealedAt: string;
};

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

function serializeLiveReveal(
  revealedAnswer: LiveRevealSnapshot | null,
): SerializedLiveReveal | null {
  if (!revealedAnswer) return null;
  return {
    ...revealedAnswer,
    revealedAt: revealedAnswer.revealedAt.toISOString(),
  };
}

function sendJson(socket: WebSocket, message: LiveServerMessage) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
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

function getRequestPath(request: IncomingMessage) {
  const host = request.headers.host ?? "localhost";
  const url = new URL(request.url ?? "/", `http://${host}`);
  return url.pathname;
}

function getRequestSearchParams(request: IncomingMessage) {
  const host = request.headers.host ?? "localhost";
  const url = new URL(request.url ?? "/", `http://${host}`);
  return url.searchParams;
}

function writeUpgradeRejection(socket: Duplex, status: 401 | 404) {
  const label = status === 401 ? "Unauthorized" : "Not Found";
  socket.write(`HTTP/1.1 ${status} ${label}\r\nConnection: close\r\n\r\n`);
  socket.destroy();
}

function sendLiveState(socket: LiveSocket) {
  const classroomId = socket.arcadia?.classroomId;
  if (!classroomId) return;

  const activeSession = socket.arcadia?.sessionId
    ? getLiveSession(socket.arcadia.sessionId)
    : listLiveSessionsForClassroom(classroomId)[0] ?? null;
  sendJson(socket, {
    type: "live:state",
    active: activeSession !== null,
    expiresAt: activeSession?.expiresAt.toISOString() ?? null,
    phase:
      activeSession?.status === "question" || activeSession?.status === "reveal"
        ? activeSession.status
        : "waiting",
    currentQuestion: serializeLiveQuestion(activeSession?.currentQuestion ?? null),
    revealedAnswer: serializeLiveReveal(activeSession?.revealedAnswer ?? null),
    answerSummary: activeSession?.answerSummary ?? {
      answeredCount: 0,
      totalParticipants: 0,
    },
    participants:
      activeSession?.participants.map((participant) => ({
        id: participant.id,
        avatarId: participant.avatarId,
        displayName: participant.displayName,
        score: participant.score,
      })) ?? [],
  });
}

function handleClientMessage(socket: LiveSocket, data: WebSocket.RawData) {
  const byteLength = Buffer.isBuffer(data)
    ? data.byteLength
    : Buffer.byteLength(data.toString());

  if (byteLength > MAX_MESSAGE_BYTES) {
    sendJson(socket, { type: "error", message: "Message invalide." });
    socket.close(1009, "Message too large");
    return;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(data.toString());
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
    if (
      !("pin" in parsed) ||
      !("avatarId" in parsed) ||
      typeof parsed.pin !== "string" ||
      typeof parsed.avatarId !== "string" ||
      !socket.arcadia
    ) {
      sendJson(socket, { type: "error", message: "Message invalide." });
      return;
    }

    try {
      const { participant } = joinLiveSession({
        avatarId: parsed.avatarId,
        classroomId: socket.arcadia.classroomId,
        pin: parsed.pin,
      });
      socket.arcadia.participantId = participant.id;
      sendJson(socket, {
        type: "participant:joined",
        participant: {
          id: participant.id,
          avatarId: participant.avatarId,
          displayName: participant.displayName,
          score: participant.score,
        },
      });
      sendLiveState(socket);
    } catch {
      sendJson(socket, { type: "error", message: "Session ou personnage invalide." });
    }
    return;
  }

  if (parsed.type === "answer:submit") {
    if (
      !("choiceIndex" in parsed) ||
      typeof parsed.choiceIndex !== "number" ||
      !socket.arcadia?.participantId
    ) {
      sendJson(socket, { type: "error", message: "Réponse invalide." });
      return;
    }

    try {
      submitLiveAnswer({
        choiceIndex: parsed.choiceIndex,
        classroomId: socket.arcadia.classroomId,
        participantId: socket.arcadia.participantId,
      });
      sendJson(socket, {
        type: "answer:accepted",
      });
      sendLiveState(socket);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "LIVE_ANSWER_ALREADY_SUBMITTED"
      ) {
        sendJson(socket, { type: "error", message: "Réponse déjà envoyée." });
        return;
      }
      sendJson(socket, { type: "error", message: "Réponse invalide." });
    }
    return;
  }

  if (parsed.type !== "ping") {
    sendJson(socket, { type: "error", message: "Message invalide." });
    return;
  }

  sendLiveState(socket);
}

export function attachLiveWebSocketServer(server: Server) {
  const webSocketServer = new WebSocketServer({
    noServer: true,
    clientTracking: true,
    maxPayload: MAX_MESSAGE_BYTES,
  });

  const unsubscribe = subscribeLiveSessions(() => {
    for (const client of webSocketServer.clients) {
      sendLiveState(client as LiveSocket);
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
    }
  }, HEARTBEAT_INTERVAL_MS);
  heartbeat.unref();

  server.on("upgrade", async (request, socket, head) => {
    if (getRequestPath(request) !== LIVE_WS_PATH) {
      writeUpgradeRejection(socket, 404);
      return;
    }

    const cookies = parseCookies(request.headers.cookie);
    const requestedSessionId = getRequestSearchParams(request).get("sessionId");
    const classSessionToken = cookies.get(CLASS_SESSION_COOKIE);
    const classAccess = await getClassroomBySessionToken(classSessionToken);
    const requestedSession = requestedSessionId
      ? getLiveSession(requestedSessionId)
      : null;

    if (!classAccess) {
      const adminSessionToken = cookies.get(ADMIN_SESSION_COOKIE);
      const admin = await getAdminBySessionToken(adminSessionToken);

      if (!admin || !requestedSession) {
        writeUpgradeRejection(socket, 401);
        return;
      }

      webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
        const liveSocket = webSocket as LiveSocket;
        liveSocket.arcadia = {
          classroomId: requestedSession.classroomId,
          isAlive: true,
          sessionId: requestedSession.id,
        };

        webSocketServer.emit("connection", liveSocket, request);
      });
      return;
    }

    webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
      const liveSocket = webSocket as LiveSocket;
      liveSocket.arcadia = {
        classroomId: classAccess.classroomId,
        isAlive: true,
      };

      webSocketServer.emit("connection", liveSocket, request);
    });
  });

  webSocketServer.on("connection", (socket: LiveSocket) => {
    sendJson(socket, { type: "connected" });
    sendLiveState(socket);

    socket.on("pong", () => {
      if (socket.arcadia) socket.arcadia.isAlive = true;
    });

    socket.on("message", (data) => {
      handleClientMessage(socket, data);
    });
  });

  webSocketServer.on("close", () => {
    unsubscribe();
    clearInterval(heartbeat);
  });

  return webSocketServer;
}
