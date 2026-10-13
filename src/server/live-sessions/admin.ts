import { prisma } from "@/server/db/prisma";

import {
  createLiveSession,
  endLiveSession,
  listLiveSessionsForClassroom,
} from "./store";

export async function assertAdminCanManageLiveSession(classroomId: string) {
  const classroom = await prisma.classroom.findUnique({
    where: { id: classroomId },
    select: {
      id: true,
      archivedAt: true,
      classAccessCode: { select: { active: true } },
    },
  });

  if (!classroom || classroom.archivedAt) {
    throw new Error("LIVE_CLASSROOM_NOT_FOUND");
  }

  return {
    classroomId: classroom.id,
    hasActiveClassAccess: classroom.classAccessCode?.active === true,
  };
}

export async function startAdminLiveSession(classroomId: string) {
  await assertAdminCanManageLiveSession(classroomId);
  return createLiveSession(classroomId);
}

export async function stopAdminLiveSession(
  classroomId: string,
  sessionId: string,
) {
  await assertAdminCanManageLiveSession(classroomId);
  return endLiveSession(sessionId, classroomId);
}

export function getAdminLiveSessionsForClassroom(classroomId: string) {
  return listLiveSessionsForClassroom(classroomId);
}
