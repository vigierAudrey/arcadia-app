import assert from "node:assert/strict";
import { test } from "node:test";

import { LIVE_QUESTION_BANK, getLiveQuestion, getLiveQuestionModules, selectLiveQuestionModule } from "@/features/live/question-bank";

test("live question bank is typed and traceable", () => {
  assert.ok(LIVE_QUESTION_BANK.length >= 20);

  const ids = new Set<string>();
  for (const question of LIVE_QUESTION_BANK) {
    assert.equal(ids.has(question.id), false, `duplicate id ${question.id}`);
    ids.add(question.id);

    assert.equal(question.track, "CORE");
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

test("live question bank includes the CAP AAGA Bloc 2 sequence 1 quizzes", () => {
  const questions = LIVE_QUESTION_BANK.filter(
    (question) => question.reference.teachingArea === "Bloc 2",
  );
  assert.equal(questions.length, 35);
  assert.ok(questions.every((question) => question.reference.formation === "CAP AAGA"));
  assert.ok(questions.every((question) => question.contextMode === "trade-contextualized"));
  assert.ok(
    questions.every((question) =>
      question.reference.relativePath.startsWith(
        "CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1/",
      ),
    ),
  );
});

test("true-false live questions use stable Vrai/Faux choices", () => {
  for (const question of LIVE_QUESTION_BANK) {
    if (question.type !== "true-false") continue;
    assert.deepEqual(question.choices, ["Vrai", "Faux"]);
  }
});

test("each existing module provides a five-minute quiz with distinct questions", () => {
  const modules = getLiveQuestionModules();
  assert.equal(modules.length, 28);
  assert.equal(LIVE_QUESTION_BANK.length, 140);
  for (const quiz of modules) {
    assert.equal(quiz.questions.length, 5, quiz.label);
    assert.equal(new Set(quiz.questions.map((q) => q.prompt)).size, 5, quiz.label);
    const answerSeconds = quiz.questions.reduce((sum, q) => sum + q.timeLimitSeconds, 0);
    assert.equal(answerSeconds + quiz.questions.length * 15, 300, quiz.label);
    for (const question of quiz.questions) {
      assert.equal(question.timeLimitSeconds, 45);
      assert.ok(question.explanation.trim().length > 20);
      assert.ok(question.prompt.length <= 300);
      assert.ok(question.choices.length <= 4);
      assert.equal(new Set(question.choices).size, question.choices.length);
      assert.ok(question.choices.every((choice) => choice.length <= 150));
      assert.ok(question.reference.sectionOrPage.startsWith(question.reference.module.split(" :")[0]));
      assert.equal(getLiveQuestion(question.id)?.id, question.id);
      assert.doesNotMatch(question.prompt, /le programme|le référentiel|objectif du module|thématique.*programme/i);
    }
  }
});

test("module selection renders one bounded quiz and safely defaults for hostile inputs", () => {
  const modules = getLiveQuestionModules();
  for (const quiz of modules) {
    assert.equal(selectLiveQuestionModule(quiz.id).id, quiz.id);
    assert.equal(selectLiveQuestionModule(quiz.id).questions.length, 5);
  }
  for (const raw of [undefined, null, [], [modules[1].id], "<script>", "x".repeat(10000)]) {
    assert.equal(selectLiveQuestionModule(raw).id, modules[0].id);
  }
  assert.equal(getLiveQuestion("unknown"), null);
});
