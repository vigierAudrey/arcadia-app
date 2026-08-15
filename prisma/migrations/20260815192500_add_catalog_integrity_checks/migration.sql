-- Ordering is always zero-based or positive.
ALTER TABLE "Program"
  ADD CONSTRAINT "Program_position_nonnegative" CHECK ("position" >= 0);
ALTER TABLE "Level"
  ADD CONSTRAINT "Level_position_nonnegative" CHECK ("position" >= 0);
ALTER TABLE "Classroom"
  ADD CONSTRAINT "Classroom_position_nonnegative" CHECK ("position" >= 0);
ALTER TABLE "TeachingArea"
  ADD CONSTRAINT "TeachingArea_position_nonnegative" CHECK ("position" >= 0);
ALTER TABLE "LearningSequence"
  ADD CONSTRAINT "LearningSequence_position_nonnegative" CHECK ("position" >= 0);
ALTER TABLE "Activity"
  ADD CONSTRAINT "Activity_position_nonnegative" CHECK ("position" >= 0),
  ADD CONSTRAINT "Activity_payloadSchemaVersion_positive" CHECK ("payloadSchemaVersion" > 0),
  ADD CONSTRAINT "Activity_payload_object" CHECK (jsonb_typeof("payload") = 'object');

-- Core labels must carry meaningful text even if data is inserted outside Prisma.
ALTER TABLE "Program"
  ADD CONSTRAINT "Program_name_not_blank" CHECK (length(btrim("name")) > 0);
ALTER TABLE "Level"
  ADD CONSTRAINT "Level_name_not_blank" CHECK (length(btrim("name")) > 0);
ALTER TABLE "Classroom"
  ADD CONSTRAINT "Classroom_name_not_blank" CHECK (length(btrim("name")) > 0);
ALTER TABLE "TeachingArea"
  ADD CONSTRAINT "TeachingArea_name_not_blank" CHECK (length(btrim("name")) > 0);
ALTER TABLE "LearningSequence"
  ADD CONSTRAINT "LearningSequence_title_not_blank" CHECK (length(btrim("title")) > 0);
ALTER TABLE "Activity"
  ADD CONSTRAINT "Activity_title_not_blank" CHECK (length(btrim("title")) > 0),
  ADD CONSTRAINT "Activity_type_not_blank" CHECK (length(btrim("type")) > 0),
  ADD CONSTRAINT "Activity_instructions_not_blank" CHECK (length(btrim("instructions")) > 0);
