import assert from "node:assert/strict";
import { test } from "node:test";

import {
  programInputSchema,
  publicationStatusSchema,
  lessonInputSchema,
  sequenceInputSchema,
  sequenceStatusSchema,
  uuidSchema,
} from "../src/server/catalog/validation";

test("validates catalog field lengths and identifiers", () => {
  assert.equal(programInputSchema.safeParse({ name: "   " }).success, false);
  assert.equal(
    programInputSchema.safeParse({ name: "x".repeat(101) }).success,
    false,
  );
  assert.deepEqual(programInputSchema.parse({ name: "  Formation test  " }), {
    name: "Formation test",
  });
  assert.equal(uuidSchema.safeParse("not-an-id").success, false);
});

test("validates sequence content and closed status values", () => {
  assert.equal(
    sequenceInputSchema.safeParse({
      title: "Séquence",
      description: "x".repeat(2_001),
    }).success,
    false,
  );
  assert.deepEqual(
    sequenceInputSchema.parse({ title: " Séquence ", description: "   " }),
    { title: "Séquence", description: null },
  );
  assert.equal(sequenceStatusSchema.safeParse("PUBLISHED").success, false);
});

test("validates lesson content and publication status", () => {
  assert.deepEqual(
    lessonInputSchema.parse({
      title: " Séance 1 ",
      description: " Une description ",
    }),
    { title: "Séance 1", description: "Une description" },
  );
  assert.equal(
    lessonInputSchema.safeParse({ title: "", description: "" }).success,
    false,
  );
  assert.equal(publicationStatusSchema.safeParse("OPEN").success, false);
  assert.equal(publicationStatusSchema.safeParse("PUBLISHED").success, true);
});
