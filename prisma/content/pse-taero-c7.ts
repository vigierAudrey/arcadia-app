import type { InitialLearningSequence } from "./catalog-types";

// Séquence PSE de T AERO — module C7 « Le suivi de la santé au travail ».
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aero.md
//
// Ce module est la source unique de ce contenu : il alimente à la fois le seed
// de développement (prisma/seed.ts) et l'import ciblé, additif et sans
// écrasement, de scripts/import-contenus.ts.
export const pseTAeroC7Sequence: InitialLearningSequence = {
  title: "C7. Le suivi de la santé au travail",
  description:
    "Tu vas comprendre comment le suivi de santé au travail protège les salariés, comment l’organisme réagit face aux microbes et pourquoi certaines vaccinations peuvent être utiles dans un hangar aéronautique.",
  lessons: [
    {
      title: "Identifier les modalités de suivi individuel médical des salariés",
      description:
        "Distinguer la visite d’information et de prévention, l’examen médical d’aptitude et le suivi individuel renforcé à partir d’une situation du hangar.",
      activities: [
        {
          title: "Décodage des consignes : les verbes de l’épreuve",
          type: "matching",
          instructions:
            "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
          payload: {
            prompt: "Chaque verbe de consigne attend une production précise. Relie chaque verbe à son sens exact.",
            pairs: [
              { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
              { id: "reperer", left: "Repérer", right: "Examiner avec précision, puis lister" },
              { id: "classer", left: "Classer", right: "Ranger des éléments dans l’ordre ou la manière indiquée" },
              { id: "definir", left: "Définir", right: "Donner le sens précis d’une notion ou d’un mot" },
              { id: "deduire", left: "Déduire", right: "Établir une conséquence logique" },
              { id: "indiquer", left: "Indiquer", right: "Donner un renseignement" },
              { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
              { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation" },
            ],
            explanation: "Ces huit verbes sont ceux des consignes de l’épreuve de PSE. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
          },
        },
        {
          title: "À retenir : VIP, EMA et suivi individuel renforcé",
          type: "content",
          instructions:
            "Repérer les trois modalités de suivi médical présentées dans la fiche.",
          payload: {
            body: "Le suivi de santé au travail dépend du poste occupé et des risques réellement présents.\n\nLa visite d’information et de prévention (VIP) informe le salarié sur les risques de son poste et sur les moyens de prévention. Elle est réalisée par le service de prévention et de santé au travail.\n\nL’examen médical d’aptitude (EMA) concerne les postes présentant des risques particuliers. Il vérifie que le salarié peut occuper ce poste sans danger pour lui ni pour les autres.\n\nCertains postes exposés donnent lieu à un suivi individuel renforcé : les visites sont plus fréquentes et adaptées à l’exposition.\n\nAu hangar, Théo est exposé aux coupures sur tôles et rivets, ainsi qu’aux solvants et aux matériaux composites. Le service de prévention et de santé au travail conseille à la fois le salarié et l’employeur.",
          },
        },
        {
          title: "Défi 01 : la convocation de Théo",
          type: "qcm",
          instructions:
            "Identifier la modalité de suivi médical qui correspond à la situation.",
          payload: {
            question: "Théo occupe un poste exposé aux coupures et aux solvants. Il est convoqué par le service de prévention et de santé au travail pour être informé des risques de son poste et des moyens de prévention. De quelle modalité s’agit-il ?",
            choices: [
              { id: "vip", label: "Une visite d’information et de prévention (VIP)" },
              { id: "ema", label: "Un examen médical d’aptitude (EMA)" },
              { id: "renforce", label: "Un suivi individuel renforcé" },
            ],
            correctChoiceIds: ["vip"],
            explanation: "La visite d’information et de prévention informe le salarié sur les risques de son poste et sur les moyens de prévention.",
          },
        },
        {
          title: "Jeu : classer les modalités de suivi",
          type: "sorting",
          instructions:
            "Classer chaque élément dans la modalité de suivi qui lui correspond.",
          payload: {
            prompt: "Trois modalités de suivi, trois rôles différents.",
            categories: [
              { id: "vip", label: "Visite d’information et de prévention" },
              { id: "ema", label: "Examen médical d’aptitude" },
              { id: "renforce", label: "Suivi individuel renforcé" },
            ],
            items: [
              { id: "informer-risques", label: "Informer le salarié sur les risques de son poste", categoryId: "vip" },
              { id: "informer-prevention", label: "Informer le salarié sur les moyens de prévention", categoryId: "vip" },
              { id: "poste-risques", label: "Vérifier qu’un salarié peut occuper un poste à risques particuliers", categoryId: "ema" },
              { id: "aptitude", label: "Se conclure par un avis d’aptitude au poste", categoryId: "ema" },
              { id: "frequence", label: "Adapter la fréquence des visites à l’exposition du salarié", categoryId: "renforce" },
              { id: "exposes", label: "Concerner en priorité les postes les plus exposés", categoryId: "renforce" },
            ],
            explanation: "La VIP informe, l’examen médical d’aptitude vérifie l’aptitude à un poste à risques particuliers, le suivi individuel renforcé adapte la fréquence des visites à l’exposition.",
          },
        },
        {
          title: "Vrai ou faux : l’examen d’aptitude pour tous",
          type: "true_false",
          instructions:
            "Déduire si l’affirmation est exacte à partir de la fiche de notions.",
          payload: {
            statement: "L’examen médical d’aptitude concerne tous les salariés, quel que soit leur poste.",
            correctAnswer: false,
            explanation: "L’examen médical d’aptitude concerne les postes présentant des risques particuliers, et non l’ensemble des salariés.",
          },
        },
        {
          title: "Défi 02 : le rôle du service de santé au travail",
          type: "qcm",
          instructions:
            "Expliquer le rôle du service de prévention et de santé au travail en choisissant l’énoncé exact.",
          payload: {
            question: "Quel énoncé décrit correctement le rôle du service de prévention et de santé au travail ?",
            choices: [
              { id: "sanctionne", label: "Il sanctionne le salarié qui ne respecte pas les consignes de sécurité." },
              { id: "conseille", label: "Il conseille le salarié et l’employeur en matière de santé au travail." },
              { id: "remplace", label: "Il remplace l’employeur pour évaluer les risques de l’entreprise." },
            ],
            correctChoiceIds: ["conseille"],
            explanation: "Le service de prévention et de santé au travail a un rôle de conseil auprès du salarié et de l’employeur : il ne sanctionne pas et ne remplace pas l’employeur.",
          },
        },
      ],
    },
    {
      title: "Expliquer les moyens de défense de l’organisme face à l’infection microbienne",
      description:
        "Relier la barrière cutanéo-muqueuse, l’immunité non spécifique et l’immunité spécifique à une coupure survenue au hangar.",
      activities: [
        {
          title: "À retenir : les défenses de l’organisme",
          type: "content",
          instructions:
            "Repérer les trois moyens de défense décrits dans la fiche.",
          payload: {
            body: "La peau et les muqueuses forment la barrière cutanéo-muqueuse : c’est la première défense de l’organisme contre l’entrée des microbes.\n\nQuand un microbe franchit cette barrière, l’immunité non spécifique agit rapidement, sans viser un microbe précis. C’est elle qui provoque la rougeur et le gonflement autour d’une plaie.\n\nSi cette réponse ne suffit pas, l’immunité spécifique prend le relais. Elle reconnaît un antigène précis, c’est-à-dire un élément reconnu comme étranger par l’organisme.\n\nDes anticorps, produits par l’organisme, reconnaissent cet antigène. Des cellules spécialisées participent aussi à cette défense ciblée.\n\nUne coupure sur un bord de tôle ouvre la barrière cutanéo-muqueuse : nettoyer et surveiller la plaie limite l’entrée et la multiplication des microbes.",
          },
        },
        {
          title: "Jeu : classer les moyens de défense",
          type: "sorting",
          instructions:
            "Classer chaque élément dans le moyen de défense correspondant.",
          payload: {
            prompt: "De la peau jusqu’aux anticorps : trois niveaux de défense.",
            categories: [
              { id: "barriere", label: "Barrière cutanéo-muqueuse" },
              { id: "non-specifique", label: "Immunité non spécifique" },
              { id: "specifique", label: "Immunité spécifique" },
            ],
            items: [
              { id: "peau", label: "La peau intacte qui limite l’entrée des microbes", categoryId: "barriere" },
              { id: "muqueuses", label: "Les muqueuses qui tapissent les voies respiratoires", categoryId: "barriere" },
              { id: "rapide", label: "Une réponse rapide qui agit sans viser un microbe précis", categoryId: "non-specifique" },
              { id: "rougeur", label: "La rougeur et le gonflement autour d’une plaie", categoryId: "non-specifique" },
              { id: "antigene", label: "La reconnaissance d’un antigène précis", categoryId: "specifique" },
              { id: "anticorps", label: "La production d’anticorps dirigés contre un antigène", categoryId: "specifique" },
            ],
            explanation: "La barrière cutanéo-muqueuse empêche l’entrée, l’immunité non spécifique réagit vite et sans cible précise, l’immunité spécifique vise un antigène donné.",
          },
        },
        {
          title: "Jeu : relier les notions d’immunité",
          type: "matching",
          instructions:
            "Définir chaque notion en la reliant à sa définition exacte.",
          payload: {
            prompt: "Le lexique de la séance, à reconstituer.",
            pairs: [
              { id: "barriere", left: "Barrière cutanéo-muqueuse", right: "Peau et muqueuses qui limitent l’entrée des microbes" },
              { id: "non-specifique", left: "Immunité non spécifique", right: "Réponse rapide qui agit sans viser un microbe précis" },
              { id: "specifique", left: "Immunité spécifique", right: "Réponse ciblée contre un antigène précis" },
              { id: "antigene", left: "Antigène", right: "Élément reconnu comme étranger par l’organisme" },
              { id: "anticorps", left: "Anticorps", right: "Molécule produite par l’organisme qui reconnaît un antigène" },
            ],
            explanation: "Ces cinq notions sont celles du programme pour ce module : elles doivent être employées avec leur sens exact dans une réponse rédigée.",
          },
        },
        {
          title: "Défi 01 : la coupure de Théo",
          type: "qcm",
          instructions:
            "Expliquer pourquoi une plaie doit être nettoyée en choisissant l’énoncé exact.",
          payload: {
            question: "Théo se coupe sur un bord de tôle. Pourquoi cette plaie doit-elle être nettoyée et surveillée ?",
            choices: [
              { id: "barriere-ouverte", label: "Parce que la coupure ouvre la barrière cutanéo-muqueuse et facilite l’entrée des microbes." },
              { id: "peau-inutile", label: "Parce que la peau ne joue aucun rôle dans la défense de l’organisme." },
              { id: "specifique-avant", label: "Parce que l’immunité spécifique agit toujours avant l’entrée d’un microbe." },
            ],
            correctChoiceIds: ["barriere-ouverte"],
            explanation: "La coupure ouvre la première barrière de défense : nettoyer et surveiller la plaie limite l’entrée et la multiplication des microbes.",
          },
        },
        {
          title: "Vrai ou faux : l’anticorps universel",
          type: "true_false",
          instructions:
            "Justifier l’exactitude de l’affirmation à partir de la fiche de notions.",
          payload: {
            statement: "Un anticorps reconnaît n’importe quel microbe, sans distinction.",
            correctAnswer: false,
            explanation: "Un anticorps reconnaît un antigène précis : c’est ce qui caractérise l’immunité spécifique.",
          },
        },
      ],
    },
    {
      title: "Expliquer le principe de la vaccination et justifier les vaccinations préconisées",
      description:
        "Distinguer ce qui relève du calendrier vaccinal de tous, d’une recommandation liée à l’exposition, d’une protection individuelle ou collective.",
      activities: [
        {
          title: "À retenir : vaccination, mémoire immunitaire et recommandations",
          type: "content",
          instructions:
            "Repérer ce qui relève d’une obligation et ce qui relève d’une recommandation.",
          payload: {
            body: "La vaccination présente à l’organisme un antigène ou une information associée, sans provoquer la maladie.\n\nL’organisme prépare alors une mémoire immunitaire : lors d’un nouveau contact avec le même antigène, la réponse est plus rapide.\n\nAucun texte n’impose de vaccination propre au métier de la maintenance aéronautique. Ce qui s’applique est le calendrier vaccinal de tous : le rappel diphtérie-tétanos-poliomyélite et coqueluche est prévu à 25 ans, 45 ans, 65 ans, puis tous les dix ans.\n\nCe rappel compte dans un hangar parce que le tétanos s’attrape par une plaie souillée, comme une coupure sur une tôle ou un rivet. La vaccination protège alors la personne vaccinée : c’est une protection individuelle.\n\nUne couverture vaccinale élevée ajoute une protection collective seulement pour une maladie transmissible d’une personne à une autre, ce qui n’est pas le cas du tétanos.\n\nL’employeur peut recommander d’autres vaccinations, à sa charge et sur proposition du médecin du travail, si l’évaluation des risques montre une exposition à des agents biologiques.\n\nLes obligations et les recommandations évoluent : elles se vérifient avec une source officielle et avec le service de prévention et de santé au travail.",
          },
        },
        {
          title: "Défi 01 : le principe de la vaccination",
          type: "qcm",
          instructions:
            "Expliquer le principe de la vaccination en choisissant l’énoncé exact.",
          payload: {
            question: "Sur quel principe repose la vaccination ?",
            choices: [
              { id: "memoire", label: "Elle présente un antigène à l’organisme, qui prépare une mémoire immunitaire." },
              { id: "maladie", label: "Elle provoque volontairement la maladie pour que l’organisme s’y habitue." },
              { id: "remplace", label: "Elle remplace les anticorps de l’organisme par des anticorps fabriqués en laboratoire." },
            ],
            correctChoiceIds: ["memoire"],
            explanation: "La vaccination prépare la mémoire immunitaire sans provoquer la maladie : lors d’un nouveau contact, la réponse est plus rapide.",
          },
        },
        {
          title: "Jeu : protection individuelle ou collective ?",
          type: "sorting",
          instructions:
            "Classer chaque situation selon le type de protection apportée.",
          payload: {
            prompt: "Une vaccination ne protège pas toujours de la même manière.",
            categories: [
              { id: "individuelle", label: "Protection individuelle" },
              { id: "collective", label: "Protection collective" },
            ],
            items: [
              { id: "dtp", label: "Le rappel diphtérie-tétanos-poliomyélite protège la personne vaccinée", categoryId: "individuelle" },
              { id: "tetanos", label: "Le tétanos ne se transmet pas d’une personne à une autre", categoryId: "individuelle" },
              { id: "coqueluche", label: "Une couverture vaccinale élevée contre la coqueluche limite la circulation du microbe", categoryId: "collective" },
              { id: "entourage", label: "La vaccination contre une maladie transmissible protège aussi l’entourage", categoryId: "collective" },
            ],
            explanation: "La vaccination protège d’abord la personne vaccinée. Elle ajoute une protection collective seulement pour une maladie qui se transmet d’une personne à une autre : ce n’est pas le cas du tétanos.",
          },
        },
        {
          title: "Vrai ou faux : une vaccination propre au métier",
          type: "true_false",
          instructions:
            "Justifier l’exactitude de l’affirmation à partir de la fiche de notions.",
          payload: {
            statement: "Un texte impose une vaccination propre au métier de la maintenance aéronautique.",
            correctAnswer: false,
            explanation: "Aucun texte n’impose de vaccination propre à la maintenance aéronautique. C’est le calendrier vaccinal de tous qui s’applique, avec un rappel diphtérie-tétanos-poliomyélite et coqueluche à 25, 45 et 65 ans, puis tous les dix ans.",
          },
        },
        {
          title: "Défi 02 : qui propose une vaccination recommandée ?",
          type: "qcm",
          instructions:
            "Indiquer l’interlocuteur qui propose une vaccination recommandée dans l’entreprise.",
          payload: {
            question: "Sur proposition de qui l’employeur peut-il recommander une vaccination à des salariés exposés à des agents biologiques ?",
            choices: [
              { id: "medecin", label: "Du médecin du travail" },
              { id: "chef", label: "Du chef d’équipe" },
              { id: "salarie", label: "Du salarié lui-même" },
            ],
            correctChoiceIds: ["medecin"],
            explanation: "L’employeur recommande ces vaccinations, à sa charge, sur proposition du médecin du travail, lorsque l’évaluation des risques montre une exposition à des agents biologiques.",
          },
        },
        {
          title: "Jeu : relier les notions de la vaccination",
          type: "matching",
          instructions:
            "Définir chaque notion en la reliant à sa définition exacte.",
          payload: {
            prompt: "Le lexique de la séance, à reconstituer.",
            pairs: [
              { id: "vaccination", left: "Vaccination", right: "Préparation de la mémoire immunitaire sans provoquer la maladie" },
              { id: "memoire", left: "Mémoire immunitaire", right: "Capacité à répondre plus vite lors d’un nouveau contact" },
              { id: "microbiologique", left: "Risque microbiologique", right: "Risque lié à la présence de micro-organismes dangereux sur un poste" },
              { id: "couverture", left: "Couverture vaccinale", right: "Part d’une population vaccinée contre un agent infectieux" },
              { id: "transmissible", left: "Maladie transmissible", right: "Maladie qui peut passer d’une personne à une autre" },
            ],
            explanation: "Ces notions sont celles du programme pour ce module : elles doivent être employées avec leur sens exact dans une réponse rédigée.",
          },
        },
      ],
    },
    {
      title:
        "Rappel : distinguer danger, situation dangereuse, événement déclencheur et dommage",
      description:
        "Replacer les étapes du processus d’apparition du dommage à partir de situations simples du hangar.",
      activities: [
        {
          title: "À retenir : le PAD en quatre étapes",
          type: "content",
          instructions:
            "Repérer les quatre éléments du processus d’apparition du dommage.",
          payload: {
            body: "Le processus d’apparition du dommage aide à comprendre comment une blessure ou une atteinte à la santé peut arriver.\n\n1. Le danger est ce qui peut provoquer un dommage : un foret en rotation, un bord de tôle, un produit irritant.\n\n2. La situation dangereuse existe quand une personne est exposée au danger : la main de Théo reste proche de la zone de perçage.\n\n3. L’événement déclencheur fait basculer la situation : le panneau bouge, la main dérape, l’outil accroche.\n\n4. Le dommage est l’atteinte possible à la santé : coupure, brûlure, douleur, intoxication.\n\nOrdre à retenir : danger, situation dangereuse, événement déclencheur, dommage.",
          },
        },
        {
          title: "Jeu : reconstruire le PAD de Théo",
          type: "sorting",
          instructions:
            "Classer chaque carte dans l’étape du processus qui lui correspond.",
          payload: {
            prompt:
              "Théo perce un panneau mal immobilisé. Classe chaque élément.",
            categories: [
              { id: "danger", label: "Danger" },
              { id: "situation", label: "Situation dangereuse" },
              { id: "evenement", label: "Événement déclencheur" },
              { id: "dommage", label: "Dommage" },
            ],
            items: [
              { id: "foret", label: "Foret en rotation", categoryId: "danger" },
              { id: "bord", label: "Bord de tôle coupant", categoryId: "danger" },
              { id: "main_proche", label: "Main proche de la zone de perçage", categoryId: "situation" },
              { id: "panneau_tenu", label: "Panneau tenu pendant l’opération", categoryId: "situation" },
              { id: "panneau_bouge", label: "Le panneau bouge brusquement", categoryId: "evenement" },
              { id: "main_derape", label: "La main dérape vers le foret", categoryId: "evenement" },
              { id: "coupure", label: "Coupure à la main", categoryId: "dommage" },
              { id: "douleur", label: "Douleur et plaie", categoryId: "dommage" },
            ],
            explanation:
              "Le danger existe avant l’accident. La situation dangereuse expose une personne. L’événement déclencheur provoque le passage vers le dommage.",
          },
        },
        {
          title: "Jeu : relier les notions du PAD",
          type: "matching",
          instructions:
            "Définir chaque élément du PAD en le reliant à son sens exact.",
          payload: {
            prompt: "Relie chaque notion à sa définition.",
            pairs: [
              { id: "danger", left: "Danger", right: "Élément capable de provoquer un dommage" },
              { id: "situation", left: "Situation dangereuse", right: "Situation où une personne est exposée au danger" },
              { id: "evenement", left: "Événement déclencheur", right: "Fait qui fait basculer la situation" },
              { id: "dommage", left: "Dommage", right: "Atteinte possible à la santé" },
            ],
            explanation:
              "Ces quatre mots ne désignent pas la même chose. Les distinguer aide à analyser une situation de travail sans tout mélanger.",
          },
        },
        {
          title: "Défi : ne pas confondre danger et dommage",
          type: "qcm",
          instructions:
            "Identifier le dommage dans une situation du hangar.",
          payload: {
            question:
              "Théo perce un panneau mal immobilisé. Le panneau bouge et sa main dérape vers le foret. Quel élément correspond au dommage ?",
            choices: [
              { id: "foret", label: "Le foret en rotation" },
              { id: "main", label: "La main proche de la zone de perçage" },
              { id: "bouge", label: "Le panneau qui bouge" },
              { id: "coupure", label: "La coupure à la main" },
            ],
            correctChoiceIds: ["coupure"],
            explanation:
              "Le dommage est l’atteinte à la santé. Ici, c’est la coupure à la main.",
          },
        },
      ],
    },
  ],
};
