import type { Prisma } from "@/generated/prisma/client";
import type {
  PublicationStatus,
  SequenceStatus,
  TeachingAreaKind,
} from "@/generated/prisma/enums";
import { prisma } from "@/server/db/prisma";

import type { CatalogEntityReference } from "./validation";

export type CatalogMutationErrorCode =
  | "BOUNDARY"
  | "CONFLICT"
  | "HAS_CHILDREN"
  | "NOT_FOUND"
  | "STALE";

const publicMessages: Record<CatalogMutationErrorCode, string> = {
  BOUNDARY: "Cet élément est déjà à la limite de la liste.",
  CONFLICT: "Un élément portant ce nom ou occupant cette position existe déjà.",
  HAS_CHILDREN: "Archivez d’abord les éléments qu’il contient.",
  NOT_FOUND: "Élément introuvable dans cet emplacement.",
  STALE: "Cet élément a changé depuis l’affichage. Rechargez puis réessayez.",
};

export class CatalogMutationError extends Error {
  constructor(public readonly code: CatalogMutationErrorCode) {
    super(publicMessages[code]);
    this.name = "CatalogMutationError";
  }
}

type Transaction = Prisma.TransactionClient;
type Direction = "UP" | "DOWN";

type ActiveEntity = {
  position: number;
  updatedAt: Date;
};

function siblingScope(reference: CatalogEntityReference) {
  switch (reference.type) {
    case "program":
      return "catalog:programs";
    case "level":
      return `catalog:levels:${reference.parentId}`;
    case "classroom":
      return `catalog:classrooms:${reference.parentId}`;
    case "teachingArea":
      return `catalog:teaching-areas:${reference.parentId}`;
    case "learningSequence":
      return `catalog:sequences:${reference.parentId}`;
    case "lesson":
      return `catalog:lessons:${reference.parentId}`;
  }
}

function childScope(reference: CatalogEntityReference) {
  switch (reference.type) {
    case "program":
      return `catalog:levels:${reference.id}`;
    case "level":
      return `catalog:classrooms:${reference.id}`;
    case "classroom":
      return `catalog:teaching-areas:${reference.id}`;
    case "teachingArea":
      return `catalog:sequences:${reference.id}`;
    case "learningSequence":
      return `catalog:lessons:${reference.id}`;
    case "lesson":
      return `catalog:activities:${reference.id}`;
  }
}

async function lockScopes(transaction: Transaction, ...scopes: string[]) {
  for (const scope of [...new Set(scopes)].sort()) {
    await transaction.$queryRaw`
      SELECT pg_advisory_xact_lock(hashtextextended(${scope}, 0))::text
    `;
  }
}

function isPrismaConflict(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

async function runMutation<T>(work: (transaction: Transaction) => Promise<T>) {
  try {
    return await prisma.$transaction(work, {
      maxWait: 5_000,
      timeout: 5_000,
    });
  } catch (error) {
    if (error instanceof CatalogMutationError) {
      throw error;
    }

    if (isPrismaConflict(error)) {
      throw new CatalogMutationError("CONFLICT");
    }

    throw error;
  }
}

async function assertActiveParent(
  transaction: Transaction,
  type:
    | "program"
    | "level"
    | "classroom"
    | "teachingArea"
    | "learningSequence",
  id: string,
) {
  const parent = await (async () => {
    switch (type) {
      case "program":
        return transaction.program.findFirst({
          where: { id, archivedAt: null },
          select: { id: true },
        });
      case "level":
        return transaction.level.findFirst({
          where: { id, archivedAt: null, program: { archivedAt: null } },
          select: { id: true },
        });
      case "classroom":
        return transaction.classroom.findFirst({
          where: {
            id,
            archivedAt: null,
            level: { archivedAt: null, program: { archivedAt: null } },
          },
          select: { id: true },
        });
      case "teachingArea":
        return transaction.teachingArea.findFirst({
          where: {
            id,
            archivedAt: null,
            classroom: {
              archivedAt: null,
              level: { archivedAt: null, program: { archivedAt: null } },
            },
          },
          select: { id: true },
        });
      case "learningSequence":
        return transaction.learningSequence.findFirst({
          where: {
            id,
            archivedAt: null,
            teachingArea: {
              archivedAt: null,
              classroom: {
                archivedAt: null,
                level: { archivedAt: null, program: { archivedAt: null } },
              },
            },
          },
          select: { id: true },
        });
    }
  })();

  if (!parent) {
    throw new CatalogMutationError("NOT_FOUND");
  }
}

async function assertActiveEntity(
  transaction: Transaction,
  reference: CatalogEntityReference,
): Promise<ActiveEntity> {
  const entity = await (async () => {
    switch (reference.type) {
      case "program":
        return transaction.program.findFirst({
          where: { id: reference.id, archivedAt: null },
          select: { position: true, updatedAt: true },
        });
      case "level":
        return transaction.level.findFirst({
          where: {
            id: reference.id,
            programId: reference.parentId,
            archivedAt: null,
            program: { archivedAt: null },
          },
          select: { position: true, updatedAt: true },
        });
      case "classroom":
        return transaction.classroom.findFirst({
          where: {
            id: reference.id,
            levelId: reference.parentId,
            archivedAt: null,
            level: { archivedAt: null, program: { archivedAt: null } },
          },
          select: { position: true, updatedAt: true },
        });
      case "teachingArea":
        return transaction.teachingArea.findFirst({
          where: {
            id: reference.id,
            classroomId: reference.parentId,
            archivedAt: null,
            classroom: {
              archivedAt: null,
              level: { archivedAt: null, program: { archivedAt: null } },
            },
          },
          select: { position: true, updatedAt: true },
        });
      case "learningSequence":
        return transaction.learningSequence.findFirst({
          where: {
            id: reference.id,
            teachingAreaId: reference.parentId,
            archivedAt: null,
            teachingArea: {
              archivedAt: null,
              classroom: {
                archivedAt: null,
                level: { archivedAt: null, program: { archivedAt: null } },
              },
            },
          },
          select: { position: true, updatedAt: true },
        });
      case "lesson":
        return transaction.lesson.findFirst({
          where: {
            id: reference.id,
            sequenceId: reference.parentId,
            archivedAt: null,
            sequence: {
              archivedAt: null,
              teachingArea: {
                archivedAt: null,
                classroom: {
                  archivedAt: null,
                  level: { archivedAt: null, program: { archivedAt: null } },
                },
              },
            },
          },
          select: { position: true, updatedAt: true },
        });
    }
  })();

  if (!entity) {
    throw new CatalogMutationError("NOT_FOUND");
  }

  return entity;
}

function assertFresh(entity: ActiveEntity, expectedUpdatedAt: Date) {
  if (entity.updatedAt.getTime() !== expectedUpdatedAt.getTime()) {
    throw new CatalogMutationError("STALE");
  }
}

async function getNextPosition(
  transaction: Transaction,
  reference: CatalogEntityReference,
) {
  const maximum = await (async () => {
    switch (reference.type) {
      case "program":
        return transaction.program.aggregate({
          where: { archivedAt: null },
          _max: { position: true },
        });
      case "level":
        return transaction.level.aggregate({
          where: { programId: reference.parentId, archivedAt: null },
          _max: { position: true },
        });
      case "classroom":
        return transaction.classroom.aggregate({
          where: { levelId: reference.parentId, archivedAt: null },
          _max: { position: true },
        });
      case "teachingArea":
        return transaction.teachingArea.aggregate({
          where: { classroomId: reference.parentId, archivedAt: null },
          _max: { position: true },
        });
      case "learningSequence":
        return transaction.learningSequence.aggregate({
          where: { teachingAreaId: reference.parentId, archivedAt: null },
          _max: { position: true },
        });
      case "lesson":
        return transaction.lesson.aggregate({
          where: { sequenceId: reference.parentId, archivedAt: null },
          _max: { position: true },
        });
    }
  })();

  return (maximum._max.position ?? -1) + 1;
}

export async function createProgram(name: string) {
  const reference = { type: "program", id: "new" } as const;

  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    const position = await getNextPosition(transaction, reference);
    return transaction.program.create({
      data: { name, position },
      select: { id: true },
    });
  });
}

export async function createLevel(programId: string, name: string) {
  const reference = { type: "level", id: "new", parentId: programId } as const;

  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    await assertActiveParent(transaction, "program", programId);
    const position = await getNextPosition(transaction, reference);
    return transaction.level.create({
      data: { programId, name, position },
      select: { id: true },
    });
  });
}

export async function createClassroom(levelId: string, name: string) {
  const reference = { type: "classroom", id: "new", parentId: levelId } as const;

  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    await assertActiveParent(transaction, "level", levelId);
    const position = await getNextPosition(transaction, reference);
    return transaction.classroom.create({
      data: { levelId, name, position },
      select: { id: true },
    });
  });
}

export async function createTeachingArea(
  classroomId: string,
  name: string,
  kind: TeachingAreaKind,
) {
  const reference = {
    type: "teachingArea",
    id: "new",
    parentId: classroomId,
  } as const;

  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    await assertActiveParent(transaction, "classroom", classroomId);
    const position = await getNextPosition(transaction, reference);
    return transaction.teachingArea.create({
      data: { classroomId, name, kind, position },
      select: { id: true },
    });
  });
}

export async function createLearningSequence(
  teachingAreaId: string,
  title: string,
  description: string | null,
) {
  const reference = {
    type: "learningSequence",
    id: "new",
    parentId: teachingAreaId,
  } as const;

  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    await assertActiveParent(transaction, "teachingArea", teachingAreaId);
    const position = await getNextPosition(transaction, reference);
    return transaction.learningSequence.create({
      data: { teachingAreaId, title, description, position },
      select: { id: true },
    });
  });
}

export async function createLesson(
  sequenceId: string,
  title: string,
  description: string | null,
) {
  const reference = {
    type: "lesson",
    id: "new",
    parentId: sequenceId,
  } as const;

  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    await assertActiveParent(transaction, "learningSequence", sequenceId);
    const position = await getNextPosition(transaction, reference);
    return transaction.lesson.create({
      data: { sequenceId, title, description, position },
      select: { id: true },
    });
  });
}

export async function renameCatalogEntity(
  reference: Exclude<
    CatalogEntityReference,
    { type: "learningSequence" } | { type: "lesson" }
  >,
  name: string,
  expectedUpdatedAt: Date,
) {
  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    const entity = await assertActiveEntity(transaction, reference);
    assertFresh(entity, expectedUpdatedAt);

    switch (reference.type) {
      case "program":
        return transaction.program.update({
          where: { id: reference.id },
          data: { name },
          select: { id: true },
        });
      case "level":
        return transaction.level.update({
          where: { id: reference.id },
          data: { name },
          select: { id: true },
        });
      case "classroom":
        return transaction.classroom.update({
          where: { id: reference.id },
          data: { name },
          select: { id: true },
        });
      case "teachingArea":
        return transaction.teachingArea.update({
          where: { id: reference.id },
          data: { name },
          select: { id: true },
        });
    }
  });
}

export async function updateLearningSequence(
  reference: Extract<CatalogEntityReference, { type: "learningSequence" }>,
  title: string,
  description: string | null,
  expectedUpdatedAt: Date,
) {
  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    const entity = await assertActiveEntity(transaction, reference);
    assertFresh(entity, expectedUpdatedAt);

    return transaction.learningSequence.update({
      where: { id: reference.id },
      data: { title, description },
      select: { id: true },
    });
  });
}

export async function setLearningSequenceStatus(
  reference: Extract<CatalogEntityReference, { type: "learningSequence" }>,
  status: SequenceStatus,
  expectedUpdatedAt: Date,
) {
  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    const entity = await assertActiveEntity(transaction, reference);
    assertFresh(entity, expectedUpdatedAt);

    return transaction.learningSequence.update({
      where: { id: reference.id },
      data: { status },
      select: { id: true },
    });
  });
}

export async function updateLesson(
  reference: Extract<CatalogEntityReference, { type: "lesson" }>,
  title: string,
  description: string | null,
  expectedUpdatedAt: Date,
) {
  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    const entity = await assertActiveEntity(transaction, reference);
    assertFresh(entity, expectedUpdatedAt);

    return transaction.lesson.update({
      where: { id: reference.id },
      data: { title, description },
      select: { id: true },
    });
  });
}

export async function setLessonPublicationStatus(
  reference: Extract<CatalogEntityReference, { type: "lesson" }>,
  publicationStatus: PublicationStatus,
  expectedUpdatedAt: Date,
) {
  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    const entity = await assertActiveEntity(transaction, reference);
    assertFresh(entity, expectedUpdatedAt);

    return transaction.lesson.update({
      where: { id: reference.id },
      data: { publicationStatus },
      select: { id: true },
    });
  });
}

async function countActiveChildren(
  transaction: Transaction,
  reference: CatalogEntityReference,
) {
  switch (reference.type) {
    case "program":
      return transaction.level.count({
        where: { programId: reference.id, archivedAt: null },
      });
    case "level":
      return transaction.classroom.count({
        where: { levelId: reference.id, archivedAt: null },
      });
    case "classroom":
      return transaction.teachingArea.count({
        where: { classroomId: reference.id, archivedAt: null },
      });
    case "teachingArea":
      return transaction.learningSequence.count({
        where: { teachingAreaId: reference.id, archivedAt: null },
      });
    case "learningSequence":
      return transaction.lesson.count({
        where: { sequenceId: reference.id, archivedAt: null },
      });
    case "lesson":
      return transaction.activity.count({
        where: { lessonId: reference.id, archivedAt: null },
      });
  }
}

async function archiveEntity(
  transaction: Transaction,
  reference: CatalogEntityReference,
) {
  const archivedAt = new Date();

  switch (reference.type) {
    case "program":
      return transaction.program.update({
        where: { id: reference.id },
        data: { archivedAt },
        select: { id: true },
      });
    case "level":
      return transaction.level.update({
        where: { id: reference.id },
        data: { archivedAt },
        select: { id: true },
      });
    case "classroom":
      return transaction.classroom.update({
        where: { id: reference.id },
        data: { archivedAt },
        select: { id: true },
      });
    case "teachingArea":
      return transaction.teachingArea.update({
        where: { id: reference.id },
        data: { archivedAt },
        select: { id: true },
      });
    case "learningSequence":
      return transaction.learningSequence.update({
        where: { id: reference.id },
        data: { archivedAt },
        select: { id: true },
      });
    case "lesson":
      return transaction.lesson.update({
        where: { id: reference.id },
        data: { archivedAt },
        select: { id: true },
      });
  }
}

async function listFollowingSiblings(
  transaction: Transaction,
  reference: CatalogEntityReference,
  position: number,
) {
  const where = { archivedAt: null, position: { gt: position } } as const;

  switch (reference.type) {
    case "program":
      return transaction.program.findMany({
        where,
        orderBy: { position: "asc" },
        select: { id: true, position: true },
        take: 1_000,
      });
    case "level":
      return transaction.level.findMany({
        where: { ...where, programId: reference.parentId },
        orderBy: { position: "asc" },
        select: { id: true, position: true },
        take: 1_000,
      });
    case "classroom":
      return transaction.classroom.findMany({
        where: { ...where, levelId: reference.parentId },
        orderBy: { position: "asc" },
        select: { id: true, position: true },
        take: 1_000,
      });
    case "teachingArea":
      return transaction.teachingArea.findMany({
        where: { ...where, classroomId: reference.parentId },
        orderBy: { position: "asc" },
        select: { id: true, position: true },
        take: 1_000,
      });
    case "learningSequence":
      return transaction.learningSequence.findMany({
        where: { ...where, teachingAreaId: reference.parentId },
        orderBy: { position: "asc" },
        select: { id: true, position: true },
        take: 1_000,
      });
    case "lesson":
      return transaction.lesson.findMany({
        where: { ...where, sequenceId: reference.parentId },
        orderBy: { position: "asc" },
        select: { id: true, position: true },
        take: 1_000,
      });
  }
}

async function updateEntityPosition(
  transaction: Transaction,
  reference: CatalogEntityReference,
  position: number,
) {
  switch (reference.type) {
    case "program":
      return transaction.program.update({
        where: { id: reference.id },
        data: { position },
        select: { id: true },
      });
    case "level":
      return transaction.level.update({
        where: { id: reference.id },
        data: { position },
        select: { id: true },
      });
    case "classroom":
      return transaction.classroom.update({
        where: { id: reference.id },
        data: { position },
        select: { id: true },
      });
    case "teachingArea":
      return transaction.teachingArea.update({
        where: { id: reference.id },
        data: { position },
        select: { id: true },
      });
    case "learningSequence":
      return transaction.learningSequence.update({
        where: { id: reference.id },
        data: { position },
        select: { id: true },
      });
    case "lesson":
      return transaction.lesson.update({
        where: { id: reference.id },
        data: { position },
        select: { id: true },
      });
  }
}

export async function archiveCatalogEntity(
  reference: CatalogEntityReference,
  expectedUpdatedAt: Date,
) {
  return runMutation(async (transaction) => {
    await lockScopes(
      transaction,
      siblingScope(reference),
      childScope(reference),
    );
    const entity = await assertActiveEntity(transaction, reference);
    assertFresh(entity, expectedUpdatedAt);

    if ((await countActiveChildren(transaction, reference)) > 0) {
      throw new CatalogMutationError("HAS_CHILDREN");
    }

    await archiveEntity(transaction, reference);
    const following = await listFollowingSiblings(
      transaction,
      reference,
      entity.position,
    );

    for (const sibling of following) {
      await updateEntityPosition(
        transaction,
        { ...reference, id: sibling.id },
        sibling.position - 1,
      );
    }
  });
}

async function findSiblingAtPosition(
  transaction: Transaction,
  reference: CatalogEntityReference,
  position: number,
) {
  const where = { archivedAt: null, position } as const;

  switch (reference.type) {
    case "program":
      return transaction.program.findFirst({ where, select: { id: true } });
    case "level":
      return transaction.level.findFirst({
        where: { ...where, programId: reference.parentId },
        select: { id: true },
      });
    case "classroom":
      return transaction.classroom.findFirst({
        where: { ...where, levelId: reference.parentId },
        select: { id: true },
      });
    case "teachingArea":
      return transaction.teachingArea.findFirst({
        where: { ...where, classroomId: reference.parentId },
        select: { id: true },
      });
    case "learningSequence":
      return transaction.learningSequence.findFirst({
        where: { ...where, teachingAreaId: reference.parentId },
        select: { id: true },
      });
    case "lesson":
      return transaction.lesson.findFirst({
        where: { ...where, sequenceId: reference.parentId },
        select: { id: true },
      });
  }
}

export async function moveCatalogEntity(
  reference: CatalogEntityReference,
  direction: Direction,
  expectedPosition: number,
) {
  return runMutation(async (transaction) => {
    await lockScopes(transaction, siblingScope(reference));
    const entity = await assertActiveEntity(transaction, reference);

    if (entity.position !== expectedPosition) {
      throw new CatalogMutationError("STALE");
    }

    const targetPosition = entity.position + (direction === "UP" ? -1 : 1);

    if (targetPosition < 0) {
      throw new CatalogMutationError("BOUNDARY");
    }

    const sibling = await findSiblingAtPosition(
      transaction,
      reference,
      targetPosition,
    );

    if (!sibling) {
      throw new CatalogMutationError("BOUNDARY");
    }

    const temporaryPosition = await getNextPosition(transaction, reference);
    await updateEntityPosition(transaction, reference, temporaryPosition);
    await updateEntityPosition(
      transaction,
      { ...reference, id: sibling.id },
      entity.position,
    );
    await updateEntityPosition(transaction, reference, targetPosition);
  });
}
