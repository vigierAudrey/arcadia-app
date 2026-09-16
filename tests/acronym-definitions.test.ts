import assert from "node:assert/strict";
import test from "node:test";

import { contentImports } from "../prisma/content/index";
import type { InitialJsonValue, InitialLearningSequence } from "../prisma/content/catalog-types";

function collectText(value: InitialJsonValue): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(collectText).join("\n");
  }

  if (value && typeof value === "object") {
    return Object.values(value).map(collectText).join("\n");
  }

  return "";
}

function sequenceText(sequence: InitialLearningSequence): string {
  return [
    sequence.title,
    sequence.description,
    ...sequence.lessons.flatMap((lesson) => [
      lesson.title,
      lesson.description ?? "",
      ...(lesson.activities ?? []).flatMap((activity) => [
        activity.title,
        activity.instructions,
        collectText(activity.payload),
      ]),
    ]),
  ].join("\n");
}

test("AAGA Bloc 2 defines the main acronyms used with students", () => {
  const entry = contentImports.find(
    (content) => content.sequence.title === "CT3. Cadre d’intervention, autonomie et ressources",
  );

  assert.ok(entry, "Séquence CT3 AAGA introuvable");

  const text = sequenceText(entry.sequence);

  assert.match(text, /EHPAD signifie établissement d’hébergement pour personnes âgées dépendantes/);
  assert.match(text, /USLD signifie unité de soins de longue durée/);
  assert.match(text, /AAGA signifie agent accompagnant au grand âge/);
  assert.match(text, /AGGIR signifie autonomie gérontologie groupes iso-ressources/);
  assert.match(text, /GIR, groupe iso-ressources/);
  assert.match(text, /PFMP, période de formation en milieu professionnel/);
});

test("prevention actor courses define actor acronyms", () => {
  for (const title of ["C3. Les acteurs de prévention"]) {
    const matchingSequences = contentImports.filter((content) => content.sequence.title === title);

    assert.ok(matchingSequences.length >= 2);

    for (const entry of matchingSequences) {
      const text = sequenceText(entry.sequence);

      assert.match(text, /CSE[\s\S]*comité social et économique/i);
      assert.match(text, /SST[\s\S]*sauveteur secouriste du travail/i);
      assert.match(text, /SPST[\s\S]*service de prévention et de santé au travail/i);
      assert.match(text, /CARSAT[\s\S]*caisse d['’]assurance retraite et de la santé au travail/i);
    }
  }
});

test("terminal health follow-up courses define medical follow-up acronyms", () => {
  const matchingSequences = contentImports.filter(
    (content) => content.sequence.title === "C7. Le suivi de la santé au travail",
  );

  assert.ok(matchingSequences.length >= 2);

  for (const entry of matchingSequences) {
    const text = sequenceText(entry.sequence);

    assert.match(text, /VIP signifie visite d’information et de prévention/);
    assert.match(text, /EMA signifie examen médical d’aptitude/);
    assert.match(text, /SPST[\s\S]*service de prévention et de santé au travail/i);
    assert.match(text, /processus d’apparition du dommage, parfois abrégé PAD/);
  }
});
