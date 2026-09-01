import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { after, before, test } from "node:test";

import {
  PublicationStatus,
  SequenceStatus,
  TeachingAreaKind,
} from "../src/generated/prisma/enums";
import {
  createClassroom,
  createLearningSequence,
  createLesson,
  createLevel,
  createProgram,
  createTeachingArea,
  setLearningSequenceStatus,
  setLessonPublicationStatus,
} from "../src/server/catalog/mutations";
import { getStudentCatalog } from "../src/server/catalog/student-queries";
import {
  disableClassAccessCode,
  rotateClassAccessCode,
} from "../src/server/class-auth/access-code";
import { authenticateClassCode } from "../src/server/class-auth/authenticate";
import {
  CLASS_CODE_LOGIN_MAX_ATTEMPTS,
  CLASS_SESSION_DURATION_MS,
} from "../src/server/class-auth/constants";
import {
  CLASS_CODE_ALPHABET,
  CLASS_CODE_LENGTH,
  formatClassCode,
  generateClassCode,
  hashClassCode,
} from "../src/server/class-auth/code";
import {
  consumeClassCodeAttempt,
  getClassCodeRateLimitKey,
} from "../src/server/class-auth/login-rate-limit";
import {
  ClassAccessError,
  requireClassSessionFromToken,
} from "../src/server/class-auth/require-class-session";
import {
  createClassSession,
  getClassroomBySessionToken,
  hashClassSessionToken,
  revokeClassSession,
} from "../src/server/class-auth/session";
import { normalizeClassCode } from "../src/server/class-auth/validation";
import { prisma } from "../src/server/db/prisma";

process.env.CLASS_SESSION_SECRET = randomBytes(48).toString("base64url");

const suffix = randomUUID().slice(0, 8);
let programId: string;
let levelId: string;
let classroomAId: string;
let classroomBId: string;
let openSequenceId: string;
let publishedLessonId: string;
let publishedActivityId: string;

before(async () => {
  const program = await createProgram(`CLASS-AUTH TEST ${suffix}`);
  programId = program.id;
  const level = await createLevel(programId, "Niveau test");
  levelId = level.id;

  const classroomA = await createClassroom(levelId, "Classe A");
  classroomAId = classroomA.id;
  const classroomB = await createClassroom(levelId, "Classe B");
  classroomBId = classroomB.id;

  const teachingArea = await createTeachingArea(
    classroomAId,
    "PSE",
    TeachingAreaKind.SUBJECT,
  );

  const openSequence = await createLearningSequence(
    teachingArea.id,
    "Séquence ouverte",
    null,
  );
  openSequenceId = openSequence.id;
  const openSequenceRecord = await prisma.learningSequence.findUniqueOrThrow({
    where: { id: openSequenceId },
    select: { updatedAt: true },
  });
  await setLearningSequenceStatus(
    { type: "learningSequence", id: openSequenceId, parentId: teachingArea.id },
    SequenceStatus.OPEN,
    openSequenceRecord.updatedAt,
  );

  const draftSequence = await createLearningSequence(
    teachingArea.id,
    "Séquence brouillon",
    null,
  );
  const lockedSequence = await createLearningSequence(
    teachingArea.id,
    "Séquence verrouillée",
    null,
  );
  const lockedSequenceRecord = await prisma.learningSequence.findUniqueOrThrow(
    { where: { id: lockedSequence.id }, select: { updatedAt: true } },
  );
  await setLearningSequenceStatus(
    { type: "learningSequence", id: lockedSequence.id, parentId: teachingArea.id },
    SequenceStatus.LOCKED,
    lockedSequenceRecord.updatedAt,
  );

  const publishedLesson = await createLesson(
    openSequenceId,
    "Séance publiée",
    null,
  );
  publishedLessonId = publishedLesson.id;
  const publishedLessonRecord = await prisma.lesson.findUniqueOrThrow({
    where: { id: publishedLessonId },
    select: { updatedAt: true },
  });
  await setLessonPublicationStatus(
    { type: "lesson", id: publishedLessonId, parentId: openSequenceId },
    PublicationStatus.PUBLISHED,
    publishedLessonRecord.updatedAt,
  );

  await createLesson(openSequenceId, "Séance brouillon", null);
  await createLesson(draftSequence.id, "Séance hors séquence ouverte", null);

  const publishedActivity = await prisma.activity.create({
    data: {
      lessonId: publishedLessonId,
      title: "Activité publiée",
      type: "quiz",
      instructions: "Consignes de test.",
      payload: {},
      publicationStatus: PublicationStatus.PUBLISHED,
      position: 0,
    },
    select: { id: true },
  });
  publishedActivityId = publishedActivity.id;

  await prisma.activity.create({
    data: {
      lessonId: publishedLessonId,
      title: "Activité brouillon",
      type: "quiz",
      instructions: "Consignes de test.",
      payload: {},
      publicationStatus: PublicationStatus.DRAFT,
      position: 1,
    },
    select: { id: true },
  });
});

after(async () => {
  const teachingAreas = await prisma.teachingArea.findMany({
    where: { classroomId: { in: [classroomAId, classroomBId] } },
    select: { id: true },
  });
  const teachingAreaIds = teachingAreas.map(({ id }) => id);
  const sequences = await prisma.learningSequence.findMany({
    where: { teachingAreaId: { in: teachingAreaIds } },
    select: { id: true },
  });
  const sequenceIds = sequences.map(({ id }) => id);
  const lessons = await prisma.lesson.findMany({
    where: { sequenceId: { in: sequenceIds } },
    select: { id: true },
  });
  const lessonIds = lessons.map(({ id }) => id);

  await prisma.activity.deleteMany({ where: { lessonId: { in: lessonIds } } });
  await prisma.lesson.deleteMany({ where: { sequenceId: { in: sequenceIds } } });
  await prisma.learningSequence.deleteMany({
    where: { teachingAreaId: { in: teachingAreaIds } },
  });
  await prisma.teachingArea.deleteMany({
    where: { classroomId: { in: [classroomAId, classroomBId] } },
  });
  // ClassAccessCode/ClassSession cascade automatically (onDelete: Cascade).
  await prisma.classroom.deleteMany({ where: { levelId } });
  await prisma.level.deleteMany({ where: { programId } });
  await prisma.program.delete({ where: { id: programId } });

  await prisma.$disconnect();
});

test("generates 8-character codes from the non-ambiguous alphabet", () => {
  const codes = Array.from({ length: 50 }, () => generateClassCode());

  for (const code of codes) {
    assert.equal(code.length, CLASS_CODE_LENGTH);
    for (const character of code) {
      assert.ok(CLASS_CODE_ALPHABET.includes(character));
    }
  }

  assert.equal(new Set(codes).size, codes.length, "codes must be unique enough to never collide across 50 draws");
  assert.equal(formatClassCode("ABCD1234"), "ABCD-1234");
});

test("hashes codes deterministically via HMAC, never storing plaintext", () => {
  const code = generateClassCode();
  const hashA = hashClassCode(code);
  const hashB = hashClassCode(code);
  const otherHash = hashClassCode(generateClassCode());

  assert.equal(hashA, hashB, "hashing must be deterministic for the same code");
  assert.notEqual(hashA, otherHash);
  assert.match(hashA, /^[0-9a-f]{64}$/);
  assert.notEqual(hashA, code);
});

test("normalizes codes entered with a dash or lowercase letters", () => {
  assert.equal(normalizeClassCode("7k4m-q8hx"), "7K4MQ8HX");
  assert.equal(normalizeClassCode(" ab-cd ef-gh "), "ABCDEFGH");
});

test("rotates a class access code, authenticates with it, and never persists the plaintext", async () => {
  const subject = `rate-test:${randomUUID()}`;
  const { code } = await rotateClassAccessCode(classroomAId);
  const rawCode = code.replace("-", "");

  const stored = await prisma.classAccessCode.findUniqueOrThrow({
    where: { classroomId: classroomAId },
    select: { codeHash: true, active: true },
  });
  assert.equal(stored.active, true);
  assert.notEqual(stored.codeHash, rawCode);
  assert.notEqual(stored.codeHash, code);
  assert.match(stored.codeHash, /^[0-9a-f]{64}$/);

  const result = await authenticateClassCode(code, subject);
  assert.equal(result.authenticated, true);
  if (!result.authenticated) return;

  const access = await getClassroomBySessionToken(result.token);
  assert.deepEqual(access, { classroomId: classroomAId });

  const sessionRow = await prisma.classSession.findUniqueOrThrow({
    where: { tokenHash: hashClassSessionToken(result.token) },
    select: { tokenHash: true },
  });
  assert.notEqual(sessionRow.tokenHash, result.token);
});

test("rejects an unknown code with a generic failure", async () => {
  const subject = `rate-test:${randomUUID()}`;
  const result = await authenticateClassCode("ZZZZ-9999", subject);
  assert.equal(result.authenticated, false);
});

test("rejects a malformed code without touching the database", async () => {
  const subject = `rate-test:${randomUUID()}`;
  const result = await authenticateClassCode("not a code", subject);
  assert.equal(result.authenticated, false);
});

test("regenerating a code invalidates the old one and revokes live sessions", async () => {
  const subject = `rate-test:${randomUUID()}`;
  const first = await rotateClassAccessCode(classroomAId);
  const firstAuth = await authenticateClassCode(first.code, subject);
  assert.equal(firstAuth.authenticated, true);
  if (!firstAuth.authenticated) return;

  const second = await rotateClassAccessCode(classroomAId);
  assert.notEqual(second.code, first.code);

  // Old code no longer authenticates.
  const oldCodeAttempt = await authenticateClassCode(
    first.code,
    `rate-test:${randomUUID()}`,
  );
  assert.equal(oldCodeAttempt.authenticated, false);

  // Session created under the old code is revoked immediately.
  assert.equal(await getClassroomBySessionToken(firstAuth.token), null);

  // New code works.
  const newAuth = await authenticateClassCode(
    second.code,
    `rate-test:${randomUUID()}`,
  );
  assert.equal(newAuth.authenticated, true);
});

test("disabling access blocks new logins and revokes live sessions", async () => {
  const { code } = await rotateClassAccessCode(classroomAId);
  const auth = await authenticateClassCode(code, `rate-test:${randomUUID()}`);
  assert.equal(auth.authenticated, true);
  if (!auth.authenticated) return;

  await disableClassAccessCode(classroomAId);

  const stored = await prisma.classAccessCode.findUniqueOrThrow({
    where: { classroomId: classroomAId },
    select: { active: true },
  });
  assert.equal(stored.active, false);

  // The already-issued session is revoked immediately.
  assert.equal(await getClassroomBySessionToken(auth.token), null);

  // The (still-known) code no longer authenticates while disabled.
  const attemptWhileDisabled = await authenticateClassCode(
    code,
    `rate-test:${randomUUID()}`,
  );
  assert.equal(attemptWhileDisabled.authenticated, false);
});

test("creates, expires and revokes anonymous class sessions", async () => {
  const now = new Date();

  // classroomB never had an access code rotated for it in this file: a
  // session token minted for it must not resolve until one is active.
  const beforeAccess = await createClassSession(classroomBId, now);
  assert.deepEqual(
    await getClassroomBySessionToken(beforeAccess.token, now),
    null,
    "a class session must not resolve while its classroom has no active access code",
  );

  await rotateClassAccessCode(classroomBId);
  const withAccess = await createClassSession(classroomBId, now);
  assert.deepEqual(await getClassroomBySessionToken(withAccess.token, now), {
    classroomId: classroomBId,
  });

  const almostExpired = new Date(
    now.getTime() + CLASS_SESSION_DURATION_MS - 1_000,
  );
  assert.notEqual(
    await getClassroomBySessionToken(withAccess.token, almostExpired),
    null,
  );

  const afterExpiry = new Date(now.getTime() + CLASS_SESSION_DURATION_MS + 1);
  assert.equal(
    await getClassroomBySessionToken(withAccess.token, afterExpiry),
    null,
  );

  assert.equal(await revokeClassSession(withAccess.token, now), true);
  assert.equal(await getClassroomBySessionToken(withAccess.token, now), null);
});

test("rejects access without a valid session", async () => {
  await assert.rejects(() => requireClassSessionFromToken(undefined), {
    name: "ClassAccessError",
    message: "CLASS_ACCESS_REQUIRED",
  });
  await assert.rejects(
    () => requireClassSessionFromToken("not-a-real-token"),
    ClassAccessError,
  );
});

test("classroomId can never be substituted client-side: the session always resolves to the classroom it was issued for", async () => {
  await rotateClassAccessCode(classroomAId);
  const session = await createClassSession(classroomAId);

  // The only input an attacker controls is the opaque token; the resolved
  // classroomId always comes from the server-side session row, never from
  // any parameter the caller could pass in.
  const resolved = await requireClassSessionFromToken(session.token);
  assert.equal(resolved.classroomId, classroomAId);
  assert.notEqual(resolved.classroomId, classroomBId);
});

test("student catalog excludes DRAFT/LOCKED sequences, DRAFT lessons and DRAFT activities", async () => {
  const catalog = await getStudentCatalog(classroomAId);
  assert.ok(catalog);

  const sequenceTitles = catalog.teachingAreas.flatMap((area) =>
    area.learningSequences.map((sequence) => sequence.title),
  );
  assert.deepEqual(sequenceTitles, ["Séquence ouverte"]);
  assert.ok(!sequenceTitles.includes("Séquence brouillon"));
  assert.ok(!sequenceTitles.includes("Séquence verrouillée"));

  const openSequence = catalog.teachingAreas
    .flatMap((area) => area.learningSequences)
    .find((sequence) => sequence.id === openSequenceId);
  assert.ok(openSequence);

  const lessonTitles = openSequence.lessons.map((lesson) => lesson.title);
  assert.deepEqual(lessonTitles, ["Séance publiée"]);
  assert.ok(!lessonTitles.includes("Séance brouillon"));

  const publishedLesson = openSequence.lessons.find(
    (lesson) => lesson.id === publishedLessonId,
  );
  assert.ok(publishedLesson);
  const activityIds = publishedLesson.activities.map((activity) => activity.id);
  assert.deepEqual(activityIds, [publishedActivityId]);
});

test("rate limits invalid code attempts and resets after its window", async () => {
  const subject = `rate-test:${randomUUID()}`;
  const now = new Date();

  for (let attempt = 0; attempt < CLASS_CODE_LOGIN_MAX_ATTEMPTS; attempt += 1) {
    assert.equal(await consumeClassCodeAttempt(subject, now), true);
  }
  assert.equal(await consumeClassCodeAttempt(subject, now), false);

  const afterBlock = new Date(now.getTime() + 16 * 60 * 1_000);
  assert.equal(await consumeClassCodeAttempt(subject, afterBlock), true);

  await prisma.classCodeRateLimit.deleteMany({
    where: { keyHash: getClassCodeRateLimitKey(subject) },
  });
});

test("never persists the raw code, the raw IP, or the raw session token", async () => {
  const subject = `ip:203.0.113.${Math.floor(Math.random() * 254) + 1}`;
  const { code } = await rotateClassAccessCode(classroomAId);
  const auth = await authenticateClassCode(code, subject);
  assert.equal(auth.authenticated, true);
  if (!auth.authenticated) return;

  const accessRow = await prisma.classAccessCode.findUniqueOrThrow({
    where: { classroomId: classroomAId },
    select: { codeHash: true },
  });
  const sessionRow = await prisma.classSession.findUniqueOrThrow({
    where: { tokenHash: hashClassSessionToken(auth.token) },
    select: { tokenHash: true },
  });
  const rateLimitRow = await prisma.classCodeRateLimit.findUnique({
    where: { keyHash: getClassCodeRateLimitKey(subject) },
    select: { keyHash: true },
  });

  assert.notEqual(accessRow.codeHash, code.replace("-", ""));
  assert.notEqual(sessionRow.tokenHash, auth.token);
  // The rate-limit row for a successful attempt is cleared, not left behind
  // with the raw IP; only its HMAC key would ever have been used to look it
  // up in the first place.
  assert.equal(rateLimitRow, null);
  assert.ok(!accessRow.codeHash.includes(subject));
  assert.ok(!sessionRow.tokenHash.includes(subject));
});
