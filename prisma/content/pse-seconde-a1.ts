import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

type Context = {
  classroom: "2 AERO" | "2 CIEL";
  place: string;
  mentor: string;
  learner: string;
  peer: string;
  painActivity: string;
  collectiveMeasure: string;
};

const verbsActivity: InitialActivity = {
  title: "Décodage des consignes : les verbes de la séquence",
  type: "matching",
  instructions:
    "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
  payload: {
    prompt: "Relie chaque verbe de consigne à ce que tu dois produire.",
    pairs: [
      { id: "reperer", left: "Repérer", right: "Trouver une information dans un document" },
      { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
      { id: "expliquer", left: "Expliquer", right: "Rendre clair avec un argument" },
      { id: "presenter", left: "Présenter", right: "Faire connaître de façon organisée" },
      { id: "classer", left: "Classer", right: "Ranger dans la bonne catégorie" },
      { id: "justifier", left: "Justifier", right: "Donner des arguments fondés sur les faits" },
    ],
    explanation:
      "Lire le verbe de consigne évite de répondre à côté : une consigne demande une action précise.",
  },
};

export function buildPseSecondeA1Sequence(context: Context): InitialLearningSequence {
  return {
    title: "A1. Mon capital santé et le système de santé qui me protège",
    description: `Tu vas comprendre ce qui fait varier ta santé au quotidien, et comment le système de santé français te protège, à partir de situations chez ${context.place}.`,
    lessons: [
      {
        title: "Mon capital santé et ses facteurs",
        description: `Repérer les facteurs internes et externes qui font varier ton capital santé, à partir d'une situation chez ${context.place}.`,
        activities: [
          verbsActivity,
          {
            title: "À retenir : capital santé, facteurs internes et externes",
            type: "content",
            instructions: "Repérer les facteurs qui font varier le capital santé d'une personne.",
            payload: {
              body: `${context.learner} ressent ${context.painActivity}, et se demande si c'est grave.\n\nLa santé est un état de bien-être physique, mental et social complet, et ne se réduit pas à l'absence de maladie (définition de l'OMS). Le capital santé est l'ensemble des ressources physiques, mentales et sociales dont dispose une personne à un moment donné : il n'est pas fixe, il évolue tout au long de la vie, en bien comme en mal.\n\nUn facteur interne est lié à la personne elle-même : son âge, son hérédité, son sommeil, son alimentation, son activité physique, ses habitudes de vie.\n\nUn facteur externe est lié à l'environnement de la personne : le climat, le bruit, la qualité de l'air, les conditions de travail, le soutien de l'entourage ou de l'équipe.\n\nUn même facteur externe peut protéger le capital santé (un bon sommeil, une équipe solidaire) ou le fragiliser (un poste bruyant, un rythme de sommeil perturbé). Certains facteurs sont modifiables par la personne, d'autres non : on ne peut pas changer son hérédité, mais on peut souvent agir sur son sommeil ou ses habitudes.`,
            },
          },
          {
            title: "Défi 01 : interne ou externe",
            type: "qcm",
            instructions: "Classer un facteur selon qu'il dépend de la personne ou de son environnement.",
            payload: {
              question: `${context.peer} dort 6 heures par nuit depuis plusieurs semaines à cause des horaires chez ${context.place}. De quel type de facteur s'agit-il ?`,
              choices: [
                { id: "externe", label: "Un facteur externe, modifiable" },
                { id: "interne_fixe", label: "Un facteur interne, non modifiable" },
                { id: "externe_fixe", label: "Un facteur externe, non modifiable" },
                { id: "aucun", label: "Ce n'est pas un facteur de santé" },
              ],
              correctChoiceIds: ["externe"],
              explanation:
                "Le rythme de sommeil dépend de l'organisation (horaires, environnement) : c'est un facteur externe, et il peut être amélioré.",
            },
          },
          {
            title: "Défi 02 : ce que le capital santé n'est pas",
            type: "qcm",
            instructions: "Identifier ce qui caractérise le capital santé.",
            payload: {
              question: "Laquelle de ces affirmations décrit correctement le capital santé ?",
              choices: [
                { id: "evolue", label: "C'est un ensemble de ressources qui évolue tout au long de la vie" },
                { id: "fixe", label: "C'est une quantité fixée à la naissance et qui ne change jamais" },
                { id: "argent", label: "C'est uniquement l'argent disponible pour se soigner" },
                { id: "medecin", label: "C'est seulement ce que dit le médecin lors d'une visite" },
              ],
              correctChoiceIds: ["evolue"],
              explanation:
                "Le capital santé regroupe des ressources physiques, mentales et sociales, et il évolue selon les facteurs internes et externes rencontrés.",
            },
          },
          {
            title: "Jeu : classer les facteurs de la situation",
            type: "sorting",
            instructions: `Classer chaque élément observé chez ${context.place} selon le type de facteur qu'il représente.`,
            payload: {
              prompt: "Facteur interne, facteur externe protecteur, ou facteur externe qui fragilise ?",
              categories: [
                { id: "interne", label: "Facteur interne" },
                { id: "externe_protege", label: "Facteur externe protecteur" },
                { id: "externe_fragilise", label: "Facteur externe qui fragilise" },
              ],
              items: [
                { id: "age", label: "L'âge de la personne", categoryId: "interne" },
                { id: "heredite", label: "Les antécédents familiaux", categoryId: "interne" },
                { id: "sommeil_court", label: "Un rythme de sommeil perturbé par les horaires", categoryId: "externe_fragilise" },
                { id: "bruit", label: "Un poste de travail bruyant", categoryId: "externe_fragilise" },
                { id: "soutien", label: `Une équipe qui aide ${context.learner} quand c'est difficile`, categoryId: "externe_protege" },
                { id: "conseil", label: `Un conseil donné par ${context.mentor} pour mieux récupérer`, categoryId: "externe_protege" },
              ],
              explanation:
                "Les facteurs internes dépendent de la personne. Les facteurs externes dépendent de l'environnement, et peuvent protéger ou fragiliser selon les cas.",
            },
          },
          {
            title: "Vrai ou faux : le capital santé ne change jamais",
            type: "true_false",
            instructions: "Expliquer pourquoi le capital santé n'est pas une quantité fixe.",
            payload: {
              statement: "Le capital santé est fixé une fois pour toutes à la naissance.",
              correctAnswer: false,
              explanation:
                "Faux : il évolue tout au long de la vie, sous l'effet des facteurs internes et externes rencontrés.",
            },
          },
          {
            title: "Vrai ou faux : un facteur externe peut protéger",
            type: "true_false",
            instructions: "Identifier les deux effets possibles d'un facteur externe.",
            payload: {
              statement: "Un facteur externe peut aussi bien protéger le capital santé que le fragiliser.",
              correctAnswer: true,
              explanation:
                "Vrai : un bon sommeil ou une équipe solidaire protègent, un poste bruyant ou un rythme perturbé fragilisent.",
            },
          },
          {
            title: "Jeu : relier les mots clés de la séance",
            type: "matching",
            instructions: "Définir chaque notion en la reliant à son sens exact.",
            payload: {
              prompt: "Reconstitue le lexique du capital santé.",
              pairs: [
                { id: "sante", left: "Santé", right: "Bien-être physique, mental et social complet" },
                { id: "capital", left: "Capital santé", right: "Ensemble de ressources qui évolue tout au long de la vie" },
                { id: "interne", left: "Facteur interne", right: "Lié à la personne elle-même" },
                { id: "externe", left: "Facteur externe", right: "Lié à l'environnement de la personne" },
              ],
              explanation:
                "Ces notions sont celles attendues par le module A1 du programme de PSE en seconde professionnelle.",
            },
          },
        ],
      },
      {
        title: "Identifier les enjeux d'un plan santé",
        description: `Identifier les enjeux d'un plan santé affiché chez ${context.place}, et différencier prévention collective et prévention individuelle.`,
        activities: [
          {
            title: "À retenir : plan santé et prévention",
            type: "content",
            instructions: "Identifier les enjeux poursuivis par un plan santé.",
            payload: {
              body: `${context.mentor} affiche une campagne de prévention chez ${context.place}. ${context.learner} se demande si ça sert vraiment à quelque chose.\n\nUn plan santé est un programme mis en place par les pouvoirs publics pour atteindre des objectifs de santé fixés pour toute une population, sur une durée donnée. Il s'appuie sur des données chiffrées et cible des problèmes de santé repérés à grande échelle.\n\nLa prévention collective est une mesure qui agit sur l'environnement ou sur un groupe entier, indépendamment du comportement de chaque personne : ${context.collectiveMeasure} en est un exemple.\n\nLa prévention individuelle dépend du comportement de chaque personne : suivre une fiche de conseils, changer une habitude, demander un avis médical.\n\nUn plan santé vise deux enjeux principaux : éviter l'apparition de maladies évitables, et réduire les écarts de santé entre les différents groupes de la population.`,
            },
          },
          {
            title: "Défi 03 : pourquoi toute la population",
            type: "qcm",
            instructions: "Expliquer pourquoi un plan santé vise toute une population.",
            payload: {
              question: "Pourquoi un plan santé cible-t-il toute une population, et pas seulement les personnes déjà malades ?",
              choices: [
                { id: "ecarts", label: "Pour éviter l'apparition de maladies évitables et réduire les écarts de santé" },
                { id: "argent", label: "Uniquement pour réduire les dépenses de l'État" },
                { id: "obligation", label: "Parce que la loi oblige chaque personne à suivre un plan" },
                { id: "hasard", label: "Sans objectif précis, pour occuper le personnel de santé" },
              ],
              correctChoiceIds: ["ecarts"],
              explanation:
                "Un plan santé poursuit des objectifs de prévention et de réduction des écarts de santé, fixés à l'échelle d'une population entière.",
            },
          },
          {
            title: "Défi 04 : collective ou individuelle",
            type: "qcm",
            instructions: "Classer une mesure de prévention selon son type.",
            payload: {
              question: `${context.mentor} fait installer ${context.collectiveMeasure} chez ${context.place}. De quel type de prévention s'agit-il ?`,
              choices: [
                { id: "collective", label: "Une prévention collective, car elle protège tout le monde sans dépendre d'un choix individuel" },
                { id: "individuelle", label: "Une prévention individuelle, car chacun doit l'activer soi-même" },
                { id: "aucune", label: "Ce n'est pas une mesure de prévention" },
                { id: "soin", label: "C'est un soin, pas une prévention" },
              ],
              correctChoiceIds: ["collective"],
              explanation:
                "Une mesure qui agit sur l'environnement de travail, pour tout le collectif, est une prévention collective.",
            },
          },
          {
            title: "Jeu : trier les mesures de la campagne",
            type: "sorting",
            instructions: "Classer chaque mesure selon le type de prévention qu'elle illustre.",
            payload: {
              prompt: "Prévention collective, ou prévention individuelle ?",
              categories: [
                { id: "collective", label: "Prévention collective" },
                { id: "individuelle", label: "Prévention individuelle" },
              ],
              items: [
                { id: "mesure_1", label: context.collectiveMeasure, categoryId: "collective" },
                { id: "mesure_2", label: "Une fiche de conseils pour organiser ses pauses", categoryId: "individuelle" },
                { id: "mesure_3", label: "Une campagne nationale d'affichage dans toute l'entreprise", categoryId: "collective" },
                { id: "mesure_4", label: "Le choix personnel de suivre ou non un conseil de prévention", categoryId: "individuelle" },
              ],
              explanation:
                "La prévention collective agit sur l'environnement pour tout le groupe. La prévention individuelle dépend du comportement de chaque personne.",
            },
          },
          {
            title: "Vrai ou faux : un plan santé ne concerne que les malades",
            type: "true_false",
            instructions: "Préciser qui est concerné par un plan santé.",
            payload: {
              statement: "Un plan santé ne concerne que les personnes déjà atteintes par une maladie.",
              correctAnswer: false,
              explanation:
                "Faux : il vise toute une population, pour éviter l'apparition de maladies évitables, pas seulement les personnes déjà malades.",
            },
          },
          {
            title: "Vrai ou faux : la prévention collective dépend du choix de chacun",
            type: "true_false",
            instructions: "Comparer la prévention collective et la prévention individuelle.",
            payload: {
              statement: "La prévention collective dépend du comportement choisi par chaque personne.",
              correctAnswer: false,
              explanation:
                "Faux : c'est la prévention individuelle qui dépend du comportement de chaque personne. La prévention collective agit sur l'environnement, pour tout le groupe.",
            },
          },
          {
            title: "Jeu : relier les mots clés de la séance",
            type: "matching",
            instructions: "Définir chaque notion en la reliant à son sens exact.",
            payload: {
              prompt: "Reconstitue le lexique des plans santé.",
              pairs: [
                { id: "plan", left: "Plan santé", right: "Programme public fixant des objectifs pour une population" },
                { id: "collective", left: "Prévention collective", right: "Agit sur l'environnement, pour tout le groupe" },
                { id: "individuelle", left: "Prévention individuelle", right: "Dépend du comportement de chaque personne" },
              ],
              explanation:
                "Ces notions permettent d'analyser une campagne de prévention vue dans un document professionnel.",
            },
          },
        ],
      },
      {
        title: "Expliquer le principe de solidarité de la sécurité sociale",
        description: "Expliquer le principe de solidarité nationale qui finance l'Assurance maladie, à partir d'une situation d'hospitalisation.",
        activities: [
          {
            title: "À retenir : solidarité nationale et Assurance maladie",
            type: "content",
            instructions: "Expliquer le principe de solidarité nationale de la sécurité sociale.",
            payload: {
              body: `${context.learner} est hospitalisé(e) trois jours pour une appendicite. Le coût réel des soins est élevé, mais le reste à charge est faible. ${context.peer}, qui n'a eu aucun soin cette année, se demande pourquoi elle cotise quand même.\n\nLa Sécurité sociale a été créée en 1945, sur un principe de solidarité nationale : chacun cotise selon ses moyens, et reçoit selon ses besoins. Ce n'est pas une assurance individuelle où l'on ne récupère que ce que l'on a versé.\n\nL'Assurance maladie, une des branches de la Sécurité sociale, est financée notamment par les cotisations sociales et la contribution sociale généralisée (CSG), prélevées sur les revenus de l'ensemble de la population active.\n\nEn hospitalisation, les frais sont pris en charge à 80 % dans le cas général : le patient paie un reste à charge, qui correspond à la part non remboursée par l'Assurance maladie.\n\nLe principe de solidarité signifie que la personne qui cotise sans être malade cette année-là finance la prise en charge de celles et ceux qui ont besoin de soins : elle sera à son tour protégée si elle en a besoin plus tard.`,
            },
          },
          {
            title: "Défi 05 : qui cotise, qui est remboursé",
            type: "qcm",
            instructions: "Identifier le principe qui explique pourquoi chacun cotise.",
            payload: {
              question: `${context.peer} cotise à l'Assurance maladie sans avoir eu de soin cette année. Pourquoi cotise-t-elle quand même ?`,
              choices: [
                { id: "solidarite", label: "Parce que la cotisation dépend du salaire, pas des soins reçus : c'est le principe de solidarité" },
                { id: "erreur", label: "C'est une erreur, elle devrait être remboursée de sa cotisation" },
                { id: "epargne", label: "Parce que sa cotisation est mise de côté pour elle uniquement" },
                { id: "obligation_sans_but", label: "Par simple obligation légale, sans aucune autre raison" },
              ],
              correctChoiceIds: ["solidarite"],
              explanation:
                "La cotisation est calculée selon les moyens de chacun, pas selon les soins reçus. C'est le principe de solidarité nationale.",
            },
          },
          {
            title: "Défi 06 : le reste à charge",
            type: "qcm",
            instructions: "Expliquer ce que représente le reste à charge après une hospitalisation.",
            payload: {
              question: `${context.learner} est hospitalisé(e) et les frais sont pris en charge à 80 % par l'Assurance maladie. Que représente le reste à charge ?`,
              choices: [
                { id: "part_non_remboursee", label: "La part des frais non remboursée par l'Assurance maladie" },
                { id: "cotisation", label: "Le montant de sa cotisation mensuelle" },
                { id: "amende", label: "Une pénalité pour avoir été malade" },
                { id: "total", label: "La totalité des frais d'hospitalisation" },
              ],
              correctChoiceIds: ["part_non_remboursee"],
              explanation:
                "Le reste à charge est la part des frais que l'Assurance maladie ne couvre pas, après son remboursement.",
            },
          },
          {
            title: "Jeu : classer les affirmations sur la solidarité",
            type: "sorting",
            instructions: "Classer chaque affirmation selon qu'elle décrit correctement ou non le principe de solidarité.",
            payload: {
              prompt: "Vrai principe, ou idée fausse à corriger ?",
              categories: [
                { id: "vrai", label: "Décrit le principe de solidarité" },
                { id: "faux", label: "Idée fausse à corriger" },
              ],
              items: [
                { id: "a", label: "Chacun cotise selon ses moyens", categoryId: "vrai" },
                { id: "b", label: "Chacun reçoit selon ses besoins", categoryId: "vrai" },
                { id: "c", label: "On ne récupère que ce que l'on a versé, comme une épargne", categoryId: "faux" },
                { id: "d", label: "Une personne non malade ne devrait pas cotiser", categoryId: "faux" },
              ],
              explanation:
                "La solidarité nationale repose sur la cotisation selon les moyens et le remboursement selon les besoins, pas sur une logique d'épargne individuelle.",
            },
          },
          {
            title: "Vrai ou faux : la Sécurité sociale date de 1945",
            type: "true_false",
            instructions: "Citer l'année de création de la Sécurité sociale.",
            payload: {
              statement: "La Sécurité sociale a été créée en 1945, sur un principe de solidarité nationale.",
              correctAnswer: true,
              explanation: "Vrai : ce principe veut que chacun cotise selon ses moyens et reçoive selon ses besoins.",
            },
          },
          {
            title: "Vrai ou faux : l'hospitalisation est remboursée à 100 %",
            type: "true_false",
            instructions: "Préciser le taux de prise en charge d'une hospitalisation dans le cas général.",
            payload: {
              statement: "Dans le cas général, l'hospitalisation est prise en charge à 100 % par l'Assurance maladie.",
              correctAnswer: false,
              explanation:
                "Faux : elle est prise en charge à 80 % dans le cas général, et un reste à charge demeure pour le patient.",
            },
          },
          {
            title: "Jeu : relier les mots clés de la séance",
            type: "matching",
            instructions: "Définir chaque notion en la reliant à son sens exact.",
            payload: {
              prompt: "Reconstitue le lexique de la solidarité nationale.",
              pairs: [
                { id: "solidarite", left: "Solidarité nationale", right: "Chacun cotise selon ses moyens, reçoit selon ses besoins" },
                { id: "assurance", left: "Assurance maladie", right: "Branche de la Sécurité sociale financée par les cotisations et la CSG" },
                { id: "cotisation", left: "Cotisation", right: "Somme prélevée sur les revenus pour financer la protection sociale" },
                { id: "reste", left: "Reste à charge", right: "Part des frais non remboursée par l'Assurance maladie" },
              ],
              explanation:
                "Ces quatre notions sont celles attendues par le module A1 pour expliquer le principe de solidarité nationale.",
            },
          },
        ],
      },
      {
        title: "Le parcours de soins coordonnés",
        description: "Présenter le principe et l'intérêt du parcours de soins coordonnés : médecin traitant, carte Vitale et dossier médical partagé.",
        activities: [
          {
            title: "À retenir : médecin traitant et parcours de soins coordonnés",
            type: "content",
            instructions: "Décrire le principe du parcours de soins coordonnés.",
            payload: {
              body: `${context.peer}, qui vient d'avoir 16 ans, reçoit un courrier de l'Assurance maladie l'invitant à déclarer un médecin traitant. ${context.learner}, de son côté, a consulté directement un spécialiste et a été moins bien remboursé(e).\n\nLe médecin traitant est le médecin que chaque personne choisit et déclare à l'Assurance maladie, dès 16 ans. Il oriente la personne vers les bons interlocuteurs et suit son dossier médical dans la durée.\n\nLe parcours de soins coordonnés consiste à consulter d'abord son médecin traitant, qui oriente si besoin vers un spécialiste. Une consultation suivie dans ce parcours est mieux remboursée (par exemple 19 € remboursés sur une consultation à 30 €) qu'une consultation hors parcours, sans passer par le médecin traitant (par exemple 8,40 € remboursés sur la même consultation, soit 10,60 € d'écart). Certains spécialistes restent accessibles en accès direct, sans passer par le médecin traitant : gynécologue, ophtalmologue, stomatologue, et psychiatre pour les personnes de 16 à 25 ans.\n\nLa carte Vitale est la carte qui transmet les informations nécessaires au remboursement des soins. Le dossier médical partagé (DMP), accessible dans Mon espace santé, est un dossier de santé numérique qui évite de répéter des examens déjà réalisés et aide les professionnels de santé à mieux coordonner les soins.`,
            },
          },
          {
            title: "Défi 07 : pourquoi le remboursement est plus faible",
            type: "qcm",
            instructions: "Justifier pourquoi une consultation hors parcours est moins bien remboursée.",
            payload: {
              question: `${context.learner} a consulté un spécialiste sans passer par un médecin traitant déclaré, et a été moins bien remboursé(e). Pourquoi ?`,
              choices: [
                { id: "hors_parcours", label: "Parce que la consultation s'est faite hors du parcours de soins coordonnés" },
                { id: "erreur_carte", label: "Parce que sa carte Vitale était défectueuse" },
                { id: "trop_jeune", label: "Parce qu'il/elle a moins de 16 ans" },
                { id: "specialiste_interdit", label: "Parce que ce spécialiste n'a pas le droit de recevoir de patients" },
              ],
              correctChoiceIds: ["hors_parcours"],
              explanation:
                "Consulter un spécialiste sans passer par le médecin traitant déclaré, hors des cas d'accès direct, réduit le remboursement de la consultation.",
            },
          },
          {
            title: "Défi 08 : à quoi sert le dossier médical partagé",
            type: "qcm",
            instructions: "Nommer l'intérêt principal du dossier médical partagé.",
            payload: {
              question: "Quel est l'intérêt principal du dossier médical partagé (DMP) ?",
              choices: [
                { id: "eviter_repetition", label: "Éviter de répéter un examen déjà réalisé et mieux coordonner les soins" },
                { id: "remplacer_carte", label: "Remplacer totalement la carte Vitale" },
                { id: "payer_moins", label: "Supprimer tout reste à charge automatiquement" },
                { id: "reserve_adulte", label: "N'est accessible qu'aux personnes de plus de 25 ans" },
              ],
              correctChoiceIds: ["eviter_repetition"],
              explanation:
                "Le DMP regroupe les informations de santé dans un dossier numérique, pour éviter des examens redondants et mieux coordonner le suivi.",
            },
          },
          {
            title: "Jeu : dans le parcours, ou hors du parcours",
            type: "sorting",
            instructions: "Classer chaque situation selon qu'elle respecte ou non le parcours de soins coordonnés.",
            payload: {
              prompt: "Cette consultation respecte-t-elle le parcours de soins coordonnés ?",
              categories: [
                { id: "dans", label: "Dans le parcours de soins coordonnés" },
                { id: "hors", label: "Hors du parcours de soins coordonnés" },
              ],
              items: [
                { id: "a", label: "Consulter d'abord son médecin traitant, qui oriente vers un spécialiste", categoryId: "dans" },
                { id: "b", label: "Consulter directement un spécialiste, sans passer par le médecin traitant, hors accès direct", categoryId: "hors" },
                { id: "c", label: "Consulter un ophtalmologue directement, en accès direct autorisé", categoryId: "dans" },
                { id: "d", label: "Changer de médecin traitant sans le déclarer à l'Assurance maladie", categoryId: "hors" },
              ],
              explanation:
                "Le parcours de soins coordonnés passe par le médecin traitant déclaré, sauf pour les spécialistes en accès direct autorisé.",
            },
          },
          {
            title: "Vrai ou faux : le médecin traitant se déclare dès 16 ans",
            type: "true_false",
            instructions: "Préciser l'âge à partir duquel on peut déclarer un médecin traitant.",
            payload: {
              statement: "Une personne peut déclarer un médecin traitant à l'Assurance maladie dès 16 ans.",
              correctAnswer: true,
              explanation: "Vrai : c'est l'âge à partir duquel chaque personne déclare elle-même son médecin traitant.",
            },
          },
          {
            title: "Vrai ou faux : tous les spécialistes exigent le médecin traitant",
            type: "true_false",
            instructions: "Citer des spécialistes accessibles en accès direct.",
            payload: {
              statement: "Le gynécologue et l'ophtalmologue restent accessibles en accès direct, sans passer par le médecin traitant.",
              correctAnswer: true,
              explanation:
                "Vrai : avec le stomatologue, et le psychiatre pour les personnes de 16 à 25 ans, ce sont des exceptions au parcours de soins coordonnés.",
            },
          },
          {
            title: "Jeu : relier les mots clés de la séance",
            type: "matching",
            instructions: "Définir chaque notion en la reliant à son sens exact.",
            payload: {
              prompt: "Reconstitue le lexique du parcours de soins coordonnés.",
              pairs: [
                { id: "medecin", left: "Médecin traitant", right: "Médecin déclaré qui oriente et suit le dossier médical" },
                { id: "parcours", left: "Parcours de soins coordonnés", right: "Consulter d'abord le médecin traitant avant un spécialiste" },
                { id: "carte", left: "Carte Vitale", right: "Transmet les informations nécessaires au remboursement" },
                { id: "dmp", left: "Dossier médical partagé", right: "Dossier de santé numérique accessible dans Mon espace santé" },
              ],
              explanation:
                "Ces quatre notions permettent de présenter le fonctionnement du parcours de soins coordonnés, comme le demande le module A1.",
            },
          },
        ],
      },
    ],
  };
}
