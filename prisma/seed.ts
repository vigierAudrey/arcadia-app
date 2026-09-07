import {
  ActivityTrack,
  PublicationStatus,
  SequenceStatus,
  TeachingAreaKind,
} from "../src/generated/prisma/enums";
import { prisma } from "../src/server/db/prisma";
import type { InitialProgram } from "./content/catalog-types";
import { pse1AeroC3Sequence } from "./content/pse-1aero-c3";

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
                  pse1AeroC3Sequence,
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
