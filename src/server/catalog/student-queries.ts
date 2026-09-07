import { PublicationStatus, SequenceStatus } from "@/generated/prisma/enums";
import { prisma } from "@/server/db/prisma";

const STUDENT_CATALOG_LIMITS = {
  teachingAreas: 50,
  sequencesPerTeachingArea: 100,
  lessonsPerSequence: 100,
  activitiesPerLesson: 50,
} as const;

/**
 * classroomId must come only from the caller's server-side session
 * (requireClassSessionPage), never from a route or query parameter —
 * this is the only authorization boundary for student reads.
 */
export async function getStudentCatalog(classroomId: string) {
  return prisma.classroom.findFirst({
    where: { id: classroomId, archivedAt: null },
    select: {
      id: true,
      name: true,
      teachingAreas: {
        where: { archivedAt: null },
        orderBy: [{ position: "asc" }, { name: "asc" }],
        take: STUDENT_CATALOG_LIMITS.teachingAreas,
        select: {
          id: true,
          name: true,
          kind: true,
          position: true,
          learningSequences: {
            where: { archivedAt: null, status: SequenceStatus.OPEN },
            orderBy: [{ position: "asc" }, { title: "asc" }],
            take: STUDENT_CATALOG_LIMITS.sequencesPerTeachingArea,
            select: {
              id: true,
              title: true,
              description: true,
              position: true,
              lessons: {
                where: {
                  archivedAt: null,
                  publicationStatus: PublicationStatus.PUBLISHED,
                },
                orderBy: [{ position: "asc" }, { title: "asc" }],
                take: STUDENT_CATALOG_LIMITS.lessonsPerSequence,
                select: {
                  id: true,
                  title: true,
                  description: true,
                  position: true,
                  activities: {
                    where: {
                      archivedAt: null,
                      publicationStatus: PublicationStatus.PUBLISHED,
                    },
                    orderBy: [{ position: "asc" }, { title: "asc" }],
                    take: STUDENT_CATALOG_LIMITS.activitiesPerLesson,
                    select: {
                      id: true,
                      title: true,
                      type: true,
                      instructions: true,
                      payload: true,
                      position: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

export type StudentCatalog = Awaited<ReturnType<typeof getStudentCatalog>>;
