import type { InitialLearningSequence } from "./catalog-types";

// Séquence PSE de T AAGA — module C5 « Les risques liés à l’activité physique
// du métier » du programme de PSE en CAP.
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aaga-c5.md
//
// Ce module est la source unique de ce contenu : il alimente à la fois le seed
// de développement (prisma/seed.ts) et l’import ciblé, additif et sans
// écrasement, de scripts/import-contenus.ts.
//
// Les huit verbes de consigne de la séquence (Repérer, Identifier, Indiquer,
// Classer, Comparer, Déduire, Expliquer, Justifier) sont ceux de
// _COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md et font l’objet d’une
// activité de décodage placée en tout début de séquence.
export const pseTAagaC5Sequence: InitialLearningSequence = {
  title: "C5. Les risques liés à l’activité physique du métier",
  description:
    "Tu vas apprendre à repérer les postures qui abîment ton corps pendant les transferts aux Glycines, à expliquer d’où vient la douleur et à choisir les gestes et les aides qui te protègent.",
  lessons: [
    {
      title: "Identifier les facteurs de risque liés à l’activité physique",
      description:
        "Distinguer le travail statique du travail dynamique et repérer les postures qui mettent ton dos, tes épaules et tes genoux en danger.",
      activities: [
        {
          title: "Décodage des consignes : les verbes de la séquence",
          type: "matching",
          instructions: "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
          payload: {
            prompt: "Chaque verbe de consigne attend une production précise. Relie chaque verbe à son sens exact.",
            pairs: [
              { id: "reperer", left: "Repérer", right: "Examiner avec précision, puis lister" },
              { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
              { id: "indiquer", left: "Indiquer", right: "Donner un renseignement" },
              { id: "classer", left: "Classer", right: "Ranger des éléments dans l’ordre ou la manière indiquée" },
              { id: "comparer", left: "Comparer", right: "Présenter les points communs et les différences" },
              { id: "deduire", left: "Déduire", right: "Établir une conséquence logique" },
              { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
              { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
            ],
            explanation: "Ces huit verbes sont ceux des consignes de la séquence, et ceux des épreuves. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
          },
        },
        {
          title: "À retenir : mon corps au travail",
          type: "content",
          instructions: "Repérer les deux formes de travail physique présentées dans la fiche.",
          payload: {
            body: "Aux Glycines, un EHPAD (EHPAD signifie établissement d’hébergement pour personnes âgées dépendantes), tu aides Mme Rose à se lever et tu accompagnes les transferts de M. André plusieurs fois par jour.\n\nL’activité physique, c’est l’ensemble des mouvements et des efforts de ton corps pendant le travail.\n\nLe travail statique garde une posture longtemps, sans bouger : rester penché au-dessus d’un lit, tenir un bras en l’air.\n\nLe travail dynamique demande des mouvements ou des efforts répétés : marcher en poussant un fauteuil roulant, refaire le même transfert toute la matinée.\n\nLes deux fatiguent le corps. Le travail statique fatigue même plus vite, parce que le muscle reste contracté sans se relâcher.\n\nUne posture contraignante force ton corps et peut provoquer une douleur : dos rond, tronc en torsion, bras au-dessus des épaules, charge tenue loin du corps.\n\nAvant de faire le geste, je repère le danger, je dégage l’espace et je demande de l’aide si besoin.",
          },
        },
        {
          title: "Défi 01 : la posture maintenue",
          type: "qcm",
          instructions: "Identifier la forme de travail physique de cette situation.",
          payload: {
            question: "Aux Glycines, tu restes penché au-dessus du lit de M. André, immobile, pendant toute la toilette. De quelle forme de travail s’agit-il ?",
            choices: [
              { id: "statique", label: "Un travail statique" },
              { id: "dynamique", label: "Un travail dynamique" },
              { id: "aucun", label: "Aucun effort physique" },
            ],
            correctChoiceIds: ["statique"],
            explanation: "La posture est gardée longtemps sans mouvement : c’est un travail statique. Le muscle reste contracté, il fatigue vite.",
          },
        },
        {
          title: "Défi 02 : le geste répété",
          type: "qcm",
          instructions: "Identifier la forme de travail physique de cette situation.",
          payload: {
            question: "Tu traverses le couloir en poussant le fauteuil roulant de Mme Rose, plusieurs fois dans la journée. De quelle forme de travail s’agit-il ?",
            choices: [
              { id: "statique", label: "Un travail statique" },
              { id: "dynamique", label: "Un travail dynamique" },
              { id: "aucun", label: "Aucun effort physique" },
            ],
            correctChoiceIds: ["dynamique"],
            explanation: "Il y a mouvement et effort répété : c’est un travail dynamique.",
          },
        },
        {
          title: "Jeu : statique ou dynamique",
          type: "sorting",
          instructions: "Classer chaque situation de travail dans la bonne colonne.",
          payload: {
            prompt: "Classe chaque situation aux Glycines selon la forme de travail physique.",
            categories: [
              { id: "statique", label: "Travail statique" },
              { id: "dynamique", label: "Travail dynamique" },
            ],
            items: [
              { id: "penche-lit", label: "Rester penché au-dessus du lit pendant la toilette", categoryId: "statique" },
              { id: "bras-en-lair", label: "Tenir un bras en l’air pour aider à enfiler une manche", categoryId: "statique" },
              { id: "debout-immobile", label: "Rester debout immobile en surveillant la salle à manger", categoryId: "statique" },
              { id: "pousser-fauteuil", label: "Pousser le fauteuil roulant dans le couloir", categoryId: "dynamique" },
              { id: "transferts-repetes", label: "Refaire le même transfert toute la matinée", categoryId: "dynamique" },
              { id: "monter-descendre", label: "Se baisser et se relever pour chausser plusieurs résidents", categoryId: "dynamique" },
            ],
            explanation: "Une posture gardée longtemps est un travail statique. Un mouvement ou un effort répété est un travail dynamique. Les deux fatiguent le corps.",
          },
        },
        {
          title: "Jeu : la zone du corps en danger",
          type: "matching",
          instructions: "Repérer la partie du corps mise en danger par chaque posture.",
          payload: {
            prompt: "Relie chaque posture contraignante à la partie du corps qu’elle met en danger.",
            pairs: [
              { id: "dos-rond", left: "Se pencher avec le dos rond", right: "Le bas du dos" },
              { id: "bras-hauts", left: "Travailler les bras au-dessus des épaules", right: "Les épaules" },
              { id: "accroupi", left: "Rester accroupi longtemps", right: "Les genoux" },
              { id: "torsion", left: "Tourner le tronc en tenant une charge", right: "La colonne vertébrale" },
              { id: "charge-loin", left: "Tenir la charge loin du corps", right: "Les bras et les poignets" },
            ],
            explanation: "Quatre postures reviennent tout le temps en EHPAD : dos rond, torsion du tronc, bras trop hauts, charge loin du corps. Chacune met une zone précise du corps en difficulté.",
          },
        },
        {
          title: "Vrai ou faux : rester immobile fatigue moins",
          type: "true_false",
          instructions: "Expliquer si l’affirmation correspond à ce que tu sais du travail statique.",
          payload: {
            statement: "Rester immobile dans la même position fatigue moins le corps que bouger.",
            correctAnswer: false,
            explanation: "Faux : dans un travail statique, le muscle reste contracté sans se relâcher. Il fatigue même plus vite que dans un mouvement, où le muscle alterne effort et repos.",
          },
        },
        {
          title: "Défi 03 : la chambre encombrée",
          type: "qcm",
          instructions: "Déduire le danger principal de cette situation de travail.",
          payload: {
            question: "Tu dois transférer M. André du lit au fauteuil. La chambre est encombrée, le fauteuil est loin du lit et tu travailles seul. Quel est le danger principal ?",
            choices: [
              { id: "effort-posture", label: "Un effort important dans une posture contraignante" },
              { id: "bruit", label: "Le bruit du couloir" },
              { id: "temperature", label: "La température de la chambre" },
            ],
            correctChoiceIds: ["effort-posture"],
            explanation: "Trois éléments s’additionnent : la charge est loin du corps, l’espace oblige à tourner le tronc, et personne n’aide. Le danger est l’effort dans une posture contraignante.",
          },
        },
        {
          title: "Défi 04 : la première chose à faire",
          type: "qcm",
          instructions: "Indiquer la mesure de prévention à prendre en premier.",
          payload: {
            question: "Avant de transférer M. André dans cette chambre encombrée, que fais-tu en premier ?",
            choices: [
              { id: "degager", label: "Dégager l’espace et rapprocher le fauteuil du lit" },
              { id: "vite", label: "Aller vite pour que ce soit fini plus tôt" },
              { id: "seul", label: "Soulever seul en serrant les dents" },
            ],
            correctChoiceIds: ["degager"],
            explanation: "Préparer l’espace avant de bouger la personne supprime les torsions et les efforts inutiles. Un geste rapide mais dangereux n’est pas un geste professionnel.",
          },
        },
      ],
    },
    {
      title: "Repérer les dommages possibles pour le corps",
      description:
        "Expliquer d’où viennent la fatigue musculaire et les douleurs qui durent, et ce qu’elles changent dans ton travail.",
      activities: [
        {
          title: "À retenir : d’où vient la douleur",
          type: "content",
          instructions: "Repérer les trois parties du corps qui travaillent pendant un transfert.",
          payload: {
            body: "Trois parties du corps travaillent ensemble quand tu aides Mme Rose à se lever.\n\nLe muscle se contracte et produit l’effort. L’articulation est la zone où deux os permettent le mouvement. Le tendon relie le muscle à l’os.\n\nLa fatigue musculaire, c’est la baisse de force après un effort répété ou une posture gardée longtemps. Ses signes : la douleur, la faiblesse, le tremblement, le geste qui devient moins précis.\n\nLa douleur est un signal d’alerte. Elle dit que le corps a atteint sa limite.\n\nUn TMS (TMS signifie trouble musculosquelettique) est une atteinte des muscles, des tendons ou des articulations, liée aux gestes et aux postures du travail.\n\nUn TMS s’installe petit à petit. Si le geste à risque se répète, la douleur revient de plus en plus tôt et peut devenir durable : on parle alors de trouble chronique.\n\nUn TMS peut aussi provoquer un accident du travail : un geste imprécis, et le transfert dérape.\n\nLes conséquences dépassent le corps : arrêt de travail, difficulté à accompagner les résidents, accompagnement moins sûr, parfois adaptation du poste.\n\nJ’agis tôt : je signale la douleur à ma tutrice, j’adapte mon geste, j’utilise une aide.",
          },
        },
        {
          title: "Jeu : le vocabulaire du mouvement",
          type: "matching",
          instructions: "Identifier le sens exact de chaque mot du corps humain.",
          payload: {
            prompt: "Relie chaque mot à sa définition.",
            pairs: [
              { id: "muscle", left: "Muscle", right: "Organe qui se contracte pour produire un mouvement" },
              { id: "articulation", left: "Articulation", right: "Zone où deux os permettent un mouvement" },
              { id: "tendon", left: "Tendon", right: "Partie qui relie le muscle à l’os" },
              { id: "fatigue", left: "Fatigue musculaire", right: "Baisse de la force après un effort" },
              { id: "tms", left: "TMS", right: "Atteinte des muscles, tendons ou articulations liée aux gestes du travail" },
            ],
            explanation: "Ces mots doivent être employés avec leur sens exact dans une réponse rédigée : c’est ce qui est attendu à l’évaluation.",
          },
        },
        {
          title: "Défi 05 : qui produit l’effort",
          type: "qcm",
          instructions: "Identifier la partie du corps qui produit l’effort pendant un transfert.",
          payload: {
            question: "Tu aides Mme Rose à se lever de son fauteuil. Quelle partie de ton corps produit l’effort ?",
            choices: [
              { id: "muscle", label: "Le muscle, qui se contracte" },
              { id: "articulation", label: "L’articulation, qui se contracte" },
              { id: "os", label: "L’os, qui se plie" },
            ],
            correctChoiceIds: ["muscle"],
            explanation: "Le muscle produit l’effort en se contractant. L’articulation permet le mouvement, le tendon transmet la force du muscle à l’os.",
          },
        },
        {
          title: "Jeu : fatigue passagère ou signal d’alerte",
          type: "sorting",
          instructions: "Classer chaque signe selon ce qu’il doit déclencher.",
          payload: {
            prompt: "Classe chaque signe : fatigue normale en fin de service, ou alerte à signaler à ta tutrice.",
            categories: [
              { id: "fatigue", label: "Fatigue passagère" },
              { id: "alerte", label: "Signal d’alerte à signaler" },
            ],
            items: [
              { id: "jambes-lourdes", label: "Jambes lourdes le soir, tout va bien le lendemain", categoryId: "fatigue" },
              { id: "essoufflement", label: "Un peu essoufflé après avoir poussé un fauteuil", categoryId: "fatigue" },
              { id: "douleur-matin", label: "La douleur à l’épaule est déjà là dès le début du service", categoryId: "alerte" },
              { id: "douleur-nuit", label: "La douleur au dos réveille la nuit", categoryId: "alerte" },
              { id: "faiblesse", label: "La main lâche par moments pendant un transfert", categoryId: "alerte" },
              { id: "deux-semaines", label: "La même douleur revient depuis deux semaines", categoryId: "alerte" },
            ],
            explanation: "Une fatigue qui disparaît avec le repos est normale. Une douleur qui revient, qui s’installe ou qui gêne le geste est un signal d’alerte : elle se signale sans attendre.",
          },
        },
        {
          title: "Défi 06 : la douleur de Lina",
          type: "qcm",
          instructions: "Déduire ce qui risque d’arriver si Lina ne dit rien.",
          payload: {
            question: "Depuis deux semaines, Lina a mal à l’épaule après les toilettes au lit. Elle continue les mêmes gestes sans en parler. Que risque-t-il d’arriver ?",
            choices: [
              { id: "chronique", label: "La douleur peut s’installer et devenir durable" },
              { id: "disparaitre", label: "La douleur va disparaître toute seule en continuant" },
              { id: "rien", label: "Rien, la douleur n’a pas de lien avec le travail" },
            ],
            correctChoiceIds: ["chronique"],
            explanation: "Le geste répété entretient la fatigue et la douleur. Un TMS s’installe petit à petit : plus on attend, plus il devient difficile à soigner.",
          },
        },
        {
          title: "Vrai ou faux : la douleur qui passe toute seule",
          type: "true_false",
          instructions: "Justifier la réponse à partir de ce que tu sais du signal de douleur.",
          payload: {
            statement: "Une douleur liée au travail qui revient chaque jour finit toujours par passer toute seule.",
            correctAnswer: false,
            explanation: "Faux : la douleur est un signal d’alerte. Si le geste à risque se répète, elle revient de plus en plus tôt et peut devenir durable. Il faut la signaler, adapter le geste et utiliser une aide.",
          },
        },
        {
          title: "Jeu : les conséquences d’un trouble musculosquelettique",
          type: "sorting",
          instructions: "Classer chaque élément selon ce qu’il représente dans la situation.",
          payload: {
            prompt: "Classe chaque élément : le dommage subi, la conséquence sur le travail, ou l’action de prévention.",
            categories: [
              { id: "dommage", label: "Dommage" },
              { id: "consequence", label: "Conséquence sur le travail" },
              { id: "prevention", label: "Action de prévention" },
            ],
            items: [
              { id: "douleur-dos", label: "Une douleur installée au bas du dos", categoryId: "dommage" },
              { id: "tendinite", label: "Un tendon de l’épaule enflammé", categoryId: "dommage" },
              { id: "arret", label: "Un arrêt de travail de trois semaines", categoryId: "consequence" },
              { id: "difficulte", label: "Ne plus arriver à aider un résident à se lever", categoryId: "consequence" },
              { id: "moins-sur", label: "Un accompagnement moins sûr pour le résident", categoryId: "consequence" },
              { id: "signaler", label: "Signaler la douleur à sa tutrice", categoryId: "prevention" },
              { id: "adapter", label: "Adapter le geste et utiliser une aide technique", categoryId: "prevention" },
              { id: "poste", label: "Faire adapter son poste de travail", categoryId: "prevention" },
            ],
            explanation: "Un TMS est un dommage. Il a des conséquences sur le salarié et sur le service : arrêt, gestes limités, accompagnement moins sûr. Les actions de prévention, elles, se prennent avant que le dommage s’installe.",
          },
        },
      ],
    },
    {
      title: "Indiquer les mesures qui protègent le corps",
      description:
        "Appliquer les principes d’économie d’effort et choisir l’aide à la manutention adaptée au transfert.",
      activities: [
        {
          title: "À retenir : les gestes qui préservent mon dos",
          type: "content",
          instructions: "Repérer les cinq principes qui protègent le corps pendant un transfert.",
          payload: {
            body: "Un bon geste se prépare avant de bouger la personne.\n\nLes cinq principes pour protéger mon dos :\n\n1. Je dégage l’espace et je rapproche le matériel avant de commencer.\n2. Je me place près de la personne ou de la charge.\n3. Je garde le dos droit et je plie les jambes.\n4. J’écarte les pieds pour être stable, et j’évite de tourner le tronc.\n5. Je fais glisser plutôt que soulever quand c’est possible.\n\nJ’explique toujours à la personne ce que je vais faire, et je me coordonne avec mon binôme.\n\nL’ergonomie, c’est adapter le travail à la personne pour protéger sa santé. L’économie d’effort, c’est la manière de faire qui limite la fatigue et protège le corps.\n\nLes aides à la manutention font le travail que mon dos ne doit pas faire. Le drap de glisse sert à repositionner une personne dans son lit. Le verticalisateur accompagne une mise debout quand la personne peut encore participer. Le lève-personne assure un transfert complet en sécurité quand la personne ne peut pas se lever.\n\nCertaines protections sont collectives : elles protègent toute l’équipe, comme le matériel d’aide mis à disposition par l’établissement, un espace de travail dégagé, ou une organisation qui permet de travailler à deux.\n\nD’autres sont individuelles : appliquer les principes d’économie d’effort, utiliser l’aide adaptée, signaler une douleur.\n\nUtiliser le matériel prend un peu de temps, mais ce temps évite une douleur durable. Protéger mon corps protège aussi le résident.",
          },
        },
        {
          title: "Défi 07 : avant de bouger la personne",
          type: "qcm",
          instructions: "Indiquer ce que tu prépares avant le transfert de Mme Rose.",
          payload: {
            question: "Mme Rose doit passer du lit au fauteuil. Le tapis glisse, la table roulante est entre les deux. Que fais-tu avant de la bouger ?",
            choices: [
              { id: "degager", label: "Déplacer la table, retirer le tapis et rapprocher le fauteuil" },
              { id: "enjamber", label: "Enjamber la table en tenant Mme Rose" },
              { id: "tourner", label: "Tourner le tronc pour passer par-dessus le tapis" },
            ],
            correctChoiceIds: ["degager"],
            explanation: "Dégager l’espace supprime les torsions, les efforts inutiles et le risque de chute, pour toi comme pour Mme Rose.",
          },
        },
        {
          title: "Défi 08 : soulever ou faire glisser",
          type: "qcm",
          instructions: "Justifier le choix du geste le plus sûr pour remonter M. André dans son lit.",
          payload: {
            question: "M. André a glissé vers le bas de son lit. Quel geste protège le mieux ton dos ?",
            choices: [
              { id: "glisser", label: "Le faire glisser avec un drap de glisse, à deux" },
              { id: "soulever", label: "Le soulever seul, en le tenant sous les bras" },
              { id: "tirer", label: "Le tirer par les pieds depuis le bout du lit" },
            ],
            correctChoiceIds: ["glisser"],
            explanation: "Faire glisser demande beaucoup moins d’effort que soulever, et le drap de glisse fait le travail que le dos ne doit pas faire. À deux, l’effort est partagé et le geste est plus sûr pour M. André aussi.",
          },
        },
        {
          title: "Jeu : choisis l’aide adaptée",
          type: "matching",
          instructions: "Identifier l’aide à la manutention adaptée à chaque situation.",
          payload: {
            prompt: "Relie chaque situation aux Glycines à l’aide à la manutention qui convient.",
            pairs: [
              { id: "repositionner", left: "Remonter M. André qui a glissé dans son lit", right: "Le drap de glisse" },
              { id: "mise-debout", left: "Aider Mme Rose à se mettre debout alors qu’elle peut encore pousser sur ses jambes", right: "Le verticalisateur" },
              { id: "transfert", left: "Transférer M. André du lit au fauteuil alors qu’il ne peut plus se lever", right: "Le lève-personne" },
            ],
            explanation: "L’aide se choisit selon ce que la personne peut encore faire. Drap de glisse pour repositionner, verticalisateur quand la personne participe, lève-personne quand elle ne peut pas se lever.",
          },
        },
        {
          title: "Jeu : protection collective ou individuelle",
          type: "sorting",
          instructions: "Classer chaque mesure de protection dans la bonne colonne.",
          payload: {
            prompt: "Classe chaque mesure : protège toute l’équipe, ou protège la personne qui fait le geste.",
            categories: [
              { id: "collective", label: "Protection collective" },
              { id: "individuelle", label: "Protection individuelle" },
            ],
            items: [
              { id: "materiel", label: "Un lève-personne mis à disposition dans le service", categoryId: "collective" },
              { id: "espace", label: "Des chambres organisées pour laisser passer le matériel", categoryId: "collective" },
              { id: "binome", label: "Une organisation qui permet de travailler à deux", categoryId: "collective" },
              { id: "formation", label: "Une formation aux gestes et postures pour toute l’équipe", categoryId: "collective" },
              { id: "economie", label: "Garder le dos droit et plier les jambes", categoryId: "individuelle" },
              { id: "utiliser", label: "Utiliser le drap de glisse au lieu de soulever", categoryId: "individuelle" },
              { id: "signaler", label: "Signaler sa douleur à l’épaule à sa tutrice", categoryId: "individuelle" },
            ],
            explanation: "Une protection collective agit sur le travail lui-même et protège toute l’équipe. Une protection individuelle dépend de la personne qui fait le geste. Les deux sont nécessaires.",
          },
        },
        {
          title: "Vrai ou faux : le matériel prend trop de temps",
          type: "true_false",
          instructions: "Justifier la réponse à partir de ce que tu sais des dommages possibles.",
          payload: {
            statement: "Il vaut mieux soulever un résident à la main plutôt que de perdre du temps à installer le lève-personne.",
            correctAnswer: false,
            explanation: "Faux : soulever à la main quand une aide existe expose à une douleur durable et à un accident. Le temps d’installation est court par rapport à un arrêt de travail, et le transfert est plus sûr pour le résident.",
          },
        },
        {
          title: "Défi 09 : la situation du dos de l’agent",
          type: "qcm",
          instructions: "Repérer les deux éléments qui rendent ce geste dangereux.",
          payload: {
            question: "Un agent remonte seul M. André dans son lit. Il soulève avec le dos rond. Le drap de glisse est resté dans le chariot. Qu’est-ce qui rend ce geste dangereux ?",
            choices: [
              { id: "dos-seul", label: "Le dos rond et l’aide technique non utilisée" },
              { id: "heure", label: "L’heure du soin" },
              { id: "chambre", label: "La couleur de la chambre" },
            ],
            correctChoiceIds: ["dos-seul"],
            explanation: "Deux facteurs de risque se cumulent : la posture contraignante, et l’effort de soulèvement alors qu’une aide était disponible. Le geste sûr : chercher le drap de glisse, demander de l’aide, garder le dos droit.",
          },
        },
        {
          title: "Jeu : le lexique de la séquence",
          type: "matching",
          instructions: "Indiquer le sens exact de chaque mot de la séquence.",
          payload: {
            prompt: "Le lexique de la séquence, à reconstituer.",
            pairs: [
              { id: "statique", left: "Travail statique", right: "Travail où une posture est gardée longtemps" },
              { id: "dynamique", left: "Travail dynamique", right: "Travail avec des mouvements ou des efforts répétés" },
              { id: "posture", left: "Posture contraignante", right: "Position qui force le corps et peut provoquer une douleur" },
              { id: "tms", left: "Trouble musculosquelettique", right: "Atteinte des muscles, tendons ou articulations liée au travail" },
              { id: "ergonomie", left: "Ergonomie", right: "Adaptation du travail à la personne pour protéger sa santé" },
              { id: "economie", left: "Économie d’effort", right: "Manière de faire qui limite la fatigue et protège le corps" },
            ],
            explanation: "Ces mots doivent être employés avec leur sens exact dans une réponse rédigée : c’est ce qui est attendu à l’évaluation.",
          },
        },
      ],
    },
  ],
};
