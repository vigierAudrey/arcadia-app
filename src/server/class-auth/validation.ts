import { z } from "zod";

import { CLASS_CODE_ALPHABET, CLASS_CODE_LENGTH } from "./code";

export function normalizeClassCode(raw: string) {
  return raw.trim().toUpperCase().replace(/[\s-]+/g, "");
}

const classCodeShapeSchema = z
  .string()
  .regex(new RegExp(`^[${CLASS_CODE_ALPHABET}]{${CLASS_CODE_LENGTH}}$`));

export const classCodeSchema = z
  .string()
  .transform(normalizeClassCode)
  .pipe(classCodeShapeSchema);
