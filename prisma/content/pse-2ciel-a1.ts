import { buildPseSecondeA1Sequence } from "./pse-seconde-a1";

// Séquence PSE de 2 CIEL — module A1 « Le système de santé ».
// Traçabilité complète des sources : docs/mapping-pedagogique-2-ciel-a1.md
export const pse2CielA1Sequence = buildPseSecondeA1Sequence({
  classroom: "2 CIEL",
  place: "CIEL Réseaux & Systèmes (CRS)",
  mentor: "Mme Nadaud",
  learner: "Malik",
  peer: "Léa",
  painActivity: "une douleur au poignet après de longues heures passées devant l'écran, la souris en main",
  collectiveMeasure: "des écrans antireflets installés sur les postes",
});
