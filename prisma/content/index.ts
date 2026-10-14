import { TeachingAreaKind } from "../../src/generated/prisma/enums";

import type { InitialLearningSequence } from "./catalog-types";
import { bloc2TAagaCt3Sequence } from "./bloc2-taaga-ct3";
import { pse1AeroC3Sequence } from "./pse-1aero-c3";
import { pse1AeroC5Sequence } from "./pse-1aero-c5";
import { pse1TciC3Sequence } from "./pse-1tci-c3";
import { pse1TciC5Sequence } from "./pse-1tci-c5";
import { pse2AeroC1Sequence } from "./pse-2aero-c1";
import { pse2AeroC2Sequence } from "./pse-2aero-c2";
import { pse2CielC1Sequence } from "./pse-2ciel-c1";
import { pse2CielC2Sequence } from "./pse-2ciel-c2";
import { pseTAeroA9Sequence } from "./pse-taero-a9";
import { pseTAeroB5Sequence } from "./pse-taero-b5";
import { pseTAeroC7Sequence } from "./pse-taero-c7";
import { pseTAeroC8Sequence } from "./pse-taero-c8";
import { pseTAeroC9Sequence } from "./pse-taero-c9";
import { pseTAeroC10Sequence } from "./pse-taero-c10";
import { pseTAeroC11Sequence } from "./pse-taero-c11";
import { pseTAeroC12Sequence } from "./pse-taero-c12";
import { pseTAagaC1Sequence } from "./pse-taaga-c1";
import { pseTAagaC5Sequence } from "./pse-taaga-c5";
import { pseTTciA9Sequence } from "./pse-ttci-a9";
import { pseTTciB5Sequence } from "./pse-ttci-b5";
import { pseTTciC7Sequence } from "./pse-ttci-c7";
import { pseTTciC8Sequence } from "./pse-ttci-c8";
import { pseTTciC9Sequence } from "./pse-ttci-c9";
import { pseTTciC10Sequence } from "./pse-ttci-c10";
import { pseTTciC11Sequence } from "./pse-ttci-c11";
import { pseTTciC12Sequence } from "./pse-ttci-c12";

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
    level: "Seconde",
    classroom: "2 AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pse2AeroC1Sequence,
  },
  {
    program: "BAC PRO",
    level: "Seconde",
    classroom: "2 AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pse2AeroC2Sequence,
  },
  {
    program: "BAC PRO",
    level: "Seconde",
    classroom: "2 CIEL",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pse2CielC1Sequence,
  },
  {
    program: "BAC PRO",
    level: "Seconde",
    classroom: "2 CIEL",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pse2CielC2Sequence,
  },
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
    level: "Première",
    classroom: "1 AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pse1AeroC5Sequence,
  },
  {
    program: "BAC PRO",
    level: "Première",
    classroom: "1 TCI",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pse1TciC3Sequence,
  },
  {
    program: "BAC PRO",
    level: "Première",
    classroom: "1 TCI",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pse1TciC5Sequence,
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
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTAeroC8Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTTciC7Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTTciC8Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTTciC9Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTAeroC9Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTAeroC10Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTTciC10Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTAeroC11Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTTciC11Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTAeroC12Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTTciC12Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTAeroA9Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTTciA9Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTAeroB5Sequence,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTTciB5Sequence,
  },
  {
    program: "CAP",
    level: "Terminale",
    classroom: "T AAGA",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTAagaC1Sequence,
  },
  {
    program: "CAP",
    level: "Terminale",
    classroom: "T AAGA",
    teachingArea: "PSE",
    teachingAreaKind: TeachingAreaKind.SUBJECT,
    sequence: pseTAagaC5Sequence,
  },
  {
    program: "CAP",
    level: "Terminale",
    classroom: "T AAGA",
    teachingArea: "Bloc 2",
    teachingAreaKind: TeachingAreaKind.BLOCK,
    sequence: bloc2TAagaCt3Sequence,
  },
];
