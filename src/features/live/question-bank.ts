export type LiveQuestionType = "true-false" | "single-choice";

import { BLOC2_SEQUENCE1_QUESTION_BANK } from "./bloc2-sequence1-question-bank";

export type LiveQuestionReference = {
  formation: "Bac Pro" | "CAP" | "CAP AAGA";
  level:
    | "Seconde professionnelle"
    | "Première professionnelle"
    | "Terminale professionnelle"
    | "CAP première année"
    | "CAP terminale"
    | "CAP terminale AAGA";
  teachingArea: "PSE" | "Bloc 2";
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

// Five questions per existing module: 45 s to answer + about 15 s to discuss each.
export const LIVE_QUESTION_BANK = [
  {
    id: "pse-bacpro-a1-capital-sante-vf",
    type: "true-false",
    title: "Capital santé",
    prompt: "Le capital santé dépend uniquement de facteurs internes.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "Le référentiel associe le capital santé à des facteurs internes et externes.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — capital santé, facteurs internes et externes",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a1-revision-1",
    type: "single-choice",
    title: "Facteur externe",
    prompt: "Quel élément est un facteur externe pouvant influencer la santé ?",
    choices: [
      "La pollution de l’air",
      "Le patrimoine génétique",
      "L’âge"
    ],
    correctChoiceIndex: 0,
    explanation: "La pollution appartient à l’environnement de la personne : c’est un facteur externe.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — capital santé, facteurs internes et externes",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a1-revision-2",
    type: "single-choice",
    title: "Prévention",
    prompt: "Une campagne encourage le lavage des mains. Quel est son objectif principal ?",
    choices: [
      "Soigner toutes les maladies",
      "Prévenir la transmission de microbes",
      "Remplacer les consultations"
    ],
    correctChoiceIndex: 1,
    explanation: "La prévention vise à éviter ou réduire les risques avant la survenue d’un problème de santé.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — prévention individuelle et collective",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a1-revision-3",
    type: "true-false",
    title: "Solidarité",
    prompt: "Dans un système de santé solidaire, chacun finance uniquement ses propres soins.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "La solidarité repose sur une mise en commun des ressources pour contribuer à la prise en charge des soins.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — solidarité du système de santé",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a1-revision-4",
    type: "single-choice",
    title: "Santé globale",
    prompt: "La santé concerne-t-elle seulement l’absence de maladie physique ?",
    choices: [
      "Oui, uniquement le corps",
      "Oui, uniquement les blessures",
      "Non, elle comporte aussi des dimensions mentale et sociale"
    ],
    correctChoiceIndex: 2,
    explanation: "La santé comprend des dimensions physique, mentale et sociale.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — notion de santé",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a2-sommeil-vf",
    type: "true-false",
    title: "Sommeil",
    prompt: "Les rythmes sociaux peuvent influencer les rythmes biologiques.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module A2 vise l'incidence des rythmes sociaux sur les rythmes biologiques et le sommeil.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A2 : Les rythmes biologiques — le sommeil",
      sectionOrPage: "Module A2 — incidence des rythmes sociaux sur les rythmes biologiques",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a2-sommeil-qcm",
    type: "single-choice",
    title: "Hygiène du sommeil",
    prompt: "Quel comportement favorise le plus un sommeil régulier ?",
    choices: [
      "Se coucher à des heures très variables",
      "Garder des horaires de coucher et de lever réguliers",
      "Rester devant un écran jusqu’à l’endormissement",
      "Repousser le coucher malgré la fatigue"
    ],
    correctChoiceIndex: 1,
    explanation: "Des horaires réguliers contribuent à stabiliser le rythme veille-sommeil.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A2 : Les rythmes biologiques — le sommeil",
      sectionOrPage: "Module A2 — hygiène du sommeil",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a2-revision-1",
    type: "single-choice",
    title: "Vigilance",
    prompt: "Après une nuit trop courte, quel effet peut apparaître en cours ?",
    choices: [
      "Une attention moins soutenue",
      "Une concentration toujours meilleure",
      "Une disparition du besoin de repos"
    ],
    correctChoiceIndex: 0,
    explanation: "Un manque de sommeil peut diminuer la vigilance et la concentration.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A2 : Les rythmes biologiques — le sommeil",
      sectionOrPage: "Module A2 — rôles du sommeil, conséquences du manque de sommeil",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a2-revision-2",
    type: "true-false",
    title: "Rythme biologique",
    prompt: "L’alternance veille-sommeil se répète habituellement sur un rythme proche de 24 heures.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le rythme veille-sommeil est un rythme biologique circadien, proche de 24 heures.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A2 : Les rythmes biologiques — le sommeil",
      sectionOrPage: "Module A2 — rythme biologique, cycle",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a2-revision-3",
    type: "single-choice",
    title: "Horaires décalés",
    prompt: "Pourquoi le travail de nuit peut-il perturber le sommeil ?",
    choices: [
      "Il supprime les besoins de récupération",
      "Il décale les horaires sociaux par rapport au rythme veille-sommeil",
      "Il empêche définitivement de dormir"
    ],
    correctChoiceIndex: 1,
    explanation: "Les horaires de nuit peuvent désynchroniser les rythmes sociaux et biologiques.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module A2 : Les rythmes biologiques — le sommeil",
      sectionOrPage: "Module A2 — rythmes sociaux et biologiques",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b1-alimentation-eco-vf",
    type: "true-false",
    title: "Alimentation écoresponsable",
    prompt: "L'alimentation peut avoir un impact sur le développement durable.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module B1 relie l'alimentation écoresponsable au développement durable.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module B1 : L'alimentation écoresponsable",
      sectionOrPage: "Module B1 — alimentation écoresponsable et développement durable",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b1-revision-1",
    type: "single-choice",
    title: "Gaspillage",
    prompt: "Avant de faire les courses, quelle action aide à limiter le gaspillage alimentaire ?",
    choices: [
      "Acheter systématiquement en grande quantité",
      "Vérifier les stocks et préparer une liste",
      "Choisir uniquement les lots en promotion"
    ],
    correctChoiceIndex: 1,
    explanation: "Vérifier les stocks permet d’acheter des quantités adaptées et d’éviter les doublons.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module B1 : L'alimentation écoresponsable",
      sectionOrPage: "Module B1 — gaspillage alimentaire",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b1-revision-2",
    type: "true-false",
    title: "Circuit court",
    prompt: "Un circuit court limite le nombre d’intermédiaires entre producteur et consommateur.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le circuit court comporte au maximum un intermédiaire ; il ne garantit pas à lui seul une faible distance de transport.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module B1 : L'alimentation écoresponsable",
      sectionOrPage: "Module B1 — circuit court",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b1-revision-3",
    type: "single-choice",
    title: "Saisonnalité",
    prompt: "Quel élément faut-il examiner pour comparer l’impact environnemental de deux fruits ?",
    choices: [
      "Seulement la couleur du fruit",
      "Seulement le dessin sur l’étiquette",
      "Le mode de production, la saison et le transport"
    ],
    correctChoiceIndex: 2,
    explanation: "L’impact dépend de plusieurs étapes, dont la production et le transport.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module B1 : L'alimentation écoresponsable",
      sectionOrPage: "Module B1 — impact environnemental",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b1-revision-4",
    type: "true-false",
    title: "Ressources gaspillées",
    prompt: "Jeter un aliment encore consommable gaspille aussi les ressources utilisées pour le produire.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Produire et transporter un aliment mobilise de l’eau, de l’énergie et d’autres ressources.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_SECONDE_SOURCE,
      level: "Seconde professionnelle",
      module: "Module B1 : L'alimentation écoresponsable",
      sectionOrPage: "Module B1 — gaspillage alimentaire, ressources",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a7-pratiques-alimentaires-qcm",
    type: "single-choice",
    title: "Pratiques alimentaires",
    prompt: "Des horaires de travail décalés peuvent modifier les repas. Que faut-il examiner pour comprendre ces habitudes ?",
    choices: [
      "Le goût des aliments seulement",
      "Les horaires, les choix et leurs effets possibles",
      "La présentation des emballages seulement",
      "Le prix des aliments uniquement"
    ],
    correctChoiceIndex: 1,
    explanation: "Le module A7 traite des pratiques alimentaires, de leurs déterminants et de leurs liens avec la santé.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A7 : Les pratiques alimentaires",
      sectionOrPage: "Module A7 — pratiques alimentaires",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a7-revision-1",
    type: "single-choice",
    title: "Digestion",
    prompt: "Quel est le rôle de la digestion ?",
    choices: [
      "Transformer les aliments pour rendre leurs nutriments utilisables",
      "Transformer tous les aliments en eau",
      "Stocker les aliments sans les modifier"
    ],
    correctChoiceIndex: 0,
    explanation: "La digestion comporte des transformations mécaniques et chimiques permettant l’utilisation des nutriments.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A7 : Les pratiques alimentaires",
      sectionOrPage: "Module A7 — digestion, nutriments",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a7-revision-2",
    type: "single-choice",
    title: "Absorption",
    prompt: "Où se déroule principalement le passage des nutriments vers le milieu intérieur ?",
    choices: [
      "Dans l’œsophage",
      "Dans l’intestin grêle",
      "Dans la bouche"
    ],
    correctChoiceIndex: 1,
    explanation: "La paroi de l’intestin grêle permet l’absorption des nutriments.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A7 : Les pratiques alimentaires",
      sectionOrPage: "Module A7 — absorption intestinale",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a7-revision-3",
    type: "true-false",
    title: "Besoins nutritionnels",
    prompt: "Les besoins nutritionnels sont identiques pour tout le monde, quelle que soit l’activité.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "Les besoins varient notamment avec l’âge, l’activité et l’état physiologique.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A7 : Les pratiques alimentaires",
      sectionOrPage: "Module A7 — besoins nutritionnels",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a7-revision-4",
    type: "single-choice",
    title: "Équilibre alimentaire",
    prompt: "Quel principe aide à couvrir des besoins nutritionnels variés ?",
    choices: [
      "Manger toujours un seul aliment",
      "Supprimer systématiquement un repas",
      "Varier les aliments et adapter les quantités"
    ],
    correctChoiceIndex: 2,
    explanation: "Une alimentation variée et adaptée contribue à couvrir les différents besoins de l’organisme.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A7 : Les pratiques alimentaires",
      sectionOrPage: "Module A7 — équilibre alimentaire",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a8-stress-vf",
    type: "true-false",
    title: "Stress",
    prompt: "Un stress excessif peut avoir des effets physiologiques nocifs.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module A8 indique qu'un stress excessif peut avoir des effets physiologiques nocifs.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A8 : Le stress au quotidien",
      sectionOrPage: "Module A8 — stress aigu, stress chronique et effets physiologiques",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a8-revision-1",
    type: "single-choice",
    title: "Stress aigu",
    prompt: "Quel exemple correspond le mieux à un stress aigu ?",
    choices: [
      "Une tension ponctuelle avant un oral",
      "Une surcharge quotidienne pendant des mois",
      "Une inquiétude durable sans période de repos"
    ],
    correctChoiceIndex: 0,
    explanation: "Le stress aigu correspond à une réaction face à une situation ponctuelle.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A8 : Le stress au quotidien",
      sectionOrPage: "Module A8 — stress aigu et chronique",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a8-revision-2",
    type: "true-false",
    title: "Stress chronique",
    prompt: "Un stress chronique est un stress qui s’installe dans la durée.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "La persistance des contraintes dans le temps distingue le stress chronique d’une réaction ponctuelle.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A8 : Le stress au quotidien",
      sectionOrPage: "Module A8 — stress chronique",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a8-revision-3",
    type: "single-choice",
    title: "Réaction du corps",
    prompt: "Quelle réaction peut accompagner une situation stressante ?",
    choices: [
      "Un arrêt systématique de la digestion pendant plusieurs jours",
      "Une accélération du rythme cardiaque",
      "Une disparition de toutes les émotions"
    ],
    correctChoiceIndex: 1,
    explanation: "Le stress mobilise l’organisme et peut notamment accélérer le rythme cardiaque.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A8 : Le stress au quotidien",
      sectionOrPage: "Module A8 — réactions physiologiques au stress",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a8-revision-4",
    type: "single-choice",
    title: "Prévenir le stress",
    prompt: "Face à une surcharge répétée, quelle démarche aide à agir sur sa cause ?",
    choices: [
      "Cacher la difficulté à tout le monde",
      "Renoncer durablement au repos",
      "Identifier les contraintes et chercher du soutien pour les réduire"
    ],
    correctChoiceIndex: 2,
    explanation: "Repérer les facteurs de stress et mobiliser de l’aide permet de rechercher des solutions adaptées.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module A8 : Le stress au quotidien",
      sectionOrPage: "Module A8 — prévention du stress",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b3-bruit-caracteriser-qcm",
    type: "single-choice",
    title: "Bruit",
    prompt: "Quelles grandeurs permettent de caractériser un son ?",
    choices: [
      "Sa fréquence et son niveau sonore",
      "Sa durée et la distance seulement",
      "Son origine et l’heure seulement",
      "Sa vitesse et le poids de l’appareil"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module B3 demande de caractériser un son par sa fréquence et son niveau d'intensité acoustique.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B3 : Le bruit au quotidien",
      sectionOrPage: "Module B3 — fréquence et niveau d'intensité acoustique",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b3-bruit-sante-vf",
    type: "true-false",
    title: "Bruit et santé",
    prompt: "Le bruit peut avoir des effets sur la santé et sur la vie sociale.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module B3 aborde les effets du bruit sur la santé et sur la vie sociale.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B3 : Le bruit au quotidien",
      sectionOrPage: "Module B3 — effets du bruit",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b3-revision-1",
    type: "single-choice",
    title: "Décibels",
    prompt: "Quelle unité sert à exprimer le niveau sonore ?",
    choices: [
      "Le décibel",
      "Le litre",
      "Le mètre"
    ],
    correctChoiceIndex: 0,
    explanation: "Le niveau sonore s’exprime en décibels ; la fréquence s’exprime en hertz.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B3 : Le bruit au quotidien",
      sectionOrPage: "Module B3 — intensité acoustique, fréquence",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b3-revision-2",
    type: "true-false",
    title: "Exposition",
    prompt: "Pour évaluer le risque lié au bruit, la durée d’exposition compte aussi.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le risque dépend notamment du niveau sonore et du temps d’exposition.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B3 : Le bruit au quotidien",
      sectionOrPage: "Module B3 — durée d’exposition et intensité",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b3-revision-3",
    type: "single-choice",
    title: "Prévention du bruit",
    prompt: "Quelle action réduit l’exposition lors d’une écoute au casque ?",
    choices: [
      "Augmenter le son pour couvrir le bruit ambiant",
      "Baisser le volume et limiter la durée d’écoute",
      "Garder le même volume toute la journée"
    ],
    correctChoiceIndex: 1,
    explanation: "Réduire le niveau sonore et la durée d’écoute diminue l’exposition.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B3 : Le bruit au quotidien",
      sectionOrPage: "Module B3 — prévention et protection contre le bruit",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b4-eau-vf",
    type: "true-false",
    title: "Ressource en eau",
    prompt: "La préservation des ressources en eau est un enjeu de développement durable.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module B4 présente la préservation de l'eau comme un enjeu planétaire contribuant au développement durable.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B4 : L'eau et le développement durable",
      sectionOrPage: "Module B4 — ressources en eau et développement durable",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b4-revision-1",
    type: "true-false",
    title: "Eau douce",
    prompt: "Toute l’eau présente sur Terre est directement disponible pour être bue.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "Une grande partie de l’eau est salée ; l’eau douce disponible doit aussi présenter une qualité adaptée.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B4 : L'eau et le développement durable",
      sectionOrPage: "Module B4 — ressources en eau et limites",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b4-revision-2",
    type: "single-choice",
    title: "Économie d’eau",
    prompt: "Un robinet fuit en permanence. Quelle mesure agit directement sur cette perte ?",
    choices: [
      "Augmenter la pression",
      "Réparer la fuite",
      "Laisser couler davantage"
    ],
    correctChoiceIndex: 1,
    explanation: "Réparer la fuite évite une consommation inutile et continue d’eau.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B4 : L'eau et le développement durable",
      sectionOrPage: "Module B4 — mesures individuelles de préservation",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b4-revision-3",
    type: "true-false",
    title: "Qualité de l’eau",
    prompt: "Préserver l’eau consiste seulement à en consommer moins.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "La préservation porte à la fois sur la quantité disponible et sur la qualité, notamment face aux pollutions.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B4 : L'eau et le développement durable",
      sectionOrPage: "Module B4 — préservation quantitative et qualitative",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b4-revision-4",
    type: "single-choice",
    title: "Eaux usées",
    prompt: "À quoi sert principalement une station d’épuration ?",
    choices: [
      "Traiter les eaux usées avant leur rejet",
      "Transformer l’eau de mer en pétrole",
      "Rendre automatiquement toute eau potable"
    ],
    correctChoiceIndex: 0,
    explanation: "Une station d’épuration réduit la pollution des eaux usées ; ce traitement ne correspond pas à une production d’eau potable.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_PREMIERE_SOURCE,
      level: "Première professionnelle",
      module: "Module B4 : L'eau et le développement durable",
      sectionOrPage: "Module B4 — traitement de l’eau",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a9-securite-alimentaire-qcm",
    type: "single-choice",
    title: "Sécurité alimentaire",
    prompt: "Quels critères permettent d’évaluer la qualité sanitaire d’un aliment ?",
    choices: [
      "La qualité microbiologique et la qualité chimique",
      "Le prix et la taille de la portion",
      "Le goût et la couleur seulement",
      "La provenance et la marque seulement"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module A9 traite notamment de qualité microbiologique, de qualité chimique et d'agents contaminants.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module A9 : La sécurité alimentaire",
      sectionOrPage: "Module A9 — qualité microbiologique, qualité chimique, agent contaminant",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a9-revision-1",
    type: "single-choice",
    title: "Contamination",
    prompt: "Un produit d’entretien se retrouve dans un aliment. De quel type de contamination s’agit-il ?",
    choices: [
      "Microbiologique uniquement",
      "Chimique",
      "Sonore"
    ],
    correctChoiceIndex: 1,
    explanation: "La présence d’un produit d’entretien correspond à une contamination chimique.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module A9 : La sécurité alimentaire",
      sectionOrPage: "Module A9 — qualité chimique, agent contaminant",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a9-revision-2",
    type: "single-choice",
    title: "Chaîne du froid",
    prompt: "Pourquoi faut-il respecter les conditions de réfrigération indiquées sur un aliment ?",
    choices: [
      "Pour éliminer tous les microbes",
      "Pour modifier sa date limite",
      "Pour limiter la multiplication de certains microorganismes"
    ],
    correctChoiceIndex: 2,
    explanation: "Le froid ralentit la multiplication de nombreux microorganismes, sans stériliser l’aliment.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module A9 : La sécurité alimentaire",
      sectionOrPage: "Module A9 — chaîne du froid, conservation",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a9-revision-3",
    type: "true-false",
    title: "Hygiène des mains",
    prompt: "Se laver les mains avant de préparer un repas aide à limiter les contaminations.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le lavage des mains limite le transfert de microorganismes vers les aliments.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module A9 : La sécurité alimentaire",
      sectionOrPage: "Module A9 — lavage des mains",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-a9-revision-4",
    type: "single-choice",
    title: "Allergènes",
    prompt: "À quoi sert l’information sur les allergènes dans un aliment ?",
    choices: [
      "À aider les personnes allergiques à repérer une substance à éviter",
      "À garantir l’absence de tout risque pour tous",
      "À remplacer les conditions de conservation"
    ],
    correctChoiceIndex: 0,
    explanation: "L’identification des allergènes aide les personnes concernées à faire un choix adapté.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module A9 : La sécurité alimentaire",
      sectionOrPage: "Module A9 — allergènes et étiquetage",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b5-energie-vf",
    type: "true-false",
    title: "Énergie",
    prompt: "Le soleil est une source d’énergie renouvelable.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "L’énergie solaire est renouvelable à l’échelle humaine, contrairement aux ressources fossiles.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module B5 : Les ressources en énergie et le développement durable",
      sectionOrPage: "Module B5 — énergies renouvelables et non renouvelables",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b5-revision-1",
    type: "single-choice",
    title: "Source renouvelable",
    prompt: "Quelle source d’énergie est renouvelable ?",
    choices: [
      "Le charbon",
      "Le vent",
      "Le pétrole"
    ],
    correctChoiceIndex: 1,
    explanation: "Le vent est une source renouvelable, contrairement au charbon et au pétrole.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module B5 : Les ressources en énergie et le développement durable",
      sectionOrPage: "Module B5 — énergies renouvelables et non renouvelables",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b5-revision-2",
    type: "true-false",
    title: "Ressource fossile",
    prompt: "Le pétrole se renouvelle assez vite pour compenser notre consommation à l’échelle humaine.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "Le pétrole se forme sur des durées géologiques : il constitue une ressource non renouvelable à notre échelle.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module B5 : Les ressources en énergie et le développement durable",
      sectionOrPage: "Module B5 — ressources épuisables",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b5-revision-3",
    type: "single-choice",
    title: "Consommation",
    prompt: "Quel usage correspond à un poste de consommation énergétique d’un logement ?",
    choices: [
      "Le chauffage",
      "La surface écrite sur le bail",
      "Le numéro de rue"
    ],
    correctChoiceIndex: 0,
    explanation: "Le chauffage, l’eau chaude et les appareils font partie des postes de consommation énergétique.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module B5 : Les ressources en énergie et le développement durable",
      sectionOrPage: "Module B5 — postes de consommation",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-b5-revision-4",
    type: "single-choice",
    title: "Économie d’énergie",
    prompt: "Quel geste évite une consommation inutile ?",
    choices: [
      "Laisser l’éclairage allumé dans une pièce vide",
      "Chauffer avec les fenêtres ouvertes en permanence",
      "Éteindre un éclairage devenu inutile"
    ],
    correctChoiceIndex: 2,
    explanation: "Adapter l’usage de l’éclairage aux besoins évite de consommer de l’énergie sans utilité.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module B5 : Les ressources en énergie et le développement durable",
      sectionOrPage: "Module B5 — mesures individuelles d’économie d’énergie",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-c9-rps-vf",
    type: "true-false",
    title: "Risques psychosociaux",
    prompt: "Les risques psychosociaux peuvent avoir des conséquences sur la santé.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module C9 traite des risques psychosociaux et de leurs conséquences.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module C9 : Les risques psycho-sociaux",
      sectionOrPage: "Module C9 — risques psychosociaux et conséquences",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-c9-revision-1",
    type: "single-choice",
    title: "Facteur de risque",
    prompt: "Quelle situation peut favoriser les risques psychosociaux ?",
    choices: [
      "Des objectifs réalistes et discutés",
      "Une surcharge durable avec peu d’autonomie",
      "Un soutien régulier de l’équipe"
    ],
    correctChoiceIndex: 1,
    explanation: "Une forte charge et un manque d’autonomie peuvent contribuer aux risques psychosociaux.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module C9 : Les risques psycho-sociaux",
      sectionOrPage: "Module C9 — facteurs de risques psychosociaux",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-c9-revision-2",
    type: "true-false",
    title: "Violence externe",
    prompt: "Une agression verbale par un client peut constituer une violence externe au travail.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Une violence provenant d’une personne extérieure à l’entreprise est une violence externe.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module C9 : Les risques psycho-sociaux",
      sectionOrPage: "Module C9 — violences internes et externes",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-c9-revision-3",
    type: "single-choice",
    title: "Prévention collective",
    prompt: "Quelle mesure agit sur l’organisation pour prévenir les RPS ?",
    choices: [
      "Revoir la répartition de la charge de travail",
      "Demander à chacun de cacher ses difficultés",
      "Supprimer les échanges dans l’équipe"
    ],
    correctChoiceIndex: 0,
    explanation: "La prévention collective agit notamment sur l’organisation et les conditions de travail.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module C9 : Les risques psycho-sociaux",
      sectionOrPage: "Module C9 — prévention collective",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-bacpro-c9-revision-4",
    type: "true-false",
    title: "Conséquences",
    prompt: "Les RPS peuvent aussi affecter le fonctionnement de l’entreprise.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Ils peuvent notamment contribuer à l’absentéisme et à la dégradation des relations de travail.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...BAC_PRO_TERMINALE_SOURCE,
      level: "Terminale professionnelle",
      module: "Module C9 : Les risques psycho-sociaux",
      sectionOrPage: "Module C9 — conséquences sur l’entreprise",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a1-capital-sante-vf",
    type: "true-false",
    title: "Capital santé",
    prompt: "Le capital santé peut être influencé par des facteurs internes et externes.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module A1 du programme CAP associe le capital santé aux facteurs internes et externes.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — capital santé, facteur interne, facteur externe",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a1-revision-1",
    type: "single-choice",
    title: "Facteur externe",
    prompt: "Quel élément est un facteur externe pouvant influencer la santé ?",
    choices: [
      "La pollution de l’air",
      "Le patrimoine génétique",
      "L’âge"
    ],
    correctChoiceIndex: 0,
    explanation: "La pollution appartient à l’environnement de la personne : c’est un facteur externe.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — capital santé, facteurs internes et externes",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a1-revision-2",
    type: "single-choice",
    title: "Prévention",
    prompt: "Une campagne encourage le lavage des mains. Quel est son objectif principal ?",
    choices: [
      "Soigner toutes les maladies",
      "Prévenir la transmission de microbes",
      "Remplacer les consultations"
    ],
    correctChoiceIndex: 1,
    explanation: "La prévention vise à éviter ou réduire les risques avant la survenue d’un problème de santé.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — prévention individuelle et collective",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a1-revision-3",
    type: "true-false",
    title: "Solidarité",
    prompt: "Dans un système de santé solidaire, chacun finance uniquement ses propres soins.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "La solidarité repose sur une mise en commun des ressources pour contribuer à la prise en charge des soins.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — solidarité du système de santé",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a1-revision-4",
    type: "single-choice",
    title: "Santé globale",
    prompt: "La santé concerne-t-elle seulement l’absence de maladie physique ?",
    choices: [
      "Oui, uniquement le corps",
      "Oui, uniquement les blessures",
      "Non, elle comporte aussi des dimensions mentale et sociale"
    ],
    correctChoiceIndex: 2,
    explanation: "La santé comprend des dimensions physique, mentale et sociale.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A1 : Le système de santé",
      sectionOrPage: "Module A1 — notion de santé",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a2-sommeil-vf",
    type: "true-false",
    title: "Sommeil",
    prompt: "Le sommeil a un rôle important pour la santé d'un individu.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module A2 vise à démontrer l'importance du rôle du sommeil pour la santé.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A2 : Le sommeil, un rythme biologique",
      sectionOrPage: "Module A2 — rôle du sommeil et santé",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a2-sommeil-qcm",
    type: "single-choice",
    title: "Sommeil récupérateur",
    prompt: "Quelle habitude favorise un sommeil récupérateur ?",
    choices: [
      "Garder des horaires de sommeil réguliers",
      "Décaler fortement le coucher chaque soir",
      "Multiplier les activités stimulantes au coucher",
      "Attendre systématiquement l’épuisement pour dormir"
    ],
    correctChoiceIndex: 0,
    explanation: "Des horaires réguliers et des conditions propices au repos favorisent la récupération.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A2 : Le sommeil, un rythme biologique",
      sectionOrPage: "Module A2 — sommeil récupérateur, hygiène du sommeil",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a2-revision-1",
    type: "single-choice",
    title: "Vigilance",
    prompt: "Après une nuit trop courte, quel effet peut apparaître en cours ?",
    choices: [
      "Une attention moins soutenue",
      "Une concentration toujours meilleure",
      "Une disparition du besoin de repos"
    ],
    correctChoiceIndex: 0,
    explanation: "Un manque de sommeil peut diminuer la vigilance et la concentration.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A2 : Le sommeil, un rythme biologique",
      sectionOrPage: "Module A2 — rôles du sommeil, conséquences du manque de sommeil",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a2-revision-2",
    type: "true-false",
    title: "Rythme biologique",
    prompt: "L’alternance veille-sommeil se répète habituellement sur un rythme proche de 24 heures.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le rythme veille-sommeil est un rythme biologique circadien, proche de 24 heures.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A2 : Le sommeil, un rythme biologique",
      sectionOrPage: "Module A2 — rythme biologique, cycle",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a2-revision-3",
    type: "single-choice",
    title: "Horaires décalés",
    prompt: "Pourquoi le travail de nuit peut-il perturber le sommeil ?",
    choices: [
      "Il supprime les besoins de récupération",
      "Il décale les horaires sociaux par rapport au rythme veille-sommeil",
      "Il empêche définitivement de dormir"
    ],
    correctChoiceIndex: 1,
    explanation: "Les horaires de nuit peuvent désynchroniser les rythmes sociaux et biologiques.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A2 : Le sommeil, un rythme biologique",
      sectionOrPage: "Module A2 — rythmes sociaux et biologiques",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a7-alimentation-vf",
    type: "true-false",
    title: "Alimentation",
    prompt: "L'alimentation doit être adaptée à l'activité de l'individu.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module A7 porte sur l'alimentation adaptée à son activité et les besoins nutritionnels.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A7 : L'alimentation adaptée à son activité",
      sectionOrPage: "Module A7 — alimentation adaptée à l'activité, besoins nutritionnels",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a7-revision-1",
    type: "single-choice",
    title: "Digestion",
    prompt: "Quel est le rôle de la digestion ?",
    choices: [
      "Transformer les aliments pour rendre leurs nutriments utilisables",
      "Transformer tous les aliments en eau",
      "Stocker les aliments sans les modifier"
    ],
    correctChoiceIndex: 0,
    explanation: "La digestion comporte des transformations mécaniques et chimiques permettant l’utilisation des nutriments.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A7 : L'alimentation adaptée à son activité",
      sectionOrPage: "Module A7 — digestion, nutriments",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a7-revision-2",
    type: "single-choice",
    title: "Absorption",
    prompt: "Où se déroule principalement le passage des nutriments vers le milieu intérieur ?",
    choices: [
      "Dans l’œsophage",
      "Dans l’intestin grêle",
      "Dans la bouche"
    ],
    correctChoiceIndex: 1,
    explanation: "La paroi de l’intestin grêle permet l’absorption des nutriments.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A7 : L'alimentation adaptée à son activité",
      sectionOrPage: "Module A7 — absorption intestinale",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a7-revision-3",
    type: "true-false",
    title: "Besoins nutritionnels",
    prompt: "Les besoins nutritionnels sont identiques pour tout le monde, quelle que soit l’activité.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "Les besoins varient notamment avec l’âge, l’activité et l’état physiologique.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A7 : L'alimentation adaptée à son activité",
      sectionOrPage: "Module A7 — besoins nutritionnels",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-a7-revision-4",
    type: "single-choice",
    title: "Équilibre alimentaire",
    prompt: "Quel principe aide à couvrir des besoins nutritionnels variés ?",
    choices: [
      "Manger toujours un seul aliment",
      "Supprimer systématiquement un repas",
      "Varier les aliments et adapter les quantités"
    ],
    correctChoiceIndex: 2,
    explanation: "Une alimentation variée et adaptée contribue à couvrir les différents besoins de l’organisme.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module A7 : L'alimentation adaptée à son activité",
      sectionOrPage: "Module A7 — équilibre alimentaire",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-b1-eau-vf",
    type: "true-false",
    title: "Ressources en eau",
    prompt: "L’eau douce disponible est inégalement répartie sur la planète.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Les ressources en eau et leur accessibilité varient selon les territoires.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B1 : Les ressources en eau",
      sectionOrPage: "Module B1 — ressources en eau",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-b1-revision-1",
    type: "true-false",
    title: "Eau douce",
    prompt: "Toute l’eau présente sur Terre est directement disponible pour être bue.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "Une grande partie de l’eau est salée ; l’eau douce disponible doit aussi présenter une qualité adaptée.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B1 : Les ressources en eau",
      sectionOrPage: "Module B1 — ressources en eau et limites",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-b1-revision-2",
    type: "single-choice",
    title: "Économie d’eau",
    prompt: "Un robinet fuit en permanence. Quelle mesure agit directement sur cette perte ?",
    choices: [
      "Augmenter la pression",
      "Réparer la fuite",
      "Laisser couler davantage"
    ],
    correctChoiceIndex: 1,
    explanation: "Réparer la fuite évite une consommation inutile et continue d’eau.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B1 : Les ressources en eau",
      sectionOrPage: "Module B1 — mesures individuelles de préservation",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-b1-revision-3",
    type: "true-false",
    title: "Qualité de l’eau",
    prompt: "Préserver l’eau consiste seulement à en consommer moins.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "La préservation porte à la fois sur la quantité disponible et sur la qualité, notamment face aux pollutions.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B1 : Les ressources en eau",
      sectionOrPage: "Module B1 — préservation quantitative et qualitative",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-b1-revision-4",
    type: "single-choice",
    title: "Eaux usées",
    prompt: "À quoi sert principalement une station d’épuration ?",
    choices: [
      "Traiter les eaux usées avant leur rejet",
      "Transformer l’eau de mer en pétrole",
      "Rendre automatiquement toute eau potable"
    ],
    correctChoiceIndex: 0,
    explanation: "Une station d’épuration réduit la pollution des eaux usées ; ce traitement ne correspond pas à une production d’eau potable.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B1 : Les ressources en eau",
      sectionOrPage: "Module B1 — traitement de l’eau",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-b4-bruit-qcm",
    type: "single-choice",
    title: "Bruit au quotidien",
    prompt: "Quelles grandeurs permettent de caractériser un son ?",
    choices: [
      "Sa fréquence et son niveau sonore",
      "Sa durée et la distance seulement",
      "Son origine et l’heure seulement",
      "Sa vitesse et le poids de l’appareil"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module B4 amène à caractériser le bruit par sa fréquence et son niveau d'intensité acoustique.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B4 : Le bruit au quotidien",
      sectionOrPage: "Module B4 — fréquence, niveau d'intensité acoustique",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-b4-revision-1",
    type: "single-choice",
    title: "Décibels",
    prompt: "Quelle unité sert à exprimer le niveau sonore ?",
    choices: [
      "Le décibel",
      "Le litre",
      "Le mètre"
    ],
    correctChoiceIndex: 0,
    explanation: "Le niveau sonore s’exprime en décibels ; la fréquence s’exprime en hertz.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B4 : Le bruit au quotidien",
      sectionOrPage: "Module B4 — intensité acoustique, fréquence",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-b4-revision-2",
    type: "true-false",
    title: "Exposition",
    prompt: "Pour évaluer le risque lié au bruit, la durée d’exposition compte aussi.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le risque dépend notamment du niveau sonore et du temps d’exposition.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B4 : Le bruit au quotidien",
      sectionOrPage: "Module B4 — durée d’exposition et intensité",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-b4-revision-3",
    type: "single-choice",
    title: "Prévention du bruit",
    prompt: "Quelle action réduit l’exposition lors d’une écoute au casque ?",
    choices: [
      "Augmenter le son pour couvrir le bruit ambiant",
      "Baisser le volume et limiter la durée d’écoute",
      "Garder le même volume toute la journée"
    ],
    correctChoiceIndex: 1,
    explanation: "Réduire le niveau sonore et la durée d’écoute diminue l’exposition.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B4 : Le bruit au quotidien",
      sectionOrPage: "Module B4 — prévention et protection contre le bruit",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-b4-revision-4",
    type: "single-choice",
    title: "Son aigu",
    prompt: "Deux sons ont le même niveau sonore. Celui dont la fréquence est plus élevée est…",
    choices: [
      "Plus grave",
      "Nécessairement plus fort",
      "Plus aigu"
    ],
    correctChoiceIndex: 2,
    explanation: "La fréquence détermine la hauteur du son : plus elle est élevée, plus le son est aigu.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP première année",
      module: "Module B4 : Le bruit au quotidien",
      sectionOrPage: "Module B4 — fréquence et hauteur du son",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c1-contrat-travail-vf",
    type: "true-false",
    title: "Contrats de travail",
    prompt: "Un CDI ne prévoit pas de date de fin dès sa conclusion.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le contrat à durée indéterminée ne fixe pas de terme dès sa conclusion. Il peut toutefois être rompu selon les règles applicables.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C1 : Les différents contrats de travail",
      sectionOrPage: "Module C1 — différentes formes de contrat de travail",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c1-revision-1",
    type: "single-choice",
    title: "CDD",
    prompt: "Que signifie le sigle CDD ?",
    choices: [
      "Contrat à durée déterminée",
      "Contrat de disponibilité définitive",
      "Convention de devoirs disciplinaires"
    ],
    correctChoiceIndex: 0,
    explanation: "CDD signifie contrat à durée déterminée, à distinguer du CDI.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C1 : Les différents contrats de travail",
      sectionOrPage: "Module C1 — CDI et CDD",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c1-revision-2",
    type: "true-false",
    title: "Apprentissage",
    prompt: "Un contrat d’apprentissage associe formation et activité en entreprise.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "L’apprentissage est un contrat de travail en alternance entre formation théorique et pratique en entreprise.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C1 : Les différents contrats de travail",
      sectionOrPage: "Module C1 — contrat d’apprentissage",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c1-revision-3",
    type: "single-choice",
    title: "Droits et obligations",
    prompt: "Quel élément correspond à une obligation de l’employeur ?",
    choices: [
      "Choisir les loisirs du salarié",
      "Verser la rémunération due pour le travail",
      "Supprimer les règles de sécurité"
    ],
    correctChoiceIndex: 1,
    explanation: "Le paiement de la rémunération fait partie des obligations de l’employeur.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C1 : Les différents contrats de travail",
      sectionOrPage: "Module C1 — droits et obligations du contrat",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c1-revision-4",
    type: "single-choice",
    title: "Lire son contrat",
    prompt: "Avant de signer un contrat, que faut-il faire si une clause est incomprise ?",
    choices: [
      "Signer sans la lire",
      "Se fier uniquement au titre du document",
      "Demander une explication sur son contenu"
    ],
    correctChoiceIndex: 2,
    explanation: "Comprendre les clauses permet d’identifier les engagements, droits et obligations liés au contrat.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C1 : Les différents contrats de travail",
      sectionOrPage: "Module C1 — droits et obligations du contrat",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c2-sante-securite-vf",
    type: "true-false",
    title: "Santé et sécurité au travail",
    prompt: "Les accidents du travail et les maladies professionnelles font partie des enjeux de santé et sécurité au travail.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module C2 traite des enjeux de santé et sécurité au travail, dont les accidents du travail et maladies professionnelles.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C2 : Les enjeux de la santé et sécurité au travail",
      sectionOrPage: "Module C2 — accident du travail, maladie professionnelle",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c2-revision-1",
    type: "single-choice",
    title: "Enjeu humain",
    prompt: "Quelle conséquence d’un accident correspond à un enjeu humain ?",
    choices: [
      "La souffrance et les blessures",
      "Le coût de réparation d’une machine",
      "La perte de production uniquement"
    ],
    correctChoiceIndex: 0,
    explanation: "Les enjeux humains concernent les atteintes à la santé et à la qualité de vie.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C2 : Les enjeux de la santé et sécurité au travail",
      sectionOrPage: "Module C2 — enjeux humains et socio-économiques",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c2-revision-2",
    type: "true-false",
    title: "Exposition répétée",
    prompt: "Une exposition répétée à un danger peut contribuer à une maladie professionnelle.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Certaines maladies professionnelles résultent d’une exposition prolongée ou répétée dans le cadre du travail.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C2 : Les enjeux de la santé et sécurité au travail",
      sectionOrPage: "Module C2 — maladie professionnelle, exposition",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c2-revision-3",
    type: "single-choice",
    title: "Nouveau poste",
    prompt: "Une personne arrive sur un poste qu’elle ne connaît pas. Quelle mesure est adaptée ?",
    choices: [
      "La laisser improviser",
      "Lui expliquer les risques et les consignes avant l’activité",
      "Attendre un incident pour la former"
    ],
    correctChoiceIndex: 1,
    explanation: "L’accueil et l’information sur les risques contribuent à la prévention dès la prise de poste.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C2 : Les enjeux de la santé et sécurité au travail",
      sectionOrPage: "Module C2 — nouvel embauché, prévention",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c2-revision-4",
    type: "true-false",
    title: "Prévenir ensemble",
    prompt: "La santé et la sécurité au travail concernent uniquement les salariés expérimentés.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "La prévention concerne tous les travailleurs, y compris les jeunes et les nouveaux arrivants.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C2 : Les enjeux de la santé et sécurité au travail",
      sectionOrPage: "Module C2 — responsabilités et prévention",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c3-demarche-prevention-qcm",
    type: "single-choice",
    title: "Démarche de prévention",
    prompt: "Dans la démarche de prévention, que cherche-t-on à identifier au poste de travail ?",
    choices: [
      "Les dangers et les dommages possibles",
      "Uniquement la durée des pauses",
      "Seulement le coût du matériel",
      "Uniquement le résultat attendu"
    ],
    correctChoiceIndex: 0,
    explanation: "Le module C3 vise à analyser l'activité de travail pour identifier les dangers potentiels et risques associés.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C3 : La démarche de prévention appliquée à une activité de travail",
      sectionOrPage: "Module C3 — dangers potentiels, risques, poste de travail",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c3-revision-1",
    type: "single-choice",
    title: "Danger",
    prompt: "Une lame coupante non protégée est un exemple de…",
    choices: [
      "Dommage déjà subi",
      "Danger",
      "Mesure de protection"
    ],
    correctChoiceIndex: 1,
    explanation: "Un danger est une source susceptible de provoquer un dommage ; ici, la lame peut couper.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C3 : La démarche de prévention appliquée à une activité de travail",
      sectionOrPage: "Module C3 — danger et dommage",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c3-revision-2",
    type: "single-choice",
    title: "Dommage",
    prompt: "Après une chute sur un sol glissant, une personne se fracture le poignet. Quel est le dommage ?",
    choices: [
      "Le sol glissant",
      "Le déplacement",
      "La fracture"
    ],
    correctChoiceIndex: 2,
    explanation: "Le dommage est l’atteinte à la santé ; le sol glissant est à l’origine de la situation dangereuse.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C3 : La démarche de prévention appliquée à une activité de travail",
      sectionOrPage: "Module C3 — danger et dommage",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c3-revision-3",
    type: "true-false",
    title: "Analyser une activité",
    prompt: "Pour comprendre une situation de travail, il faut observer aussi le matériel et le milieu.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "L’analyse porte sur l’individu, la tâche, le matériel et le milieu, pas seulement sur la personne.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C3 : La démarche de prévention appliquée à une activité de travail",
      sectionOrPage: "Module C3 — composantes d’une activité de travail",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c3-revision-4",
    type: "single-choice",
    title: "Consigne de sécurité",
    prompt: "Une consigne de sécurité est incomprise. Quel comportement est adapté ?",
    choices: [
      "Demander une explication avant de commencer",
      "L’ignorer si l’activité paraît rapide",
      "Essayer au hasard"
    ],
    correctChoiceIndex: 0,
    explanation: "Faire préciser la consigne permet de comprendre le risque et d’appliquer la prévention adaptée.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C3 : La démarche de prévention appliquée à une activité de travail",
      sectionOrPage: "Module C3 — consignes de sécurité",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c8-urgence-vf",
    type: "true-false",
    title: "Situation d'urgence",
    prompt: "Lors d’une alerte, il faut décrire le lieu et ce que l’on observe de l’état de la victime.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Une alerte précise aide les secours à adapter leur intervention. Il faut suivre les instructions de l’interlocuteur.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C8 : La gestion des situations d'urgence",
      sectionOrPage: "Module C8 — premiers secours en attendant l'arrivée des secours",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c8-revision-1",
    type: "single-choice",
    title: "Suraccident",
    prompt: "Pourquoi faut-il protéger les personnes présentes avant d’intervenir ?",
    choices: [
      "Pour éviter un nouvel accident",
      "Pour retarder systématiquement les secours",
      "Pour cacher la situation"
    ],
    correctChoiceIndex: 0,
    explanation: "La protection vise à éviter qu’un danger persistant ne blesse la victime, les témoins ou le secouriste.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C8 : La gestion des situations d'urgence",
      sectionOrPage: "Module C8 — protection et suraccident",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c8-revision-2",
    type: "single-choice",
    title: "Alerte précise",
    prompt: "Quelle information est essentielle pour guider les secours ?",
    choices: [
      "Le métier préféré du témoin",
      "Le lieu précis de l’accident",
      "La marque des vêtements"
    ],
    correctChoiceIndex: 1,
    explanation: "Une localisation précise aide les secours à trouver la victime rapidement.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C8 : La gestion des situations d'urgence",
      sectionOrPage: "Module C8 — alerte, éléments descriptifs",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c8-revision-3",
    type: "true-false",
    title: "Se protéger",
    prompt: "Pour aider une victime, il faut toujours entrer dans une zone dangereuse, même sans protection.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "Il faut éviter de devenir une victime supplémentaire et alerter sans s’exposer au danger.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C8 : La gestion des situations d'urgence",
      sectionOrPage: "Module C8 — protection du secouriste",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-c8-revision-4",
    type: "true-false",
    title: "Formation pratique",
    prompt: "Répondre correctement à un quiz suffit pour remplacer une formation pratique aux premiers secours.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "Un quiz révise les connaissances ; l’apprentissage des gestes nécessite une formation pratique adaptée.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module C8 : La gestion des situations d'urgence",
      sectionOrPage: "Module C8 — formation SST, gestes de premiers secours",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-d2-budget-vf",
    type: "true-false",
    title: "Budget",
    prompt: "Un budget est équilibré lorsque les recettes sont égales aux dépenses.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Un budget équilibré a un solde nul : les recettes couvrent exactement les dépenses.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D2 : Le budget",
      sectionOrPage: "Module D2 — budget, consommateur averti",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-d2-revision-1",
    type: "single-choice",
    title: "Recette",
    prompt: "Dans un budget, un salaire reçu est…",
    choices: [
      "Une dépense",
      "Une recette",
      "Un emprunt obligatoire"
    ],
    correctChoiceIndex: 1,
    explanation: "Une recette est une somme reçue ; un salaire est un revenu lié au travail.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D2 : Le budget",
      sectionOrPage: "Module D2 — recettes et dépenses",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-d2-revision-2",
    type: "single-choice",
    title: "Calcul du solde",
    prompt: "Un budget prévoit 900 € de recettes et 750 € de dépenses. Quel est le solde ?",
    choices: [
      "Un déficit de 150 €",
      "Un excédent de 150 €",
      "Un solde nul"
    ],
    correctChoiceIndex: 1,
    explanation: "900 − 750 = 150 € : les recettes dépassent les dépenses.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D2 : Le budget",
      sectionOrPage: "Module D2 — budget équilibré, déficitaire et excédentaire",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-d2-revision-3",
    type: "single-choice",
    title: "Épargne de précaution",
    prompt: "À quoi sert principalement une épargne de précaution ?",
    choices: [
      "À remplacer définitivement tous les revenus",
      "À rendre toutes les dépenses obligatoires",
      "À faire face à des dépenses imprévues"
    ],
    correctChoiceIndex: 2,
    explanation: "Mettre de côté une réserve aide à absorber un imprévu sans déséquilibrer immédiatement le budget.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D2 : Le budget",
      sectionOrPage: "Module D2 — épargne de précaution",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-d2-revision-4",
    type: "true-false",
    title: "Coût du crédit",
    prompt: "Comparer uniquement les mensualités suffit pour connaître le coût total de deux crédits.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 1,
    explanation: "Il faut aussi examiner la durée, les frais et le montant total à rembourser.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D2 : Le budget",
      sectionOrPage: "Module D2 — crédit, mensualités, coût",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-d3-achats-vf",
    type: "true-false",
    title: "Achats",
    prompt: "Avant un achat, comparer le produit à son besoin et à son budget aide à faire un choix réfléchi.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Définir ses critères évite de décider uniquement sous l’effet d’une publicité ou d’une promotion.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D3 : Les achats",
      sectionOrPage: "Module D3 — achats, consommateur averti",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-d3-revision-1",
    type: "single-choice",
    title: "Comparer les prix",
    prompt: "Deux paquets ont des poids différents. Quelle information aide à comparer leur prix ?",
    choices: [
      "Le prix au kilogramme",
      "La couleur de l’emballage",
      "Le nombre de lettres de la marque"
    ],
    correctChoiceIndex: 0,
    explanation: "Le prix à l’unité de mesure permet de comparer des conditionnements différents.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D3 : Les achats",
      sectionOrPage: "Module D3 — critères de choix",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-d3-revision-2",
    type: "single-choice",
    title: "Achat en ligne",
    prompt: "Un article coûte 20 € avec 6 € de livraison. Quel montant faut-il comparer à une offre en magasin ?",
    choices: [
      "20 €",
      "6 €",
      "26 €"
    ],
    correctChoiceIndex: 2,
    explanation: "Les frais de livraison font partie du montant payé pour cette commande.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D3 : Les achats",
      sectionOrPage: "Module D3 — achats en ligne, critères de choix",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-d3-revision-3",
    type: "true-false",
    title: "Conditions de vente",
    prompt: "Avant un achat en ligne, il est utile de lire les conditions de livraison et de retour.",
    choices: [
      "Vrai",
      "Faux"
    ],
    correctChoiceIndex: 0,
    explanation: "Les conditions de vente permettent de comprendre les engagements et les modalités de l’achat.",
    timeLimitSeconds: 45,
    points: 100,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D3 : Les achats",
      sectionOrPage: "Module D3 — conditions générales de vente",
      conformity: "CONFIRME"
    }
  },
  {
    id: "pse-cap-d3-revision-4",
    type: "single-choice",
    title: "Étiquette",
    prompt: "Quelle information d’une étiquette aide à conserver correctement un aliment ?",
    choices: [
      "Le slogan publicitaire",
      "Les conditions de stockage",
      "La couleur du logo"
    ],
    correctChoiceIndex: 1,
    explanation: "Les indications de stockage précisent les conditions de conservation à respecter.",
    timeLimitSeconds: 45,
    points: 120,
    track: "CORE",
    contextMode: "general-pse",
    reference: {
      ...CAP_SOURCE,
      level: "CAP terminale",
      module: "Module D3 : Les achats",
      sectionOrPage: "Module D3 — étiquetage, stockage",
      conformity: "CONFIRME"
    }
  },
  ...BLOC2_SEQUENCE1_QUESTION_BANK,
] as const satisfies readonly LiveQuestion[];

export function getLiveQuestion(questionId: string) {
  return LIVE_QUESTION_BANK.find((question) => question.id === questionId) ?? null;
}

/** One bounded five-question quiz per formation, level and module. */
export function getLiveQuestionModules() {
  const groups = new Map<string, {
    id: string;
    label: string;
    questions: LiveQuestion[];
  }>();
  for (const question of LIVE_QUESTION_BANK) {
    const { formation, level, module } = question.reference;
    const label = `${formation} · ${level} · ${module}`;
    let group = groups.get(label);
    if (!group) {
      group = { id: question.id, label, questions: [] };
      groups.set(label, group);
    }
    group.questions.push(question);
  }
  return Array.from(groups.values());
}

export function selectLiveQuestionModule(rawId: unknown) {
  const modules = getLiveQuestionModules();
  return modules.find((module) => module.id === rawId) ?? modules[0];
}
