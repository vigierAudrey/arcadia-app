import assert from "node:assert/strict";
import { after, test } from "node:test";

import { getAdminCatalog } from "../src/server/catalog/queries";
import { prisma } from "../src/server/db/prisma";

after(async () => {
  await prisma.$disconnect();
});

test("loads the initial pedagogical hierarchy from PostgreSQL", async () => {
  const catalog = await getAdminCatalog();

  assert.deepEqual(
    catalog.map((program) => program.name),
    ["CAP", "BAC PRO"],
  );

  const cap = catalog.find((program) => program.name === "CAP");
  assert.ok(cap);
  assert.deepEqual(cap.levels.map((level) => level.name), ["Terminale"]);
  assert.deepEqual(
    cap.levels[0]?.classrooms.map((classroom) => classroom.name),
    ["T AGAA"],
  );
  assert.deepEqual(
    cap.levels[0]?.classrooms[0]?.teachingAreas.map(
      (teachingArea) => teachingArea.name,
    ),
    ["Maths appliquées", "PSE", "Bloc 2"],
  );

  const bacPro = catalog.find((program) => program.name === "BAC PRO");
  assert.ok(bacPro);
  assert.deepEqual(
    bacPro.levels.map((level) => ({
      name: level.name,
      classrooms: level.classrooms.map((classroom) => classroom.name),
    })),
    [
      { name: "Seconde", classrooms: ["2 AERO", "2 CIEL"] },
      { name: "Première", classrooms: ["1 AERO", "1 TCI"] },
      { name: "Terminale", classrooms: ["T AERO", "T TCI"] },
    ],
  );
});

test("contains no student, score, attempt, or progress table", async () => {
  const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
    LIMIT 50
  `;
  const forbiddenTable = tables.find(({ table_name: tableName }) =>
    /(student|learner|score|attempt|progress)/i.test(tableName),
  );

  assert.equal(forbiddenTable, undefined);
});
