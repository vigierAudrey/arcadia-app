import type { InitialLearningSequence } from "./catalog-types";

// Séquence PSE de T AGAA — module C1 « Les différents contrats de travail »
// du programme de PSE en CAP.
// Traçabilité complète des sources : docs/mapping-pedagogique-t-agaa.md
//
// Ce module est la source unique de ce contenu : il alimente à la fois le seed
// de développement (prisma/seed.ts) et l'import ciblé, additif et sans
// écrasement, de scripts/import-contenus.ts. Les consignes déjà en ligne au
// 2026-09-07, rédigées avec des verbes hors liste officielle, sont reprises ici
// dans leur version corrigée ; la correction des lignes déjà en base passe par
// prisma/content/corrections.ts.
export const pseTAgaaC1Sequence: InitialLearningSequence = {
  title: "C1. Les différents contrats de travail",
  description:
    "Module C1 du programme de PSE en CAP (thématique C). Objectif : faire travailler les élèves sur les compétences C1, C4, C5 et C6 du référentiel à travers les exercices réalisés. Situation fil rouge de la classe : l’EHPAD Les Glycines. La position indique uniquement l’ordre d’affichage.",
  lessons: [
    {
      title: "Identifier les différents contrats de travail",
      description: "Reconnaître un CDI, un CDD et un contrat d'apprentissage à partir d'indices simples.",
      activities: [
        {
          title: "À retenir : les trois contrats",
          type: "content",
          instructions: "Repérer les trois contrats de travail présentés dans la fiche.",
          payload: {
            body: "Un contrat de travail fixe les règles entre un salarié et un employeur.\n\nCDI : contrat sans date de fin prévue.\n\nCDD : contrat avec une durée limitée ou un motif précis, par exemple un remplacement.\n\nApprentissage : contrat qui associe le travail et la formation.\n\nIndice à repérer : durée, motif du contrat, poste et alternance entre l'entreprise et le centre de formation.",
          },
        },
        {
          title: "Défi 01 : le contrat de remplacement",
          type: "qcm",
          instructions: "Identifier le contrat adapté à un remplacement de trois semaines.",
          payload: {
            question: "Les Glycines recrutent une personne pour remplacer une agente absente pendant 3 semaines. Quel contrat correspond le mieux ?",
            choices: [
              { id: "cdi", label: "Un CDI" },
              { id: "cdd", label: "Un CDD" },
              { id: "apprentissage", label: "Un contrat d'apprentissage" },
            ],
            correctChoiceIds: ["cdd"],
            explanation: "Le remplacement est prévu pour une durée limitée : c'est un indice de CDD.",
          },
        },
        {
          title: "Défi 02 : la durée du contrat",
          type: "qcm",
          instructions: "Indiquer l'information qui permet de reconnaître un CDI.",
          payload: {
            question: "Quelle information permet d'identifier un CDI ?",
            choices: [
              { id: "date-fin", label: "Une date de fin prévue" },
              { id: "sans-fin", label: "Aucune date de fin prévue" },
              { id: "formation", label: "Une alternance avec un centre de formation" },
            ],
            correctChoiceIds: ["sans-fin"],
            explanation: "Le CDI est un contrat sans date de fin prévue.",
          },
        },
        {
          title: "Défi 03 : travail et formation",
          type: "qcm",
          instructions: "Nommer le contrat qui associe le travail et la formation.",
          payload: {
            question: "Une jeune personne travaille aux Glycines et prépare un diplôme en centre de formation. De quel contrat s'agit-il ?",
            choices: [
              { id: "cdi", label: "Un CDI" },
              { id: "cdd", label: "Un CDD" },
              { id: "apprentissage", label: "Un contrat d'apprentissage" },
            ],
            correctChoiceIds: ["apprentissage"],
            explanation: "L'alternance entre travail et formation caractérise l'apprentissage.",
          },
        },
        {
          title: "Jeu : tri express des contrats",
          type: "sorting",
          instructions: "Classer chaque indice dans la colonne du contrat correspondant.",
          payload: {
            prompt: "Classe chaque indice dans le bon contrat.",
            categories: [
              { id: "cdi", label: "CDI" },
              { id: "cdd", label: "CDD" },
              { id: "apprentissage", label: "Apprentissage" },
            ],
            items: [
              { id: "cdi-fin", label: "Sans date de fin prévue", categoryId: "cdi" },
              { id: "cdi-durable", label: "Poste durable", categoryId: "cdi" },
              { id: "cdd-remplacement", label: "Remplacement d'une agente absente", categoryId: "cdd" },
              { id: "cdd-limite", label: "Contrat de 3 semaines", categoryId: "cdd" },
              { id: "app-formation", label: "Travail et formation", categoryId: "apprentissage" },
              { id: "app-diplome", label: "Préparer un diplôme en alternance", categoryId: "apprentissage" },
            ],
            explanation: "Durable et sans fin prévue indiquent le CDI ; durée limitée ou remplacement indiquent le CDD ; travail et formation indiquent l'apprentissage.",
          },
        },
        {
          title: "Jeu : relie les indices",
          type: "matching",
          instructions: "Identifier le contrat qui correspond à chaque indice.",
          payload: {
            prompt: "Associe chaque indice au bon contrat.",
            pairs: [
              { id: "sans-fin", left: "Sans date de fin prévue", right: "CDI" },
              { id: "remplacement", left: "Remplacement d'une agente absente", right: "CDD" },
              { id: "alternance", left: "Travail + formation pour un diplôme", right: "Apprentissage" },
            ],
            explanation: "Chaque indice donne une information sur la durée ou l'organisation du contrat.",
          },
        },
        {
          title: "Décodage des consignes : les verbes de l’épreuve",
          type: "matching",
          instructions: "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
          payload: {
            prompt: "Chaque verbe de consigne attend une production précise. Relie chaque verbe à son sens exact.",
            pairs: [
              { id: "reperer", left: "Repérer", right: "Examiner avec précision, puis lister" },
              { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
              { id: "indiquer", left: "Indiquer", right: "Donner un renseignement" },
              { id: "nommer", left: "Nommer", right: "Donner un nom" },
              { id: "classer", left: "Classer", right: "Ranger des éléments dans l’ordre ou la manière indiquée" },
              { id: "deduire", left: "Déduire", right: "Établir une conséquence logique" },
              { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
              { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
            ],
            explanation: "Ces huit verbes sont ceux des consignes de la séquence, et ceux des épreuves. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
          },
        },
        {
          title: "Défi 04 : le mot-clé qui justifie le choix",
          type: "qcm",
          instructions: "Justifier le choix du contrat à l’aide du mot-clé qui convient.",
          payload: {
            question: "Les Glycines embauchent durablement un agent accompagnant, sans date de fin prévue. Quel mot-clé justifie le choix d’un CDI ?",
            choices: [
              { id: "durable", label: "Durable" },
              { id: "temporaire", label: "Temporaire" },
              { id: "alternance", label: "Alternance" },
              { id: "formation", label: "Formation" },
            ],
            correctChoiceIds: ["durable"],
            explanation: "Trois mots-clés à ne pas confondre : durable pour le CDI, temporaire pour le CDD, alternance pour le contrat d’apprentissage.",
          },
        },
        {
          title: "Vrai ou faux : la date de fin du CDD",
          type: "true_false",
          instructions: "Expliquer si l’affirmation correspond à la définition du CDD.",
          payload: {
            statement: "Le CDD est un contrat sans date de fin prévue.",
            correctAnswer: false,
            explanation: "Faux : c’est le CDI qui n’a pas de date de fin prévue. Le CDD a une date de fin ou une mission limitée, par exemple un remplacement.",
          },
        },
      ],
    },
    {
      title: "Repérer les droits et obligations liés au contrat de travail",
      description: "Distinguer ce que le salarié peut demander et ce qu'il doit respecter dans une situation professionnelle.",
      activities: [
        {
          title: "À retenir : mes droits et mes obligations",
          type: "content",
          instructions: "Repérer les droits et les obligations présentés dans la fiche.",
          payload: {
            body: "Un droit est ce que je peux demander ou recevoir.\n\nUne obligation est ce que je dois respecter.\n\nLe salarié respecte les horaires, le règlement intérieur, les consignes d'hygiène et de sécurité et la confidentialité.\n\nL'employeur respecte le contrat, informe sur le poste et donne les moyens de travailler.\n\nSi je ne comprends pas mon planning ou une règle, je demande une explication à une personne responsable.",
          },
        },
        {
          title: "Défi 01 : côté salarié",
          type: "qcm",
          instructions: "Identifier une obligation du salarié aux Glycines.",
          payload: {
            question: "Quelle action est une obligation du salarié aux Glycines ?",
            choices: [
              { id: "informations", label: "Recevoir les informations utiles" },
              { id: "horaires", label: "Respecter les horaires" },
              { id: "moyens", label: "Donner les moyens de travailler" },
            ],
            correctChoiceIds: ["horaires"],
            explanation: "Le salarié doit respecter les horaires prévus par son planning.",
          },
        },
        {
          title: "Défi 02 : côté employeur",
          type: "qcm",
          instructions: "Indiquer une obligation de l'employeur.",
          payload: {
            question: "Quelle action est une obligation de l'employeur ?",
            choices: [
              { id: "contrat", label: "Respecter le contrat" },
              { id: "confidentialite", label: "Respecter la confidentialité" },
              { id: "planning", label: "Arriver à l'heure au travail" },
            ],
            correctChoiceIds: ["contrat"],
            explanation: "L'employeur doit respecter le contrat et fournir les informations utiles au poste.",
          },
        },
        {
          title: "Défi 03 : le conseil à Lina",
          type: "qcm",
          instructions: "Déduire la conduite à tenir par Lina dans cette situation.",
          payload: {
            question: "Lina ne comprend pas son planning et arrive à 8 h 25 au lieu de 8 h. Que doit-elle faire ?",
            choices: [
              { id: "attendre", label: "Ne rien dire et recommencer" },
              { id: "prevenir", label: "Prévenir le responsable et demander une explication" },
              { id: "partir", label: "Partir sans prévenir" },
            ],
            correctChoiceIds: ["prevenir"],
            explanation: "Lina doit respecter les horaires et prévenir le responsable en cas de difficulté.",
          },
        },
        {
          title: "Jeu : classe les responsabilités",
          type: "sorting",
          instructions: "Classer chaque action selon qu'elle relève du salarié ou de l'employeur.",
          payload: {
            prompt: "Classe chaque action dans la bonne colonne.",
            categories: [
              { id: "droit", label: "Droit du salarié" },
              { id: "salarie", label: "Obligation du salarié" },
              { id: "employeur", label: "Obligation de l'employeur" },
            ],
            items: [
              { id: "recevoir", label: "Recevoir les informations utiles", categoryId: "droit" },
              { id: "respecter-horaires", label: "Respecter les horaires", categoryId: "salarie" },
              { id: "securite", label: "Respecter les consignes de sécurité", categoryId: "salarie" },
              { id: "contrat-employeur", label: "Respecter le contrat", categoryId: "employeur" },
              { id: "moyens", label: "Donner les moyens de travailler", categoryId: "employeur" },
              { id: "poste", label: "Informer sur le poste", categoryId: "employeur" },
            ],
            explanation: "Le salarié a des droits mais doit respecter les règles ; l'employeur doit respecter le contrat et fournir les informations et moyens nécessaires.",
          },
        },
      ],
    },
    {
      title: "Repérer les informations essentielles d’un contrat de travail",
      description:
        "Retrouver la durée, le poste, le lieu de travail et le type de contrat dans un extrait, avant de signer.",
      activities: [
        {
          title: "À retenir : ce que je vérifie avant de signer",
          type: "content",
          instructions: "Repérer les informations à vérifier dans un contrat avant de le signer.",
          payload: {
            body: "Un contrat de travail fixe les règles entre le salarié et l’employeur.\n\nAvant de signer, je lis les informations importantes. Je repère la durée, le poste, le lieu de travail et le type de contrat.\n\nLa durée m’indique s’il s’agit d’un contrat durable ou temporaire : pas de date de fin pour un CDI, une date de fin ou une mission précise pour un CDD.\n\nUne alternance entre l’entreprise et le centre de formation, avec la préparation d’un diplôme, indique un contrat d’apprentissage.\n\nSi une information manque ou n’est pas comprise, je demande une explication à une personne responsable avant de signer.",
          },
        },
        {
          title: "Défi 05 : l’extrait de contrat de Clara",
          type: "qcm",
          instructions: "Identifier le type de contrat à partir de l’extrait proposé.",
          payload: {
            question: "Clara reçoit un contrat aux Glycines. Le document indique : « remplacement de Mme Lenoir du 2 octobre au 30 novembre ». De quel contrat s’agit-il ?",
            choices: [
              { id: "cdd", label: "Un CDD" },
              { id: "cdi", label: "Un CDI" },
              { id: "apprentissage", label: "Un contrat d’apprentissage" },
            ],
            correctChoiceIds: ["cdd"],
            explanation: "Deux indices se combinent : une date de début et une date de fin, et un motif de remplacement. C’est un CDD.",
          },
        },
        {
          title: "Vrai ou faux : signer sans avoir lu",
          type: "true_false",
          instructions: "Justifier la réponse à partir de ce qui doit être vérifié avant de signer.",
          payload: {
            statement: "Je peux signer un contrat sans avoir repéré sa durée ni le poste occupé.",
            correctAnswer: false,
            explanation: "Faux : la durée, le poste, le lieu de travail et le type de contrat se vérifient avant de signer. En cas de doute, je demande une explication à une personne responsable.",
          },
        },
        {
          title: "Jeu : le lexique du contrat",
          type: "matching",
          instructions: "Indiquer le sens exact de chaque mot du lexique.",
          payload: {
            prompt: "Le lexique de la séquence, à reconstituer.",
            pairs: [
              { id: "contrat", left: "Contrat de travail", right: "Accord entre un salarié et un employeur" },
              { id: "salarie", left: "Salarié", right: "Personne qui travaille pour un employeur contre un salaire" },
              { id: "employeur", left: "Employeur", right: "Personne ou structure qui embauche un salarié" },
              { id: "cdi", left: "CDI", right: "Contrat sans date de fin prévue" },
              { id: "cdd", left: "CDD", right: "Contrat avec une durée ou une mission limitée" },
              { id: "apprentissage", left: "Apprentissage", right: "Contrat qui alterne travail et formation" },
            ],
            explanation: "Ces mots doivent être employés avec leur sens exact dans une réponse rédigée : c’est ce qui est attendu à l’évaluation.",
          },
        },
      ],
    },
  ],
};
