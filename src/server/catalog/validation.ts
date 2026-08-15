import { z } from "zod";

import {
  PublicationStatus,
  SequenceStatus,
  TeachingAreaKind,
} from "@/generated/prisma/enums";

const requiredLabel = (label: string, maximum: number) =>
  z
    .string({ error: `${label} invalide.` })
    .trim()
    .min(1, `${label} requis.`)
    .max(maximum, `${label} trop long (${maximum} caractères maximum).`);

export const uuidSchema = z.uuid("Identifiant invalide.");
export const expectedPositionSchema = z.coerce
  .number()
  .int("Position invalide.")
  .min(0, "Position invalide.")
  .max(10_000, "Position invalide.");
export const expectedUpdatedAtSchema = z.iso.datetime({ offset: true });

export const programInputSchema = z.object({
  name: requiredLabel("Nom", 100),
});

export const levelInputSchema = z.object({
  name: requiredLabel("Nom", 100),
});

export const classroomInputSchema = z.object({
  name: requiredLabel("Nom", 100),
});

export const teachingAreaInputSchema = z.object({
  name: requiredLabel("Nom", 120),
  kind: z.enum(TeachingAreaKind, { error: "Type d’enseignement invalide." }),
});

export const sequenceInputSchema = z.object({
  title: requiredLabel("Titre", 160),
  description: z
    .string({ error: "Description invalide." })
    .trim()
    .max(2_000, "Description trop longue (2 000 caractères maximum).")
    .transform((value) => value || null),
});

export const lessonInputSchema = sequenceInputSchema;

export const sequenceStatusSchema = z.enum(SequenceStatus, {
  error: "État de séquence invalide.",
});

export const publicationStatusSchema = z.enum(PublicationStatus, {
  error: "État de publication invalide.",
});

export const moveDirectionSchema = z.enum(["UP", "DOWN"], {
  error: "Déplacement invalide.",
});

export const entityReferenceSchemas = {
  program: z.object({
    id: uuidSchema,
  }),
  level: z.object({
    id: uuidSchema,
    parentId: uuidSchema,
  }),
  classroom: z.object({
    id: uuidSchema,
    parentId: uuidSchema,
  }),
  teachingArea: z.object({
    id: uuidSchema,
    parentId: uuidSchema,
  }),
  learningSequence: z.object({
    id: uuidSchema,
    parentId: uuidSchema,
  }),
  lesson: z.object({
    id: uuidSchema,
    parentId: uuidSchema,
  }),
} as const;

export type CatalogEntityType = keyof typeof entityReferenceSchemas;

export type CatalogEntityReference =
  | { type: "program"; id: string }
  | { type: "level"; id: string; parentId: string }
  | { type: "classroom"; id: string; parentId: string }
  | { type: "teachingArea"; id: string; parentId: string }
  | { type: "learningSequence"; id: string; parentId: string }
  | { type: "lesson"; id: string; parentId: string };
