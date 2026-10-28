import type { InitialLearningSequence } from "./catalog-types";

// Séquence PSE de 1 TCI — module C6 « L'analyse d'un risque spécifique au secteur professionnel ».
// Traçabilité complète des sources : docs/mapping-pedagogique-1-tci-c6.md
export const pse1TciC6Sequence: InitialLearningSequence = {
  title: "C6. L'analyse d'un risque spécifique au secteur professionnel",
  description:
    "Tu vas apprendre à repérer un risque propre à la chaudronnerie, comprendre ses effets et proposer des mesures de prévention hiérarchisées, à partir de situations de l'atelier CDE.",
  lessons: [
    {
      title: "Repérer les risques spécifiques du métier",
      description:
        "Repérer les natures de risques présentes dans quatre activités observées à l'atelier, puis identifier le risque propre au métier de la chaudronnerie.",
      activities: [
        {
          title: "Décodage des consignes : les verbes de l'épreuve",
          type: "matching",
          instructions:
            "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
          payload: {
            prompt: "Chaque verbe de consigne attend une production précise. Relie chaque verbe à son sens exact.",
            pairs: [
              { id: "reperer", left: "Repérer", right: "Examiner avec précision, puis lister" },
              { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
              { id: "decrire", left: "Décrire", right: "Dire ce que l'on voit" },
              { id: "classer", left: "Classer", right: "Ranger des éléments dans l'ordre ou la manière indiquée" },
              { id: "comparer", left: "Comparer", right: "Présenter les points communs et les différences entre plusieurs éléments" },
              { id: "nommer", left: "Nommer", right: "Donner un nom" },
              { id: "justifier", left: "Justifier", right: "Trouver dans les documents les éléments qui montrent la réalité d'une affirmation" },
              { id: "formuler", left: "Formuler", right: "Rédiger le résultat dans le contexte de l'exercice" },
            ],
            explanation:
              "Ces huit verbes sont ceux employés dans les consignes de la séquence, et ceux de l'épreuve de PSE. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
          },
        },
        {
          title: "À retenir : risque spécifique et natures de risque",
          type: "content",
          instructions: "Repérer les natures de risques présentes dans une activité observée à l'atelier.",
          payload: {
            body: "Pendant une visite de l'atelier CDE, Karim coupe une tôle à la cisaille, Élodie meule un cordon de soudure, deux compagnons déplacent une virole et un soudeur assemble des pièces au poste MIG-MAG. M. Berthier demande de repérer les risques du métier.\n\nUn risque spécifique caractérise un secteur professionnel : il est lié à ses matériaux, ses outils et ses procédés. On le repère à partir de l'activité réelle, du document unique d'évaluation des risques et des fiches de données de sécurité. Les statistiques d'accidents du travail et de maladies professionnelles du secteur aident aussi à le repérer.\n\nLes principales natures de risques sont : mécanique (coupure, écrasement, choc, projection) ; physique (bruit, vibrations, rayonnements, ambiance thermique) ; chimique (poussières, fumées, vapeurs, produits) ; électrique (contact direct ou indirect avec la tension) ; activité physique (manutention, postures, gestes répétés).\n\nUne même intervention peut cumuler plusieurs natures de risques. La chaudronnerie cumule des risques mécaniques, physiques, chimiques, électriques et liés à l'activité physique ; le risque spécifique, lié aux matériaux et procédés du métier, est chez CDE celui des fumées de soudage.",
          },
        },
        {
          title: "Défi 01 : la nature du risque au meulage",
          type: "qcm",
          instructions: "Classer le danger du meulage dans sa nature de risque.",
          payload: {
            question: "Élodie meule un cordon de soudure : des étincelles et des poussières métalliques sont projetées. De quelle(s) nature(s) de risque s'agit-il principalement ?",
            choices: [
              { id: "mecanique_physique", label: "Un risque mécanique (projections) et un risque physique (bruit)" },
              { id: "electrique", label: "Uniquement un risque électrique" },
              { id: "aucun", label: "Ce n'est pas un risque professionnel" },
              { id: "activite_seule", label: "Uniquement un risque lié à l'activité physique" },
            ],
            correctChoiceIds: ["mecanique_physique"],
            explanation:
              "Les projections d'étincelles relèvent du risque mécanique, et le bruit de la meuleuse d'un risque physique ; une même intervention peut cumuler plusieurs natures de risques.",
          },
        },
        {
          title: "Défi 02 : le risque propre au métier",
          type: "qcm",
          instructions: "Identifier le risque spécifique à la chaudronnerie chez CDE.",
          payload: {
            question: "Chez CDE, quel risque est le plus directement lié aux matériaux et procédés propres au métier de la chaudronnerie ?",
            choices: [
              { id: "fumees", label: "Les fumées de soudage, dégagées lors de l'assemblage au poste MIG-MAG" },
              { id: "chute_objet", label: "La chute d'un objet quelconque, possible dans n'importe quel métier" },
              { id: "froid", label: "Le froid en hiver, qui touche tous les secteurs" },
              { id: "stress", label: "Le stress, présent dans toutes les professions" },
            ],
            correctChoiceIds: ["fumees"],
            explanation:
              "Un risque spécifique est lié aux matériaux et procédés du métier : chez CDE, ce sont les fumées de soudage, propres au procédé de soudage.",
          },
        },
        {
          title: "Jeu : classer les dangers observés à l'atelier",
          type: "sorting",
          instructions: "Classer chaque danger observé selon sa nature de risque.",
          payload: {
            prompt: "Plusieurs dangers observés chez CDE. À quelle nature de risque chacun appartient-il ?",
            categories: [
              { id: "mecanique", label: "Risque mécanique" },
              { id: "physique", label: "Risque physique" },
              { id: "chimique", label: "Risque chimique" },
              { id: "activite_physique", label: "Risque lié à l'activité physique" },
            ],
            items: [
              { id: "coupure", label: "Une coupure lors de la découpe à la cisaille", categoryId: "mecanique" },
              { id: "projection", label: "Une projection d'étincelles au meulage", categoryId: "mecanique" },
              { id: "bruit", label: "Le bruit d'une meuleuse ou d'une cisaille", categoryId: "physique" },
              { id: "fumees", label: "Les fumées fines dégagées au poste MIG-MAG", categoryId: "chimique" },
              { id: "degraissant", label: "Les vapeurs d'un dégraissant utilisé sur une pièce", categoryId: "chimique" },
              { id: "virole", label: "Le déplacement d'une virole par deux compagnons", categoryId: "activite_physique" },
              { id: "posture", label: "Une posture courbée au-dessus d'un cordon de soudure", categoryId: "activite_physique" },
            ],
            explanation:
              "Chaque danger appartient à une nature de risque précise. Une même intervention, comme le soudage, peut cumuler plusieurs natures à la fois (chimique, physique, activité physique).",
          },
        },
        {
          title: "Vrai ou faux : plusieurs natures de risques en même temps",
          type: "true_false",
          instructions: "Justifier si une intervention peut cumuler plusieurs natures de risques.",
          payload: {
            statement: "Une même intervention peut cumuler plusieurs natures de risques.",
            correctAnswer: true,
            explanation:
              "Vrai : le meulage cumule par exemple le risque mécanique (projections), le risque physique (bruit) et le risque lié à l'activité physique (posture penchée).",
          },
        },
        {
          title: "Vrai ou faux : le bruit, un risque mécanique ?",
          type: "true_false",
          instructions: "Expliquer à quelle nature de risque appartient le bruit d'un outil.",
          payload: {
            statement: "Le bruit d'un outil relève du risque mécanique.",
            correctAnswer: false,
            explanation:
              "Faux : le bruit est un risque physique. Le risque mécanique concerne les coupures, écrasements, chocs et projections.",
          },
        },
        {
          title: "Vrai ou faux : l'expérience supprime le risque",
          type: "true_false",
          instructions: "Justifier si l'expérience d'un opérateur supprime un risque.",
          payload: {
            statement: "L'expérience de l'opérateur supprime les risques du poste.",
            correctAnswer: false,
            explanation:
              "Faux : le danger reste présent même pour un opérateur expérimenté. La prévention reste nécessaire dans tous les cas.",
          },
        },
        {
          title: "Jeu : relier chaque nature de risque à sa définition",
          type: "matching",
          instructions: "Définir chaque nature de risque en la reliant à son sens exact.",
          payload: {
            prompt: "Les cinq natures de risque du module, à reconstituer.",
            pairs: [
              { id: "risque_specifique", left: "Risque spécifique", right: "Risque propre à un secteur professionnel" },
              { id: "mecanique", left: "Risque mécanique", right: "Coupure, écrasement, choc, projection" },
              { id: "physique", left: "Risque physique", right: "Bruit, vibrations, rayonnements, ambiance thermique" },
              { id: "chimique", left: "Risque chimique", right: "Poussières, fumées, vapeurs, produits" },
              { id: "activite_physique", left: "Risque lié à l'activité physique", right: "Manutention, postures, gestes répétés" },
            ],
            explanation:
              "Ces notions permettent de repérer, puis de nommer précisément, le risque spécifique d'une situation professionnelle.",
          },
        },
      ],
    },
    {
      title: "Analyser les fumées de soudage et leurs effets",
      description:
        "Construire le processus d'apparition du dommage pour une exposition aux fumées de soudage, et expliquer les effets possibles sur la santé.",
      activities: [
        {
          title: "À retenir : le processus d'apparition du dommage",
          type: "content",
          instructions: "Expliquer comment les fumées de soudage entrent dans l'organisme et quels effets elles peuvent provoquer.",
          payload: {
            body: "Au poste MIG-MAG, Karim soude penché au-dessus de la pièce. Le bras de captage est placé derrière lui : le panache de fumée monte droit dans son visage. En fin de journée, il a les yeux qui piquent et la gorge irritée.\n\nLe soudage fait fondre le métal : il émet des fumées, faites de très fines particules métalliques et de gaz. Elles entrent par inhalation : nez ou bouche, puis trachée et bronches. Très fines, les particules atteignent les alvéoles pulmonaires. Le panache monte : la tête au-dessus de la pièce est dans la fumée.\n\nLe danger, ici, ce sont les fumées de soudage. La situation dangereuse est le moment où Karim, en soudant, se trouve exposé dans sa zone respiratoire.\n\nUne affection aiguë apparaît vite : irritation des yeux et de la gorge, fièvre des métaux. Une affection chronique s'installe après des expositions répétées : bronchite chronique, asthme. Les fumées de soudage sont classées cancérogènes pour l'homme par le CIRC depuis 2017.\n\nPour décider quoi traiter d'abord, on cote le risque : la gravité du dommage et la probabilité d'occurrence donnent le niveau de priorité.",
          },
        },
        {
          title: "Défi 03 : le trajet des fumées",
          type: "qcm",
          instructions: "Expliquer par quelle voie les fumées de soudage entrent dans l'organisme.",
          payload: {
            question: "Par quelle voie les fumées de soudage entrent-elles principalement dans l'organisme ?",
            choices: [
              { id: "inhalation", label: "Par inhalation : nez ou bouche, puis trachée et bronches" },
              { id: "ingestion", label: "Uniquement par ingestion, en mangeant" },
              { id: "sang", label: "Directement dans le sang, sans passer par les voies respiratoires" },
              { id: "aucune", label: "Elles ne pénètrent jamais dans l'organisme" },
            ],
            correctChoiceIds: ["inhalation"],
            explanation:
              "Les fumées entrent surtout par inhalation. Très fines, les particules métalliques peuvent atteindre les alvéoles pulmonaires.",
          },
        },
        {
          title: "Défi 04 : aiguë ou chronique",
          type: "qcm",
          instructions: "Déduire si un effet observé est une affection aiguë ou chronique.",
          payload: {
            question: "Karim a les yeux qui piquent le soir même d'une séance de soudage. De quel type d'effet s'agit-il ?",
            choices: [
              { id: "aigue", label: "Une affection aiguë, qui apparaît vite après une exposition courte" },
              { id: "chronique", label: "Une affection chronique, qui s'installe après des expositions répétées" },
              { id: "aucun_effet", label: "Aucun effet, l'irritation n'a pas de lien avec le soudage" },
              { id: "guerison", label: "Un signe que son organisme est désormais protégé" },
            ],
            correctChoiceIds: ["aigue"],
            explanation:
              "Une affection aiguë apparaît vite, après une exposition courte, comme une irritation des yeux ou de la gorge. Une affection chronique s'installe après des expositions répétées.",
          },
        },
        {
          title: "Jeu : construire le processus d'apparition du dommage",
          type: "sorting",
          instructions: "Classer chaque élément de la situation dans l'étape du processus qui lui correspond.",
          payload: {
            prompt: "Quatre étapes du processus d'apparition du dommage. Range chaque élément à sa place.",
            categories: [
              { id: "danger", label: "Danger" },
              { id: "situation_dangereuse", label: "Situation dangereuse" },
              { id: "evenement_declencheur", label: "Événement déclencheur" },
              { id: "dommage", label: "Dommage" },
            ],
            items: [
              { id: "fumees", label: "Les fumées de soudage", categoryId: "danger" },
              { id: "expose", label: "Karim soude, le panache traverse sa zone respiratoire", categoryId: "situation_dangereuse" },
              { id: "captage_mal_place", label: "Le bras de captage placé derrière lui laisse monter le panache vers son visage", categoryId: "evenement_declencheur" },
              { id: "yeux", label: "Les yeux qui piquent et la gorge irritée observés le soir", categoryId: "dommage" },
            ],
            explanation:
              "Le danger (les fumées) devient une situation dangereuse quand l'opérateur y est exposé ; un événement déclencheur (le captage mal placé) provoque alors le dommage observé.",
          },
        },
        {
          title: "Vrai ou faux : l'apparition d'une affection aiguë",
          type: "true_false",
          instructions: "Justifier le délai d'apparition d'une affection aiguë.",
          payload: {
            statement: "Une affection aiguë apparaît toujours plusieurs années après l'exposition.",
            correctAnswer: false,
            explanation: "Faux : une affection aiguë apparaît rapidement après l'exposition, à la différence d'une affection chronique.",
          },
        },
        {
          title: "Vrai ou faux : plus fine, plus loin",
          type: "true_false",
          instructions: "Expliquer le lien entre la taille d'une particule et sa pénétration dans l'organisme.",
          payload: {
            statement: "Plus une particule de fumée de soudage est fine, plus elle pénètre loin dans les voies respiratoires.",
            correctAnswer: true,
            explanation: "Vrai : les particules les plus fines peuvent atteindre les alvéoles pulmonaires.",
          },
        },
        {
          title: "Vrai ou faux : le masque suffit-il ?",
          type: "true_false",
          instructions: "Justifier si porter un masque dispense d'analyser le poste.",
          payload: {
            statement: "Porter un masque dispense d'analyser le poste de travail.",
            correctAnswer: false,
            explanation: "Faux : l'analyse du poste et les mesures à la source restent prioritaires ; le masque ne remplace pas cette analyse.",
          },
        },
        {
          title: "Jeu : relier le lexique du processus",
          type: "matching",
          instructions: "Définir chaque notion en la reliant à son sens exact.",
          payload: {
            prompt: "Le lexique du processus d'apparition du dommage, à reconstituer.",
            pairs: [
              { id: "danger", left: "Danger", right: "Fumées de soudage" },
              { id: "situation_dangereuse", left: "Situation dangereuse", right: "Opérateur exposé dans sa zone respiratoire" },
              { id: "affection_aigue", left: "Affection aiguë", right: "Atteinte rapide après l'exposition" },
              { id: "affection_chronique", left: "Affection chronique", right: "Atteinte après des expositions répétées" },
              { id: "gravite_probabilite", left: "Gravité et probabilité", right: "Leur cotation donne le niveau de priorité" },
            ],
            explanation:
              "Ces notions permettent d'expliquer précisément comment un danger devient un dommage pour la santé.",
          },
        },
      ],
    },
    {
      title: "Hiérarchiser les mesures de prévention",
      description:
        "Proposer des mesures de prévention hiérarchisées pour le poste MIG-MAG, en justifiant l'ordre retenu.",
      activities: [
        {
          title: "À retenir : hiérarchiser les mesures de prévention",
          type: "content",
          instructions: "Proposer des mesures de prévention hiérarchisées en lien avec le risque analysé.",
          payload: {
            body: "CDE veut améliorer le poste MIG-MAG. Sur la table : une torche aspirante, le repositionnement du bras de captage, la ventilation de l'atelier, des masques de soudage à ventilation assistée et une formation. M. Berthier demande dans quel ordre agir.\n\nLes principes généraux de prévention demandent d'éviter les risques et de combattre les risques à la source, de remplacer ce qui est dangereux par ce qui l'est moins, de donner la priorité aux mesures de protection collective sur la protection individuelle, et de donner les instructions appropriées aux travailleurs.\n\nLa suppression du risque consiste à éviter le danger ou à le remplacer. La réduction du risque consiste à le combattre à la source. La protection collective protège toutes les personnes de la zone ; la protection individuelle est un équipement porté par une personne. La formation et l'information donnent les connaissances et les consignes nécessaires.\n\nOn cherche donc d'abord à supprimer ou remplacer, puis à réduire le risque à la source. La protection collective passe avant l'équipement individuel. La formation et l'information complètent les mesures techniques, sans les remplacer. Chaque mesure se justifie par le risque analysé.",
          },
        },
        {
          title: "Défi 05 : la mesure à privilégier en premier",
          type: "qcm",
          instructions: "Classer les mesures de prévention selon leur ordre de priorité.",
          payload: {
            question: "Au poste MIG-MAG, quelle mesure doit être envisagée en priorité, selon les principes généraux de prévention ?",
            choices: [
              { id: "source", label: "Réduire le risque à la source, par exemple avec une torche aspirante" },
              { id: "masque_seul", label: "Fournir uniquement des masques de soudage, sans autre mesure" },
              { id: "formation_seule", label: "Former les soudeurs, sans modifier le poste" },
              { id: "rien", label: "Ne rien faire, l'exposition est déjà faible" },
            ],
            correctChoiceIds: ["source"],
            explanation:
              "Les principes généraux de prévention demandent de combattre le risque à la source avant de recourir à la protection individuelle ou à la seule formation.",
          },
        },
        {
          title: "Défi 06 : pourquoi le masque ne suffit pas",
          type: "qcm",
          instructions: "Expliquer pourquoi un masque de soudage ne suffit pas seul.",
          payload: {
            question: "Pourquoi un masque de soudage ne suffit-il pas à lui seul pour protéger du risque chimique au poste MIG-MAG ?",
            choices: [
              { id: "protege_un_seul", label: "Parce qu'il ne protège que la personne qui le porte, alors qu'une mesure collective protège tout l'atelier" },
              { id: "inutile", label: "Parce qu'un masque de soudage n'a aucun effet sur les fumées" },
              { id: "remplace_source", label: "Parce qu'il remplace totalement la réduction du risque à la source" },
              { id: "interdit", label: "Parce que le port du masque est interdit dans l'atelier" },
            ],
            correctChoiceIds: ["protege_un_seul"],
            explanation:
              "Un équipement de protection individuelle, comme le masque, ne protège que celui qui le porte. La protection collective, elle, protège tout l'atelier, et passe donc avant l'équipement individuel.",
          },
        },
        {
          title: "Jeu : classer les mesures dans l'escalier de prévention",
          type: "sorting",
          instructions: "Classer chaque mesure selon le principe de prévention qu'elle illustre.",
          payload: {
            prompt: "Cinq mesures envisagées au poste MIG-MAG. À quel principe chacune correspond-elle ?",
            categories: [
              { id: "suppression", label: "Suppression ou remplacement du risque" },
              { id: "reduction", label: "Réduction du risque à la source" },
              { id: "collective", label: "Protection collective" },
              { id: "individuelle", label: "Protection individuelle" },
              { id: "formation", label: "Formation et information" },
            ],
            items: [
              { id: "torche_aspirante", label: "Une torche aspirante", categoryId: "reduction" },
              { id: "repositionner", label: "Repositionner le bras de captage au plus près de l'arc", categoryId: "reduction" },
              { id: "ventilation", label: "Une ventilation générale de l'atelier", categoryId: "collective" },
              { id: "masque", label: "Des masques de soudage à ventilation assistée", categoryId: "individuelle" },
              { id: "formation_item", label: "Une formation sur le bon usage du captage", categoryId: "formation" },
            ],
            explanation:
              "La prévention se hiérarchise : on agit d'abord sur la source du risque, puis sur la protection collective, puis individuelle, la formation complétant l'ensemble.",
          },
        },
        {
          title: "Vrai ou faux : la formation remplace le captage",
          type: "true_false",
          instructions: "Justifier si la formation peut remplacer une mesure technique.",
          payload: {
            statement: "Former les soudeurs suffit à remplacer le captage des fumées à la source.",
            correctAnswer: false,
            explanation: "Faux : la formation complète les mesures techniques, elle ne les remplace pas.",
          },
        },
        {
          title: "Vrai ou faux : capter à la source",
          type: "true_false",
          instructions: "Expliquer l'intérêt de capter un polluant à la source.",
          payload: {
            statement: "Capter le polluant à la source réduit sa dispersion dans l'atelier.",
            correctAnswer: true,
            explanation: "Vrai : le polluant est aspiré avant d'atteindre la zone respiratoire du soudeur, ce qui limite sa dispersion.",
          },
        },
        {
          title: "Vrai ou faux : la protection individuelle complète la collective",
          type: "true_false",
          instructions: "Justifier le rôle de la protection individuelle par rapport à la protection collective.",
          payload: {
            statement: "Un équipement de protection individuelle complète une protection collective.",
            correctAnswer: true,
            explanation: "Vrai : il protège du risque qui reste malgré les mesures collectives déjà en place.",
          },
        },
        {
          title: "Jeu : relier chaque principe de prévention à sa définition",
          type: "matching",
          instructions: "Définir chaque principe de prévention en le reliant à son sens exact.",
          payload: {
            prompt: "L'escalier de prévention, à reconstituer.",
            pairs: [
              { id: "suppression", left: "Suppression du risque", right: "Éviter le danger ou le remplacer" },
              { id: "reduction", left: "Réduction du risque", right: "Le combattre à la source" },
              { id: "collective", left: "Protection collective", right: "Protège toutes les personnes de la zone" },
              { id: "individuelle", left: "Protection individuelle", right: "Équipement porté par une personne" },
              { id: "formation", left: "Formation et information", right: "Donnent les connaissances et les consignes" },
            ],
            explanation:
              "Cette hiérarchie, tirée des principes généraux de prévention, permet de proposer des mesures justifiées plutôt que choisies au hasard.",
          },
        },
      ],
    },
  ],
};
