import type { InitialLearningSequence } from "./catalog-types";

// Séquence PSE de 1 TCI — module A8 « Le stress au quotidien ».
// Traçabilité complète des sources : docs/mapping-pedagogique-1-tci-a8.md
export const pse1TciA8Sequence: InitialLearningSequence = {
  title: "A8. Le stress au quotidien",
  description:
    "Tu vas comprendre comment ton corps réagit face au stress, faire la différence entre stress aigu et stress chronique, et découvrir des mesures pour le gérer au quotidien, à partir de situations de l'atelier CDE.",
  lessons: [
    {
      title: "Comprendre la réaction de stress",
      description:
        "Présenter les caractéristiques du stress, lister ses facteurs et expliquer le mécanisme physiologique par l'action de l'adrénaline et du cortisol, à partir d'une situation vécue par Élodie.",
      activities: [
        {
          title: "Décodage des consignes : les verbes de l'épreuve",
          type: "matching",
          instructions:
            "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
          payload: {
            prompt: "Chaque verbe de consigne attend une production précise. Relie chaque verbe à son sens exact.",
            pairs: [
              { id: "reperer", left: "Repérer", right: "Examiner avec précision, puis lister" },
              { id: "classer", left: "Classer", right: "Ranger des éléments dans l'ordre ou la manière indiquée" },
              { id: "decrire", left: "Décrire", right: "Dire ce que l'on voit" },
              { id: "nommer", left: "Nommer", right: "Donner un nom" },
              { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
              { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
              { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d'une affirmation" },
            ],
            explanation:
              "Ces sept verbes sont ceux employés dans les consignes de la séquence, et ceux de l'épreuve de PSE. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
          },
        },
        {
          title: "À retenir : le stress et son mécanisme physiologique",
          type: "content",
          instructions: "Présenter les caractéristiques du stress, lister ses facteurs et expliquer l'action de l'adrénaline et du cortisol.",
          payload: {
            body: "Chez CDE, une commande de cuves doit être livrée deux jours plus tôt que prévu. Élodie, 27 ans, opératrice sur machine à commande numérique, doit relancer une série de pièces après une erreur de programme. M. Berthier passe toutes les heures demander où elle en est. Son cœur bat vite, ses mains sont moites, elle est très concentrée. Le soir, elle s'endort difficilement : elle déménage aussi cette semaine.\n\nLe stress apparaît quand une personne perçoit un déséquilibre entre ce qu'on lui demande et ses ressources pour y répondre. C'est une réaction d'adaptation de l'organisme : elle peut aider à faire face. Les facteurs de stress existent au travail (délais, bruit, conflits) et dans la vie quotidienne (examens, transports, déménagement). La vulnérabilité, c'est-à-dire la sensibilité d'une personne aux facteurs de stress, varie d'une personne à l'autre.\n\nLa réaction de stress se déroule en trois phases. La phase d'alarme : les glandes surrénales libèrent l'adrénaline, une hormone ; le cœur, la tension et la vigilance augmentent. La phase de résistance : si la situation dure, les glandes surrénales sécrètent le cortisol, qui augmente le sucre dans le sang pour fournir de l'énergie. La phase d'épuisement : si le stress se prolonge, l'organisme ne parvient plus à se réguler.",
          },
        },
        {
          title: "Défi 01 : l'hormone de l'alarme",
          type: "qcm",
          instructions: "Nommer l'hormone qui agit dès le début d'une situation stressante.",
          payload: {
            question: "Élodie sent son cœur battre vite dès qu'elle commence à relancer la série de pièces. Quelle hormone, libérée par les glandes surrénales, agit dès cette phase d'alarme ?",
            choices: [
              { id: "adrenaline", label: "L'adrénaline" },
              { id: "cortisol", label: "Le cortisol" },
              { id: "insuline", label: "L'insuline" },
              { id: "melatonine", label: "La mélatonine" },
            ],
            correctChoiceIds: ["adrenaline"],
            explanation:
              "Dans la phase d'alarme, les glandes surrénales libèrent l'adrénaline : le cœur, la tension et la vigilance augmentent.",
          },
        },
        {
          title: "Défi 02 : le rôle du cortisol",
          type: "qcm",
          instructions: "Expliquer le rôle du cortisol quand une situation stressante se prolonge.",
          payload: {
            question: "Si la relance de la série de pièces d'Élodie se prolonge plusieurs heures, quel est le rôle du cortisol, sécrété dans la phase de résistance ?",
            choices: [
              { id: "sucre", label: "Il augmente le sucre dans le sang pour fournir de l'énergie" },
              { id: "sommeil", label: "Il endort immédiatement la personne" },
              { id: "coeur_ralenti", label: "Il ralentit le rythme cardiaque" },
              { id: "aucun_role", label: "Il n'a aucun rôle physiologique" },
            ],
            correctChoiceIds: ["sucre"],
            explanation:
              "Dans la phase de résistance, le cortisol augmente le sucre dans le sang pour fournir de l'énergie : l'organisme tient sur ses réserves.",
          },
        },
        {
          title: "Jeu : classer les éléments selon la phase du stress",
          type: "sorting",
          instructions: "Classer chaque élément selon la phase de la réaction de stress à laquelle il correspond.",
          payload: {
            prompt: "Phase d'alarme, de résistance, ou d'épuisement ?",
            categories: [
              { id: "alarme", label: "Phase d'alarme" },
              { id: "resistance", label: "Phase de résistance" },
              { id: "epuisement", label: "Phase d'épuisement" },
            ],
            items: [
              { id: "adrenaline", label: "La libération d'adrénaline par les glandes surrénales", categoryId: "alarme" },
              { id: "coeur_accelere", label: "Le cœur qui s'accélère dès le début de la situation", categoryId: "alarme" },
              { id: "cortisol", label: "La sécrétion de cortisol, si la situation dure", categoryId: "resistance" },
              { id: "tient_reserves", label: "L'organisme qui tient sur ses réserves", categoryId: "resistance" },
              { id: "ne_regule_plus", label: "L'organisme qui ne parvient plus à se réguler", categoryId: "epuisement" },
            ],
            explanation:
              "La réaction de stress se déroule en trois phases : alarme (adrénaline), résistance (cortisol), puis épuisement si le stress se prolonge trop longtemps.",
          },
        },
        {
          title: "Vrai ou faux : le stress est toujours une maladie",
          type: "true_false",
          instructions: "Présenter ce qu'est le stress.",
          payload: {
            statement: "Le stress est toujours une maladie.",
            correctAnswer: false,
            explanation: "Faux : c'est d'abord une réaction d'adaptation de l'organisme, qui peut aider à faire face à une situation.",
          },
        },
        {
          title: "Vrai ou faux : l'adrénaline et le rythme cardiaque",
          type: "true_false",
          instructions: "Expliquer l'effet de l'adrénaline sur le rythme cardiaque.",
          payload: {
            statement: "L'adrénaline accélère le rythme du cœur.",
            correctAnswer: true,
            explanation: "Vrai : elle prépare le corps à réagir vite, dans la phase d'alarme.",
          },
        },
        {
          title: "Vrai ou faux : tout le monde réagit de la même façon",
          type: "true_false",
          instructions: "Justifier pourquoi deux personnes peuvent réagir différemment au même facteur de stress.",
          payload: {
            statement: "Tout le monde réagit de la même façon au même facteur de stress.",
            correctAnswer: false,
            explanation: "Faux : la vulnérabilité, la sensibilité d'une personne aux facteurs de stress, varie selon les personnes.",
          },
        },
        {
          title: "Jeu : relier les mots clés de la séance",
          type: "matching",
          instructions: "Définir chaque notion en la reliant à son sens exact.",
          payload: {
            prompt: "Reconstitue le lexique du mécanisme du stress.",
            pairs: [
              { id: "facteur", left: "Facteur de stress", right: "Situation perçue comme exigeante ou menaçante, au travail ou dans la vie quotidienne" },
              { id: "adaptation", left: "Adaptation", right: "Réaction de l'organisme qui mobilise ses ressources pour faire face" },
              { id: "vulnerabilite", left: "Vulnérabilité", right: "Sensibilité d'une personne aux facteurs de stress, variable selon les personnes" },
              { id: "phase", left: "Phase", right: "Étape de la réaction de stress : alarme, résistance, épuisement" },
              { id: "hormone", left: "Hormone", right: "Substance libérée dans le sang par une glande, qui agit sur des organes" },
            ],
            explanation:
              "Ces notions permettent de présenter les caractéristiques du stress et d'expliquer son mécanisme physiologique.",
          },
        },
      ],
    },
    {
      title: "Différencier stress aigu et chronique, et agir",
      description:
        "Différencier les effets du stress aigu et du stress chronique sur la santé, et proposer des mesures individuelles pour le gérer au quotidien.",
      activities: [
        {
          title: "À retenir : stress aigu, stress chronique et mesures individuelles",
          type: "content",
          instructions: "Différencier les effets du stress aigu et du stress chronique, et proposer des mesures individuelles pour gérer le stress.",
          payload: {
            body: "Trois semaines plus tard, les retards s'accumulent chez CDE. Élodie dort mal, a souvent mal au dos et au ventre, s'énerve vite et oublie de contrôler la cote d'une pièce. Elle boit beaucoup de café et a arrêté le sport. Elle décide d'en parler à M. Berthier.\n\nLe stress aigu est court, lié à un facteur ponctuel : il cesse quand la situation s'arrête et peut aider à faire face. Le stress chronique dure plusieurs semaines ou plus, sans récupération suffisante : l'organisme reste en résistance, puis s'épuise.\n\nLe stress chronique peut entraîner des conséquences pathologiques, c'est-à-dire des maladies ou des troubles de santé provoqués ou aggravés par le stress qui dure. En quelques semaines : douleurs, troubles du sommeil, troubles digestifs, nervosité, difficultés de concentration. À plus long terme : hypertension, maladies cardiovasculaires, troubles musculosquelettiques (douleurs des muscles, tendons et articulations, souvent du dos ou des membres). Sur la santé mentale : troubles anxieux, dépression, épuisement professionnel. Le risque d'accident du travail augmente aussi.\n\nDes mesures individuelles, c'est-à-dire des actions qu'une personne peut mettre en place elle-même, aident à gérer le stress : bouger (une activité physique régulière aide à évacuer les tensions), dormir suffisamment à heures régulières, limiter les excitants comme le café et les boissons énergisantes, respirer lentement quelques minutes, organiser ses tâches par priorité, et en parler à une personne de confiance (tuteur, collègue, médecin du travail, infirmière). Au travail, ces mesures complètent la prévention organisée par l'employeur.",
          },
        },
        {
          title: "Défi 03 : le type de stress d'Élodie",
          type: "qcm",
          instructions: "Déduire le type de stress en fonction de sa durée.",
          payload: {
            question: "Depuis trois semaines, Élodie dort mal, a mal au dos et s'énerve vite. De quel type de stress s'agit-il ?",
            choices: [
              { id: "chronique", label: "Un stress chronique, car il dure depuis plusieurs semaines sans récupération" },
              { id: "aigu", label: "Un stress aigu, car il va cesser dans quelques minutes" },
              { id: "aucun", label: "Ce n'est pas du stress, seulement de la fatigue" },
              { id: "positif", label: "Un stress uniquement bénéfique, sans aucune conséquence" },
            ],
            correctChoiceIds: ["chronique"],
            explanation:
              "Le stress chronique dure plusieurs semaines ou plus, sans récupération suffisante : c'est le cas d'Élodie, dont les signes durent depuis trois semaines.",
          },
        },
        {
          title: "Défi 04 : pourquoi le café n'est pas une solution",
          type: "qcm",
          instructions: "Justifier pourquoi augmenter sa consommation de café n'aide pas à gérer le stress.",
          payload: {
            question: "Pourquoi boire plus de café n'aide-t-il pas Élodie à gérer son stress ?",
            choices: [
              { id: "excitant_sommeil", label: "Parce que la caféine est un excitant qui stimule l'organisme et perturbe le sommeil" },
              { id: "aide_vraiment", label: "Au contraire, le café supprime totalement le stress" },
              { id: "sans_effet", label: "Le café n'a aucun effet sur l'organisme" },
              { id: "remplace_sommeil", label: "Le café remplace complètement le besoin de sommeil" },
            ],
            correctChoiceIds: ["excitant_sommeil"],
            explanation:
              "La caféine est un excitant, une substance qui stimule l'organisme : elle perturbe le sommeil plutôt que d'aider à gérer le stress.",
          },
        },
        {
          title: "Jeu : classer stress aigu, chronique et mesures",
          type: "sorting",
          instructions: "Classer chaque élément selon qu'il décrit le stress aigu, le stress chronique, ou une mesure individuelle.",
          payload: {
            prompt: "Stress aigu, stress chronique, ou mesure individuelle ?",
            categories: [
              { id: "aigu", label: "Stress aigu" },
              { id: "chronique", label: "Stress chronique" },
              { id: "mesure", label: "Mesure individuelle" },
            ],
            items: [
              { id: "cesse_avec_situation", label: "Cesse dès que la situation s'arrête", categoryId: "aigu" },
              { id: "dure_semaines", label: "Dure plusieurs semaines, sans récupération suffisante", categoryId: "chronique" },
              { id: "tms", label: "Peut entraîner des troubles musculosquelettiques", categoryId: "chronique" },
              { id: "bouger", label: "Pratiquer une activité physique régulière", categoryId: "mesure" },
              { id: "en_parler", label: "En parler à une personne de confiance", categoryId: "mesure" },
            ],
            explanation:
              "Le stress aigu est ponctuel et sans gravité particulière ; le stress chronique s'installe dans la durée et peut entraîner des conséquences pathologiques ; des mesures individuelles permettent de le gérer.",
          },
        },
        {
          title: "Vrai ou faux : la durée du stress aigu",
          type: "true_false",
          instructions: "Préciser la durée du stress aigu.",
          payload: {
            statement: "Un stress aigu disparaît quand la situation qui le provoque s'arrête.",
            correctAnswer: true,
            explanation: "Vrai : c'est une réaction courte, liée à un facteur ponctuel.",
          },
        },
        {
          title: "Vrai ou faux : les effets du stress chronique",
          type: "true_false",
          instructions: "Justifier si le stress chronique a des effets sur le corps.",
          payload: {
            statement: "Le stress chronique n'a aucun effet sur le corps.",
            correctAnswer: false,
            explanation: "Faux : il peut entraîner des troubles du sommeil, des troubles musculosquelettiques, et à plus long terme des maladies cardiovasculaires.",
          },
        },
        {
          title: "Vrai ou faux : parler de son stress",
          type: "true_false",
          instructions: "Justifier l'intérêt de parler de son stress à une personne de confiance.",
          payload: {
            statement: "Parler de son stress à une personne de confiance peut aider à le gérer.",
            correctAnswer: true,
            explanation: "Vrai : c'est une mesure individuelle efficace, au même titre que bouger, dormir ou s'organiser.",
          },
        },
        {
          title: "Jeu : relier les mots clés de la séance",
          type: "matching",
          instructions: "Définir chaque notion en la reliant à son sens exact.",
          payload: {
            prompt: "Reconstitue le lexique du stress aigu, chronique et des mesures individuelles.",
            pairs: [
              { id: "aigu", left: "Stress aigu", right: "Stress court, lié à un facteur ponctuel, qui cesse avec la situation" },
              { id: "chronique", left: "Stress chronique", right: "Stress qui dure plusieurs semaines ou plus, sans récupération suffisante" },
              { id: "consequence", left: "Conséquence pathologique", right: "Maladie ou trouble de santé provoqué ou aggravé par le stress qui dure" },
              { id: "mesure", left: "Mesure individuelle", right: "Action qu'une personne peut mettre en place elle-même pour gérer son stress" },
              { id: "tms", left: "Troubles musculosquelettiques", right: "Douleurs des muscles, tendons et articulations, souvent du dos ou des membres" },
              { id: "excitant", left: "Excitant", right: "Substance qui stimule l'organisme, comme la caféine" },
            ],
            explanation:
              "Ces notions permettent de différencier le stress aigu du stress chronique et de proposer des mesures individuelles adaptées.",
          },
        },
      ],
    },
  ],
};
