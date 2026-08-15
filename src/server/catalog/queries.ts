import { prisma } from "@/server/db/prisma";

const ADMIN_CATALOG_LIMITS = {
  programs: 20,
  levelsPerProgram: 20,
  classroomsPerLevel: 50,
  teachingAreasPerClassroom: 50,
  sequencesPerTeachingArea: 100,
  lessonsPerSequence: 100,
} as const;

export async function getAdminCatalog() {
  return prisma.program.findMany({
    where: { archivedAt: null },
    orderBy: [{ position: "asc" }, { name: "asc" }],
    take: ADMIN_CATALOG_LIMITS.programs,
    select: {
      id: true,
      name: true,
      position: true,
      updatedAt: true,
      levels: {
        where: { archivedAt: null },
        orderBy: [{ position: "asc" }, { name: "asc" }],
        take: ADMIN_CATALOG_LIMITS.levelsPerProgram,
        select: {
          id: true,
          name: true,
          position: true,
          updatedAt: true,
          classrooms: {
            where: { archivedAt: null },
            orderBy: [{ position: "asc" }, { name: "asc" }],
            take: ADMIN_CATALOG_LIMITS.classroomsPerLevel,
            select: {
              id: true,
              name: true,
              position: true,
              updatedAt: true,
              teachingAreas: {
                where: { archivedAt: null },
                orderBy: [{ position: "asc" }, { name: "asc" }],
                take: ADMIN_CATALOG_LIMITS.teachingAreasPerClassroom,
                select: {
                  id: true,
                  name: true,
                  kind: true,
                  position: true,
                  updatedAt: true,
                  learningSequences: {
                    where: { archivedAt: null },
                    orderBy: [{ position: "asc" }, { title: "asc" }],
                    take: ADMIN_CATALOG_LIMITS.sequencesPerTeachingArea,
                    select: {
                      id: true,
                      title: true,
                      description: true,
                      position: true,
                      status: true,
                      updatedAt: true,
                      lessons: {
                        where: { archivedAt: null },
                        orderBy: [{ position: "asc" }, { title: "asc" }],
                        take: ADMIN_CATALOG_LIMITS.lessonsPerSequence,
                        select: {
                          id: true,
                          title: true,
                          description: true,
                          position: true,
                          publicationStatus: true,
                          updatedAt: true,
                          _count: {
                            select: {
                              activities: {
                                where: { archivedAt: null },
                              },
                            },
                          },
                        },
                      },
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

export type AdminCatalog = Awaited<ReturnType<typeof getAdminCatalog>>;
