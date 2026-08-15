/**
 * Données strictement temporaires pour valider la hiérarchie de l'interface.
 * Elles seront remplacées par les données administrables de PostgreSQL.
 */
export type DemoClassroom = {
  name: string;
  teachings: readonly string[];
};

export type DemoLevel = {
  name: string;
  classrooms: readonly DemoClassroom[];
};

export type DemoProgram = {
  name: string;
  levels: readonly DemoLevel[];
};

export const DEMO_CATALOG: readonly DemoProgram[] = [
  {
    name: "CAP",
    levels: [
      {
        name: "Terminale",
        classrooms: [
          {
            name: "T AGAA",
            teachings: ["Maths appliquées", "PSE", "Bloc 2"],
          },
        ],
      },
    ],
  },
  {
    name: "BAC PRO",
    levels: [
      {
        name: "Seconde",
        classrooms: [
          { name: "2 AERO", teachings: [] },
          { name: "2 CIEL", teachings: [] },
        ],
      },
      {
        name: "Première",
        classrooms: [
          { name: "1 AERO", teachings: [] },
          { name: "1 TCI", teachings: [] },
        ],
      },
      {
        name: "Terminale",
        classrooms: [
          { name: "T AERO", teachings: [] },
          { name: "T TCI", teachings: [] },
        ],
      },
    ],
  },
];
