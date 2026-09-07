import { TeachingAreaKind } from "../../src/generated/prisma/enums";

import type { InitialLearningSequence } from "./catalog-types";
import { pse1AeroC3Sequence } from "./pse-1aero-c3";
import { pseTAeroC7Sequence } from "./pse-taero-c7";
import { pseTAgaaC1Sequence } from "./pse-tagaa-c1";

/**
 * Où se placer dans le catalogue : les quatre noms doivent correspondre
 * EXACTEMENT à ceux visibles dans /admin. Le programme, le niveau et la classe
 * doivent déjà exister ; l'enseignement est créé s'il manque.
 */
export type ContentImport = {
  program: string;
  level: string;
  classroom: string;
  teachingArea: string;
  teachingAreaKind: TeachingAreaKind;
  sequence: InitialLearningSequence;
};

/**
 * Liste des séquences publiées sur le site en ligne.
 *
 * C'est le seul endroit à compléter pour mettre une nouvelle séquence en ligne :
 * un fichier de contenu dans ce dossier, puis une entrée ici. L'import
 * (`pnpm pse:import`) n'ajoute que ce qui manque et ne modifie jamais
 * l'existant — voir scripts/import-contenus.ts.
 */
export const contentImports: readonly ContentImport[] = [
  {
    program: "BAC PRO",
    level: "Première",
    classroom: "1 AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pse1AeroC3Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTAeroC7Sequence,
  },
  {
    program: "CAP",
    level: "Terminale",
    classroom: "T AGAA",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTAgaaC1Sequence,
  },
];
