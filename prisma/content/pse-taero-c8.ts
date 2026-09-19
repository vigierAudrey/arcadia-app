import { buildPseTerminaleC8Sequence } from "./pse-terminale-c8";

// Séquence PSE de T AERO — module C8 « Déclaration et réparation des accidents
// du travail et des maladies professionnelles ».
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero-c8.md
export const pseTAeroC8Sequence = buildPseTerminaleC8Sequence({
  classroom: "T AERO",
  place: "AMA",
  learner: "Théo",
  accident:
    "À l’atelier AMA, Théo se blesse à la main pendant une dépose. L’arrêt dure plusieurs jours.",
  chronicExposure: "l’exposition au bruit du rivetage",
  chronicDamage: "une perte d’audition",
});
