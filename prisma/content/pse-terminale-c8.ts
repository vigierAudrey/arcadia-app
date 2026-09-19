import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

// Séquence PSE de terminale professionnelle — module C8 « Déclaration et
// réparation des accidents du travail et des maladies professionnelles » du
// programme de PSE en baccalauréat professionnel.
//
// Les deux classes de terminale suivent la même séquence, en deux séances :
// seul le contexte professionnel change. Ce module porte la séquence,
// pse-taero-c8.ts et pse-ttci-c8.ts portent le contexte.
//
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero-c8.md et
// docs/mapping-pedagogique-t-tci-c8.md
//
// AUCUN DÉLAI CHIFFRÉ n'est écrit ici, volontairement. Les deux cours de
// l'enseignante répètent que « les délais exacts se vérifient sur une source
// officielle à jour » (ameli.fr, service-public.fr) et se gardent d'en donner.
// Les exercices portent donc sur les acteurs, l'ordre des étapes et les
// documents, et apprennent le réflexe d'aller vérifier le délai. Voir la
// section correspondante des fiches de traçabilité.

export type TerminaleC8Context = {
  classroom: "T AERO" | "T TCI";
  /** Nom de l'atelier fil rouge, tel qu'il apparaît dans les cours. */
  place: string;
  /** Élève du fil rouge. */
  learner: string;
  /** L'accident du fil rouge, repris du cours. */
  accident: string;
  /** Exposition longue du métier, pour l'exemple de maladie professionnelle. */
  chronicExposure: string;
  /** Atteinte qui en résulte, pour l'exemple de maladie professionnelle. */
  chronicDamage: string;
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
      { id: "definir", left: "Définir", right: "Donner le sens précis d’une notion ou d’un mot" },
      { id: "classer", left: "Classer", right: "Ranger des éléments dans l’ordre ou la manière indiquée" },
      { id: "comparer", left: "Comparer", right: "Présenter les points communs et les différences" },
      { id: "deduire", left: "Déduire", right: "Établir une conséquence logique" },
      { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
      { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
    ],
    explanation:
      "Ces huit verbes sont ceux des consignes de la séquence, et ceux de l’épreuve. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
  },
};

export function buildPseTerminaleC8Sequence(context: TerminaleC8Context): InitialLearningSequence {
  return {
    title: "C8. Déclaration et réparation des accidents du travail et des maladies professionnelles",
    description: `Tu vas apprendre qui fait quoi quand un accident arrive au travail, dans quel ordre et avec quels documents, puis ce que la loi prévoit pour réparer, à partir de situations de l’atelier ${context.place}.`,
    lessons: [
      {
        title: "Déclarer un accident du travail ou une maladie professionnelle",
        description: `Repérer les acteurs, les étapes et les documents d’une déclaration, à partir de la situation de ${context.learner}.`,
        activities: [
          verbsActivity,
          {
            title: "À retenir : de l’accident à la reconnaissance",
            type: "content",
            instructions: "Repérer les acteurs et les étapes d’une procédure de déclaration.",
            payload: {
              body: `${context.accident}\n\nUn AT, accident du travail, est un accident survenu par le fait ou à l’occasion du travail. Il se rattache à un événement daté.\n\nUne MP, maladie professionnelle, est une maladie liée à une exposition professionnelle, reconnue selon une procédure. Exemple dans le métier : ${context.chronicExposure} peut conduire à ${context.chronicDamage}.\n\nQuatre acteurs interviennent, chacun avec un rôle distinct.\n\nLa victime informe son employeur et fait constater la lésion par un médecin.\n\nLe médecin établit le certificat médical initial, le document qui décrit les lésions constatées.\n\nL’employeur déclare l’accident à l’organisme d’assurance maladie et remet à la victime la feuille d’accident, qui permet d’être soigné sans avancer les frais.\n\nL’organisme d’assurance maladie, la caisse primaire d’assurance maladie, instruit le dossier puis décide.\n\nUn point à ne jamais confondre : déclarer n’est pas être reconnu. La déclaration transmet les informations ; la reconnaissance est la décision qui attribue ou non le caractère professionnel, prise après instruction.\n\nChaque démarche a un délai à respecter, et un délai dépassé peut compliquer le dossier. Ces délais changent : ils se vérifient sur une source officielle à jour, ameli.fr ou service-public.fr. Savoir où chercher vaut mieux que retenir un chiffre qui aura changé.`,
            },
          },
          {
            title: "Défi 01 : accident du travail ou maladie professionnelle",
            type: "qcm",
            instructions: "Identifier la nature de l’atteinte subie dans cette situation.",
            payload: {
              question: `${context.accident} De quoi s’agit-il ?`,
              choices: [
                { id: "at", label: "D’un accident du travail : un événement daté, survenu pendant le travail" },
                { id: "mp", label: "D’une maladie professionnelle : une atteinte liée à une exposition longue" },
                { id: "rien", label: "D’un accident de la vie privée, sans lien avec le travail" },
              ],
              correctChoiceIds: ["at"],
              explanation:
                "L’accident du travail se rattache à un fait daté, survenu par le fait ou à l’occasion du travail. La maladie professionnelle, elle, suppose une exposition qui dure.",
            },
          },
          {
            title: "Défi 02 : l’atteinte qui s’installe",
            type: "qcm",
            instructions: "Identifier la nature de cette seconde atteinte.",
            payload: {
              question: `Après plusieurs années de travail, ${context.chronicExposure} a conduit à ${context.chronicDamage}. De quoi s’agit-il ?`,
              choices: [
                { id: "mp", label: "D’une maladie professionnelle possible, liée à une exposition professionnelle" },
                { id: "at", label: "D’un accident du travail, puisque c’est arrivé au travail" },
                { id: "rien", label: "D’une usure normale, sans procédure possible" },
              ],
              correctChoiceIds: ["mp"],
              explanation:
                "L’atteinte s’installe par une exposition répétée ou prolongée : c’est la piste de la maladie professionnelle. Elle devra être reconnue selon une procédure.",
            },
          },
          {
            title: "Jeu : accident ou maladie",
            type: "sorting",
            instructions: "Classer chaque situation selon le type d’atteinte professionnelle.",
            payload: {
              prompt: "Classe chaque situation : un événement daté, ou une atteinte liée à une exposition qui dure.",
              categories: [
                { id: "at", label: "Accident du travail" },
                { id: "mp", label: "Maladie professionnelle" },
              ],
              items: [
                { id: "coupure", label: "Une coupure à la main pendant une opération, à 10 h 15", categoryId: "at" },
                { id: "chute", label: "Une chute d’une plateforme pendant une intervention", categoryId: "at" },
                { id: "projection", label: "Une projection dans l’œil au moment d’un meulage", categoryId: "at" },
                { id: "brulure", label: "Une brûlure au contact d’une pièce chaude", categoryId: "at" },
                { id: "surdite", label: "Une surdité apparue après des années de bruit d’atelier", categoryId: "mp" },
                { id: "tms", label: "Une atteinte de l’épaule après des mois de gestes répétés", categoryId: "mp" },
                { id: "respiratoire", label: "Une atteinte respiratoire après une exposition prolongée à des poussières", categoryId: "mp" },
                { id: "peau", label: "Une atteinte de la peau après un contact répété avec un produit", categoryId: "mp" },
              ],
              explanation:
                "L’accident se rattache à un fait daté et soudain. La maladie professionnelle se rattache à une exposition qui dure, et elle suit une procédure de reconnaissance.",
            },
          },
          {
            title: "Jeu : qui fait quoi dans la procédure",
            type: "matching",
            instructions: "Identifier le rôle exact de chaque acteur de la procédure.",
            payload: {
              prompt: "Relie chaque acteur à ce qu’il fait, et à lui seul.",
              pairs: [
                { id: "victime", left: "La victime", right: "Informe son employeur et fait constater la lésion" },
                { id: "medecin", left: "Le médecin", right: "Établit le certificat médical initial" },
                { id: "employeur", left: "L’employeur", right: "Déclare à l’assurance maladie et remet la feuille d’accident" },
                { id: "caisse", left: "L’organisme d’assurance maladie", right: "Instruit le dossier puis décide de la reconnaissance" },
              ],
              explanation:
                "Chaque acteur a un rôle qui n’est pas celui des autres. La victime ne déclare pas à la caisse, et l’employeur ne décide pas de la reconnaissance.",
            },
          },
          {
            title: "Jeu : classer les étapes de la procédure",
            type: "sorting",
            instructions: "Classer chaque étape selon le moment de la procédure où elle intervient.",
            payload: {
              prompt: "Classe chaque étape : juste après l’accident, pendant la déclaration, ou après le dépôt du dossier.",
              categories: [
                { id: "apres", label: "Tout de suite après l’accident" },
                { id: "declaration", label: "Pendant la déclaration" },
                { id: "instruction", label: "Après le dépôt du dossier" },
              ],
              items: [
                { id: "informer", label: "La victime informe son employeur", categoryId: "apres" },
                { id: "medecin", label: "La victime consulte un médecin qui constate la lésion", categoryId: "apres" },
                { id: "cmi", label: "Le médecin établit le certificat médical initial", categoryId: "declaration" },
                { id: "declarer", label: "L’employeur déclare l’accident à l’assurance maladie", categoryId: "declaration" },
                { id: "feuille", label: "L’employeur remet la feuille d’accident à la victime", categoryId: "declaration" },
                { id: "instruire", label: "L’assurance maladie instruit le dossier", categoryId: "instruction" },
                { id: "decider", label: "L’assurance maladie décide du caractère professionnel", categoryId: "instruction" },
              ],
              explanation:
                "L’ordre compte : sans information à l’employeur ni constat médical, il n’y a rien à déclarer, et sans déclaration, rien à instruire.",
            },
          },
          {
            title: "Défi 03 : le document du médecin",
            type: "qcm",
            instructions: "Identifier le document établi par le médecin.",
            payload: {
              question: "Quel document le médecin établit-il après avoir constaté les lésions ?",
              choices: [
                { id: "cmi", label: "Le certificat médical initial" },
                { id: "feuille", label: "La feuille d’accident" },
                { id: "declaration", label: "La déclaration d’accident du travail" },
              ],
              correctChoiceIds: ["cmi"],
              explanation:
                "Le certificat médical initial décrit les lésions constatées : c’est la pièce médicale du dossier. La feuille d’accident et la déclaration viennent de l’employeur.",
            },
          },
          {
            title: "Défi 04 : à quoi sert la feuille d’accident",
            type: "qcm",
            instructions: "Expliquer l’utilité de la feuille d’accident pour la victime.",
            payload: {
              question: "À quoi sert la feuille d’accident remise par l’employeur ?",
              choices: [
                { id: "frais", label: "À être soigné sans avancer les frais de santé" },
                { id: "salaire", label: "À recevoir son salaire pendant l’arrêt" },
                { id: "preuve", label: "À prouver que l’employeur est responsable" },
              ],
              correctChoiceIds: ["frais"],
              explanation:
                "La feuille d’accident donne accès aux soins sans avance de frais. Le revenu pendant l’arrêt relève des prestations en espèces, vues dans la séance suivante.",
            },
          },
          {
            title: "Vrai ou faux : déclarer, c’est être reconnu",
            type: "true_false",
            instructions: "Expliquer la différence entre la déclaration et la reconnaissance.",
            payload: {
              statement: "Une fois l’accident déclaré, son caractère professionnel est automatiquement reconnu.",
              correctAnswer: false,
              explanation:
                "Faux : la déclaration transmet les informations, la reconnaissance est une décision prise après instruction du dossier. Les deux ne se confondent pas, et l’une ne garantit pas l’autre.",
            },
          },
          {
            title: "Vrai ou faux : chaque acteur son rôle",
            type: "true_false",
            instructions: "Identifier qui décide du caractère professionnel d’une atteinte.",
            payload: {
              statement: "C’est l’employeur qui décide si l’accident est reconnu comme accident du travail.",
              correctAnswer: false,
              explanation: "Faux : l’employeur déclare, il ne décide pas. C’est l’organisme d’assurance maladie qui instruit le dossier puis décide du caractère professionnel.",
            },
          },
          {
            title: "Vrai ou faux : le certificat médical initial",
            type: "true_false",
            instructions: "Définir le rôle du certificat médical initial.",
            payload: {
              statement: "Le certificat médical initial est établi par le médecin et décrit les lésions constatées.",
              correctAnswer: true,
              explanation: "Vrai : c’est la pièce médicale du dossier. La feuille d’accident et la déclaration, elles, viennent de l’employeur.",
            },
          },
          {
            title: "Défi 05 : où vérifier un délai",
            type: "qcm",
            instructions: "Identifier la source officielle où se vérifie le délai exact d’une démarche.",
            payload: {
              question: "Tu dois connaître le délai exact pour une démarche de déclaration. Où le vérifies-tu ?",
              choices: [
                { id: "officiel", label: "Sur un site officiel à jour, comme ameli.fr ou service-public.fr" },
                { id: "memoire", label: "De mémoire, le chiffre appris l’an dernier" },
                { id: "forum", label: "Sur un forum, où quelqu’un a déjà posé la question" },
              ],
              correctChoiceIds: ["officiel"],
              explanation:
                "Les délais changent avec la réglementation. Le réflexe professionnel n’est pas de retenir un chiffre, mais de savoir où le vérifier, et de le faire avant d’agir.",
            },
          },
          {
            title: "Jeu : le lexique de la déclaration",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque mot à sa définition.",
              pairs: [
                { id: "at", left: "Accident du travail", right: "Accident survenu par le fait ou à l’occasion du travail" },
                { id: "mp", left: "Maladie professionnelle", right: "Maladie liée à une exposition professionnelle, reconnue selon une procédure" },
                { id: "declaration", left: "Déclaration", right: "Démarche qui transmet les informations et les documents nécessaires" },
                { id: "delai", left: "Délai", right: "Temps imparti pour accomplir une démarche" },
                { id: "reconnaissance", left: "Reconnaissance", right: "Décision qui attribue ou non le caractère professionnel" },
              ],
              explanation:
                "Ces cinq mots sont ceux attendus à l’épreuve. Employer « reconnaissance » à la place de « déclaration » change complètement le sens d’une réponse.",
            },
          },
        ],
      },
      {
        title: "Responsabilités et réparation",
        description: "Distinguer ce qui répare un dommage de ce qui sanctionne une faute, et repérer ce que perçoit la victime.",
        activities: [
          {
            title: "À retenir : réparer, sanctionner, indemniser",
            type: "content",
            instructions: "Définir les deux responsabilités et les trois formes d’indemnisation.",
            payload: {
              body: `Après l’accident à l’atelier ${context.place}, l’équipe confond trois choses différentes : la sanction d’un comportement interdit, la réparation du dommage, et la prise en charge des soins. Ce sont pourtant trois plans distincts.\n\nLa responsabilité civile vise la réparation d’un dommage causé. Sa question est : qui doit réparer, et combien.\n\nLa responsabilité pénale sanctionne une infraction, c’est-à-dire le non-respect d’une règle pénale. Sa question est : y a-t-il eu un comportement interdit par la loi, et quelle sanction. Le Code pénal punit notamment la mise en danger d’autrui.\n\nLes deux peuvent exister en même temps pour un même accident, sans se confondre : réparer un dommage n’efface pas une infraction, et être sanctionné ne dispense pas de réparer.\n\nLa faute inexcusable est un manquement grave de l’employeur à son obligation de sécurité. Elle est appréciée juridiquement, au cas par cas, et sa reconnaissance majore l’indemnisation de la victime.\n\nQuand le caractère professionnel est reconnu, la victime perçoit une indemnisation, sous trois formes à ne pas mélanger.\n\nLes prestations en nature : la prise en charge des frais de santé liés à l’accident ou à la maladie reconnus.\n\nLes prestations en espèces : un revenu de remplacement versé pendant l’arrêt de travail.\n\nLa rente d’incapacité : un versement régulier, lorsqu’une incapacité permanente est reconnue.\n\nLes taux et les plafonds évoluent : ils se vérifient sur ameli.fr ou service-public.fr.`,
            },
          },
          {
            title: "Défi 06 : réparer ou sanctionner",
            type: "qcm",
            instructions: "Comparer la responsabilité civile et la responsabilité pénale.",
            payload: {
              question: "Qu’est-ce qui distingue la responsabilité civile de la responsabilité pénale ?",
              choices: [
                { id: "bon", label: "La civile vise à réparer un dommage, la pénale à sanctionner une infraction" },
                { id: "inverse", label: "La civile sanctionne une infraction, la pénale répare un dommage" },
                { id: "meme", label: "Les deux font la même chose, avec deux noms différents" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Le point commun : les deux peuvent découler du même accident. La différence : l’une répond à la question « qui répare ? », l’autre à la question « y a-t-il eu une infraction ? ».",
            },
          },
          {
            title: "Vrai ou faux : l’une exclut l’autre",
            type: "true_false",
            instructions: "Justifier la réponse à partir de ce que vise chaque responsabilité.",
            payload: {
              statement: "Pour un même accident, l’employeur ne peut pas voir sa responsabilité civile et sa responsabilité pénale engagées en même temps.",
              correctAnswer: false,
              explanation:
                "Faux : les deux plans sont indépendants. Réparer le dommage n’efface pas l’infraction, et être sanctionné pénalement ne dispense pas de réparer.",
            },
          },
          {
            title: "Défi 07 : la faute inexcusable",
            type: "qcm",
            instructions: "Définir la faute inexcusable de l’employeur.",
            payload: {
              question: "Qu’appelle-t-on faute inexcusable de l’employeur ?",
              choices: [
                { id: "bon", label: "Un manquement grave à son obligation de sécurité, apprécié juridiquement" },
                { id: "erreur", label: "Toute erreur commise par l’employeur dans l’organisation du travail" },
                { id: "victime", label: "Une imprudence de la victime au moment de l’accident" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Il s’agit d’un manquement grave de l’employeur à son obligation de sécurité, jamais d’une simple erreur, et jamais du comportement de la victime. Sa reconnaissance majore l’indemnisation.",
            },
          },
          {
            title: "Jeu : trois formes d’indemnisation",
            type: "matching",
            instructions: "Définir chaque forme d’indemnisation.",
            payload: {
              prompt: "Relie chaque prestation à ce qu’elle couvre exactement.",
              pairs: [
                { id: "nature", left: "Prestation en nature", right: "La prise en charge des frais de santé" },
                { id: "especes", left: "Prestation en espèces", right: "Un revenu de remplacement pendant l’arrêt" },
                { id: "rente", left: "Rente d’incapacité", right: "Un versement régulier en cas d’incapacité permanente" },
              ],
              explanation:
                "Ces trois termes exacts sont attendus à l’épreuve. « En nature » couvre les soins, « en espèces » remplace le salaire, la rente répond à une incapacité qui reste.",
            },
          },
          {
            title: "Jeu : classer ce que perçoit la victime",
            type: "sorting",
            instructions: "Classer chaque élément selon la forme d’indemnisation dont il relève.",
            payload: {
              prompt: "Classe chaque élément selon la prestation qui le couvre.",
              categories: [
                { id: "nature", label: "Prestation en nature" },
                { id: "especes", label: "Prestation en espèces" },
                { id: "rente", label: "Rente d’incapacité" },
              ],
              items: [
                { id: "consultation", label: "La consultation chez le médecin après l’accident", categoryId: "nature" },
                { id: "pharmacie", label: "Les médicaments prescrits pour la lésion", categoryId: "nature" },
                { id: "kine", label: "Les séances de rééducation liées à l’accident", categoryId: "nature" },
                { id: "arret", label: "Le revenu versé pendant les jours d’arrêt", categoryId: "especes" },
                { id: "salaire", label: "Ce qui remplace le salaire non perçu", categoryId: "especes" },
                { id: "permanente", label: "Le versement régulier après une incapacité permanente reconnue", categoryId: "rente" },
                { id: "sequelle", label: "L’indemnisation d’une séquelle qui ne disparaîtra pas", categoryId: "rente" },
              ],
              explanation:
                "Les soins relèvent de la nature, le revenu de l’arrêt relève des espèces, et ce qui reste durablement relève de la rente. Trois réponses différentes à trois questions différentes.",
            },
          },
          {
            title: "Défi 08 : les soins de la victime",
            type: "qcm",
            instructions: "Identifier la prestation qui couvre les frais de santé.",
            payload: {
              question: `${context.learner} est soigné pour sa lésion et doit payer des médicaments. Quelle prestation couvre ces frais ?`,
              choices: [
                { id: "nature", label: "Les prestations en nature" },
                { id: "especes", label: "Les prestations en espèces" },
                { id: "rente", label: "La rente d’incapacité" },
              ],
              correctChoiceIds: ["nature"],
              explanation:
                "Les prestations en nature prennent en charge les frais de santé liés à l’atteinte reconnue. La feuille d’accident, vue à la séance précédente, permet d’en bénéficier sans avancer les frais.",
            },
          },
          {
            title: "Défi 09 : pendant l’arrêt de travail",
            type: "qcm",
            instructions: "Déduire la prestation versée pendant un arrêt de travail.",
            payload: {
              question: `L’arrêt de travail de ${context.learner} dure plusieurs jours, pendant lesquels il ne touche pas son salaire habituel. Que perçoit-il ?`,
              choices: [
                { id: "especes", label: "Des prestations en espèces, qui remplacent le revenu" },
                { id: "nature", label: "Des prestations en nature, qui couvrent le salaire" },
                { id: "rien", label: "Rien, tant que la reconnaissance n’est pas définitive" },
              ],
              correctChoiceIds: ["especes"],
              explanation:
                "Les prestations en espèces sont un revenu de remplacement pendant l’arrêt. Les prestations en nature, elles, ne concernent que les frais de santé.",
            },
          },
          {
            title: "Défi 10 : quand la séquelle reste",
            type: "qcm",
            instructions: "Identifier ce qui est versé en cas d’incapacité permanente.",
            payload: {
              question: "À la fin des soins, une incapacité permanente est reconnue. Qu’est-ce qui peut alors être versé ?",
              choices: [
                { id: "rente", label: "Une rente d’incapacité, versée régulièrement" },
                { id: "nature", label: "Une prestation en nature, versée une fois" },
                { id: "amende", label: "Une amende payée par l’employeur à la victime" },
              ],
              correctChoiceIds: ["rente"],
              explanation:
                "La rente d’incapacité répond à une atteinte qui ne disparaît pas. Une amende, elle, relève du plan pénal et n’est pas versée à la victime.",
            },
          },
          {
            title: "Vrai ou faux : la sanction pénale indemnise la victime",
            type: "true_false",
            instructions: "Justifier la réponse à partir de ce que vise chaque plan.",
            payload: {
              statement: "Une amende prononcée au titre de la responsabilité pénale sert à indemniser la victime.",
              correctAnswer: false,
              explanation:
                "Faux : la sanction pénale répond à une infraction, elle ne répare pas le dommage de la victime. L’indemnisation passe par les prestations et, le cas échéant, par la responsabilité civile.",
            },
          },
          {
            title: "Vrai ou faux : la faute inexcusable et l’indemnisation",
            type: "true_false",
            instructions: "Expliquer l’effet de la reconnaissance d’une faute inexcusable.",
            payload: {
              statement: "La reconnaissance d’une faute inexcusable de l’employeur majore l’indemnisation de la victime.",
              correctAnswer: true,
              explanation: "Vrai : il s’agit d’un manquement grave à l’obligation de sécurité, apprécié juridiquement au cas par cas, et sa reconnaissance augmente ce que perçoit la victime.",
            },
          },
          {
            title: "Jeu : le lexique de la séquence",
            type: "matching",
            instructions: "Définir chaque notion de la séquence.",
            payload: {
              prompt: "Le lexique de la séquence, à reconstituer.",
              pairs: [
                { id: "declaration", left: "Déclaration", right: "Démarche qui transmet les informations et les documents" },
                { id: "reconnaissance", left: "Reconnaissance", right: "Décision qui attribue ou non le caractère professionnel" },
                { id: "civile", left: "Responsabilité civile", right: "Obligation de réparer un dommage causé" },
                { id: "penale", left: "Responsabilité pénale", right: "Conséquence du non-respect d’une règle pénale" },
                { id: "inexcusable", left: "Faute inexcusable", right: "Manquement grave de l’employeur à son obligation de sécurité" },
                { id: "rente", left: "Rente d’incapacité", right: "Versement régulier en cas d’incapacité permanente" },
              ],
              explanation:
                "Ces six mots portent toute la séquence. Les employer avec leur sens exact dans une réponse rédigée est ce qui est attendu à l’épreuve.",
            },
          },
        ],
      },
    ],
  };
}
