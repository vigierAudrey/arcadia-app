import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

// Séquence PSE de terminale professionnelle — module C9 « Les risques
// psychosociaux » du programme de PSE en baccalauréat professionnel.
//
// Cette version transversale sert les classes qui n'ont pas encore de
// séquence C9 propre dans le catalogue. Elle est paramétrée par classe, comme
// pse-terminale-c8.ts. Elle n'a pas vocation à remplacer une séquence C9 déjà
// publiée pour une autre classe (l'import est additif et ne modifie jamais
// l'existant — voir prisma/content/index.ts).
//
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero-c9.md

export type TerminaleC9Context = {
  classroom: "T AERO" | "T TCI" | "T CIEL";
  /** Nom de l'atelier fil rouge, tel qu'il apparaît dans les cours. */
  place: string;
  /** Élève ou salarié du fil rouge, concerné par la situation. */
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
      { id: "reperer", left: "Repérer", right: "Examiner avec précision, puis lister" },
      { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
      { id: "proposer", left: "Proposer", right: "Suggérer une solution au regard d’un problème identifié" },
      { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
    ],
    explanation:
      "Ces cinq verbes sont ceux des consignes de la séquence, et ceux de l’épreuve. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
  },
};

export function buildPseTerminaleC9Sequence(context: TerminaleC9Context): InitialLearningSequence {
  return {
    title: "C9. Les risques psychosociaux",
    description: `Tu vas apprendre à repérer ce qui, dans l’organisation du travail, peut faire du mal à une personne, à comprendre les conséquences sur la santé et sur l’entreprise, puis à proposer des mesures qui agissent sur le travail lui-même, à partir de situations de l’atelier ${context.place}.`,
    lessons: [
      {
        title: "Reconnaître les risques psychosociaux",
        description: `Identifier les principales conséquences des risques psychosociaux sur la santé, à partir de la situation de ${context.learner}.`,
        activities: [
          verbsActivity,
          {
            title: "À retenir : stress, violence interne, violence externe",
            type: "content",
            instructions: "Identifier les principaux facteurs de risques psychosociaux et leurs conséquences sur la santé.",
            payload: {
              body: `${context.learner} cumule depuis plusieurs semaines des remarques répétées d’un responsable, des délais de plus en plus serrés, et des troubles du sommeil.\n\nUn risque psychosocial, ou RPS, est un risque pour la santé mentale et physique lié au travail et à son organisation.\n\nLe stress est un déséquilibre entre les contraintes perçues et les ressources perçues pour y répondre.\n\nLa violence interne est un harcèlement ou un conflit exacerbé au sein de l’entreprise elle-même : entre collègues, ou avec la hiérarchie.\n\nLa violence externe est une insulte, une menace ou une agression venue d’une personne extérieure à l’entreprise : un client, un usager, un livreur.\n\nLes RPS peuvent atteindre deux formes d’intégrité, qu’il faut distinguer. L’intégrité physique est le bon état du corps : le cœur, les muscles, le sommeil. L’intégrité mentale est le bon état psychique : l’humeur, le moral, la capacité à faire face.`,
            },
          },
          {
            title: "Jeu : interne ou externe",
            type: "sorting",
            instructions: "Classer chaque situation selon la forme de risque psychosocial qu’elle illustre.",
            payload: {
              prompt: "Classe chaque situation selon le facteur de RPS qu’elle illustre.",
              categories: [
                { id: "stress", label: "Facteur de stress" },
                { id: "interne", label: "Violence interne" },
                { id: "externe", label: "Violence externe" },
              ],
              items: [
                { id: "delais", label: "Des délais de plus en plus serrés", categoryId: "stress" },
                { id: "charge", label: "Une charge de travail qui augmente sans moyens supplémentaires", categoryId: "stress" },
                { id: "priorites", label: "Des priorités qui changent sans cesse", categoryId: "stress" },
                { id: "remarques", label: "Des remarques blessantes répétées d’un responsable", categoryId: "interne" },
                { id: "conflit", label: "Un conflit ouvert entre deux équipes", categoryId: "interne" },
                { id: "ecart", label: "Un collègue mis à l’écart par l’équipe", categoryId: "interne" },
                { id: "client", label: "Un client qui menace au téléphone", categoryId: "externe" },
                { id: "usager", label: "Un usager qui insulte lors d’un retard", categoryId: "externe" },
              ],
              explanation:
                "La violence interne vient de l’entreprise elle-même. La violence externe vient d’une personne qui ne fait pas partie de l’entreprise. Le stress, lui, vient d’un déséquilibre entre contraintes et ressources.",
            },
          },
          {
            title: "Jeu : le lexique des RPS",
            type: "matching",
            instructions: "Définir chaque notion de la séance.",
            payload: {
              prompt: "Relie chaque notion à sa définition exacte.",
              pairs: [
                { id: "rps", left: "Risque psychosocial", right: "Risque pour la santé mentale et physique lié au travail et à son organisation" },
                { id: "stress", left: "Stress", right: "Déséquilibre entre les contraintes perçues et les ressources perçues" },
                { id: "interne", left: "Violence interne", right: "Harcèlement ou conflit exacerbé au sein de l’entreprise" },
                { id: "externe", left: "Violence externe", right: "Insulte, menace ou agression par une personne extérieure" },
                { id: "physique", left: "Intégrité physique", right: "Bon état du corps : cœur, muscles, sommeil" },
                { id: "mentale", left: "Intégrité mentale", right: "Bon état psychique : humeur, moral, capacité à faire face" },
              ],
              explanation:
                "Ces six mots sont ceux attendus à l’épreuve. Confondre violence interne et externe change la réponse attendue sur l’acteur à solliciter.",
            },
          },
          {
            title: "Défi 01 : une insulte d’un client",
            type: "qcm",
            instructions: "Classer une insulte venue d’un client.",
            payload: {
              question: "Un client insulte un salarié au téléphone. De quelle forme de RPS s’agit-il ?",
              choices: [
                { id: "externe", label: "D’une violence externe, car le client est extérieur à l’entreprise" },
                { id: "interne", label: "D’une violence interne, car elle survient pendant le travail" },
                { id: "aucune", label: "D’aucune forme de RPS, car ce n’est qu’un client mécontent" },
              ],
              correctChoiceIds: ["externe"],
              explanation:
                "Ce qui distingue interne et externe, c’est l’origine de la personne, pas le moment où l’incident survient.",
            },
          },
          {
            title: "Défi 02 : l’épuisement professionnel",
            type: "qcm",
            instructions: "Identifier l’intégrité atteinte par l’épuisement professionnel.",
            payload: {
              question: "L’épuisement professionnel atteint principalement quelle intégrité ?",
              choices: [
                { id: "mentale", label: "L’intégrité mentale" },
                { id: "physique_seule", label: "Uniquement l’intégrité physique" },
                { id: "aucune", label: "Aucune : ce n’est pas une atteinte à la santé" },
              ],
              correctChoiceIds: ["mentale"],
              explanation:
                "L’épuisement professionnel touche d’abord l’intégrité mentale, même s’il peut aussi avoir des répercussions physiques comme des troubles du sommeil.",
            },
          },
          {
            title: "Vrai ou faux : les RPS n’ont aucun effet sur le corps",
            type: "true_false",
            instructions: "Justifier les effets physiques possibles des RPS.",
            payload: {
              statement: "Les risques psychosociaux n’ont aucun effet sur le corps, seulement sur le moral.",
              correctAnswer: false,
              explanation: "Faux : ils peuvent troubler le sommeil ou favoriser des maladies cardio-vasculaires. Les RPS touchent l’intégrité physique autant que mentale.",
            },
          },
          {
            title: "Vrai ou faux : décrire des faits sans juger",
            type: "true_false",
            instructions: "Justifier la méthode à suivre pour signaler une situation de RPS.",
            payload: {
              statement: "Pour signaler une situation de RPS, il faut d’abord décrire des faits précis et datés, sans juger la personne concernée.",
              correctAnswer: true,
              explanation: "Vrai : observer des faits précis, les décrire sans jugement, nommer la forme de RPS concernée, puis orienter vers un interlocuteur adapté.",
            },
          },
        ],
      },
      {
        title: "Facteurs et conséquences",
        description: "Repérer les principaux facteurs de risques psychosociaux et leurs conséquences sur la santé et sur l’entreprise.",
        activities: [
          {
            title: "À retenir : d’un facteur à une conséquence",
            type: "content",
            instructions: "Repérer les principaux facteurs de risques psychosociaux et leurs conséquences.",
            payload: {
              body: `À l’atelier ${context.place}, les délais raccourcissent, les techniciens ont moins leur mot à dire sur l’organisation des tâches, et l’équipe se parle moins. Peu à peu, des absences apparaissent.\n\nLes facteurs de RPS relèvent de plusieurs familles.\n\nL’intensité du travail regroupe la charge, les délais, le rythme et les horaires imposés.\n\nLes exigences émotionnelles désignent le fait de devoir gérer des émotions : clients mécontents, tensions répétées.\n\nL’autonomie est la marge de manœuvre pour organiser son propre travail : en manquer est un facteur de risque.\n\nLes rapports sociaux désignent les relations avec les collègues et la hiérarchie : soutien, reconnaissance, ou au contraire isolement.\n\nLe conflit de valeurs survient quand une personne doit faire un travail contraire à ce qu’elle estime juste.\n\nCes facteurs peuvent se cumuler dans une même situation. Ils ont des conséquences sur la santé (troubles du sommeil, anxiété, épuisement professionnel) et des conséquences sur l’entreprise, qui forment le climat social : absences en hausse, erreurs, départ de salariés expérimentés.`,
            },
          },
          {
            title: "Jeu : le lexique des facteurs",
            type: "matching",
            instructions: "Définir chaque facteur de risque psychosocial.",
            payload: {
              prompt: "Relie chaque facteur à sa définition exacte.",
              pairs: [
                { id: "intensite", left: "Intensité du travail", right: "Charge, délais, rythme et horaires imposés" },
                { id: "emotionnelles", left: "Exigences émotionnelles", right: "Devoir gérer des émotions : clients mécontents, tensions" },
                { id: "autonomie", left: "Autonomie", right: "Marge de manœuvre pour organiser son travail" },
                { id: "sociaux", left: "Rapports sociaux", right: "Relations avec les collègues et la hiérarchie" },
                { id: "valeurs", left: "Conflit de valeurs", right: "Devoir faire un travail contraire à ce qu’on estime juste" },
                { id: "climat", left: "Climat social", right: "Qualité des relations et de l’ambiance dans l’entreprise" },
              ],
              explanation:
                "Ces six notions couvrent les principales familles de facteurs de RPS reconnues par l’INRS, et le climat social qui en résulte pour l’entreprise.",
            },
          },
          {
            title: "Jeu : conséquence sur la santé ou sur l’entreprise",
            type: "sorting",
            instructions: "Classer chaque conséquence observée selon ce qu’elle touche.",
            payload: {
              prompt: "Classe chaque conséquence selon ce qu’elle touche en premier lieu.",
              categories: [
                { id: "sante", label: "Conséquence sur la santé" },
                { id: "entreprise", label: "Conséquence sur l’entreprise" },
              ],
              items: [
                { id: "sommeil", label: "Des troubles du sommeil", categoryId: "sante" },
                { id: "anxiete", label: "Une anxiété avant chaque prise de poste", categoryId: "sante" },
                { id: "epuisement", label: "Un épuisement professionnel", categoryId: "sante" },
                { id: "absences", label: "Une hausse des absences", categoryId: "entreprise" },
                { id: "erreurs", label: "Des erreurs détectées dans le travail rendu", categoryId: "entreprise" },
                { id: "departs", label: "Le départ de salariés expérimentés", categoryId: "entreprise" },
              ],
              explanation:
                "Les conséquences sur la santé touchent la personne. Les conséquences sur l’entreprise touchent le fonctionnement collectif, même si les deux sont liées.",
            },
          },
          {
            title: "Défi 03 : un facteur d’autonomie",
            type: "qcm",
            instructions: "Classer un facteur lié à l’organisation des tâches.",
            payload: {
              question: "Ne plus avoir son mot à dire sur l’ordre de ses propres tâches relève de quel facteur ?",
              choices: [
                { id: "autonomie", label: "Le manque d’autonomie" },
                { id: "emotionnelles", label: "Les exigences émotionnelles" },
                { id: "valeurs", label: "Le conflit de valeurs" },
              ],
              correctChoiceIds: ["autonomie"],
              explanation:
                "L’autonomie est la marge de manœuvre pour organiser son propre travail. La perdre est un facteur de risque reconnu.",
            },
          },
          {
            title: "Défi 04 : pourquoi les absences aggravent la situation",
            type: "qcm",
            instructions: "Déduire l’effet des absences sur le reste de l’équipe.",
            payload: {
              question: "Pourquoi une hausse des absences aggrave-t-elle souvent la situation pour le reste de l’équipe ?",
              choices: [
                { id: "charge", label: "Parce qu’elle augmente la charge des collègues présents" },
                { id: "reduit", label: "Parce qu’elle réduit les délais imposés" },
                { id: "aucun", label: "Parce qu’elle n’a aucun effet sur les autres" },
              ],
              correctChoiceIds: ["charge"],
              explanation:
                "Quand une personne s’absente, son travail est souvent redistribué : la charge augmente pour les collègues présents, ce qui peut aggraver l’exposition aux RPS.",
            },
          },
          {
            title: "Vrai ou faux : plusieurs facteurs peuvent se cumuler",
            type: "true_false",
            instructions: "Justifier qu’une même situation peut combiner plusieurs facteurs de RPS.",
            payload: {
              statement: "Plusieurs facteurs de risques psychosociaux peuvent se cumuler dans une même situation de travail.",
              correctAnswer: true,
              explanation: "Vrai : délais, manque d’autonomie et rapports sociaux dégradés peuvent par exemple se combiner et renforcer l’exposition au risque.",
            },
          },
          {
            title: "Vrai ou faux : les facteurs dépendent du caractère",
            type: "true_false",
            instructions: "Justifier l’origine réelle des facteurs de RPS.",
            payload: {
              statement: "Les facteurs de risques psychosociaux dépendent surtout du caractère des salariés concernés.",
              correctAnswer: false,
              explanation: "Faux : ils sont liés à l’organisation du travail et aux relations de travail, pas à un trait de personnalité.",
            },
          },
        ],
      },
      {
        title: "Prévenir les risques psychosociaux",
        description: "Proposer des mesures de prévention qui agissent sur l’organisation du travail.",
        activities: [
          {
            title: "À retenir : agir d’abord sur l’organisation",
            type: "content",
            instructions: "Proposer des mesures de prévention limitant les risques psychosociaux.",
            payload: {
              body: `À l’atelier ${context.place}, les facteurs repérés viennent surtout de l’organisation : des délais raccourcis et des priorités qui changent sans cesse.\n\nLa prévention collective est une mesure qui agit sur l’organisation du travail, pour tout le collectif : un planning plus réaliste, un point d’équipe régulier sur les priorités, des pauses garanties.\n\nLa formation apporte des compétences : savoir repérer un signe de RPS, savoir réagir, savoir gérer une tension.\n\nL’information diffuse des repères : les risques existants, les interlocuteurs à solliciter, les procédures à suivre, par exemple en cas de harcèlement.\n\nL’accompagnement est le soutien apporté aux personnes déjà touchées : un entretien de retour après un arrêt, une orientation vers le médecin du travail, l’écoute par une personne référente.\n\nUn principe simple guide le choix : une mesure doit toujours être reliée au facteur qu’elle cherche à corriger, et agir en priorité sur l’organisation plutôt que sur la seule personne. L’employeur a l’obligation de protéger la santé physique et mentale des salariés (Code du travail, article L. 4121-1).`,
            },
          },
          {
            title: "Jeu : le lexique de la prévention",
            type: "matching",
            instructions: "Définir chaque type de mesure de prévention des RPS.",
            payload: {
              prompt: "Relie chaque type de mesure à sa définition exacte.",
              pairs: [
                { id: "collective", left: "Prévention collective", right: "Mesure qui agit sur l’organisation du travail pour tout le collectif" },
                { id: "formation", left: "Formation", right: "Apport de compétences : repérer, alerter, gérer une tension" },
                { id: "information", left: "Information", right: "Diffusion de repères : risques, interlocuteurs, procédures" },
                { id: "accompagnement", left: "Accompagnement", right: "Soutien apporté aux personnes déjà touchées" },
              ],
              explanation:
                "Ces quatre leviers se complètent. La prévention collective agit sur la cause ; l’accompagnement soutient une personne déjà touchée, sans supprimer la cause.",
            },
          },
          {
            title: "Jeu : quel levier pour quelle mesure",
            type: "sorting",
            instructions: "Classer chaque mesure selon le levier de prévention qu’elle illustre.",
            payload: {
              prompt: "Classe chaque mesure selon le levier de prévention auquel elle appartient.",
              categories: [
                { id: "organisation", label: "Agir sur l’organisation" },
                { id: "formation_information", label: "Former et informer" },
                { id: "accompagner", label: "Accompagner" },
              ],
              items: [
                { id: "planning", label: "Un planning réaliste des tâches", categoryId: "organisation" },
                { id: "point", label: "Un point d’équipe chaque matin sur les priorités", categoryId: "organisation" },
                { id: "pauses", label: "Des pauses garanties dans l’organisation", categoryId: "organisation" },
                { id: "formation_dialogue", label: "La formation des responsables au dialogue", categoryId: "formation_information" },
                { id: "affichage", label: "L’affichage des interlocuteurs à solliciter", categoryId: "formation_information" },
                { id: "entretien", label: "Un entretien de retour après un arrêt", categoryId: "accompagner" },
                { id: "ecoute", label: "L’écoute par une personne référente", categoryId: "accompagner" },
              ],
              explanation:
                "Agir sur l’organisation traite la cause pour tout le collectif. Former et informer donnent des repères. Accompagner soutient une personne déjà touchée.",
            },
          },
          {
            title: "Défi 05 : un atelier de relaxation ne suffit pas",
            type: "qcm",
            instructions: "Expliquer pourquoi une mesure individuelle seule ne suffit pas.",
            payload: {
              question: "Pourquoi un atelier de relaxation proposé aux salariés débordés ne suffit-il pas à prévenir les RPS ?",
              choices: [
                { id: "bon", label: "Parce qu’il aide la personne, mais laisse le facteur organisationnel en place" },
                { id: "inutile", label: "Parce qu’il est totalement inutile et sans aucun effet" },
                { id: "interdit", label: "Parce que la loi interdit ce type d’atelier" },
              ],
              correctChoiceIds: ["bon"],
              explanation:
                "Une mesure centrée sur la seule personne ne traite pas la cause. La prévention efficace agit d’abord sur l’organisation, qui produit le facteur de risque.",
            },
          },
          {
            title: "Défi 06 : l’obligation de l’employeur",
            type: "qcm",
            instructions: "Identifier le texte qui fonde l’obligation de prévention de l’employeur.",
            payload: {
              question: "Quel texte impose à l’employeur de protéger la santé physique et mentale des salariés ?",
              choices: [
                { id: "l4121", label: "L’article L. 4121-1 du Code du travail" },
                { id: "autre", label: "Un simple règlement intérieur, sans valeur légale" },
                { id: "aucun", label: "Aucun texte : c’est une démarche seulement volontaire" },
              ],
              correctChoiceIds: ["l4121"],
              explanation:
                "L’article L. 4121-1 du Code du travail impose à l’employeur de prendre les mesures nécessaires pour protéger la santé physique et mentale des travailleurs.",
            },
          },
          {
            title: "Vrai ou faux : relier la mesure au facteur",
            type: "true_false",
            instructions: "Justifier la condition de validité d’une mesure de prévention.",
            payload: {
              statement: "Une mesure de prévention des RPS doit être reliée au facteur de risque qu’elle cherche à corriger.",
              correctAnswer: true,
              explanation: "Vrai : c’est ce qui justifie la mesure. Une mesure sans lien avec le facteur repéré ne traite pas la cause réelle.",
            },
          },
          {
            title: "Vrai ou faux : la prévention collective, c’est de la formation",
            type: "true_false",
            instructions: "Distinguer la prévention collective de la formation.",
            payload: {
              statement: "Former les responsables au dialogue est une mesure de prévention collective agissant sur l’organisation du travail.",
              correctAnswer: false,
              explanation: "Faux : c’est une mesure de formation. La prévention collective agit directement sur l’organisation (planning, charge, priorités), pas seulement sur les compétences des personnes.",
            },
          },
        ],
      },
    ],
  };
}
