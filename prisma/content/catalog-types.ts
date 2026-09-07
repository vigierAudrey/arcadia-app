import type { TeachingAreaKind } from "../../src/generated/prisma/enums";

// Types partagés par le seed de développement (prisma/seed.ts) et les scripts
// d'import ciblés (scripts/import-*.ts). Aucune donnée ici : uniquement la forme.

export type InitialTeachingArea = {
  name: string;
  kind: TeachingAreaKind;
  learningSequences?: readonly InitialLearningSequence[];
};

export type InitialLearningSequence = {
  title: string;
  description: string;
  lessons: readonly InitialLesson[];
};

export type InitialLesson = {
  title: string;
  description?: string;
  activities?: readonly InitialActivity[];
};

export type InitialJsonValue =
  | string
  | number
  | boolean
  | null
  | InitialJsonObject
  | InitialJsonValue[];

export type InitialJsonObject = { [key: string]: InitialJsonValue };

export type InitialActivity = {
  title: string;
  type: "content" | "qcm" | "true_false" | "sorting" | "matching";
  instructions: string;
  payload: InitialJsonObject;
};

export type InitialClassroom = {
  name: string;
  teachingAreas: readonly InitialTeachingArea[];
};

export type InitialLevel = {
  name: string;
  classrooms: readonly InitialClassroom[];
};

export type InitialProgram = {
  name: string;
  levels: readonly InitialLevel[];
};
