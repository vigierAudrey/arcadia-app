import assert from "node:assert/strict";
import test from "node:test";

import {
  contentPayloadSchema,
  parseActivityPayload,
  qcmPayloadSchema,
  trueFalsePayloadSchema,
} from "../src/features/activities/activity-payload";

test("accepts the three initial activity payload formats", () => {
  assert.equal(
    contentPayloadSchema.parse({ body: "Une fiche pédagogique." }).body,
    "Une fiche pédagogique.",
  );

  const qcm = qcmPayloadSchema.parse({
    question: "Quel équipement protège l’audition ?",
    choices: [
      { id: "a", label: "Des gants" },
      { id: "b", label: "Un casque antibruit" },
    ],
    correctChoiceIds: ["b"],
    explanation: "Le casque réduit l’exposition au bruit.",
  });
  assert.deepEqual(qcm.correctChoiceIds, ["b"]);

  assert.equal(
    trueFalsePayloadSchema.parse({
      statement: "Une protection collective est prioritaire.",
      correctAnswer: true,
    }).correctAnswer,
    true,
  );
});

test("rejects malformed or unsupported activity payloads", () => {
  assert.throws(() =>
    qcmPayloadSchema.parse({
      question: "Question",
      choices: [
        { id: "same", label: "Choix A" },
        { id: "same", label: "Choix B" },
      ],
      correctChoiceIds: ["missing"],
    }),
  );

  assert.throws(() => parseActivityPayload("unknown", {}), {
    message: "Unsupported activity type.",
  });
});
