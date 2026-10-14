import { buildPseTerminaleA9Sequence } from "./pse-terminale-a9";

// Séquence PSE de T AERO — module A9 « La sécurité alimentaire ».
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero-a9.md
export const pseTAeroA9Sequence = buildPseTerminaleA9Sequence({
  classroom: "T AERO",
  place: "AMA",
  learner: "Théo",
});
