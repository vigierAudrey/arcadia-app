import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { after, test } from "node:test";

import {
  PublicationStatus,
  SequenceStatus,
  TeachingAreaKind,
} from "../src/generated/prisma/enums";
import {
  archiveCatalogEntity,
  CatalogMutationError,
  createClassroom,
  createLesson,
  createLearningSequence,
  createLevel,
  createProgram,
  createTeachingArea,
  moveCatalogEntity,
  renameCatalogEntity,
  setLessonPublicationStatus,
  setLearningSequenceStatus,
  updateLesson,
  updateLearningSequence,
} from "../src/server/catalog/mutations";
import { prisma } from "../src/server/db/prisma";

after(async () => {
  await prisma.$disconnect();
});

function expectsCatalogError(code: CatalogMutationError["code"]) {
  return (error: unknown) =>
    error instanceof CatalogMutationError && error.code === code;
}

test("catalog mutations preserve hierarchy, ordering and archival rules", async () => {
  const suffix = randomUUID().slice(0, 8);
  let programId: string | undefined;

  try {
    const program = await createProgram(`TEST ${suffix}`);
    programId = program.id;

    await assert.rejects(
      () => createProgram(`TEST ${suffix}`),
      expectsCatalogError("CONFLICT"),
    );

    const initialProgram = await prisma.program.findUniqueOrThrow({
      where: { id: program.id },
      select: { updatedAt: true },
    });
    await renameCatalogEntity(
      { type: "program", id: program.id },
      `TEST RENOMMÉ ${suffix}`,
      initialProgram.updatedAt,
    );

    const level = await createLevel(program.id, "Niveau test");
    await assert.rejects(
      () => createClassroom(randomUUID(), "Classe orpheline"),
      expectsCatalogError("NOT_FOUND"),
    );

    const classroomA = await createClassroom(level.id, "Classe A");
    const classroomB = await createClassroom(level.id, "Classe B");
    const classroomC = await createClassroom(level.id, "Classe C");
    const unrelatedLevel = await prisma.level.findFirstOrThrow({
      where: { id: { not: level.id }, archivedAt: null },
      select: { id: true },
    });
    await assert.rejects(
      () =>
        moveCatalogEntity(
          {
            type: "classroom",
            id: classroomA.id,
            parentId: unrelatedLevel.id,
          },
          "DOWN",
          0,
        ),
      expectsCatalogError("NOT_FOUND"),
    );

    await moveCatalogEntity(
      { type: "classroom", id: classroomB.id, parentId: level.id },
      "UP",
      1,
    );
    await assert.rejects(
      () =>
        moveCatalogEntity(
          { type: "classroom", id: classroomB.id, parentId: level.id },
          "UP",
          1,
        ),
      expectsCatalogError("STALE"),
    );

    assert.deepEqual(
      await prisma.classroom.findMany({
        where: { levelId: level.id, archivedAt: null },
        orderBy: { position: "asc" },
        select: { name: true, position: true },
      }),
      [
        { name: "Classe B", position: 0 },
        { name: "Classe A", position: 1 },
        { name: "Classe C", position: 2 },
      ],
    );

    const teachingArea = await createTeachingArea(
      classroomA.id,
      "PSE test",
      TeachingAreaKind.SUBJECT,
    );
    const sequence = await createLearningSequence(
      teachingArea.id,
      "Séquence test",
      null,
    );
    const initialSequence = await prisma.learningSequence.findUniqueOrThrow({
      where: { id: sequence.id },
      select: { status: true, updatedAt: true },
    });
    assert.equal(initialSequence.status, SequenceStatus.DRAFT);

    await updateLearningSequence(
      {
        type: "learningSequence",
        id: sequence.id,
        parentId: teachingArea.id,
      },
      "Séquence test modifiée",
      "Description persistée",
      initialSequence.updatedAt,
    );
    const editedSequence = await prisma.learningSequence.findUniqueOrThrow({
      where: { id: sequence.id },
      select: { description: true, updatedAt: true },
    });
    assert.equal(editedSequence.description, "Description persistée");

    await setLearningSequenceStatus(
      {
        type: "learningSequence",
        id: sequence.id,
        parentId: teachingArea.id,
      },
      SequenceStatus.LOCKED,
      editedSequence.updatedAt,
    );
    assert.equal(
      (
        await prisma.learningSequence.findUniqueOrThrow({
          where: { id: sequence.id },
          select: { status: true },
        })
      ).status,
      SequenceStatus.LOCKED,
    );

    const otherSequence = await createLearningSequence(
      teachingArea.id,
      "Autre séquence",
      null,
    );
    const lessonA = await createLesson(
      sequence.id,
      "Séance A",
      "Première description",
    );
    const lessonB = await createLesson(sequence.id, "Séance B", null);

    assert.equal(
      (
        await prisma.lesson.findUniqueOrThrow({
          where: { id: lessonA.id },
          select: { publicationStatus: true },
        })
      ).publicationStatus,
      PublicationStatus.DRAFT,
    );

    await assert.rejects(
      () =>
        moveCatalogEntity(
          {
            type: "lesson",
            id: lessonA.id,
            parentId: otherSequence.id,
          },
          "DOWN",
          0,
        ),
      expectsCatalogError("NOT_FOUND"),
    );

    await moveCatalogEntity(
      { type: "lesson", id: lessonB.id, parentId: sequence.id },
      "UP",
      1,
    );
    assert.deepEqual(
      await prisma.lesson.findMany({
        where: { sequenceId: sequence.id, archivedAt: null },
        orderBy: { position: "asc" },
        select: { id: true, position: true },
      }),
      [
        { id: lessonB.id, position: 0 },
        { id: lessonA.id, position: 1 },
      ],
    );

    const lessonAfterMove = await prisma.lesson.findUniqueOrThrow({
      where: { id: lessonA.id },
      select: { updatedAt: true },
    });
    await updateLesson(
      { type: "lesson", id: lessonA.id, parentId: sequence.id },
      "Séance A modifiée",
      "Description de séance persistée",
      lessonAfterMove.updatedAt,
    );
    const editedLesson = await prisma.lesson.findUniqueOrThrow({
      where: { id: lessonA.id },
      select: { description: true, updatedAt: true },
    });
    assert.equal(editedLesson.description, "Description de séance persistée");

    await setLessonPublicationStatus(
      { type: "lesson", id: lessonA.id, parentId: sequence.id },
      PublicationStatus.PUBLISHED,
      editedLesson.updatedAt,
    );
    assert.equal(
      (
        await prisma.lesson.findUniqueOrThrow({
          where: { id: lessonA.id },
          select: { publicationStatus: true },
        })
      ).publicationStatus,
      PublicationStatus.PUBLISHED,
    );

    const sequenceBeforeBlockedArchive =
      await prisma.learningSequence.findUniqueOrThrow({
        where: { id: sequence.id },
        select: { updatedAt: true },
      });
    await assert.rejects(
      () =>
        archiveCatalogEntity(
          {
            type: "learningSequence",
            id: sequence.id,
            parentId: teachingArea.id,
          },
          sequenceBeforeBlockedArchive.updatedAt,
        ),
      expectsCatalogError("HAS_CHILDREN"),
    );

    const classroomBeforeBlockedArchive =
      await prisma.classroom.findUniqueOrThrow({
        where: { id: classroomA.id },
        select: { updatedAt: true },
      });
    await assert.rejects(
      () =>
        archiveCatalogEntity(
          { type: "classroom", id: classroomA.id, parentId: level.id },
          classroomBeforeBlockedArchive.updatedAt,
        ),
      expectsCatalogError("HAS_CHILDREN"),
    );

    for (const lessonId of [lessonA.id, lessonB.id]) {
      const lessonBeforeArchive = await prisma.lesson.findUniqueOrThrow({
        where: { id: lessonId },
        select: { updatedAt: true },
      });
      await archiveCatalogEntity(
        { type: "lesson", id: lessonId, parentId: sequence.id },
        lessonBeforeArchive.updatedAt,
      );
    }

    const sequenceBeforeArchive = await prisma.learningSequence.findUniqueOrThrow({
      where: { id: sequence.id },
      select: { updatedAt: true },
    });
    await archiveCatalogEntity(
      {
        type: "learningSequence",
        id: sequence.id,
        parentId: teachingArea.id,
      },
      sequenceBeforeArchive.updatedAt,
    );
    const otherSequenceBeforeArchive =
      await prisma.learningSequence.findUniqueOrThrow({
        where: { id: otherSequence.id },
        select: { updatedAt: true },
      });
    await archiveCatalogEntity(
      {
        type: "learningSequence",
        id: otherSequence.id,
        parentId: teachingArea.id,
      },
      otherSequenceBeforeArchive.updatedAt,
    );
    const teachingAreaBeforeArchive =
      await prisma.teachingArea.findUniqueOrThrow({
        where: { id: teachingArea.id },
        select: { updatedAt: true },
      });
    await archiveCatalogEntity(
      {
        type: "teachingArea",
        id: teachingArea.id,
        parentId: classroomA.id,
      },
      teachingAreaBeforeArchive.updatedAt,
    );
    const classroomBeforeArchive = await prisma.classroom.findUniqueOrThrow({
      where: { id: classroomA.id },
      select: { updatedAt: true },
    });
    await archiveCatalogEntity(
      { type: "classroom", id: classroomA.id, parentId: level.id },
      classroomBeforeArchive.updatedAt,
    );

    assert.deepEqual(
      await prisma.classroom.findMany({
        where: { levelId: level.id, archivedAt: null },
        orderBy: { position: "asc" },
        select: { id: true, position: true },
      }),
      [
        { id: classroomB.id, position: 0 },
        { id: classroomC.id, position: 1 },
      ],
    );

    const programBeforeBlockedArchive = await prisma.program.findUniqueOrThrow({
      where: { id: program.id },
      select: { updatedAt: true },
    });
    await assert.rejects(
      () =>
        archiveCatalogEntity(
          { type: "program", id: program.id },
          programBeforeBlockedArchive.updatedAt,
        ),
      expectsCatalogError("HAS_CHILDREN"),
    );
  } finally {
    if (programId) {
      const levels = await prisma.level.findMany({
        where: { programId },
        select: { id: true },
        take: 100,
      });
      const levelIds = levels.map(({ id }) => id);
      const classrooms = await prisma.classroom.findMany({
        where: { levelId: { in: levelIds } },
        select: { id: true },
        take: 1_000,
      });
      const classroomIds = classrooms.map(({ id }) => id);
      const teachingAreas = await prisma.teachingArea.findMany({
        where: { classroomId: { in: classroomIds } },
        select: { id: true },
        take: 1_000,
      });
      const teachingAreaIds = teachingAreas.map(({ id }) => id);
      const sequences = await prisma.learningSequence.findMany({
        where: { teachingAreaId: { in: teachingAreaIds } },
        select: { id: true },
        take: 1_000,
      });
      const sequenceIds = sequences.map(({ id }) => id);
      const lessons = await prisma.lesson.findMany({
        where: { sequenceId: { in: sequenceIds } },
        select: { id: true },
        take: 1_000,
      });
      const lessonIds = lessons.map(({ id }) => id);

      await prisma.activity.deleteMany({
        where: { lessonId: { in: lessonIds } },
      });
      await prisma.lesson.deleteMany({
        where: { sequenceId: { in: sequenceIds } },
      });
      await prisma.learningSequence.deleteMany({
        where: { teachingAreaId: { in: teachingAreaIds } },
      });
      await prisma.teachingArea.deleteMany({
        where: { classroomId: { in: classroomIds } },
      });
      await prisma.classroom.deleteMany({
        where: { levelId: { in: levelIds } },
      });
      await prisma.level.deleteMany({ where: { programId } });
      await prisma.program.delete({ where: { id: programId } });
    }
  }
});
