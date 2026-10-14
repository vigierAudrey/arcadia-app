import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, before, test } from "node:test";

import { WebSocket } from "ws";

import {
  createLiveSession,
  revealLiveQuestionForSession,
  resetLiveSessionsForTests,
  sendLiveQuestionToSession,
} from "@/server/live-sessions/store";
import {
  attachLiveWebSocketServer,
  type LiveWebSocketAuth,
} from "@/server/live-sessions/websocket";

type Message = Record<string, unknown> & { type: string };

const classroomId = "classroom-websocket-test";
const auth: LiveWebSocketAuth = {
  getAdmin: async (token) => (token === "admin-token" ? { id: "admin" } : null),
  getClassroom: async (token) =>
    token?.startsWith("student-") ? { classroomId } : null,
  hashAdminToken: (token) => `hash:${token}`,
  hashClassToken: (token) => `hash:${token}`,
  isAdminToken: (token) => token === "admin-token",
  isClassToken: (token) => token.startsWith("student-"),
};

const httpServer = createServer((_request, response) => {
  response.writeHead(404).end();
});
const webSocketServer = attachLiveWebSocketServer(httpServer, auth);
let baseUrl: string;

before(async () => {
  await new Promise<void>((resolve) => {
    httpServer.listen(0, "127.0.0.1", resolve);
  });
  const address = httpServer.address();
  assert.ok(address && typeof address === "object");
  baseUrl = `ws://127.0.0.1:${address.port}`;
});

after(async () => {
  for (const client of webSocketServer.clients) client.terminate();
  await new Promise<void>((resolve) => webSocketServer.close(() => resolve()));
  await new Promise<void>((resolve) => httpServer.close(() => resolve()));
});

function connect(path: string, cookie: string) {
  const messages: Message[] = [];
  const socket = new WebSocket(`${baseUrl}${path}`, {
    headers: { Cookie: cookie, Origin: baseUrl.replace("ws:", "http:") },
  });
  socket.on("message", (data) => {
    messages.push(JSON.parse(data.toString()) as Message);
  });
  return new Promise<{ messages: Message[]; socket: WebSocket }>(
    (resolve, reject) => {
      socket.once("open", () => resolve({ messages, socket }));
      socket.once("error", reject);
    },
  );
}

async function waitForMessage(
  messages: Message[],
  predicate: (message: Message) => boolean,
) {
  const deadline = Date.now() + 2_000;
  while (Date.now() < deadline) {
    const match = messages.find(predicate);
    if (match) return match;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.fail("Expected WebSocket message was not received.");
}

test("two players complete a round and one resumes without score leakage", async () => {
  resetLiveSessionsForTests();
  const session = createLiveSession(classroomId);
  const admin = await connect(
    `/live?sessionId=${session.id}`,
    "pse_admin_session=admin-token",
  );
  const studentA = await connect("/live", "pse_class_session=student-a");
  const studentB = await connect("/live", "pse_class_session=student-b");

  studentA.socket.send(
    JSON.stringify({
      type: "participant:join",
      pin: session.pin,
      avatarId: "pac-yellow-cap",
    }),
  );
  studentB.socket.send(
    JSON.stringify({
      type: "participant:join",
      pin: session.pin,
      avatarId: "blob-red-crown",
    }),
  );
  await waitForMessage(
    admin.messages,
    (message) =>
      message.type === "live:state" &&
      Array.isArray(message.participants) &&
      message.participants.length === 2,
  );

  const round = sendLiveQuestionToSession({
    questionId: "pse-bacpro-a2-sommeil-qcm",
    sessionId: session.id,
  });
  assert.ok(round.currentQuestion);
  studentA.socket.send(
    JSON.stringify({
      type: "answer:submit",
      choiceIndex: 1,
      roundId: round.currentQuestion.roundId,
    }),
  );
  studentB.socket.send(
    JSON.stringify({
      type: "answer:submit",
      choiceIndex: 0,
      roundId: round.currentQuestion.roundId,
    }),
  );
  const beforeReveal = await waitForMessage(
    admin.messages,
    (message) =>
      message.type === "live:state" &&
      typeof message.answerSummary === "object" &&
      message.answerSummary !== null &&
      "answeredCount" in message.answerSummary &&
      message.answerSummary.answeredCount === 2,
  );
  assert.deepEqual(
    (beforeReveal.participants as Array<{ score: number }>).map(
      (participant) => participant.score,
    ),
    [0, 0],
  );
  const studentState = await waitForMessage(
    studentA.messages,
    (message) =>
      message.type === "live:state" &&
      typeof message.ownAnswer === "object" &&
      message.ownAnswer !== null,
  );
  assert.equal("participants" in studentState, false);
  assert.equal("answerSummary" in studentState, false);

  studentA.socket.close();
  await new Promise<void>((resolve) => studentA.socket.once("close", resolve));
  const resumedA = await connect("/live", "pse_class_session=student-a");
  const resumedState = await waitForMessage(
    resumedA.messages,
    (message) =>
      message.type === "live:state" &&
      typeof message.ownAnswer === "object" &&
      message.ownAnswer !== null,
  );
  assert.deepEqual(resumedState.ownAnswer, {
    choiceIndex: 1,
    roundId: round.currentQuestion.roundId,
  });

  revealLiveQuestionForSession({ sessionId: session.id });
  const afterReveal = await waitForMessage(
    admin.messages,
    (message) =>
      message.type === "live:state" &&
      message.phase === "reveal" &&
      Array.isArray(message.participants) &&
      message.participants.some(
        (participant) =>
          typeof participant === "object" &&
          participant !== null &&
          "score" in participant &&
          participant.score === 120,
      ),
  );
  assert.deepEqual(
    (afterReveal.participants as Array<{ score: number }>).map(
      (participant) => participant.score,
    ).sort((a, b) => a - b),
    [0, 120],
  );

  admin.socket.close();
  studentB.socket.close();
  resumedA.socket.close();
});
