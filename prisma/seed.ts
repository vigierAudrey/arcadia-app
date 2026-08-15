import { TeachingAreaKind } from "../src/generated/prisma/enums";
import { prisma } from "../src/server/db/prisma";

type InitialTeachingArea = {
  name: string;
  kind: TeachingAreaKind;
};

type InitialClassroom = {
  name: string;
  teachingAreas: readonly InitialTeachingArea[];
};

type InitialLevel = {
  name: string;
  classrooms: readonly InitialClassroom[];
};

type InitialProgram = {
  name: string;
  levels: readonly InitialLevel[];
};

// Données d'initialisation uniquement : elles ne sont jamais importées par l'application.
const initialCatalog: readonly InitialProgram[] = [
  {
    name: "CAP",
    levels: [
      {
        name: "Terminale",
        classrooms: [
          {
            name: "T AGAA",
            teachingAreas: [
              { name: "Maths appliquées", kind: TeachingAreaKind.SUBJECT },
              { name: "PSE", kind: TeachingAreaKind.SUBJECT },
              { name: "Bloc 2", kind: TeachingAreaKind.BLOCK },
            ],
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
          { name: "2 AERO", teachingAreas: [] },
          { name: "2 CIEL", teachingAreas: [] },
        ],
      },
      {
        name: "Première",
        classrooms: [
          { name: "1 AERO", teachingAreas: [] },
          { name: "1 TCI", teachingAreas: [] },
        ],
      },
      {
        name: "Terminale",
        classrooms: [
          { name: "T AERO", teachingAreas: [] },
          { name: "T TCI", teachingAreas: [] },
        ],
      },
    ],
  },
];

async function seedCatalog() {
  await prisma.$transaction(async (transaction) => {
    for (const [programIndex, initialProgram] of initialCatalog.entries()) {
      const program = await transaction.program.upsert({
        where: { name: initialProgram.name },
        create: {
          name: initialProgram.name,
          position: programIndex,
        },
        update: {
          position: programIndex,
          archivedAt: null,
        },
        select: { id: true },
      });

      for (const [levelIndex, initialLevel] of initialProgram.levels.entries()) {
        const level = await transaction.level.upsert({
          where: {
            programId_name: {
              programId: program.id,
              name: initialLevel.name,
            },
          },
          create: {
            programId: program.id,
            name: initialLevel.name,
            position: levelIndex,
          },
          update: {
            position: levelIndex,
            archivedAt: null,
          },
          select: { id: true },
        });

        for (const [classroomIndex, initialClassroom] of initialLevel.classrooms.entries()) {
          const classroom = await transaction.classroom.upsert({
            where: {
              levelId_name: {
                levelId: level.id,
                name: initialClassroom.name,
              },
            },
            create: {
              levelId: level.id,
              name: initialClassroom.name,
              position: classroomIndex,
            },
            update: {
              position: classroomIndex,
              archivedAt: null,
            },
            select: { id: true },
          });

          for (const [teachingAreaIndex, initialTeachingArea] of initialClassroom.teachingAreas.entries()) {
            await transaction.teachingArea.upsert({
              where: {
                classroomId_name: {
                  classroomId: classroom.id,
                  name: initialTeachingArea.name,
                },
              },
              create: {
                classroomId: classroom.id,
                name: initialTeachingArea.name,
                kind: initialTeachingArea.kind,
                position: teachingAreaIndex,
              },
              update: {
                kind: initialTeachingArea.kind,
                position: teachingAreaIndex,
                archivedAt: null,
              },
              select: { id: true },
            });
          }
        }
      }
    }
  });
}

seedCatalog()
  .then(async () => {
    console.info("Development catalog seeded.");
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error("Development catalog seed failed.");
    await prisma.$disconnect();
    process.exitCode = 1;

    if (process.env.NODE_ENV === "development") {
      console.error(error instanceof Error ? error.message : "Unknown error");
    }
  });
