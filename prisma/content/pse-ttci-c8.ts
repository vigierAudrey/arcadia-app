import { buildPseTerminaleC8Sequence } from "./pse-terminale-c8";

// Séquence PSE de T TCI — module C8 « Déclaration et réparation des accidents
// du travail et des maladies professionnelles ».
// Traçabilité complète des sources : docs/mapping-pedagogique-t-tci-c8.md
export const pseTTciC8Sequence = buildPseTerminaleC8Sequence({
  classroom: "T TCI",
  place: "CDE",
  learner: "Karim",
  accident:
    "À l’atelier CDE, Karim se coupe sur une tôle mal ébavurée et doit interrompre son travail.",
  chronicExposure: "l’exposition au bruit de l’atelier de chaudronnerie",
  chronicDamage: "une perte d’audition",
});
