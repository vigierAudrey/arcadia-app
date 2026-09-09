import { buildPseSecondeC1Sequence } from "./pse-seconde-c1";

// Séquence PSE de 2 CIEL — module C1 « Les enjeux de la santé et sécurité au travail ».
// Traçabilité complète des sources : docs/mapping-pedagogique-2-ciel.md
export const pse2CielC1Sequence = buildPseSecondeC1Sequence({
  classroom: "2 CIEL",
  formation: "CIEL",
  place: "CIEL Réseaux & Systèmes (CRS)",
  mentor: "Mme Nadaud",
  learner: "Malik",
  peer: "Léa",
  introDocs:
    "le règlement intérieur, la charte informatique et les consignes de sécurité électrique",
  risks:
    "le travail sur écran, la fatigue visuelle, les fumées de brasage, le risque électrique, le tirage de câbles, la manutention de baies, le travail en hauteur et le stress lié aux interventions client",
  suddenIncident:
    "En atelier CRS, Malik se coupe en dénudant un câble pendant une activité encadrée.",
  chronicExample:
    "Léa décrit des douleurs au poignet après de longues périodes de travail sur écran et de gestes répétés.",
  unknownTask:
    "un élève nouvel arrivant doit aider à installer une baie réseau alors qu'un câble électrique semble abîmé.",
  signalDanger:
    "Pendant l'installation d'une baie réseau, un câble électrique semble abîmé. Que doit faire le salarié ou l'élève en PFMP ?",
});
