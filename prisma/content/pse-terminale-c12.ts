import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

// Séquence PSE de terminale professionnelle — module C12 « L'égalité de
// traitement au travail » du programme de PSE en baccalauréat professionnel.
//
// Les classes de terminale suivent la même séquence, en deux séances : seul
// le contexte professionnel change. Ce module porte la séquence,
// pse-taero-c12.ts et pse-ttci-c12.ts portent le contexte.
//
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero-c12.md et
// docs/mapping-pedagogique-t-tci-c12.md

export type TerminaleC12Context = {
  classroom: "T AERO" | "T TCI";
  /** Nom de l'atelier fil rouge, tel qu'il apparaît dans les cours. */
  place: string;
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
      { id: "comparer", left: "Comparer", right: "Présenter les points communs et les différences" },
      { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
    ],
    explanation:
      "Ces quatre verbes sont ceux des consignes de la séquence, et ceux de l’épreuve. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
  },
};

export function buildPseTerminaleC12Sequence(context: TerminaleC12Context): InitialLearningSequence {
  return {
    title: "C12. L'égalité de traitement au travail",
    description: `Tu vas apprendre à distinguer une inégalité d’une discrimination, et à savoir qui contacter en cas de besoin, à partir de situations de l’atelier ${context.place}.`,
    lessons: [
      {
        title: "Reconnaître une discrimination",
        description: "Distinguer une inégalité d’une discrimination fondée sur un critère interdit par la loi.",
        activities: [
          verbsActivity,
          {
            title: "À retenir : toute différence n’est pas une discrimination",
            type: "content",
            instructions: "Repérer les différentes catégories de discrimination au travail en identifiant les publics concernés.",
            payload: {
              body: `Une nouvelle arrivante rejoint l’atelier ${context.place}. Une remarque met en doute ses capacités, parce qu’elle est une femme.\n\nUne discrimination est un traitement défavorable fondé sur un critère interdit par la loi : l’origine, le sexe, l’âge, le handicap, et d’autres critères limitativement énumérés par le Code du travail.\n\nUn critère est une caractéristique utilisée pour distinguer des personnes : tous les critères ne sont pas interdits. Certains dispositifs légaux traitent différemment des publics pour des raisons reconnues par la loi, par exemple des dispositifs en faveur de l’emploi des jeunes ou des personnes en situation de handicap.\n\nUne différence de situation n’est donc pas toujours une discrimination : il faut analyser les faits et le contexte, et vérifier si le traitement défavorable repose bien sur un critère que la loi interdit.`,
            },
          },
          {
            title: "Jeu : le lexique de la discrimination",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "discrimination", left: "Discrimination", right: "Traitement défavorable fondé sur un critère interdit par la loi" },
                { id: "critere", left: "Critère", right: "Caractéristique utilisée pour distinguer des personnes" },
                { id: "egalite", left: "Égalité professionnelle", right: "Égalité de droits et de traitement dans la vie professionnelle" },
              ],
              explanation:
                "Un critère seul ne suffit pas à définir une discrimination. C’est l’association d’un traitement défavorable à un critère interdit qui la caractérise.",
            },
          },
          {
            title: "Jeu : discrimination ou dispositif légal",
            type: "sorting",
            instructions: "Classer chaque situation selon qu’elle constitue une discrimination ou un dispositif prévu par la loi.",
            payload: {
              prompt: "Classe chaque situation.",
              categories: [
                { id: "discrimination", label: "Discrimination" },
                { id: "dispositif", label: "Dispositif prévu par la loi" },
              ],
              items: [
                { id: "remarque", label: "Une remarque qui met en doute les capacités d’une salariée parce qu’elle est une femme", categoryId: "discrimination" },
                { id: "refus_age", label: "Un refus d’embauche justifié uniquement par l’âge du candidat", categoryId: "discrimination" },
                { id: "handicap", label: "Un dispositif réservé aux personnes en situation de handicap pour favoriser leur emploi", categoryId: "dispositif" },
                { id: "jeunes", label: "Un contrat de professionnalisation réservé aux jeunes", categoryId: "dispositif" },
              ],
              explanation:
                "La loi prévoit certains dispositifs qui traitent différemment des publics pour des raisons reconnues ; ce n’est pas une discrimination. La remarque fondée sur le sexe, elle, repose sur un critère interdit.",
            },
          },
          {
            title: "Défi 01 : un critère interdit",
            type: "qcm",
            instructions: "Identifier ce qui caractérise une discrimination.",
            payload: {
              question: "Qu’est-ce qui caractérise une discrimination au travail ?",
              choices: [
                { id: "bon", label: "Un traitement défavorable fondé sur un critère interdit par la loi" },
                { id: "difference", label: "Toute différence de traitement, sans aucune condition" },
                { id: "aucune", label: "Aucun critère particulier : cela dépend seulement de l’ambiance" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Toute différence de traitement n’est pas une discrimination. C’est l’association à un critère interdit par la loi qui la caractérise juridiquement.",
            },
          },
          {
            title: "Vrai ou faux : une différence est toujours une discrimination",
            type: "true_false",
            instructions: "Justifier qu’une différence de situation n’est pas toujours une discrimination.",
            payload: {
              statement: "Toute différence de traitement entre deux salariés constitue automatiquement une discrimination.",
              correctAnswer: false,
              explanation: "Faux : certains dispositifs légaux traitent différemment des publics pour des raisons reconnues par la loi, sans constituer une discrimination.",
            },
          },
        ],
      },
      {
        title: "Égalité et recours",
        description: "Identifier les obligations en matière d’égalité professionnelle et les interlocuteurs à solliciter en cas de discrimination.",
        activities: [
          {
            title: "À retenir : qui contacter",
            type: "content",
            instructions: "Identifier les interlocuteurs à solliciter en cas de discrimination au travail.",
            payload: {
              body: `À l’atelier ${context.place}, un candidat en situation de handicap demande un aménagement de poste. L’équipe cherche le bon interlocuteur et une réponse argumentée.\n\nL’égalité professionnelle est l’égalité de droits et de traitement dans la vie professionnelle, notamment entre les femmes et les hommes. La loi impose cette égalité de traitement, et dans les entreprises concernées, le comité social et économique (CSE), qui représente collectivement les salariés, participe à l’élaboration d’un accord d’égalité professionnelle.\n\nPlusieurs interlocuteurs ont des missions différentes face à une discrimination. Le Défenseur des droits est une autorité indépendante pouvant informer et accompagner une personne qui s’estime discriminée. L’inspection du travail est un service qui informe et contrôle l’application du droit du travail. Une organisation syndicale est une organisation qui défend les intérêts professionnels des salariés.\n\nFace à une situation de discrimination, il convient de rassembler des faits, de conserver les preuves disponibles, et de solliciter l’interlocuteur adapté à la situation. L’employeur, de son côté, doit aussi tenir compte de l’exposition au risque selon le sexe dans son évaluation des risques professionnels.`,
            },
          },
          {
            title: "Jeu : le lexique des interlocuteurs",
            type: "matching",
            instructions: "Définir le rôle de chaque interlocuteur en cas de discrimination.",
            payload: {
              prompt: "Relie chaque interlocuteur à sa mission exacte.",
              pairs: [
                { id: "egalite", left: "Égalité professionnelle", right: "Égalité de droits et de traitement dans la vie professionnelle" },
                { id: "cse", left: "CSE", right: "Comité social et économique représentant collectivement les salariés" },
                { id: "defenseur", left: "Défenseur des droits", right: "Autorité indépendante pouvant informer et accompagner face à une discrimination" },
                { id: "inspection", left: "Inspection du travail", right: "Service qui informe et contrôle l’application du droit du travail" },
                { id: "syndicat", left: "Organisation syndicale", right: "Organisation qui défend les intérêts professionnels des salariés" },
              ],
              explanation:
                "Chaque interlocuteur a une mission distincte. Confondre le Défenseur des droits et l’inspection du travail dans une réponse serait une erreur, car leurs rôles ne se superposent pas.",
            },
          },
          {
            title: "Jeu : quel interlocuteur pour quelle démarche",
            type: "sorting",
            instructions: "Classer chaque démarche selon l’interlocuteur concerné.",
            payload: {
              prompt: "Classe chaque démarche selon l’interlocuteur qui la traite.",
              categories: [
                { id: "defenseur", label: "Défenseur des droits" },
                { id: "inspection", label: "Inspection du travail" },
                { id: "cse", label: "CSE" },
              ],
              items: [
                { id: "accompagnement", label: "Être accompagné pour faire valoir ses droits face à une discrimination", categoryId: "defenseur" },
                { id: "controle", label: "Faire contrôler le respect du droit du travail dans l’entreprise", categoryId: "inspection" },
                { id: "accord", label: "Participer à l’élaboration d’un accord d’égalité professionnelle", categoryId: "cse" },
              ],
              explanation:
                "Le Défenseur des droits accompagne une personne ; l’inspection du travail contrôle le respect de la réglementation ; le CSE représente collectivement les salariés dans l’entreprise.",
            },
          },
          {
            title: "Défi 02 : qui participe à l’accord d’égalité",
            type: "qcm",
            instructions: "Identifier l’instance qui participe à l’élaboration d’un accord d’égalité professionnelle.",
            payload: {
              question: "Dans une entreprise concernée, quelle instance participe à l’élaboration d’un accord d’égalité professionnelle ?",
              choices: [
                { id: "cse", label: "Le comité social et économique (CSE)" },
                { id: "defenseur", label: "Le Défenseur des droits" },
                { id: "aucune", label: "Aucune instance, c’est une décision unilatérale de l’employeur" },
              ],
              correctChoiceIds: ["cse"],
              explanation:
                "Le CSE, qui représente collectivement les salariés, participe à l’élaboration de cet accord dans les entreprises concernées.",
            },
          },
          {
            title: "Défi 03 : rassembler des faits avant d’agir",
            type: "qcm",
            instructions: "Identifier la première démarche à suivre face à une discrimination.",
            payload: {
              question: "Face à une situation de discrimination, quelle est la première démarche recommandée ?",
              choices: [
                { id: "faits", label: "Rassembler des faits précis et conserver les preuves disponibles" },
                { id: "ignorer", label: "Ne rien faire, en attendant que la situation se résolve seule" },
                { id: "rumeur", label: "En parler uniquement par rumeur, sans rien noter" },
              ],
              correctChoiceIds: ["faits"],
              explanation:
                "Rassembler des faits précis et conserver les preuves permet ensuite de solliciter l’interlocuteur adapté avec un dossier solide.",
            },
          },
          {
            title: "Vrai ou faux : le Défenseur des droits et l’inspection du travail font la même chose",
            type: "true_false",
            instructions: "Distinguer les missions du Défenseur des droits et de l’inspection du travail.",
            payload: {
              statement: "Le Défenseur des droits et l’inspection du travail exercent exactement la même mission face à une discrimination.",
              correctAnswer: false,
              explanation: "Faux : le Défenseur des droits informe et accompagne une personne ; l’inspection du travail informe et contrôle l’application du droit du travail dans l’entreprise.",
            },
          },
          {
            title: "Défi 04 : pourquoi plusieurs interlocuteurs",
            type: "qcm",
            instructions: "Expliquer pourquoi plusieurs interlocuteurs existent face à une discrimination au travail.",
            payload: {
              question: "Pourquoi existe-t-il plusieurs interlocuteurs possibles face à une discrimination au travail ?",
              choices: [
                { id: "bon", label: "Parce que chacun a une mission différente : accompagner, contrôler ou représenter collectivement" },
                { id: "hasard", label: "Par hasard, sans aucune organisation particulière" },
                { id: "unique", label: "Il n’existe en réalité qu’un seul interlocuteur possible" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Le Défenseur des droits, l’inspection du travail, le CSE et les organisations syndicales ont chacun un rôle distinct, ce qui explique qu’il faille choisir le bon interlocuteur selon la situation.",
            },
          },
        ],
      },
    ],
  };
}
