import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

// Séquence PSE de terminale professionnelle — module C11 « L'analyse d'une
// situation de travail » du programme de PSE en baccalauréat professionnel.
//
// Les classes de terminale suivent la même séquence, en quatre séances : seul
// le contexte professionnel change. Ce module porte la séquence,
// pse-taero-c11.ts et pse-ttci-c11.ts portent le contexte.
//
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero-c11.md et
// docs/mapping-pedagogique-t-tci-c11.md

export type TerminaleC11Context = {
  classroom: "T AERO" | "T TCI";
  /** Nom de l'atelier fil rouge, tel qu'il apparaît dans les cours. */
  place: string;
  /** Élève ou salarié du fil rouge. */
  learner: string;
};

const verbsActivity: InitialActivity = {
  title: "Décodage des consignes : les verbes de la séquence",
  type: "matching",
  instructions: "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
  payload: {
    prompt: "Chaque verbe de consigne attend une production précise. Relie chaque verbe à son sens exact.",
    pairs: [
      { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
      { id: "deduire", left: "Déduire", right: "Établir une conséquence logique" },
      { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
      { id: "proposer", left: "Proposer", right: "Suggérer une solution au regard d’un problème identifié" },
      { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
      { id: "argumenter", left: "Argumenter", right: "Donner des critères et des arguments pour justifier un choix" },
    ],
    explanation:
      "Ces six verbes sont ceux des consignes de la séquence, et ceux de l’épreuve. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
  },
};

export function buildPseTerminaleC11Sequence(context: TerminaleC11Context): InitialLearningSequence {
  return {
    title: "C11. L'analyse d'une situation de travail",
    description: `Tu vas apprendre une méthode complète pour observer une situation de travail, relier ses causes à ses effets, puis proposer et argumenter une mesure de prévention, à partir de situations de l’atelier ${context.place}.`,
    lessons: [
      {
        title: "Travail réel et travail prescrit",
        description: "Répertorier les composantes d’une situation de travail, en distinguant le travail prescrit et le travail réel.",
        activities: [
          verbsActivity,
          {
            title: "À retenir : ce qui est prévu, ce qui est fait",
            type: "content",
            instructions: "Répertorier de manière exhaustive les composantes d’une situation de travail.",
            payload: {
              body: `À l’atelier ${context.place}, on demande d’observer un poste sans confondre la procédure et ce qui est réellement fait.\n\nLe travail prescrit est le travail prévu par la consigne, la procédure ou la fiche de poste.\n\nLe travail réel est le travail effectivement réalisé dans les conditions du moment : il peut s’écarter du travail prescrit, par exemple quand une contrainte imprévue oblige à adapter un geste.\n\nUn déterminant est un élément qui concerne la personne, la tâche, le matériel, le milieu ou l’organisation : ce sont les composantes à répertorier pour comprendre une situation de travail.\n\nL’ergonomie est l’adaptation du travail aux capacités humaines : elle s’appuie justement sur l’observation du travail réel, pas seulement du travail prescrit, pour proposer des solutions qui tiennent compte de l’opérateur.`,
            },
          },
          {
            title: "Jeu : prescrit ou réel",
            type: "sorting",
            instructions: "Classer chaque élément selon qu’il relève du travail prescrit ou du travail réel.",
            payload: {
              prompt: "Classe chaque élément observé dans une situation de travail.",
              categories: [
                { id: "prescrit", label: "Travail prescrit" },
                { id: "reel", label: "Travail réel" },
              ],
              items: [
                { id: "procedure", label: "La procédure écrite affichée au poste", categoryId: "prescrit" },
                { id: "ficheposte", label: "La fiche de poste officielle", categoryId: "prescrit" },
                { id: "adaptation", label: "Le geste réellement adapté face à une pièce mal positionnée", categoryId: "reel" },
                { id: "contournement", label: "Un raccourci pris pour tenir les délais ce jour-là", categoryId: "reel" },
              ],
              explanation:
                "Le travail prescrit est ce qui est écrit ou prévu. Le travail réel est ce qui se passe effectivement, qui peut s’en écarter selon les conditions du moment.",
            },
          },
          {
            title: "Jeu : le lexique de l’analyse du travail",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "prescrit", left: "Travail prescrit", right: "Travail prévu par la consigne, la procédure ou la fiche de poste" },
                { id: "reel", left: "Travail réel", right: "Travail effectivement réalisé dans les conditions du moment" },
                { id: "determinant", left: "Déterminant", right: "Élément concernant la personne, la tâche, le matériel, le milieu ou l’organisation" },
                { id: "ergonomie", left: "Ergonomie", right: "Adaptation du travail aux capacités humaines" },
              ],
              explanation:
                "Ces quatre mots sont ceux attendus à l’épreuve. Observer une situation commence toujours par distinguer prescrit et réel.",
            },
          },
          {
            title: "Défi 01 : cinq questions pour observer",
            type: "qcm",
            instructions: "Identifier les catégories de déterminants à répertorier.",
            payload: {
              question: "Parmi les déterminants d’une situation de travail, laquelle de ces listes est correcte ?",
              choices: [
                { id: "bon", label: "La personne, la tâche, le matériel, le milieu, l’organisation" },
                { id: "incomplet", label: "Uniquement le matériel utilisé" },
                { id: "hors", label: "Le salaire et les horaires de pause, uniquement" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Les cinq catégories de déterminants couvrent la personne, la tâche, le matériel, le milieu et l’organisation : une analyse exhaustive les répertorie toutes.",
            },
          },
          {
            title: "Vrai ou faux : travail réel et travail prescrit sont identiques",
            type: "true_false",
            instructions: "Justifier que le travail réel peut différer du travail prescrit.",
            payload: {
              statement: "Le travail réel correspond toujours exactement au travail prescrit.",
              correctAnswer: false,
              explanation: "Faux : le travail réel peut s’écarter du travail prescrit selon les conditions du moment. C’est justement ce qu’une analyse de situation de travail doit observer.",
            },
          },
        ],
      },
      {
        title: "Relier causes et effets",
        description: `Mettre en évidence la relation entre un effet constaté et les facteurs de cause, à partir de la situation de ${context.learner}.`,
        activities: [
          {
            title: "À retenir : un effet, plusieurs causes",
            type: "content",
            instructions: "Mettre en évidence la relation entre un effet constaté et les facteurs de cause dans la situation de travail.",
            payload: {
              body: `${context.learner} a mal à l’épaule après plusieurs opérations répétées. Plusieurs facteurs se cumulent dans sa situation.\n\nUn effet est une conséquence observée sur la personne ou sur l’activité : une douleur, une erreur, un retard.\n\nLa causalité est une relation argumentée entre des facteurs et un effet : elle se construit avec des faits précis, jamais avec une simple impression.\n\nUn effet est souvent multifactoriel, c’est-à-dire qu’il résulte de plusieurs facteurs associés : posture, durée, répétition, outil utilisé, organisation du poste peuvent tous contribuer au même effet.\n\nUn schéma qui relie les causes à l’effet évite une explication unique et superficielle. Il permet de voir comment plusieurs déterminants se combinent pour produire ce qui est observé.`,
            },
          },
          {
            title: "Jeu : le lexique de la causalité",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "effet", left: "Effet", right: "Conséquence observée sur la personne ou l’activité" },
                { id: "causalite", left: "Causalité", right: "Relation argumentée entre des facteurs et un effet" },
                { id: "multifactoriel", left: "Multifactoriel", right: "Qui résulte de plusieurs facteurs associés" },
                { id: "determinant", left: "Déterminant", right: "Élément concernant la personne, la tâche, le matériel, le milieu ou l’organisation" },
              ],
              explanation:
                "L’effet est ce qu’on observe. La causalité relie cet effet aux facteurs qui l’expliquent, souvent plusieurs à la fois.",
            },
          },
          {
            title: "Jeu : effet ou facteur de cause",
            type: "sorting",
            instructions: "Classer chaque élément selon qu’il est un effet observé ou un facteur de cause.",
            payload: {
              prompt: "Classe chaque élément d’une situation de travail.",
              categories: [
                { id: "effet", label: "Effet observé" },
                { id: "cause", label: "Facteur de cause" },
              ],
              items: [
                { id: "douleur", label: "Une douleur à l’épaule ressentie après le poste", categoryId: "effet" },
                { id: "erreur", label: "Une erreur détectée sur la pièce finie", categoryId: "effet" },
                { id: "posture", label: "Une posture maintenue les bras levés", categoryId: "cause" },
                { id: "repetition", label: "La répétition du même geste tout au long de la journée", categoryId: "cause" },
                { id: "outil", label: "Un outil mal adapté à la tâche", categoryId: "cause" },
              ],
              explanation:
                "L’effet est ce qu’on constate à la fin. Les facteurs de cause sont ce qui, dans l’organisation du travail, explique cet effet.",
            },
          },
          {
            title: "Défi 02 : plusieurs facteurs, un seul effet",
            type: "qcm",
            instructions: "Expliquer la notion d’effet multifactoriel.",
            payload: {
              question: "Qu’est-ce qu’un effet « multifactoriel » ?",
              choices: [
                { id: "bon", label: "Un effet qui résulte de plusieurs facteurs associés" },
                { id: "unique", label: "Un effet qui ne peut avoir qu’une seule cause" },
                { id: "aucun", label: "Un effet sans aucune cause identifiable" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "La plupart des effets observés en situation de travail résultent de plusieurs facteurs combinés, pas d’une cause isolée.",
            },
          },
          {
            title: "Vrai ou faux : la causalité se construit sur une impression",
            type: "true_false",
            instructions: "Justifier ce sur quoi repose une relation de causalité valable.",
            payload: {
              statement: "Une relation de causalité valable peut se construire sur une simple impression, sans fait précis.",
              correctAnswer: false,
              explanation: "Faux : la causalité se construit avec des faits précis, observés dans la situation. Une impression seule ne suffit pas à l’épreuve.",
            },
          },
        ],
      },
      {
        title: "Choisir et argumenter des mesures",
        description: "Proposer une mesure de prévention visant la suppression ou la réduction du risque, et l’argumenter.",
        activities: [
          {
            title: "À retenir : une mesure, un argument",
            type: "content",
            instructions: "Proposer une mesure de prévention visant la suppression ou la réduction du risque.",
            payload: {
              body: `${context.place} compare un support réglable, une rotation des tâches et des équipements de protection pour le poste observé.\n\nUne mesure prioritaire agit sur la cause identifiée, pas seulement sur la conséquence.\n\nLa hiérarchie de prévention est l’ordre qui privilégie la suppression du risque, puis sa réduction, puis la protection collective, avant la protection individuelle (EPI). La formation et l’information complètent ce dispositif pour le risque qui reste.\n\nUn argument, en PSE, est une justification fondée sur des faits et des documents : il cite le fait constaté, la mesure proposée, et l’effet attendu sur le travail réel.\n\nProposer une mesure sans l’argumenter ne suffit pas à l’épreuve : il faut relier explicitement la mesure au facteur de cause qu’elle corrige.`,
            },
          },
          {
            title: "Jeu : le lexique du choix des mesures",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "hierarchie", left: "Hiérarchie de prévention", right: "Ordre qui privilégie suppression, réduction et protection collective avant l’EPI" },
                { id: "collective", left: "Protection collective", right: "Mesure qui agit sur l’organisation ou protège plusieurs personnes" },
                { id: "argument", left: "Argument", right: "Justification fondée sur des faits et des documents" },
                { id: "reel", left: "Travail réel", right: "Travail effectivement réalisé dans les conditions du moment" },
              ],
              explanation:
                "Ces quatre mots structurent la réponse attendue : choisir une mesure selon la hiérarchie de prévention, puis l’argumenter avec des faits.",
            },
          },
          {
            title: "Jeu : un bon argument ou un argument incomplet",
            type: "sorting",
            instructions: "Classer chaque proposition selon qu’elle constitue un argument complet ou un argument incomplet.",
            payload: {
              prompt: "Classe chaque proposition.",
              categories: [
                { id: "complet", label: "Argument complet" },
                { id: "incomplet", label: "Argument incomplet" },
              ],
              items: [
                { id: "complet1", label: "« Le port répété de charges provoque la douleur ; un support réglable réduirait l’effort, donc la douleur diminuerait. »", categoryId: "complet" },
                { id: "incomplet1", label: "« Il faudrait mettre des protections, c’est mieux. »", categoryId: "incomplet" },
                { id: "incomplet2", label: "« Le salarié devrait faire plus attention. »", categoryId: "incomplet" },
              ],
              explanation:
                "Un argument complet cite le fait, relie la mesure au facteur de cause, et annonce l’effet attendu. Une simple opinion ne suffit pas.",
            },
          },
          {
            title: "Défi 03 : quelle mesure vient en premier",
            type: "qcm",
            instructions: "Identifier la mesure à privilégier selon la hiérarchie de prévention.",
            payload: {
              question: "Entre un support réglable qui supprime une contrainte et une protection individuelle, laquelle choisir en priorité ?",
              choices: [
                { id: "support", label: "Le support réglable, qui agit sur la cause avant la protection individuelle" },
                { id: "epi", label: "La protection individuelle, toujours en priorité" },
                { id: "aucune", label: "Aucune des deux : seule la formation compte" },
              ],
              correctChoiceIds: ["support"],
              explanation:
                "La hiérarchie de prévention place la suppression ou la réduction du risque avant la protection individuelle, qui vient compléter ce qui reste.",
            },
          },
          {
            title: "Vrai ou faux : une mesure non argumentée suffit",
            type: "true_false",
            instructions: "Justifier la nécessité d’argumenter une mesure de prévention proposée.",
            payload: {
              statement: "Proposer une mesure de prévention suffit, sans avoir besoin de l’argumenter avec des faits.",
              correctAnswer: false,
              explanation: "Faux : l’argumentation relie la mesure au fait observé et à l’effet attendu. Sans elle, la mesure reste une opinion, pas une proposition justifiée.",
            },
          },
        ],
      },
      {
        title: "Entraînement intensif au bac",
        description: "Appliquer la méthode complète d’analyse en quatre étapes sur une situation de travail.",
        activities: [
          {
            title: "À retenir : la méthode en quatre étapes",
            type: "content",
            instructions: "Appliquer la méthode complète d’analyse d’une situation de travail.",
            payload: {
              body: `Tu traites maintenant une situation complète, comme dans la deuxième partie de l’épreuve.\n\nLa méthode complète d’analyse d’une situation de travail suit quatre étapes, toujours dans le même ordre.\n\nPremière étape : décrire le travail réel, c’est-à-dire ce qui est effectivement réalisé dans les conditions observées, pas seulement ce qui est prescrit.\n\nDeuxième étape : repérer les déterminants, les éléments concernant la personne, la tâche, le matériel, le milieu et l’organisation, qui permettent de comprendre la situation.\n\nTroisième étape : relier les causes à l’effet constaté, en construisant une causalité argumentée à partir des faits, souvent multifactorielle.\n\nQuatrième étape : proposer une mesure de prévention hiérarchisée, et l’argumenter en citant le fait, la mesure et l’effet attendu.\n\nChaque réponse, à l’épreuve, s’appuie sur le document nommé dans la consigne, et se rédige en phrases complètes.`,
            },
          },
          {
            title: "Jeu : remettre la méthode dans l’ordre",
            type: "sorting",
            instructions: "Classer chaque étape de la méthode d’analyse selon son ordre.",
            payload: {
              prompt: "Classe chaque étape selon son rang dans la méthode.",
              categories: [
                { id: "etape1", label: "Étape 1" },
                { id: "etape2", label: "Étape 2" },
                { id: "etape3", label: "Étape 3" },
                { id: "etape4", label: "Étape 4" },
              ],
              items: [
                { id: "decrire", label: "Décrire le travail réel", categoryId: "etape1" },
                { id: "reperer", label: "Repérer les déterminants", categoryId: "etape2" },
                { id: "relier", label: "Relier les causes à l’effet constaté", categoryId: "etape3" },
                { id: "proposer", label: "Proposer et argumenter une mesure de prévention", categoryId: "etape4" },
              ],
              explanation:
                "L’ordre compte : sans description du travail réel, on ne peut pas repérer les bons déterminants ; sans causalité établie, une mesure proposée n’est pas justifiée.",
            },
          },
          {
            title: "Jeu : le lexique complet de la méthode",
            type: "matching",
            instructions: "Définir chaque notion de la méthode d’analyse.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "reel", left: "Travail réel", right: "Travail effectivement réalisé dans les conditions du moment" },
                { id: "determinant", left: "Déterminant", right: "Élément concernant la personne, la tâche, le matériel, le milieu ou l’organisation" },
                { id: "causalite", left: "Causalité", right: "Relation argumentée entre des facteurs et un effet" },
                { id: "hierarchie", left: "Hiérarchie de prévention", right: "Ordre qui privilégie suppression, réduction et protection collective avant l’EPI" },
                { id: "argument", left: "Argument", right: "Justification fondée sur des faits et des documents" },
              ],
              explanation:
                "Ces cinq mots couvrent toute la méthode : ils reviennent dans chacune des quatre étapes de l’analyse d’une situation de travail.",
            },
          },
          {
            title: "Défi 04 : identifier l’étape manquante",
            type: "qcm",
            instructions: "Identifier l’étape qui précède la proposition d’une mesure de prévention.",
            payload: {
              question: "Avant de proposer une mesure de prévention, quelle étape doit obligatoirement être réalisée ?",
              choices: [
                { id: "causalite", label: "Relier les causes à l’effet constaté" },
                { id: "aucune", label: "Aucune : on peut proposer une mesure directement" },
                { id: "determinant", label: "Repérer les déterminants, sans aller plus loin" },
              ],
              correctChoiceIds: ["causalite"],
              explanation:
                "Une mesure de prévention doit répondre à une cause identifiée. Sans avoir relié les causes à l’effet, la mesure proposée resterait arbitraire.",
            },
          },
          {
            title: "Vrai ou faux : s’appuyer sur le document nommé",
            type: "true_false",
            instructions: "Justifier l’exigence de s’appuyer sur le document indiqué par la consigne.",
            payload: {
              statement: "À l’épreuve, chaque réponse doit s’appuyer sur le document nommé dans la consigne et se rédiger en phrases complètes.",
              correctAnswer: true,
              explanation: "Vrai : une réponse sans appui sur le document, ou rédigée de façon incomplète, ne répond pas pleinement à ce qui est attendu.",
            },
          },
        ],
      },
    ],
  };
}
