-- Active siblings must have a single, deterministic position.
-- Archived rows are intentionally excluded so their historical position does not
-- block the active catalog from being compacted.
CREATE UNIQUE INDEX "Program_active_position_key"
  ON "Program" ("position")
  WHERE "archivedAt" IS NULL;

CREATE UNIQUE INDEX "Level_active_program_position_key"
  ON "Level" ("programId", "position")
  WHERE "archivedAt" IS NULL;

CREATE UNIQUE INDEX "Classroom_active_level_position_key"
  ON "Classroom" ("levelId", "position")
  WHERE "archivedAt" IS NULL;

CREATE UNIQUE INDEX "TeachingArea_active_classroom_position_key"
  ON "TeachingArea" ("classroomId", "position")
  WHERE "archivedAt" IS NULL;

CREATE UNIQUE INDEX "LearningSequence_active_teaching_area_position_key"
  ON "LearningSequence" ("teachingAreaId", "position")
  WHERE "archivedAt" IS NULL;
