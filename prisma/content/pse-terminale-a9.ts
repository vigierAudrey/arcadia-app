import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

// Séquence PSE de terminale professionnelle — module A9 « La sécurité
// alimentaire » du programme de PSE en baccalauréat professionnel.
//
// Les classes de terminale suivent la même séquence, en trois séances : seul
// le contexte professionnel change. Ce module porte la séquence,
// pse-taero-a9.ts et pse-ttci-a9.ts portent le contexte.
//
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero-a9.md et
// docs/mapping-pedagogique-t-tci-a9.md

export type TerminaleA9Context = {
  classroom: "T AERO" | "T TCI";
  /** Nom de l'atelier fil rouge, tel qu'il apparaît dans les cours. */
  place: string;
  /** Élève du fil rouge pour la première séance. */
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
      { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
      { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
      { id: "preciser", left: "Préciser", right: "Rendre clair ou exprimer de façon plus exacte" },
      { id: "indiquer", left: "Indiquer", right: "Donner un renseignement" },
    ],
    explanation:
      "Ces cinq verbes sont ceux des consignes de la séquence, et ceux de l’épreuve. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
  },
};

export function buildPseTerminaleA9Sequence(context: TerminaleA9Context): InitialLearningSequence {
  return {
    title: "A9. La sécurité alimentaire",
    description: `Tu vas apprendre à repérer ce qui rend un aliment sûr ou dangereux, comment le conserver et qui protège le consommateur, à partir de situations de l’atelier ${context.place}.`,
    lessons: [
      {
        title: "La qualité sanitaire des aliments",
        description: `Expliquer les qualités microbiologique et chimique d’un aliment, à partir de la situation de ${context.learner}.`,
        activities: [
          verbsActivity,
          {
            title: "À retenir : deux qualités à ne pas confondre",
            type: "content",
            instructions: "Expliquer les deux principaux critères de la qualité sanitaire des aliments.",
            payload: {
              body: `Après une journée à l’atelier ${context.place}, ${context.learner} retrouve une gamelle restée plusieurs heures hors du froid.\n\nLa qualité sanitaire d’un aliment comporte deux aspects à ne jamais confondre.\n\nLa qualité microbiologique, c’est l’absence ou la maîtrise des micro-organismes dangereux dans l’aliment.\n\nLa qualité chimique, c’est la maîtrise des substances chimiques indésirables dans l’aliment, comme des résidus de pesticides ou de produits de nettoyage.\n\nUn agent contaminant est l’agent, biologique ou chimique, qui altère la sécurité d’un aliment : une bactérie, une moisissure ou un virus relèvent du contaminant biologique ; un résidu de produit, un métal lourd ou une substance migrée d’un emballage relèvent du contaminant chimique.\n\nLes micro-organismes se développent sur la matière organique, c’est-à-dire la matière issue du vivant, quand trois conditions sont réunies : une température favorable, de l’eau, et du temps. La flore de décomposition désigne les micro-organismes qui dégradent progressivement l’aliment.\n\nUn point de vigilance : l’odeur ou l’apparence ne suffisent pas toujours à conclure qu’un aliment est sûr. Une contamination peut rester invisible.`,
            },
          },
          {
            title: "Jeu : contaminant biologique ou chimique",
            type: "sorting",
            instructions: "Classer chaque exemple selon le type de contaminant en cause.",
            payload: {
              prompt: "Classe chaque situation selon le type de contaminant qu’elle illustre.",
              categories: [
                { id: "bio", label: "Contaminant biologique" },
                { id: "chimique", label: "Contaminant chimique" },
              ],
              items: [
                { id: "bacteries", label: "Des bactéries dans un plat resté hors du froid", categoryId: "bio" },
                { id: "moisissures", label: "Des moisissures apparues sur du pain", categoryId: "bio" },
                { id: "virus", label: "Un virus transmis par des mains mal lavées", categoryId: "bio" },
                { id: "flore", label: "La flore de décomposition d’un aliment oublié", categoryId: "bio" },
                { id: "nettoyage", label: "Un résidu de produit de nettoyage mal rincé", categoryId: "chimique" },
                { id: "pesticides", label: "Un résidu de pesticide sur un fruit", categoryId: "chimique" },
                { id: "metal", label: "Un métal lourd présent dans un poisson", categoryId: "chimique" },
                { id: "emballage", label: "Une substance migrée d’un emballage chauffé", categoryId: "chimique" },
              ],
              explanation:
                "Le contaminant biologique est un être vivant microscopique (bactérie, moisissure, virus) ou ce qu’il produit. Le contaminant chimique est une substance indésirable, jamais vivante.",
            },
          },
          {
            title: "Jeu : le lexique de la qualité sanitaire",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "microbio", left: "Qualité microbiologique", right: "Absence ou maîtrise des micro-organismes dangereux dans un aliment" },
                { id: "chimique", left: "Qualité chimique", right: "Maîtrise des substances chimiques indésirables dans un aliment" },
                { id: "contaminant", left: "Agent contaminant", right: "Agent biologique ou chimique qui altère la sécurité d’un aliment" },
                { id: "flore", left: "Flore de décomposition", right: "Micro-organismes qui dégradent progressivement un aliment" },
                { id: "matiere", left: "Matière organique", right: "Matière issue du vivant, support du développement des micro-organismes" },
              ],
              explanation:
                "Ces cinq mots sont ceux attendus à l’épreuve. « Flore de décomposition » et « agent contaminant » ne désignent pas la même chose : l’un dégrade, l’autre altère la sécurité.",
            },
          },
          {
            title: "Défi 01 : quelles conditions favorisent les micro-organismes",
            type: "qcm",
            instructions: "Identifier les conditions qui favorisent le développement des micro-organismes.",
            payload: {
              question: "Quelles conditions favorisent le développement des micro-organismes sur un aliment ?",
              choices: [
                { id: "bon", label: "Une température favorable, de l’eau et du temps" },
                { id: "froid", label: "Le froid et l’obscurité totale, quelle que soit la durée" },
                { id: "sec", label: "Un milieu sec et sans matière organique" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Trois conditions réunies suffisent : une température favorable, de l’eau, et du temps. C’est pourquoi une gamelle oubliée hors du froid devient vite à risque.",
            },
          },
          {
            title: "Défi 02 : reconnaître la qualité chimique",
            type: "qcm",
            instructions: "Reconnaître un exemple relevant de la qualité chimique.",
            payload: {
              question: "Lequel de ces exemples relève de la qualité chimique d’un aliment ?",
              choices: [
                { id: "pesticide", label: "Un résidu de pesticide détecté sur un légume" },
                { id: "bacterie", label: "Une bactérie qui se multiplie dans un plat" },
                { id: "moisissure", label: "Une moisissure visible sur du pain" },
              ],
              correctChoiceIds: ["pesticide"],
              explanation:
                "Un résidu de pesticide est une substance chimique indésirable : il relève de la qualité chimique. Bactérie et moisissure relèvent, elles, de la qualité microbiologique.",
            },
          },
          {
            title: "Vrai ou faux : l’odeur suffit à juger un aliment",
            type: "true_false",
            instructions: "Expliquer si l’apparence suffit à juger la sécurité d’un aliment.",
            payload: {
              statement: "L’odeur ou l’apparence d’un aliment suffisent toujours à savoir s’il est sûr.",
              correctAnswer: false,
              explanation:
                "Faux : une contamination peut rester invisible et sans odeur perceptible. L’apparence normale ne garantit pas la sécurité sanitaire.",
            },
          },
          {
            title: "Vrai ou faux : la flore de décomposition",
            type: "true_false",
            instructions: "Définir le rôle de la flore de décomposition.",
            payload: {
              statement: "La flore de décomposition désigne les micro-organismes qui dégradent progressivement un aliment.",
              correctAnswer: true,
              explanation: "Vrai : c’est exactement la définition attendue. Elle agit d’autant plus vite que la température, l’eau et le temps le permettent.",
            },
          },
          {
            title: "Défi 03 : identifier deux faits utiles",
            type: "qcm",
            instructions: `Identifier ce qui rend la situation de ${context.learner} à risque.`,
            payload: {
              question: `${context.learner} retrouve une gamelle restée plusieurs heures hors du froid. Quel fait rend la situation à risque ?`,
              choices: [
                { id: "temps", label: "Le temps passé hors du froid, qui favorise le développement microbien" },
                { id: "couleur", label: "La couleur de la gamelle" },
                { id: "marque", label: "La marque du contenant" },
              ],
              correctChoiceIds: ["temps"],
              explanation:
                "Le temps passé hors du froid est le fait utile : il permet aux micro-organismes de se développer si la température et l’eau sont favorables.",
            },
          },
        ],
      },
      {
        title: "Conserver et lire une étiquette",
        description: "Expliquer les précautions de conservation et repérer les allergènes et les additifs sur une étiquette.",
        activities: [
          {
            title: "À retenir : chaîne du froid, dates et allergènes",
            type: "content",
            instructions: "Expliquer les précautions qui maintiennent la qualité d’un aliment jusqu’à sa consommation.",
            payload: {
              body: `La chaîne du froid est le maintien d’une température adaptée, de la production jusqu’à la consommation. L’interrompre, même brièvement, favorise la multiplication microbienne.\n\nDeux dates figurent sur les étiquettes, et elles ne se confondent pas.\n\nLa DLC, date limite de consommation, est la date après laquelle un aliment très périssable peut présenter un risque sanitaire : au-delà, l’aliment ne doit plus être consommé.\n\nLa DDM, date de durabilité minimale, est la date après laquelle les qualités peuvent diminuer, sans signifier automatiquement un danger : au-delà, l’aliment reste souvent consommable.\n\nUn allergène est une substance pouvant déclencher une réaction chez une personne sensible : la réglementation impose de le mettre en évidence dans la liste des ingrédients.\n\nUn additif est une substance ajoutée à un aliment pour une fonction technologique précise (conservation, couleur, texture…), distincte d’un contaminant.\n\nEnfin, le lavage des mains est un geste d’hygiène qui réduit la flore présente sur la peau avant de manipuler un aliment : un geste simple, mais déterminant.`,
            },
          },
          {
            title: "Jeu : le lexique de la conservation",
            type: "matching",
            instructions: "Définir chaque notion de l’étiquette alimentaire.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "chaine", left: "Chaîne du froid", right: "Maintien d’une température adaptée de la production à la consommation" },
                { id: "dlc", left: "DLC", right: "Date après laquelle un aliment très périssable peut présenter un risque sanitaire" },
                { id: "ddm", left: "DDM", right: "Date après laquelle les qualités peuvent diminuer sans signifier automatiquement un danger" },
                { id: "allergene", left: "Allergène", right: "Substance pouvant déclencher une réaction chez une personne sensible" },
                { id: "additif", left: "Additif", right: "Substance ajoutée pour une fonction technologique" },
              ],
              explanation:
                "DLC et DDM sont les deux dates à ne jamais confondre : l’une porte sur la sécurité, l’autre surtout sur la qualité.",
            },
          },
          {
            title: "Jeu : sécurité ou qualité",
            type: "sorting",
            instructions: "Classer chaque situation selon ce qu’elle met en jeu : la sécurité ou la qualité.",
            payload: {
              prompt: "Classe chaque situation selon la date ou la précaution qu’elle concerne.",
              categories: [
                { id: "securite", label: "Concerne la sécurité (DLC, chaîne du froid)" },
                { id: "qualite", label: "Concerne surtout la qualité (DDM)" },
              ],
              items: [
                { id: "yaourt", label: "Un yaourt consommé après sa date limite de consommation", categoryId: "securite" },
                { id: "gamelle", label: "Une gamelle restée plusieurs heures hors du réfrigérateur", categoryId: "securite" },
                { id: "surgele", label: "Un produit surgelé décongelé puis recongelé", categoryId: "securite" },
                { id: "biscuit", label: "Un paquet de biscuits ouvert après sa date de durabilité minimale", categoryId: "qualite" },
                { id: "riz", label: "Un sachet de riz un peu passé sa date de durabilité minimale", categoryId: "qualite" },
              ],
              explanation:
                "La DLC et la rupture de la chaîne du froid touchent à la sécurité : un vrai risque sanitaire. La DDM touche surtout au goût ou à la texture, sans danger automatique.",
            },
          },
          {
            title: "Défi 04 : DLC ou DDM",
            type: "qcm",
            instructions: "Distinguer la date limite de consommation de la date de durabilité minimale.",
            payload: {
              question: "Quelle date, dépassée, signifie qu’un aliment très périssable peut présenter un risque sanitaire ?",
              choices: [
                { id: "dlc", label: "La DLC, date limite de consommation" },
                { id: "ddm", label: "La DDM, date de durabilité minimale" },
                { id: "aucune", label: "Aucune des deux : seule l’odeur compte" },
              ],
              correctChoiceIds: ["dlc"],
              explanation:
                "La DLC porte sur la sécurité des aliments très périssables. La DDM porte surtout sur la qualité, sans danger automatique au-delà.",
            },
          },
          {
            title: "Défi 05 : à quoi sert un additif",
            type: "qcm",
            instructions: "Définir le rôle d’un additif alimentaire.",
            payload: {
              question: "Qu’est-ce qu’un additif alimentaire ?",
              choices: [
                { id: "bon", label: "Une substance ajoutée à un aliment pour une fonction technologique" },
                { id: "contaminant", label: "Un contaminant chimique accidentel" },
                { id: "allergene", label: "Un synonyme d’allergène" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "L’additif est ajouté volontairement, pour une fonction précise. Le contaminant, lui, est indésirable et non voulu.",
            },
          },
          {
            title: "Vrai ou faux : repérer un allergène",
            type: "true_false",
            instructions: "Expliquer l’intérêt de la mention des allergènes sur une étiquette.",
            payload: {
              statement: "La réglementation impose de mettre en évidence les allergènes dans la liste des ingrédients.",
              correctAnswer: true,
              explanation: "Vrai : cette mise en évidence protège les personnes sensibles, qui doivent pouvoir repérer l’allergène rapidement.",
            },
          },
          {
            title: "Vrai ou faux : le lavage des mains",
            type: "true_false",
            instructions: "Justifier l’intérêt du lavage des mains avant de manipuler un aliment.",
            payload: {
              statement: "Le lavage des mains réduit la flore présente sur la peau avant de manipuler un aliment.",
              correctAnswer: true,
              explanation: "Vrai : un geste simple, mais qui limite directement le risque de contamination biologique transmis par les mains.",
            },
          },
        ],
      },
      {
        title: "Le dispositif de sécurité alimentaire",
        description: "Présenter les acteurs et les principes qui protègent le consommateur en France.",
        activities: [
          {
            title: "À retenir : qui protège le consommateur",
            type: "content",
            instructions: "Présenter le dispositif garantissant la sécurité alimentaire du consommateur en France.",
            payload: {
              body: `Un produit fait l’objet d’un rappel : comment l’information circule-t-elle, et qui contrôle ?\n\nLa sécurité alimentaire en France repose sur plusieurs piliers qui se complètent.\n\nLa réglementation fixe les règles officielles qui encadrent la production et la vente des aliments, notamment le « paquet hygiène » européen.\n\nLe contrôle sanitaire regroupe l’ensemble des actions publiques et professionnelles visant la sécurité des aliments, en particulier les contrôles menés par la direction départementale de protection des populations (DDPP).\n\nLa traçabilité permet de suivre un produit et son lot, de la production jusqu’à la vente : c’est elle qui permet de cibler précisément un rappel, sans tout retirer.\n\nLe principe de précaution conduit à agir face à un risque possible, même en l’absence de certitude scientifique totale.\n\nFace à un rappel de produit, les consignes officielles diffusées (ne pas consommer, rapporter en magasin…) doivent être suivies, et l’information passe par des sites officiels.`,
            },
          },
          {
            title: "Jeu : le lexique du dispositif de sécurité alimentaire",
            type: "matching",
            instructions: "Définir chaque notion du dispositif de sécurité alimentaire.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "reglementation", left: "Réglementation", right: "Ensemble des règles officielles qui encadrent la production et la vente des aliments" },
                { id: "controle", left: "Contrôle sanitaire", right: "Ensemble d’actions publiques et professionnelles visant la sécurité des aliments" },
                { id: "tracabilite", left: "Traçabilité", right: "Possibilité de suivre un produit et son lot" },
                { id: "precaution", left: "Principe de précaution", right: "Action prise face à un risque possible malgré une incertitude scientifique" },
              ],
              explanation:
                "Ces quatre notions forment le dispositif complet : des règles, des contrôles, un suivi du produit, et une action possible même sans certitude totale.",
            },
          },
          {
            title: "Jeu : qui fait quoi dans le dispositif",
            type: "sorting",
            instructions: "Classer chaque action selon le pilier du dispositif qu’elle illustre.",
            payload: {
              prompt: "Classe chaque action selon ce qu’elle illustre.",
              categories: [
                { id: "controle", label: "Contrôle sanitaire" },
                { id: "tracabilite", label: "Traçabilité" },
                { id: "precaution", label: "Principe de précaution" },
              ],
              items: [
                { id: "inspection", label: "Une inspection d’hygiène menée dans un établissement", categoryId: "controle" },
                { id: "analyse", label: "Une analyse microbiologique réalisée sur un échantillon", categoryId: "controle" },
                { id: "lot", label: "Le retrait d’un seul lot identifié grâce à son numéro", categoryId: "tracabilite" },
                { id: "suivi", label: "Le suivi d’un produit depuis le producteur jusqu’au magasin", categoryId: "tracabilite" },
                { id: "retrait", label: "Le retrait préventif d’un produit sans certitude totale sur le danger", categoryId: "precaution" },
              ],
              explanation:
                "Le contrôle vérifie le respect des règles. La traçabilité cible précisément ce qui doit être retiré. Le principe de précaution agit avant d’avoir toutes les certitudes.",
            },
          },
          {
            title: "Défi 06 : qui contrôle en France",
            type: "qcm",
            instructions: "Identifier le rôle du contrôle sanitaire.",
            payload: {
              question: "Que recouvre le contrôle sanitaire des aliments ?",
              choices: [
                { id: "bon", label: "L’ensemble des actions publiques et professionnelles visant la sécurité des aliments" },
                { id: "seul", label: "Uniquement les analyses faites par le fabricant lui-même" },
                { id: "aucun", label: "Aucune action concrète, seulement des recommandations" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Le contrôle sanitaire associe les professionnels et les autorités publiques, comme la DDPP, qui vérifient le respect de la réglementation.",
            },
          },
          {
            title: "Défi 07 : agir malgré l’incertitude",
            type: "qcm",
            instructions: "Définir le principe de précaution.",
            payload: {
              question: "Qu’est-ce que le principe de précaution ?",
              choices: [
                { id: "bon", label: "Agir face à un risque possible, malgré une incertitude scientifique" },
                { id: "attendre", label: "Attendre une certitude scientifique totale avant d’agir" },
                { id: "ignorer", label: "Ignorer un risque tant qu’il n’est pas prouvé" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Le principe de précaution permet d’agir avant d’avoir toutes les preuves, justement parce qu’attendre pourrait exposer le consommateur à un risque réel.",
            },
          },
          {
            title: "Vrai ou faux : un rappel retire tout le produit",
            type: "true_false",
            instructions: "Justifier l’intérêt de la traçabilité lors d’un rappel.",
            payload: {
              statement: "Grâce à la traçabilité, un rappel ne retire que le lot concerné, pas tout le produit vendu en France.",
              correctAnswer: true,
              explanation: "Vrai : la traçabilité permet de cibler précisément le lot concerné, sans retirer l’ensemble de la production.",
            },
          },
          {
            title: "Vrai ou faux : suivre les consignes officielles",
            type: "true_false",
            instructions: "Justifier la conduite à tenir face à un rappel de produit.",
            payload: {
              statement: "Face à un rappel de produit, il vaut mieux suivre les consignes officielles diffusées plutôt que décider seul.",
              correctAnswer: true,
              explanation: "Vrai : les consignes officielles (ne pas consommer, rapporter en magasin…) s’appuient sur l’analyse des autorités compétentes.",
            },
          },
        ],
      },
    ],
  };
}
