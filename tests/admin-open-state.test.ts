import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";

import { getOpenItems, getToggleHref } from "../src/features/admin/open-state";

test("admin open state accepts only bounded UUID query values", () => {
  const validIds = Array.from({ length: 130 }, () => randomUUID());
  const openItems = getOpenItems({
    open: [
      validIds[0],
      "not-a-valid-id",
      "<script>alert(1)</script>",
      ...validIds.slice(1),
    ],
  });

  assert.equal(openItems.size, 120);
  assert.equal(openItems.has(validIds[0]), true);
  assert.equal(openItems.has(validIds[119]), true);
  assert.equal(openItems.has(validIds[120]), false);
  assert.equal(openItems.has("not-a-valid-id"), false);
});

test("admin open state builds toggle links without local persistence", () => {
  const programId = randomUUID();
  const levelId = randomUUID();
  const closedHref = getToggleHref(new Set([programId]), levelId);

  assert.equal(
    closedHref,
    `/admin?open=${programId}&open=${levelId}#node-${levelId}`,
  );

  const openedHref = getToggleHref(new Set([programId, levelId]), levelId);
  assert.equal(openedHref, `/admin?open=${programId}#node-${levelId}`);
});
