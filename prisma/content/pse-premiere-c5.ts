import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

// Séquence PSE de première professionnelle — module C5 « L'analyse des risques
// professionnels » du programme de PSE en baccalauréat professionnel.
//
// Les deux classes de première suivent la même séquence : mêmes objectifs, même
// découpage en quatre séances, seul le contexte professionnel change. Ce module
// porte la séquence, pse-1aero-c5.ts et pse-1tci-c5.ts portent le contexte.
//
// Traçabilité complète des sources : docs/mapping-pedagogique-1-aero-c5.md et
// docs/mapping-pedagogique-1-tci-c5.md
//
// Les huit verbes de consigne de la séquence (Repérer, Identifier, Décrire,
// Classer, Comparer, Déduire, Expliquer, Justifier) viennent tous de
// _COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md.

export type PremiereC5Context = {
  classroom: "1 AERO" | "1 TCI";
  /** Nom de l'atelier fil rouge, tel qu'il apparaît dans les cours. */
  place: string;
  /** Tuteur de l'atelier fil rouge. */
  mentor: string;
  /** Élève du fil rouge. */
  learner: string;
  /** Activité observée en séance 1, reprise du cours. */
  openingSituation: string;
  /** Les quatre composantes de cette activité, pour le tri. */
  components: { id: string; label: string; categoryId: string }[];
  /** Situation de la séance 2, reprise du cours. */
  processSituation: string;
  /** Les quatre maillons du processus, dans l'ordre du corrigé du cours. */
  processDanger: string;
  processExposure: string;
  processTrigger: string;
  processDamage: string;
  /** Les trois situations cotées en séance 3, reprises du cours. */
  ratedSituations: { id: string; label: string; categoryId: string }[];
  /** Situation de priorité élevée, pour le défi de cotation. */
  highPrioritySituation: string;
  /** Risque traité en séance 4, repris du cours. */
  targetRisk: string;
  /** Les quatre mesures proposées en séance 4, reprises du cours. */
  measures: { id: string; label: string; categoryId: string }[];
  /** Mesure de protection collective retenue par le corrigé du cours. */
  collectiveMeasure: string;
};

const verbsActivity: InitialActivity = {
  title: "Décodage des consignes : les verbes de la séquence",
  type: "matching",
  instructions: "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
  payload: {
    prompt: "Chaque verbe de consigne attend une production précise. Relie chaque verbe à son sens exact.",
    pairs: [
      { id: "reperer", left: "Repérer", right: "Examiner avec précision, puis lister" },
      { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
      { id: "decrire", left: "Décrire", right: "Dire ce que l’on voit" },
      { id: "classer", left: "Classer", right: "Ranger des éléments dans l’ordre ou la manière indiquée" },
      { id: "comparer", left: "Comparer", right: "Présenter les points communs et les différences" },
      { id: "deduire", left: "Déduire", right: "Établir une conséquence logique" },
      { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
      { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
    ],
    explanation:
      "Ces huit verbes sont ceux des consignes de la séquence, et ceux des épreuves. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
  },
};

export function buildPsePremiereC5Sequence(context: PremiereC5Context): InitialLearningSequence {
  return {
    title: "C5. L’analyse des risques professionnels",
    description: `Tu vas apprendre la démarche complète : décrire une activité de travail, construire le processus qui mène au dommage, évaluer le risque avec une grille, puis proposer des mesures dans le bon ordre, à partir de situations de l’atelier ${context.place}.`,
    lessons: [
      {
        title: "Décomposer une activité de travail",
        description: `Repérer l’opérateur, la tâche, le matériel et le milieu avant de parler du moindre risque, sur une activité de l’atelier ${context.place}.`,
        activities: [
          verbsActivity,
          {
            title: "À retenir : décrire avant d’analyser",
            type: "content",
            instructions: "Repérer les quatre composantes d’une activité de travail.",
            payload: {
              body: `${context.openingSituation} ${context.mentor} demande de décrire l’activité avant de parler du risque.\n\nAnalyser commence toujours par décrire les faits. Quatre composantes reviennent dans toute activité de travail.\n\nL’opérateur : la personne qui réalise l’activité. Son expérience, sa taille, sa fatigue, sa formation comptent.\n\nLa tâche : l’action demandée à l’opérateur. Attention, la tâche prescrite n’est pas toujours l’activité réelle : ce que la personne fait vraiment peut différer de ce qui était prévu, et c’est souvent là que le risque apparaît.\n\nLe matériel : l’outil, la machine ou le produit utilisé. Les protections en font partie.\n\nLe milieu : l’environnement physique et l’organisation. Le bruit, l’éclairage, la place disponible, mais aussi les horaires, l’urgence ou le travail seul.\n\nDeux outils aident à ne rien oublier. ITAMaMi reprend Individu, Tâche, Activité, Matériel, Milieu. Les 5M reprennent Main-d’œuvre, Matière, Matériel, Méthode, Milieu. Peu importe lequel : ce qui compte est de passer en revue toutes les composantes plutôt que de sauter à la conclusion.\n\nLa description vient d’abord. La solution vient après.`,
            },
          },
          {
            title: "Défi 01 : par quoi commencer",
            type: "qcm",
            instructions: "Expliquer par quoi commence l’analyse d’une activité de travail.",
            payload: {
              question: "Par quoi commence l’analyse d’une activité de travail ?",
              choices: [
                { id: "decrire", label: "Par la description des faits : opérateur, tâche, matériel, milieu" },
                { id: "solution", label: "Par la proposition d’une solution" },
                { id: "coupable", label: "Par la recherche de qui a fait l’erreur" },
              ],
              correctChoiceIds: ["decrire"],
              explanation:
                "La description factuelle vient d’abord. Proposer une solution avant d’avoir décrit revient à traiter un problème qu’on n’a pas compris.",
            },
          },
          {
            title: `Jeu : les composantes de l’activité chez ${context.place}`,
            type: "sorting",
            instructions: "Classer chaque élément relevé dans la composante correspondante.",
            payload: {
              prompt: `Classe chaque fait observé dans la composante de l’activité à laquelle il appartient.`,
              categories: [
                { id: "operateur", label: "Opérateur" },
                { id: "tache", label: "Tâche" },
                { id: "materiel", label: "Matériel" },
                { id: "milieu", label: "Milieu" },
              ],
              items: context.components,
              explanation:
                "Les quatre composantes se complètent : un même fait n’appartient qu’à une seule, mais il faut les quatre pour décrire l’activité entièrement.",
            },
          },
          {
            title: "Jeu : le lexique de l’analyse",
            type: "matching",
            instructions: "Identifier le sens exact de chaque composante.",
            payload: {
              prompt: "Relie chaque composante à sa définition.",
              pairs: [
                { id: "operateur", left: "Opérateur", right: "La personne qui réalise l’activité" },
                { id: "tache", left: "Tâche", right: "L’action demandée à l’opérateur" },
                { id: "materiel", left: "Matériel", right: "L’outil, la machine ou le produit utilisé" },
                { id: "milieu", left: "Milieu", right: "L’environnement physique et l’organisation" },
              ],
              explanation:
                "Ces quatre mots sont ceux de l’outil d’analyse. Les employer avec leur sens exact est ce qui est attendu à l’épreuve.",
            },
          },
          {
            title: "Vrai ou faux : le milieu, c’est la météo",
            type: "true_false",
            instructions: "Expliquer ce que recouvre exactement le milieu de travail.",
            payload: {
              statement: "Le milieu de travail désigne seulement les conditions météorologiques.",
              correctAnswer: false,
              explanation:
                "Faux : le milieu comprend l’environnement physique du poste, comme le bruit, l’éclairage ou la place disponible, mais aussi l’organisation, comme l’urgence, les horaires ou le fait de travailler seul.",
            },
          },
          {
            title: "Vrai ou faux : la protection fait partie du matériel",
            type: "true_false",
            instructions: "Justifier la réponse à partir de la définition du matériel.",
            payload: {
              statement: "Un équipement de protection individuelle fait partie du matériel de l’activité.",
              correctAnswer: true,
              explanation:
                "Vrai : le matériel regroupe tous les moyens utilisés pour réaliser la tâche, protections comprises. Leur présence, leur état et leur adaptation au poste font partie de la description.",
            },
          },
          {
            title: "Vrai ou faux : décrire ou résoudre",
            type: "true_false",
            instructions: "Justifier l’ordre entre la description et la proposition de solution.",
            payload: {
              statement: "On propose une solution d’abord, et on décrit l’activité ensuite.",
              correctAnswer: false,
              explanation: "Faux : la description factuelle vient toujours en premier. Proposer une solution avant d’avoir décrit revient à traiter un problème qu’on n’a pas compris, et souvent à côté.",
            },
          },
          {
            title: "Défi 02 : la tâche et l’activité réelle",
            type: "qcm",
            instructions: "Comparer la tâche demandée et l’activité réellement réalisée.",
            payload: {
              question: "La consigne demande de travailler à deux, mais l’opérateur travaille seul parce qu’un collègue est absent. Que retient l’analyse ?",
              choices: [
                { id: "reelle", label: "Les deux : la tâche prescrite et l’activité réelle, car l’écart explique le risque" },
                { id: "prescrite", label: "Seulement la tâche prescrite, puisque c’est la consigne officielle" },
                { id: "aucune", label: "Ni l’une ni l’autre, ce n’est pas le sujet de l’analyse" },
              ],
              correctChoiceIds: ["reelle"],
              explanation:
                "Le point commun : les deux décrivent le travail. La différence : la tâche prescrite dit ce qui était prévu, l’activité réelle dit ce qui se passe vraiment. C’est dans l’écart entre les deux que le risque se loge.",
            },
          },
        ],
      },
      {
        title: "Construire le processus d’apparition d’un dommage",
        description: "Relier le danger, l’exposition, l’événement qui fait basculer la situation et l’atteinte possible à la santé.",
        activities: [
          {
            title: "À retenir : les quatre maillons du processus",
            type: "content",
            instructions: "Repérer les quatre maillons qui mènent au dommage.",
            payload: {
              body: `${context.processSituation}\n\nLe processus d’apparition d’un dommage se lit toujours dans le même ordre, et chaque maillon porte un nom précis.\n\nLe danger : l’élément capable de provoquer un dommage. Ici, ${context.processDanger}.\n\nLa situation dangereuse : l’exposition de l’opérateur à ce danger. Ici, ${context.processExposure}.\n\nL’événement déclencheur : le fait qui fait basculer la situation. Ici, ${context.processTrigger}. Sans lui, la situation reste dangereuse mais rien n’arrive.\n\nLe dommage : l’atteinte à la santé. Ici, ${context.processDamage}.\n\nUn dommage peut être immédiat, comme une coupure, ou différé, comme une surdité qui s’installe après des années. Un dommage immédiat renvoie plutôt à un accident du travail, un dommage différé plutôt à une maladie professionnelle.\n\nLe risque professionnel, c’est la possibilité que ce processus aille jusqu’au bout.\n\nReprésenter ce processus sert à trouver où agir : chaque maillon peut être cassé, et casser le premier est toujours le plus efficace.`,
            },
          },
          {
            title: "Défi 03 : l’événement déclencheur",
            type: "qcm",
            instructions: "Identifier le maillon qui fait basculer la situation.",
            payload: {
              question: "Qu’est-ce qui distingue l’événement déclencheur de la situation dangereuse ?",
              choices: [
                { id: "bascule", label: "La situation dangereuse dure, l’événement déclencheur est le fait qui fait basculer" },
                { id: "meme", label: "Rien, ce sont deux mots pour la même chose" },
                { id: "apres", label: "L’événement déclencheur arrive après le dommage" },
              ],
              correctChoiceIds: ["bascule"],
              explanation:
                "Une personne peut rester exposée longtemps sans que rien n’arrive : c’est la situation dangereuse. L’événement déclencheur est le fait précis qui transforme cette exposition en dommage.",
            },
          },
          {
            title: "Jeu : remettre le processus en place",
            type: "sorting",
            instructions: "Classer chaque élément selon sa place dans le processus.",
            payload: {
              prompt: "Classe chaque élément selon le maillon du processus auquel il appartient.",
              categories: [
                { id: "danger", label: "Danger" },
                { id: "situation", label: "Situation dangereuse" },
                { id: "evenement", label: "Événement déclencheur" },
                { id: "dommage", label: "Dommage" },
              ],
              items: [
                { id: "arete", label: "Une arête vive sur une pièce", categoryId: "danger" },
                { id: "rotation", label: "Un outil en rotation non protégé", categoryId: "danger" },
                { id: "main-proche", label: "La main reste à quelques centimètres de l’outil", categoryId: "situation" },
                { id: "sans-gants", label: "La pièce est tenue à main nue", categoryId: "situation" },
                { id: "glissement", label: "La pièce glisse brusquement", categoryId: "evenement" },
                { id: "deplacement", label: "Le support se déplace pendant l’opération", categoryId: "evenement" },
                { id: "coupure", label: "Une coupure à la main", categoryId: "dommage" },
                { id: "surdite", label: "Une perte d’audition après des années d’exposition", categoryId: "dommage" },
              ],
              explanation:
                "Le danger existe seul, la situation dangereuse suppose une exposition, l’événement déclencheur fait basculer, le dommage est l’atteinte. Quatre maillons, jamais confondus.",
            },
          },
          {
            title: "Défi 04 : le processus complet",
            type: "qcm",
            instructions: "Déduire l’enchaînement correct à partir de la situation observée.",
            payload: {
              question: `Dans la situation de ${context.learner}, quel enchaînement décrit correctement le processus ?`,
              choices: [
                { id: "bon", label: `${context.processDanger}, puis ${context.processExposure}, puis ${context.processTrigger}, puis ${context.processDamage}` },
                { id: "inverse", label: `${context.processDamage}, puis ${context.processDanger}, puis ${context.processExposure}` },
                { id: "court", label: `${context.processDanger}, puis ${context.processDamage}` },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "L’ordre ne change jamais : danger, situation dangereuse, événement déclencheur, dommage. Sauter un maillon fait perdre un endroit où l’on aurait pu agir.",
            },
          },
          {
            title: "Jeu : dommage immédiat ou différé",
            type: "sorting",
            instructions: "Classer chaque dommage selon le moment où il apparaît.",
            payload: {
              prompt: "Classe chaque atteinte : elle arrive tout de suite, ou elle apparaît bien plus tard.",
              categories: [
                { id: "immediat", label: "Dommage immédiat" },
                { id: "differe", label: "Dommage différé" },
              ],
              items: [
                { id: "coupure", label: "Une coupure pendant l’opération", categoryId: "immediat" },
                { id: "brulure", label: "Une brûlure au contact d’une pièce chaude", categoryId: "immediat" },
                { id: "projection", label: "Une projection dans l’œil", categoryId: "immediat" },
                { id: "audition", label: "Une perte d’audition après des années de bruit", categoryId: "differe" },
                { id: "tms", label: "Une douleur d’épaule installée après des mois de gestes répétés", categoryId: "differe" },
                { id: "respiratoire", label: "Une atteinte respiratoire après une exposition prolongée", categoryId: "differe" },
              ],
              explanation:
                "Un dommage immédiat renvoie plutôt à un accident du travail, un dommage différé plutôt à une maladie professionnelle. Le processus est le même ; c’est le délai qui change.",
            },
          },
          {
            title: "Vrai ou faux : une situation dangereuse sans personne",
            type: "true_false",
            instructions: "Justifier la réponse à partir de la notion d’exposition.",
            payload: {
              statement: "Une situation dangereuse peut exister alors qu’aucun opérateur n’est exposé.",
              correctAnswer: false,
              explanation:
                "Faux : sans opérateur exposé, il reste un danger, pas une situation dangereuse. C’est exactement ce qui permet d’agir : éloigner la personne du danger casse le processus avant l’événement déclencheur.",
            },
          },
          {
            title: "Vrai ou faux : l’ordre du processus",
            type: "true_false",
            instructions: "Classer les quatre maillons dans l’ordre du processus.",
            payload: {
              statement: "Le processus se lit dans cet ordre : danger, situation dangereuse, événement déclencheur, dommage.",
              correctAnswer: true,
              explanation: "Vrai : cet ordre ne change jamais. Sauter un maillon fait perdre un endroit où l’on aurait pu agir avant le dommage.",
            },
          },
          {
            title: "Vrai ou faux : la surdité, un dommage immédiat",
            type: "true_false",
            instructions: "Comparer un dommage immédiat et un dommage différé.",
            payload: {
              statement: "Une perte d’audition apparue après des années de bruit est un dommage immédiat.",
              correctAnswer: false,
              explanation: "Faux : c’est un dommage différé, qui met des années à s’installer. Il renvoie plutôt à une maladie professionnelle, alors que le dommage immédiat renvoie plutôt à l’accident du travail.",
            },
          },
          {
            title: "Défi 05 : où casser la chaîne",
            type: "qcm",
            instructions: "Expliquer quel maillon il vaut mieux casser en premier.",
            payload: {
              question: "Pour éviter le dommage, sur quel maillon vaut-il mieux agir en premier ?",
              choices: [
                { id: "danger", label: "Sur le danger, en le supprimant à la source" },
                { id: "dommage", label: "Sur le dommage, en soignant vite la personne" },
                { id: "evenement", label: "Sur l’événement déclencheur, en demandant d’être plus prudent" },
              ],
              correctChoiceIds: ["danger"],
              explanation:
                "Supprimer le danger protège tout le monde et ne dépend de la vigilance de personne. Soigner intervient après le dommage, donc trop tard. Demander de la prudence laisse le danger en place.",
            },
          },
        ],
      },
      {
        title: "Évaluer et hiérarchiser un risque",
        description: `Utiliser la grille de cotation de l’atelier ${context.place} pour dire quel risque traiter en premier.`,
        activities: [
          {
            title: "À retenir : gravité, probabilité, priorité",
            type: "content",
            instructions: "Repérer les trois critères qui servent à évaluer un risque.",
            payload: {
              body: `${context.mentor} fournit la grille de cotation interne de l’atelier. Évaluer un risque, c’est utiliser cet outil, pas donner une impression.\n\nLa gravité décrit l’importance du dommage possible. Une coupure superficielle et une amputation n’ont pas la même gravité, même si le processus se ressemble. La gravité ne dit rien de la fréquence.\n\nLa probabilité d’occurrence décrit la possibilité que le dommage survienne. Elle tient compte de la durée et de la fréquence d’exposition, et des événements déjà observés au poste.\n\nLe niveau de priorité se déduit de la combinaison des deux. Il sert à organiser l’action : par quoi commencer quand on ne peut pas tout traiter en même temps.\n\nUn risque grave mais très rare et un risque léger mais quotidien peuvent recevoir une priorité voisine. C’est justement le rôle de l’outil : éviter de se fier au premier ressenti.\n\nChaque entreprise a sa propre grille, avec ses propres niveaux. Il faut toujours lire l’outil fourni avant de conclure, et pouvoir justifier la cotation retenue en citant les critères.`,
            },
          },
          {
            title: "Défi 06 : ce que décrit la gravité",
            type: "qcm",
            instructions: "Identifier ce que mesure le critère de gravité.",
            payload: {
              question: "Que décrit le critère de gravité ?",
              choices: [
                { id: "importance", label: "L’importance du dommage possible" },
                { id: "frequence", label: "La fréquence à laquelle la situation se produit" },
                { id: "duree", label: "La durée pendant laquelle l’opérateur est exposé" },
              ],
              correctChoiceIds: ["importance"],
              explanation:
                "La gravité porte sur ce que la personne peut subir. La fréquence et la durée d’exposition, elles, servent à estimer la probabilité.",
            },
          },
          {
            title: "Défi 07 : ce qui fait monter la probabilité",
            type: "qcm",
            instructions: "Déduire l’effet de l’exposition sur la probabilité.",
            payload: {
              question: "Une opération à risque passe de une fois par mois à plusieurs fois par jour. Qu’est-ce qui change dans la cotation ?",
              choices: [
                { id: "proba", label: "La probabilité augmente, la gravité ne change pas" },
                { id: "gravite", label: "La gravité augmente, la probabilité ne change pas" },
                { id: "rien", label: "Rien ne change, c’est la même opération" },
              ],
              correctChoiceIds: ["proba"],
              explanation:
                "Le dommage possible reste le même, donc la gravité ne bouge pas. C’est l’exposition qui augmente, donc la probabilité, et donc la priorité.",
            },
          },
          {
            title: `Jeu : hiérarchiser les situations de ${context.place}`,
            type: "sorting",
            instructions: "Classer chaque situation selon la priorité de traitement.",
            payload: {
              prompt: `Trois situations ont été repérées dans l’atelier. Classe chacune selon la priorité que donne la grille.`,
              categories: [
                { id: "elevee", label: "Priorité élevée" },
                { id: "moyenne", label: "Priorité moyenne" },
                { id: "faible", label: "Priorité plus faible" },
              ],
              items: context.ratedSituations,
              explanation:
                "La priorité combine la gravité du dommage possible et la probabilité qu’il survienne. Elle ne dit pas qu’un risque est acceptable : elle dit seulement par quoi commencer.",
            },
          },
          {
            title: "Vrai ou faux : la même grille partout",
            type: "true_false",
            instructions: "Justifier la réponse à partir de ce que dit la grille fournie.",
            payload: {
              statement: "Toutes les entreprises utilisent la même grille de cotation des risques.",
              correctAnswer: false,
              explanation:
                "Faux : chaque entreprise construit ou adapte sa grille, avec ses propres niveaux. C’est l’outil fourni qui fait foi, et il se lit avant de coter.",
            },
          },
          {
            title: "Vrai ou faux : la gravité et la fréquence",
            type: "true_false",
            instructions: "Comparer ce que mesurent la gravité et la probabilité.",
            payload: {
              statement: "La gravité décrit l’importance du dommage possible, pas la fréquence à laquelle la situation se produit.",
              correctAnswer: true,
              explanation: "Vrai : la gravité porte sur ce que la personne peut subir. La fréquence et la durée d’exposition servent, elles, à estimer la probabilité.",
            },
          },
          {
            title: "Vrai ou faux : une priorité faible, un risque acceptable",
            type: "true_false",
            instructions: "Expliquer ce que dit et ne dit pas un niveau de priorité.",
            payload: {
              statement: "Un risque classé en priorité faible est un risque qu’il n’est pas nécessaire de traiter.",
              correctAnswer: false,
              explanation: "Faux : la priorité dit seulement par quoi commencer quand on ne peut pas tout traiter en même temps. Elle ne rend aucun risque acceptable.",
            },
          },
          {
            title: "Défi 08 : avant de proposer une mesure",
            type: "qcm",
            instructions: `Indiquer ce qu’il faut faire quand la grille classe une situation en priorité élevée.`,
            payload: {
              question: `La grille de ${context.place} classe « ${context.highPrioritySituation} » en priorité élevée. Que faire avant de proposer une mesure ?`,
              choices: [
                { id: "verifier", label: "Vérifier les critères retenus et justifier la cotation" },
                { id: "foncer", label: "Proposer tout de suite la mesure qui vient à l’esprit" },
                { id: "attendre", label: "Attendre qu’un accident confirme la cotation" },
              ],
              correctChoiceIds: ["verifier"],
              explanation:
                "Une cotation se justifie en citant les critères : quelle gravité, quelle probabilité, et sur quels faits. Une mesure posée sur une cotation non vérifiée peut viser à côté du vrai problème.",
            },
          },
          {
            title: "Jeu : le lexique de l’évaluation",
            type: "matching",
            instructions: "Identifier le sens exact de chaque critère.",
            payload: {
              prompt: "Relie chaque mot de l’évaluation à sa définition.",
              pairs: [
                { id: "gravite", left: "Gravité", right: "Importance du dommage possible" },
                { id: "probabilite", left: "Probabilité d’occurrence", right: "Possibilité que le dommage survienne" },
                { id: "priorite", left: "Niveau de priorité", right: "Ordre dans lequel les risques seront traités" },
                { id: "evaluation", left: "Évaluation du risque", right: "Utilisation organisée des critères de la grille" },
              ],
              explanation:
                "Ces quatre mots sont ceux de l’outil. Les confondre à l’écrit coûte des points, parce que la démarche repose sur leur distinction.",
            },
          },
        ],
      },
      {
        title: "Choisir des mesures de prévention et de protection",
        description: "Proposer des mesures dans le bon ordre, et justifier chacune par le risque qu’elle traite vraiment.",
        activities: [
          {
            title: "À retenir : l’ordre des mesures",
            type: "content",
            instructions: "Repérer l’ordre dans lequel les mesures sont recherchées.",
            payload: {
              body: `À l’atelier ${context.place}, l’objectif est de réduire ${context.targetRisk}. Plusieurs idées circulent. Toutes ne se valent pas, et l’ordre dans lequel on les examine est fixé.\n\nD’abord la suppression : éliminer le danger ou l’exposition. Supprimer une étape manuelle, remplacer un produit dangereux par un produit qui ne l’est pas. C’est la seule mesure qui fait disparaître le problème.\n\nEnsuite la réduction à la source : diminuer le risque là où il naît. Un dispositif de maintien de la pièce, une aide à la manutention, un outil moins bruyant.\n\nEnsuite la protection collective : protéger plusieurs personnes à la fois, sans dépendre du geste de chacune. Un écran, un carter, une aspiration, un balisage.\n\nEnfin la protection individuelle : l’équipement porté par une personne. Elle ne supprime pas le danger et ne protège que celui qui la porte, correctement.\n\nL’information et la formation accompagnent toutes les autres mesures. Expliquer le risque, former au geste, afficher la consigne : cela rend les mesures efficaces, mais ne les remplace jamais. Dire à quelqu’un de faire attention n’est pas une mesure de prévention.\n\nUne mesure se justifie toujours par le risque analysé : elle dit sur quel maillon du processus elle agit.`,
            },
          },
          {
            title: "Défi 09 : par quelle mesure commencer",
            type: "qcm",
            instructions: "Expliquer par quel type de mesure commence la recherche.",
            payload: {
              question: "Dans quel ordre cherche-t-on les mesures ?",
              choices: [
                { id: "ordre", label: "Supprimer, puis réduire, puis protéger collectivement, puis protéger individuellement" },
                { id: "epi", label: "Distribuer les protections individuelles, puis voir si cela suffit" },
                { id: "former", label: "Former les opérateurs, cela règle tous les risques" },
              ],
              correctChoiceIds: ["ordre"],
              explanation:
                "Cet ordre n’est pas une préférence : une mesure qui supprime le danger protège tout le monde, définitivement. Une protection individuelle ne protège qu’une personne, et seulement si elle la porte.",
            },
          },
          {
            title: `Jeu : classer les mesures proposées à ${context.place}`,
            type: "sorting",
            instructions: "Classer chaque mesure proposée selon son type.",
            payload: {
              prompt: "Classe chaque proposition selon ce qu’elle fait vraiment au risque.",
              categories: [
                { id: "suppression", label: "Suppression" },
                { id: "reduction", label: "Réduction" },
                { id: "collective", label: "Protection collective" },
                { id: "individuelle", label: "Protection individuelle" },
              ],
              items: context.measures,
              explanation:
                "Supprimer fait disparaître le danger. Réduire le diminue à la source. Une protection collective s’interpose pour tous. Une protection individuelle ne couvre qu’une personne.",
            },
          },
          {
            title: "Défi 10 : la mesure qui protège plusieurs opérateurs",
            type: "qcm",
            instructions: `Identifier la mesure qui protège plusieurs opérateurs à ${context.place}.`,
            payload: {
              question: `Pour réduire ${context.targetRisk}, quelle proposition protège plusieurs opérateurs à la fois ?`,
              choices: [
                { id: "collective", label: context.collectiveMeasure },
                { id: "epi", label: "Fournir des gants adaptés à chaque opérateur" },
                { id: "consigne", label: "Rappeler aux opérateurs de faire attention" },
              ],
              correctChoiceIds: ["collective"],
              explanation:
                "Une protection collective s’interpose entre le danger et toutes les personnes présentes, sans rien demander à chacune. Les gants ne protègent que celui qui les porte. Un rappel à la vigilance ne change rien au danger.",
            },
          },
          {
            title: "Vrai ou faux : l’équipement individuel suffit",
            type: "true_false",
            instructions: "Justifier la réponse à partir de ce que fait réellement un équipement de protection.",
            payload: {
              statement: "Fournir un équipement de protection individuelle suffit à supprimer le danger.",
              correctAnswer: false,
              explanation:
                "Faux : l’équipement protège la personne qui le porte, mais le danger reste entier. Il vient en dernier, quand la suppression, la réduction et la protection collective ne suffisent pas.",
            },
          },
          {
            title: "Vrai ou faux : supprimer protège tout le monde",
            type: "true_false",
            instructions: "Justifier la place de la suppression en tête de l’ordre des mesures.",
            payload: {
              statement: "Supprimer le danger protège tout le monde, sans dépendre de la vigilance de chacun.",
              correctAnswer: true,
              explanation: "Vrai : c’est la seule mesure qui fait disparaître le problème, définitivement et pour toutes les personnes du poste. C’est pour cela qu’elle est cherchée en premier.",
            },
          },
          {
            title: "Vrai ou faux : faire attention suffit",
            type: "true_false",
            instructions: "Expliquer si un rappel à la vigilance constitue une mesure de prévention.",
            payload: {
              statement: "Demander aux opérateurs de faire attention est une mesure de prévention suffisante.",
              correctAnswer: false,
              explanation: "Faux : un rappel à la vigilance ne change rien au danger. L’information et la formation accompagnent les autres mesures, elles ne les remplacent jamais.",
            },
          },
          {
            title: "Défi 11 : la place de la formation",
            type: "qcm",
            instructions: "Expliquer le rôle de l’information et de la formation dans la prévention.",
            payload: {
              question: "Quel est le rôle d’une formation au poste, dans la prévention ?",
              choices: [
                { id: "accompagne", label: "Elle accompagne les autres mesures et les rend efficaces" },
                { id: "remplace", label: "Elle remplace les mesures techniques, moins coûteuses à mettre en place" },
                { id: "inutile", label: "Elle ne sert à rien puisque le danger reste présent" },
              ],
              correctChoiceIds: ["accompagne"],
              explanation:
                "Informer et former font partie des mesures attendues : sans elles, un dispositif est mal utilisé ou contourné. Mais elles ne remplacent jamais la suppression ou la protection : « faire attention » n’est pas une mesure de prévention.",
            },
          },
          {
            title: "Défi 12 : justifier la mesure choisie",
            type: "qcm",
            instructions: "Justifier une mesure en la reliant au risque analysé.",
            payload: {
              question: "Quelle justification est attendue à l’épreuve, pour la mesure proposée ?",
              choices: [
                { id: "reliee", label: "Elle dit sur quel élément du processus la mesure agit, et pourquoi le risque baisse" },
                { id: "generale", label: "Elle affirme que la mesure est bonne pour la sécurité" },
                { id: "cout", label: "Elle indique combien la mesure coûte à l’entreprise" },
              ],
              correctChoiceIds: ["reliee"],
              explanation:
                "Une justification relie la mesure au risque analysé : quel maillon elle casse, et quel effet cela produit. Une phrase générale ne prouve rien, et le coût n’est pas un argument de prévention.",
            },
          },
          {
            title: "Jeu : le lexique de la séquence",
            type: "matching",
            instructions: "Identifier le sens exact de chaque mot de la séquence.",
            payload: {
              prompt: "Le lexique de la séquence, à reconstituer.",
              pairs: [
                { id: "danger", left: "Danger", right: "Élément capable de provoquer un dommage" },
                { id: "evenement", left: "Événement déclencheur", right: "Fait qui fait basculer la situation vers le dommage" },
                { id: "risque", left: "Risque professionnel", right: "Possibilité que le processus aille jusqu’au dommage" },
                { id: "gravite", left: "Gravité", right: "Importance du dommage possible" },
                { id: "suppression", left: "Suppression du risque", right: "Élimination du danger ou de l’exposition" },
                { id: "collective", left: "Protection collective", right: "Mesure qui protège plusieurs personnes à la fois" },
              ],
              explanation:
                "Ces six mots portent toute la démarche, de l’analyse à la mesure. Les employer avec leur sens exact dans une réponse rédigée est ce qui est attendu.",
            },
          },
        ],
      },
    ],
  };
}
