import { buildPseTerminaleB5Sequence } from "./pse-terminale-b5";

// Séquence PSE de T AERO — module B5 « Les ressources en énergie et le
// développement durable ».
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero-b5.md
export const pseTAeroB5Sequence = buildPseTerminaleB5Sequence({
  classroom: "T AERO",
  place: "AMA",
  learner: "Théo",
});
