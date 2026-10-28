import { buildPseSecondeA1Sequence } from "./pse-seconde-a1";

// Séquence PSE de 2 AERO — module A1 « Le système de santé ».
// Traçabilité complète des sources : docs/mapping-pedagogique-2-aero-a1.md
export const pse2AeroA1Sequence = buildPseSecondeA1Sequence({
  classroom: "2 AERO",
  place: "AéroMaintenance Atlantique (AMA)",
  mentor: "M. Ferrand",
  learner: "Théo",
  peer: "Sarah",
  painActivity: "une douleur au dos après une opération de manutention de pièces lourdes",
  collectiveMeasure: "un capotage d'insonorisation sur une machine bruyante",
});
