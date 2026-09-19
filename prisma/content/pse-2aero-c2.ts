import { buildPseSecondeC2Sequence } from "./pse-seconde-c2";

// Séquence PSE de 2 AERO — module C2 « Les notions de base en prévention des
// risques professionnels ».
// Traçabilité complète des sources : docs/mapping-pedagogique-2-aero-c2.md
export const pse2AeroC2Sequence = buildPseSecondeC2Sequence({
  classroom: "2 AERO",
  place: "AéroMaintenance Atlantique (AMA)",
  mentor: "M. Ferrand",
  learner: "Théo",
  peer: "Sarah",
  task: "un rivetage",
  posterRules: "lunettes, casque anti-bruit et rangement du poste",
  epiExamples: "les lunettes de protection contre les projections et le casque anti-bruit du rivetage",
  collectiveExample: "l’aspiration des poussières de composites à la source",
  erasedSignPost: "Au poste de perçage",
  observedScene: "Un bidon de solvant est resté ouvert près du poste de perçage, et un opérateur travaille sans ses lunettes.",
  dangerExample: "le solvant irritant laissé à l’air libre",
  damageExample: "une irritation des yeux ou des voies respiratoires",
  exposureExample: "l’opérateur travaille juste à côté, sans protection des yeux",
  workstations: "rivetage, câblage, manutention de pièces et travail sur fuselage",
  riskCategories: [
    { id: "physique", label: "Risque physique" },
    { id: "chimique", label: "Risque chimique" },
    { id: "activite", label: "Risque lié à l’activité physique" },
  ],
  riskItems: [
    { id: "bruit", label: "Le bruit du rivetage pendant toute la journée", categoryId: "physique" },
    { id: "projection", label: "Les projections de copeaux au perçage", categoryId: "physique" },
    { id: "vibrations", label: "Les vibrations de l’outil tenu à la main", categoryId: "physique" },
    { id: "solvant", label: "Les vapeurs de solvant au nettoyage d’une pièce", categoryId: "chimique" },
    { id: "poussiere", label: "Les poussières de composites au ponçage", categoryId: "chimique" },
    { id: "colle", label: "Le contact de la peau avec une colle structurale", categoryId: "chimique" },
    { id: "bras-leves", label: "Travailler bras levés sous un fuselage", categoryId: "activite" },
    { id: "charge", label: "Porter une pièce lourde jusqu’au poste", categoryId: "activite" },
    { id: "accroupi", label: "Rester accroupi dans une zone étroite de la cellule", categoryId: "activite" },
  ],
  riskPairs: [
    { id: "rivetage", left: "Le poste de rivetage", right: "Le risque physique, à cause du bruit" },
    { id: "nettoyage", left: "Le nettoyage d’une pièce au solvant", right: "Le risque chimique" },
    { id: "manutention", left: "La manutention d’une pièce lourde", right: "Le risque lié à l’activité physique" },
    { id: "fuselage", left: "Le travail bras levés sous fuselage", right: "Le risque lié aux postures contraignantes" },
  ],
  mainRisk:
    "Au rivetage, le bruit et les vibrations arrivent ensemble, et la posture s’y ajoute dès que la pièce est en hauteur.",
});
