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
  createPedagogicalSourceReference,
  listPedagogicalSourceReferencesForActivity,
  listPedagogicalSourceReferencesForLesson,
  PedagogicalSourceValidationError,
} from "../src/server/pedagogie/mutations";
import { prisma } from "../src/server/db/prisma";

const suffix = randomUUID().slice(0, 8);
let programId: string;
let levelId: string;
let classroomId: string;
let lessonId: string;
let coreActivityId: string;
let bonusActivityId: string;

before(async () => {
  const program = await createProgram(`PEDAGOGICAL-SOURCES TEST ${suffix}`);
  programId = program.id;
  const level = await createLevel(programId, "Niveau test");
  levelId = level.id;
  const classroom = await createClassroom(levelId, "Classe test");
  classroomId = classroom.id;
  const teachingArea = await createTeachingArea(
    classroomId,
    "PSE",
    TeachingAreaKind.SUBJECT,
  );
  const sequence = await createLearningSequence(
    teachingArea.id,
    "Séquence test",
    null,
  );
  const lesson = await createLesson(sequence.id, "Séance test", null);
  lessonId = lesson.id;

  const coreActivity = await prisma.activity.create({
    data: {
      lessonId,
      title: "Activité sans track précisé",
      type: "quiz",
      instructions: "Consignes de test.",
      payload: {},
      position: 0,
    },
    select: { id: true },
  });
  coreActivityId = coreActivity.id;

  const bonusActivity = await prisma.activity.create({
    data: {
      lessonId,
      title: "Activité bonus explicite",
      type: "quiz",
      instructions: "Consignes de test.",
      payload: {},
      position: 1,
      track: "BONUS",
    },
    select: { id: true },
  });
  bonusActivityId = bonusActivity.id;
});

after(async () => {
  await prisma.pedagogicalSourceReference.deleteMany({
    where: { OR: [{ lessonId }, { activityId: { in: [coreActivityId, bonusActivityId] } }] },
  });
  await prisma.activity.deleteMany({ where: { lessonId } });
  await prisma.lesson.deleteMany({ where: { id: lessonId } });
  const teachingAreas = await prisma.teachingArea.findMany({
    where: { classroomId },
    select: { id: true },
  });
  const sequences = await prisma.learningSequence.findMany({
    where: { teachingAreaId: { in: teachingAreas.map((t) => t.id) } },
    select: { id: true },
  });
  await prisma.learningSequence.deleteMany({
    where: { id: { in: sequences.map((s) => s.id) } },
  });
  await prisma.teachingArea.deleteMany({ where: { classroomId } });
  await prisma.classroom.deleteMany({ where: { levelId } });
  await prisma.level.deleteMany({ where: { programId } });
  await prisma.program.delete({ where: { id: programId } });
  await prisma.$disconnect();
});

test("an Activity defaults to CORE when track isn't specified", async () => {
  const activity = await prisma.activity.findUniqueOrThrow({
    where: { id: coreActivityId },
    select: { track: true },
  });
  assert.equal(activity.track, "CORE");
});

test("an Activity can be explicitly BONUS", async () => {
  const activity = await prisma.activity.findUniqueOrThrow({
    where: { id: bonusActivityId },
    select: { track: true },
  });
  assert.equal(activity.track, "BONUS");
});

test("a pedagogical source reference can be attached to a Lesson", async () => {
  const reference = await createPedagogicalSourceReference(
    { lessonId },
    {
      sourceType: "REFERENTIEL",
      sourceTitle: "Programme PSE Bac Pro officiel",
      relativePath:
        "BACPRO/2/2AERO PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf",
      sectionOrPage: "Module C1",
      excerptOrNotion: "Enjeux santé-sécurité au travail",
    },
  );

  const stored = await prisma.pedagogicalSourceReference.findUniqueOrThrow({
    where: { id: reference.id },
    select: { lessonId: true, activityId: true, sourceType: true },
  });
  assert.equal(stored.lessonId, lessonId);
  assert.equal(stored.activityId, null);
  assert.equal(stored.sourceType, "REFERENTIEL");

  const forLesson = await listPedagogicalSourceReferencesForLesson(lessonId);
  assert.ok(forLesson.some((entry) => entry.id === reference.id));
});

test("a pedagogical source reference can be attached to an Activity when retained at that granularity", async () => {
  const reference = await createPedagogicalSourceReference(
    { activityId: coreActivityId },
    {
      sourceType: "COURS",
      sourceTitle: "Séquence 1 - Séance 1",
      relativePath:
        "BACPRO/2/2AERO PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_seance_01.docx",
    },
  );

  const stored = await prisma.pedagogicalSourceReference.findUniqueOrThrow({
    where: { id: reference.id },
    select: { lessonId: true, activityId: true },
  });
  assert.equal(stored.lessonId, null);
  assert.equal(stored.activityId, coreActivityId);

  const forActivity = await listPedagogicalSourceReferencesForActivity(coreActivityId);
  assert.ok(forActivity.some((entry) => entry.id === reference.id));
});

test("rejects a reference attached to neither or both a Lesson and an Activity", async () => {
  await assert.rejects(
    () =>
      createPedagogicalSourceReference(
        {},
        {
          sourceType: "COURS",
          sourceTitle: "Sans cible",
          relativePath: "BACPRO/1/1AERO PSE/notes.md",
        },
      ),
    PedagogicalSourceValidationError,
  );

  await assert.rejects(
    () =>
      createPedagogicalSourceReference(
        { lessonId, activityId: coreActivityId },
        {
          sourceType: "COURS",
          sourceTitle: "Deux cibles",
          relativePath: "BACPRO/1/1AERO PSE/notes.md",
        },
      ),
    PedagogicalSourceValidationError,
  );
});

test("rejects an absolute Windows path", async () => {
  await assert.rejects(
    () =>
      createPedagogicalSourceReference(
        { lessonId },
        {
          sourceType: "COURS",
          sourceTitle: "Chemin Windows",
          relativePath: "C:\\Users\\audre\\Documents\\cours\\BACPRO\\notes.docx",
        },
      ),
    PedagogicalSourceValidationError,
  );
});

test("rejects an absolute WSL/Linux path", async () => {
  await assert.rejects(
    () =>
      createPedagogicalSourceReference(
        { lessonId },
        {
          sourceType: "COURS",
          sourceTitle: "Chemin WSL",
          relativePath: "/mnt/c/Users/audre/Documents/cours/BACPRO/notes.docx",
        },
      ),
    PedagogicalSourceValidationError,
  );
});

test("accepts a relative path", async () => {
  const reference = await createPedagogicalSourceReference(
    { lessonId },
    {
      sourceType: "RESSOURCE",
      sourceTitle: "Chemin relatif valide",
      relativePath: "CAP/CAP PSE DELAGRAVE/manuel.pdf",
    },
  );
  assert.ok(reference.id);
});

test("supports both CONFIRME and A_VERIFIER conformity states", async () => {
  const confirmed = await createPedagogicalSourceReference(
    { lessonId },
    {
      sourceType: "REFERENTIEL",
      sourceTitle: "Référence confirmée",
      relativePath: "BACPRO/2/2AERO PSE/REFERENTIELS_OFFICIELS/x.pdf",
      conformity: "CONFIRME",
    },
  );
  const toVerify = await createPedagogicalSourceReference(
    { lessonId },
    {
      sourceType: "REFERENTIEL",
      sourceTitle: "Référence à vérifier",
      relativePath: "BACPRO/2/2AERO PSE/REFERENTIELS_OFFICIELS/y.pdf",
    },
  );

  const stored = await prisma.pedagogicalSourceReference.findMany({
    where: { id: { in: [confirmed.id, toVerify.id] } },
    select: { id: true, conformity: true },
  });
  assert.equal(
    stored.find((entry) => entry.id === confirmed.id)?.conformity,
    "CONFIRME",
  );
  assert.equal(
    stored.find((entry) => entry.id === toVerify.id)?.conformity,
    "A_VERIFIER",
  );
});
