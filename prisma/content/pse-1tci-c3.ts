import type { InitialLearningSequence } from "./catalog-types";

// Séquence PSE de 1 TCI — module C3 « Les acteurs de prévention ».
// Traçabilité complète des sources : docs/mapping-pedagogique-1-tci.md
export const pse1TciC3Sequence: InitialLearningSequence = {
  title: "C3. Les acteurs de prévention",
  description:
    "Tu vas apprendre qui agit pour prévenir les risques au travail, dans l’entreprise et autour d’elle, à partir de situations de l’atelier CDE.",
  lessons: [
    {
      title: "Identifier les rôles des acteurs internes de prévention",
      description:
        "Distinguer le CSE, le salarié compétent, le SST et le service de prévention et de santé au travail à partir d'un incident d'ébavurage chez CDE.",
      activities: [
        {
          title: "Décodage des consignes : les verbes de l'épreuve",
          type: "matching",
          instructions:
            "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
          payload: {
            prompt:
              "Relie chaque verbe à l'action attendue dans une réponse de PSE.",
            pairs: [
              {
                id: "identifier",
                left: "Identifier",
                right: "Reconnaître et nommer",
              },
              {
                id: "reperer",
                left: "Repérer",
                right: "Trouver une information utile",
              },
              {
                id: "classer",
                left: "Classer",
                right: "Ranger dans la bonne catégorie",
              },
              {
                id: "definir",
                left: "Définir",
                right: "Donner le sens précis d'une notion",
              },
              {
                id: "expliquer",
                left: "Expliquer",
                right: "Rendre clair avec un argument",
              },
              {
                id: "justifier",
                left: "Justifier",
                right: "Appuyer la réponse sur un fait ou un document",
              },
            ],
            explanation:
              "Le verbe de consigne indique la production attendue : nommer, classer, expliquer ou justifier ne demandent pas la même réponse.",
          },
        },
        {
          title: "À retenir : les acteurs internes chez CDE",
          type: "content",
          instructions:
            "Repérer les quatre acteurs internes de prévention et leur mission.",
          payload: {
            body: "Chez CDE, Karim se coupe légèrement pendant l'ébavurage d'une tôle. Un sauveteur secouriste du travail intervient. M. Berthier constate que ce type d'incident revient. Le salarié compétent observe le poste. Le CSE demande que le sujet soit discuté. Le service de prévention et de santé au travail conseille l'entreprise.\n\nLe comité social et économique (CSE) représente les salariés. Il contribue aux questions de santé et de sécurité, analyse des situations et formule des propositions.\n\nLe salarié compétent aide l'employeur dans les activités de protection et de prévention des risques professionnels.\n\nLe sauveteur secouriste du travail (SST) intervient face à un accident dans la limite de sa formation : il protège, examine, alerte et secourt selon la situation.\n\nLe service de prévention et de santé au travail (SPST) suit la santé des salariés et conseille le salarié comme l'employeur.\n\nLa prévention est une action collective : plusieurs acteurs peuvent coopérer sur une même situation.",
          },
        },
        {
          title: "Défi 01 : la coupure de Karim",
          type: "qcm",
          instructions:
            "Identifier l'acteur interne qui intervient en premier après un accident.",
          payload: {
            question:
              "Karim se coupe pendant l'ébavurage d'une tôle. Une personne formée protège, examine et alerte si besoin. De quel acteur s'agit-il ?",
            choices: [
              { id: "sst", label: "Le sauveteur secouriste du travail" },
              { id: "cse", label: "Le comité social et économique" },
              { id: "carsat", label: "La CARSAT" },
              { id: "client", label: "Le client de CDE" },
            ],
            correctChoiceIds: ["sst"],
            explanation:
              "Le SST intervient face à un accident dans la limite de sa formation. Il ne remplace pas les secours spécialisés.",
          },
        },
        {
          title: "Jeu : classer les missions internes",
          type: "sorting",
          instructions:
            "Classer chaque mission dans la colonne de l'acteur interne concerné.",
          payload: {
            prompt:
              "Quatre acteurs internes interviennent chez CDE. Classe les missions.",
            categories: [
              { id: "cse", label: "CSE" },
              { id: "salarie_competent", label: "Salarié compétent" },
              { id: "sst", label: "SST" },
              { id: "spst", label: "SPST" },
            ],
            items: [
              {
                id: "cse_1",
                label: "Représenter les salariés sur la santé-sécurité",
                categoryId: "cse",
              },
              {
                id: "cse_2",
                label: "Formuler une proposition en réunion",
                categoryId: "cse",
              },
              {
                id: "sc_1",
                label: "Aider l'employeur à organiser la prévention",
                categoryId: "salarie_competent",
              },
              {
                id: "sc_2",
                label: "Observer un poste qui provoque des incidents",
                categoryId: "salarie_competent",
              },
              {
                id: "sst_1",
                label: "Protéger, examiner, alerter et secourir",
                categoryId: "sst",
              },
              {
                id: "sst_2",
                label: "Intervenir dans la limite de sa formation",
                categoryId: "sst",
              },
              {
                id: "spst_1",
                label: "Suivre la santé des salariés",
                categoryId: "spst",
              },
              {
                id: "spst_2",
                label: "Conseiller salarié et employeur",
                categoryId: "spst",
              },
            ],
            explanation:
              "Les acteurs internes ont des missions différentes, mais ils coopèrent pour améliorer la prévention.",
          },
        },
        {
          title: "Vrai ou faux : le SST remplace les secours",
          type: "true_false",
          instructions: "Justifier la réponse à partir de la mission du SST.",
          payload: {
            statement:
              "Le sauveteur secouriste du travail remplace toujours les secours spécialisés.",
            correctAnswer: false,
            explanation:
              "Faux : il intervient dans la limite de sa formation et alerte les secours spécialisés si la situation le nécessite.",
          },
        },
        {
          title: "Jeu : relier chaque acteur interne à son rôle",
          type: "matching",
          instructions:
            "Définir le rôle de chaque acteur interne de prévention.",
          payload: {
            prompt: "Reconstitue le réseau interne de prévention chez CDE.",
            pairs: [
              {
                id: "cse",
                left: "CSE",
                right: "Expression collective des salariés",
              },
              {
                id: "salarie_competent",
                left: "Salarié compétent",
                right: "Appui interne à l'employeur",
              },
              { id: "sst", left: "SST", right: "Première intervention formée" },
              { id: "spst", left: "SPST", right: "Suivi de santé et conseil" },
            ],
            explanation:
              "Ces acteurs agissent dans l'entreprise. Le bon interlocuteur dépend du besoin observé.",
          },
        },
      ],
    },
    {
      title: "Identifier les missions des organismes externes à l'entreprise",
      description:
        "Comparer les missions de l'inspection du travail et de la CARSAT, puis choisir l'interlocuteur adapté à une demande formulée à partir de faits précis.",
      activities: [
        {
          title: "À retenir : inspection du travail et CARSAT",
          type: "content",
          instructions:
            "Repérer les deux organismes externes et leurs missions.",
          payload: {
            body: "Chez CDE, plusieurs presque-accidents surviennent près de la cisaille. M. Berthier cherche un accompagnement pour améliorer la prévention. Des salariés s'interrogent aussi sur l'application de règles de sécurité.\n\nL'inspection du travail informe et conseille les salariés et l'employeur sur le droit du travail. Elle contrôle son application et peut intervenir dans le cadre de ses pouvoirs de contrôle.\n\nLa CARSAT accompagne les entreprises dans la prévention des risques professionnels : conseils, outils, actions et ressources adaptées.\n\nCes organismes externes ne remplacent pas les acteurs internes. Le bon interlocuteur dépend du problème rencontré.\n\nAvant un contact, il faut décrire des faits précis et formuler une demande claire, sans accusation ni rumeur.",
          },
        },
        {
          title: "Défi 02 : prévenir les presque-accidents à la cisaille",
          type: "qcm",
          instructions:
            "Identifier l'organisme externe adapté à une demande d'accompagnement.",
          payload: {
            question:
              "CDE veut réduire les presque-accidents autour de la cisaille et cherche des conseils, outils et ressources de prévention. Quel organisme contacter en priorité ?",
            choices: [
              { id: "carsat", label: "La CARSAT" },
              { id: "inspection", label: "L'inspection du travail" },
              { id: "cse", label: "Le CSE" },
              { id: "fournisseur", label: "Le fournisseur de tôles" },
            ],
            correctChoiceIds: ["carsat"],
            explanation:
              "La CARSAT accompagne les entreprises dans la prévention des risques professionnels.",
          },
        },
        {
          title: "Défi 03 : une règle qui ne serait pas appliquée",
          type: "qcm",
          instructions:
            "Indiquer l'organisme externe qui informe et contrôle le droit du travail.",
          payload: {
            question:
              "Un salarié pense qu'une règle de sécurité n'est pas appliquée. Quel organisme externe informe sur le droit du travail et contrôle son application ?",
            choices: [
              { id: "inspection", label: "L'inspection du travail" },
              { id: "carsat", label: "La CARSAT" },
              { id: "sst", label: "Le SST" },
              { id: "client", label: "Le client" },
            ],
            correctChoiceIds: ["inspection"],
            explanation:
              "L'inspection du travail informe, conseille et contrôle l'application du droit du travail.",
          },
        },
        {
          title: "Jeu : inspection du travail ou CARSAT ?",
          type: "sorting",
          instructions:
            "Classer chaque demande selon l'organisme externe concerné.",
          payload: {
            prompt: "Classe les demandes formulées chez CDE.",
            categories: [
              { id: "inspection", label: "Inspection du travail" },
              { id: "carsat", label: "CARSAT" },
            ],
            items: [
              {
                id: "it_1",
                label:
                  "Obtenir une information sur une règle du droit du travail",
                categoryId: "inspection",
              },
              {
                id: "it_2",
                label: "Contrôler l'application d'une règle de sécurité",
                categoryId: "inspection",
              },
              {
                id: "it_3",
                label: "Être conseillé sur les droits et obligations",
                categoryId: "inspection",
              },
              {
                id: "ca_1",
                label: "Construire un projet de prévention à la cisaille",
                categoryId: "carsat",
              },
              {
                id: "ca_2",
                label: "Obtenir des outils pour réduire les coupures",
                categoryId: "carsat",
              },
              {
                id: "ca_3",
                label: "Préparer une action de sensibilisation en atelier",
                categoryId: "carsat",
              },
            ],
            explanation:
              "Une demande liée au droit du travail va vers l'inspection du travail ; une demande d'accompagnement en prévention va vers la CARSAT.",
          },
        },
        {
          title: "Vrai ou faux : un organisme externe remplace le CSE",
          type: "true_false",
          instructions:
            "Expliquer si les organismes externes remplacent les acteurs internes.",
          payload: {
            statement:
              "La CARSAT ou l'inspection du travail remplace le CSE dans l'entreprise.",
            correctAnswer: false,
            explanation:
              "Faux : les organismes externes complètent l'action interne. Ils ne remplacent pas les acteurs de l'entreprise.",
          },
        },
        {
          title: "Mission CDE : préparer un contact utile",
          type: "qcm",
          instructions:
            "Identifier la formulation appuyée sur des faits précis.",
          payload: {
            question:
              "Quelle demande est la plus utile avant de contacter un organisme externe ?",
            choices: [
              {
                id: "faits",
                label:
                  "Depuis deux semaines, trois presque-accidents ont été observés près de la cisaille ; nous demandons un accompagnement pour réduire ce risque.",
              },
              {
                id: "accusation",
                label: "Le chef d'atelier ne fait pas son travail.",
              },
              { id: "rumeur", label: "On dit que la sécurité est mauvaise." },
              { id: "vague", label: "Il y a un problème, merci de venir." },
            ],
            correctChoiceIds: ["faits"],
            explanation:
              "Une demande efficace décrit les faits, le poste concerné et le besoin, sans accusation ni rumeur.",
          },
        },
      ],
    },
    {
      title: "Choisir l'interlocuteur adapté à une situation de prévention",
      description:
        "Bilan de la séquence : distinguer acteurs internes et organismes externes, puis formuler une demande claire.",
      activities: [
        {
          title: "À retenir : l'essentiel de la séquence",
          type: "content",
          instructions: "Repérer les cinq points essentiels de la séquence.",
          payload: {
            body: "Les acteurs internes agissent dans l'entreprise : CSE, salarié compétent, SST et SPST.\n\nLes organismes externes complètent l'action : inspection du travail et CARSAT.\n\nChaque acteur a une mission précise. Plusieurs acteurs peuvent coopérer sur une même situation.\n\nPour choisir un interlocuteur, je décris d'abord les faits, puis j'identifie le besoin : secours, conseil santé, organisation de la prévention, expression collective, droit du travail ou accompagnement.\n\nJe formule ensuite une demande claire, sans accusation ni rumeur.",
          },
        },
        {
          title: "Jeu : interne ou externe ?",
          type: "sorting",
          instructions:
            "Classer chaque situation selon qu'elle relève d'un acteur interne ou d'un organisme externe.",
          payload: {
            prompt:
              "Dix situations chez CDE : interne à l'entreprise ou organisme extérieur ?",
            categories: [
              { id: "interne", label: "Acteur interne" },
              { id: "externe", label: "Organisme externe" },
            ],
            items: [
              {
                id: "int_1",
                label: "Secours immédiat après une coupure",
                categoryId: "interne",
              },
              {
                id: "int_2",
                label: "Expression collective des salariés",
                categoryId: "interne",
              },
              {
                id: "int_3",
                label: "Appui interne à l'employeur",
                categoryId: "interne",
              },
              {
                id: "int_4",
                label: "Suivi de santé d'un salarié",
                categoryId: "interne",
              },
              {
                id: "int_5",
                label: "Conseil sur l'exposition aux fumées de soudage",
                categoryId: "interne",
              },
              {
                id: "ext_1",
                label: "Contrôle de l'application du droit du travail",
                categoryId: "externe",
              },
              {
                id: "ext_2",
                label: "Information sur une règle du travail",
                categoryId: "externe",
              },
              {
                id: "ext_3",
                label: "Accompagnement d'un projet de prévention",
                categoryId: "externe",
              },
              {
                id: "ext_4",
                label: "Ressources de prévention pour l'entreprise",
                categoryId: "externe",
              },
              {
                id: "ext_5",
                label: "Conseils d'un organisme extérieur spécialisé",
                categoryId: "externe",
              },
            ],
            explanation:
              "Interne ou externe, l'interlocuteur se choisit selon le besoin et les faits observés.",
          },
        },
        {
          title: "Défi 04 : irritations après soudage",
          type: "qcm",
          instructions:
            "Déduire l'enchaînement d'acteurs adapté à la situation.",
          payload: {
            question:
              "Des salariés signalent des irritations répétées après le soudage. Quel enchaînement est le plus adapté pour commencer ?",
            choices: [
              {
                id: "spst_cse",
                label:
                  "SPST pour le conseil santé, puis CSE pour porter une amélioration collective",
              },
              {
                id: "sst_seul",
                label: "SST uniquement, même sans accident immédiat",
              },
              { id: "client", label: "Client de CDE, puis fournisseur" },
              {
                id: "rumeur",
                label: "Aucun acteur, seulement une discussion informelle",
              },
            ],
            correctChoiceIds: ["spst_cse"],
            explanation:
              "Le SPST conseille sur l'exposition et la santé ; le CSE peut porter la question collectivement.",
          },
        },
        {
          title: "Vrai ou faux : un seul acteur suffit",
          type: "true_false",
          instructions:
            "Justifier la réponse à partir des missions vues dans la séquence.",
          payload: {
            statement:
              "Un seul acteur suffit pour traiter tous les problèmes de prévention.",
            correctAnswer: false,
            explanation:
              "Faux : la prévention est collective. Selon la situation, plusieurs acteurs coopèrent.",
          },
        },
        {
          title: "Jeu : le lexique des acteurs de prévention",
          type: "matching",
          instructions:
            "Définir chaque mot du lexique en le reliant à son sens exact.",
          payload: {
            prompt: "Reconstitue le lexique de la séquence.",
            pairs: [
              {
                id: "prevention",
                left: "Prévention",
                right: "Actions qui évitent ou réduisent les risques",
              },
              {
                id: "acteur_interne",
                left: "Acteur interne",
                right: "Personne ou instance présente dans l'entreprise",
              },
              {
                id: "organisme_externe",
                left: "Organisme externe",
                right:
                  "Organisme extérieur qui conseille, accompagne ou contrôle",
              },
              {
                id: "mission",
                left: "Mission",
                right: "Rôle confié à une personne ou à un organisme",
              },
              { id: "cse", left: "CSE", right: "Comité social et économique" },
              {
                id: "carsat",
                left: "CARSAT",
                right: "Caisse d'assurance retraite et de la santé au travail",
              },
            ],
            explanation:
              "Le vocabulaire doit être employé précisément dans une réponse rédigée.",
          },
        },
        {
          title: "Défi 05 : la demande claire",
          type: "qcm",
          instructions:
            "Identifier la demande professionnelle la plus adaptée.",
          payload: {
            question: "Quel message respecte la méthode de la séquence ?",
            choices: [
              {
                id: "clair",
                label:
                  "Trois coupures légères ont été notées au poste d'ébavurage ; nous demandons une analyse du poste et des pistes de prévention.",
              },
              { id: "flou", label: "La prévention est nulle." },
              { id: "accuse", label: "Quelqu'un est forcément responsable." },
              { id: "silence", label: "Je garde l'information pour moi." },
            ],
            correctChoiceIds: ["clair"],
            explanation:
              "Une demande claire s'appuie sur des faits précis et formule un besoin exploitable.",
          },
        },
      ],
    },
  ],
};
