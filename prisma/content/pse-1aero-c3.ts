import type { InitialLearningSequence } from "./catalog-types";

// Séquence PSE de 1 AERO — module C3 « Les acteurs de prévention ».
// Traçabilité complète des sources : docs/mapping-pedagogique-1-aero.md
//
// Ce module est la source unique de ce contenu : il alimente à la fois le seed
// de développement (prisma/seed.ts) et l'import ciblé, additif et sans
// écrasement, de scripts/import-pse-1aero-c3.ts.
export const pse1AeroC3Sequence: InitialLearningSequence = {
  title: "C3. Les acteurs de prévention",
  description:
    "Tu vas apprendre qui agit pour prévenir les risques au travail, dans l’entreprise et autour d’elle, à partir de situations de l’atelier AMA.",
  lessons: [
    {
      title: "Identifier les rôles des acteurs internes de prévention",
      description:
        "Distinguer le comité social et économique, le salarié compétent, le sauveteur secouriste du travail et le service de prévention et de santé au travail à partir d’un incident survenu à l’atelier.",
      activities: [
        {
          title: "Décodage des consignes : les verbes de l’épreuve",
          type: "matching",
          instructions:
            "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
          payload: {
            prompt: "Chaque verbe de consigne attend une production précise. Relie chaque verbe à son sens exact.",
            pairs: [
              { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
              { id: "reperer", left: "Repérer", right: "Examiner avec précision, puis lister" },
              { id: "classer", left: "Classer", right: "Ranger des éléments dans l’ordre ou la manière indiquée" },
              { id: "definir", left: "Définir", right: "Donner le sens précis d’une notion ou d’un mot" },
              { id: "deduire", left: "Déduire", right: "Établir une conséquence logique" },
              { id: "indiquer", left: "Indiquer", right: "Donner un renseignement" },
              { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
              { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
            ],
            explanation: "Ces huit verbes sont ceux employés dans les consignes de la séquence, et ceux de l’épreuve de PSE. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
          },
        },
        {
          title: "À retenir : les quatre acteurs internes de la prévention",
          type: "content",
          instructions:
            "Repérer les quatre acteurs internes de la prévention présentés dans la fiche.",
          payload: {
            body: "Chez AMA, Théo se coupe légèrement sur le bord d’un panneau après perçage. Un sauveteur secouriste du travail intervient. M. Ferrand remarque que ce type d’incident revient. Le salarié compétent étudie le poste. Le CSE demande que le sujet soit discuté. Le service de prévention et de santé au travail conseille l’entreprise.\n\nLe comité social et économique (CSE) représente les salariés. Il contribue aux questions de santé et de sécurité, analyse des situations avec les représentants du personnel et formule des propositions.\n\nLe salarié compétent aide l’employeur dans les activités de protection et de prévention des risques professionnels. Il repère un besoin d’amélioration d’un poste et participe à l’organisation des actions de prévention.\n\nLe sauveteur secouriste du travail (SST) intervient face à un accident dans la limite de sa formation. Il protège, examine, alerte et secourt selon la situation. Il ne remplace pas les secours spécialisés.\n\nLe service de prévention et de santé au travail (SPST) suit la santé des salariés. Il conseille les salariés comme l’employeur pour prévenir les risques professionnels et informe sur les effets possibles d’une exposition.\n\nLa prévention est une action collective : selon le problème rencontré, plusieurs de ces acteurs peuvent coopérer.",
          },
        },
        {
          title: "Défi 01 : la coupure de Théo",
          type: "qcm",
          instructions:
            "Identifier l’acteur interne qui intervient en premier auprès de Théo.",
          payload: {
            question: "Théo se coupe sur le bord d’un panneau après perçage. Une personne formée intervient aussitôt : elle protège, examine la blessure et alerte si besoin. De quel acteur interne s’agit-il ?",
            choices: [
              { id: "cse", label: "Le comité social et économique (CSE)" },
              { id: "sst", label: "Le sauveteur secouriste du travail (SST)" },
              { id: "salarie_competent", label: "Le salarié compétent" },
              { id: "carsat", label: "La CARSAT" },
            ],
            correctChoiceIds: ["sst"],
            explanation: "Le SST intervient face à un accident dans la limite de sa formation : il protège, examine, alerte et secourt selon la situation. Il ne remplace pas les secours spécialisés.",
          },
        },
        {
          title: "Défi 02 : l’appui de l’employeur",
          type: "qcm",
          instructions:
            "Déduire quel acteur interne aide l’employeur à organiser la prévention.",
          payload: {
            question: "M. Ferrand cherche la personne qui, dans l’entreprise, aide l’employeur dans les activités de protection et de prévention des risques professionnels. De quel acteur interne s’agit-il ?",
            choices: [
              { id: "salarie_competent", label: "Le salarié compétent" },
              { id: "sst", label: "Le sauveteur secouriste du travail (SST)" },
              { id: "inspection", label: "L’inspection du travail" },
              { id: "client", label: "Le client de l’entreprise" },
            ],
            correctChoiceIds: ["salarie_competent"],
            explanation: "Le salarié compétent est un acteur interne : il aide l’employeur dans les activités de protection et de prévention des risques professionnels. L’inspection du travail, elle, est un organisme externe.",
          },
        },
        {
          title: "Jeu : classe les missions des acteurs internes",
          type: "sorting",
          instructions:
            "Classer chaque mission dans la colonne de l’acteur interne qui l’exerce.",
          payload: {
            prompt: "Douze missions relevées à l’atelier. À quel acteur interne chacune revient-elle ?",
            categories: [
              { id: "cse", label: "Comité social et économique (CSE)" },
              { id: "salarie_competent", label: "Salarié compétent" },
              { id: "sst", label: "Sauveteur secouriste du travail" },
              { id: "spst", label: "Service de prévention et de santé au travail" },
            ],
            items: [
              { id: "cse_1", label: "Représente les salariés sur les questions de santé-sécurité", categoryId: "cse" },
              { id: "cse_2", label: "Analyse une situation avec les représentants du personnel", categoryId: "cse" },
              { id: "cse_3", label: "Formule des propositions lors d’un échange collectif", categoryId: "cse" },
              { id: "sc_1", label: "Aide l’employeur dans la démarche de prévention", categoryId: "salarie_competent" },
              { id: "sc_2", label: "Repère un besoin d’amélioration d’un poste", categoryId: "salarie_competent" },
              { id: "sc_3", label: "Participe à l’organisation des actions de prévention", categoryId: "salarie_competent" },
              { id: "sst_1", label: "Intervient face à un accident selon sa formation", categoryId: "sst" },
              { id: "sst_2", label: "Protège avant d’agir", categoryId: "sst" },
              { id: "sst_3", label: "Ne remplace pas les secours spécialisés", categoryId: "sst" },
              { id: "spst_1", label: "Suit la santé des salariés", categoryId: "spst" },
              { id: "spst_2", label: "Conseille sur les risques professionnels", categoryId: "spst" },
              { id: "spst_3", label: "Informe sur les effets possibles d’une exposition", categoryId: "spst" },
            ],
            explanation: "Chaque acteur interne a une mission précise, mais ils coopèrent : après une coupure répétée, le SST intervient, le salarié compétent étudie le poste, le CSE porte la question et le service de prévention et de santé au travail conseille.",
          },
        },
        {
          title: "Vrai ou faux : le SST et les secours spécialisés",
          type: "true_false",
          instructions:
            "Justifier la réponse à partir des missions du sauveteur secouriste du travail.",
          payload: {
            statement: "Le sauveteur secouriste du travail remplace toujours les secours spécialisés.",
            correctAnswer: false,
            explanation: "Faux : le SST intervient dans la limite de sa formation et transmet une alerte adaptée lorsque la situation le nécessite.",
          },
        },
        {
          title: "Vrai ou faux : qui le service de santé au travail conseille-t-il ?",
          type: "true_false",
          instructions:
            "Expliquer si l’affirmation correspond aux missions du service de prévention et de santé au travail.",
          payload: {
            statement: "Le service de prévention et de santé au travail conseille aussi l’employeur.",
            correctAnswer: true,
            explanation: "Vrai : il suit la santé des salariés et conseille à la fois les salariés et l’employeur pour prévenir les risques professionnels.",
          },
        },
        {
          title: "Jeu : relier chaque acteur interne à son rôle",
          type: "matching",
          instructions:
            "Définir le rôle de chaque acteur interne en le reliant à sa formulation exacte.",
          payload: {
            prompt: "Le réseau interne de la prévention chez AMA, à reconstituer.",
            pairs: [
              { id: "cse", left: "Comité social et économique", right: "Expression collective des salariés" },
              { id: "salarie_competent", left: "Salarié compétent", right: "Appui interne à l’employeur" },
              { id: "sst", left: "Sauveteur secouriste du travail", right: "Première intervention formée" },
              { id: "spst", left: "Service de prévention et de santé au travail", right: "Suivi de santé et conseil" },
            ],
            explanation: "Ces quatre acteurs sont les acteurs internes du module : ils agissent à l’intérieur de l’entreprise, chacun avec sa mission.",
          },
        },
      ],
    },
    {
      title: "Identifier les missions des organismes de prévention externes à l’entreprise",
      description:
        "Comparer les missions de l’inspection du travail et de la CARSAT, puis choisir l’interlocuteur adapté à une demande formulée à partir de faits précis.",
      activities: [
        {
          title: "À retenir : inspection du travail et CARSAT",
          type: "content",
          instructions:
            "Repérer les deux organismes externes présentés dans la fiche.",
          payload: {
            body: "Chez AMA, plusieurs presque-accidents surviennent au poste de perçage-rivetage. M. Ferrand veut améliorer la prévention et consulte des ressources de la CARSAT. Des salariés s’interrogent aussi sur l’application des règles de sécurité.\n\nL’inspection du travail informe et conseille les salariés et l’employeur sur le droit du travail. Elle contrôle son application et peut intervenir dans le cadre de ses pouvoirs de contrôle.\n\nLa CARSAT (caisse d’assurance retraite et de la santé au travail) accompagne les entreprises dans la prévention des risques professionnels : conseils, outils, actions et ressources adaptées.\n\nLes organismes externes ne remplacent pas les acteurs internes. Le bon interlocuteur dépend du problème rencontré.\n\nAvant un contact, il faut décrire des faits précis et formuler une demande claire, sans accusation ni rumeur.",
          },
        },
        {
          title: "Défi 03 : accompagner le poste de perçage-rivetage",
          type: "qcm",
          instructions:
            "Identifier l’organisme externe adapté à la demande d’accompagnement.",
          payload: {
            question: "AMA veut réduire les coupures et les projections au poste de perçage-rivetage. L’entreprise cherche un accompagnement : des conseils, des outils et des ressources de prévention. Quel organisme externe contacter en priorité ?",
            choices: [
              { id: "carsat", label: "La CARSAT" },
              { id: "inspection", label: "L’inspection du travail" },
              { id: "cse", label: "Le comité social et économique" },
              { id: "client", label: "Le client de l’entreprise" },
            ],
            correctChoiceIds: ["carsat"],
            explanation: "La CARSAT accompagne les entreprises dans la prévention des risques professionnels. Le CSE, lui, est un acteur interne : il ne s’agit pas d’un organisme externe.",
          },
        },
        {
          title: "Défi 04 : une règle qui ne serait pas appliquée",
          type: "qcm",
          instructions:
            "Indiquer l’organisme externe qui contrôle l’application du droit du travail.",
          payload: {
            question: "Un salarié d’AMA s’interroge : une règle de sécurité ne serait pas appliquée dans l’atelier. Quel organisme externe informe sur le droit du travail et contrôle son application ?",
            choices: [
              { id: "inspection", label: "L’inspection du travail" },
              { id: "carsat", label: "La CARSAT" },
              { id: "spst", label: "Le service de prévention et de santé au travail" },
              { id: "fournisseur", label: "Le fournisseur de matériel" },
            ],
            correctChoiceIds: ["inspection"],
            explanation: "L’inspection du travail informe et conseille sur le droit du travail, contrôle son application et peut intervenir dans le cadre de ses pouvoirs de contrôle.",
          },
        },
        {
          title: "Jeu : classe les demandes entre inspection du travail et CARSAT",
          type: "sorting",
          instructions:
            "Classer chaque demande selon l’organisme externe qui peut y répondre.",
          payload: {
            prompt: "Douze demandes formulées chez AMA. Quel organisme externe est concerné ?",
            categories: [
              { id: "inspection", label: "Inspection du travail" },
              { id: "carsat", label: "CARSAT" },
            ],
            items: [
              { id: "it_1", label: "Obtenir une information sur une règle du droit du travail", categoryId: "inspection" },
              { id: "it_2", label: "Signaler une question sur l’application d’une règle", categoryId: "inspection" },
              { id: "it_3", label: "Contrôler l’application du droit du travail", categoryId: "inspection" },
              { id: "it_4", label: "Informer salariés et employeur sur leurs droits et obligations", categoryId: "inspection" },
              { id: "it_5", label: "Constater des faits lors d’un contrôle", categoryId: "inspection" },
              { id: "it_6", label: "Orienter sur une démarche liée au droit du travail", categoryId: "inspection" },
              { id: "ca_1", label: "Être accompagné pour réduire les coupures et projections", categoryId: "carsat" },
              { id: "ca_2", label: "Obtenir un outil de prévention pour le poste de perçage-rivetage", categoryId: "carsat" },
              { id: "ca_3", label: "Préparer une action de sensibilisation", categoryId: "carsat" },
              { id: "ca_4", label: "Être conseillé sur une mesure de prévention", categoryId: "carsat" },
              { id: "ca_5", label: "Construire un projet de prévention", categoryId: "carsat" },
              { id: "ca_6", label: "Identifier des aides et ressources de prévention", categoryId: "carsat" },
            ],
            explanation: "Une demande qui porte sur une règle et son application va vers l’inspection du travail ; une demande d’accompagnement, d’outils ou de conseils de prévention va vers la CARSAT.",
          },
        },
        {
          title: "Vrai ou faux : la CARSAT et le CSE",
          type: "true_false",
          instructions:
            "Expliquer si l’affirmation correspond aux missions de la CARSAT.",
          payload: {
            statement: "La CARSAT remplace le comité social et économique.",
            correctAnswer: false,
            explanation: "Faux : la CARSAT accompagne l’entreprise dans la prévention. Les organismes externes ne remplacent pas les acteurs internes ; leurs rôles sont complémentaires.",
          },
        },
        {
          title: "Vrai ou faux : préparer son contact",
          type: "true_false",
          instructions:
            "Justifier l’intérêt de décrire des faits précis avant un contact.",
          payload: {
            statement: "Avant de contacter un organisme externe, il faut décrire des faits précis.",
            correctAnswer: true,
            explanation: "Vrai : une demande appuyée sur des faits observés, sans accusation ni rumeur, est plus utile et permet une réponse adaptée.",
          },
        },
        {
          title: "Jeu : relier chaque acteur à sa mission",
          type: "matching",
          instructions:
            "Indiquer la mission qui correspond à chaque acteur de la séquence.",
          payload: {
            prompt: "Internes ou externes, chacun sa mission. Relie les paires.",
            pairs: [
              { id: "inspection", left: "Inspection du travail", right: "Droit du travail : information et contrôle" },
              { id: "carsat", left: "CARSAT", right: "Accompagnement de la prévention" },
              { id: "acteurs_internes", left: "Acteurs internes", right: "Observation et action dans l’entreprise" },
              { id: "message", left: "Message utile", right: "Faits précis et demande claire" },
            ],
            explanation: "Les organismes externes complètent l’action des acteurs internes : le choix dépend du problème, et la demande se prépare à partir de faits.",
          },
        },
      ],
    },
    {
      title: "Choisir l’interlocuteur adapté à une situation de prévention",
      description:
        "Bilan de la séquence : distinguer acteurs internes et organismes externes, puis formuler une demande appuyée sur des faits précis.",
      activities: [
        {
          title: "À retenir : l’essentiel de la séquence",
          type: "content",
          instructions:
            "Repérer les cinq points essentiels de la séquence.",
          payload: {
            body: "Les acteurs internes agissent dans l’entreprise : le CSE, le salarié compétent, le sauveteur secouriste du travail et le service de prévention et de santé au travail.\n\nLes organismes externes complètent l’action : l’inspection du travail et la CARSAT.\n\nChaque acteur a une mission précise, et plusieurs acteurs peuvent coopérer sur une même situation.\n\nPour choisir un interlocuteur, je décris d’abord les faits, puis j’identifie le besoin.\n\nJe formule enfin une demande claire, sans accusation ni rumeur.",
          },
        },
        {
          title: "Jeu : interne ou externe ?",
          type: "sorting",
          instructions:
            "Classer chaque situation selon qu’elle relève d’un acteur interne ou d’un organisme externe.",
          payload: {
            prompt: "Dix situations rencontrées chez AMA. Interne à l’entreprise, ou organisme extérieur ?",
            categories: [
              { id: "interne", label: "Acteur interne" },
              { id: "externe", label: "Organisme externe" },
            ],
            items: [
              { id: "int_1", label: "Le secours immédiat après une coupure à l’atelier", categoryId: "interne" },
              { id: "int_2", label: "L’expression collective des salariés sur la sécurité", categoryId: "interne" },
              { id: "int_3", label: "L’appui à l’employeur pour organiser la prévention", categoryId: "interne" },
              { id: "int_4", label: "Le suivi de la santé des salariés", categoryId: "interne" },
              { id: "int_5", label: "Le conseil sur l’exposition aux poussières de composite", categoryId: "interne" },
              { id: "ext_1", label: "L’accompagnement d’un projet de prévention par un organisme extérieur", categoryId: "externe" },
              { id: "ext_2", label: "Le contrôle de l’application du droit du travail", categoryId: "externe" },
              { id: "ext_3", label: "L’information sur le texte qui s’applique à une situation de travail", categoryId: "externe" },
              { id: "ext_4", label: "La fourniture d’outils et de ressources de prévention à l’entreprise", categoryId: "externe" },
              { id: "ext_5", label: "Le constat de faits lors d’un contrôle dans l’entreprise", categoryId: "externe" },
            ],
            explanation: "Un acteur interne est une personne ou une instance présente dans l’entreprise ; un organisme externe est un organisme extérieur qui conseille, accompagne ou contrôle.",
          },
        },
        {
          title: "Mission AMA : les irritations après ponçage",
          type: "qcm",
          instructions:
            "Déduire l’ordre des acteurs à solliciter dans cette situation.",
          payload: {
            question: "Théo signale des irritations répétées après le ponçage composite. Il cherche d’abord l’acteur interne qui peut conseiller sur la santé, puis un acteur qui peut porter une amélioration collective. Quel enchaînement est adapté ?",
            choices: [
              { id: "spst_cse", label: "Le service de prévention et de santé au travail, puis le comité social et économique" },
              { id: "sst_seul", label: "Le sauveteur secouriste du travail uniquement" },
              { id: "inspection_client", label: "L’inspection du travail, puis le client de l’entreprise" },
              { id: "carsat_a_la_place", label: "La CARSAT à la place du comité social et économique" },
            ],
            correctChoiceIds: ["spst_cse"],
            explanation: "Le service de prévention et de santé au travail conseille sur l’exposition et ses effets ; le CSE porte ensuite la question collectivement et formule des propositions.",
          },
        },
        {
          title: "Vrai ou faux : un seul acteur suffit-il ?",
          type: "true_false",
          instructions:
            "Justifier la réponse à partir de ce qui a été vu dans la séquence.",
          payload: {
            statement: "Un seul acteur suffit pour traiter tous les problèmes de prévention.",
            correctAnswer: false,
            explanation: "Faux : la prévention est une action collective. Selon la situation, les acteurs internes et les organismes externes coopèrent.",
          },
        },
        {
          title: "Jeu : le lexique de la prévention",
          type: "matching",
          instructions:
            "Définir chaque mot du lexique en le reliant à son sens exact.",
          payload: {
            prompt: "Le lexique de la séquence, à reconstituer.",
            pairs: [
              { id: "prevention", left: "Prévention", right: "Actions qui évitent ou réduisent les risques" },
              { id: "acteur_interne", left: "Acteur interne", right: "Personne ou instance présente dans l’entreprise" },
              { id: "organisme_externe", left: "Organisme externe", right: "Organisme extérieur qui conseille, accompagne ou contrôle" },
              { id: "mission", left: "Mission", right: "Rôle confié à une personne ou à un organisme" },
              { id: "cse", left: "CSE", right: "Comité social et économique" },
              { id: "carsat", left: "CARSAT", right: "Caisse d’assurance retraite et de la santé au travail" },
            ],
            explanation: "Ces mots doivent être employés avec leur sens exact dans une réponse rédigée : c’est ce qui est attendu à l’épreuve.",
          },
        },
        {
          title: "Défi 05 : le message adressé à un organisme externe",
          type: "qcm",
          instructions:
            "Identifier la demande qui repose sur des faits précis.",
          payload: {
            question: "Avant de contacter un organisme externe, tu prépares un message. Quelle formulation est la plus utile ?",
            choices: [
              { id: "faits", label: "Depuis trois semaines, quatre coupures ont été signalées au poste de perçage-rivetage ; nous demandons un accompagnement pour réduire ce risque." },
              { id: "accusation", label: "Le chef d’atelier ne fait pas son travail." },
              { id: "rumeur", label: "Il paraît que la sécurité est mauvaise dans l’atelier." },
              { id: "vague", label: "Il y a un problème, merci de venir." },
            ],
            correctChoiceIds: ["faits"],
            explanation: "Une demande utile décrit des faits observés, précise le poste concerné et formule une demande claire, sans accusation ni rumeur.",
          },
        },
      ],
    },
  ],
};
