import { buildPseSecondeC1Sequence } from "./pse-seconde-c1";

// Séquence PSE de 2 AERO — module C1 « Les enjeux de la santé et sécurité au travail ».
// Traçabilité complète des sources : docs/mapping-pedagogique-2-aero.md
export const pse2AeroC1Sequence = buildPseSecondeC1Sequence({
  classroom: "2 AERO",
  formation: "aéronautique",
  place: "AéroMaintenance Atlantique (AMA)",
  mentor: "M. Ferrand",
  learner: "Théo",
  peer: "Sarah",
  introDocs: "la tenue, les EPI et le livret d'accueil sécurité",
  risks:
    "la manutention de pièces lourdes, le bruit, les projections, les produits chimiques, les postures contraignantes, les poussières de composites et le risque électrique",
  suddenIncident:
    "À l'atelier AMA, Théo se coupe la main pendant une opération de structure.",
  chronicExample:
    "Sarah évoque un ancien collègue devenu malentendant après des années d'exposition au bruit du rivetage.",
  unknownTask:
    "un élève mineur doit utiliser un équipement qu'il ne connaît pas, sans tuteur présent.",
  signalDanger:
    "Pendant une intervention, un protecteur est absent et l'élève ne connaît pas la consigne. Que doit faire le salarié ou l'élève en PFMP ?",
});
