import { buildPsePremiereC5Sequence } from "./pse-premiere-c5";

// Séquence PSE de 1 TCI — module C5 « L'analyse des risques professionnels ».
// Traçabilité complète des sources : docs/mapping-pedagogique-1-tci-c5.md
export const pse1TciC5Sequence = buildPsePremiereC5Sequence({
  classroom: "1 TCI",
  place: "CDE",
  mentor: "M. Berthier",
  learner: "Karim",
  openingSituation:
    "À la zone de débit de l’atelier CDE, Karim déplace une tôle vers la cisaille.",
  components: [
    { id: "karim", label: "Karim, en première année, déplace la tôle seul", categoryId: "operateur" },
    { id: "taille", label: "La tôle est plus large que son envergure de bras", categoryId: "operateur" },
    { id: "deplacer", label: "Déplacer la tôle du stock vers la cisaille", categoryId: "tache" },
    { id: "cisailler", label: "Cisailler la tôle aux dimensions demandées", categoryId: "tache" },
    { id: "cisaille", label: "La cisaille et son dispositif de maintien", categoryId: "materiel" },
    { id: "chariot", label: "Le chariot de manutention des tôles", categoryId: "materiel" },
    { id: "sol", label: "La zone de débit, encombrée de chutes de tôle au sol", categoryId: "milieu" },
    { id: "cadence", label: "La série doit être terminée avant la fin du poste", categoryId: "milieu" },
  ],
  processSituation:
    "Karim tient une tôle à arêtes vives près de la cisaille. La tôle glisse.",
  processDanger: "l’arête vive de la tôle",
  processExposure: "la main de Karim tient la tôle sans protection",
  processTrigger: "la tôle glisse brusquement",
  processDamage: "une coupure à la main",
  ratedSituations: [
    { id: "cisaille", label: "Coupure à la cisaille, opération répétée toute la journée", categoryId: "elevee" },
    { id: "meulage", label: "Projection au meulage, sans écran devant le poste", categoryId: "elevee" },
    { id: "plain-pied", label: "Chute de plain-pied sur les chutes de tôle laissées au sol", categoryId: "moyenne" },
    { id: "bruit", label: "Exposition au bruit de l’atelier, avec protection auditive fournie et portée", categoryId: "moyenne" },
    { id: "eclairage", label: "Éclairage un peu faible dans une zone de stockage peu fréquentée", categoryId: "faible" },
  ],
  highPrioritySituation: "coupure à la cisaille",
  targetRisk: "les coupures au poste de cisaille",
  measures: [
    { id: "supprimer-etape", label: "Supprimer la manutention manuelle de la tôle en installant un convoyeur", categoryId: "suppression" },
    { id: "ebavurer", label: "Faire ébavurer les tôles en amont pour supprimer les arêtes vives", categoryId: "suppression" },
    { id: "dispositif", label: "Installer un dispositif qui maintient la tôle pendant la coupe", categoryId: "reduction" },
    { id: "chariot", label: "Utiliser un chariot pour amener la tôle jusqu’au poste", categoryId: "reduction" },
    { id: "ecran", label: "Installer un écran de protection devant le poste de meulage", categoryId: "collective" },
    { id: "rangement", label: "Organiser le rangement des chutes pour dégager le passage", categoryId: "collective" },
    { id: "gants", label: "Fournir des gants anti-coupure à chaque opérateur", categoryId: "individuelle" },
    { id: "lunettes", label: "Fournir des lunettes de protection à chaque opérateur", categoryId: "individuelle" },
  ],
  collectiveMeasure: "Installer un écran de protection devant le poste",
});
