-- A shared publication state is sufficient for both lessons and activities.
ALTER TYPE "ActivityPublicationStatus" RENAME TO "PublicationStatus";

CREATE TABLE "Lesson" (
    "id" UUID NOT NULL,
    "sequenceId" UUID NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "description" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "publicationStatus" "PublicationStatus" NOT NULL DEFAULT 'DRAFT',
    "archivedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Lesson_position_nonnegative" CHECK ("position" >= 0),
    CONSTRAINT "Lesson_title_not_blank" CHECK (length(btrim("title")) > 0)
);

CREATE UNIQUE INDEX "Lesson_sequenceId_title_key"
  ON "Lesson"("sequenceId", "title");
CREATE INDEX "Lesson_sequenceId_archivedAt_position_idx"
  ON "Lesson"("sequenceId", "archivedAt", "position");
CREATE INDEX "Lesson_sequenceId_publicationStatus_archivedAt_idx"
  ON "Lesson"("sequenceId", "publicationStatus", "archivedAt");
CREATE UNIQUE INDEX "Lesson_active_sequence_position_key"
  ON "Lesson"("sequenceId", "position")
  WHERE "archivedAt" IS NULL;

ALTER TABLE "Lesson"
  ADD CONSTRAINT "Lesson_sequenceId_fkey"
  FOREIGN KEY ("sequenceId") REFERENCES "LearningSequence"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- Preserve any pre-existing activity by creating one draft lesson per affected
-- sequence before replacing the direct Activity -> LearningSequence relation.
INSERT INTO "Lesson" (
  "id",
  "sequenceId",
  "title",
  "position",
  "publicationStatus",
  "createdAt",
  "updatedAt"
)
SELECT
  (
    substr(md5(sequence_with_activity."id"::text || ':lesson'), 1, 8) || '-' ||
    substr(md5(sequence_with_activity."id"::text || ':lesson'), 9, 4) || '-' ||
    substr(md5(sequence_with_activity."id"::text || ':lesson'), 13, 4) || '-' ||
    substr(md5(sequence_with_activity."id"::text || ':lesson'), 17, 4) || '-' ||
    substr(md5(sequence_with_activity."id"::text || ':lesson'), 21, 12)
  )::uuid,
  sequence_with_activity."id",
  'Séance importée',
  0,
  'DRAFT',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "LearningSequence" AS sequence_with_activity
WHERE EXISTS (
  SELECT 1
  FROM "Activity"
  WHERE "Activity"."learningSequenceId" = sequence_with_activity."id"
);

ALTER TABLE "Activity" ADD COLUMN "lessonId" UUID;

UPDATE "Activity"
SET "lessonId" = "Lesson"."id"
FROM "Lesson"
WHERE "Lesson"."sequenceId" = "Activity"."learningSequenceId";

ALTER TABLE "Activity" ALTER COLUMN "lessonId" SET NOT NULL;

ALTER TABLE "Activity" DROP CONSTRAINT "Activity_learningSequenceId_fkey";
DROP INDEX "Activity_learningSequenceId_archivedAt_position_idx";
DROP INDEX "Activity_learningSequenceId_publicationStatus_archivedAt_idx";
DROP INDEX "Activity_learningSequenceId_title_key";
ALTER TABLE "Activity" DROP COLUMN "learningSequenceId";

CREATE UNIQUE INDEX "Activity_lessonId_title_key"
  ON "Activity"("lessonId", "title");
CREATE INDEX "Activity_lessonId_archivedAt_position_idx"
  ON "Activity"("lessonId", "archivedAt", "position");
CREATE INDEX "Activity_lessonId_publicationStatus_archivedAt_idx"
  ON "Activity"("lessonId", "publicationStatus", "archivedAt");

ALTER TABLE "Activity"
  ADD CONSTRAINT "Activity_lessonId_fkey"
  FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
