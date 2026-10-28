import { buildPseSecondeA2Sequence } from "./pse-seconde-a2";

// Séquence PSE de 2 CIEL — module A2 « Les rythmes biologiques et le sommeil ».
// Traçabilité complète des sources : docs/mapping-pedagogique-2-ciel-a2.md
export const pse2CielA2Sequence = buildPseSecondeA2Sequence({
  classroom: "2 CIEL",
  place: "CIEL Réseaux & Systèmes (CRS)",
  mentor: "Mme Nadaud",
  learner: "Malik",
  peer: "Léa",
  wakeTaskPhrase: "pour une intervention réseau",
  shiftChangeReason: "Une astreinte pour un incident cyber",
  criticalTask: "une configuration réseau sensible",
  concentrationTask: "au câblage",
});
