export type LiveQuestionType = "true-false" | "single-choice";

export type LiveQuestionReference = {
  formation: "Bac Pro" | "CAP";
  level:
    | "Seconde professionnelle"
    | "Première professionnelle"
    | "Terminale professionnelle"
    | "CAP première année"
    | "CAP terminale";
  teachingArea: "PSE";
  module: string;
  sourceTitle: string;
  relativePath: string;
  sectionOrPage: string;
  conformity: "CONFIRME" | "A_VERIFIER";
};

export type LiveQuestion = {
  id: string;
  type: LiveQuestionType;
  title: string;
  prompt: string;
  choices: string[];
  correctChoiceIndex: number;
  explanation: string;
  timeLimitSeconds: number;
  points: number;
  track: "CORE" | "BONUS";
  contextMode: "general-pse" | "trade-contextualized";
  reference: LiveQuestionReference;
};

const BAC_PRO_SECONDE_SOURCE = {
  formation: "Bac Pro",
  teachingArea: "PSE",
  sourceTitle: "Prévention-santé-environnement — Classe de seconde professionnelle",
  relativePath:
    "BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe632annexe1103982pdf-85404.pdf",
} as const;

const BAC_PRO_PREMIERE_SOURCE = {
  formation: "Bac Pro",
  teachingArea: "PSE",
  sourceTitle: "Prévention-santé-environnement — Classe de première professionnelle",
  relativePath:
    "BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe1_1239665.pdf",
} as const;

const BAC_PRO_TERMINALE_SOURCE = {
  formation: "Bac Pro",
  teachingArea: "PSE",
  sourceTitle: "Prévention-santé-environnement — Classe terminale professionnelle",
  relativePath:
    "BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf",
} as const;

const CAP_SOURCE = {
  formation: "CAP",
  teachingArea: "PSE",
  sourceTitle:
    "Prévention-santé-environnement — Classes préparant au certificat d'aptitude professionnelle",
  relativePath: "CAP/REFERENTIEL_CAP_PSE/spe641annexe1105406pdf-85401.pdf",
} as const;

export const LIVE_QUESTION_BANK = [
  {
    id: "pse-bacpro-a1-capital-sante-vf",
    type: "true-false",
    title: "Capital santé",
    prompt: "Le capital santé dépend uniquement de facteurs internes.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 1,
    explanation:
      "Le référentiel associe le capital santé à des facteurs internes et externes.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — capital santé, facteurs internes et externes",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-bacpro-a2-sommeil-vf",
    type: "true-false",
    title: "Sommeil",
    prompt: "Les rythmes sociaux peuvent influencer les rythmes biologiques.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module A2 vise l'incidence des rythmes sociaux sur les rythmes biologiques et le sommeil.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A2 : Les rythmes biologiques — le sommeil",
      sectionOrPage: "Module A2 — incidence des rythmes sociaux sur les rythmes biologiques",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-bacpro-a2-sommeil-qcm",
    type: "single-choice",
    title: "Hygiène du sommeil",
    prompt: "Quel comportement favorise le plus un sommeil régulier ?",
    choices: [
      "Garder des horaires de coucher très variables",
      "Adopter un mode de vie favorisant le sommeil",
      "Dormir seulement le week-end",
      "Supprimer toutes les phases du sommeil",
    ],
    correctChoiceIndex: 1,
    explanation:
      "Le module A2 conduit à comprendre la nécessité d'un mode de vie favorisant le sommeil.",
    timeLimitSeconds: 30,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A2 : Les rythmes biologiques — le sommeil",
      sectionOrPage: "Module A2 — hygiène du sommeil",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-bacpro-b1-alimentation-eco-vf",
    type: "true-false",
    title: "Alimentation écoresponsable",
    prompt: "L'alimentation peut avoir un impact sur le développement durable.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module B1 relie l'alimentation écoresponsable au développement durable.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module B1 : L'alimentation écoresponsable",
      sectionOrPage: "Module B1 — alimentation écoresponsable et développement durable",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-bacpro-a7-pratiques-alimentaires-qcm",
    type: "single-choice",
    title: "Pratiques alimentaires",
    prompt: "Dans une analyse PSE, que peut-on questionner à propos des pratiques alimentaires ?",
    choices: [
      "Uniquement le goût des aliments",
      "Les horaires, les choix et leurs effets possibles",
      "Seulement la couleur des emballages",
      "Aucun facteur social ou individuel",
    ],
    correctChoiceIndex: 1,
    explanation:
      "Le module A7 traite des pratiques alimentaires, de leurs déterminants et de leurs liens avec la santé.",
    timeLimitSeconds: 30,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A7 : Les pratiques alimentaires",
      sectionOrPage: "Module A7 — pratiques alimentaires",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-bacpro-a8-stress-vf",
    type: "true-false",
    title: "Stress",
    prompt: "Un stress excessif peut avoir des effets physiologiques nocifs.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module A8 indique qu'un stress excessif peut avoir des effets physiologiques nocifs.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A8 : Le stress au quotidien",
      sectionOrPage: "Module A8 — stress aigu, stress chronique et effets physiologiques",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-bacpro-b3-bruit-caracteriser-qcm",
    type: "single-choice",
    title: "Bruit",
    prompt: "Quels éléments permettent de caractériser un son dans le référentiel ?",
    choices: [
      "Sa fréquence et son niveau d'intensité acoustique",
      "Uniquement sa durée",
      "Uniquement son origine",
      "Son prix et sa marque",
    ],
    correctChoiceIndex: 0,
    explanation:
      "Le module B3 demande de caractériser un son par sa fréquence et son niveau d'intensité acoustique.",
    timeLimitSeconds: 30,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B3 : Le bruit au quotidien",
      sectionOrPage: "Module B3 — fréquence et niveau d'intensité acoustique",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-bacpro-b3-bruit-sante-vf",
    type: "true-false",
    title: "Bruit et santé",
    prompt: "Le bruit peut avoir des effets sur la santé et sur la vie sociale.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module B3 aborde les effets du bruit sur la santé et sur la vie sociale.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B3 : Le bruit au quotidien",
      sectionOrPage: "Module B3 — effets du bruit",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-bacpro-b4-eau-vf",
    type: "true-false",
    title: "Ressource en eau",
    prompt: "La préservation des ressources en eau est un enjeu de développement durable.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module B4 présente la préservation de l'eau comme un enjeu planétaire contribuant au développement durable.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B4 : L'eau et le développement durable",
      sectionOrPage: "Module B4 — ressources en eau et développement durable",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-bacpro-a9-securite-alimentaire-qcm",
    type: "single-choice",
    title: "Sécurité alimentaire",
    prompt: "Quels critères de qualité sanitaire sont explicitement travaillés en terminale ?",
    choices: [
      "La qualité microbiologique et la qualité chimique",
      "La qualité musicale et la qualité visuelle",
      "La vitesse de livraison uniquement",
      "La taille de l'emballage uniquement",
    ],
    correctChoiceIndex: 0,
    explanation:
      "Le module A9 traite notamment de qualité microbiologique, de qualité chimique et d'agents contaminants.",
    timeLimitSeconds: 30,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module A9 : La sécurité alimentaire",
      sectionOrPage: "Module A9 — qualité microbiologique, qualité chimique, agent contaminant",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-bacpro-b5-energie-vf",
    type: "true-false",
    title: "Énergie",
    prompt: "Le référentiel distingue les énergies renouvelables et non renouvelables.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module B5 présente la notion d'énergie renouvelable et la gestion des ressources en énergie.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module B5 : Les ressources en énergie et le développement durable",
      sectionOrPage: "Module B5 — énergies renouvelables et non renouvelables",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-bacpro-c9-rps-vf",
    type: "true-false",
    title: "Risques psychosociaux",
    prompt: "Les risques psychosociaux peuvent avoir des conséquences sur la santé.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module C9 traite des risques psychosociaux et de leurs conséquences.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module C9 : Les risques psycho-sociaux",
      sectionOrPage: "Module C9 — risques psychosociaux et conséquences",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-a1-capital-sante-vf",
    type: "true-false",
    title: "Capital santé",
    prompt: "Le capital santé peut être influencé par des facteurs internes et externes.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module A1 du programme CAP associe le capital santé aux facteurs internes et externes.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — capital santé, facteur interne, facteur externe",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-a2-sommeil-vf",
    type: "true-false",
    title: "Sommeil",
    prompt: "Le sommeil a un rôle important pour la santé d'un individu.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module A2 vise à démontrer l'importance du rôle du sommeil pour la santé.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A2 : Le sommeil, un rythme biologique",
      sectionOrPage: "Module A2 — rôle du sommeil et santé",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-a2-sommeil-qcm",
    type: "single-choice",
    title: "Sommeil récupérateur",
    prompt: "Quel choix correspond le mieux à l'objectif du module sur le sommeil ?",
    choices: [
      "Comprendre la nécessité d'un mode de vie favorisant un sommeil récupérateur",
      "Supprimer les cycles de sommeil",
      "Ignorer les effets du travail de nuit",
      "Dormir uniquement quand on est déjà épuisé",
    ],
    correctChoiceIndex: 0,
    explanation:
      "Le programme CAP indique que l'élève comprend la nécessité d'adopter un mode de vie favorisant un sommeil récupérateur.",
    timeLimitSeconds: 30,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A2 : Le sommeil, un rythme biologique",
      sectionOrPage: "Module A2 — sommeil récupérateur, hygiène du sommeil",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-a7-alimentation-vf",
    type: "true-false",
    title: "Alimentation",
    prompt: "L'alimentation doit être adaptée à l'activité de l'individu.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module A7 porte sur l'alimentation adaptée à son activité et les besoins nutritionnels.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A7 : L'alimentation adaptée à son activité",
      sectionOrPage: "Module A7 — alimentation adaptée à l'activité, besoins nutritionnels",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-b1-eau-vf",
    type: "true-false",
    title: "Ressources en eau",
    prompt: "Les ressources en eau relèvent de la thématique environnement du programme CAP PSE.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module B1 du programme CAP est consacré aux ressources en eau.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B1 : Les ressources en eau",
      sectionOrPage: "Module B1 — ressources en eau",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-b4-bruit-qcm",
    type: "single-choice",
    title: "Bruit au quotidien",
    prompt: "Quel couple de notions permet de caractériser le bruit dans le programme CAP ?",
    choices: [
      "Fréquence et niveau d'intensité acoustique",
      "Couleur et forme",
      "Prix et marque",
      "Poids et volume",
    ],
    correctChoiceIndex: 0,
    explanation:
      "Le module B4 amène à caractériser le bruit par sa fréquence et son niveau d'intensité acoustique.",
    timeLimitSeconds: 30,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B4 : Le bruit au quotidien",
      sectionOrPage: "Module B4 — fréquence, niveau d'intensité acoustique",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-c1-contrat-travail-vf",
    type: "true-false",
    title: "Contrats de travail",
    prompt: "Le programme CAP PSE aborde les différentes formes de contrat de travail.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module C1 vise à faire découvrir différentes formes de contrat de travail.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C1 : Les différents contrats de travail",
      sectionOrPage: "Module C1 — différentes formes de contrat de travail",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-c2-sante-securite-vf",
    type: "true-false",
    title: "Santé et sécurité au travail",
    prompt: "Les accidents du travail et les maladies professionnelles font partie des enjeux de santé et sécurité au travail.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module C2 traite des enjeux de santé et sécurité au travail, dont les accidents du travail et maladies professionnelles.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C2 : Les enjeux de la santé et sécurité au travail",
      sectionOrPage: "Module C2 — accident du travail, maladie professionnelle",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-c3-demarche-prevention-qcm",
    type: "single-choice",
    title: "Démarche de prévention",
    prompt: "Dans la démarche de prévention, que cherche-t-on à identifier au poste de travail ?",
    choices: [
      "Des dangers potentiels et les risques associés",
      "Uniquement la décoration du poste",
      "Seulement la marque du matériel",
      "Le prénom du responsable",
    ],
    correctChoiceIndex: 0,
    explanation:
      "Le module C3 vise à analyser l'activité de travail pour identifier les dangers potentiels et risques associés.",
    timeLimitSeconds: 30,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C3 : La démarche de prévention appliquée à une activité de travail",
      sectionOrPage: "Module C3 — dangers potentiels, risques, poste de travail",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-c8-urgence-vf",
    type: "true-false",
    title: "Situation d'urgence",
    prompt: "La formation CAP PSE vise aussi à savoir apporter les premiers secours en attendant l'arrivée des secours.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "Le module C8 porte sur la gestion des situations d'urgence et les premiers secours.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C8 : La gestion des situations d'urgence",
      sectionOrPage: "Module C8 — premiers secours en attendant l'arrivée des secours",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-d2-budget-vf",
    type: "true-false",
    title: "Budget",
    prompt: "Le budget fait partie de la thématique de l'individu consommateur averti.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "La thématique D concerne l'individu consommateur averti et comprend le module D2 sur le budget.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D2 : Le budget",
      sectionOrPage: "Module D2 — budget, consommateur averti",
      conformity: "CONFIRME",
    },
  },
  {
    id: "pse-cap-d3-achats-vf",
    type: "true-false",
    title: "Achats",
    prompt: "Le programme CAP PSE aborde les achats dans la thématique du consommateur averti.",
    choices: ["Vrai", "Faux"],
    correctChoiceIndex: 0,
    explanation:
      "La thématique D comprend le module D3 : les achats.",
    timeLimitSeconds: 20,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D3 : Les achats",
      sectionOrPage: "Module D3 — achats, consommateur averti",
      conformity: "CONFIRME",
    },
  },
] as const satisfies readonly LiveQuestion[];

export function getLiveQuestion(questionId: string) {
  return LIVE_QUESTION_BANK.find((question) => question.id === questionId) ?? null;
}
