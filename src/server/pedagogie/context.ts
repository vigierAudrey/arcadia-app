import type { TeachingAreaKind } from "@/generated/prisma/enums";
import { prisma } from "@/server/db/prisma";

/**
 * Full pedagogical context of a Lesson (and, when resolved for an Activity,
 * that Activity too). This is the single authority for "which TeachingArea
 * does this belong to" — never infer it from a name, a file path, or an
 * assumption. Any code that associates a source, or that will later generate
 * pedagogical content, must resolve this first.
 */
export type TeachingContext = {
  programId: string;
  programName: string;
  levelId: string;
  levelName: string;
  classroomId: string;
  classroomName: string;
  teachingAreaId: string;
  teachingAreaName: string;
  teachingAreaKind: TeachingAreaKind;
  sequenceId: string;
  sequenceTitle: string;
  lessonId: string;
  lessonTitle: string;
  activityId?: string;
  activityTitle?: string;
};

export async function getTeachingContextForLesson(
  lessonId: string,
): Promise<TeachingContext | null> {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: {
      id: true,
      title: true,
      sequence: {
        select: {
          id: true,
          title: true,
          teachingArea: {
            select: {
              id: true,
              name: true,
              kind: true,
              classroom: {
                select: {
                  id: true,
                  name: true,
                  level: {
                    select: {
                      id: true,
                      name: true,
                      program: { select: { id: true, name: true } },
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

  if (!lesson) return null;

  const { teachingArea } = lesson.sequence;
  const { classroom } = teachingArea;
  const { level } = classroom;
  const { program } = level;

  return {
    programId: program.id,
    programName: program.name,
    levelId: level.id,
    levelName: level.name,
    classroomId: classroom.id,
    classroomName: classroom.name,
    teachingAreaId: teachingArea.id,
    teachingAreaName: teachingArea.name,
    teachingAreaKind: teachingArea.kind,
    sequenceId: lesson.sequence.id,
    sequenceTitle: lesson.sequence.title,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
  };
}

export async function getTeachingContextForActivity(
  activityId: string,
): Promise<TeachingContext | null> {
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    select: { id: true, title: true, lessonId: true },
  });
  if (!activity) return null;

  const lessonContext = await getTeachingContextForLesson(activity.lessonId);
  if (!lessonContext) return null;

  return {
    ...lessonContext,
    activityId: activity.id,
    activityTitle: activity.title,
  };
}
