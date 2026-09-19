import { buildPsePremiereC5Sequence } from "./pse-premiere-c5";

// Séquence PSE de 1 AERO — module C5 « L'analyse des risques professionnels ».
// Traçabilité complète des sources : docs/mapping-pedagogique-1-aero-c5.md
export const pse1AeroC5Sequence = buildPsePremiereC5Sequence({
  classroom: "1 AERO",
  place: "AMA",
  mentor: "M. Ferrand",
  learner: "Théo",
  openingSituation:
    "Dans le hangar d’AMA, Théo positionne un panneau de fuselage sur un support avant rivetage.",
  components: [
    { id: "theo", label: "Théo, en première année, positionne la pièce seul", categoryId: "operateur" },
    { id: "formation", label: "Il n’a jamais fait cette opération sur ce type de panneau", categoryId: "operateur" },
    { id: "positionner", label: "Positionner le panneau sur le support avant rivetage", categoryId: "tache" },
    { id: "percer", label: "Percer aux emplacements repérés", categoryId: "tache" },
    { id: "support", label: "Le support de maintien du panneau", categoryId: "materiel" },
    { id: "perceuse", label: "La perceuse et ses forets", categoryId: "materiel" },
    { id: "hangar", label: "Le hangar, où le bruit du rivetage couvre les voix", categoryId: "milieu" },
    { id: "delai", label: "L’avion doit repartir le lendemain matin", categoryId: "milieu" },
  ],
  processSituation:
    "Théo perce un panneau mal immobilisé. Sa main reste proche de la zone de perçage.",
  processDanger: "le foret en rotation",
  processExposure: "la main de Théo reste à quelques centimètres du foret",
  processTrigger: "le panneau se déplace pendant le perçage",
  processDamage: "une coupure à la main",
  ratedSituations: [
    { id: "solvant", label: "Contact répété avec un solvant, sans gants adaptés, plusieurs fois par jour", categoryId: "elevee" },
    { id: "projection", label: "Projection de copeaux au perçage, tous les jours, sans écran", categoryId: "elevee" },
    { id: "flexible", label: "Chute possible sur un flexible qui traverse le passage", categoryId: "moyenne" },
    { id: "bruit-ponctuel", label: "Exposition au bruit du rivetage, avec casque fourni et porté", categoryId: "moyenne" },
    { id: "eclairage", label: "Éclairage un peu faible dans une zone peu fréquentée", categoryId: "faible" },
  ],
  highPrioritySituation: "projection de copeaux au perçage",
  targetRisk: "les blessures au poste de perçage-rivetage",
  measures: [
    { id: "supprimer-etape", label: "Supprimer l’étape de perçage manuel en la confiant à une machine", categoryId: "suppression" },
    { id: "remplacer-solvant", label: "Remplacer le solvant par un produit moins dangereux", categoryId: "suppression" },
    { id: "dispositif", label: "Installer un dispositif qui maintient le panneau pendant le perçage", categoryId: "reduction" },
    { id: "outil-moins-bruyant", label: "Choisir une riveteuse moins bruyante", categoryId: "reduction" },
    { id: "ecran", label: "Installer un écran de protection devant le poste de perçage", categoryId: "collective" },
    { id: "aspiration", label: "Mettre une aspiration des copeaux à la source", categoryId: "collective" },
    { id: "gants", label: "Fournir des gants adaptés à chaque opérateur", categoryId: "individuelle" },
    { id: "lunettes", label: "Fournir des lunettes de protection à chaque opérateur", categoryId: "individuelle" },
  ],
  collectiveMeasure: "Installer un écran de protection devant le poste",
});
