import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { after, before, test } from "node:test";

import { TeachingAreaKind } from "../src/generated/prisma/enums";
import {
  createClassroom,
  createLearningSequence,
  createLesson,
  createLevel,
  createProgram,
  createTeachingArea,
} from "../src/server/catalog/mutations";
import {
  getTeachingContextForActivity,
  getTeachingContextForLesson,
} from "../src/server/pedagogie/context";
import {
  createPedagogicalSourceReference,
  PedagogicalSourceValidationError,
} from "../src/server/pedagogie/mutations";
import { prisma } from "../src/server/db/prisma";

// A same-shaped fixture as the real "T AAGA" class (PSE + Maths appliquées +
// Bloc 2 on one Classroom), built in its own Program/Level so it never
// touches real catalog data. The TeachingArea names are fixture values
// representing our real case — createPedagogicalSourceReference itself must
// never hardcode any of them.
const suffix = randomUUID().slice(0, 8);
let programId: string;
let levelId: string;
let classroomId: string;
let pseTeachingAreaId: string;
let mathsTeachingAreaId: string;
let bloc2TeachingAreaId: string;
let pseLessonId: string;
let mathsLessonId: string;
let bloc2LessonId: string;
let pseActivityId: string;

before(async () => {
  const program = await createProgram(`T-AAGA-LIKE TEST ${suffix}`);
  programId = program.id;
  const level = await createLevel(programId, "Terminale test");
  levelId = level.id;
  const classroom = await createClassroom(levelId, "T AAGA TEST");
  classroomId = classroom.id;

  const pseArea = await createTeachingArea(classroomId, "PSE", TeachingAreaKind.SUBJECT);
  pseTeachingAreaId = pseArea.id;
  const mathsArea = await createTeachingArea(
    classroomId,
    "Maths appliquées",
    TeachingAreaKind.SUBJECT,
  );
  mathsTeachingAreaId = mathsArea.id;
  const bloc2Area = await createTeachingArea(classroomId, "Bloc 2", TeachingAreaKind.BLOCK);
  bloc2TeachingAreaId = bloc2Area.id;

  const pseSequence = await createLearningSequence(pseTeachingAreaId, "Séquence PSE", null);
  const pseLesson = await createLesson(pseSequence.id, "Séance PSE", null);
  pseLessonId = pseLesson.id;

  const mathsSequence = await createLearningSequence(
    mathsTeachingAreaId,
    "Séquence Maths",
    null,
  );
  const mathsLesson = await createLesson(mathsSequence.id, "Séance Maths", null);
  mathsLessonId = mathsLesson.id;

  const bloc2Sequence = await createLearningSequence(bloc2TeachingAreaId, "Séquence Bloc 2", null);
  const bloc2Lesson = await createLesson(bloc2Sequence.id, "Séance Bloc 2", null);
  bloc2LessonId = bloc2Lesson.id;

  const pseActivity = await prisma.activity.create({
    data: {
      lessonId: pseLessonId,
      title: "Activité PSE",
      type: "quiz",
      instructions: "Consignes de test.",
      payload: {},
      position: 0,
    },
    select: { id: true },
  });
  pseActivityId = pseActivity.id;
});

after(async () => {
  await prisma.pedagogicalSourceReference.deleteMany({
    where: {
      OR: [
        { lessonId: { in: [pseLessonId, mathsLessonId, bloc2LessonId] } },
        { activityId: pseActivityId },
      ],
    },
  });
  await prisma.activity.deleteMany({ where: { lessonId: pseLessonId } });
  await prisma.lesson.deleteMany({
    where: { id: { in: [pseLessonId, mathsLessonId, bloc2LessonId] } },
  });
  await prisma.learningSequence.deleteMany({
    where: {
      teachingAreaId: {
        in: [pseTeachingAreaId, mathsTeachingAreaId, bloc2TeachingAreaId],
      },
    },
  });
  await prisma.teachingArea.deleteMany({ where: { classroomId } });
  await prisma.classroom.deleteMany({ where: { levelId } });
  await prisma.level.deleteMany({ where: { programId } });
  await prisma.program.delete({ where: { id: programId } });
  await prisma.$disconnect();
});

test("getTeachingContextForLesson resolves the real TeachingArea for each enseignement of T AAGA", async () => {
  const pseContext = await getTeachingContextForLesson(pseLessonId);
  assert.equal(pseContext?.teachingAreaId, pseTeachingAreaId);
  assert.equal(pseContext?.teachingAreaName, "PSE");
  assert.equal(pseContext?.classroomId, classroomId);
  assert.equal(pseContext?.classroomName, "T AAGA TEST");

  const mathsContext = await getTeachingContextForLesson(mathsLessonId);
  assert.equal(mathsContext?.teachingAreaId, mathsTeachingAreaId);
  assert.equal(mathsContext?.teachingAreaName, "Maths appliquées");

  const bloc2Context = await getTeachingContextForLesson(bloc2LessonId);
  assert.equal(bloc2Context?.teachingAreaId, bloc2TeachingAreaId);
  assert.equal(bloc2Context?.teachingAreaName, "Bloc 2");
  assert.equal(bloc2Context?.teachingAreaKind, "BLOCK");
});

test("getTeachingContextForActivity resolves the same TeachingArea as its Lesson, plus the Activity itself", async () => {
  const context = await getTeachingContextForActivity(pseActivityId);
  assert.equal(context?.teachingAreaId, pseTeachingAreaId);
  assert.equal(context?.lessonId, pseLessonId);
  assert.equal(context?.activityId, pseActivityId);
});

test("a reference on a PSE Lesson, announced as PSE, is accepted", async () => {
  const reference = await createPedagogicalSourceReference(
    { lessonId: pseLessonId },
    {
      sourceType: "REFERENTIEL",
      sourceTitle: "Programme PSE Bac Pro officiel",
      relativePath: "BACPRO/T/TAERO PSE/REFERENTIELS_OFFICIELS/programme.pdf",
    },
    { expectedTeachingAreaId: pseTeachingAreaId },
  );
  assert.ok(reference.id);
});

test("attaching that same PSE Lesson while announcing Maths appliquées is rejected", async () => {
  await assert.rejects(
    () =>
      createPedagogicalSourceReference(
        { lessonId: pseLessonId },
        {
          sourceType: "REFERENTIEL",
          sourceTitle: "Programme PSE annoncé comme Maths",
          relativePath: "BACPRO/T/TAERO PSE/REFERENTIELS_OFFICIELS/programme.pdf",
        },
        { expectedTeachingAreaId: mathsTeachingAreaId },
      ),
    PedagogicalSourceValidationError,
  );
});

test("a Bloc 2 reference is accepted on a Bloc 2 Lesson", async () => {
  const reference = await createPedagogicalSourceReference(
    { lessonId: bloc2LessonId },
    {
      sourceType: "REFERENTIEL",
      sourceTitle: "Référentiel CAP AAGA — Bloc 2",
      relativePath:
        "CAP/le_nouveau_referentiel_cap_aaga_-_agent_accompagnant_au_grand_age.pdf",
      sectionOrPage: "Bloc 2",
    },
    { expectedTeachingAreaId: bloc2TeachingAreaId },
  );
  assert.ok(reference.id);
});

test("a Bloc 2 reference is rejected on a Maths appliquées Lesson", async () => {
  await assert.rejects(
    () =>
      createPedagogicalSourceReference(
        { lessonId: mathsLessonId },
        {
          sourceType: "REFERENTIEL",
          sourceTitle: "Référentiel CAP AAGA Bloc 2 annoncé sur Maths",
          relativePath:
            "CAP/le_nouveau_referentiel_cap_aaga_-_agent_accompagnant_au_grand_age.pdf",
        },
        { expectedTeachingAreaId: bloc2TeachingAreaId },
      ),
    PedagogicalSourceValidationError,
  );
});

test("without expectedTeachingAreaId, the write still resolves against the real context (no bypass)", async () => {
  const reference = await createPedagogicalSourceReference(
    { lessonId: mathsLessonId },
    {
      sourceType: "PROGRESSION",
      sourceTitle: "Progression Maths co-intervention",
      relativePath:
        "CAP/CAP AAGA -Maths/Maths co-intervention - Progression et sequences/progression.md",
    },
  );
  const stored = await prisma.pedagogicalSourceReference.findUniqueOrThrow({
    where: { id: reference.id },
    select: { lessonId: true },
  });
  assert.equal(stored.lessonId, mathsLessonId);
});
