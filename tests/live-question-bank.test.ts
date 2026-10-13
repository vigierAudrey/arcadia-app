import assert from "node:assert/strict";
import { test } from "node:test";

import { LIVE_QUESTION_BANK } from "@/features/live/question-bank";

test("live question bank is small, typed and traceable", () => {
  assert.ok(LIVE_QUESTION_BANK.length >= 20);

  const ids = new Set<string>();
  for (const question of LIVE_QUESTION_BANK) {
    assert.equal(ids.has(question.id), false, `duplicate id ${question.id}`);
    ids.add(question.id);

    assert.equal(question.contextMode, "general-pse");
    assert.equal(question.track, "CORE");
    assert.equal(question.reference.teachingArea, "PSE");
    assert.equal(question.reference.conformity, "CONFIRME");
    assert.match(question.reference.relativePath, /^(BACPRO|CAP)\//);
    assert.equal(question.choices.length >= 2, true);
    assert.equal(question.correctChoiceIndex >= 0, true);
    assert.equal(question.correctChoiceIndex < question.choices.length, true);
    assert.equal(question.timeLimitSeconds >= 15, true);
    assert.equal(question.points > 0, true);
  }
});

test("live question bank covers Bac Pro and CAP PSE", () => {
  const formations = new Set(
    LIVE_QUESTION_BANK.map((question) => question.reference.formation),
  );
  assert.equal(formations.has("Bac Pro"), true);
  assert.equal(formations.has("CAP"), true);

  const capLevels = new Set(
    LIVE_QUESTION_BANK
      .filter((question) => question.reference.formation === "CAP")
      .map((question) => question.reference.level),
  );
  assert.equal(capLevels.has("CAP première année"), true);
  assert.equal(capLevels.has("CAP terminale"), true);
});

test("true-false live questions use stable Vrai/Faux choices", () => {
  for (const question of LIVE_QUESTION_BANK) {
    if (question.type !== "true-false") continue;
    assert.deepEqual(question.choices, ["Vrai", "Faux"]);
  }
});
