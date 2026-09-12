import type { InitialLearningSequence } from "./catalog-types";

// Séquence Bloc 2 de T AAGA — module CT3 « Recueillir les informations,
// s'informer sur les éléments du contexte et de la situation professionnels ».
// Correspond à la séquence 1 de la progression annuelle du Bloc 2.
// Traçabilité complète des sources : docs/mapping-pedagogique-t-aaga-bloc2.md
//
// Ce module est la source unique de ce contenu : il alimente à la fois le seed
// de développement (prisma/seed.ts) et l'import ciblé, additif et sans
// écrasement, de scripts/import-contenus.ts.
export const bloc2TAagaCt3Sequence: InitialLearningSequence = {
  title: "CT3. Cadre d’intervention, autonomie et ressources",
  description:
    "Tu vas apprendre à choisir une information fiable, à comprendre le rôle de chaque structure et à adapter ton accompagnement aux besoins d’une personne âgée.",
  lessons: [
    {
      title: "Identifier une structure d’accueil et vérifier la fiabilité d’une information",
      description:
        "Distinguer l’EHPAD, la résidence autonomie, l’USLD et l’accueil de jour, puis contrôler l’auteur, la date et l’organisme d’une information avant de la transmettre à une famille.",
      activities: [
        {
          title: "Décodage des consignes : les verbes du bloc 2",
          type: "matching",
          instructions:
            "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
          payload: {
            prompt:
              "Chaque verbe de consigne attend une production précise. Relie chaque verbe à son sens exact.",
            pairs: [
              { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
              { id: "reperer", left: "Repérer", right: "Examiner avec précision, puis lister" },
              { id: "classer", left: "Classer", right: "Ranger des éléments dans la catégorie indiquée" },
              { id: "definir", left: "Définir", right: "Donner le sens précis d’une notion ou d’un mot" },
              { id: "deduire", left: "Déduire", right: "Établir une conséquence logique" },
              { id: "justifier", left: "Justifier", right: "Trouver les éléments qui montrent la réalité d’une affirmation" },
              { id: "expliquer", left: "Expliquer", right: "Rendre clair et compréhensible par une argumentation" },
              { id: "indiquer", left: "Indiquer", right: "Donner un renseignement" },
            ],
            explanation:
              "Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu, à l’écrit comme à l’oral.",
          },
        },
        {
          title: "À retenir : quatre structures, quatre besoins",
          type: "content",
          instructions:
            "Repérer les quatre structures d’accueil présentées dans la fiche.",
          payload: {
            body: "Une structure d’accueil accueille un public défini et remplit des missions précises.\n\nEHPAD : hébergement permanent et accompagnement de personnes dépendantes.\n\nRésidence autonomie : logement et services pour des personnes encore autonomes.\n\nUSLD, unité de soins de longue durée : soins médicaux importants et surveillance continue.\n\nAccueil de jour : accueil organisé pendant la journée, sans hébergement permanent.\n\nIndices à repérer : public accueilli, présence soignante, hébergement ou non, durée de l’accueil et degré d’autonomie.",
          },
        },
        {
          title: "Jeu : relier chaque structure à sa mission",
          type: "matching",
          instructions: "Identifier la mission qui correspond à chaque structure.",
          payload: {
            prompt: "Relie chaque structure d’accueil à ce qu’elle propose réellement.",
            pairs: [
              { id: "ehpad", left: "EHPAD", right: "Hébergement permanent et accompagnement de personnes dépendantes" },
              { id: "residence", left: "Résidence autonomie", right: "Logement et services pour des personnes encore autonomes" },
              { id: "usld", left: "USLD", right: "Soins médicaux importants et surveillance continue" },
              { id: "accueil_jour", left: "Accueil de jour", right: "Accueil en journée, sans hébergement permanent" },
            ],
            explanation:
              "Ces quatre structures ne répondent pas aux mêmes besoins. Le public accueilli et la présence soignante sont les premiers indices.",
          },
        },
        {
          title: "Défi 01 : la question de la famille de Mme Leroux",
          type: "qcm",
          instructions:
            "Identifier la structure qui correspond au besoin exprimé par la famille.",
          payload: {
            question:
              "La famille de Mme Leroux cherche un accueil en journée seulement, pour que Mme Leroux rentre dormir chez elle. Quelle structure correspond ?",
            choices: [
              { id: "accueil_jour", label: "L’accueil de jour" },
              { id: "ehpad", label: "L’EHPAD" },
              { id: "usld", label: "L’USLD" },
              { id: "residence", label: "La résidence autonomie" },
            ],
            correctChoiceIds: ["accueil_jour"],
            explanation:
              "L’accueil de jour accueille la personne pendant la journée sans hébergement permanent. Les trois autres structures proposent un hébergement.",
          },
        },
        {
          title: "Jeu : classer les sources d’information",
          type: "sorting",
          instructions:
            "Classer chaque source selon qu’elle peut être utilisée directement ou doit être vérifiée.",
          payload: {
            prompt:
              "Aux Glycines, deux pages internet donnent des informations différentes. Classe chaque source.",
            categories: [
              { id: "utilisable", label: "Source identifiable, utilisable" },
              { id: "verifier", label: "À vérifier avant de l’utiliser" },
            ],
            items: [
              { id: "site_officiel", label: "Extrait d’un site officiel daté de cette année", categoryId: "utilisable" },
              { id: "brochure", label: "Brochure de la structure, vérifiée avec la direction", categoryId: "utilisable" },
              { id: "dossier", label: "Dossier d’accueil daté et signé", categoryId: "utilisable" },
              { id: "anonyme", label: "Publication anonyme sur un réseau social", categoryId: "verifier" },
              { id: "sans_date", label: "Page internet sans auteur ni date", categoryId: "verifier" },
              { id: "rumeur", label: "Information entendue dans le couloir", categoryId: "verifier" },
            ],
            explanation:
              "Une source fiable est identifiable, datée, récente, pertinente et recoupée. Ce qui n’est pas identifiable doit être contrôlé avant d’être transmis à une famille.",
          },
        },
        {
          title: "Vrai ou faux : une publication anonyme suffit",
          type: "true_false",
          instructions: "Justifier la réponse à partir des critères de fiabilité.",
          payload: {
            statement:
              "Une publication anonyme sur un réseau social suffit pour informer la famille d’une résidente.",
            correctAnswer: false,
            explanation:
              "Faux : sans auteur identifiable ni date, l’information doit être vérifiée et recoupée avec une source officielle avant d’être utilisée.",
          },
        },
        {
          title: "Défi 02 : une information manque",
          type: "qcm",
          instructions:
            "Indiquer la conduite à tenir quand une mission de la structure n’est pas connue.",
          payload: {
            question:
              "Une famille pose une question sur une mission des Glycines que tu ne connais pas. Que fais-tu ?",
            choices: [
              { id: "ressource", label: "Dire que tu vérifies, puis demander à une personne ressource ou consulter un document officiel" },
              { id: "inventer", label: "Donner une réponse approximative pour ne pas rester silencieux" },
              { id: "promettre", label: "Promettre une prise en charge pour rassurer la famille" },
              { id: "forum", label: "Reprendre ce qui est écrit sur un forum" },
            ],
            correctChoiceIds: ["ressource"],
            explanation:
              "Présenter la structure sans inventer fait partie du rôle. Une information manquante se demande à une personne ressource ; elle ne se devine pas et ne se promet pas.",
          },
        },
      ],
    },
    {
      title: "Repérer son rôle, ses limites et les moyens de prévention",
      description:
        "Situer son intervention dans l’équipe, choisir le bon relais quand une demande dépasse ses limites et repérer un risque avant d’agir.",
      activities: [
        {
          title: "À retenir : mon rôle, mes limites, mes relais",
          type: "content",
          instructions: "Repérer les personnes et les lieux ressources présentés dans la fiche.",
          payload: {
            body: "L’agent accompagnant au grand âge réalise les activités autorisées par sa fonction et transmet les demandes qui sortent de son champ.\n\nL’équipe des Glycines : direction, médecin coordonnateur, infirmier, aide-soignant, agent AAGA, animation, maintenance.\n\nLe relais dépend de la situation : un soin va à l’équipe soignante, une panne à la maintenance, un stock au responsable identifié.\n\nAvant d’agir sur un danger : repérer le danger, ne pas créer un second danger, sécuriser dans ses limites, alerter le relais et tracer selon le protocole.\n\nUne transmission décrit des faits observés, datés et adressés. Elle ne contient ni interprétation ni diagnostic.",
          },
        },
        {
          title: "Jeu : je peux, je transmets, je ne fais pas seul",
          type: "sorting",
          instructions: "Classer chaque situation selon ce que l’agent peut réellement faire.",
          payload: {
            prompt:
              "Pour chaque situation rencontrée aux Glycines, choisis la bonne colonne.",
            categories: [
              { id: "je_peux", label: "Je peux le faire" },
              { id: "je_transmets", label: "Je transmets" },
              { id: "pas_seul", label: "Je ne fais pas seul" },
            ],
            items: [
              { id: "habillage", label: "Aider Mme Rose à s’habiller, comme prévu au projet de vie", categoryId: "je_peux" },
              { id: "sol", label: "Signaler et baliser un sol mouillé dans le couloir", categoryId: "je_peux" },
              { id: "stock", label: "Prévenir que le stock de gants est presque vide", categoryId: "je_transmets" },
              { id: "medicament", label: "Trouver un médicament tombé au sol", categoryId: "je_transmets" },
              { id: "refus", label: "Constater un refus d’aide répété", categoryId: "je_transmets" },
              { id: "barriere", label: "Réparer une barrière de lit défectueuse", categoryId: "pas_seul" },
              { id: "soin", label: "Réaliser un soin demandé par une résidente", categoryId: "pas_seul" },
              { id: "visiteur", label: "Donner à un visiteur une information médicale sur une résidente", categoryId: "pas_seul" },
            ],
            explanation:
              "L’agent agit dans ses limites de rôle, transmet les faits préoccupants et les dysfonctionnements, et ne réalise jamais seul ce qui relève d’un autre professionnel ou du secret professionnel.",
          },
        },
        {
          title: "Défi 03 : la demande de Mme Rose",
          type: "qcm",
          instructions: "Déduire la conduite à tenir face à une demande hors de son rôle.",
          payload: {
            question:
              "Mme Rose demande un soin qui ne relève pas de l’agent. Quelle réponse est professionnelle ?",
            choices: [
              { id: "expliquer", label: "Expliquer calmement ta limite de rôle et transmettre la demande au professionnel compétent" },
              { id: "faire", label: "Réaliser le soin pour ne pas la décevoir" },
              { id: "refuser_sec", label: "Refuser sèchement sans explication et passer à autre chose" },
              { id: "oublier", label: "Ne rien dire et espérer qu’elle oublie sa demande" },
            ],
            correctChoiceIds: ["expliquer"],
            explanation:
              "Respecter ses limites n’est pas abandonner la personne : l’agent explique, rassure et transmet la demande à l’équipe soignante.",
          },
        },
        {
          title: "Défi 04 : le carton dans le couloir",
          type: "qcm",
          instructions: "Indiquer la première action à mener face à un passage encombré.",
          payload: {
            question:
              "Un carton gêne le passage dans le couloir des Glycines. Quel est le premier objectif ?",
            choices: [
              { id: "securiser", label: "Sécuriser la zone sans se mettre en danger, puis alerter le relais" },
              { id: "porter", label: "Porter seul le carton, même s’il est très lourd" },
              { id: "attendre", label: "Attendre la fin du service pour en parler" },
              { id: "contourner", label: "Contourner le carton et continuer sa tournée" },
            ],
            correctChoiceIds: ["securiser"],
            explanation:
              "On repère le danger et la personne exposée avant d’agir. La mesure immédiate ne doit pas créer un second danger ; la mesure durable passe par le relais et la traçabilité.",
          },
        },
        {
          title: "Vrai ou faux : la transmission contient un avis",
          type: "true_false",
          instructions: "Justifier la réponse à partir de la fiche de notions.",
          payload: {
            statement:
              "Une transmission professionnelle contient l’interprétation personnelle de l’agent.",
            correctAnswer: false,
            explanation:
              "Faux : la transmission décrit des faits observés, avec la date, le contexte et le destinataire. L’interprétation et le diagnostic relèvent d’autres professionnels.",
          },
        },
        {
          title: "Vrai ou faux : signaler un stock presque vide",
          type: "true_false",
          instructions: "Expliquer l’intérêt du signalement pour l’équipe.",
          payload: {
            statement:
              "Signaler un stock de gants presque vide fait partie du rôle de l’agent.",
            correctAnswer: true,
            explanation:
              "Vrai : alerter sur l’état du stock évite une rupture qui empêcherait d’appliquer le protocole. C’est une contrainte technique de l’intervention.",
          },
        },
      ],
    },
    {
      title: "Classer les décisions selon le projet d’établissement, de service ou de vie",
      description:
        "Distinguer les trois projets qui encadrent l’accompagnement, et utiliser le projet de vie pour adapter une action à la demande réelle de la personne.",
      activities: [
        {
          title: "À retenir : trois projets, trois niveaux",
          type: "content",
          instructions: "Définir chacun des trois projets présentés dans la fiche.",
          payload: {
            body: "Projet d’établissement : il fixe les orientations générales de la structure, par exemple une politique de bientraitance ou les horaires généraux.\n\nProjet de service : il organise une unité ou une équipe, par exemple le plan d’animation ou l’organisation de l’unité.\n\nProjet de vie : il est individuel et évolutif. Il part des habitudes, des besoins, des souhaits et des objectifs de la personne.\n\nLa personne participe à son projet de vie selon ses capacités et son accord. La famille, les professionnels et le référent recueillent, proposent, mettent en œuvre et suivent, sans décider à sa place.\n\nQuand un souhait change : observer, écouter, proposer dans son rôle et transmettre pour le suivi.",
          },
        },
        {
          title: "Jeu : du collectif à la personne",
          type: "sorting",
          instructions: "Classer chaque décision dans le projet auquel elle appartient.",
          payload: {
            prompt: "Range chaque décision des Glycines dans le bon projet.",
            categories: [
              { id: "etablissement", label: "Projet d’établissement" },
              { id: "service", label: "Projet de service" },
              { id: "vie", label: "Projet de vie" },
            ],
            items: [
              { id: "horaires", label: "Les horaires généraux de la structure", categoryId: "etablissement" },
              { id: "bientraitance", label: "La politique de bientraitance de la structure", categoryId: "etablissement" },
              { id: "unite", label: "L’organisation de l’unité", categoryId: "service" },
              { id: "animation", label: "Le plan d’animation du service", categoryId: "service" },
              { id: "jardiner", label: "Le souhait de Mme Rose de jardiner", categoryId: "vie" },
              { id: "habitudes", label: "Les habitudes du matin d’une résidente", categoryId: "vie" },
            ],
            explanation:
              "L’établissement fixe les orientations, le service organise l’équipe, le projet de vie appartient à la personne.",
          },
        },
        {
          title: "Défi 05 : Mme Rose ne veut plus de l’atelier jardin",
          type: "qcm",
          instructions: "Déduire l’action adaptée au changement de souhait de la résidente.",
          payload: {
            question:
              "Mme Rose ne souhaite plus participer à l’atelier jardin, alors que ce souhait figure dans son projet de vie. Que fais-tu ?",
            choices: [
              { id: "proposer", label: "Respecter son refus, proposer une adaptation qui correspond à ses souhaits actuels et transmettre à l’équipe pour le suivi" },
              { id: "insister", label: "Insister, puisque le jardin est écrit dans son projet de vie" },
              { id: "supprimer", label: "Décider seul de supprimer définitivement l’atelier de son projet" },
              { id: "rien", label: "Ne rien dire à l’équipe, ce n’est qu’une activité" },
            ],
            correctChoiceIds: ["proposer"],
            explanation:
              "Le projet de vie est évolutif. Le refus et l’alternative proposée sont transmis à l’équipe, qui actualise le projet avec la personne.",
          },
        },
        {
          title: "Jeu : qui contribue au projet de vie ?",
          type: "matching",
          instructions: "Identifier la contribution de chaque acteur du projet de vie.",
          payload: {
            prompt: "Relie chaque acteur à sa contribution réelle.",
            pairs: [
              { id: "personne", left: "La personne", right: "Exprime ses souhaits et participe selon ses capacités" },
              { id: "famille", left: "La famille ou le représentant", right: "Apporte des informations sur les habitudes et le parcours" },
              { id: "professionnels", left: "Les professionnels", right: "Recueillent, proposent et mettent en œuvre dans leur rôle" },
              { id: "referent", left: "Le référent", right: "Assure le suivi et l’actualisation du projet" },
            ],
            explanation:
              "La personne est au centre. Les autres acteurs recueillent, proposent, mettent en œuvre et suivent, sans décider à sa place.",
          },
        },
        {
          title: "Vrai ou faux : un projet de vie figé",
          type: "true_false",
          instructions: "Justifier la réponse à partir de la fiche de notions.",
          payload: {
            statement: "Le projet de vie est écrit une fois pour toutes et ne change plus.",
            correctAnswer: false,
            explanation:
              "Faux : le projet de vie est individuel et évolutif. Il s’adapte aux souhaits, aux capacités et aux besoins de la personne, grâce au suivi.",
          },
        },
      ],
    },
    {
      title: "Définir les mesures de protection des majeurs et respecter les droits",
      description:
        "Présenter les principes généraux de la protection juridique et repérer ce qui reste un choix de la personne dans la vie quotidienne.",
      activities: [
        {
          title: "À retenir : la protection des majeurs",
          type: "content",
          instructions: "Repérer les trois mesures de protection présentées dans la fiche.",
          payload: {
            body: "Une mesure de protection juridique est décidée par un juge, en fonction de la situation de la personne.\n\nSauvegarde de justice : mesure de protection généralement temporaire.\n\nCuratelle : la personne est assistée pour certains actes.\n\nTutelle : la personne peut être représentée pour certains actes.\n\nCes mesures ne suppriment ni tous les droits, ni les choix de la vie quotidienne. La personne garde sa dignité et participe aux décisions qui la concernent.\n\nL’agent ne décide pas à la place de la personne pour les choix quotidiens, et n’interprète pas seul un jugement : il transmet au professionnel compétent.",
          },
        },
        {
          title: "Jeu : trois mesures, trois niveaux",
          type: "matching",
          instructions: "Définir chaque mesure de protection par sa description exacte.",
          payload: {
            prompt: "Relie chaque mesure de protection à sa description.",
            pairs: [
              { id: "sauvegarde", left: "Sauvegarde de justice", right: "Protection généralement temporaire" },
              { id: "curatelle", left: "Curatelle", right: "Assistance de la personne pour certains actes" },
              { id: "tutelle", left: "Tutelle", right: "Représentation de la personne pour certains actes" },
              { id: "juge", left: "Le juge", right: "Décide de la mesure adaptée à la situation" },
            ],
            explanation:
              "Les trois mesures n’ont pas le même niveau d’intervention. C’est le juge qui décide, jamais l’équipe.",
          },
        },
        {
          title: "Défi 06 : la tenue de Mme Yvette",
          type: "qcm",
          instructions: "Justifier la réponse à donner à une résidente sous tutelle.",
          payload: {
            question:
              "Mme Yvette est sous tutelle. Elle veut porter une tenue différente de celle préparée. Que fais-tu ?",
            choices: [
              { id: "respecter", label: "Respecter son choix, la rassurer et lui proposer les vêtements disponibles" },
              { id: "imposer", label: "Imposer la tenue préparée, puisqu’elle est sous tutelle" },
              { id: "tuteur", label: "Appeler le tuteur pour qu’il choisisse la tenue du jour" },
              { id: "juger", label: "Lui expliquer que son choix n’est pas raisonnable" },
            ],
            correctChoiceIds: ["respecter"],
            explanation:
              "La tutelle porte sur certains actes juridiques. Le choix d’une tenue reste un choix quotidien : il appartient à la personne et sa dignité doit être respectée.",
          },
        },
        {
          title: "Jeu : qui décide quoi au quotidien ?",
          type: "sorting",
          instructions: "Classer chaque situation selon la personne qui intervient réellement.",
          payload: {
            prompt: "Pour chaque situation, indique qui intervient.",
            categories: [
              { id: "personne", label: "La personne choisit" },
              { id: "representant", label: "Le représentant intervient" },
              { id: "transmettre", label: "Je transmets sans interpréter" },
            ],
            items: [
              { id: "tenue", label: "Le choix d’une tenue le matin", categoryId: "personne" },
              { id: "activite", label: "Le refus de participer à une activité", categoryId: "personne" },
              { id: "financier", label: "Une décision financière importante", categoryId: "representant" },
              { id: "contrat", label: "La signature d’un acte juridique", categoryId: "representant" },
              { id: "courrier", label: "Un document juridique reçu par la résidente", categoryId: "transmettre" },
              { id: "question", label: "Une question de la famille sur la portée de la mesure", categoryId: "transmettre" },
            ],
            explanation:
              "Les choix de la vie quotidienne restent ceux de la personne. Les actes juridiques dépendent de la mesure. Face à une question juridique, l’agent transmet.",
          },
        },
        {
          title: "Vrai ou faux : la tutelle supprime tous les choix",
          type: "true_false",
          instructions: "Expliquer ce que la mesure change réellement pour la personne.",
          payload: {
            statement:
              "Une personne sous tutelle ne peut plus exprimer aucun choix dans sa vie quotidienne.",
            correctAnswer: false,
            explanation:
              "Faux : la mesure porte sur certains actes. La personne garde des droits, participe aux décisions qui la concernent et conserve ses choix quotidiens.",
          },
        },
      ],
    },
    {
      title: "Repérer les effets du vieillissement sans généraliser",
      description:
        "Distinguer les modifications biologiques, cognitives et psychologiques liées au vieillissement, et séparer un changement progressif d’un signe inhabituel à transmettre.",
      activities: [
        {
          title: "À retenir : trois dimensions du vieillissement",
          type: "content",
          instructions: "Définir les trois dimensions présentées dans la fiche.",
          payload: {
            body: "Le vieillissement peut modifier le corps, certaines fonctions cognitives et le vécu psychologique.\n\nBiologique : ce qui concerne le corps et son fonctionnement, par exemple une force diminuée ou une audition réduite.\n\nCognitif : ce qui concerne la mémoire, l’attention et la compréhension, par exemple un temps de réponse plus long.\n\nPsychologique : ce qui concerne les émotions et le vécu, par exemple une tristesse après un décès.\n\nChaque personne vieillit différemment. Une même observation peut concerner plusieurs dimensions.\n\nJe n’infantilise pas et je ne pose pas de diagnostic. Un changement soudain ou inhabituel est transmis rapidement.",
          },
        },
        {
          title: "Jeu : classer les observations de Mme Rose",
          type: "sorting",
          instructions: "Classer chaque observation dans la dimension à laquelle elle se rattache.",
          payload: {
            prompt: "Range chaque observation faite aux Glycines.",
            categories: [
              { id: "biologique", label: "Biologique" },
              { id: "cognitif", label: "Cognitif" },
              { id: "psychologique", label: "Psychologique" },
            ],
            items: [
              { id: "force", label: "Une force diminuée pour porter son plateau", categoryId: "biologique" },
              { id: "audition", label: "Une audition réduite dans le groupe", categoryId: "biologique" },
              { id: "marche", label: "Une marche plus lente depuis plusieurs mois", categoryId: "biologique" },
              { id: "temps", label: "Un temps de réponse plus long aux questions", categoryId: "cognitif" },
              { id: "oubli", label: "Un oubli inhabituel ce matin", categoryId: "cognitif" },
              { id: "tristesse", label: "Une tristesse depuis le décès d’une amie", categoryId: "psychologique" },
            ],
            explanation:
              "Le vieillissement touche le corps, les fonctions cognitives et le vécu psychologique. Classer une observation aide à choisir l’adaptation, pas à poser un diagnostic.",
          },
        },
        {
          title: "Jeu : adapter son accompagnement",
          type: "matching",
          instructions: "Déduire l’adaptation qui correspond à chaque observation.",
          payload: {
            prompt: "Relie chaque observation à une adaptation respectueuse.",
            pairs: [
              { id: "lent", left: "Temps de réponse plus long", right: "Laisser plus de temps sans finir ses phrases" },
              { id: "audition", left: "Audition réduite", right: "Se placer face à la personne et réduire le bruit" },
              { id: "marche", left: "Marche ralentie", right: "Sécuriser le déplacement et proposer un appui" },
              { id: "tristesse", left: "Tristesse persistante", right: "Écouter sans infantiliser et transmettre à l’équipe" },
            ],
            explanation:
              "L’adaptation part des capacités réelles observées. Elle maintient la participation de la personne et évite tout jugement.",
          },
        },
        {
          title: "Défi 07 : habituel ou inhabituel ?",
          type: "qcm",
          instructions: "Repérer le changement qui doit être transmis rapidement.",
          payload: {
            question:
              "Mme Rose marche plus lentement depuis des mois, entend moins bien depuis longtemps, est triste depuis un décès, et paraît soudain confuse ce matin. Quel élément transmets-tu en priorité ?",
            choices: [
              { id: "confusion", label: "La confusion apparue ce matin, parce qu’elle est soudaine et inhabituelle" },
              { id: "marche", label: "La marche ralentie, installée depuis plusieurs mois" },
              { id: "audition", label: "L’audition réduite, connue de l’équipe" },
              { id: "tristesse", label: "La tristesse, déjà notée après le décès" },
            ],
            correctChoiceIds: ["confusion"],
            explanation:
              "Les changements progressifs sont déjà connus et suivis. Un changement soudain est un signe inhabituel : il se transmet rapidement, avec la date, le contexte et les faits.",
          },
        },
        {
          title: "Vrai ou faux : nommer la maladie",
          type: "true_false",
          instructions: "Expliquer la limite du rôle de l’agent face à une observation.",
          payload: {
            statement:
              "En observant une confusion soudaine, l’agent peut indiquer dans la transmission la maladie dont il s’agit.",
            correctAnswer: false,
            explanation:
              "Faux : l’agent décrit des faits observés, datés et contextualisés. Le diagnostic relève d’un professionnel de santé.",
          },
        },
      ],
    },
    {
      title: "Déduire l’aide juste à partir du degré d’autonomie",
      description:
        "Utiliser les informations du projet de vie et d’une grille simplifiée pour ajuster l’aide, puis repérer les facilitateurs et les obstacles de l’environnement.",
      activities: [
        {
          title: "À retenir : autonomie, dépendance et environnement",
          type: "content",
          instructions: "Repérer ce que l’agent peut faire et ce qu’il ne fait pas.",
          payload: {
            body: "L’autonomie est la capacité de décider et d’agir dans sa vie quotidienne. Elle varie selon les actes et selon les moments.\n\nLa dépendance est le besoin d’aide pour réaliser certains actes.\n\nAGGIR est une grille utilisée par des professionnels pour apprécier l’autonomie. L’élève exploite des informations, il ne calcule pas seul un GIR.\n\nAider juste ce qu’il faut : laisser faire ce qui est possible, compléter seulement ce qui est nécessaire, encourager sans faire à la place.\n\nUn environnement peut faciliter ou limiter le déplacement. Un facilitateur aide la personne à agir, par exemple un bon éclairage. Un obstacle la gêne, par exemple un meuble dans le passage.",
          },
        },
        {
          title: "Défi 08 : l’aide juste pour M. Karim",
          type: "qcm",
          instructions: "Déduire l’aide adaptée à partir des capacités observées.",
          payload: {
            question:
              "M. Karim réalise seul sa toilette du visage. Quelle attitude maintient sa participation ?",
            choices: [
              { id: "laisser", label: "Le laisser faire, préparer le matériel à portée et rester disponible" },
              { id: "faire", label: "Réaliser la toilette à sa place, ce sera plus rapide" },
              { id: "refuser", label: "Refuser toute présence, puisqu’il est autonome pour cet acte" },
              { id: "global", label: "Décider qu’il est autonome pour tous les actes de la journée" },
            ],
            correctChoiceIds: ["laisser"],
            explanation:
              "On laisse faire ce que la personne peut réaliser et on complète seulement ce qui est nécessaire. L’autonomie s’apprécie acte par acte.",
          },
        },
        {
          title: "Jeu : lire une grille simplifiée",
          type: "sorting",
          instructions: "Classer chaque acte de M. Karim selon le niveau d’aide nécessaire.",
          payload: {
            prompt:
              "À partir de l’observation et du projet de vie de M. Karim, range chaque acte.",
            categories: [
              { id: "seul", label: "Fait seul" },
              { id: "partielle", label: "Aide partielle" },
              { id: "importante", label: "Aide importante" },
            ],
            items: [
              { id: "visage", label: "Toilette du visage", categoryId: "seul" },
              { id: "repas", label: "Manger son repas installé à table", categoryId: "seul" },
              { id: "vetements", label: "Choisir ses vêtements", categoryId: "partielle" },
              { id: "deplacement", label: "Se déplacer avec sa canne vers la salle à manger", categoryId: "partielle" },
              { id: "douche", label: "Toilette complète du corps", categoryId: "importante" },
            ],
            explanation:
              "Les capacités se séparent activité par activité. Une seule difficulté ne permet pas de déduire un niveau d’autonomie global.",
          },
        },
        {
          title: "Jeu : facilitateur ou obstacle ?",
          type: "sorting",
          instructions: "Classer chaque élément de la chambre selon son effet sur le déplacement.",
          payload: {
            prompt: "Dans la chambre de M. Karim, range chaque élément observé.",
            categories: [
              { id: "facilitateur", label: "Facilitateur" },
              { id: "obstacle", label: "Obstacle" },
            ],
            items: [
              { id: "eclairage", label: "Un éclairage suffisant la nuit", categoryId: "facilitateur" },
              { id: "repere", label: "Un repère contrasté sur le chemin des toilettes", categoryId: "facilitateur" },
              { id: "barre", label: "Une barre d’appui bien fixée", categoryId: "facilitateur" },
              { id: "table", label: "Une table posée dans le passage", categoryId: "obstacle" },
              { id: "cable", label: "Un câble qui traverse le sol", categoryId: "obstacle" },
              { id: "tapis", label: "Un tapis qui glisse", categoryId: "obstacle" },
            ],
            explanation:
              "Décrire les caractéristiques d’un environnement facilitant ou limitant fait partie de l’analyse. L’adaptation se fait dans ses limites, avec l’accord de la personne, puis se transmet.",
          },
        },
        {
          title: "Vrai ou faux : calculer le GIR",
          type: "true_false",
          instructions: "Justifier la réponse à partir de la fiche de notions.",
          payload: {
            statement: "L’élève calcule seul le GIR d’un résident à partir de la grille AGGIR.",
            correctAnswer: false,
            explanation:
              "Faux : AGGIR est utilisée par des professionnels. L’élève exploite des informations sur l’autonomie et respecte les consignes de l’équipe.",
          },
        },
      ],
    },
    {
      title: "Traiter une situation d’accueil complète aux Glycines",
      description:
        "Réinvestir les trois compétences du module sur l’arrivée d’une nouvelle résidente : sélectionner les informations fiables, ajuster l’aide et sécuriser l’environnement.",
      activities: [
        {
          title: "La méthode attendue à l’épreuve",
          type: "content",
          instructions: "Repérer les quatre étapes attendues dans une réponse construite.",
          payload: {
            body: "Face à une situation professionnelle, la réponse suit toujours les mêmes étapes.\n\n1. Repérer les faits utiles : qui, où, quand, ce qui est observé.\n\n2. Vérifier la source : auteur identifiable, date, organisme, information recoupée.\n\n3. Agir dans son rôle : ce que je peux faire, ce que je sécurise, ce que je ne fais pas seul.\n\n4. Transmettre : des faits précis, datés, adressés au bon professionnel, sans interprétation.\n\nCette méthode vaut pour l’accueil d’un résident comme pour l’analyse d’une activité en PFMP.",
          },
        },
        {
          title: "Mission Glycines 01 : préparer l’accueil de Mme Denise",
          type: "qcm",
          instructions: "Identifier l’information qui peut être utilisée comme un fait.",
          payload: {
            question:
              "Pour préparer l’accueil de Mme Denise, quatre éléments arrivent. Lequel peux-tu utiliser directement comme un fait ?",
            choices: [
              { id: "dossier", label: "Le dossier d’accueil daté et les paroles de Mme Denise elle-même" },
              { id: "note", label: "Une note anonyme trouvée dans le bureau" },
              { id: "couloir", label: "Une remarque entendue dans le couloir" },
              { id: "reseau", label: "Un commentaire publié sur un réseau social" },
            ],
            correctChoiceIds: ["dossier"],
            explanation:
              "Priorité aux paroles de la personne et aux documents identifiés et récents. Une information anonyme non vérifiée n’est pas utilisée comme fait.",
          },
        },
        {
          title: "Mission Glycines 02 : ajuster l’aide",
          type: "qcm",
          instructions: "Justifier le choix d’une aide graduée pour Mme Denise.",
          payload: {
            question:
              "Mme Denise s’habille seule mais a besoin d’aide pour boutonner son gilet. Quelle aide proposes-tu ?",
            choices: [
              { id: "graduee", label: "La laisser s’habiller et n’intervenir que pour le boutonnage, en lui proposant de choisir sa tenue" },
              { id: "tout", label: "L’habiller entièrement pour gagner du temps" },
              { id: "rien", label: "Ne rien proposer, puisqu’elle s’habille seule" },
              { id: "decider", label: "Choisir sa tenue à sa place pour éviter l’hésitation" },
            ],
            correctChoiceIds: ["graduee"],
            explanation:
              "L’aide se règle sur les capacités réelles et sur le projet de vie. La participation et les souhaits de la personne sont recherchés.",
          },
        },
        {
          title: "Mission Glycines 03 : sécuriser et transmettre",
          type: "qcm",
          instructions: "Indiquer l’action correcte face à un matériel défectueux.",
          payload: {
            question:
              "Dans la chambre de Mme Denise, une barre d’appui bouge et le stock de protections est presque vide. Que fais-tu ?",
            choices: [
              { id: "relais", label: "Ne pas utiliser la barre, signaler le défaut à la maintenance, alerter sur le stock et tracer la transmission" },
              { id: "reparer", label: "Resserrer toi-même la barre avec les outils trouvés dans le local" },
              { id: "utiliser", label: "L’utiliser quand même en prévenant Mme Denise d’être prudente" },
              { id: "plus_tard", label: "Attendre la visite de la famille pour en parler" },
            ],
            correctChoiceIds: ["relais"],
            explanation:
              "Il faut différencier la correction immédiate autorisée, le balisage, la demande de maintenance et le signalement de stock. La transmission est factuelle, datée et adressée.",
          },
        },
        {
          title: "Vrai ou faux : le secret professionnel à l’accueil",
          type: "true_false",
          instructions: "Expliquer ce que la confidentialité impose à l’accueil.",
          payload: {
            statement:
              "Un visiteur peut obtenir les informations du dossier de Mme Denise s’il dit être un proche.",
            correctAnswer: false,
            explanation:
              "Faux : le secret et la vie privée sont protégés. L’agent n’a pas à communiquer ces informations et oriente la demande vers le professionnel compétent.",
          },
        },
        {
          title: "Jeu : reconstituer le module CT3",
          type: "sorting",
          instructions: "Classer chaque notion dans la compétence à laquelle elle appartient.",
          payload: {
            prompt: "Range chaque notion travaillée dans la séquence.",
            categories: [
              { id: "ct31", label: "CT3.1 Cadre de l’intervention" },
              { id: "ct32", label: "CT3.2 Degré d’autonomie" },
              { id: "ct33", label: "CT3.3 Ressources et contraintes techniques" },
            ],
            items: [
              { id: "structures", label: "Structures d’accueil et missions", categoryId: "ct31" },
              { id: "projets", label: "Projets d’établissement, de service et de vie", categoryId: "ct31" },
              { id: "majeurs", label: "Protection des majeurs vulnérables", categoryId: "ct31" },
              { id: "roles", label: "Rôles, limites et relais dans l’équipe", categoryId: "ct31" },
              { id: "vieillissement", label: "Vieillissement, perte d’autonomie et dépendance", categoryId: "ct32" },
              { id: "aggir", label: "Outils d’évaluation de l’autonomie", categoryId: "ct32" },
              { id: "environnement", label: "Environnement facilitant ou limitant le déplacement", categoryId: "ct33" },
              { id: "materiel", label: "Matériel, produits et état du stock", categoryId: "ct33" },
            ],
            explanation:
              "Le module CT3 réunit trois compétences : identifier le cadre de son intervention, prendre en compte le degré d’autonomie, identifier les ressources et les contraintes techniques.",
          },
        },
      ],
    },
  ],
};
