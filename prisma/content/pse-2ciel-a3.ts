import { buildPseSecondeA3Sequence } from "./pse-seconde-a3";

// Séquence PSE de 2 CIEL — module A3 « L'activité physique ».
// Traçabilité complète des sources : docs/mapping-pedagogique-2-ciel-a3.md
export const pse2CielA3Sequence = buildPseSecondeA3Sequence({
  classroom: "2 CIEL",
  place: "CIEL Réseaux & Systèmes (CRS)",
  mentor: "Mme Nadaud",
  learner: "Malik",
  peer: "Léa",
  liftTask: "positionner un switch dans une baie",
  effortTask: "tire des câbles réseau dans un faux plafond",
  effortPlace: "CRS",
  sedentaryTask: "devant l'écran à programmer des équipements",
});
