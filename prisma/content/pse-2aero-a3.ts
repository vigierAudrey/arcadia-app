import { buildPseSecondeA3Sequence } from "./pse-seconde-a3";

// Séquence PSE de 2 AERO — module A3 « L'activité physique ».
// Traçabilité complète des sources : docs/mapping-pedagogique-2-aero-a3.md
export const pse2AeroA3Sequence = buildPseSecondeA3Sequence({
  classroom: "2 AERO",
  place: "AéroMaintenance Atlantique (AMA)",
  mentor: "M. Ferrand",
  learner: "Théo",
  peer: "Sarah",
  liftTask: "positionner une riveteuse",
  effortTask: "tire un faisceau de câbles le long du fuselage",
  effortPlace: "AMA",
  sedentaryTask: "en formation théorique sur la réglementation aéronautique",
});
