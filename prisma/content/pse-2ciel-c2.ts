import { buildPseSecondeC2Sequence } from "./pse-seconde-c2";

// Séquence PSE de 2 CIEL — module C2 « Les notions de base en prévention des
// risques professionnels ».
// Traçabilité complète des sources : docs/mapping-pedagogique-2-ciel-c2.md
export const pse2CielC2Sequence = buildPseSecondeC2Sequence({
  classroom: "2 CIEL",
  place: "CIEL Réseaux & Systèmes (CRS)",
  mentor: "Mme Nadaud",
  learner: "Malik",
  peer: "Léa",
  task: "le brasage d’une carte",
  posterRules: "lunettes, aspiration des fumées et rangement du poste",
  epiExamples: "les lunettes de protection contre les projections d’étain et les gants adaptés au poste",
  collectiveExample: "l’aspiration des fumées de brasage à la source",
  erasedSignPost: "Au poste de câblage",
  observedScene: "Une multiprise est surchargée, des câbles traînent au sol, et le poste de brasage fonctionne sans aspiration.",
  dangerExample: "le courant électrique accessible sur la multiprise surchargée",
  damageExample: "une brûlure ou une électrisation",
  exposureExample: "une personne circule entre les câbles posés au sol, tout près de la multiprise",
  workstations: "brasage, câblage, manutention d’une baie et dépannage d’un équipement",
  riskCategories: [
    { id: "electrique", label: "Risque électrique" },
    { id: "chimique", label: "Risque chimique" },
    { id: "activite", label: "Risque lié à l’activité physique" },
  ],
  riskItems: [
    { id: "multiprise", label: "Une multiprise surchargée sous le bureau", categoryId: "electrique" },
    { id: "coffret", label: "Intervenir près d’un coffret resté sous tension", categoryId: "electrique" },
    { id: "cable-abime", label: "Un câble d’alimentation dont la gaine est abîmée", categoryId: "electrique" },
    { id: "fumees", label: "Les fumées de flux de brasage respirées au poste", categoryId: "chimique" },
    { id: "bombe", label: "L’aérosol de nettoyage des contacts utilisé sans ventilation", categoryId: "chimique" },
    { id: "etain", label: "Le contact des doigts avec l’étain et le flux", categoryId: "chimique" },
    { id: "ecran", label: "Rester des heures dans la même position devant un écran", categoryId: "activite" },
    { id: "baie", label: "Porter et caler une baie réseau à deux", categoryId: "activite" },
    { id: "chemin", label: "Tirer des câbles bras levés dans un chemin de câbles", categoryId: "activite" },
  ],
  riskPairs: [
    { id: "brasage", left: "Le poste de brasage", right: "Le risque chimique, à cause des fumées" },
    { id: "coffret", left: "Le dépannage d’un équipement sous tension", right: "Le risque électrique" },
    { id: "baie", left: "La manutention d’une baie réseau", right: "Le risque lié à l’activité physique" },
    { id: "ecran", left: "Le travail prolongé devant un écran", right: "Le risque lié aux postures contraignantes" },
  ],
  mainRisk:
    "Au dépannage, le risque électrique arrive rarement seul : il s’ajoute presque toujours à une posture inconfortable, dans un local étroit ou sous un plancher technique.",
});
