"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import type { AdminActionState } from "@/features/admin/action-state";
import { AdminAccessError, requireAdmin } from "@/server/auth/require-admin";
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
} from "@/server/catalog/mutations";
import {
  classroomInputSchema,
  type CatalogEntityReference,
  type CatalogEntityType,
  entityReferenceSchemas,
  expectedPositionSchema,
  expectedUpdatedAtSchema,
  levelInputSchema,
  lessonInputSchema,
  moveDirectionSchema,
  publicationStatusSchema,
  programInputSchema,
  sequenceInputSchema,
  sequenceStatusSchema,
  teachingAreaInputSchema,
  uuidSchema,
} from "@/server/catalog/validation";

const createContextSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("program") }),
  z.object({ type: z.literal("level"), parentId: uuidSchema }),
  z.object({ type: z.literal("classroom"), parentId: uuidSchema }),
  z.object({ type: z.literal("teachingArea"), parentId: uuidSchema }),
  z.object({ type: z.literal("learningSequence"), parentId: uuidSchema }),
  z.object({ type: z.literal("lesson"), parentId: uuidSchema }),
]);

function validationError(message: string): AdminActionState {
  return { status: "error", message };
}

function firstIssue(result: { error: { issues: Array<{ message: string }> } }) {
  return result.error.issues[0]?.message ?? "Données invalides.";
}

function parseReference(input: unknown): CatalogEntityReference | null {
  if (typeof input !== "object" || input === null || !("type" in input)) {
    return null;
  }

  const candidate = input as {
    type?: CatalogEntityType;
    id?: unknown;
    parentId?: unknown;
  };
  switch (candidate.type) {
    case "program": {
      const result = entityReferenceSchemas.program.safeParse(candidate);
      return result.success ? { type: "program", id: result.data.id } : null;
    }
    case "level":
    case "classroom":
    case "teachingArea":
    case "learningSequence":
    case "lesson": {
      const result = entityReferenceSchemas[candidate.type].safeParse(candidate);
      return result.success
        ? {
            type: candidate.type,
            id: result.data.id,
            parentId: result.data.parentId,
          }
        : null;
    }
    default:
      return null;
  }
}

async function runAction(
  operation: () => Promise<unknown>,
  successMessage: string,
): Promise<AdminActionState> {
  try {
    await requireAdmin();
    await operation();
    revalidatePath("/admin");
    return { status: "success", message: successMessage };
  } catch (error) {
    if (error instanceof CatalogMutationError) {
      return validationError(error.message);
    }

    if (error instanceof AdminAccessError) {
      return validationError("Session expirée ou accès refusé.");
    }

    return validationError("L’opération a échoué. Rechargez puis réessayez.");
  }
}

export async function createCatalogItemAction(
  rawContext: unknown,
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const context = createContextSchema.safeParse(rawContext);

  if (!context.success) {
    return validationError("Emplacement invalide.");
  }

  switch (context.data.type) {
    case "program": {
      const input = programInputSchema.safeParse({ name: formData.get("name") });
      if (!input.success) return validationError(firstIssue(input));
      return runAction(() => createProgram(input.data.name), "Formation créée.");
    }
    case "level": {
      const parentId = context.data.parentId;
      const input = levelInputSchema.safeParse({ name: formData.get("name") });
      if (!input.success) return validationError(firstIssue(input));
      return runAction(
        () => createLevel(parentId, input.data.name),
        "Niveau créé.",
      );
    }
    case "classroom": {
      const parentId = context.data.parentId;
      const input = classroomInputSchema.safeParse({ name: formData.get("name") });
      if (!input.success) return validationError(firstIssue(input));
      return runAction(
        () => createClassroom(parentId, input.data.name),
        "Classe créée.",
      );
    }
    case "teachingArea": {
      const parentId = context.data.parentId;
      const input = teachingAreaInputSchema.safeParse({
        name: formData.get("name"),
        kind: formData.get("kind"),
      });
      if (!input.success) return validationError(firstIssue(input));
      return runAction(
        () =>
          createTeachingArea(
            parentId,
            input.data.name,
            input.data.kind,
          ),
        "Enseignement créé.",
      );
    }
    case "learningSequence": {
      const parentId = context.data.parentId;
      const input = sequenceInputSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
      });
      if (!input.success) return validationError(firstIssue(input));
      return runAction(
        () =>
          createLearningSequence(
            parentId,
            input.data.title,
            input.data.description,
          ),
        "Séquence créée en brouillon.",
      );
    }
    case "lesson": {
      const parentId = context.data.parentId;
      const input = lessonInputSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
      });
      if (!input.success) return validationError(firstIssue(input));
      return runAction(
        () => createLesson(parentId, input.data.title, input.data.description),
        "Séance créée en brouillon.",
      );
    }
  }
}

export async function editCatalogItemAction(
  rawReference: unknown,
  rawExpectedUpdatedAt: unknown,
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const reference = parseReference(rawReference);
  const expectedUpdatedAt = expectedUpdatedAtSchema.safeParse(
    rawExpectedUpdatedAt,
  );

  if (!reference || !expectedUpdatedAt.success) {
    return validationError("Référence invalide. Rechargez la page.");
  }

  const date = new Date(expectedUpdatedAt.data);

  if (reference.type === "learningSequence") {
    const input = sequenceInputSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
    });
    if (!input.success) return validationError(firstIssue(input));

    return runAction(
      () =>
        updateLearningSequence(
          reference,
          input.data.title,
          input.data.description,
          date,
        ),
      "Séquence mise à jour.",
    );
  }

  if (reference.type === "lesson") {
    const input = lessonInputSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
    });
    if (!input.success) return validationError(firstIssue(input));

    return runAction(
      () =>
        updateLesson(
          reference,
          input.data.title,
          input.data.description,
          date,
        ),
      "Séance mise à jour.",
    );
  }

  const schema = {
    program: programInputSchema,
    level: levelInputSchema,
    classroom: classroomInputSchema,
    teachingArea: teachingAreaInputSchema.pick({ name: true }),
  }[reference.type];
  const input = schema.safeParse({ name: formData.get("name") });

  if (!input.success) {
    return validationError(firstIssue(input));
  }

  return runAction(
    () => renameCatalogEntity(reference, input.data.name, date),
    "Nom mis à jour.",
  );
}

export async function moveCatalogItemAction(
  rawReference: unknown,
  rawExpectedPosition: unknown,
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const reference = parseReference(rawReference);
  const position = expectedPositionSchema.safeParse(rawExpectedPosition);
  const direction = moveDirectionSchema.safeParse(formData.get("direction"));

  if (!reference || !position.success || !direction.success) {
    return validationError("Déplacement invalide. Rechargez la page.");
  }

  return runAction(
    () => moveCatalogEntity(reference, direction.data, position.data),
    "Ordre mis à jour.",
  );
}

export async function archiveCatalogItemAction(
  rawReference: unknown,
  rawExpectedUpdatedAt: unknown,
  _previousState: AdminActionState,
  _formData: FormData,
): Promise<AdminActionState> {
  void _previousState;
  void _formData;
  const reference = parseReference(rawReference);
  const expectedUpdatedAt = expectedUpdatedAtSchema.safeParse(
    rawExpectedUpdatedAt,
  );

  if (!reference || !expectedUpdatedAt.success) {
    return validationError("Référence invalide. Rechargez la page.");
  }

  return runAction(
    () =>
      archiveCatalogEntity(reference, new Date(expectedUpdatedAt.data)),
    "Élément archivé.",
  );
}

export async function changeSequenceStatusAction(
  rawReference: unknown,
  rawExpectedUpdatedAt: unknown,
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const reference = parseReference(rawReference);
  const expectedUpdatedAt = expectedUpdatedAtSchema.safeParse(
    rawExpectedUpdatedAt,
  );
  const status = sequenceStatusSchema.safeParse(formData.get("status"));

  if (
    !reference ||
    reference.type !== "learningSequence" ||
    !expectedUpdatedAt.success ||
    !status.success
  ) {
    return validationError("État invalide. Rechargez la page.");
  }

  return runAction(
    () =>
      setLearningSequenceStatus(
        reference,
        status.data,
        new Date(expectedUpdatedAt.data),
      ),
    "État de la séquence mis à jour.",
  );
}

export async function changeLessonPublicationStatusAction(
  rawReference: unknown,
  rawExpectedUpdatedAt: unknown,
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const reference = parseReference(rawReference);
  const expectedUpdatedAt = expectedUpdatedAtSchema.safeParse(
    rawExpectedUpdatedAt,
  );
  const publicationStatus = publicationStatusSchema.safeParse(
    formData.get("publicationStatus"),
  );

  if (
    !reference ||
    reference.type !== "lesson" ||
    !expectedUpdatedAt.success ||
    !publicationStatus.success
  ) {
    return validationError("État invalide. Rechargez la page.");
  }

  return runAction(
    () =>
      setLessonPublicationStatus(
        reference,
        publicationStatus.data,
        new Date(expectedUpdatedAt.data),
      ),
    "Publication de la séance mise à jour.",
  );
}
