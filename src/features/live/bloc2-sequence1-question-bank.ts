import type { LiveQuestion, LiveQuestionType } from "./question-bank";

const SOURCE_PATH =
  "CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1";

type QuestionInput = {
  title: string;
  prompt: string;
  choices: string[];
  correctChoiceIndex: number;
  explanation: string;
};

function createSequenceQuestionBank(
  session: number,
  title: string,
  sourceFolder: string,
  questions: readonly QuestionInput[],
): LiveQuestion[] {
  return questions.map((question, index) => {
    const type: LiveQuestionType =
      question.choices[0] === "Vrai" && question.choices[1] === "Faux"
        ? "true-false"
        : "single-choice";
    return {
      id: `aaga-bloc2-s1-s${session}-${index + 1}`,
      type,
      ...question,
      timeLimitSeconds: 45,
      points: type === "true-false" ? 100 : 120,
      track: "CORE",
      contextMode: "trade-contextualized",
      reference: {
        formation: "CAP AAGA",
        level: "CAP terminale AAGA",
        teachingArea: "Bloc 2",
        module: `Séquence 1 — Séance ${session} : ${title}`,
        sourceTitle: `CAP AAGA Bloc 2 — Séquence 1, séance ${session}`,
        relativePath: `${SOURCE_PATH}/${sourceFolder}/S1_seance_${String(session).padStart(2, "0")}_complete.md`,
        sectionOrPage: `Séquence 1 — Séance ${session} — ${title}`,
        conformity: "CONFIRME",
      },
    } satisfies LiveQuestion;
  });
}

export const BLOC2_SEQUENCE1_QUESTION_BANK = [
  ...createSequenceQuestionBank(
    1,
    "Structures d’accueil et fiabilité des informations",
    "S1_seance_01_structures_daccueil_et_fiabilite_des_informations",
    [
      {
        title: "Accueil de jour",
        prompt: "Quelle structure accueille une personne pendant la journée sans l’héberger la nuit ?",
        choices: ["L’accueil de jour", "L’EHPAD", "L’USLD", "La résidence autonomie"],
        correctChoiceIndex: 0,
        explanation: "L’accueil de jour reçoit la personne en journée sans hébergement permanent.",
      },
      {
        title: "Résidence autonomie",
        prompt: "Quel public correspond le mieux à une résidence autonomie ?",
        choices: ["Des personnes encore autonomes ayant besoin d’un logement et de services", "Des personnes nécessitant une surveillance médicale continue", "Uniquement des personnes accueillies la journée", "Des personnes sans logement ni accompagnement"],
        correctChoiceIndex: 0,
        explanation: "La résidence autonomie propose un logement et des services à des personnes encore autonomes.",
      },
      {
        title: "Source fiable",
        prompt: "Quel critère aide à vérifier la fiabilité d’une information ?",
        choices: ["L’auteur ou l’organisme est identifiable et la date est connue", "Le message est très partagé", "L’information confirme une rumeur", "Le texte ne donne aucune source"],
        correctChoiceIndex: 0,
        explanation: "Une source doit être identifiable, datée, pertinente et recoupée avant d’être utilisée.",
      },
      {
        title: "Publication anonyme",
        prompt: "Une publication anonyme sur un réseau social peut être transmise directement à une famille.",
        choices: ["Vrai", "Faux"],
        correctChoiceIndex: 1,
        explanation: "Une publication anonyme doit être vérifiée et recoupée ; elle ne suffit pas pour informer une famille.",
      },
      {
        title: "Information manquante",
        prompt: "Une famille pose une question sur une mission de la structure que tu ne connais pas. Que fais-tu ?",
        choices: ["Je dis que je vérifie puis je consulte une personne ressource ou un document officiel", "Je donne une réponse approximative", "Je promets que la structure répondra au besoin", "Je reprends une information entendue dans le couloir"],
        correctChoiceIndex: 0,
        explanation: "L’agent ne doit pas inventer ni promettre : il vérifie auprès d’une source ou d’un professionnel compétent.",
      },
    ],
  ),
  ...createSequenceQuestionBank(
    2,
    "Qui fait quoi ? Obligations, limites et prévention",
    "S1_seance_02_qui_fait_quoi_obligations_limites_et_prevention",
    [
      {
        title: "Limite de rôle",
        prompt: "Mme Rose demande un soin qui ne relève pas de l’agent AAGA. Quelle réponse est adaptée ?",
        choices: ["Expliquer sa limite et transmettre à l’équipe soignante", "Réaliser le soin pour rendre service", "Refuser sans prévenir personne", "Demander à un visiteur de s’en charger"],
        correctChoiceIndex: 0,
        explanation: "L’agent agit dans son champ de compétences et transmet les demandes qui le dépassent au relais adapté.",
      },
      {
        title: "Danger dans le couloir",
        prompt: "Un carton gêne le passage dans un couloir. Quel est le premier objectif ?",
        choices: ["Sécuriser la zone sans se mettre en danger", "Attendre qu’une personne tombe", "Déplacer seul une charge trop lourde", "Ignorer le carton si le couloir est large"],
        correctChoiceIndex: 0,
        explanation: "Il faut éviter le sur-risque, sécuriser dans ses limites puis alerter ou transmettre selon le protocole.",
      },
      {
        title: "Transmission factuelle",
        prompt: "Quelle transmission est factuelle ?",
        choices: ["« À 10 h, Mme Rose a refusé l’aide à l’habillage et a dit vouloir rester seule. »", "« Mme Rose est forcément dépressive. »", "« Mme Rose exagère toujours. »", "« Je pense qu’elle n’aime personne. »"],
        correctChoiceIndex: 0,
        explanation: "Une transmission décrit des faits observés, avec le contexte et la date, sans interprétation ni diagnostic.",
      },
      {
        title: "Stock de gants",
        prompt: "Signaler un stock de gants presque vide contribue à prévenir une rupture de matériel nécessaire au protocole.",
        choices: ["Vrai", "Faux"],
        correctChoiceIndex: 0,
        explanation: "Le signalement permet au responsable identifié d’anticiper le réapprovisionnement et de maintenir les conditions de sécurité.",
      },
      {
        title: "Bon relais",
        prompt: "Une barrière de lit est défectueuse. Quelle conduite est adaptée ?",
        choices: ["Ne pas utiliser le matériel si la situation est dangereuse, sécuriser et transmettre au relais compétent", "Réparer soi-même le mécanisme", "Continuer à l’utiliser sans signaler", "Demander à la résidente de la réparer"],
        correctChoiceIndex: 0,
        explanation: "L’agent ne réalise pas une réparation hors rôle : il sécurise, respecte le protocole et alerte le bon professionnel.",
      },
    ],
  ),
  ...createSequenceQuestionBank(
    3,
    "Projets d’établissement, de service et de vie",
    "S1_seance_03_projets_detablissement_de_service_et_de_vie",
    [
      {
        title: "Projet de vie",
        prompt: "Quel document concerne les habitudes, souhaits, besoins et objectifs d’une personne accompagnée ?",
        choices: ["Le projet de vie", "Le projet d’établissement", "Le projet de service", "Le règlement des visiteurs"],
        correctChoiceIndex: 0,
        explanation: "Le projet de vie est individuel : il se construit avec la personne et évolue selon ses souhaits et capacités.",
      },
      {
        title: "Projet d’établissement",
        prompt: "Le projet d’établissement fixe les grandes orientations de la structure.",
        choices: ["Vrai", "Faux"],
        correctChoiceIndex: 0,
        explanation: "Le projet d’établissement porte les orientations générales ; le projet de service organise ensuite un service ou une unité.",
      },
      {
        title: "Choix de la personne",
        prompt: "Mme Rose ne souhaite plus participer à l’atelier jardin. Quelle action respecte son projet de vie ?",
        choices: ["Écouter son souhait, le transmettre et rechercher une adaptation avec l’équipe", "L’obliger à participer car l’activité était prévue", "Retirer toute activité sans en parler", "Décider seul d’une nouvelle activité"],
        correctChoiceIndex: 0,
        explanation: "La personne reste au centre du projet : l’équipe observe, transmet et adapte sans décider à sa place.",
      },
      {
        title: "Participation",
        prompt: "Dans un projet de vie, la personne accompagnée participe selon ses capacités et son accord.",
        choices: ["Vrai", "Faux"],
        correctChoiceIndex: 0,
        explanation: "Le projet de vie prend en compte la parole, les choix, les capacités et les besoins de la personne.",
      },
      {
        title: "Projet de service",
        prompt: "Quel élément relève le plus du projet de service ?",
        choices: ["L’organisation et les objectifs d’une unité ou d’une équipe", "Le choix personnel d’une tenue", "Le souhait individuel de jardiner", "Le diagnostic médical d’une personne"],
        correctChoiceIndex: 0,
        explanation: "Le projet de service organise le fonctionnement et les objectifs d’un service ; il se distingue du projet de vie individuel.",
      },
    ],
  ),
  ...createSequenceQuestionBank(
    4,
    "Protéger les majeurs sans décider à leur place",
    "S1_seance_04_proteger_les_majeurs_sans_decider_a_leur_place",
    [
      {
        title: "Mesure de protection",
        prompt: "Qui décide d’une mesure de protection juridique pour un majeur ?",
        choices: ["Le juge", "L’agent AAGA seul", "Un voisin", "La personne qui accompagne ce jour-là"],
        correctChoiceIndex: 0,
        explanation: "Les mesures de protection sont décidées par le juge et adaptées à la situation de la personne.",
      },
      {
        title: "Choix quotidien",
        prompt: "Mme Yvette est sous tutelle et souhaite choisir sa tenue. Quelle conduite est adaptée ?",
        choices: ["Respecter son choix quotidien et l’accompagner si nécessaire", "Choisir systématiquement à sa place", "Demander à un visiteur de décider", "Lui interdire de s’exprimer"],
        correctChoiceIndex: 0,
        explanation: "Une mesure de protection ne supprime pas les droits ni les choix de la vie quotidienne ; la dignité de la personne est respectée.",
      },
      {
        title: "Curatelle",
        prompt: "La curatelle correspond à une mesure où la personne est assistée pour certains actes.",
        choices: ["Vrai", "Faux"],
        correctChoiceIndex: 0,
        explanation: "La curatelle apporte une assistance pour certains actes, selon la mesure décidée ; elle n’équivaut pas à décider de tout à la place de la personne.",
      },
      {
        title: "Question juridique",
        prompt: "Que fait l’agent lorsqu’une question porte sur l’interprétation d’un jugement de protection ?",
        choices: ["Il transmet au professionnel compétent sans interpréter seul le jugement", "Il donne une réponse juridique définitive", "Il montre le document à tous les visiteurs", "Il détruit le document"],
        correctChoiceIndex: 0,
        explanation: "L’agent respecte la confidentialité, ses limites de rôle et sollicite le relais compétent pour une question juridique.",
      },
      {
        title: "Protection et droits",
        prompt: "Une mesure de protection juridique autorise l’équipe à ignorer tous les souhaits de la personne.",
        choices: ["Vrai", "Faux"],
        correctChoiceIndex: 1,
        explanation: "La protection vise à accompagner la personne selon ses besoins tout en respectant ses droits, sa dignité et sa participation.",
      },
    ],
  ),
  ...createSequenceQuestionBank(
    5,
    "Vieillissement : observer sans généraliser",
    "S1_seance_05_vieillissement_observer_sans_generaliser",
    [
      {
        title: "Observation cognitive",
        prompt: "Quel exemple relève principalement d’une observation cognitive ?",
        choices: ["Un temps de réponse plus long", "Une force musculaire diminuée", "Une douleur à l’épaule diagnostiquée", "La couleur préférée de la personne"],
        correctChoiceIndex: 0,
        explanation: "Les observations cognitives concernent notamment l’attention, la mémoire, la compréhension et le temps de réponse.",
      },
      {
        title: "Communication adaptée",
        prompt: "Mme Rose entend moins bien dans un groupe. Quelle adaptation est pertinente ?",
        choices: ["Se placer face à elle, parler clairement et limiter le bruit ambiant", "Parler plus vite en regardant ailleurs", "Parler à sa place", "Éviter tout échange"],
        correctChoiceIndex: 0,
        explanation: "Une communication adaptée tient compte des capacités observées et maintient la participation de la personne.",
      },
      {
        title: "Changement soudain",
        prompt: "Mme Rose paraît soudain confuse ce matin, ce qui n’est pas habituel. Que fais-tu ?",
        choices: ["Je sécurise, j’observe des faits et je transmets rapidement", "Je pose un diagnostic médical", "J’attends plusieurs jours sans prévenir", "Je lui reproche son comportement"],
        correctChoiceIndex: 0,
        explanation: "L’agent n’établit pas de diagnostic : il repère un changement inhabituel, assure la sécurité et transmet des observations factuelles.",
      },
      {
        title: "Vieillissement individuel",
        prompt: "Toutes les personnes vieillissent de la même façon et au même rythme.",
        choices: ["Vrai", "Faux"],
        correctChoiceIndex: 1,
        explanation: "Le vieillissement est individuel ; l’accompagnement s’adapte aux capacités et habitudes réellement observées.",
      },
      {
        title: "Respect de la personne",
        prompt: "Quelle posture est professionnelle face à une personne qui se déplace plus lentement ?",
        choices: ["Laisser du temps et proposer une aide adaptée sans infantiliser", "Faire systématiquement à sa place", "La presser pour aller plus vite", "Commenter ses difficultés devant les autres"],
        correctChoiceIndex: 0,
        explanation: "L’accompagnement soutient les capacités de la personne, respecte son rythme et évite tout jugement ou infantilisation.",
      },
    ],
  ),
  ...createSequenceQuestionBank(
    6,
    "Degré d’autonomie, AGGIR et environnement facilitant",
    "S1_seance_06_degre_dautonomie_aggir_et_environnement_facilitant",
    [
      {
        title: "Aide ajustée",
        prompt: "M. Karim peut faire seul sa toilette du visage. Quelle aide est adaptée ?",
        choices: ["Le laisser faire et compléter seulement ce qui est nécessaire", "Faire toute la toilette à sa place", "L’empêcher de participer", "Déduire qu’il est autonome pour tous les actes"],
        correctChoiceIndex: 0,
        explanation: "L’aide est graduée : elle soutient la participation et s’appuie sur les capacités observées pour chaque acte.",
      },
      {
        title: "Autonomie",
        prompt: "Une difficulté sur un seul acte permet de conclure au niveau global d’autonomie d’une personne.",
        choices: ["Vrai", "Faux"],
        correctChoiceIndex: 1,
        explanation: "L’autonomie varie selon les actes et les moments ; une difficulté isolée ne permet pas de conclure pour l’ensemble de la vie quotidienne.",
      },
      {
        title: "Obstacle",
        prompt: "Quel élément est un obstacle possible au déplacement dans une chambre ?",
        choices: ["Une table placée dans le passage", "Un appel accessible", "Un éclairage suffisant", "Un repère contrasté"],
        correctChoiceIndex: 0,
        explanation: "Un meuble dans le passage peut gêner ou mettre en danger ; l’environnement doit être observé et adapté dans les limites du rôle.",
      },
      {
        title: "AGGIR",
        prompt: "Quel est le rôle de l’élève face aux informations issues de la grille AGGIR ?",
        choices: ["Les utiliser pour comprendre l’aide prévue, sans calculer seul un GIR", "Calculer seul un GIR définitif", "Modifier seul l’évaluation de l’équipe", "Ignorer le projet de vie"],
        correctChoiceIndex: 0,
        explanation: "L’AGGIR est utilisée par des professionnels pour apprécier l’autonomie ; l’élève exploite les informations et respecte les consignes de l’équipe.",
      },
      {
        title: "Facilitateur",
        prompt: "Quel élément peut faciliter un déplacement ?",
        choices: ["Un trajet dégagé et bien éclairé", "Un câble au sol", "Un meuble instable", "Un passage encombré"],
        correctChoiceIndex: 0,
        explanation: "Un environnement dégagé, éclairé et adapté favorise la sécurité et le maintien de l’autonomie.",
      },
    ],
  ),
  ...createSequenceQuestionBank(
    7,
    "Accueillir un nouveau résident : évaluation et transfert",
    "S1_seance_07_accueillir_un_nouveau_resident_evaluation_et_transfert",
    [
      {
        title: "Information utile",
        prompt: "Pour préparer l’accueil de Mme Denise, quelle information est prioritaire ?",
        choices: ["Une parole de Mme Denise et un dossier d’accueil daté", "Une note anonyme non vérifiée", "Une rumeur sur un réseau social", "Une information sans auteur ni date"],
        correctChoiceIndex: 0,
        explanation: "Les informations retenues sont utiles, récentes, identifiées et, si nécessaire, recoupées ; la parole de la personne est essentielle.",
      },
      {
        title: "Confidentialité",
        prompt: "Une information concernant Mme Denise peut être communiquée à n’importe quel visiteur sans vérification.",
        choices: ["Vrai", "Faux"],
        correctChoiceIndex: 1,
        explanation: "Les informations concernant la personne sont protégées : l’agent respecte la confidentialité et les consignes de l’équipe.",
      },
      {
        title: "Matériel défectueux",
        prompt: "Un matériel de la chambre est défectueux. Quelle conduite est adaptée ?",
        choices: ["Sécuriser dans ses limites, ne pas l’utiliser s’il est dangereux et transmettre au relais", "Continuer à l’utiliser", "Le réparer sans autorisation", "Ne rien noter"],
        correctChoiceIndex: 0,
        explanation: "La sécurité passe par l’action autorisée, le signalement du dysfonctionnement et une transmission traçable au bon professionnel.",
      },
      {
        title: "Aide graduée",
        prompt: "Pour ajuster l’aide à Mme Denise, quels éléments faut-il prendre en compte ?",
        choices: ["Ses capacités, habitudes, souhaits, besoins et les consignes de l’équipe", "Uniquement son âge", "Uniquement l’avis d’un visiteur", "Une supposition sans observation"],
        correctChoiceIndex: 0,
        explanation: "L’aide se construit à partir d’informations fiables, du projet de vie et des capacités réelles de la personne.",
      },
      {
        title: "Traçabilité",
        prompt: "Quelle transmission est la plus utile après une action de sécurité ?",
        choices: ["Des faits précis, le contexte, la date, l’action réalisée et le destinataire", "Une opinion sans date", "Le nom d’une personne sans situation", "Un message anonyme"],
        correctChoiceIndex: 0,
        explanation: "Une transmission utile est factuelle, contextualisée et datée ; elle permet le suivi par l’équipe compétente.",
      },
    ],
  ),
] as const satisfies readonly LiveQuestion[];
