import { buildPseTerminaleA9Sequence } from "./pse-terminale-a9";

// Séquence PSE de T TCI — module A9 « La sécurité alimentaire ».
// Traçabilité complète des sources : docs/mapping-pedagogique-t-tci-a9.md
export const pseTTciA9Sequence = buildPseTerminaleA9Sequence({
  classroom: "T TCI",
  place: "CDE",
  learner: "Élodie",
});
