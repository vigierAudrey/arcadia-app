import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

// Séquence PSE de seconde professionnelle — module C2 « Les notions de base en
// prévention des risques professionnels » du programme de PSE en baccalauréat
// professionnel.
//
// Les deux classes de seconde suivent la même séquence : mêmes objectifs, même
// progression, seul le contexte professionnel change. Ce module porte la
// séquence, les deux fichiers pse-2aero-c2.ts et pse-2ciel-c2.ts portent le
// contexte de leur classe.
//
// Traçabilité complète des sources : docs/mapping-pedagogique-2-aero-c2.md et
// docs/mapping-pedagogique-2-ciel-c2.md
//
// Les huit verbes de consigne de la séquence (Repérer, Identifier, Décrire,
// Indiquer, Classer, Déduire, Expliquer, Justifier) viennent tous de
// _COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md.

type RiskItem = {
  id: string;
  label: string;
  categoryId: string;
};

export type SecondeC2Context = {
  classroom: "2 AERO" | "2 CIEL";
  /** Nom de l'entreprise fil rouge, tel qu'il apparaît dans les cours. */
  place: string;
  /** Tuteur ou tutrice de l'entreprise fil rouge. */
  mentor: string;
  /** Élève du fil rouge, celui qui agit dans les situations. */
  learner: string;
  /** Camarade du fil rouge, celle qui observe dans la séance 2. */
  peer: string;
  /** Tâche préparée au début de la séance 1, à l'infinitif nominalisé. */
  task: string;
  /** Ce que l'affiche du poste impose, repris du cours. */
  posterRules: string;
  /** Deux EPI concrets du poste, séparés par « et ». */
  epiExamples: string;
  /** Une protection collective concrète du poste. */
  collectiveExample: string;
  /** Poste où la consigne est effacée, dans la mini-situation du cours. */
  erasedSignPost: string;
  /** Ce que la camarade observe au début de la séance 2, repris du cours. */
  observedScene: string;
  /** Danger de la chaîne, tel que le cours le nomme. */
  dangerExample: string;
  /** Dommage potentiel associé à ce danger. */
  damageExample: string;
  /** Situation d'exposition, telle que le cours la décrit. */
  exposureExample: string;
  /** Les postes présentés lors de l'accueil, séance 3. */
  workstations: string;
  /** Familles de risques travaillées par la classe, du plus fréquent au moins. */
  riskCategories: { id: string; label: string }[];
  /** Situations à classer dans ces familles. */
  riskItems: RiskItem[];
  /** Postes à relier à leur famille dominante. */
  riskPairs: { id: string; left: string; right: string }[];
  /** Risque dominant du métier, pour la conduite à tenir. */
  mainRisk: string;
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
      { id: "indiquer", left: "Indiquer", right: "Donner un renseignement" },
      { id: "classer", left: "Classer", right: "Ranger des éléments dans l’ordre ou la manière indiquée" },
      { id: "deduire", left: "Déduire", right: "Établir une conséquence logique" },
      { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
      { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
    ],
    explanation:
      "Ces huit verbes sont ceux des consignes de la séquence, et ceux des épreuves. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
  },
};

const pictogramActivity: InitialActivity = {
  title: "Jeu : la forme du panneau dit ce qu’il demande",
  type: "matching",
  instructions: "Identifier ce que demande chaque forme de panneau de sécurité.",
  payload: {
    prompt: "Relie chaque panneau à ce qu’il demande. La forme et la couleur suffisent à le savoir.",
    pairs: [
      { id: "obligation", left: "Rond bleu, pictogramme blanc", right: "Une obligation : tu dois le faire" },
      { id: "interdiction", left: "Rond blanc bordé de rouge, barre en diagonale", right: "Une interdiction : tu ne dois pas le faire" },
      { id: "danger", left: "Triangle jaune bordé de noir", right: "Un avertissement : attention à ce danger" },
      { id: "secours", left: "Carré vert, pictogramme blanc", right: "Un secours : sortie, issue ou premiers soins" },
      { id: "incendie", left: "Carré rouge, pictogramme blanc", right: "Le matériel de lutte contre l’incendie" },
    ],
    explanation:
      "La forme et la couleur portent le message avant même le dessin. Un rond bleu impose toujours, un triangle jaune avertit toujours. C’est vrai dans tous les ateliers et sur tous les chantiers.",
  },
};

export function buildPseSecondeC2Sequence(context: SecondeC2Context): InitialLearningSequence {
  return {
    title: "C2. Les notions de base en prévention des risques professionnels",
    description: `Tu vas apprendre à expliquer les consignes de sécurité de ton poste, à repérer un danger dans une activité de travail et à nommer la famille de risques à laquelle il appartient, à partir de situations chez ${context.place}.`,
    lessons: [
      {
        title: "Expliquer les consignes de sécurité du poste",
        description: `Comprendre à quoi sert chaque consigne affichée chez ${context.place}, et distinguer ce qui te protège de ce qui protège tout l’atelier.`,
        activities: [
          verbsActivity,
          {
            title: "À retenir : lire la consigne avant d’agir",
            type: "content",
            instructions: "Repérer les quatre mots qui servent à comprendre une consigne de sécurité.",
            payload: {
              body: `Chez ${context.place}, ${context.learner} prépare ${context.task}. Une affiche impose ${context.posterRules}. Il comprend les dessins, mais pas toutes les consignes.\n\nUne consigne de sécurité est une instruction : elle indique l’action sûre à réaliser. Elle demande d’agir.\n\nUne information, elle, renseigne sans demander d’agir : le nom d’un produit, un horaire, un numéro de poste. Savoir laquelle des deux on a sous les yeux évite de passer à côté d’une obligation.\n\nUn pictogramme est un symbole visuel qui transmet le message sans texte. Il se lit vite, même de loin.\n\nUn EPI, équipement de protection individuelle, protège la seule personne qui le porte : ${context.epiExamples}.\n\nUne protection collective protège plusieurs personnes à la fois, sans que chacune ait à y penser : ${context.collectiveExample}.\n\nL’ordre compte : on cherche d’abord la protection collective, l’EPI vient ensuite, en complément.\n\nJe lis la consigne avant de commencer. En cas de doute, je demande à ${context.mentor}.`,
            },
          },
          {
            title: "Défi 01 : à quoi sert une consigne",
            type: "qcm",
            instructions: "Expliquer à quoi sert une consigne de sécurité affichée au poste.",
            payload: {
              question: "Pourquoi une consigne de sécurité est-elle affichée au poste de travail ?",
              choices: [
                { id: "action", label: "Pour indiquer l’action sûre à réaliser" },
                { id: "decor", label: "Pour décorer l’atelier" },
                { id: "punir", label: "Pour punir celui qui se trompe" },
              ],
              correctChoiceIds: ["action"],
              explanation:
                "Une consigne est une instruction : elle dit comment faire sans se mettre en danger. Elle sert avant l’accident, pas après.",
            },
          },
          {
            title: "Défi 02 : instruction ou information",
            type: "qcm",
            instructions: "Identifier laquelle de ces phrases est une instruction.",
            payload: {
              question: "Parmi ces phrases affichées au poste, laquelle est une instruction ?",
              choices: [
                { id: "instruction", label: "« Porter les lunettes de protection avant toute intervention »" },
                { id: "info", label: "« Poste n° 4, atelier est »" },
                { id: "info2", label: "« Livraison des pièces le mardi »" },
              ],
              correctChoiceIds: ["instruction"],
              explanation:
                "Une instruction demande d’agir : elle commence par un verbe. Les deux autres phrases renseignent, mais n’imposent rien.",
            },
          },
          {
            title: "Jeu : consigne, protection individuelle ou collective",
            type: "sorting",
            instructions: `Classer chaque élément relevé chez ${context.place} dans la bonne colonne.`,
            payload: {
              prompt: "Classe chaque élément : une consigne à suivre, une protection portée par une personne, ou une protection qui couvre tout le poste.",
              categories: [
                { id: "consigne", label: "Consigne de sécurité" },
                { id: "epi", label: "Protection individuelle" },
                { id: "collective", label: "Protection collective" },
              ],
              items: [
                { id: "ranger", label: "« Ranger le poste après chaque intervention »", categoryId: "consigne" },
                { id: "lire", label: "« Lire la fiche avant de commencer »", categoryId: "consigne" },
                { id: "signaler", label: "« Signaler toute anomalie au tuteur »", categoryId: "consigne" },
                { id: "lunettes", label: "Les lunettes de protection", categoryId: "epi" },
                { id: "gants", label: "Les gants adaptés au poste", categoryId: "epi" },
                { id: "chaussures", label: "Les chaussures de sécurité", categoryId: "epi" },
                { id: "aspiration", label: "L’aspiration à la source", categoryId: "collective" },
                { id: "carter", label: "Le carter fixe qui ferme la partie en mouvement", categoryId: "collective" },
                { id: "balisage", label: "Le balisage au sol de la zone de circulation", categoryId: "collective" },
              ],
              explanation:
                "Une protection collective agit sur le poste lui-même et protège tout le monde, même celui qui oublie. Un EPI ne protège que celui qui le porte, et seulement s’il le porte.",
            },
          },
          pictogramActivity,
          {
            title: "Défi 03 : la consigne effacée",
            type: "qcm",
            instructions: `Indiquer la conduite à tenir ${context.erasedSignPost}.`,
            payload: {
              question: `${context.erasedSignPost}, la consigne affichée est effacée et illisible. Que faire ?`,
              choices: [
                { id: "arreter", label: `Arrêter, sécuriser la zone et prévenir ${context.mentor}` },
                { id: "deviner", label: "Deviner la consigne et commencer quand même" },
                { id: "demander-eleve", label: "Demander à un autre élève et faire comme lui" },
              ],
              correctChoiceIds: ["arreter"],
              explanation:
                "Une consigne comprise évite l’improvisation. Quand elle manque, on ne la reconstitue pas de mémoire : on s’arrête et on demande à une personne responsable.",
            },
          },
          {
            title: "Vrai ou faux : l’EPI protège toute l’équipe",
            type: "true_false",
            instructions: "Justifier la réponse à partir de ce que protège chaque type de protection.",
            payload: {
              statement: "Porter ses lunettes de protection met aussi les collègues du poste voisin à l’abri.",
              correctAnswer: false,
              explanation:
                "Faux : un EPI ne protège que la personne qui le porte. Pour protéger tout le monde, il faut une protection collective, comme une aspiration ou un carter.",
            },
          },
          {
            title: "Vrai ou faux : la consigne demande d’agir",
            type: "true_false",
            instructions: "Expliquer ce qui distingue une consigne de sécurité d’une simple information.",
            payload: {
              statement: "Une consigne de sécurité demande d’agir, alors qu’une information se contente de renseigner.",
              correctAnswer: true,
              explanation: "Vrai : c’est ce qui les distingue. « Porter les lunettes » demande une action, « Poste n° 4 » ne demande rien. Repérer laquelle des deux on a sous les yeux évite de passer à côté d’une obligation.",
            },
          },
          {
            title: "Vrai ou faux : le panneau rond bleu",
            type: "true_false",
            instructions: "Identifier ce que demande un panneau rond et bleu.",
            payload: {
              statement: "Un panneau rond et bleu signale une interdiction.",
              correctAnswer: false,
              explanation: "Faux : le rond bleu impose toujours une obligation. L’interdiction, c’est le rond blanc bordé de rouge avec une barre en diagonale.",
            },
          },
          {
            title: "Jeu : le lexique de la séance",
            type: "matching",
            instructions: "Indiquer le sens exact de chaque mot de la séance.",
            payload: {
              prompt: "Relie chaque mot à sa définition.",
              pairs: [
                { id: "consigne", left: "Consigne de sécurité", right: "Instruction qui indique l’action sûre à réaliser" },
                { id: "information", left: "Information", right: "Renseignement qui ne demande pas d’agir" },
                { id: "picto", left: "Pictogramme", right: "Symbole visuel qui transmet un message sans texte" },
                { id: "epi", left: "EPI", right: "Équipement qui protège la seule personne qui le porte" },
                { id: "collective", left: "Protection collective", right: "Mesure qui protège plusieurs personnes à la fois" },
              ],
              explanation:
                "Ces cinq mots doivent être employés avec leur sens exact dans une réponse rédigée : c’est ce qui est attendu à l’évaluation.",
            },
          },
        ],
      },
      {
        title: "Relier danger, situation dangereuse et dommage",
        description: "Décrire une situation de travail avec les bons mots, pour comprendre ce qui peut arriver et pourquoi.",
        activities: [
          {
            title: "À retenir : la chaîne qui mène au dommage",
            type: "content",
            instructions: "Repérer les trois maillons qui relient le danger au dommage.",
            payload: {
              body: `${context.peer} observe le poste. ${context.observedScene} Elle veut décrire précisément ce qui peut se passer.\n\nUne activité de travail, c’est l’ensemble des actions réellement réalisées au poste. On part toujours de là.\n\nUn danger est un élément capable de causer un dommage. Il existe même quand personne n’est là : ${context.dangerExample}.\n\nUne situation dangereuse, c’est quand une personne se trouve exposée à ce danger : ${context.exposureExample}.\n\nUn dommage potentiel est l’atteinte à la santé qui pourrait en résulter : ${context.damageExample}.\n\nLa chaîne se lit dans cet ordre : activité de travail, puis danger, puis situation dangereuse, puis dommage potentiel. Un danger enfermé dans une armoire ne blesse personne. C’est l’exposition qui fait basculer la situation.\n\nJe décris les faits, pas les personnes. « Le bidon est resté ouvert » se vérifie. « Il est négligent » ne se vérifie pas et n’aide pas à trouver une solution.`,
            },
          },
          {
            title: "Défi 04 : repérer le danger",
            type: "qcm",
            instructions: "Identifier le danger présent dans cette situation.",
            payload: {
              question: `Dans la situation observée par ${context.peer}, qu’est-ce qui constitue le danger ?`,
              choices: [
                { id: "danger", label: context.dangerExample },
                { id: "personne", label: "La personne qui travaille au poste" },
                { id: "heure", label: "L’heure de l’intervention" },
              ],
              correctChoiceIds: ["danger"],
              explanation:
                "Le danger est un élément capable de nuire, pas une personne. Une personne peut être exposée à un danger, elle n’en est jamais un.",
            },
          },
          {
            title: "Défi 05 : la situation dangereuse",
            type: "qcm",
            instructions: "Expliquer ce qui transforme un danger en situation dangereuse.",
            payload: {
              question: "Qu’est-ce qui transforme un danger en situation dangereuse ?",
              choices: [
                { id: "exposition", label: "Une personne se trouve exposée à ce danger" },
                { id: "taille", label: "Le danger devient plus gros" },
                { id: "affiche", label: "Une affiche signale le danger" },
              ],
              correctChoiceIds: ["exposition"],
              explanation:
                "C’est l’exposition qui fait la différence. Un produit rangé dans son armoire reste un danger, mais personne n’est en situation dangereuse.",
            },
          },
          {
            title: "Défi 06 : le dommage potentiel",
            type: "qcm",
            instructions: "Identifier le dommage potentiel de cette situation.",
            payload: {
              question: "Qu’appelle-t-on le dommage potentiel ?",
              choices: [
                { id: "atteinte", label: "L’atteinte à la santé qui pourrait se produire" },
                { id: "materiel", label: "La pièce abîmée pendant le travail" },
                { id: "retard", label: "Le retard pris sur l’intervention" },
              ],
              correctChoiceIds: ["atteinte"],
              explanation:
                "Le dommage potentiel concerne la santé de la personne. Le matériel abîmé et le retard sont des conséquences pour l’entreprise, pas des dommages au sens de la prévention.",
            },
          },
          {
            title: "Jeu : classer les maillons de la chaîne",
            type: "sorting",
            instructions: "Classer chaque élément selon sa place dans la chaîne.",
            payload: {
              prompt: "Classe chaque élément : ce qui peut nuire, la personne exposée, ou l’atteinte possible.",
              categories: [
                { id: "danger", label: "Danger" },
                { id: "situation", label: "Situation dangereuse" },
                { id: "dommage", label: "Dommage potentiel" },
              ],
              items: [
                { id: "produit", label: "Un produit irritant", categoryId: "danger" },
                { id: "bruit", label: "Un niveau de bruit élevé", categoryId: "danger" },
                { id: "cable", label: "Un câble qui traverse un passage", categoryId: "danger" },
                { id: "sans-lunettes", label: "Un opérateur travaille sans ses lunettes", categoryId: "situation" },
                { id: "sans-casque", label: "Une personne reste près du bruit sans protection auditive", categoryId: "situation" },
                { id: "passage", label: "Quelqu’un circule au-dessus du câble au sol", categoryId: "situation" },
                { id: "brulure", label: "Une brûlure", categoryId: "dommage" },
                { id: "surdite", label: "Une perte d’audition", categoryId: "dommage" },
                { id: "chute", label: "Une chute de plain-pied", categoryId: "dommage" },
              ],
              explanation:
                "Le danger existe seul. La situation dangereuse suppose quelqu’un d’exposé. Le dommage est ce qui pourrait lui arriver. Les trois ne se confondent pas.",
            },
          },
          {
            title: "Jeu : à chaque danger son dommage",
            type: "matching",
            instructions: "Déduire le dommage que chaque danger peut provoquer.",
            payload: {
              prompt: "Relie chaque danger au dommage qu’il peut provoquer chez une personne exposée.",
              pairs: [
                { id: "electrique", left: "Une pièce sous tension accessible", right: "Une électrisation" },
                { id: "chimique", left: "Un produit irritant utilisé à l’air libre", right: "Une irritation de la peau ou des voies respiratoires" },
                { id: "bruit", left: "Un niveau de bruit élevé et répété", right: "Une perte d’audition" },
                { id: "passage", left: "Un câble qui traverse un passage", right: "Une chute de plain-pied" },
                { id: "charge", left: "Une charge lourde déplacée à la main", right: "Une douleur au dos" },
              ],
              explanation:
                "Le dommage se déduit de la nature du danger : le courant fait passer l’électricité dans le corps, le produit agit par contact ou par inhalation, la charge sollicite le dos. C’est ce lien qui rend la prévention compréhensible.",
            },
          },
          {
            title: "Vrai ou faux : un danger blesse toujours",
            type: "true_false",
            instructions: "Justifier la réponse à partir de la notion d’exposition.",
            payload: {
              statement: "Dès qu’un danger est présent dans l’atelier, quelqu’un finit forcément par être blessé.",
              correctAnswer: false,
              explanation:
                "Faux : sans exposition, il n’y a pas de situation dangereuse. Un produit rangé, une machine à l’arrêt et protégée, un câble passé dans une goulotte : le danger existe, mais personne n’y est exposé. Toute la prévention consiste à casser ce maillon.",
            },
          },
          {
            title: "Défi 07 : dire seulement ce que l’on voit",
            type: "qcm",
            instructions: "Décrire la situation observée au poste en s’en tenant aux faits.",
            payload: {
              question: "Laquelle de ces phrases dit seulement ce que l’on voit au poste, sans rien y ajouter ?",
              choices: [
                { id: "fait", label: context.observedScene },
                { id: "jugement", label: "L’opérateur est négligent, il ne fait jamais attention." },
                { id: "vague", label: "Il y a un problème de sécurité dans cet atelier." },
              ],
              correctChoiceIds: ["fait"],
              explanation:
                "Une analyse part de faits observables, que tout le monde peut vérifier. Un jugement sur la personne ne se vérifie pas et ne mène à aucune solution. Une phrase vague ne dit pas quoi corriger.",
            },
          },
          {
            title: "Vrai ou faux : le danger existe sans personne",
            type: "true_false",
            instructions: "Justifier la réponse à partir de la définition du danger.",
            payload: {
              statement: "Un produit irritant rangé dans son armoire reste un danger, même si personne ne l’utilise.",
              correctAnswer: true,
              explanation: "Vrai : le danger est une propriété de l’élément lui-même, il ne disparaît pas quand on range le bidon. Ce qui disparaît, c’est l’exposition, donc la situation dangereuse.",
            },
          },
          {
            title: "Vrai ou faux : une personne peut être un danger",
            type: "true_false",
            instructions: "Identifier ce qui peut être qualifié de danger dans une situation.",
            payload: {
              statement: "La personne qui travaille au poste sans ses protections est le danger de la situation.",
              correctAnswer: false,
              explanation: "Faux : une personne n’est jamais un danger. Elle peut être exposée à un danger, ce qui crée une situation dangereuse. Décrire les faits, pas les personnes.",
            },
          },
          {
            title: "Jeu : le lexique de la chaîne",
            type: "matching",
            instructions: "Indiquer le sens exact de chaque mot de la séance.",
            payload: {
              prompt: "Relie chaque mot à sa définition.",
              pairs: [
                { id: "activite", left: "Activité de travail", right: "Ensemble des actions réellement réalisées au poste" },
                { id: "danger", left: "Danger", right: "Élément capable de causer un dommage" },
                { id: "situation", left: "Situation dangereuse", right: "Situation où une personne est exposée à un danger" },
                { id: "dommage", left: "Dommage potentiel", right: "Atteinte à la santé qui pourrait se produire" },
              ],
              explanation:
                "Ces quatre mots s’enchaînent toujours dans le même ordre. Les employer avec précision est ce qui distingue une analyse d’une impression.",
            },
          },
        ],
      },
      {
        title: "Identifier un risque professionnel et sa famille",
        description: `Nommer le risque présent dans une activité de travail chez ${context.place}, et le ranger dans sa famille.`,
        activities: [
          {
            title: "À retenir : du danger au risque professionnel",
            type: "content",
            instructions: "Repérer ce qui distingue un danger d’un risque professionnel.",
            payload: {
              body: `${context.mentor} prépare l’accueil des nouveaux élèves et présente plusieurs postes : ${context.workstations}.\n\nUn risque professionnel, c’est la possibilité qu’un dommage arrive à une personne pendant son travail. Il naît de la rencontre entre un danger et une activité de travail.\n\nÀ ne pas confondre : le danger est une propriété de la chose. Le risque tient compte de l’activité réelle et de l’exposition. Le même produit chimique constitue un danger dans tous les cas, mais le risque n’est pas le même selon qu’on l’utilise en vase clos ou à l’air libre.\n\nPour s’y retrouver, les risques sont regroupés en familles selon leur origine. L’INRS, Institut national de recherche et de sécurité, publie cette classification et la met à disposition des établissements.\n\nLes familles rencontrées à ${context.place} : ${context.riskCategories.map((category) => category.label.toLowerCase()).join(", ")}.\n\nUne même activité expose souvent à plusieurs familles à la fois. ${context.mainRisk}\n\nLa méthode reste la même à chaque fois : repérer le danger, repérer l’exposition, puis nommer la famille de risques. Et si le risque est là, le signaler.`,
            },
          },
          {
            title: "Défi 08 : danger ou risque",
            type: "qcm",
            instructions: "Expliquer ce qui distingue un risque d’un danger.",
            payload: {
              question: "Un bidon de produit irritant est rangé, fermé, dans une armoire ventilée. Que peut-on dire ?",
              choices: [
                { id: "danger-seul", label: "Le danger existe, mais le risque est faible car personne n’y est exposé" },
                { id: "aucun", label: "Il n’y a plus aucun danger puisque le bidon est rangé" },
                { id: "identique", label: "Le risque est le même que si le bidon était ouvert au poste" },
              ],
              correctChoiceIds: ["danger-seul"],
              explanation:
                "Le danger est une propriété du produit : il ne disparaît pas parce qu’on range le bidon. Ce qui change, c’est l’exposition, donc le risque.",
            },
          },
          {
            title: "Jeu : ranger chaque situation dans sa famille",
            type: "sorting",
            instructions: "Classer chaque situation de travail dans sa famille de risques.",
            payload: {
              prompt: `Classe chaque situation rencontrée chez ${context.place} dans la famille de risques qui lui correspond.`,
              categories: context.riskCategories,
              items: context.riskItems,
              explanation:
                "La famille se déduit de l’origine du danger : ce qui agit sur le corps par un agent physique, par un produit, par le courant, ou par l’effort demandé au corps lui-même.",
            },
          },
          {
            title: "Jeu : à chaque poste son risque dominant",
            type: "matching",
            instructions: "Identifier la famille de risques dominante de chaque poste.",
            payload: {
              prompt: `Relie chaque poste de ${context.place} à la famille de risques qui y domine.`,
              pairs: context.riskPairs,
              explanation:
                "Un poste expose rarement à un seul risque : il s’agit ici du risque dominant, celui qu’on traite en premier. Les autres ne disparaissent pas pour autant.",
            },
          },
          {
            title: "Défi 09 : plusieurs risques à la fois",
            type: "qcm",
            instructions: "Déduire le nombre de familles de risques présentes dans cette activité.",
            payload: {
              question: "Pendant un câblage dans un espace étroit, mal éclairé, en position accroupie et près d’un coffret sous tension, combien de familles de risques sont en jeu ?",
              choices: [
                { id: "plusieurs", label: "Plusieurs à la fois : l’activité physique et le risque électrique au moins" },
                { id: "une", label: "Une seule, celle du poste de travail" },
                { id: "aucune", label: "Aucune, tant que rien n’est arrivé" },
              ],
              correctChoiceIds: ["plusieurs"],
              explanation:
                "La position accroupie et prolongée relève de l’activité physique, le coffret sous tension du risque électrique. Il faut les nommer tous les deux : en oublier un revient à ne pas le prévenir.",
            },
          },
          {
            title: "Vrai ou faux : un seul risque par poste",
            type: "true_false",
            instructions: "Justifier la réponse à partir d’une activité de travail réelle.",
            payload: {
              statement: "Chaque poste de travail n’expose qu’à une seule famille de risques.",
              correctAnswer: false,
              explanation:
                "Faux : une même activité expose presque toujours à plusieurs familles. C’est pour cela que l’inventaire des risques se fait activité par activité, et pas une fois pour toutes.",
            },
          },
          {
            title: "Défi 10 : ce que je fais du risque repéré",
            type: "qcm",
            instructions: `Indiquer la conduite à tenir après avoir repéré un risque chez ${context.place}.`,
            payload: {
              question: "Tu as repéré un risque pendant une activité de travail. Que fais-tu ?",
              choices: [
                { id: "signaler", label: `Le signaler à ${context.mentor} en décrivant ce que tu as vu` },
                { id: "seul", label: "Le corriger seul, en modifiant le poste" },
                { id: "rien", label: "Ne rien dire, ce n’est pas ton rôle d’élève" },
              ],
              correctChoiceIds: ["signaler"],
              explanation:
                "Repérer un risque ne sert à rien s’il n’est pas signalé. Un élève en formation ne modifie pas un poste de lui-même : il décrit les faits à une personne responsable, qui décide de la mesure.",
            },
          },
          {
            title: "Vrai ou faux : ranger le produit fait baisser le risque",
            type: "true_false",
            instructions: "Expliquer l’effet du rangement d’un produit sur le risque.",
            payload: {
              statement: "Ranger un produit irritant dans une armoire ventilée fait baisser le risque, sans supprimer le danger.",
              correctAnswer: true,
              explanation: "Vrai : le produit reste dangereux, mais plus personne n’y est exposé. Le danger est une propriété du produit, le risque dépend de l’activité réelle.",
            },
          },
          {
            title: "Vrai ou faux : signaler, ce n’est pas mon rôle",
            type: "true_false",
            instructions: "Déduire la conduite à tenir après avoir repéré un risque en formation.",
            payload: {
              statement: "Un élève en formation n’a pas à signaler un risque qu’il a repéré : ce n’est pas son rôle.",
              correctAnswer: false,
              explanation: "Faux : repérer un risque ne sert à rien s’il n’est pas signalé. L’élève décrit ce qu’il a vu à une personne responsable. Ce qu’il ne fait pas de lui-même, c’est modifier le poste.",
            },
          },
          {
            title: "Jeu : le lexique de la séquence",
            type: "matching",
            instructions: "Indiquer le sens exact de chaque mot de la séquence.",
            payload: {
              prompt: "Le lexique de la séquence, à reconstituer.",
              pairs: [
                { id: "consigne", left: "Consigne de sécurité", right: "Instruction qui indique l’action sûre à réaliser" },
                { id: "danger", left: "Danger", right: "Élément capable de causer un dommage" },
                { id: "situation", left: "Situation dangereuse", right: "Situation où une personne est exposée à un danger" },
                { id: "dommage", left: "Dommage potentiel", right: "Atteinte à la santé qui pourrait se produire" },
                { id: "risque", left: "Risque professionnel", right: "Possibilité qu’un dommage arrive pendant le travail" },
                { id: "famille", left: "Famille de risques", right: "Groupe de risques qui ont une origine proche" },
              ],
              explanation:
                "Ces six mots sont ceux de la séquence, et ceux de l’épreuve. Les employer avec leur sens exact dans une réponse rédigée est ce qui est attendu.",
            },
          },
        ],
      },
    ],
  };
}
