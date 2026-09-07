import {
  ActivityTrack,
  PublicationStatus,
  SequenceStatus,
  TeachingAreaKind,
} from "../src/generated/prisma/enums";
import { prisma } from "../src/server/db/prisma";

type InitialTeachingArea = {
  name: string;
  kind: TeachingAreaKind;
  learningSequences?: readonly InitialLearningSequence[];
};

type InitialLearningSequence = {
  title: string;
  description: string;
  lessons: readonly InitialLesson[];
};

type InitialLesson = {
  title: string;
  description?: string;
  activities?: readonly InitialActivity[];
};

type InitialJsonValue =
  | string
  | number
  | boolean
  | null
  | InitialJsonObject
  | InitialJsonValue[];

type InitialJsonObject = { [key: string]: InitialJsonValue };

type InitialActivity = {
  title: string;
  type: "content" | "qcm" | "true_false" | "sorting" | "matching";
  instructions: string;
  payload: InitialJsonObject;
};

type InitialClassroom = {
  name: string;
  teachingAreas: readonly InitialTeachingArea[];
};

type InitialLevel = {
  name: string;
  classrooms: readonly InitialClassroom[];
};

type InitialProgram = {
  name: string;
  levels: readonly InitialLevel[];
};

// Données d'initialisation uniquement : elles ne sont jamais importées par l'application.
const initialCatalog: readonly InitialProgram[] = [
  {
    name: "CAP",
    levels: [
      {
        name: "Terminale",
        classrooms: [
          {
            name: "T AGAA",
            teachingAreas: [
              { name: "Maths appliquées", kind: TeachingAreaKind.SUBJECT },
              {
                name: "PSE",
                kind: TeachingAreaKind.SUBJECT,
                learningSequences: [
                  {
                    title: "C1. Les différents contrats de travail",
                    description: "Module/thème référentiel ; la position indique uniquement l'ordre d'affichage.",
                    lessons: [
                      {
                        title: "Identifier les différents contrats de travail",
                        description: "Reconnaître un CDI, un CDD et un contrat d'apprentissage à partir d'indices simples.",
                        activities: [
                          {
                            title: "À retenir : les trois contrats",
                            type: "content",
                            instructions: "Lis cette fiche avant de relever le défi.",
                            payload: {
                              body: "Un contrat de travail fixe les règles entre un salarié et un employeur.\n\nCDI : contrat sans date de fin prévue.\n\nCDD : contrat avec une durée limitée ou un motif précis, par exemple un remplacement.\n\nApprentissage : contrat qui associe le travail et la formation.\n\nIndice à repérer : durée, motif du contrat, poste et alternance entre l'entreprise et le centre de formation.",
                            },
                          },
                          {
                            title: "Défi 01 : le contrat de remplacement",
                            type: "qcm",
                            instructions: "Choisis la bonne réponse, puis vérifie.",
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
                            instructions: "Repère l'indice qui caractérise le CDI.",
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
                            instructions: "Choisis le contrat qui associe emploi et formation.",
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
                            instructions: "Sélectionne une carte, puis choisis sa catégorie.",
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
                            instructions: "Pour chaque indice, choisis le contrat qui correspond.",
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
                        ],
                      },
                      {
                        title: "Repérer les droits et obligations liés au contrat de travail",
                        description: "Distinguer ce que le salarié peut demander et ce qu'il doit respecter dans une situation professionnelle.",
                        activities: [
                          {
                            title: "À retenir : mes droits et mes obligations",
                            type: "content",
                            instructions: "Lis cette fiche avant de conseiller Lina.",
                            payload: {
                              body: "Un droit est ce que je peux demander ou recevoir.\n\nUne obligation est ce que je dois respecter.\n\nLe salarié respecte les horaires, le règlement intérieur, les consignes d'hygiène et de sécurité et la confidentialité.\n\nL'employeur respecte le contrat, informe sur le poste et donne les moyens de travailler.\n\nSi je ne comprends pas mon planning ou une règle, je demande une explication à une personne responsable.",
                            },
                          },
                          {
                            title: "Défi 01 : côté salarié",
                            type: "qcm",
                            instructions: "Repère l'obligation du salarié.",
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
                            instructions: "Repère ce que l'employeur doit faire.",
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
                            instructions: "Choisis le conseil professionnel le plus adapté.",
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
                            instructions: "Sélectionne une carte, puis choisis qui est concerné.",
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
                      { title: "Lire les informations essentielles d'un contrat de travail" },
                    ],
                  },
                ],
              },
              { name: "Bloc 2", kind: TeachingAreaKind.BLOCK },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "BAC PRO",
    levels: [
      {
        name: "Seconde",
        classrooms: [
          { name: "2 AERO", teachingAreas: [] },
          { name: "2 CIEL", teachingAreas: [] },
        ],
      },
      {
        name: "Première",
        classrooms: [
          {
            name: "1 AERO",
            teachingAreas: [
              {
                name: "PSE",
                kind: TeachingAreaKind.SUBJECT,
                learningSequences: [
                  {
                    title: "C3. Les acteurs de prévention",
                    description:
                      "Module C3 du programme de PSE de première professionnelle (annexe 1 « Prévention-santé-environnement — Classe de première professionnelle »). Objectif : faire travailler les élèves sur les compétences C1, C3 et C6 du référentiel à travers les exercices réalisés. Situation fil rouge de la classe : l’atelier de maintenance AéroMaintenance Atlantique (AMA). La position indique uniquement l’ordre d’affichage.",
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
                  },
                ],
              },
            ],
          },
          { name: "1 TCI", teachingAreas: [] },
        ],
      },
      {
        name: "Terminale",
        classrooms: [
          {
            name: "T AERO",
            teachingAreas: [
              {
                name: "PSE",
                kind: TeachingAreaKind.SUBJECT,
                learningSequences: [
                  {
                    title: "C7. Le suivi de la santé au travail",
                    description:
                      "Module C7 du programme de PSE de terminale professionnelle (arrêté du 3 avril 2019, annexe 2). Objectif : faire travailler les élèves sur les compétences C1, C3 et C6 du référentiel à travers les exercices réalisés. La position indique uniquement l’ordre d’affichage.",
                    lessons: [
                      {
                        title: "Identifier les modalités de suivi individuel médical des salariés",
                        description:
                          "Distinguer la visite d’information et de prévention, l’examen médical d’aptitude et le suivi individuel renforcé à partir d’une situation du hangar.",
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
                              explanation: "Ces huit verbes sont ceux des consignes de l’épreuve de PSE. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
                            },
                          },
                          {
                            title: "À retenir : VIP, EMA et suivi individuel renforcé",
                            type: "content",
                            instructions:
                              "Repérer les trois modalités de suivi médical présentées dans la fiche.",
                            payload: {
                              body: "Le suivi de santé au travail dépend du poste occupé et des risques réellement présents.\n\nLa visite d’information et de prévention (VIP) informe le salarié sur les risques de son poste et sur les moyens de prévention. Elle est réalisée par le service de prévention et de santé au travail.\n\nL’examen médical d’aptitude (EMA) concerne les postes présentant des risques particuliers. Il vérifie que le salarié peut occuper ce poste sans danger pour lui ni pour les autres.\n\nCertains postes exposés donnent lieu à un suivi individuel renforcé : les visites sont plus fréquentes et adaptées à l’exposition.\n\nAu hangar, Théo est exposé aux coupures sur tôles et rivets, ainsi qu’aux solvants et aux matériaux composites. Le service de prévention et de santé au travail conseille à la fois le salarié et l’employeur.",
                            },
                          },
                          {
                            title: "Défi 01 : la convocation de Théo",
                            type: "qcm",
                            instructions:
                              "Identifier la modalité de suivi médical qui correspond à la situation.",
                            payload: {
                              question: "Théo occupe un poste exposé aux coupures et aux solvants. Il est convoqué par le service de prévention et de santé au travail pour être informé des risques de son poste et des moyens de prévention. De quelle modalité s’agit-il ?",
                              choices: [
                                { id: "vip", label: "Une visite d’information et de prévention (VIP)" },
                                { id: "ema", label: "Un examen médical d’aptitude (EMA)" },
                                { id: "renforce", label: "Un suivi individuel renforcé" },
                              ],
                              correctChoiceIds: ["vip"],
                              explanation: "La visite d’information et de prévention informe le salarié sur les risques de son poste et sur les moyens de prévention.",
                            },
                          },
                          {
                            title: "Jeu : classer les modalités de suivi",
                            type: "sorting",
                            instructions:
                              "Classer chaque élément dans la modalité de suivi qui lui correspond.",
                            payload: {
                              prompt: "Trois modalités de suivi, trois rôles différents.",
                              categories: [
                                { id: "vip", label: "Visite d’information et de prévention" },
                                { id: "ema", label: "Examen médical d’aptitude" },
                                { id: "renforce", label: "Suivi individuel renforcé" },
                              ],
                              items: [
                                { id: "informer-risques", label: "Informer le salarié sur les risques de son poste", categoryId: "vip" },
                                { id: "informer-prevention", label: "Informer le salarié sur les moyens de prévention", categoryId: "vip" },
                                { id: "poste-risques", label: "Vérifier qu’un salarié peut occuper un poste à risques particuliers", categoryId: "ema" },
                                { id: "aptitude", label: "Se conclure par un avis d’aptitude au poste", categoryId: "ema" },
                                { id: "frequence", label: "Adapter la fréquence des visites à l’exposition du salarié", categoryId: "renforce" },
                                { id: "exposes", label: "Concerner en priorité les postes les plus exposés", categoryId: "renforce" },
                              ],
                              explanation: "La VIP informe, l’examen médical d’aptitude vérifie l’aptitude à un poste à risques particuliers, le suivi individuel renforcé adapte la fréquence des visites à l’exposition.",
                            },
                          },
                          {
                            title: "Vrai ou faux : l’examen d’aptitude pour tous",
                            type: "true_false",
                            instructions:
                              "Déduire si l’affirmation est exacte à partir de la fiche de notions.",
                            payload: {
                              statement: "L’examen médical d’aptitude concerne tous les salariés, quel que soit leur poste.",
                              correctAnswer: false,
                              explanation: "L’examen médical d’aptitude concerne les postes présentant des risques particuliers, et non l’ensemble des salariés.",
                            },
                          },
                          {
                            title: "Défi 02 : le rôle du service de santé au travail",
                            type: "qcm",
                            instructions:
                              "Expliquer le rôle du service de prévention et de santé au travail en choisissant l’énoncé exact.",
                            payload: {
                              question: "Quel énoncé décrit correctement le rôle du service de prévention et de santé au travail ?",
                              choices: [
                                { id: "sanctionne", label: "Il sanctionne le salarié qui ne respecte pas les consignes de sécurité." },
                                { id: "conseille", label: "Il conseille le salarié et l’employeur en matière de santé au travail." },
                                { id: "remplace", label: "Il remplace l’employeur pour évaluer les risques de l’entreprise." },
                              ],
                              correctChoiceIds: ["conseille"],
                              explanation: "Le service de prévention et de santé au travail a un rôle de conseil auprès du salarié et de l’employeur : il ne sanctionne pas et ne remplace pas l’employeur.",
                            },
                          },
                        ],
                      },
                      {
                        title: "Expliquer les moyens de défense de l’organisme face à l’infection microbienne",
                        description:
                          "Relier la barrière cutanéo-muqueuse, l’immunité non spécifique et l’immunité spécifique à une coupure survenue au hangar.",
                        activities: [
                          {
                            title: "À retenir : les défenses de l’organisme",
                            type: "content",
                            instructions:
                              "Repérer les trois moyens de défense décrits dans la fiche.",
                            payload: {
                              body: "La peau et les muqueuses forment la barrière cutanéo-muqueuse : c’est la première défense de l’organisme contre l’entrée des microbes.\n\nQuand un microbe franchit cette barrière, l’immunité non spécifique agit rapidement, sans viser un microbe précis. C’est elle qui provoque la rougeur et le gonflement autour d’une plaie.\n\nSi cette réponse ne suffit pas, l’immunité spécifique prend le relais. Elle reconnaît un antigène précis, c’est-à-dire un élément reconnu comme étranger par l’organisme.\n\nDes anticorps, produits par l’organisme, reconnaissent cet antigène. Des cellules spécialisées participent aussi à cette défense ciblée.\n\nUne coupure sur un bord de tôle ouvre la barrière cutanéo-muqueuse : nettoyer et surveiller la plaie limite l’entrée et la multiplication des microbes.",
                            },
                          },
                          {
                            title: "Jeu : classer les moyens de défense",
                            type: "sorting",
                            instructions:
                              "Classer chaque élément dans le moyen de défense correspondant.",
                            payload: {
                              prompt: "De la peau jusqu’aux anticorps : trois niveaux de défense.",
                              categories: [
                                { id: "barriere", label: "Barrière cutanéo-muqueuse" },
                                { id: "non-specifique", label: "Immunité non spécifique" },
                                { id: "specifique", label: "Immunité spécifique" },
                              ],
                              items: [
                                { id: "peau", label: "La peau intacte qui limite l’entrée des microbes", categoryId: "barriere" },
                                { id: "muqueuses", label: "Les muqueuses qui tapissent les voies respiratoires", categoryId: "barriere" },
                                { id: "rapide", label: "Une réponse rapide qui agit sans viser un microbe précis", categoryId: "non-specifique" },
                                { id: "rougeur", label: "La rougeur et le gonflement autour d’une plaie", categoryId: "non-specifique" },
                                { id: "antigene", label: "La reconnaissance d’un antigène précis", categoryId: "specifique" },
                                { id: "anticorps", label: "La production d’anticorps dirigés contre un antigène", categoryId: "specifique" },
                              ],
                              explanation: "La barrière cutanéo-muqueuse empêche l’entrée, l’immunité non spécifique réagit vite et sans cible précise, l’immunité spécifique vise un antigène donné.",
                            },
                          },
                          {
                            title: "Jeu : relier les notions d’immunité",
                            type: "matching",
                            instructions:
                              "Définir chaque notion en la reliant à sa définition exacte.",
                            payload: {
                              prompt: "Le lexique de la séance, à reconstituer.",
                              pairs: [
                                { id: "barriere", left: "Barrière cutanéo-muqueuse", right: "Peau et muqueuses qui limitent l’entrée des microbes" },
                                { id: "non-specifique", left: "Immunité non spécifique", right: "Réponse rapide qui agit sans viser un microbe précis" },
                                { id: "specifique", left: "Immunité spécifique", right: "Réponse ciblée contre un antigène précis" },
                                { id: "antigene", left: "Antigène", right: "Élément reconnu comme étranger par l’organisme" },
                                { id: "anticorps", left: "Anticorps", right: "Molécule produite par l’organisme qui reconnaît un antigène" },
                              ],
                              explanation: "Ces cinq notions sont celles du programme pour ce module : elles doivent être employées avec leur sens exact dans une réponse rédigée.",
                            },
                          },
                          {
                            title: "Défi 01 : la coupure de Théo",
                            type: "qcm",
                            instructions:
                              "Expliquer pourquoi une plaie doit être nettoyée en choisissant l’énoncé exact.",
                            payload: {
                              question: "Théo se coupe sur un bord de tôle. Pourquoi cette plaie doit-elle être nettoyée et surveillée ?",
                              choices: [
                                { id: "barriere-ouverte", label: "Parce que la coupure ouvre la barrière cutanéo-muqueuse et facilite l’entrée des microbes." },
                                { id: "peau-inutile", label: "Parce que la peau ne joue aucun rôle dans la défense de l’organisme." },
                                { id: "specifique-avant", label: "Parce que l’immunité spécifique agit toujours avant l’entrée d’un microbe." },
                              ],
                              correctChoiceIds: ["barriere-ouverte"],
                              explanation: "La coupure ouvre la première barrière de défense : nettoyer et surveiller la plaie limite l’entrée et la multiplication des microbes.",
                            },
                          },
                          {
                            title: "Vrai ou faux : l’anticorps universel",
                            type: "true_false",
                            instructions:
                              "Justifier l’exactitude de l’affirmation à partir de la fiche de notions.",
                            payload: {
                              statement: "Un anticorps reconnaît n’importe quel microbe, sans distinction.",
                              correctAnswer: false,
                              explanation: "Un anticorps reconnaît un antigène précis : c’est ce qui caractérise l’immunité spécifique.",
                            },
                          },
                        ],
                      },
                      {
                        title: "Expliquer le principe de la vaccination et justifier les vaccinations préconisées",
                        description:
                          "Distinguer ce qui relève du calendrier vaccinal de tous, d’une recommandation liée à l’exposition, d’une protection individuelle ou collective.",
                        activities: [
                          {
                            title: "À retenir : vaccination, mémoire immunitaire et recommandations",
                            type: "content",
                            instructions:
                              "Repérer ce qui relève d’une obligation et ce qui relève d’une recommandation.",
                            payload: {
                              body: "La vaccination présente à l’organisme un antigène ou une information associée, sans provoquer la maladie.\n\nL’organisme prépare alors une mémoire immunitaire : lors d’un nouveau contact avec le même antigène, la réponse est plus rapide.\n\nAucun texte n’impose de vaccination propre au métier de la maintenance aéronautique. Ce qui s’applique est le calendrier vaccinal de tous : le rappel diphtérie-tétanos-poliomyélite et coqueluche est prévu à 25 ans, 45 ans, 65 ans, puis tous les dix ans.\n\nCe rappel compte dans un hangar parce que le tétanos s’attrape par une plaie souillée, comme une coupure sur une tôle ou un rivet. La vaccination protège alors la personne vaccinée : c’est une protection individuelle.\n\nUne couverture vaccinale élevée ajoute une protection collective seulement pour une maladie transmissible d’une personne à une autre, ce qui n’est pas le cas du tétanos.\n\nL’employeur peut recommander d’autres vaccinations, à sa charge et sur proposition du médecin du travail, si l’évaluation des risques montre une exposition à des agents biologiques.\n\nLes obligations et les recommandations évoluent : elles se vérifient avec une source officielle et avec le service de prévention et de santé au travail.",
                            },
                          },
                          {
                            title: "Défi 01 : le principe de la vaccination",
                            type: "qcm",
                            instructions:
                              "Expliquer le principe de la vaccination en choisissant l’énoncé exact.",
                            payload: {
                              question: "Sur quel principe repose la vaccination ?",
                              choices: [
                                { id: "memoire", label: "Elle présente un antigène à l’organisme, qui prépare une mémoire immunitaire." },
                                { id: "maladie", label: "Elle provoque volontairement la maladie pour que l’organisme s’y habitue." },
                                { id: "remplace", label: "Elle remplace les anticorps de l’organisme par des anticorps fabriqués en laboratoire." },
                              ],
                              correctChoiceIds: ["memoire"],
                              explanation: "La vaccination prépare la mémoire immunitaire sans provoquer la maladie : lors d’un nouveau contact, la réponse est plus rapide.",
                            },
                          },
                          {
                            title: "Jeu : protection individuelle ou collective ?",
                            type: "sorting",
                            instructions:
                              "Classer chaque situation selon le type de protection apportée.",
                            payload: {
                              prompt: "Une vaccination ne protège pas toujours de la même manière.",
                              categories: [
                                { id: "individuelle", label: "Protection individuelle" },
                                { id: "collective", label: "Protection collective" },
                              ],
                              items: [
                                { id: "dtp", label: "Le rappel diphtérie-tétanos-poliomyélite protège la personne vaccinée", categoryId: "individuelle" },
                                { id: "tetanos", label: "Le tétanos ne se transmet pas d’une personne à une autre", categoryId: "individuelle" },
                                { id: "coqueluche", label: "Une couverture vaccinale élevée contre la coqueluche limite la circulation du microbe", categoryId: "collective" },
                                { id: "entourage", label: "La vaccination contre une maladie transmissible protège aussi l’entourage", categoryId: "collective" },
                              ],
                              explanation: "La vaccination protège d’abord la personne vaccinée. Elle ajoute une protection collective seulement pour une maladie qui se transmet d’une personne à une autre : ce n’est pas le cas du tétanos.",
                            },
                          },
                          {
                            title: "Vrai ou faux : une vaccination propre au métier",
                            type: "true_false",
                            instructions:
                              "Justifier l’exactitude de l’affirmation à partir de la fiche de notions.",
                            payload: {
                              statement: "Un texte impose une vaccination propre au métier de la maintenance aéronautique.",
                              correctAnswer: false,
                              explanation: "Aucun texte n’impose de vaccination propre à la maintenance aéronautique. C’est le calendrier vaccinal de tous qui s’applique, avec un rappel diphtérie-tétanos-poliomyélite et coqueluche à 25, 45 et 65 ans, puis tous les dix ans.",
                            },
                          },
                          {
                            title: "Défi 02 : qui propose une vaccination recommandée ?",
                            type: "qcm",
                            instructions:
                              "Indiquer l’interlocuteur qui propose une vaccination recommandée dans l’entreprise.",
                            payload: {
                              question: "Sur proposition de qui l’employeur peut-il recommander une vaccination à des salariés exposés à des agents biologiques ?",
                              choices: [
                                { id: "medecin", label: "Du médecin du travail" },
                                { id: "chef", label: "Du chef d’équipe" },
                                { id: "salarie", label: "Du salarié lui-même" },
                              ],
                              correctChoiceIds: ["medecin"],
                              explanation: "L’employeur recommande ces vaccinations, à sa charge, sur proposition du médecin du travail, lorsque l’évaluation des risques montre une exposition à des agents biologiques.",
                            },
                          },
                          {
                            title: "Jeu : relier les notions de la vaccination",
                            type: "matching",
                            instructions:
                              "Définir chaque notion en la reliant à sa définition exacte.",
                            payload: {
                              prompt: "Le lexique de la séance, à reconstituer.",
                              pairs: [
                                { id: "vaccination", left: "Vaccination", right: "Préparation de la mémoire immunitaire sans provoquer la maladie" },
                                { id: "memoire", left: "Mémoire immunitaire", right: "Capacité à répondre plus vite lors d’un nouveau contact" },
                                { id: "microbiologique", left: "Risque microbiologique", right: "Risque lié à la présence de micro-organismes dangereux sur un poste" },
                                { id: "couverture", left: "Couverture vaccinale", right: "Part d’une population vaccinée contre un agent infectieux" },
                                { id: "transmissible", left: "Maladie transmissible", right: "Maladie qui peut passer d’une personne à une autre" },
                              ],
                              explanation: "Ces notions sont celles du programme pour ce module : elles doivent être employées avec leur sens exact dans une réponse rédigée.",
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { name: "T TCI", teachingAreas: [] },
        ],
      },
    ],
  },
];

async function seedCatalog() {
  await prisma.$transaction(async (transaction) => {
    for (const [programIndex, initialProgram] of initialCatalog.entries()) {
      const program = await transaction.program.upsert({
        where: { name: initialProgram.name },
        create: {
          name: initialProgram.name,
          position: programIndex,
        },
        update: {
          position: programIndex,
          archivedAt: null,
        },
        select: { id: true },
      });

      for (const [levelIndex, initialLevel] of initialProgram.levels.entries()) {
        const level = await transaction.level.upsert({
          where: {
            programId_name: {
              programId: program.id,
              name: initialLevel.name,
            },
          },
          create: {
            programId: program.id,
            name: initialLevel.name,
            position: levelIndex,
          },
          update: {
            position: levelIndex,
            archivedAt: null,
          },
          select: { id: true },
        });

        for (const [classroomIndex, initialClassroom] of initialLevel.classrooms.entries()) {
          const classroom = await transaction.classroom.upsert({
            where: {
              levelId_name: {
                levelId: level.id,
                name: initialClassroom.name,
              },
            },
            create: {
              levelId: level.id,
              name: initialClassroom.name,
              position: classroomIndex,
            },
            update: {
              position: classroomIndex,
              archivedAt: null,
            },
            select: { id: true },
          });

          for (const [teachingAreaIndex, initialTeachingArea] of initialClassroom.teachingAreas.entries()) {
            const teachingArea = await transaction.teachingArea.upsert({
              where: {
                classroomId_name: {
                  classroomId: classroom.id,
                  name: initialTeachingArea.name,
                },
              },
              create: {
                classroomId: classroom.id,
                name: initialTeachingArea.name,
                kind: initialTeachingArea.kind,
                position: teachingAreaIndex,
              },
              update: {
                kind: initialTeachingArea.kind,
                position: teachingAreaIndex,
                archivedAt: null,
              },
              select: { id: true },
            });

            for (const [sequenceIndex, initialSequence] of (
              initialTeachingArea.learningSequences ?? []
            ).entries()) {
              const sequence = await transaction.learningSequence.upsert({
                where: {
                  teachingAreaId_title: {
                    teachingAreaId: teachingArea.id,
                    title: initialSequence.title,
                  },
                },
                create: {
                  teachingAreaId: teachingArea.id,
                  title: initialSequence.title,
                  description: initialSequence.description,
                  position: sequenceIndex,
                  status: SequenceStatus.OPEN,
                },
                update: {
                  description: initialSequence.description,
                  position: sequenceIndex,
                  status: SequenceStatus.OPEN,
                  archivedAt: null,
                },
                select: { id: true },
              });

              for (const [lessonIndex, initialLesson] of initialSequence.lessons.entries()) {
                const lesson = await transaction.lesson.upsert({
                  where: {
                    sequenceId_title: {
                      sequenceId: sequence.id,
                      title: initialLesson.title,
                    },
                  },
                  create: {
                    sequenceId: sequence.id,
                    title: initialLesson.title,
                    description: initialLesson.description,
                    position: lessonIndex,
                    publicationStatus: PublicationStatus.PUBLISHED,
                  },
                  update: {
                    description: initialLesson.description,
                    position: lessonIndex,
                    publicationStatus: PublicationStatus.PUBLISHED,
                    archivedAt: null,
                  },
                  select: { id: true },
                });

                for (const [activityIndex, initialActivity] of (
                  initialLesson.activities ?? []
                ).entries()) {
                  await transaction.activity.upsert({
                    where: {
                      lessonId_title: {
                        lessonId: lesson.id,
                        title: initialActivity.title,
                      },
                    },
                    create: {
                      lessonId: lesson.id,
                      title: initialActivity.title,
                      type: initialActivity.type,
                      instructions: initialActivity.instructions,
                      payload: initialActivity.payload,
                      track: ActivityTrack.CORE,
                      position: activityIndex,
                      publicationStatus: PublicationStatus.PUBLISHED,
                    },
                    update: {
                      type: initialActivity.type,
                      instructions: initialActivity.instructions,
                      payload: initialActivity.payload,
                      track: ActivityTrack.CORE,
                      position: activityIndex,
                      publicationStatus: PublicationStatus.PUBLISHED,
                      archivedAt: null,
                    },
                    select: { id: true },
                  });
                }
              }
            }
          }
        }
      }
    }
  });
}

seedCatalog()
  .then(async () => {
    console.info("Development catalog seeded.");
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error("Development catalog seed failed.");
    await prisma.$disconnect();
    process.exitCode = 1;

    if (process.env.NODE_ENV === "development") {
      console.error(error instanceof Error ? error.message : "Unknown error");
    }
  });
