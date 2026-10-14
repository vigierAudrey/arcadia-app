import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

// Séquence PSE de terminale professionnelle — module C10 « Les risques liés à
// l'activité physique » du programme de PSE en baccalauréat professionnel.
//
// Les classes de terminale suivent la même séquence, en trois séances : seul
// le contexte professionnel change. Ce module porte la séquence,
// pse-taero-c10.ts et pse-ttci-c10.ts portent le contexte.
//
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero-c10.md et
// docs/mapping-pedagogique-t-tci-c10.md

export type TerminaleC10Context = {
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
      { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
      { id: "caracteriser", left: "Caractériser", right: "Décrire avec les notions précises qui permettent de distinguer un élément" },
      { id: "decrire", left: "Décrire", right: "Dire ce que l’on voit" },
      { id: "proposer", left: "Proposer", right: "Suggérer une solution au regard d’un problème identifié" },
      { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
    ],
    explanation:
      "Ces cinq verbes sont ceux des consignes de la séquence, et ceux de l’épreuve. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
  },
};

export function buildPseTerminaleC10Sequence(context: TerminaleC10Context): InitialLearningSequence {
  return {
    title: "C10. Les risques liés à l'activité physique",
    description: `Tu vas apprendre à repérer ce qui, dans un geste ou une posture, peut abîmer le corps, à comprendre les atteintes possibles, puis à proposer des mesures de prévention hiérarchisées, à partir de situations de l’atelier ${context.place}.`,
    lessons: [
      {
        title: "Facteurs de risque et atteintes",
        description: `Identifier les facteurs et caractériser les atteintes liées à l’activité physique, à partir de la situation de ${context.learner}.`,
        activities: [
          verbsActivity,
          {
            title: "À retenir : dynamique, statique, aigu, chronique",
            type: "content",
            instructions: "Identifier les facteurs de risques liés à l’activité physique et caractériser les atteintes à la santé.",
            payload: {
              body: `${context.learner} manutentionne un équipement lourd ; un collègue travaille longtemps les bras levés. Les deux signalent fatigue et douleurs.\n\nLe port de charges, les gestes répétés, les postures contraignantes, les efforts intenses et la durée de l’exposition sont des facteurs de risque liés à l’activité physique. Ils se cumulent souvent dans une même situation de travail.\n\nUne activité dynamique est une activité où les muscles alternent contraction et relâchement.\n\nUne activité statique est une activité où une posture ou une contraction est maintenue, sans alternance : elle fatigue différemment, et souvent plus vite qu’on ne le croit.\n\nPlusieurs atteintes sont possibles : un traumatisme physique, une fatigue musculaire, un trouble circulatoire, ou un trouble musculosquelettique, TMS, c’est-à-dire une atteinte des muscles, tendons, nerfs ou articulations liée à plusieurs facteurs.\n\nUne atteinte aiguë apparaît rapidement. Une atteinte chronique s’installe ou persiste dans le temps : c’est souvent la plus difficile à relier à un geste précis, car elle résulte d’une répétition.`,
            },
          },
          {
            title: "Jeu : dynamique ou statique",
            type: "sorting",
            instructions: "Classer chaque activité selon son type.",
            payload: {
              prompt: "Classe chaque activité selon le type d’effort musculaire qu’elle demande.",
              categories: [
                { id: "dynamique", label: "Activité dynamique" },
                { id: "statique", label: "Activité statique" },
              ],
              items: [
                { id: "manutention", label: "Porter puis déposer un équipement à plusieurs reprises", categoryId: "dynamique" },
                { id: "marche", label: "Se déplacer régulièrement entre deux postes", categoryId: "dynamique" },
                { id: "bras_leves", label: "Travailler plusieurs minutes les bras levés", categoryId: "statique" },
                { id: "position", label: "Maintenir une posture penchée pendant une opération longue", categoryId: "statique" },
              ],
              explanation:
                "Dans l’activité dynamique, les muscles alternent effort et relâchement. Dans l’activité statique, la contraction est maintenue, ce qui fatigue sans toujours donner l’impression de forcer.",
            },
          },
          {
            title: "Jeu : le lexique des atteintes",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "dynamique", left: "Activité dynamique", right: "Activité où les muscles alternent contraction et relâchement" },
                { id: "statique", left: "Activité statique", right: "Activité où une posture ou une contraction est maintenue" },
                { id: "tms", left: "TMS", right: "Atteinte des muscles, tendons, nerfs ou articulations liée à plusieurs facteurs" },
                { id: "aigue", left: "Atteinte aiguë", right: "Atteinte qui apparaît rapidement" },
                { id: "chronique", left: "Atteinte chronique", right: "Atteinte qui s’installe ou persiste dans le temps" },
              ],
              explanation:
                "Ces cinq mots sont ceux attendus à l’épreuve. Une atteinte aiguë et une atteinte chronique ne se préviennent pas de la même façon.",
            },
          },
          {
            title: "Défi 01 : aiguë ou chronique",
            type: "qcm",
            instructions: "Identifier la nature d’une atteinte selon son mode d’apparition.",
            payload: {
              question: "Une douleur au dos apparue progressivement après plusieurs mois de manutentions répétées est une atteinte…",
              choices: [
                { id: "chronique", label: "Chronique, car elle s’est installée dans le temps" },
                { id: "aigue", label: "Aiguë, car elle touche le dos" },
                { id: "aucune", label: "Ni l’une ni l’autre, car elle n’est pas datée précisément" },
              ],
              correctChoiceIds: ["chronique"],
              explanation:
                "Une atteinte chronique s’installe ou persiste dans le temps, à la différence d’une atteinte aiguë qui apparaît rapidement, souvent après un geste précis.",
            },
          },
          {
            title: "Vrai ou faux : les facteurs se cumulent",
            type: "true_false",
            instructions: "Justifier que plusieurs facteurs de risque peuvent se combiner.",
            payload: {
              statement: "Le port de charges, les gestes répétés et les postures contraignantes peuvent se cumuler dans une même situation de travail.",
              correctAnswer: true,
              explanation: "Vrai : ces facteurs se cumulent souvent, ce qui augmente le risque d’atteinte plus que chaque facteur pris isolément.",
            },
          },
        ],
      },
      {
        title: "La colonne vertébrale",
        description: "Décrire une atteinte de la colonne vertébrale à l’aide d’un schéma.",
        activities: [
          {
            title: "À retenir : vertèbres, disques et nerfs",
            type: "content",
            instructions: "Décrire les atteintes de la colonne vertébrale à l’aide de supports.",
            payload: {
              body: `Après plusieurs manutentions, ${context.learner} ressent une douleur qui descend dans la jambe.\n\nLa colonne vertébrale est formée de vertèbres, les os qui participent à sa structure, séparées par des disques intervertébraux, des structures souples situées entre deux vertèbres.\n\nChaque disque comporte un noyau souple en son centre. Une déformation ou une détérioration du disque peut comprimer un nerf voisin, c’est-à-dire une structure qui transmet des messages entre le corps et le système nerveux, et provoquer une douleur qui suit le trajet de ce nerf.\n\nTrois atteintes sont à ne pas confondre : le lumbago, la sciatique et la hernie discale. Elles ne désignent pas la même chose, même si elles partagent une origine proche.\n\nUn point de méthode important : un schéma de la colonne sert à décrire une atteinte observée sur une image. Il ne sert jamais à poser un diagnostic, qui relève exclusivement d’un médecin.`,
            },
          },
          {
            title: "Jeu : le lexique de la colonne vertébrale",
            type: "matching",
            instructions: "Définir chaque structure de la colonne vertébrale.",
            payload: {
              prompt: "Relie chaque structure à sa définition exacte.",
              pairs: [
                { id: "vertebre", left: "Vertèbre", right: "Os qui participe à la structure de la colonne vertébrale" },
                { id: "disque", left: "Disque intervertébral", right: "Structure souple située entre deux vertèbres" },
                { id: "nerf", left: "Nerf", right: "Structure qui transmet des messages entre le corps et le système nerveux" },
                { id: "chronique", left: "Atteinte chronique", right: "Atteinte qui s’installe ou persiste dans le temps" },
              ],
              explanation:
                "Vertèbre, disque et nerf sont trois structures différentes. Confondre « vertèbre » et « disque » dans une réponse change complètement le sens de l’explication.",
            },
          },
          {
            title: "Jeu : atteinte aiguë ou atteinte qui s’installe",
            type: "sorting",
            instructions: "Classer chaque situation selon le mode d’apparition de l’atteinte de la colonne.",
            payload: {
              prompt: "Classe chaque situation selon le mode d’apparition de l’atteinte.",
              categories: [
                { id: "aigue", label: "Apparition rapide" },
                { id: "chronique", label: "Installation progressive" },
              ],
              items: [
                { id: "lumbago", label: "Un lumbago survenu brutalement après un soulevé mal exécuté", categoryId: "aigue" },
                { id: "hernie", label: "Une hernie discale qui s’est installée après des années de manutention", categoryId: "chronique" },
                { id: "sciatique", label: "Une sciatique apparue progressivement avec l’âge et la répétition des charges", categoryId: "chronique" },
              ],
              explanation:
                "Certaines atteintes de la colonne surviennent brutalement, d’autres s’installent avec le temps. La distinction aide à choisir la bonne piste de prévention.",
            },
          },
          {
            title: "Défi 02 : à quoi sert un schéma de la colonne",
            type: "qcm",
            instructions: "Identifier l’usage correct d’un schéma de la colonne vertébrale.",
            payload: {
              question: "À quoi sert un schéma de la colonne vertébrale en PSE ?",
              choices: [
                { id: "decrire", label: "À décrire une atteinte observée sur une image, jamais à poser un diagnostic" },
                { id: "diagnostiquer", label: "À poser un diagnostic médical précis" },
                { id: "aucun", label: "À rien de concret, c’est seulement illustratif" },
              ],
              correctChoiceIds: ["decrire"],
              explanation:
                "Décrire n’est pas diagnostiquer. Le diagnostic relève exclusivement d’un médecin, à partir d’un examen complet.",
            },
          },
          {
            title: "Défi 03 : le rôle du disque intervertébral",
            type: "qcm",
            instructions: "Expliquer le rôle du disque intervertébral.",
            payload: {
              question: "Où se situe un disque intervertébral ?",
              choices: [
                { id: "entre", label: "Entre deux vertèbres" },
                { id: "dans", label: "À l’intérieur d’un nerf" },
                { id: "autour", label: "Autour de la colonne, à l’extérieur du corps" },
              ],
              correctChoiceIds: ["entre"],
              explanation:
                "Le disque intervertébral est une structure souple située entre deux vertèbres. Sa déformation peut comprimer un nerf voisin.",
            },
          },
          {
            title: "Vrai ou faux : lumbago, sciatique et hernie se confondent",
            type: "true_false",
            instructions: "Justifier la distinction entre lumbago, sciatique et hernie discale.",
            payload: {
              statement: "Lumbago, sciatique et hernie discale désignent exactement la même atteinte.",
              correctAnswer: false,
              explanation: "Faux : ce sont trois atteintes différentes de la colonne, même si elles partagent une origine proche. Les confondre dans une réponse serait une erreur.",
            },
          },
        ],
      },
      {
        title: "Prévenir et économiser l’effort",
        description: "Proposer des mesures de prévention hiérarchisées, adaptées au travail réel.",
        activities: [
          {
            title: "À retenir : suppression, réduction, protection",
            type: "content",
            instructions: "Proposer des mesures de prévention hiérarchisées, face aux risques liés à l’activité physique.",
            payload: {
              body: `À l’atelier ${context.place}, un poste est réaménagé : aide de manutention, hauteur de travail, rangement sont discutés ensemble.\n\nLa hiérarchie de prévention est l’ordre qui privilégie la suppression du risque, puis la réduction du risque, puis la protection collective, avant la protection individuelle (EPI).\n\nLa suppression du risque consiste à faire disparaître la contrainte elle-même : par exemple, en évitant totalement une manutention manuelle grâce à un outil adapté.\n\nLa réduction du risque consiste à diminuer l’exposition quand la contrainte ne peut pas être supprimée entièrement.\n\nLa protection collective est une mesure qui agit sur l’organisation ou protège plusieurs personnes à la fois : l’aménagement du poste ou une aide technique de manutention en sont des exemples.\n\nPour le risque qui reste malgré ces mesures, la protection individuelle, la formation, l’information et l’économie d’effort, c’est-à-dire l’organisation du geste et du poste pour limiter les contraintes inutiles, viennent compléter le dispositif.\n\nLe choix des mesures doit toujours être adapté au travail réel observé, pas seulement au travail prescrit sur le papier.`,
            },
          },
          {
            title: "Jeu : le lexique de la prévention",
            type: "matching",
            instructions: "Définir chaque notion de la hiérarchie de prévention.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "economie", left: "Économie d’effort", right: "Organisation du geste et du poste pour limiter les contraintes inutiles" },
                { id: "hierarchie", left: "Hiérarchie de prévention", right: "Ordre qui privilégie suppression, réduction et protection collective avant l’EPI" },
                { id: "collective", left: "Protection collective", right: "Mesure qui agit sur l’organisation ou protège plusieurs personnes" },
                { id: "tms", left: "TMS", right: "Atteinte des muscles, tendons, nerfs ou articulations liée à plusieurs facteurs" },
              ],
              explanation:
                "La hiérarchie de prévention fixe l’ordre à respecter : toujours chercher à supprimer ou réduire le risque avant de se reposer sur l’équipement individuel.",
            },
          },
          {
            title: "Jeu : classer les mesures selon la hiérarchie",
            type: "sorting",
            instructions: "Classer chaque mesure selon l’échelon de la hiérarchie de prévention qu’elle illustre.",
            payload: {
              prompt: "Classe chaque mesure selon l’échelon de la hiérarchie de prévention.",
              categories: [
                { id: "suppression", label: "Suppression du risque" },
                { id: "reduction", label: "Réduction du risque" },
                { id: "collective", label: "Protection collective" },
                { id: "individuelle", label: "Protection individuelle et formation" },
              ],
              items: [
                { id: "outil", label: "Remplacer une manutention manuelle par un outil qui l’évite totalement", categoryId: "suppression" },
                { id: "frequence", label: "Réduire le nombre de manutentions manuelles par heure", categoryId: "reduction" },
                { id: "aide", label: "Installer une aide technique de manutention pour tout le poste", categoryId: "collective" },
                { id: "hauteur", label: "Adapter la hauteur de travail pour toute l’équipe", categoryId: "collective" },
                { id: "gants", label: "Porter des gants de protection adaptés", categoryId: "individuelle" },
                { id: "formation", label: "Former chacun aux bons gestes et postures", categoryId: "individuelle" },
              ],
              explanation:
                "La hiérarchie va de la suppression, la plus efficace, vers la protection individuelle, qui complète mais ne remplace jamais les mesures précédentes.",
            },
          },
          {
            title: "Défi 04 : que vient en premier",
            type: "qcm",
            instructions: "Identifier la mesure à privilégier en premier selon la hiérarchie de prévention.",
            payload: {
              question: "Selon la hiérarchie de prévention, quelle mesure doit-on rechercher en priorité ?",
              choices: [
                { id: "suppression", label: "La suppression du risque" },
                { id: "epi", label: "La protection individuelle (EPI)" },
                { id: "information", label: "L’information, sans aucune autre mesure" },
              ],
              correctChoiceIds: ["suppression"],
              explanation:
                "La hiérarchie de prévention place la suppression du risque en premier, avant la réduction, la protection collective, puis la protection individuelle.",
            },
          },
          {
            title: "Défi 05 : adapter la mesure au travail réel",
            type: "qcm",
            instructions: "Justifier l’adaptation d’une mesure de prévention au travail réellement observé.",
            payload: {
              question: "Pourquoi une mesure de prévention doit-elle être adaptée au travail réel, et pas seulement au travail prescrit ?",
              choices: [
                { id: "bon", label: "Parce que le travail réel révèle des contraintes que la description officielle du poste ne montre pas toujours" },
                { id: "inutile", label: "Parce que le travail prescrit ne sert jamais à rien" },
                { id: "aucun", label: "Parce qu’il n’y a aucune différence entre travail réel et travail prescrit" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Le travail réel peut différer du travail prescrit : une mesure fondée uniquement sur la description officielle du poste risque de passer à côté du vrai facteur de risque.",
            },
          },
          {
            title: "Vrai ou faux : l’EPI vient avant la protection collective",
            type: "true_false",
            instructions: "Justifier l’ordre de la hiérarchie de prévention.",
            payload: {
              statement: "Selon la hiérarchie de prévention, la protection individuelle (EPI) doit être recherchée avant la protection collective.",
              correctAnswer: false,
              explanation: "Faux : la hiérarchie place la protection collective avant la protection individuelle. L’EPI complète ce qui reste, il ne remplace jamais une mesure collective possible.",
            },
          },
        ],
      },
    ],
  };
}
