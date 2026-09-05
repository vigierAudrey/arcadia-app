import { prisma } from "@/server/db/prisma";

import { getTeachingContextForActivity, getTeachingContextForLesson } from "./context";
import { pedagogicalSourceInputSchema } from "./validation";

export class PedagogicalSourceValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PedagogicalSourceValidationError";
  }
}

export type PedagogicalSourceTarget =
  | { lessonId: string; activityId?: undefined }
  | { lessonId?: undefined; activityId: string };

function assertSingleTarget(target: {
  lessonId?: string;
  activityId?: string;
}): asserts target is PedagogicalSourceTarget {
  const hasLesson = Boolean(target.lessonId);
  const hasActivity = Boolean(target.activityId);
  if (hasLesson === hasActivity) {
    throw new PedagogicalSourceValidationError(
      "Une référence pédagogique doit être rattachée à exactement une Lesson ou une Activity.",
    );
  }
}

export type CreatePedagogicalSourceReferenceOptions = {
  /**
   * Optional extra guard: if provided, must match the TARGET's real
   * TeachingArea (resolved server-side, never trusted from the caller) or
   * the write is rejected. The resolved context is always the authority —
   * this option only ever narrows, never replaces, that resolution.
   */
  expectedTeachingAreaId?: string;
};

/**
 * Creates a pedagogical source reference (traceability metadata only — never
 * a copy of the source document's content, never an absolute path).
 *
 * Always resolves the target's real pedagogical context (TeachingArea and
 * everything above it) server-side before writing — via
 * getTeachingContextForLesson/getTeachingContextForActivity — so a source can
 * never be attached to the wrong TeachingArea by construction. This is what
 * keeps PSE, Maths appliquées, Bloc 2 (or any other TeachingArea created
 * later in the admin) from ever being cross-contaminated.
 */
export async function createPedagogicalSourceReference(
  target: { lessonId?: string; activityId?: string },
  rawInput: unknown,
  options: CreatePedagogicalSourceReferenceOptions = {},
) {
  assertSingleTarget(target);

  const context = target.lessonId
    ? await getTeachingContextForLesson(target.lessonId)
    : await getTeachingContextForActivity(target.activityId as string);

  if (!context) {
    throw new PedagogicalSourceValidationError(
      "Impossible de résoudre le contexte pédagogique de la cible (Lesson/Activity introuvable).",
    );
  }

  if (
    options.expectedTeachingAreaId !== undefined &&
    options.expectedTeachingAreaId !== context.teachingAreaId
  ) {
    throw new PedagogicalSourceValidationError(
      `TeachingArea attendu (${options.expectedTeachingAreaId}) différent du TeachingArea réel de la cible (${context.teachingAreaName}).`,
    );
  }

  const parsed = pedagogicalSourceInputSchema.safeParse(rawInput);
  if (!parsed.success) {
    throw new PedagogicalSourceValidationError(
      parsed.error.issues[0]?.message ?? "Référence pédagogique invalide.",
    );
  }

  return prisma.pedagogicalSourceReference.create({
    data: {
      ...parsed.data,
      lessonId: target.lessonId ?? null,
      activityId: target.activityId ?? null,
    },
    select: { id: true },
  });
}

export async function listPedagogicalSourceReferencesForLesson(lessonId: string) {
  return prisma.pedagogicalSourceReference.findMany({
    where: { lessonId },
    orderBy: { createdAt: "asc" },
  });
}

export async function listPedagogicalSourceReferencesForActivity(activityId: string) {
  return prisma.pedagogicalSourceReference.findMany({
    where: { activityId },
    orderBy: { createdAt: "asc" },
  });
}
