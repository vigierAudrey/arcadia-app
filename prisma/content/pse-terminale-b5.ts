import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

// Séquence PSE de terminale professionnelle — module B5 « Les ressources en
// énergie et le développement durable » du programme de PSE en baccalauréat
// professionnel.
//
// Les classes de terminale suivent la même séquence, en quatre séances : seul
// le contexte professionnel change. Ce module porte la séquence,
// pse-taero-b5.ts et pse-ttci-b5.ts portent le contexte.
//
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero-b5.md et
// docs/mapping-pedagogique-t-tci-b5.md

export type TerminaleB5Context = {
  classroom: "T AERO" | "T TCI";
  /** Nom de l'atelier fil rouge, tel qu'il apparaît dans les cours. */
  place: string;
  /** Élève du fil rouge. */
  learner: string;
};

const verbsActivity: InitialActivity = {
  title: "Décodage des consignes : les verbes de la séquence",
  type: "matching",
  instructions: "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
  payload: {
    prompt: "Chaque verbe de consigne attend une production précise. Relie chaque verbe à son sens exact.",
    pairs: [
      { id: "caracteriser", left: "Caractériser", right: "Décrire avec les notions précises qui permettent de distinguer un élément" },
      { id: "reperer", left: "Repérer", right: "Examiner avec précision, puis lister" },
      { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
      { id: "comparer", left: "Comparer", right: "Présenter les points communs et les différences" },
      { id: "proposer", left: "Proposer", right: "Suggérer une solution au regard d’un problème identifié" },
      { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
    ],
    explanation:
      "Ces six verbes sont ceux des consignes de la séquence, et ceux de l’épreuve. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
  },
};

export function buildPseTerminaleB5Sequence(context: TerminaleB5Context): InitialLearningSequence {
  return {
    title: "B5. Les ressources en énergie et le développement durable",
    description: `Tu vas apprendre à distinguer les sources d’énergie, à repérer leurs impacts sur l’environnement et la santé, puis à proposer des mesures adaptées, à partir de situations de l’atelier ${context.place}.`,
    lessons: [
      {
        title: "Les sources d’énergie",
        description: "Caractériser les sources d’énergie renouvelables et non renouvelables selon leurs avantages et leurs limites.",
        activities: [
          verbsActivity,
          {
            title: "À retenir : renouvelable, non renouvelable, épuisement",
            type: "content",
            instructions: "Caractériser les sources d’énergies renouvelables et non renouvelables en fonction de leurs avantages et leurs limites.",
            payload: {
              body: `${context.place} compare l’énergie utilisée par ses équipements, ses bâtiments et ses déplacements.\n\nUne énergie renouvelable est une source qui se reconstitue à l’échelle humaine : le soleil, le vent, l’eau en mouvement.\n\nUne énergie non renouvelable est une source issue d’un stock limité, qui ne se reconstitue pas à cette échelle : le charbon, le gaz, le pétrole, l’uranium.\n\nAu niveau mondial, les ressources énergétiques connaissent une répartition inégale : leur distribution diffère selon les territoires, ce qui pèse sur les choix économiques et géopolitiques.\n\nUne ressource non renouvelable est exposée à l’épuisement : la diminution d’un stock jusqu’à sa disparition possible. Ce risque ne concerne pas les sources renouvelables, mais chaque source garde des avantages et des limites propres, qu’il faut connaître avant de choisir.`,
            },
          },
          {
            title: "Jeu : le lexique des sources d’énergie",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "renouvelable", left: "Énergie renouvelable", right: "Source qui se reconstitue à l’échelle humaine" },
                { id: "nonrenouvelable", left: "Énergie non renouvelable", right: "Source issue d’un stock limité" },
                { id: "repartition", left: "Répartition inégale", right: "Distribution différente des ressources selon les territoires" },
                { id: "epuisement", left: "Épuisement", right: "Diminution d’un stock de ressource jusqu’à sa disparition possible" },
              ],
              explanation:
                "Renouvelable et non renouvelable se distinguent par la capacité, ou non, de la source à se reconstituer à l’échelle humaine.",
            },
          },
          {
            title: "Jeu : renouvelable ou non renouvelable",
            type: "sorting",
            instructions: "Classer chaque source d’énergie selon son type.",
            payload: {
              prompt: "Classe chaque source d’énergie.",
              categories: [
                { id: "renouvelable", label: "Énergie renouvelable" },
                { id: "nonrenouvelable", label: "Énergie non renouvelable" },
              ],
              items: [
                { id: "solaire", label: "L’énergie solaire", categoryId: "renouvelable" },
                { id: "eolien", label: "L’énergie du vent", categoryId: "renouvelable" },
                { id: "hydraulique", label: "L’énergie de l’eau en mouvement", categoryId: "renouvelable" },
                { id: "charbon", label: "Le charbon", categoryId: "nonrenouvelable" },
                { id: "gaz", label: "Le gaz naturel", categoryId: "nonrenouvelable" },
                { id: "petrole", label: "Le pétrole", categoryId: "nonrenouvelable" },
                { id: "uranium", label: "L’uranium", categoryId: "nonrenouvelable" },
              ],
              explanation:
                "Le soleil, le vent et l’eau se reconstituent à l’échelle humaine. Le charbon, le gaz, le pétrole et l’uranium proviennent d’un stock qui ne se renouvelle pas à cette échelle.",
            },
          },
          {
            title: "Défi 01 : le risque d’épuisement",
            type: "qcm",
            instructions: "Identifier quelles sources sont exposées à l’épuisement.",
            payload: {
              question: "Quelles sources d’énergie sont exposées au risque d’épuisement ?",
              choices: [
                { id: "bon", label: "Les sources non renouvelables, issues d’un stock limité" },
                { id: "renouvelable", label: "Les sources renouvelables, car elles sont rares" },
                { id: "aucune", label: "Aucune : toutes les sources se reconstituent" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "L’épuisement touche les stocks limités. Les sources renouvelables se reconstituent à l’échelle humaine et ne sont pas exposées à ce même risque.",
            },
          },
          {
            title: "Vrai ou faux : les ressources sont réparties également",
            type: "true_false",
            instructions: "Justifier la répartition des ressources énergétiques dans le monde.",
            payload: {
              statement: "Les ressources en énergie sont réparties de façon égale entre tous les territoires du monde.",
              correctAnswer: false,
              explanation: "Faux : leur répartition est inégale selon les territoires, ce qui influence les échanges et les choix économiques et géopolitiques.",
            },
          },
          {
            title: "Défi 02 : choisir une notion utile",
            type: "qcm",
            instructions: `Identifier la notion la plus utile pour analyser la situation de ${context.place}.`,
            payload: {
              question: `${context.place} compare l’énergie utilisée par ses équipements, ses bâtiments et ses déplacements. Quelle notion est la plus utile pour comparer ces usages ?`,
              choices: [
                { id: "renouvelable", label: "Distinguer énergie renouvelable et énergie non renouvelable" },
                { id: "couleur", label: "La couleur des équipements" },
                { id: "marque", label: "La marque des appareils" },
              ],
              correctChoiceIds: ["renouvelable"],
              explanation:
                "Comparer les usages suppose d’abord de savoir de quelle source d’énergie ils dépendent, renouvelable ou non.",
            },
          },
        ],
      },
      {
        title: "La consommation du ménage",
        description: `Repérer les différents postes de consommation énergétique, à partir de la situation de ${context.learner}.`,
        activities: [
          {
            title: "À retenir : les postes de consommation",
            type: "content",
            instructions: "Repérer les différents postes de consommation énergétique d’un ménage.",
            payload: {
              body: `Dans son premier logement, ${context.learner} analyse chauffage, eau chaude, appareils et déplacements.\n\nUn poste de consommation est un usage qui consomme une partie de l’énergie d’un ménage : le chauffage, l’eau chaude, les appareils électriques, la cuisson, ou encore les transports.\n\nComparer deux usages, ou comparer deux ménages, exige de garder la même période et la même unité : comparer un mois à une année, ou des kilowattheures à des litres, n’a pas de sens.\n\nL’étiquette énergie, apposée sur certains appareils, aide à choisir un équipement plus économe. Mais elle ne remplace pas une analyse complète des usages réels : un appareil économe utilisé en permanence peut consommer plus qu’un appareil moins économe utilisé rarement.`,
            },
          },
          {
            title: "Jeu : le lexique de la consommation du ménage",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "poste", left: "Poste de consommation", right: "Usage qui consomme une partie de l’énergie d’un ménage" },
                { id: "renouvelable", left: "Énergie renouvelable", right: "Source qui se reconstitue à l’échelle humaine" },
                { id: "nonrenouvelable", left: "Énergie non renouvelable", right: "Source issue d’un stock limité" },
              ],
              explanation:
                "Un poste de consommation désigne un usage précis. Il ne doit pas être confondu avec le type de source d’énergie qui l’alimente.",
            },
          },
          {
            title: "Jeu : classer les postes de consommation",
            type: "sorting",
            instructions: "Classer chaque usage selon le poste de consommation qu’il illustre.",
            payload: {
              prompt: "Classe chaque usage selon le poste de consommation d’un ménage auquel il appartient.",
              categories: [
                { id: "chauffage", label: "Chauffage et eau chaude" },
                { id: "appareils", label: "Appareils et cuisson" },
                { id: "transport", label: "Déplacements" },
              ],
              items: [
                { id: "radiateur", label: "Un radiateur allumé toute la journée", categoryId: "chauffage" },
                { id: "douche", label: "L’eau chaude utilisée pour la douche", categoryId: "chauffage" },
                { id: "four", label: "Un four utilisé pour cuisiner", categoryId: "appareils" },
                { id: "electromenager", label: "Le lave-linge et le réfrigérateur", categoryId: "appareils" },
                { id: "voiture", label: "Les trajets quotidiens en voiture", categoryId: "transport" },
              ],
              explanation:
                "Chaque usage pèse sur un poste différent. Les repérer permet ensuite de savoir où agir en priorité.",
            },
          },
          {
            title: "Défi 03 : comparer deux consommations",
            type: "qcm",
            instructions: "Identifier la condition nécessaire à une comparaison correcte.",
            payload: {
              question: "Pour comparer correctement la consommation énergétique de deux logements, que faut-il garantir ?",
              choices: [
                { id: "bon", label: "La même période et la même unité de mesure" },
                { id: "couleur", label: "Le même nombre de fenêtres" },
                { id: "aucune", label: "Rien, la comparaison est toujours valable" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Sans la même période ni la même unité, la comparaison n’a pas de sens : un mois ne se compare pas à une année.",
            },
          },
          {
            title: "Vrai ou faux : l’étiquette énergie suffit",
            type: "true_false",
            instructions: "Justifier les limites de l’étiquette énergie pour choisir un appareil.",
            payload: {
              statement: "L’étiquette énergie d’un appareil remplace toute analyse des usages réels du ménage.",
              correctAnswer: false,
              explanation: "Faux : elle aide à comparer des appareils, mais un appareil économe utilisé en permanence peut consommer plus qu’un appareil moins économe utilisé rarement.",
            },
          },
        ],
      },
      {
        title: "Impacts sur l’environnement et la santé",
        description: "Identifier les impacts de la consommation d’énergie sur l’environnement et sur la santé de l’individu.",
        activities: [
          {
            title: "À retenir : effet de serre, empreinte carbone, santé",
            type: "content",
            instructions: "Identifier les impacts de la consommation d’énergie sur l’environnement et sur la santé.",
            payload: {
              body: `${context.place} veut réduire ses émissions sans déplacer la pollution vers un autre usage.\n\nL’effet de serre est un phénomène naturel, indispensable à la vie sur Terre, mais renforcé par certaines émissions humaines liées notamment à la consommation d’énergie : ce renforcement est associé au réchauffement climatique.\n\nL’empreinte carbone est la quantité de gaz à effet de serre associée à une activité ou à un produit. Elle permet de comparer des choix, à condition de préciser son périmètre : un trajet seul n’inclut pas la fabrication du véhicule, par exemple.\n\nCertaines pollutions liées à la consommation d’énergie peuvent avoir une atteinte à la santé : la qualité de l’air dégradée affecte en particulier les voies respiratoires. Réduire une consommation d’énergie, c’est donc aussi agir sur la santé, pas seulement sur l’environnement.`,
            },
          },
          {
            title: "Jeu : le lexique des impacts",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "serre", left: "Effet de serre", right: "Phénomène naturel renforcé par certaines émissions humaines" },
                { id: "empreinte", left: "Empreinte carbone", right: "Quantité de gaz à effet de serre associée à une activité ou un produit" },
                { id: "sante", left: "Atteinte à la santé", right: "Effet possible de la pollution ou du changement climatique sur la santé" },
              ],
              explanation:
                "L’effet de serre est un phénomène global. L’empreinte carbone le mesure pour une activité précise. L’atteinte à la santé en est une conséquence possible, chez l’individu.",
            },
          },
          {
            title: "Jeu : quel périmètre pour l’empreinte carbone",
            type: "sorting",
            instructions: "Classer chaque élément selon ce qu’il compte, ou non, dans une empreinte carbone bien posée.",
            payload: {
              prompt: "Classe chaque élément selon ce qu’il faut préciser pour une comparaison valable.",
              categories: [
                { id: "inclure", label: "À inclure dans le périmètre" },
                { id: "exclure", label: "Souvent oublié, à ne pas négliger" },
              ],
              items: [
                { id: "trajet", label: "Le trajet quotidien lui-même", categoryId: "inclure" },
                { id: "chauffage", label: "L’énergie utilisée pour le chauffage du bâtiment", categoryId: "inclure" },
                { id: "fabrication", label: "La fabrication du véhicule ou de l’équipement utilisé", categoryId: "exclure" },
                { id: "fin_de_vie", label: "Le traitement du produit en fin de vie", categoryId: "exclure" },
              ],
              explanation:
                "Une empreinte carbone mal posée oublie souvent la fabrication et la fin de vie, pourtant comprises dans une analyse complète.",
            },
          },
          {
            title: "Défi 04 : l’effet de serre n’est pas que négatif",
            type: "qcm",
            instructions: "Expliquer la nature du phénomène d’effet de serre.",
            payload: {
              question: "Qu’est-ce que l’effet de serre, avant d’être renforcé par les activités humaines ?",
              choices: [
                { id: "bon", label: "Un phénomène naturel indispensable à la vie sur Terre" },
                { id: "invente", label: "Un phénomène uniquement créé par l’industrie moderne" },
                { id: "sans", label: "Un phénomène sans aucun effet sur le climat" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "L’effet de serre est naturel et nécessaire. Le problème vient de son renforcement par certaines émissions liées aux activités humaines.",
            },
          },
          {
            title: "Vrai ou faux : la pollution peut toucher la santé",
            type: "true_false",
            instructions: "Justifier le lien entre consommation d’énergie et santé.",
            payload: {
              statement: "Les pollutions liées à la consommation d’énergie peuvent avoir des effets sur la santé.",
              correctAnswer: true,
              explanation: "Vrai : la qualité de l’air dégradée, en particulier, peut affecter les voies respiratoires.",
            },
          },
        ],
      },
      {
        title: "Agir collectivement et individuellement",
        description: "Repérer des mesures collectives et proposer des mesures individuelles pour maîtriser la consommation d’énergie.",
        activities: [
          {
            title: "À retenir : agir à deux niveaux",
            type: "content",
            instructions: "Repérer les mesures mises en place au niveau collectif et proposer des mesures individuelles.",
            payload: {
              body: `${context.place} étudie plusieurs postes de consommation, et ${context.learner} cherche aussi des gestes réalistes pour son propre logement.\n\nUne mesure collective est une action organisée par une collectivité, une entreprise ou l’État : une réglementation plus exigeante sur l’isolation des bâtiments, l’organisation des transports, ou l’investissement dans des équipements plus économes.\n\nUn geste écocitoyen est une action individuelle réaliste qui réduit une consommation ou une émission : éteindre un équipement inutilisé, ajuster un chauffage, privilégier un mode de transport moins consommateur quand c’est possible.\n\nLes mesures collectives agissent sur les bâtiments, les équipements, les règles et les transports ; les gestes individuels les complètent, sans les remplacer. Une mesure efficace répond à un poste de consommation important, et évite de simplement déplacer le risque ou la pollution vers un autre usage.\n\nUn argument, en PSE, est une justification fondée sur des faits et des documents : il indique le fait constaté, l’action proposée, et l’effet attendu.`,
            },
          },
          {
            title: "Jeu : le lexique de l’action",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "collective", left: "Mesure collective", right: "Action organisée par une collectivité, une entreprise ou l’État" },
                { id: "ecocitoyen", left: "Geste écocitoyen", right: "Action individuelle réaliste qui réduit une consommation ou une émission" },
                { id: "empreinte", left: "Empreinte carbone", right: "Quantité de gaz à effet de serre associée à une activité ou un produit" },
                { id: "argument", left: "Argument", right: "Justification fondée sur des faits et des documents" },
              ],
              explanation:
                "Mesure collective et geste écocitoyen agissent à deux échelles différentes et se complètent, sans se substituer l’une à l’autre.",
            },
          },
          {
            title: "Jeu : collectif ou individuel",
            type: "sorting",
            instructions: "Classer chaque action selon son échelle.",
            payload: {
              prompt: "Classe chaque action selon qu’elle relève d’une mesure collective ou d’un geste écocitoyen.",
              categories: [
                { id: "collective", label: "Mesure collective" },
                { id: "individuel", label: "Geste écocitoyen" },
              ],
              items: [
                { id: "isolation", label: "L’amélioration de l’isolation d’un bâtiment par l’entreprise", categoryId: "collective" },
                { id: "transport", label: "La mise en place d’un transport collectif pour les salariés", categoryId: "collective" },
                { id: "eclairage", label: "Le remplacement de l’éclairage par des équipements plus économes", categoryId: "collective" },
                { id: "eteindre", label: "Éteindre un équipement resté inutilement allumé", categoryId: "individuel" },
                { id: "covoiturage", label: "Choisir le covoiturage pour un trajet", categoryId: "individuel" },
              ],
              explanation:
                "Les mesures collectives changent l’organisation ou les équipements à grande échelle. Les gestes écocitoyens restent à la portée d’un individu, au quotidien.",
            },
          },
          {
            title: "Défi 05 : une mesure efficace",
            type: "qcm",
            instructions: "Identifier ce qui caractérise une mesure de prévention efficace.",
            payload: {
              question: "Qu’est-ce qui caractérise une mesure efficace pour maîtriser la consommation d’énergie ?",
              choices: [
                { id: "bon", label: "Elle répond à un poste de consommation important, sans créer un autre risque ailleurs" },
                { id: "symbolique", label: "Elle est uniquement symbolique, sans effet mesurable" },
                { id: "deplace", label: "Elle déplace simplement le problème vers un autre usage" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Une mesure efficace cible un poste réellement important et évite de déplacer le problème, par exemple vers une autre pollution.",
            },
          },
          {
            title: "Défi 06 : construire un argument",
            type: "qcm",
            instructions: "Identifier ce que contient un argument fondé.",
            payload: {
              question: "Que doit contenir un argument pour justifier une mesure de prévention ?",
              choices: [
                { id: "bon", label: "Un fait constaté, l’action proposée, et l’effet attendu" },
                { id: "opinion", label: "Une opinion personnelle, sans fait à l’appui" },
                { id: "slogan", label: "Un slogan court, sans explication" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Un argument fondé s’appuie sur des faits et des documents : il relie ce qui est constaté, ce qui est proposé, et ce que cela devrait changer.",
            },
          },
          {
            title: "Vrai ou faux : les gestes individuels suffisent seuls",
            type: "true_false",
            instructions: "Justifier le rôle complémentaire des mesures collectives et des gestes individuels.",
            payload: {
              statement: "Les gestes écocitoyens individuels suffisent seuls à maîtriser la consommation d’énergie, sans mesure collective.",
              correctAnswer: false,
              explanation: "Faux : les mesures collectives agissent sur les bâtiments, les équipements et les transports ; les gestes individuels les complètent, mais ne les remplacent pas.",
            },
          },
        ],
      },
    ],
  };
}
