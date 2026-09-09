import assert from "node:assert/strict";
import test from "node:test";

import { contentImports } from "../prisma/content/index";
import { parseActivityPayload } from "../src/features/activities/activity-payload";

test("all published content imports have valid activity payloads", () => {
  let activityCount = 0;

  for (const entry of contentImports) {
    assert.ok(entry.program.trim());
    assert.ok(entry.level.trim());
    assert.ok(entry.classroom.trim());
    assert.ok(entry.teachingArea.trim());
    assert.ok(entry.sequence.title.trim());
    assert.ok(entry.sequence.description.trim());

    for (const lesson of entry.sequence.lessons) {
      assert.ok(lesson.title.trim());

      for (const activity of lesson.activities ?? []) {
        activityCount += 1;
        assert.ok(activity.title.trim());
        assert.ok(activity.instructions.trim());
        parseActivityPayload(activity.type, activity.payload);
      }
    }
  }

  assert.ok(activityCount > 0);
});
