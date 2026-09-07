import {
  ActivityTrack,
  PublicationStatus,
  SequenceStatus,
  TeachingAreaKind,
} from "../src/generated/prisma/enums";
import { prisma } from "../src/server/db/prisma";
import type { InitialProgram } from "./content/catalog-types";
import { pse1AeroC3Sequence } from "./content/pse-1aero-c3";
import { pseTAgaaC1Sequence } from "./content/pse-tagaa-c1";
import { pseTAeroC7Sequence } from "./content/pse-taero-c7";

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
              {
                name: "PSE",
                kind: TeachingAreaKind.SUBJECT,
                learningSequences: [
                  pseTAgaaC1Sequence,
                ],
              },
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
          {
            name: "1 AERO",
            teachingAreas: [
              {
                name: "PSE",
                kind: TeachingAreaKind.SUBJECT,
                learningSequences: [
                  pse1AeroC3Sequence,
                ],
              },
            ],
          },
          { name: "1 TCI", teachingAreas: [] },
        ],
      },
      {
        name: "Terminale",
        classrooms: [
          {
            name: "T AERO",
            teachingAreas: [
              {
                name: "PSE",
                kind: TeachingAreaKind.SUBJECT,
                learningSequences: [
                  pseTAeroC7Sequence,
                ],
              },
            ],
          },
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
            const teachingArea = await transaction.teachingArea.upsert({
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

            for (const [sequenceIndex, initialSequence] of (
              initialTeachingArea.learningSequences ?? []
            ).entries()) {
              const sequence = await transaction.learningSequence.upsert({
                where: {
                  teachingAreaId_title: {
                    teachingAreaId: teachingArea.id,
                    title: initialSequence.title,
                  },
                },
                create: {
                  teachingAreaId: teachingArea.id,
                  title: initialSequence.title,
                  description: initialSequence.description,
                  position: sequenceIndex,
                  status: SequenceStatus.OPEN,
                },
                update: {
                  description: initialSequence.description,
                  position: sequenceIndex,
                  status: SequenceStatus.OPEN,
                  archivedAt: null,
                },
                select: { id: true },
              });

              for (const [lessonIndex, initialLesson] of initialSequence.lessons.entries()) {
                const lesson = await transaction.lesson.upsert({
                  where: {
                    sequenceId_title: {
                      sequenceId: sequence.id,
                      title: initialLesson.title,
                    },
                  },
                  create: {
                    sequenceId: sequence.id,
                    title: initialLesson.title,
                    description: initialLesson.description,
                    position: lessonIndex,
                    publicationStatus: PublicationStatus.PUBLISHED,
                  },
                  update: {
                    description: initialLesson.description,
                    position: lessonIndex,
                    publicationStatus: PublicationStatus.PUBLISHED,
                    archivedAt: null,
                  },
                  select: { id: true },
                });

                for (const [activityIndex, initialActivity] of (
                  initialLesson.activities ?? []
                ).entries()) {
                  await transaction.activity.upsert({
                    where: {
                      lessonId_title: {
                        lessonId: lesson.id,
                        title: initialActivity.title,
                      },
                    },
                    create: {
                      lessonId: lesson.id,
                      title: initialActivity.title,
                      type: initialActivity.type,
                      instructions: initialActivity.instructions,
                      payload: initialActivity.payload,
                      track: ActivityTrack.CORE,
                      position: activityIndex,
                      publicationStatus: PublicationStatus.PUBLISHED,
                    },
                    update: {
                      type: initialActivity.type,
                      instructions: initialActivity.instructions,
                      payload: initialActivity.payload,
                      track: ActivityTrack.CORE,
                      position: activityIndex,
                      publicationStatus: PublicationStatus.PUBLISHED,
                      archivedAt: null,
                    },
                    select: { id: true },
                  });
                }
              }
            }
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
