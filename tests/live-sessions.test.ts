import assert from "node:assert/strict";
import { test } from "node:test";

import {
  createLiveSession,
  endLiveSession,
  getLiveSession,
  joinLiveSession,
  listLiveSessionsForClassroom,
  purgeExpiredLiveSessions,
  resumeLiveParticipant,
  revealLiveQuestionForSession,
  resetLiveSessionsForTests,
  sendLiveQuestionToSession,
  submitLiveAnswer as submitLiveAnswerToSession,
} from "@/server/live-sessions/store";

function submitLiveAnswer({
  choiceIndex,
  classroomId,
  now,
  participantId,
}: {
  choiceIndex: number;
  classroomId: string;
  now?: Date;
  participantId: string;
}) {
  const session = listLiveSessionsForClassroom(classroomId, now)[0];
  assert.ok(session);
  return submitLiveAnswerToSession({
    choiceIndex,
    classroomId,
    now,
    participantId,
    roundId: session.currentQuestion?.roundId ?? "no-active-round",
    sessionId: session.id,
  });
}

test("live sessions are temporary and scoped by classroom", () => {
  resetLiveSessionsForTests();

  const session = createLiveSession("classroom-a");

  assert.equal(session.classroomId, "classroom-a");
  assert.match(session.pin, /^\d{6}$/);
  assert.equal(listLiveSessionsForClassroom("classroom-a").length, 1);
  assert.equal(listLiveSessionsForClassroom("classroom-b").length, 0);
});

test("only one active live session is allowed per classroom", () => {
  resetLiveSessionsForTests();
  createLiveSession("classroom-a");

  assert.throws(() => createLiveSession("classroom-a"), {
    message: "LIVE_SESSION_ALREADY_ACTIVE",
  });
});

test("ending a live session removes it from the active list", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");

  assert.equal(endLiveSession(session.id, "classroom-a"), true);
  assert.equal(getLiveSession(session.id), null);
  assert.equal(listLiveSessionsForClassroom("classroom-a").length, 0);
});

test("live sessions expire automatically", () => {
  resetLiveSessionsForTests();
  const now = new Date("2026-10-03T10:00:00.000Z");
  const session = createLiveSession("classroom-a", now);

  const later = new Date(session.expiresAt.getTime() + 1);
  assert.equal(purgeExpiredLiveSessions(later), 1);
  assert.equal(getLiveSession(session.id, later), null);
});

test("joining a live session assigns a server-side avatar name", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");

  const first = joinLiveSession({
    avatarId: "pac-yellow-cap",
    classroomId: "classroom-a",
    ownerKey: "student-a",
    pin: session.pin,
  });
  const second = joinLiveSession({
    avatarId: "pac-yellow-cap",
    classroomId: "classroom-a",
    ownerKey: "student-b",
    pin: session.pin,
  });

  assert.equal(first.participant.displayName, "Pac Jaune 1");
  assert.equal(second.participant.displayName, "Pac Jaune 2");
  assert.equal(first.session.participants.length, 1);
  assert.equal(listLiveSessionsForClassroom("classroom-a")[0].participants.length, 2);
});

test("reconnecting with the same server-side owner resumes one participant", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");
  const first = joinLiveSession({
    avatarId: "pac-yellow-cap",
    classroomId: "classroom-a",
    ownerKey: "session-token-hash-a",
    pin: session.pin,
  });
  const rejoined = joinLiveSession({
    avatarId: "blob-red-crown",
    classroomId: "classroom-a",
    ownerKey: "session-token-hash-a",
    pin: session.pin,
  });
  const resumed = resumeLiveParticipant(
    "classroom-a",
    "session-token-hash-a",
  );

  assert.equal(rejoined.participant.id, first.participant.id);
  assert.equal(resumed?.participant.id, first.participant.id);
  assert.equal(resumed?.session.participants.length, 1);
  assert.equal("ownerKey" in (resumed?.participant as object), false);
});

test("joining rejects invalid pins and avatar ids", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");

  assert.throws(
    () =>
      joinLiveSession({
        avatarId: "pac-yellow-cap",
        classroomId: "classroom-a",
        ownerKey: "student-a",
        pin: "ABC123",
      }),
    { message: "LIVE_SESSION_INVALID_PIN" },
  );
  assert.throws(
    () =>
      joinLiveSession({
        avatarId: "free-text-name",
        classroomId: "classroom-a",
        ownerKey: "student-a",
        pin: session.pin,
      }),
    { message: "LIVE_SESSION_INVALID_AVATAR" },
  );
});

test("sending a live question stores a public snapshot only", () => {
  resetLiveSessionsForTests();
  const now = new Date("2026-10-03T10:00:00.000Z");
  const session = createLiveSession("classroom-a", now);
  const sentAt = new Date("2026-10-03T10:03:00.000Z");

  const updated = sendLiveQuestionToSession({
    now: sentAt,
    questionId: "pse-bacpro-a2-sommeil-qcm",
    sessionId: session.id,
  });

  assert.equal(updated.currentQuestion?.id, "pse-bacpro-a2-sommeil-qcm");
  assert.equal(updated.currentQuestion?.title, "Hygiène du sommeil");
  assert.equal(updated.currentQuestion?.sentAt.getTime(), sentAt.getTime());
  assert.equal(updated.status, "question");
  assert.equal(updated.revealedAnswer, null);
  assert.equal(
    "correctChoiceIndex" in (updated.currentQuestion as object),
    false,
  );
  assert.equal("explanation" in (updated.currentQuestion as object), false);
  assert.deepEqual(
    getLiveSession(session.id, sentAt)?.currentQuestion,
    updated.currentQuestion,
  );
});

test("revealing a live question exposes the correction only in reveal phase", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");
  sendLiveQuestionToSession({
    questionId: "pse-bacpro-a2-sommeil-qcm",
    sessionId: session.id,
  });

  const revealed = revealLiveQuestionForSession({ sessionId: session.id });

  assert.equal(revealed.status, "reveal");
  assert.equal(revealed.revealedAnswer?.correctChoiceIndex, 1);
  assert.match(revealed.revealedAnswer?.explanation ?? "", /sommeil/i);
  assert.equal(
    "correctChoiceIndex" in (revealed.currentQuestion as object),
    false,
  );
});

test("revealing requires an active question and new questions clear correction", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");

  assert.throws(
    () => revealLiveQuestionForSession({ sessionId: session.id }),
    { message: "LIVE_QUESTION_NOT_ACTIVE" },
  );

  revealLiveQuestionForSession({
    sessionId: sendLiveQuestionToSession({
      questionId: "pse-bacpro-a2-sommeil-qcm",
      sessionId: session.id,
    }).id,
  });

  const nextQuestion = sendLiveQuestionToSession({
    questionId: "pse-bacpro-b1-alimentation-eco-vf",
    sessionId: session.id,
  });

  assert.equal(nextQuestion.status, "question");
  assert.equal(nextQuestion.revealedAnswer, null);
});

test("a new question cannot replace an unrevealed round", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");
  sendLiveQuestionToSession({
    questionId: "pse-bacpro-a2-sommeil-qcm",
    sessionId: session.id,
  });

  assert.throws(
    () =>
      sendLiveQuestionToSession({
        questionId: "pse-bacpro-b1-alimentation-eco-vf",
        sessionId: session.id,
      }),
    { message: "LIVE_QUESTION_REVEAL_REQUIRED" },
  );
});

test("sending a live question rejects unknown sessions and questions", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");

  assert.throws(
    () =>
      sendLiveQuestionToSession({
        questionId: "missing-question",
        sessionId: session.id,
      }),
    { message: "LIVE_QUESTION_NOT_FOUND" },
  );
  assert.throws(
    () =>
      sendLiveQuestionToSession({
        questionId: "pse-bacpro-a2-sommeil-qcm",
        sessionId: "missing-session",
      }),
    { message: "LIVE_SESSION_NOT_FOUND" },
  );
});

test("submitting an answer is refused after correction reveal", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");
  const joined = joinLiveSession({
    avatarId: "pac-yellow-cap",
    classroomId: "classroom-a",
    ownerKey: "student-a",
    pin: session.pin,
  });
  sendLiveQuestionToSession({
    questionId: "pse-bacpro-a2-sommeil-qcm",
    sessionId: session.id,
  });
  revealLiveQuestionForSession({ sessionId: session.id });

  assert.throws(
    () =>
      submitLiveAnswer({
        choiceIndex: 1,
        classroomId: "classroom-a",
        participantId: joined.participant.id,
      }),
    { message: "LIVE_QUESTION_NOT_ACTIVE" },
  );
});

test("submitting hides points until reveal and scores the round once", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");
  const joined = joinLiveSession({
    avatarId: "pac-yellow-cap",
    classroomId: "classroom-a",
    ownerKey: "student-a",
    pin: session.pin,
  });
  sendLiveQuestionToSession({
    questionId: "pse-bacpro-a2-sommeil-qcm",
    sessionId: session.id,
  });

  const answer = submitLiveAnswer({
    choiceIndex: 1,
    classroomId: "classroom-a",
    participantId: joined.participant.id,
  });

  assert.equal(answer.session.answerSummary.answeredCount, 1);
  assert.equal(answer.session.answerSummary.correctCount, null);
  assert.equal(answer.session.participants[0]?.score, 0);
  assert.throws(
    () =>
      submitLiveAnswer({
        choiceIndex: 1,
        classroomId: "classroom-a",
        participantId: joined.participant.id,
      }),
    { message: "LIVE_ANSWER_ALREADY_SUBMITTED" },
  );

  const revealed = revealLiveQuestionForSession({ sessionId: session.id });
  const revealedAgain = revealLiveQuestionForSession({ sessionId: session.id });
  assert.equal(revealed.answerSummary.correctCount, 1);
  assert.equal(revealed.participants[0]?.score, 120);
  assert.equal(revealedAgain.participants[0]?.score, 120);
});

test("sending a new question clears temporary answers but keeps scores", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");
  const joined = joinLiveSession({
    avatarId: "pac-yellow-cap",
    classroomId: "classroom-a",
    ownerKey: "student-a",
    pin: session.pin,
  });
  sendLiveQuestionToSession({
    questionId: "pse-bacpro-a2-sommeil-qcm",
    sessionId: session.id,
  });
  submitLiveAnswer({
    choiceIndex: 1,
    classroomId: "classroom-a",
    participantId: joined.participant.id,
  });
  revealLiveQuestionForSession({ sessionId: session.id });

  const updated = sendLiveQuestionToSession({
    questionId: "pse-bacpro-b1-alimentation-eco-vf",
    sessionId: session.id,
  });

  assert.equal(updated.answerSummary.answeredCount, 0);
  assert.equal(updated.answerSummary.correctCount, null);
  assert.equal(updated.participants[0]?.score, 120);
});

test("submitting an answer requires a participant, question and valid choice", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");
  const joined = joinLiveSession({
    avatarId: "pac-yellow-cap",
    classroomId: "classroom-a",
    ownerKey: "student-a",
    pin: session.pin,
  });

  assert.throws(
    () =>
      submitLiveAnswer({
        choiceIndex: 0,
        classroomId: "classroom-a",
        participantId: joined.participant.id,
      }),
    { message: "LIVE_QUESTION_NOT_ACTIVE" },
  );

  sendLiveQuestionToSession({
    questionId: "pse-bacpro-a2-sommeil-qcm",
    sessionId: session.id,
  });

  assert.throws(
    () =>
      submitLiveAnswer({
        choiceIndex: 99,
        classroomId: "classroom-a",
        participantId: joined.participant.id,
      }),
    { message: "LIVE_ANSWER_INVALID_CHOICE" },
  );
  assert.throws(
    () =>
      submitLiveAnswer({
        choiceIndex: 0,
        classroomId: "classroom-a",
        participantId: "missing-participant",
      }),
    { message: "LIVE_PARTICIPANT_NOT_FOUND" },
  );
});

test("submitting an answer after the time limit is refused", () => {
  resetLiveSessionsForTests();
  const now = new Date("2026-10-05T10:00:00.000Z");
  const session = createLiveSession("classroom-a", now);
  const joined = joinLiveSession({
    avatarId: "pac-yellow-cap",
    classroomId: "classroom-a",
    ownerKey: "student-a",
    now,
    pin: session.pin,
  });
  sendLiveQuestionToSession({
    now,
    questionId: "pse-bacpro-a2-sommeil-qcm",
    sessionId: session.id,
  });

  assert.throws(
    () =>
      submitLiveAnswer({
        choiceIndex: 1,
        classroomId: "classroom-a",
        now: new Date(now.getTime() + 31_000),
        participantId: joined.participant.id,
      }),
    { message: "LIVE_QUESTION_CLOSED" },
  );
});

test("an answer is bound to the exact session and round", () => {
  resetLiveSessionsForTests();
  const session = createLiveSession("classroom-a");
  const joined = joinLiveSession({
    avatarId: "pac-yellow-cap",
    classroomId: "classroom-a",
    ownerKey: "student-a",
    pin: session.pin,
  });
  const question = sendLiveQuestionToSession({
    questionId: "pse-bacpro-a2-sommeil-qcm",
    sessionId: session.id,
  });
  assert.ok(question.currentQuestion);

  assert.throws(
    () =>
      submitLiveAnswerToSession({
        choiceIndex: 1,
        classroomId: "classroom-a",
        participantId: joined.participant.id,
        roundId: "00000000-0000-0000-0000-000000000000",
        sessionId: session.id,
      }),
    { message: "LIVE_ROUND_STALE" },
  );
  assert.throws(
    () =>
      submitLiveAnswerToSession({
        choiceIndex: 1,
        classroomId: "classroom-a",
        participantId: joined.participant.id,
        roundId: question.currentQuestion!.roundId,
        sessionId: "00000000-0000-0000-0000-000000000000",
      }),
    { message: "LIVE_SESSION_NOT_FOUND" },
  );
});
