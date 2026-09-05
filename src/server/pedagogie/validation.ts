import { z } from "zod";

import {
  PedagogicalConformityStatus,
  PedagogicalReviewStatus,
  PedagogicalSourceType,
} from "@/generated/prisma/enums";

// Windows absolute paths: drive letter ("C:\..." / "C:/...") or UNC ("\\server\share\...").
const windowsAbsolutePathPattern = /^[A-Za-z]:[\\/]|^\\\\/;
// Unix/WSL absolute paths: leading "/" (this also rejects "/mnt/c/...").
const unixAbsolutePathPattern = /^\//;

export const relativePathSchema = z
  .string()
  .trim()
  .min(1, "Référence relative requise.")
  .max(500, "Référence relative trop longue (500 caractères maximum).")
  .refine((value) => !windowsAbsolutePathPattern.test(value), {
    message:
      "Chemin absolu Windows refusé — utilisez un chemin relatif à cours-source/.",
  })
  .refine((value) => !unixAbsolutePathPattern.test(value), {
    message:
      "Chemin absolu WSL/Linux refusé — utilisez un chemin relatif à cours-source/.",
  });

export const pedagogicalSourceInputSchema = z.object({
  sourceType: z.enum(PedagogicalSourceType, { error: "Type de source invalide." }),
  sourceTitle: z
    .string()
    .trim()
    .min(1, "Titre de la source requis.")
    .max(200, "Titre de la source trop long (200 caractères maximum)."),
  relativePath: relativePathSchema,
  sectionOrPage: z
    .string()
    .trim()
    .max(200, "Section/page trop longue (200 caractères maximum).")
    .optional(),
  excerptOrNotion: z
    .string()
    .trim()
    .max(2_000, "Extrait/notion trop long (2 000 caractères maximum).")
    .optional(),
  conformity: z
    .enum(PedagogicalConformityStatus, { error: "État de conformité invalide." })
    .default(PedagogicalConformityStatus.A_VERIFIER),
  reviewStatus: z
    .enum(PedagogicalReviewStatus, { error: "État de mapping invalide." })
    .default(PedagogicalReviewStatus.VALIDE),
  comment: z
    .string()
    .trim()
    .max(2_000, "Commentaire trop long (2 000 caractères maximum).")
    .optional(),
});

export type PedagogicalSourceInput = z.infer<typeof pedagogicalSourceInputSchema>;
