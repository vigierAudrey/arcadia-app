-- CreateEnum
CREATE TYPE "TeachingAreaKind" AS ENUM ('SUBJECT', 'BLOCK');

-- CreateEnum
CREATE TYPE "SequenceStatus" AS ENUM ('DRAFT', 'LOCKED', 'OPEN');

-- CreateEnum
CREATE TYPE "ActivityPublicationStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "Program" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "archivedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" UUID NOT NULL,
    "programId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "archivedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" UUID NOT NULL,
    "levelId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "archivedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeachingArea" (
    "id" UUID NOT NULL,
    "classroomId" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "kind" "TeachingAreaKind" NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "archivedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "TeachingArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningSequence" (
    "id" UUID NOT NULL,
    "teachingAreaId" UUID NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "description" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "status" "SequenceStatus" NOT NULL DEFAULT 'DRAFT',
    "archivedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "LearningSequence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" UUID NOT NULL,
    "learningSequenceId" UUID NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "instructions" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "payloadSchemaVersion" INTEGER NOT NULL DEFAULT 1,
    "position" INTEGER NOT NULL DEFAULT 0,
    "publicationStatus" "ActivityPublicationStatus" NOT NULL DEFAULT 'DRAFT',
    "archivedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Program_name_key" ON "Program"("name");

-- CreateIndex
CREATE INDEX "Program_archivedAt_position_idx" ON "Program"("archivedAt", "position");

-- CreateIndex
CREATE INDEX "Level_programId_archivedAt_position_idx" ON "Level"("programId", "archivedAt", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Level_programId_name_key" ON "Level"("programId", "name");

-- CreateIndex
CREATE INDEX "Classroom_levelId_archivedAt_position_idx" ON "Classroom"("levelId", "archivedAt", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_levelId_name_key" ON "Classroom"("levelId", "name");

-- CreateIndex
CREATE INDEX "TeachingArea_classroomId_archivedAt_position_idx" ON "TeachingArea"("classroomId", "archivedAt", "position");

-- CreateIndex
CREATE UNIQUE INDEX "TeachingArea_classroomId_name_key" ON "TeachingArea"("classroomId", "name");

-- CreateIndex
CREATE INDEX "LearningSequence_teachingAreaId_archivedAt_position_idx" ON "LearningSequence"("teachingAreaId", "archivedAt", "position");

-- CreateIndex
CREATE INDEX "LearningSequence_teachingAreaId_status_archivedAt_idx" ON "LearningSequence"("teachingAreaId", "status", "archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "LearningSequence_teachingAreaId_title_key" ON "LearningSequence"("teachingAreaId", "title");

-- CreateIndex
CREATE INDEX "Activity_learningSequenceId_archivedAt_position_idx" ON "Activity"("learningSequenceId", "archivedAt", "position");

-- CreateIndex
CREATE INDEX "Activity_learningSequenceId_publicationStatus_archivedAt_idx" ON "Activity"("learningSequenceId", "publicationStatus", "archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_learningSequenceId_title_key" ON "Activity"("learningSequenceId", "title");

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingArea" ADD CONSTRAINT "TeachingArea_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningSequence" ADD CONSTRAINT "LearningSequence_teachingAreaId_fkey" FOREIGN KEY ("teachingAreaId") REFERENCES "TeachingArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_learningSequenceId_fkey" FOREIGN KEY ("learningSequenceId") REFERENCES "LearningSequence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
