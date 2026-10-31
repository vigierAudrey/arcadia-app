import type { InitialLearningSequence } from "./catalog-types";

// Séquence PSE de 1 TCI — module C4 « L'assistance et le secours en milieu professionnel ».
// Traçabilité complète des sources : docs/mapping-pedagogique-1-tci-c4.md
export const pse1TciC4Sequence: InitialLearningSequence = {
  title: "C4. L'assistance et le secours en milieu professionnel",
  description:
    "Tu vas apprendre à repérer l'organisation des secours de ton entreprise, construire un message d'alerte utile et comprendre ton obligation de porter assistance, à partir de situations de l'atelier CDE.",
  lessons: [
    {
      title: "Comprendre l'organisation des secours",
      description:
        "Présenter l'organisation des secours et des moyens d'alerte en milieu professionnel, à partir d'une alerte incendie survenue à l'atelier.",
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
              { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
              { id: "indiquer", left: "Indiquer", right: "Donner un renseignement" },
              { id: "classer", left: "Classer", right: "Ranger des éléments dans l'ordre ou la manière indiquée" },
              { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
              { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d'une affirmation" },
              { id: "formuler", left: "Formuler", right: "Rédiger le résultat dans le contexte de l'exercice" },
            ],
            explanation:
              "Ces sept verbes sont ceux employés dans les consignes de la séquence, et ceux de l'épreuve de PSE. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
          },
        },
        {
          title: "À retenir : plan d'évacuation, signalisation et procédure",
          type: "content",
          instructions: "Présenter l'organisation des secours et des moyens d'alerte en milieu professionnel.",
          payload: {
            body: "Karim ébavure une tôle quand l'alarme retentit : un départ de feu est signalé près du poste de meulage. Certains collègues hésitent, d'autres veulent aller voir. M. Berthier rappelle qu'une organisation est prévue.\n\nL'employeur organise les soins d'urgence pour les salariés accidentés ou malades. Les consignes sont écrites, connues du personnel et facilement accessibles. L'entreprise prévoit un moyen d'alerte, des sauveteurs secouristes du travail (SST) et du matériel de premiers secours. Les issues de secours et les cheminements restent libres et signalés.\n\nLe plan d'évacuation situe le point « vous êtes ici », les sorties, les cheminements, les extincteurs et le point de rassemblement, le lieu extérieur où l'on se regroupe pour être compté.\n\nLa signalisation guide : vert pour l'évacuation et les premiers secours, rouge pour le matériel incendie. La procédure indique les actions dans l'ordre et évite l'improvisation ; les moyens d'alerte, comme une alarme ou un téléphone, doivent être connus et accessibles. En PFMP, Karim applique le plan, le signal d'alarme et les consignes du site réel.",
          },
        },
        {
          title: "Défi 01 : que fait Karim quand l'alarme retentit",
          type: "qcm",
          instructions: "Expliquer la conduite attendue quand une alarme d'évacuation retentit.",
          payload: {
            question: "L'alarme d'évacuation retentit pendant que Karim soude. Un collègue lui dit de finir son cordon avant de sortir. Que doit faire Karim ?",
            choices: [
              { id: "evacuer", label: "Couper son poste et évacuer immédiatement en suivant la procédure" },
              { id: "finir", label: "Finir son cordon de soudure, puis évacuer" },
              { id: "attendre", label: "Attendre de voir si l'alarme s'arrête" },
              { id: "ignorer", label: "Continuer normalement, l'alarme ne le concerne pas" },
            ],
            correctChoiceIds: ["evacuer"],
            explanation:
              "La procédure de l'entreprise prévaut : finir la tâche retarde l'évacuation et expose Karim au danger. Il doit évacuer immédiatement.",
          },
        },
        {
          title: "Défi 02 : les couleurs de la signalisation",
          type: "qcm",
          instructions: "Identifier le sens des couleurs utilisées dans la signalisation de sécurité.",
          payload: {
            question: "Sur le plan d'évacuation de CDE, à quoi correspond le symbole rouge ?",
            choices: [
              { id: "incendie", label: "Au matériel incendie, comme les extincteurs" },
              { id: "evacuation", label: "Au cheminement d'évacuation" },
              { id: "rassemblement", label: "Au point de rassemblement" },
              { id: "interdiction_entree", label: "À l'entrée principale du bâtiment" },
            ],
            correctChoiceIds: ["incendie"],
            explanation:
              "La signalisation guide : le vert signale l'évacuation et les premiers secours, le rouge signale le matériel incendie.",
          },
        },
        {
          title: "Jeu : classer les éléments de l'organisation des secours",
          type: "sorting",
          instructions: "Classer chaque élément selon la notion de l'organisation des secours qu'il illustre.",
          payload: {
            prompt: "Plan d'évacuation, signalisation, procédure, ou moyen d'alerte ?",
            categories: [
              { id: "plan", label: "Plan d'évacuation" },
              { id: "signalisation", label: "Signalisation" },
              { id: "procedure", label: "Procédure" },
              { id: "moyen_alerte", label: "Moyen d'alerte" },
            ],
            items: [
              { id: "point_rassemblement", label: "Le point de rassemblement indiqué sur le document", categoryId: "plan" },
              { id: "fleche_verte", label: "Une flèche verte qui indique le chemin de sortie", categoryId: "signalisation" },
              { id: "symbole_extincteur", label: "Le symbole rouge qui signale un extincteur", categoryId: "signalisation" },
              { id: "ordre_actions", label: "La suite d'actions prévue par l'entreprise, dans un ordre précis", categoryId: "procedure" },
              { id: "alarme", label: "L'alarme sonore du site", categoryId: "moyen_alerte" },
            ],
            explanation:
              "Le plan d'évacuation situe les éléments, la signalisation les désigne visuellement, la procédure organise les actions, et le moyen d'alerte prévient les personnes ou les secours.",
          },
        },
        {
          title: "Vrai ou faux : bloquer une sortie provisoirement",
          type: "true_false",
          instructions: "Justifier si une sortie de secours peut être bloquée temporairement.",
          payload: {
            statement: "On peut bloquer une sortie de secours provisoirement, si c'est pour peu de temps.",
            correctAnswer: false,
            explanation: "Faux : les issues de secours et les cheminements doivent toujours rester libres.",
          },
        },
        {
          title: "Vrai ou faux : le même signal partout",
          type: "true_false",
          instructions: "Justifier si toutes les alarmes ont le même signal.",
          payload: {
            statement: "Toutes les entreprises ont exactement le même signal d'alarme.",
            correctAnswer: false,
            explanation: "Faux : il faut connaître le signal propre au site où l'on se trouve.",
          },
        },
        {
          title: "Vrai ou faux : la procédure évite l'improvisation",
          type: "true_false",
          instructions: "Expliquer l'intérêt d'une procédure en cas d'alerte.",
          payload: {
            statement: "La procédure organise les actions attendues et évite l'improvisation.",
            correctAnswer: true,
            explanation: "Vrai : elle indique les actions dans un ordre précis, connu à l'avance.",
          },
        },
        {
          title: "Jeu : relier chaque notion à sa définition",
          type: "matching",
          instructions: "Définir chaque notion de l'organisation des secours en la reliant à son sens exact.",
          payload: {
            prompt: "Le lexique de l'organisation des secours, à reconstituer.",
            pairs: [
              { id: "plan", left: "Plan d'évacuation", right: "Document qui situe sorties, cheminements, équipements et point de rassemblement" },
              { id: "signalisation", left: "Signalisation", right: "Panneaux et repères visuels qui guident, informent ou interdisent" },
              { id: "procedure", left: "Procédure", right: "Suite d'actions prévue par l'entreprise, dans un ordre précis" },
              { id: "moyen_alerte", left: "Moyen d'alerte", right: "Dispositif qui prévient les personnes ou les secours" },
              { id: "point_rassemblement", left: "Point de rassemblement", right: "Lieu extérieur où l'on se regroupe pour être compté" },
              { id: "sst", left: "SST", right: "Sauveteur secouriste du travail, salarié formé aux premiers secours" },
            ],
            explanation:
              "Ces six notions permettent de présenter l'organisation des secours prévue par l'entreprise avant tout accident.",
          },
        },
      ],
    },
    {
      title: "Alerter et porter assistance",
      description:
        "Proposer les éléments d'un message d'alerte adapté et expliquer l'obligation de porter assistance à une personne en danger, à partir d'une chute survenue à l'atelier.",
      activities: [
        {
          title: "À retenir : protéger, alerter, secourir",
          type: "content",
          instructions: "Proposer les éléments d'un message d'alerte et expliquer l'obligation de porter assistance.",
          payload: {
            body: "En fixant une virole, un compagnon de Karim chute d'un escabeau. Il est conscient mais ne peut pas se relever et se plaint du poignet. La virole, mal calée, risque de rouler. Karim est le premier sur place.\n\nProtéger consiste à supprimer ou baliser le danger, pour soi, la victime et les autres : avant d'alerter, il faut se protéger, pour ne pas devenir une deuxième victime. Alerter consiste à appeler le numéro prévu par la procédure ou un numéro d'urgence. Secourir consiste à réaliser seulement les gestes que l'on maîtrise, en attendant les secours ; le sauveteur secouriste du travail (SST) intervient selon sa formation.\n\nUn message d'alerte précise le lieu, la nature de l'accident, la victime (nombre, état observable, c'est-à-dire ce que l'on voit ou entend sans poser de diagnostic), les risques persistants (un danger encore présent sur les lieux) et les gestes déjà réalisés. On répond aux questions et on ne raccroche pas avant l'accord de l'interlocuteur.\n\nLa loi impose de porter assistance à une personne en danger, sans se mettre en danger soi-même : le Code pénal (article 223-6) punit celui qui s'abstient volontairement de porter assistance à une personne en péril, par une peine prévue jusqu'à 5 ans d'emprisonnement et 75 000 € d'amende. Alerter est déjà porter assistance : agir soi-même ou provoquer un secours compte comme de l'assistance.",
          },
        },
        {
          title: "Défi 03 : protéger avant d'alerter",
          type: "qcm",
          instructions: "Expliquer pourquoi il faut se protéger avant d'alerter.",
          payload: {
            question: "La virole d'où est tombé le compagnon de Karim risque de rouler. Que doit faire Karim avant d'appeler les secours ?",
            choices: [
              { id: "proteger", label: "Protéger, c'est-à-dire supprimer ou baliser le danger, pour ne pas devenir une deuxième victime" },
              { id: "secourir_direct", label: "Réaliser immédiatement tous les gestes de secours, sans attendre" },
              { id: "ignorer_danger", label: "Ignorer le danger persistant et s'approcher directement de la victime" },
              { id: "attendre_sst", label: "Ne rien faire tant que le SST n'est pas arrivé" },
            ],
            correctChoiceIds: ["proteger"],
            explanation:
              "Avant d'alerter, il faut protéger : supprimer ou baliser le danger, pour soi, la victime et les autres, afin de ne pas devenir une deuxième victime.",
          },
        },
        {
          title: "Défi 04 : ce que doit contenir un message d'alerte",
          type: "qcm",
          instructions: "Identifier les informations qui manquent dans un message d'alerte incomplet.",
          payload: {
            question: "Karim alerte les secours mais dit seulement : « Venez vite, il y a eu un accident ! », puis raccroche. Qu'est-ce qui manque dans ce message ?",
            choices: [
              { id: "lieu_nature_etat", label: "Le lieu précis, la nature de l'accident, l'état de la victime et le danger persistant" },
              { id: "rien", label: "Rien, ce message est suffisant" },
              { id: "diagnostic", label: "Un diagnostic médical précis de la blessure" },
              { id: "nom_victime", label: "Uniquement le nom complet de la victime" },
            ],
            correctChoiceIds: ["lieu_nature_etat"],
            explanation:
              "Un message d'alerte complet précise le lieu, la nature de l'accident, l'état observable de la victime, les risques persistants et les gestes déjà réalisés.",
          },
        },
        {
          title: "Jeu : classer les éléments du message d'alerte",
          type: "sorting",
          instructions: "Classer chaque information selon l'élément du message d'alerte qu'elle constitue.",
          payload: {
            prompt: "Lieu, victime, risque persistant, ou geste déjà réalisé ?",
            categories: [
              { id: "lieu", label: "Lieu" },
              { id: "victime", label: "Victime" },
              { id: "risque_persistant", label: "Risque persistant" },
              { id: "geste", label: "Geste déjà réalisé" },
            ],
            items: [
              { id: "atelier", label: "« Atelier de CDE, zone d'assemblage »", categoryId: "lieu" },
              { id: "conscient", label: "« Il est conscient, il a mal au poignet »", categoryId: "victime" },
              { id: "virole_instable", label: "« Une virole risque de rouler »", categoryId: "risque_persistant" },
              { id: "zone_balisee", label: "« La zone est balisée »", categoryId: "geste" },
            ],
            explanation:
              "Un message d'alerte complet rassemble ces quatre types d'informations, pour permettre aux secours d'intervenir efficacement.",
          },
        },
        {
          title: "Vrai ou faux : annoncer un diagnostic",
          type: "true_false",
          instructions: "Justifier si on doit annoncer un diagnostic médical aux secours.",
          payload: {
            statement: "Il faut annoncer un diagnostic médical précis aux secours.",
            correctAnswer: false,
            explanation: "Faux : on décrit les faits observables, sans poser de diagnostic.",
          },
        },
        {
          title: "Vrai ou faux : alerter, c'est déjà porter assistance",
          type: "true_false",
          instructions: "Expliquer en quoi alerter constitue une forme d'assistance.",
          payload: {
            statement: "Alerter les secours peut constituer, à lui seul, une forme d'assistance à une personne en danger.",
            correctAnswer: true,
            explanation: "Vrai : provoquer un secours, c'est-à-dire alerter, est déjà porter assistance.",
          },
        },
        {
          title: "Vrai ou faux : se mettre en danger pour aider",
          type: "true_false",
          instructions: "Justifier si porter assistance impose de se mettre en danger.",
          payload: {
            statement: "Porter assistance à une personne en danger impose de se mettre soi-même en danger.",
            correctAnswer: false,
            explanation: "Faux : l'assistance se fait sans risque pour soi ou pour les autres ; la protection de soi reste prioritaire.",
          },
        },
        {
          title: "Jeu : relier chaque notion à sa définition",
          type: "matching",
          instructions: "Définir chaque notion de l'alerte et de l'assistance en la reliant à son sens exact.",
          payload: {
            prompt: "Le lexique de l'alerte et de l'assistance, à reconstituer.",
            pairs: [
              { id: "alerte", left: "Alerte", right: "Message transmis aux secours pour déclencher une intervention adaptée" },
              { id: "risque_persistant", left: "Risque persistant", right: "Danger encore présent sur les lieux, pour la victime ou pour les autres" },
              { id: "responsabilite", left: "Responsabilité", right: "Obligation de répondre de ses actes, ou de son absence d'action" },
              { id: "non_assistance", left: "Non-assistance", right: "Fait de ne pas aider une personne en péril alors qu'on le pouvait sans risque" },
              { id: "etat_observable", left: "État observable", right: "Ce que l'on voit ou entend de la victime, sans poser de diagnostic" },
            ],
            explanation:
              "Ces notions permettent d'expliquer l'obligation légale de porter assistance et de construire un message d'alerte adapté.",
          },
        },
      ],
    },
  ],
};
