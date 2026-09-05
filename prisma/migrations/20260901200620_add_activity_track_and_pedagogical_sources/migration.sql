-- CreateEnum
CREATE TYPE "ActivityTrack" AS ENUM ('CORE', 'BONUS');

-- CreateEnum
CREATE TYPE "PedagogicalSourceType" AS ENUM ('REFERENTIEL', 'PROGRESSION', 'COURS', 'RESSOURCE');

-- CreateEnum
CREATE TYPE "PedagogicalConformityStatus" AS ENUM ('CONFIRME', 'A_VERIFIER');

-- CreateEnum
CREATE TYPE "PedagogicalReviewStatus" AS ENUM ('PROPOSE', 'VALIDE', 'A_REVOIR');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "track" "ActivityTrack" NOT NULL DEFAULT 'CORE';

-- CreateTable
CREATE TABLE "PedagogicalSourceReference" (
    "id" UUID NOT NULL,
    "lessonId" UUID,
    "activityId" UUID,
    "sourceType" "PedagogicalSourceType" NOT NULL,
    "sourceTitle" VARCHAR(200) NOT NULL,
    "relativePath" VARCHAR(500) NOT NULL,
    "sectionOrPage" VARCHAR(200),
    "excerptOrNotion" TEXT,
    "conformity" "PedagogicalConformityStatus" NOT NULL DEFAULT 'A_VERIFIER',
    "reviewStatus" "PedagogicalReviewStatus" NOT NULL DEFAULT 'VALIDE',
    "comment" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "PedagogicalSourceReference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PedagogicalSourceReference_lessonId_idx" ON "PedagogicalSourceReference"("lessonId");

-- CreateIndex
CREATE INDEX "PedagogicalSourceReference_activityId_idx" ON "PedagogicalSourceReference"("activityId");

-- CreateIndex
CREATE INDEX "Activity_lessonId_track_archivedAt_idx" ON "Activity"("lessonId", "track", "archivedAt");

-- AddForeignKey
ALTER TABLE "PedagogicalSourceReference" ADD CONSTRAINT "PedagogicalSourceReference_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedagogicalSourceReference" ADD CONSTRAINT "PedagogicalSourceReference_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
