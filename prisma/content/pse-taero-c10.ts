import { buildPseTerminaleC10Sequence } from "./pse-terminale-c10";

// Séquence PSE de T AERO — module C10 « Les risques liés à l'activité
// physique ».
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero-c10.md
export const pseTAeroC10Sequence = buildPseTerminaleC10Sequence({
  classroom: "T AERO",
  place: "AMA",
  learner: "Théo",
});
