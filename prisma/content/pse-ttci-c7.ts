import type { InitialLearningSequence } from "./catalog-types";

// Séquence PSE de T TCI — module C7 « Le suivi de la santé au travail ».
// Traçabilité complète des sources : docs/mapping-pedagogique-t-tci.md
//
// Ce module est la source unique de ce contenu : il alimente à la fois le seed
// de développement (prisma/seed.ts) et l'import ciblé, additif et sans
// écrasement, de scripts/import-contenus.ts.
export const pseTTciC7Sequence: InitialLearningSequence = {
  title: "C7. Le suivi de la santé au travail",
  description:
    "Module C7 du programme de PSE de terminale professionnelle (arrêté du 3 avril 2019, annexe 2). Objectif : faire travailler les élèves sur les compétences C1, C3 et C6 du référentiel à travers les exercices réalisés. Situation fil rouge de la classe : l'atelier de chaudronnerie Chaudronnerie de l'Estuaire (CDE). La position indique uniquement l'ordre d'affichage.",
  lessons: [
    {
      title:
        "Identifier les modalités de suivi individuel médical des salariés",
      description:
        "Distinguer la visite d'information et de prévention, l'examen médical d'aptitude et le suivi individuel renforcé à partir de la reprise d'Élodie sur sa machine chez CDE.",
      activities: [
        {
          title: "Décodage des consignes : les verbes de l’épreuve",
          type: "matching",
          instructions:
            "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
          payload: {
            prompt:
              "Chaque verbe de consigne attend une production précise. Relie chaque verbe à son sens exact.",
            pairs: [
              {
                id: "identifier",
                left: "Identifier",
                right: "Reconnaître et nommer",
              },
              {
                id: "reperer",
                left: "Repérer",
                right: "Examiner avec précision, puis lister",
              },
              {
                id: "classer",
                left: "Classer",
                right:
                  "Ranger des éléments dans l’ordre ou la manière indiquée",
              },
              {
                id: "definir",
                left: "Définir",
                right: "Donner le sens précis d’une notion ou d’un mot",
              },
              {
                id: "deduire",
                left: "Déduire",
                right: "Établir une conséquence logique",
              },
              {
                id: "expliquer",
                left: "Expliquer",
                right: "Rendre clair et compréhensible par une argumentation",
              },
              {
                id: "justifier",
                left: "Justifier",
                right:
                  "Trouver dans les documents les éléments qui montrent la réalité d’une affirmation",
              },
            ],
            explanation:
              "Ces verbes sont ceux des consignes de l’épreuve de PSE. Repérer le verbe avant de répondre permet de savoir ce qui est réellement attendu.",
          },
        },
        {
          title: "À retenir : VIP, EMA et suivi individuel renforcé",
          type: "content",
          instructions:
            "Repérer les trois modalités de suivi médical présentées dans la fiche.",
          payload: {
            body: "Élodie reçoit une convocation du service de prévention et de santé au travail avant de reprendre sa machine à commande numérique chez CDE.\n\nLe suivi de santé dépend du poste réellement occupé et des expositions, jamais du seul nom du métier.\n\nLa visite d’information et de prévention (VIP) informe le salarié sur les risques de son poste et sur les moyens de prévention. Elle fait le point sur sa situation.\n\nL’examen médical d’aptitude (EMA) est prévu pour certains postes présentant des risques particuliers. Il vérifie l’aptitude avant l’affectation à ce poste.\n\nUn suivi individuel renforcé s’applique lorsque l’exposition le justifie : les visites sont adaptées à cette exposition.\n\nLe service de prévention et de santé au travail (SPST) conseille le salarié et l’employeur, et participe à la prévention comme au suivi de santé.",
          },
        },
        {
          title: "Défi 01 : la convocation d’Élodie",
          type: "qcm",
          instructions:
            "Identifier la modalité de suivi médical qui correspond à la situation.",
          payload: {
            question:
              "Avant de reprendre sa machine à commande numérique, Élodie est convoquée par le service de prévention et de santé au travail pour être informée des risques de son poste et faire le point sur sa situation. De quelle modalité s’agit-il ?",
            choices: [
              {
                id: "vip",
                label: "Une visite d’information et de prévention (VIP)",
              },
              { id: "ema", label: "Un examen médical d’aptitude (EMA)" },
              { id: "renforce", label: "Un suivi individuel renforcé" },
              {
                id: "cse",
                label: "Une réunion du comité social et économique",
              },
            ],
            correctChoiceIds: ["vip"],
            explanation:
              "La visite d’information et de prévention informe le salarié sur les risques de son poste et fait le point sur sa situation.",
          },
        },
        {
          title: "Jeu : classer les modalités de suivi",
          type: "sorting",
          instructions:
            "Classer chaque élément dans la modalité de suivi qui lui correspond.",
          payload: {
            prompt:
              "Trois modalités de suivi, trois rôles différents chez CDE.",
            categories: [
              { id: "vip", label: "Visite d’information et de prévention" },
              { id: "ema", label: "Examen médical d’aptitude" },
              { id: "renforce", label: "Suivi individuel renforcé" },
            ],
            items: [
              {
                id: "vip_1",
                label: "Informer le salarié sur les risques de son poste",
                categoryId: "vip",
              },
              {
                id: "vip_2",
                label: "Faire le point sur la situation du salarié",
                categoryId: "vip",
              },
              {
                id: "ema_1",
                label:
                  "Vérifier l’aptitude avant l’affectation à un poste à risques particuliers",
                categoryId: "ema",
              },
              {
                id: "ema_2",
                label:
                  "Concerner certains postes présentant des risques particuliers",
                categoryId: "ema",
              },
              {
                id: "renforce_1",
                label: "S’appliquer lorsque l’exposition le justifie",
                categoryId: "renforce",
              },
              {
                id: "renforce_2",
                label: "Adapter les visites à l’exposition réelle du salarié",
                categoryId: "renforce",
              },
            ],
            explanation:
              "La VIP informe, l’examen médical d’aptitude vérifie l’aptitude à un poste à risques particuliers, le suivi renforcé adapte les visites à l’exposition.",
          },
        },
        {
          title: "Vrai ou faux : le suivi dépend du nom du métier",
          type: "true_false",
          instructions: "Justifier la réponse à partir de la fiche de notions.",
          payload: {
            statement:
              "Le suivi de santé d’un salarié se décide à partir du nom de son métier.",
            correctAnswer: false,
            explanation:
              "Faux : le suivi dépend du poste réellement occupé et des expositions, pas de l’intitulé du métier. Deux chaudronniers peuvent relever de suivis différents.",
          },
        },
        {
          title:
            "Défi 02 : le rôle du service de prévention et de santé au travail",
          type: "qcm",
          instructions:
            "Expliquer le rôle du SPST en choisissant l’énoncé exact.",
          payload: {
            question:
              "Quel énoncé décrit correctement le rôle du service de prévention et de santé au travail ?",
            choices: [
              {
                id: "conseille",
                label:
                  "Il conseille le salarié et l’employeur et participe au suivi de santé.",
              },
              {
                id: "sanctionne",
                label:
                  "Il sanctionne le salarié qui ne respecte pas les consignes.",
              },
              {
                id: "remplace",
                label:
                  "Il remplace l’employeur pour évaluer les risques de l’entreprise.",
              },
              {
                id: "embauche",
                label: "Il décide seul des embauches de l’atelier.",
              },
            ],
            correctChoiceIds: ["conseille"],
            explanation:
              "Le SPST a un rôle de conseil auprès du salarié et de l’employeur : il ne sanctionne pas et ne remplace pas l’employeur.",
          },
        },
      ],
    },
    {
      title:
        "Expliquer les moyens de défense de l’organisme face à l’infection microbienne",
      description:
        "Relier la barrière cutanéo-muqueuse, l’immunité non spécifique et l’immunité spécifique à la coupure de Karim sur une tôle.",
      activities: [
        {
          title: "À retenir : les défenses de l’organisme",
          type: "content",
          instructions:
            "Repérer les trois niveaux de défense présentés dans la fiche.",
          payload: {
            body: "Karim se coupe sur une tôle pendant l’ébavurage. La peau est franchie et des micro-organismes peuvent entrer.\n\nLa peau et les muqueuses forment une première barrière : c’est la barrière cutanéo-muqueuse. Elle limite l’entrée des microbes tant qu’elle est intacte.\n\nQuand cette barrière est franchie, une réponse non spécifique agit rapidement, sans viser un microbe précis. La réaction inflammatoire en fait partie : ses signes possibles sont la rougeur, la chaleur, la douleur et le gonflement.\n\nUne réponse spécifique reconnaît ensuite un antigène déterminé. Un antigène est un élément reconnu comme étranger par l’organisme.\n\nLes anticorps reconnaissent spécifiquement cet antigène et participent à sa neutralisation.",
          },
        },
        {
          title: "Jeu : classer les moyens de défense",
          type: "sorting",
          instructions:
            "Classer chaque élément dans le niveau de défense qui lui correspond.",
          payload: {
            prompt:
              "Trois niveaux de défense se succèdent après la coupure de Karim.",
            categories: [
              { id: "barriere", label: "Barrière cutanéo-muqueuse" },
              { id: "non_specifique", label: "Immunité non spécifique" },
              { id: "specifique", label: "Immunité spécifique" },
            ],
            items: [
              {
                id: "b_1",
                label: "La peau intacte limite l’entrée des microbes",
                categoryId: "barriere",
              },
              {
                id: "b_2",
                label: "Les muqueuses forment une première barrière",
                categoryId: "barriere",
              },
              {
                id: "ns_1",
                label: "Une réponse rapide qui ne vise pas un microbe précis",
                categoryId: "non_specifique",
              },
              {
                id: "ns_2",
                label:
                  "Rougeur, chaleur, douleur et gonflement autour de la plaie",
                categoryId: "non_specifique",
              },
              {
                id: "s_1",
                label: "La reconnaissance d’un antigène déterminé",
                categoryId: "specifique",
              },
              {
                id: "s_2",
                label: "La production d’anticorps dirigés contre cet antigène",
                categoryId: "specifique",
              },
            ],
            explanation:
              "La barrière empêche l’entrée, la réponse non spécifique agit vite et sans cible précise, la réponse spécifique vise un antigène déterminé.",
          },
        },
        {
          title: "Jeu : relier les notions d’immunité",
          type: "matching",
          instructions:
            "Définir chaque notion d’immunité travaillée dans la séance.",
          payload: {
            prompt: "Relie chaque notion à sa définition exacte.",
            pairs: [
              {
                id: "barriere",
                left: "Barrière cutanéo-muqueuse",
                right: "Peau et muqueuses qui limitent l’entrée des microbes",
              },
              {
                id: "non_specifique",
                left: "Immunité non spécifique",
                right: "Réponse rapide qui agit sans viser un microbe précis",
              },
              {
                id: "specifique",
                left: "Immunité spécifique",
                right: "Réponse ciblée contre un antigène précis",
              },
              {
                id: "antigene",
                left: "Antigène",
                right: "Élément reconnu comme étranger par l’organisme",
              },
              {
                id: "anticorps",
                left: "Anticorps",
                right: "Molécule qui reconnaît un antigène",
              },
            ],
            explanation:
              "Ces cinq notions sont les notions clés du module C7 pour expliquer la défense de l’organisme face à une infection.",
          },
        },
        {
          title: "Défi 01 : la coupure de Karim",
          type: "qcm",
          instructions:
            "Expliquer ce qui se passe en premier après la coupure.",
          payload: {
            question:
              "La coupure de Karim franchit la peau. Autour de la plaie apparaissent une rougeur, une chaleur et un gonflement. À quoi correspondent ces signes ?",
            choices: [
              {
                id: "non_specifique",
                label:
                  "À une réponse non spécifique, rapide, qui ne vise pas un microbe précis",
              },
              {
                id: "specifique",
                label:
                  "À la production d’anticorps dirigés contre un antigène précis",
              },
              {
                id: "vaccination",
                label:
                  "À l’effet d’une vaccination reçue plusieurs années plus tôt",
              },
              {
                id: "barriere",
                label: "Au renforcement de la barrière cutanéo-muqueuse",
              },
            ],
            correctChoiceIds: ["non_specifique"],
            explanation:
              "Rougeur, chaleur, douleur et gonflement sont des signes possibles de la réaction inflammatoire, une réponse rapide et non spécifique.",
          },
        },
        {
          title: "Vrai ou faux : un anticorps contre tous les microbes",
          type: "true_false",
          instructions:
            "Justifier la réponse à partir de la définition de l’anticorps.",
          payload: {
            statement: "Un même anticorps agit contre tous les microbes.",
            correctAnswer: false,
            explanation:
              "Faux : un anticorps reconnaît spécifiquement un antigène déterminé. C’est ce qui distingue l’immunité spécifique de l’immunité non spécifique.",
          },
        },
        {
          title: "Vrai ou faux : la peau, une simple enveloppe",
          type: "true_false",
          instructions:
            "Déduire le rôle de la peau à partir de la fiche de notions.",
          payload: {
            statement:
              "Tant qu’elle est intacte, la peau participe à la défense de l’organisme.",
            correctAnswer: true,
            explanation:
              "Vrai : la peau et les muqueuses forment la barrière cutanéo-muqueuse, qui limite l’entrée des micro-organismes. C’est pourquoi une coupure sur une tôle crée un risque.",
          },
        },
      ],
    },
    {
      title:
        "Expliquer le principe de la vaccination et justifier les vaccinations préconisées",
      description:
        "Distinguer obligation et préconisation, protection individuelle et protection collective, à partir de la demande de M. Berthier chez CDE.",
      activities: [
        {
          title:
            "À retenir : vaccination, mémoire immunitaire et recommandations",
          type: "content",
          instructions:
            "Repérer ce que prépare la vaccination et ce que dit réellement la réglementation pour la chaudronnerie.",
          payload: {
            body: "M. Berthier demande à l’équipe de vérifier les recommandations vaccinales avec le service de santé au travail.\n\nLa vaccination présente à l’organisme un antigène ou une information associée, et prépare la mémoire immunitaire : lors d’un nouveau contact, la réponse est plus rapide.\n\nAucun texte n’impose de vaccination propre au métier de la chaudronnerie. Ce qui s’applique est le calendrier vaccinal de tous, avec un rappel diphtérie-tétanos-poliomyélite et coqueluche à 25 ans, 45 ans, 65 ans, puis tous les dix ans.\n\nCe rappel compte en atelier : le tétanos s’attrape par une plaie souillée, comme une coupure sur une tôle.\n\nLa vaccination protège alors la personne vaccinée : c’est une protection individuelle. Une couverture vaccinale élevée ajoute une protection collective seulement pour une maladie transmissible d’une personne à une autre, ce qui n’est pas le cas du tétanos.\n\nL’employeur peut recommander d’autres vaccinations, à sa charge et sur proposition du médecin du travail, si l’évaluation des risques montre une exposition à des agents biologiques.",
          },
        },
        {
          title: "Défi 01 : le principe de la vaccination",
          type: "qcm",
          instructions:
            "Expliquer ce que prépare la vaccination dans l’organisme.",
          payload: {
            question: "Que prépare la vaccination dans l’organisme ?",
            choices: [
              {
                id: "memoire",
                label:
                  "La mémoire immunitaire, pour que la réponse soit plus rapide lors d’un nouveau contact",
              },
              {
                id: "barriere",
                label: "Une peau plus résistante aux coupures sur tôle",
              },
              {
                id: "immediat",
                label:
                  "Une guérison immédiate de toute infection déjà déclarée",
              },
              {
                id: "aucune",
                label: "Une dispense de suivi médical au travail",
              },
            ],
            correctChoiceIds: ["memoire"],
            explanation:
              "La vaccination présente un antigène ou une information associée et prépare la mémoire immunitaire : au contact suivant, la réponse est plus rapide.",
          },
        },
        {
          title: "Vrai ou faux : une vaccination propre à la chaudronnerie",
          type: "true_false",
          instructions:
            "Justifier la réponse à partir de ce que disent réellement les textes.",
          payload: {
            statement:
              "Un texte impose une vaccination spécifique au métier de la chaudronnerie.",
            correctAnswer: false,
            explanation:
              "Faux : aucun texte n’impose de vaccination propre à la chaudronnerie. C’est le calendrier vaccinal de tous qui s’applique, avec les rappels diphtérie-tétanos-poliomyélite et coqueluche.",
          },
        },
        {
          title: "Défi 02 : pourquoi le rappel compte en atelier",
          type: "qcm",
          instructions:
            "Justifier l’intérêt du rappel diphtérie-tétanos-poliomyélite pour un salarié de CDE.",
          payload: {
            question:
              "Pourquoi le rappel diphtérie-tétanos-poliomyélite est-il particulièrement utile dans un atelier de chaudronnerie ?",
            choices: [
              {
                id: "plaie",
                label:
                  "Parce que le tétanos s’attrape par une plaie souillée, comme une coupure sur une tôle",
              },
              {
                id: "bruit",
                label: "Parce qu’il protège du bruit des machines de l’atelier",
              },
              {
                id: "fumees",
                label: "Parce qu’il protège des fumées métalliques",
              },
              {
                id: "obligation",
                label: "Parce qu’un texte propre à la chaudronnerie l’impose",
              },
            ],
            correctChoiceIds: ["plaie"],
            explanation:
              "Le tétanos s’attrape par une plaie souillée. Les coupures sur tôle sont fréquentes en atelier, ce qui rend ce rappel utile — sans qu’un texte propre au métier l’impose.",
          },
        },
        {
          title: "Jeu : protection individuelle ou protection collective ?",
          type: "sorting",
          instructions:
            "Classer chaque énoncé selon le type de protection qu’il décrit.",
          payload: {
            prompt:
              "Une même mesure ne protège pas toujours tout le monde. Classe ces énoncés.",
            categories: [
              { id: "individuelle", label: "Protection individuelle" },
              { id: "collective", label: "Protection collective" },
            ],
            items: [
              {
                id: "i_1",
                label: "La vaccination protège la personne vaccinée",
                categoryId: "individuelle",
              },
              {
                id: "i_2",
                label:
                  "Le rappel antitétanique protège le salarié qui l’a reçu",
                categoryId: "individuelle",
              },
              {
                id: "i_3",
                label: "Les gants protègent les mains de celui qui les porte",
                categoryId: "individuelle",
              },
              {
                id: "c_1",
                label:
                  "Une couverture vaccinale élevée contre une maladie transmissible",
                categoryId: "collective",
              },
              {
                id: "c_2",
                label:
                  "Une aspiration des fumées installée sur le poste de soudage",
                categoryId: "collective",
              },
              {
                id: "c_3",
                label:
                  "Une organisation du travail qui protège toutes les personnes exposées",
                categoryId: "collective",
              },
            ],
            explanation:
              "La protection individuelle protège la seule personne exposée. L’effet collectif d’une vaccination suppose une maladie transmissible d’une personne à une autre — ce qui n’est pas le cas du tétanos.",
          },
        },
        {
          title: "Vrai ou faux : le tétanos se transmet entre collègues",
          type: "true_false",
          instructions:
            "Déduire si une couverture vaccinale élevée contre le tétanos protège toute l’équipe.",
          payload: {
            statement:
              "Si toute l’équipe de CDE est vaccinée contre le tétanos, les personnes non vaccinées sont protégées à leur tour.",
            correctAnswer: false,
            explanation:
              "Faux : le tétanos ne se transmet pas d’une personne à une autre. La vaccination antitétanique est une protection individuelle ; il n’y a pas d’effet collectif comme pour une maladie transmissible.",
          },
        },
        {
          title: "Défi 03 : qui propose une vaccination recommandée ?",
          type: "qcm",
          instructions:
            "Identifier qui propose une vaccination recommandée et à quelle condition.",
          payload: {
            question:
              "L’évaluation des risques de CDE montre une exposition à des agents biologiques sur un poste. Que peut-il se passer ?",
            choices: [
              {
                id: "medecin",
                label:
                  "L’employeur peut recommander une vaccination, à sa charge et sur proposition du médecin du travail",
              },
              {
                id: "salarie",
                label:
                  "Chaque salarié décide seul et paie lui-même la vaccination",
              },
              {
                id: "cse_impose",
                label:
                  "Le comité social et économique impose la vaccination aux salariés",
              },
              {
                id: "rien",
                label:
                  "Rien : aucune vaccination ne peut être recommandée en entreprise",
              },
            ],
            correctChoiceIds: ["medecin"],
            explanation:
              "L’employeur peut recommander d’autres vaccinations, à sa charge et sur proposition du médecin du travail, lorsque l’évaluation des risques montre une exposition à des agents biologiques.",
          },
        },
        {
          title: "Jeu : relier les notions de la vaccination",
          type: "matching",
          instructions: "Définir chaque notion travaillée dans la séance.",
          payload: {
            prompt: "Relie chaque notion à sa définition exacte.",
            pairs: [
              {
                id: "vaccination",
                left: "Vaccination",
                right: "Préparation de la mémoire immunitaire",
              },
              {
                id: "memoire",
                left: "Mémoire immunitaire",
                right:
                  "Capacité à répondre plus vite lors d’un nouveau contact",
              },
              {
                id: "risque",
                left: "Risque microbiologique",
                right:
                  "Risque lié à la présence de micro-organismes dangereux sur un poste",
              },
              {
                id: "individuelle",
                left: "Protection individuelle",
                right: "Moyen qui protège la seule personne exposée",
              },
              {
                id: "collective",
                left: "Protection collective",
                right: "Moyen qui protège l’ensemble des personnes exposées",
              },
              {
                id: "transmissible",
                left: "Maladie transmissible",
                right: "Maladie qui peut passer d’une personne à une autre",
              },
              {
                id: "preconisation",
                left: "Préconisation",
                right: "Conseil adapté à une situation",
              },
            ],
            explanation:
              "Ces notions permettent de distinguer ce qui est imposé par un texte, ce qui est conseillé, et qui est réellement protégé par une mesure.",
          },
        },
      ],
    },
    {
      title:
        "Bilan de séquence : traiter une situation professionnelle chez CDE",
      description:
        "Réinvestir les notions du module C7 sur trois situations de l’atelier, en repérant un fait, en choisissant une notion et en justifiant avec « parce que ».",
      activities: [
        {
          title: "La méthode attendue à l’épreuve",
          type: "content",
          instructions:
            "Repérer les quatre étapes attendues dans une réponse rédigée.",
          payload: {
            body: "Une réponse complète suit toujours les mêmes étapes.\n\n1. Je repère les faits demandés dans le ou les documents indiqués.\n2. Je choisis une notion précise de la séquence.\n3. J’explique le lien entre le fait et la notion.\n4. Je propose ou je justifie une conduite avec « parce que ».\n\nExemple : « Le document indique qu’Élodie est exposée au bruit, aux fumées métalliques et au rayonnement optique. Son suivi doit donc être vérifié avec le SPST parce qu’il dépend du poste réel et de ses expositions. »\n\nLa réponse est rédigée en phrases complètes, avec le vocabulaire de la séquence.",
          },
        },
        {
          title: "Mission CDE 01 : la reprise d’Élodie sur la découpe laser",
          type: "qcm",
          instructions:
            "Justifier la conduite à tenir à partir des faits du document.",
          payload: {
            question:
              "Élodie reprend sur une machine de découpe laser. Sa fiche de poste mentionne le bruit, les fumées métalliques et le rayonnement optique. Quelle conduite est justifiée ?",
            choices: [
              {
                id: "spst",
                label:
                  "Vérifier son suivi avec le SPST, parce qu’il dépend du poste réel et de ses expositions",
              },
              {
                id: "metier",
                label:
                  "Appliquer le suivi habituel des chaudronniers, parce que c’est son métier",
              },
              {
                id: "rien",
                label:
                  "Ne rien changer, parce qu’elle a déjà travaillé dans l’entreprise",
              },
              {
                id: "collegue",
                label:
                  "Reprendre le suivi d’un collègue, parce qu’ils sont dans le même atelier",
              },
            ],
            correctChoiceIds: ["spst"],
            explanation:
              "Le suivi dépend du poste réellement occupé et des expositions constatées, et non du nom du métier ni du suivi d’un collègue.",
          },
        },
        {
          title: "Mission CDE 02 : la plaie de Karim",
          type: "qcm",
          instructions:
            "Expliquer le lien entre le fait observé et une notion de la séquence.",
          payload: {
            question:
              "La coupure de Karim sur une tôle a franchi la peau. Quelle explication relie correctement le fait et une notion de la séquence ?",
            choices: [
              {
                id: "barriere",
                label:
                  "La barrière cutanéo-muqueuse est franchie, parce que la peau ne limite plus l’entrée des micro-organismes",
              },
              {
                id: "specifique",
                label:
                  "L’immunité spécifique est franchie, parce que les anticorps ne reconnaissent plus l’antigène",
              },
              {
                id: "memoire",
                label:
                  "La mémoire immunitaire est franchie, parce que la vaccination ne fonctionne plus",
              },
              {
                id: "collective",
                label:
                  "La protection collective est franchie, parce que l’équipe n’est pas vaccinée",
              },
            ],
            correctChoiceIds: ["barriere"],
            explanation:
              "La peau et les muqueuses forment la barrière cutanéo-muqueuse. Quand une coupure la franchit, des micro-organismes peuvent entrer.",
          },
        },
        {
          title: "Mission CDE 03 : répondre au message du SPST",
          type: "qcm",
          instructions:
            "Justifier le choix de la réponse professionnelle la mieux adaptée.",
          payload: {
            question:
              "Le SPST rappelle qu’une affirmation générale sur les vaccinations doit être vérifiée. Quelle réponse est la mieux argumentée ?",
            choices: [
              {
                id: "verifier",
                label:
                  "Vérifier les textes, le poste, les expositions et la situation individuelle avec un professionnel de santé",
              },
              {
                id: "internet",
                label: "Reprendre ce qui est écrit sur un forum professionnel",
              },
              {
                id: "generaliser",
                label:
                  "Appliquer à toute la filière ce qui est écrit pour un seul poste",
              },
              {
                id: "ignorer",
                label:
                  "Ne rien vérifier, parce qu’aucun texte n’impose de vaccination propre au métier",
              },
            ],
            correctChoiceIds: ["verifier"],
            explanation:
              "Une affirmation générale se vérifie à partir des textes applicables, du poste, des expositions et de l’avis d’un professionnel de santé. L’absence d’obligation propre au métier ne dispense pas de cette vérification.",
          },
        },
        {
          title: "Vrai ou faux : obligation et préconisation",
          type: "true_false",
          instructions:
            "Comparer la portée d’une obligation et celle d’une préconisation.",
          payload: {
            statement:
              "Une préconisation et une obligation ont exactement la même portée pour le salarié.",
            correctAnswer: false,
            explanation:
              "Faux : une obligation est imposée dans une situation précise par un texte applicable ou une décision médicale ; une préconisation est un conseil adapté à une situation, à un poste ou à une exposition.",
          },
        },
        {
          title: "Jeu : reconstituer la séquence C7",
          type: "sorting",
          instructions:
            "Classer chaque notion dans la partie de la séquence à laquelle elle appartient.",
          payload: {
            prompt:
              "Trois séances, trois familles de notions à ne pas confondre.",
            categories: [
              { id: "suivi", label: "Le suivi de santé" },
              { id: "defenses", label: "Les défenses de l’organisme" },
              { id: "vaccination", label: "La vaccination au travail" },
            ],
            items: [
              {
                id: "s_vip",
                label: "Visite d’information et de prévention",
                categoryId: "suivi",
              },
              {
                id: "s_ema",
                label: "Examen médical d’aptitude",
                categoryId: "suivi",
              },
              { id: "s_poste", label: "Poste à risque", categoryId: "suivi" },
              {
                id: "d_barriere",
                label: "Barrière cutanéo-muqueuse",
                categoryId: "defenses",
              },
              {
                id: "d_ns",
                label: "Immunité non spécifique",
                categoryId: "defenses",
              },
              { id: "d_anticorps", label: "Anticorps", categoryId: "defenses" },
              {
                id: "v_memoire",
                label: "Mémoire immunitaire",
                categoryId: "vaccination",
              },
              {
                id: "v_collective",
                label: "Protection collective",
                categoryId: "vaccination",
              },
              {
                id: "v_transmissible",
                label: "Maladie transmissible",
                categoryId: "vaccination",
              },
            ],
            explanation:
              "Les trois séances du module C7 s’enchaînent : le suivi organise la prévention, les défenses expliquent la réaction du corps, la vaccination prépare la mémoire immunitaire.",
          },
        },
      ],
    },
  ],
};
