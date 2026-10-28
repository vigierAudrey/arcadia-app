import { buildPseSecondeA2Sequence } from "./pse-seconde-a2";

// Séquence PSE de 2 AERO — module A2 « Les rythmes biologiques et le sommeil ».
// Traçabilité complète des sources : docs/mapping-pedagogique-2-aero-a2.md
export const pse2AeroA2Sequence = buildPseSecondeA2Sequence({
  classroom: "2 AERO",
  place: "AéroMaintenance Atlantique (AMA)",
  mentor: "M. Ferrand",
  learner: "Théo",
  peer: "Sarah",
  wakeTaskPhrase: "au contrôle avionique",
  shiftChangeReason: "Une maintenance urgente",
  criticalTask: "une opération de serrage",
  concentrationTask: "au câblage",
});
