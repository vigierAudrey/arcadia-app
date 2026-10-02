import type { InitialLearningSequence } from "./catalog-types";

// Séquence PSE de T TCI — module C9 « Les risques psycho-sociaux ».
// Traçabilité complète des sources : docs/mapping-pedagogique-t-tci-c9.md
//
// Ce module est la source unique de ce contenu : il alimente à la fois le seed
// de développement (prisma/seed.ts) et l'import ciblé, additif et sans
// écrasement, de scripts/import-contenus.ts.
//
// Note pédagogique de préparation (jamais affichée aux élèves, cf. §9 de
// docs/pedagogie-agents.md) : objectif, faire travailler les élèves sur les
// compétences C1 à C6 à travers les exercices réalisés.
export const pseTTciC9Sequence: InitialLearningSequence = {
  title: "C9. Les risques psychosociaux",
  description:
    "Tu vas apprendre à repérer ce qui, dans l’organisation du travail chez CDE, peut faire du mal à un salarié. Tu verras les effets sur la santé d’Élodie et sur l’entreprise, puis tu proposeras des mesures qui agissent sur le travail lui-même.",
  lessons: [
    {
      title: "Repérer les facteurs de risques psychosociaux",
      description:
        "Tu vas enquêter dans l’atelier CDE pour trouver ce qui pèse sur Élodie, et nommer le stress, la violence interne et la violence externe.",
      activities: [
        {
          title: "À retenir : stress, violence interne, violence externe",
          type: "content",
          instructions:
            "Repérer les trois formes de risques psychosociaux présentées dans la fiche.",
          payload: {
            body: "Élodie est opératrice sur machine à commande numérique chez CDE, la Chaudronnerie de l’Estuaire. Depuis le rachat de l’entreprise, elle n’est plus la même.\n\nRPS signifie risques psychosociaux. Ce sont des situations de travail où l’on trouve, seuls ou combinés, du stress, des violences internes et des violences externes.\n\nLe stress est un déséquilibre entre les contraintes du travail et les ressources dont on dispose pour y faire face. Chez Élodie, les contraintes augmentent (plus de pièces, délai avancé) pendant que les ressources baissent (Karim absent n’est pas remplacé, elle n’a plus le droit de réorganiser ses séries).\n\nUne violence interne vient d’une personne de l’entreprise : un collègue, un responsable. Remarques dévalorisantes, mise à l’écart.\n\nUne violence externe vient d’une personne extérieure : un client, un usager. Insultes, menaces, mépris.\n\nUne remarque isolée n’est pas un harcèlement. Le harcèlement moral suppose des agissements répétés qui dégradent les conditions de travail.\n\nSi une situation de travail te pèse, tu peux en parler à ton tuteur de PFMP, au médecin du travail, aux représentants du personnel, à l’infirmière scolaire ou au CPE. PFMP signifie période de formation en milieu professionnel.",
          },
        },
        {
          title: "À retenir : les six familles de facteurs",
          type: "content",
          instructions:
            "Repérer les six familles de facteurs qui peuvent provoquer des risques psychosociaux.",
          payload: {
            body: "Un facteur de risques psychosociaux est un élément de l’organisation du travail ou des relations de travail qui augmente le risque. Il en existe six familles.\n\nL’intensité et le temps de travail : la charge augmente, les délais se raccourcissent, on travaille les samedis. Chez CDE, 180 pièces au lieu de 120, livraison avancée, Karim absent non remplacé.\n\nLes exigences émotionnelles : il faut rester calme face à un client mécontent. Depuis l’absence de Karim, Élodie répond elle-même au client.\n\nLe manque d’autonomie : on ne choisit plus l’ordre de son travail. L’ordre des séries est imposé à Élodie et toute modification doit être validée.\n\nLes rapports sociaux dégradés : remarques, mise à l’écart, peu de soutien. Le poste d’Élodie est isolé, l’équipe est regroupée à l’autre bout de l’atelier.\n\nLe conflit de valeurs : on demande de faire un travail que l’on sait mal fait. La procédure qualité interdit d’expédier une pièce non conforme, le mail du responsable demande d’expédier quand même.\n\nL’insécurité de la situation de travail : on ne sait pas de quoi demain sera fait. Le panneau d’information annonce le rachat et une réorganisation, sans dire qui ira où.",
          },
        },
        {
          title: "Défi 01 : les samedis travaillés",
          type: "qcm",
          instructions:
            "Identifier la famille de facteurs qui correspond à la situation.",
          payload: {
            question:
              "Chez CDE, la commande passe de 120 à 180 pièces, la livraison est avancée, Karim n’est pas remplacé et Élodie travaille les samedis. De quelle famille de facteurs s’agit-il ?",
            choices: [
              { id: "intensite", label: "L’intensité et le temps de travail" },
              { id: "emotion", label: "Les exigences émotionnelles" },
              { id: "valeurs", label: "Le conflit de valeurs" },
              { id: "insecurite", label: "L’insécurité de la situation de travail" },
            ],
            correctChoiceIds: ["intensite"],
            explanation:
              "Produire plus, plus vite et plus longtemps relève de l’intensité et du temps de travail.",
          },
        },
        {
          title: "Défi 02 : le message du client",
          type: "qcm",
          instructions:
            "Classer le comportement du client selon l’origine de la personne.",
          payload: {
            question:
              "Le client NAVALIS laisse à Élodie un message méprisant et menace de rompre la relation commerciale. Comment nommer ce qu’elle subit ?",
            choices: [
              { id: "externe", label: "Une violence externe, parce que le client n’appartient pas à CDE" },
              { id: "interne", label: "Une violence interne, parce que le message arrive dans l’entreprise" },
              { id: "harcelement", label: "Un harcèlement moral, parce que le message est méprisant" },
              { id: "rien", label: "Rien de particulier, parce qu’un client a le droit de se plaindre" },
            ],
            correctChoiceIds: ["externe"],
            explanation:
              "Ce qui décide, c’est l’origine de la personne. Le client est extérieur à l’entreprise : c’est une violence externe.",
          },
        },
        {
          title: "Défi 03 : la qualité empêchée",
          type: "qcm",
          instructions:
            "Expliquer ce que produit la contradiction entre deux consignes.",
          payload: {
            question:
              "La procédure qualité Q-07 impose de reprendre toute pièce non conforme avant envoi. Le mail du responsable demande d’expédier aujourd’hui et de traiter les retours plus tard. Quel facteur cela crée-t-il pour Élodie ?",
            choices: [
              { id: "valeurs", label: "Un conflit de valeurs, parce qu’elle ne peut pas faire un travail de qualité" },
              { id: "autonomie", label: "Un manque d’autonomie, parce qu’elle n’a pas choisi la procédure" },
              { id: "externe", label: "Une violence externe, parce que la pièce part chez le client" },
              { id: "insecurite", label: "Une insécurité, parce qu’elle risque de perdre son poste" },
            ],
            correctChoiceIds: ["valeurs"],
            explanation:
              "Les deux consignes sont incompatibles. On demande à Élodie d’expédier des pièces qu’elle sait non conformes : c’est un conflit de valeurs.",
          },
        },
        {
          title: "Défi 04 : la remarque du collègue",
          type: "qcm",
          instructions:
            "Justifier ce que l’on peut conclure, et ce que l’on ne peut pas conclure.",
          payload: {
            question:
              "Un collègue a lancé une fois à Sofiane : « t’es lent ». Que peut-on en conclure ?",
            choices: [
              {
                id: "rapports",
                label: "Une remarque isolée relève de rapports sociaux dégradés, pas d’un harcèlement",
              },
              { id: "harcelement", label: "C’est un harcèlement moral, parce que la remarque est blessante" },
              { id: "externe", label: "C’est une violence externe, parce qu’elle vient d’une autre personne" },
              { id: "normal", label: "C’est normal entre collègues, il n’y a rien à signaler" },
            ],
            correctChoiceIds: ["rapports"],
            explanation:
              "Le harcèlement moral suppose des agissements répétés. Avec un seul fait, on parle de rapports sociaux dégradés : on décrit, on ne conclut pas trop vite.",
          },
        },
        {
          title: "Vrai ou faux : d’où vient le stress d’Élodie",
          type: "true_false",
          instructions: "Définir le stress à partir de la fiche.",
          payload: {
            statement:
              "Le stress est un déséquilibre entre les contraintes du travail et les ressources dont on dispose pour y faire face.",
            correctAnswer: true,
            explanation:
              "Vrai. Chez Élodie, les contraintes montent pendant que les ressources baissent : Karim n’est pas remplacé et l’autonomie lui est retirée.",
          },
        },
        {
          title: "Vrai ou faux : le client et le collègue",
          type: "true_false",
          instructions: "Classer une violence selon l’origine de la personne.",
          payload: {
            statement:
              "Les insultes d’un client pendant une livraison sont une violence interne.",
            correctAnswer: false,
            explanation:
              "Faux. Le client est extérieur à l’entreprise : c’est une violence externe. La violence interne vient d’une personne de l’entreprise.",
          },
        },
        {
          title: "Vrai ou faux : une seule remarque suffit-elle",
          type: "true_false",
          instructions: "Justifier la réponse avec la définition du harcèlement moral.",
          payload: {
            statement:
              "Une seule remarque blessante suffit à parler de harcèlement moral.",
            correctAnswer: false,
            explanation:
              "Faux. Le harcèlement moral suppose des agissements répétés qui dégradent les conditions de travail. Une remarque isolée relève de rapports sociaux dégradés.",
          },
        },
        {
          title: "Vrai ou faux : les RPS viennent surtout du travail",
          type: "true_false",
          instructions: "Indiquer d’où viennent le plus souvent les risques psychosociaux.",
          payload: {
            statement:
              "La plupart des indices relevés chez CDE viennent de la façon dont le travail est organisé.",
            correctAnswer: true,
            explanation:
              "Vrai. Cadences, délais, samedis, priorités imposées, qualité empêchée, rachat : la plupart des indices tiennent à l’organisation du travail, pas au caractère des personnes.",
          },
        },
        {
          title: "Vrai ou faux : décrire ou juger",
          type: "true_false",
          instructions: "Repérer la bonne manière de signaler une situation.",
          payload: {
            statement:
              "Pour signaler une situation difficile, on décrit des faits précis sans juger la personne.",
            correctAnswer: true,
            explanation:
              "Vrai. On décrit ce que l’on a vu et entendu, avec des dates si possible. Juger une personne n’aide ni à comprendre ni à agir.",
          },
        },
        {
          title: "Jeu : classer les indices de l’atelier CDE",
          type: "sorting",
          instructions:
            "Classer chaque indice de l’enquête dans la famille de facteurs qui lui correspond.",
          payload: {
            prompt:
              "Six familles de facteurs, six arêtes du diagramme d’enquête chez CDE.",
            categories: [
              { id: "intensite", label: "Intensité et temps de travail" },
              { id: "emotion", label: "Exigences émotionnelles" },
              { id: "autonomie", label: "Manque d’autonomie" },
              { id: "social", label: "Rapports sociaux dégradés" },
              { id: "valeurs", label: "Conflit de valeurs" },
              { id: "insecurite", label: "Insécurité de la situation de travail" },
            ],
            items: [
              {
                id: "int_1",
                label: "Tableau de production : 180 pièces au lieu de 120, livraison avancée",
                categoryId: "intensite",
              },
              {
                id: "int_2",
                label: "Planning : des samedis travaillés depuis un mois",
                categoryId: "intensite",
              },
              {
                id: "emo_1",
                label: "Élodie doit répondre elle-même au client mécontent",
                categoryId: "emotion",
              },
              {
                id: "emo_2",
                label: "Rester calme face à un message méprisant",
                categoryId: "emotion",
              },
              {
                id: "aut_1",
                label: "Note interne : l’ordre des séries est imposé",
                categoryId: "autonomie",
              },
              {
                id: "aut_2",
                label: "Toute modification du travail doit être validée",
                categoryId: "autonomie",
              },
              {
                id: "soc_1",
                label: "Messagerie : « C’est pourtant pas compliqué… »",
                categoryId: "social",
              },
              {
                id: "soc_2",
                label: "Poste isolé, équipe regroupée à l’autre bout de l’atelier",
                categoryId: "social",
              },
              {
                id: "val_1",
                label: "Expédier des pièces que l’on sait non conformes",
                categoryId: "valeurs",
              },
              {
                id: "val_2",
                label: "Bac rouge de pièces non conformes laissé de côté",
                categoryId: "valeurs",
              },
              {
                id: "ins_1",
                label: "Panneau d’information : rachat et réorganisation annoncés",
                categoryId: "insecurite",
              },
              {
                id: "ins_2",
                label: "Les futures affectations ne sont pas connues",
                categoryId: "insecurite",
              },
            ],
            explanation:
              "Chaque indice se range sur une arête du diagramme. Un même indice peut parfois en toucher deux : le message du client est à la fois une violence externe et une exigence émotionnelle.",
          },
        },
        {
          title: "Jeu : trois surligneurs, trois origines",
          type: "sorting",
          instructions:
            "Classer chaque indice selon ce qui pèse sur Élodie : une personne extérieure, une personne de l’entreprise, ou l’organisation du travail.",
          payload: {
            prompt:
              "Deuxième lecture du diagramme : d’où vient ce qui pèse sur Élodie ?",
            categories: [
              { id: "externe", label: "Violence externe" },
              { id: "interne", label: "Violence interne" },
              { id: "stress", label: "Organisation du travail, donc stress" },
            ],
            items: [
              {
                id: "ext_1",
                label: "Le message méprisant du client NAVALIS",
                categoryId: "externe",
              },
              {
                id: "ext_2",
                label: "Les appels répétés d’un client mécontent",
                categoryId: "externe",
              },
              {
                id: "int_1",
                label: "La remarque d’un collègue : « C’est pourtant pas compliqué… »",
                categoryId: "interne",
              },
              {
                id: "int_2",
                label: "La mise à l’écart d’Élodie dans une décision qui la concerne",
                categoryId: "interne",
              },
              {
                id: "str_1",
                label: "Les cadences et le délai avancé",
                categoryId: "stress",
              },
              {
                id: "str_2",
                label: "Les priorités imposées plusieurs fois par jour",
                categoryId: "stress",
              },
              {
                id: "str_3",
                label: "L’absence de Karim qui n’est pas remplacée",
                categoryId: "stress",
              },
            ],
            explanation:
              "La violence se classe selon l’origine de la personne. Tout le reste tient à la façon dont le travail est organisé, et c’est là que naît le stress.",
          },
        },
        {
          title: "Relier chaque mot à son sens",
          type: "matching",
          instructions:
            "Définir chaque notion de la séance en la reliant à son sens exact.",
          payload: {
            prompt:
              "Les mots des professionnels pour parler de ce qui se passe chez CDE.",
            pairs: [
              {
                id: "rps",
                left: "Risque psychosocial",
                right:
                  "Situation de travail où l’on trouve du stress, des violences internes ou des violences externes",
              },
              {
                id: "stress",
                left: "Stress",
                right:
                  "Déséquilibre entre les contraintes du travail et les ressources pour y faire face",
              },
              {
                id: "interne",
                left: "Violence interne",
                right: "Violence venant d’une personne de l’entreprise",
              },
              {
                id: "externe",
                left: "Violence externe",
                right: "Violence venant d’une personne extérieure à l’entreprise",
              },
              {
                id: "facteur",
                left: "Facteur de risques psychosociaux",
                right:
                  "Élément de l’organisation ou des relations de travail qui augmente le risque",
              },
              {
                id: "harcelement",
                left: "Harcèlement moral",
                right:
                  "Agissements répétés qui dégradent les conditions de travail",
              },
            ],
            explanation:
              "Nommer juste permet de décrire une situation sans accuser personne, et de chercher ensuite ce qu’il faut changer dans le travail.",
          },
        },
      ],
    },
    {
      title: "Identifier les conséquences sur la santé et sur l’entreprise",
      description:
        "Tu vas comprendre pourquoi un stress qui dure finit par abîmer la santé, et découvrir ce que les risques psychosociaux coûtent à l’entreprise CDE.",
      activities: [
        {
          title: "À retenir : intégrité physique et intégrité mentale",
          type: "content",
          instructions:
            "Repérer ce qui change quand l’exposition aux risques psychosociaux dure.",
          payload: {
            body: "Si rien ne change chez CDE, où en sera Élodie dans six mois ?\n\nUn stress court est une réaction normale : il monte, puis il redescend. Quand les contraintes durent, on parle de stress chronique. Le corps et le moral s’usent.\n\nUn dommage est une atteinte à la santé subie du fait d’une exposition.\n\nL’intégrité physique, c’est le corps préservé de toute atteinte. Elle peut être touchée : troubles du sommeil, troubles musculosquelettiques, maux de tête, maladies cardio-vasculaires.\n\nL’intégrité mentale, c’est l’état psychique préservé de toute atteinte. Elle peut être touchée : irritabilité, oublis et erreurs d’inattention, troubles anxio-dépressifs, épuisement professionnel, que l’on appelle aussi burn-out, et dans les cas les plus graves le suicide.\n\nL’épuisement professionnel est un ensemble de réactions qui font suite à un stress professionnel qui dure. Se sentir vidée et dire « je n’y arrive plus » en est un signe.\n\nCe n’est pas une affaire de caractère : c’est la durée de l’exposition qui transforme une contrainte en dommage. Si une situation te pèse, parles-en au médecin du travail, à ton tuteur de PFMP, à l’infirmière scolaire ou au CPE.",
          },
        },
        {
          title: "À retenir : le coût et le climat social pour CDE",
          type: "content",
          instructions:
            "Repérer les deux manières dont l’entreprise est touchée à son tour.",
          payload: {
            body: "Les risques psychosociaux ne touchent pas seulement la personne. Ils touchent aussi l’entreprise, et c’est pour cela qu’il faut agir.\n\nLe coût, c’est la charge financière que l’entreprise supporte : arrêts de travail et absentéisme, remplacements à former, heures supplémentaires, pièces non conformes expédiées puis renvoyées, pénalités de retard, accidents du travail, recrutements à refaire.\n\nLe climat social, c’est la qualité des relations et du dialogue dans l’entreprise : collègues épuisés qui se disputent, départs de salariés, plus personne qui veut tenir un poste.\n\nChez CDE, cela ressemble à une chaîne de dominos. Élodie est arrêtée trois semaines. Un intérimaire est embauché et doit être formé. L’équipe fait des heures supplémentaires pour tenir les délais. Les collègues s’épuisent et se disputent. Un salarié fatigué se blesse en manutention. Des pièces non conformes partent et le client les renvoie. NAVALIS applique des pénalités et menace de partir. Un soudeur démissionne. Plus personne ne veut travailler au poste à commande numérique.\n\nUne conséquence de plus se devine : l’image de l’entreprise se dégrade et CDE a du mal à recruter.",
          },
        },
        {
          title: "Défi 01 : six mois plus tard",
          type: "qcm",
          instructions:
            "Expliquer ce qui transforme une contrainte en atteinte à la santé.",
          payload: {
            question:
              "Pourquoi la situation d’Élodie peut-elle finir par abîmer sa santé, alors qu’une journée difficile ne laisse pas de trace ?",
            choices: [
              {
                id: "duree",
                label: "Parce que l’exposition dure : le stress devient chronique et peut provoquer un dommage",
              },
              { id: "caractere", label: "Parce qu’elle est plus fragile que ses collègues" },
              { id: "machine", label: "Parce que sa machine à commande numérique est bruyante" },
              { id: "age", label: "Parce que la santé se dégrade naturellement avec l’âge" },
            ],
            correctChoiceIds: ["duree"],
            explanation:
              "Un stress court est une réaction normale. C’est la durée de l’exposition qui use le corps et le moral et provoque un dommage.",
          },
        },
        {
          title: "Défi 02 : les signes de Mathis",
          type: "qcm",
          instructions:
            "Identifier une atteinte à l’intégrité mentale dans la situation.",
          payload: {
            question:
              "Depuis trois mois, Mathis enchaîne les heures supplémentaires chez CDE. Il a mal au dos, dort mal et se sent « vidé ». Lequel de ces signes touche son intégrité mentale ?",
            choices: [
              { id: "vide", label: "Il se sent « vidé »" },
              { id: "dos", label: "Il a mal au dos" },
              { id: "sommeil", label: "Il dort mal" },
              { id: "heures", label: "Il enchaîne les heures supplémentaires" },
            ],
            correctChoiceIds: ["vide"],
            explanation:
              "Se sentir vidé est un signe d’épuisement professionnel, donc une atteinte à l’intégrité mentale. Le mal de dos et les troubles du sommeil touchent l’intégrité physique. Les heures supplémentaires sont un facteur, pas un dommage.",
          },
        },
        {
          title: "Défi 03 : l’intérimaire à former",
          type: "qcm",
          instructions:
            "Identifier le type de conséquence pour l’entreprise.",
          payload: {
            question:
              "Pendant l’arrêt d’Élodie, CDE embauche un intérimaire qu’il faut former, et l’équipe fait des heures supplémentaires. Quelle conséquence pour l’entreprise cela illustre-t-il ?",
            choices: [
              { id: "cout", label: "Le coût" },
              { id: "climat", label: "Le climat social" },
              { id: "integrite", label: "L’intégrité physique" },
              { id: "externe", label: "La violence externe" },
            ],
            correctChoiceIds: ["cout"],
            explanation:
              "Remplacer, former et payer des heures supplémentaires représente une charge financière : c’est le coût.",
          },
        },
        {
          title: "Défi 04 : le soudeur qui démissionne",
          type: "qcm",
          instructions:
            "Identifier ce que révèle un départ de salarié pour l’entreprise.",
          payload: {
            question:
              "Les collègues se disputent, un soudeur démissionne et plus personne ne veut tenir le poste à commande numérique. Que montrent ces faits chez CDE ?",
            choices: [
              { id: "climat", label: "Le climat social se dégrade" },
              { id: "integrite", label: "L’intégrité physique des salariés s’améliore" },
              { id: "qualite", label: "La qualité des pièces s’améliore" },
              { id: "rien", label: "Rien : les départs ne concernent que les personnes" },
            ],
            correctChoiceIds: ["climat"],
            explanation:
              "Disputes, départs et postes que personne ne veut tenir traduisent une dégradation du climat social. Le recrutement à refaire ajoute en plus un coût.",
          },
        },
        {
          title: "Vrai ou faux : un stress court laisse-t-il des traces",
          type: "true_false",
          instructions: "Expliquer la différence entre un stress court et un stress qui dure.",
          payload: {
            statement:
              "Un stress court est une réaction normale, qui monte puis redescend.",
            correctAnswer: true,
            explanation:
              "Vrai. C’est le stress qui dure, le stress chronique, qui use le corps et le moral et peut provoquer un dommage.",
          },
        },
        {
          title: "Vrai ou faux : les troubles du sommeil",
          type: "true_false",
          instructions: "Classer un signe entre intégrité physique et intégrité mentale.",
          payload: {
            statement:
              "Les troubles du sommeil et les maladies cardio-vasculaires sont des atteintes à l’intégrité physique.",
            correctAnswer: true,
            explanation:
              "Vrai. Ils touchent le corps. L’anxiété, la dépression et l’épuisement professionnel touchent l’intégrité mentale.",
          },
        },
        {
          title: "Vrai ou faux : l’épuisement professionnel",
          type: "true_false",
          instructions: "Définir l’épuisement professionnel.",
          payload: {
            statement:
              "L’épuisement professionnel apparaît brutalement, en une seule journée de travail difficile.",
            correctAnswer: false,
            explanation:
              "Faux. C’est un ensemble de réactions qui font suite à un stress professionnel qui dure. La durée de l’exposition est déterminante.",
          },
        },
        {
          title: "Vrai ou faux : une affaire personnelle",
          type: "true_false",
          instructions: "Indiquer qui est touché par les risques psychosociaux.",
          payload: {
            statement:
              "Les risques psychosociaux ne concernent que le salarié touché, pas l’entreprise.",
            correctAnswer: false,
            explanation:
              "Faux. Ils ont un coût pour l’entreprise, par l’absentéisme, les remplacements, la non-qualité et les accidents, et ils dégradent le climat social.",
          },
        },
        {
          title: "Jeu : les signes d’Élodie, le corps ou le moral",
          type: "sorting",
          instructions:
            "Classer chaque signe observé chez Élodie selon l’intégrité touchée.",
          payload: {
            prompt:
              "Dix signes relevés chez Élodie : lesquels touchent le corps, lesquels touchent le moral ?",
            categories: [
              { id: "physique", label: "Intégrité physique" },
              { id: "mentale", label: "Intégrité mentale" },
            ],
            items: [
              { id: "phy_1", label: "Fatiguée dès le matin", categoryId: "physique" },
              {
                id: "phy_2",
                label: "Se masse la nuque, douleurs aux épaules",
                categoryId: "physique",
              },
              { id: "phy_3", label: "Dort mal, se réveille la nuit", categoryId: "physique" },
              { id: "phy_4", label: "Maux de tête fréquents", categoryId: "physique" },
              { id: "phy_5", label: "Mange peu, saute des repas", categoryId: "physique" },
              { id: "men_1", label: "Irritable, s’énerve vite", categoryId: "mentale" },
              { id: "men_2", label: "Oublis, erreurs d’inattention", categoryId: "mentale" },
              { id: "men_3", label: "Pleure en rentrant chez elle", categoryId: "mentale" },
              { id: "men_4", label: "N’a plus envie de venir travailler", categoryId: "mentale" },
              {
                id: "men_5",
                label: "Se sent vidée : « je n’y arrive plus »",
                categoryId: "mentale",
              },
            ],
            explanation:
              "Les signes du corps relèvent de l’intégrité physique, ceux du moral de l’intégrité mentale. Se sentir vidée est un signe d’épuisement professionnel.",
          },
        },
        {
          title: "Jeu : l’effet domino chez CDE",
          type: "sorting",
          instructions:
            "Classer chaque événement de la chaîne selon la conséquence qu’il représente pour l’entreprise.",
          payload: {
            prompt:
              "Neuf événements s’enchaînent chez CDE. Coût ou climat social ?",
            categories: [
              { id: "cout", label: "Coût" },
              { id: "climat", label: "Climat social" },
            ],
            items: [
              {
                id: "cout_1",
                label: "Élodie est en arrêt de travail pendant trois semaines",
                categoryId: "cout",
              },
              {
                id: "cout_2",
                label: "Un intérimaire est embauché et doit être formé",
                categoryId: "cout",
              },
              {
                id: "cout_3",
                label: "Un salarié fatigué se blesse en manutention",
                categoryId: "cout",
              },
              {
                id: "cout_4",
                label: "Des pièces non conformes sont expédiées, le client les renvoie",
                categoryId: "cout",
              },
              {
                id: "cout_5",
                label: "NAVALIS applique des pénalités de retard",
                categoryId: "cout",
              },
              {
                id: "clim_1",
                label: "Les collègues sont épuisés et se disputent",
                categoryId: "climat",
              },
              {
                id: "clim_2",
                label: "Un soudeur démissionne",
                categoryId: "climat",
              },
              {
                id: "clim_3",
                label: "Plus personne ne veut travailler au poste à commande numérique",
                categoryId: "climat",
              },
              {
                id: "clim_4",
                label: "L’image de CDE se dégrade et le recrutement devient difficile",
                categoryId: "climat",
              },
            ],
            explanation:
              "Le coût est ce que l’entreprise paie ; le climat social est la qualité des relations et du dialogue. Les heures supplémentaires faites pour tenir les délais touchent les deux à la fois.",
          },
        },
        {
          title: "Relier les mots des conséquences",
          type: "matching",
          instructions: "Définir chaque notion de la séance en la reliant à son sens exact.",
          payload: {
            prompt: "Les mots qui servent à décrire les effets des risques psychosociaux.",
            pairs: [
              {
                id: "dommage",
                left: "Dommage",
                right: "Atteinte à la santé subie du fait d’une exposition",
              },
              {
                id: "physique",
                left: "Intégrité physique",
                right: "Le corps préservé de toute atteinte",
              },
              {
                id: "mentale",
                left: "Intégrité mentale",
                right: "L’état psychique préservé de toute atteinte",
              },
              {
                id: "cout",
                left: "Coût",
                right: "Charge financière supportée par l’entreprise",
              },
              {
                id: "climat",
                left: "Climat social",
                right: "Qualité des relations et du dialogue dans l’entreprise",
              },
              {
                id: "burnout",
                left: "Épuisement professionnel",
                right: "Réactions qui font suite à un stress professionnel qui dure",
              },
            ],
            explanation:
              "Un facteur agit sur une personne, l’exposition dure, et le dommage apparaît. L’entreprise le paie ensuite en coût et en climat social.",
          },
        },
      ],
    },
    {
      title: "Proposer des mesures de prévention",
      description:
        "Tu vas apprendre à choisir des mesures qui changent le travail chez CDE, et à justifier pourquoi elles passent avant les mesures qui visent seulement la personne.",
      activities: [
        {
          title: "À retenir : prévention collective, formation, information",
          type: "content",
          instructions:
            "Repérer les trois types de mesures et l’ordre dans lequel on les choisit.",
          payload: {
            body: "M. Berthier, le responsable, a une première idée : offrir une application de relaxation à Élodie. Est-ce suffisant ?\n\nNon, et c’est le point clé de la séance. L’application n’est pas une mauvaise chose, mais elle ne change aucune cause. Si l’on fait seulement cela, la personne suivante au poste vivra exactement la même chose.\n\nLa prévention collective agit sur l’organisation du travail et protège plusieurs personnes à la fois : remplacer un salarié absent, renégocier un délai, fixer les priorités une seule fois par jour, laisser une marge pour réorganiser ses séries, renvoyer les appels difficiles vers le responsable commercial, appliquer la procédure qualité, rapprocher un poste isolé de l’équipe. Elle supprime ou réduit le facteur à la source.\n\nLa formation développe des connaissances et des compétences : former les responsables d’équipe à repérer les signes de risques psychosociaux, former les salariés à gérer un échange avec un client agressif.\n\nL’information transmet des repères utiles : expliquer le rachat et le calendrier des affectations, afficher les interlocuteurs à qui s’adresser.\n\nLa formation et l’information complètent la prévention collective, elles ne la remplacent pas. Une mesure qui vise seulement la personne laisse le facteur en place.\n\nLes interlocuteurs à connaître : le médecin du travail, les représentants du personnel au CSE, le comité social et économique, et ton tuteur de PFMP pendant la période en entreprise.",
          },
        },
        {
          title: "À retenir : ce que le Code du travail impose à l’employeur",
          type: "content",
          instructions:
            "Repérer les trois types de mesures que l’employeur doit mettre en place.",
          payload: {
            body: "L’article L. 4121-1 du Code du travail dit ceci.\n\n« L’employeur prend les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des travailleurs. Ces mesures comprennent : 1° Des actions de prévention des risques professionnels […] ; 2° Des actions d’information et de formation ; 3° La mise en place d’une organisation et de moyens adaptés. »\n\nDeux mots comptent beaucoup ici : santé physique ET mentale. Protéger le moral des salariés n’est pas une faveur, c’est une obligation de l’employeur. CDE ne peut donc pas laisser Élodie se débrouiller seule.\n\nLes trois types de mesures cités par l’article sont : les actions de prévention, les actions d’information et de formation, et la mise en place d’une organisation et de moyens adaptés.\n\nC’est pour cela qu’une mesure collective passe avant une mesure qui vise seulement une personne : elle agit sur la cause, elle protège aussi les autres salariés, et l’employeur y est tenu.",
          },
        },
        {
          title: "Défi 01 : l’application de relaxation",
          type: "qcm",
          instructions:
            "Justifier pourquoi une mesure ne suffit pas, à partir du facteur visé.",
          payload: {
            question:
              "M. Berthier propose d’offrir une application de relaxation à Élodie. Pourquoi cette mesure ne peut-elle pas être la mesure principale ?",
            choices: [
              {
                id: "facteur",
                label: "Parce qu’elle ne change aucun facteur : la personne suivante au poste vivra la même chose",
              },
              { id: "cher", label: "Parce qu’elle coûte trop cher à l’entreprise" },
              { id: "inutile", label: "Parce que la relaxation ne sert jamais à rien" },
              { id: "interdit", label: "Parce que le Code du travail interdit ce type de mesure" },
            ],
            correctChoiceIds: ["facteur"],
            explanation:
              "L’application n’est pas mauvaise, mais elle laisse la charge, les délais et les priorités exactement comme ils sont. Elle ne remplace pas une mesure collective.",
          },
        },
        {
          title: "Défi 02 : les appels du client",
          type: "qcm",
          instructions:
            "Formuler la mesure de prévention collective qui répond au facteur repéré.",
          payload: {
            question:
              "Élodie doit gérer seule les appels d’un client mécontent depuis l’absence de Karim. Quelle mesure de prévention collective répond à ce facteur ?",
            choices: [
              {
                id: "renvoi",
                label: "Renvoyer les appels du client vers le responsable commercial",
              },
              { id: "relax", label: "Conseiller à Élodie de respirer avant de décrocher" },
              { id: "prendre", label: "Lui demander de prendre sur elle" },
              { id: "equipe", label: "Lui proposer de changer d’équipe" },
            ],
            correctChoiceIds: ["renvoi"],
            explanation:
              "Renvoyer les appels change l’organisation du travail : le facteur disparaît pour Élodie et pour celle ou celui qui tiendra le poste après elle.",
          },
        },
        {
          title: "Défi 03 : expliquer l’obligation de l’employeur",
          type: "qcm",
          instructions:
            "Expliquer en quoi l’article L. 4121-1 oblige CDE à agir.",
          payload: {
            question:
              "L’article L. 4121-1 du Code du travail oblige l’employeur à prendre des mesures. Lesquelles exactement ?",
            choices: [
              {
                id: "mentale",
                label: "Des mesures qui assurent la sécurité et protègent la santé physique et mentale des travailleurs",
              },
              {
                id: "physique",
                label: "Uniquement des mesures qui protègent la santé physique, le moral relevant de la vie privée",
              },
              {
                id: "volontaire",
                label: "Des mesures facultatives, que l’employeur prend s’il le souhaite",
              },
              {
                id: "salarie",
                label: "Des mesures que chaque salarié doit prendre pour lui-même",
              },
            ],
            correctChoiceIds: ["mentale"],
            explanation:
              "L’article nomme la santé physique et mentale. Les risques psychosociaux relèvent donc de l’obligation de l’employeur, pas d’un problème personnel.",
          },
        },
        {
          title: "Défi 04 : le conseil du responsable à Inès",
          type: "qcm",
          instructions:
            "Justifier pourquoi un conseil adressé à la personne ne suffit pas.",
          payload: {
            question:
              "Inès débite deux fois plus de tôles depuis le départ d’un collègue non remplacé, et son chef change le planning plusieurs fois par jour. Il lui conseille de « souffler un peu le week-end ». Quelle réponse est la mieux argumentée ?",
            choices: [
              {
                id: "cause",
                label: "Le conseil ne suffit pas, parce que la surcharge et le planning restent les mêmes et que l’employeur doit protéger la santé mentale",
              },
              {
                id: "repos",
                label: "Le conseil suffit, parce que le repos du week-end compense la charge de la semaine",
              },
              {
                id: "ines",
                label: "Le conseil suffit, parce qu’Inès est la seule à se plaindre",
              },
              {
                id: "formation",
                label: "Le conseil suffit, parce qu’une formation est toujours plus efficace qu’une mesure collective",
              },
            ],
            correctChoiceIds: ["cause"],
            explanation:
              "Il faut remplacer le collègue ou répartir la charge et fixer le planning une fois par jour. Ces mesures agissent sur la cause et protègent toute l’équipe.",
          },
        },
        {
          title: "Vrai ou faux : par quoi commencer",
          type: "true_false",
          instructions: "Indiquer sur quoi la prévention agit d’abord.",
          payload: {
            statement:
              "Pour prévenir les risques psychosociaux, l’employeur agit d’abord sur l’organisation du travail.",
            correctAnswer: true,
            explanation:
              "Vrai. C’est la prévention collective : elle supprime ou réduit le facteur à la source et protège tous les salariés.",
          },
        },
        {
          title: "Vrai ou faux : la formation remplace-t-elle le reste",
          type: "true_false",
          instructions: "Préciser la place de la formation et de l’information.",
          payload: {
            statement:
              "La formation et l’information remplacent la prévention collective.",
            correctAnswer: false,
            explanation:
              "Faux. Elles la complètent. Former un chef d’atelier est utile, mais cela ne réduit pas à soi seul la charge de travail ni les délais.",
          },
        },
        {
          title: "Vrai ou faux : santé physique et mentale",
          type: "true_false",
          instructions: "Expliquer ce que couvre l’obligation de l’employeur.",
          payload: {
            statement:
              "Selon l’article L. 4121-1 du Code du travail, l’employeur protège la santé physique et mentale des salariés.",
            correctAnswer: true,
            explanation:
              "Vrai. Les deux mots figurent dans l’article. Un risque psychosocial entre donc pleinement dans l’obligation de l’employeur.",
          },
        },
        {
          title: "Vrai ou faux : changer la personne de poste",
          type: "true_false",
          instructions: "Justifier l’effet réel d’une mesure visant une seule personne.",
          payload: {
            statement:
              "Déplacer Élodie dans une autre équipe règle le problème pour tout l’atelier.",
            correctAnswer: false,
            explanation:
              "Faux. Le facteur reste en place au poste : la personne suivante le subira à son tour. Une mesure collective agit sur le travail lui-même.",
          },
        },
        {
          title: "Vrai ou faux : afficher les interlocuteurs",
          type: "true_false",
          instructions: "Classer une mesure parmi les trois types.",
          payload: {
            statement:
              "Afficher dans l’atelier les coordonnées du médecin du travail et des représentants du personnel est une mesure d’information.",
            correctAnswer: true,
            explanation:
              "Vrai. L’information transmet des repères utiles. Elle complète les mesures qui changent l’organisation du travail.",
          },
        },
        {
          title: "Jeu : trier les douze propositions faites chez CDE",
          type: "sorting",
          instructions:
            "Classer chaque proposition selon le type de mesure qu’elle représente.",
          payload: {
            prompt:
              "Douze propositions sur la table chez CDE. Laquelle change le travail, laquelle ne change que la personne ?",
            categories: [
              { id: "collective", label: "Prévention collective" },
              { id: "formation", label: "Formation" },
              { id: "information", label: "Information" },
              { id: "personne", label: "Agit seulement sur la personne" },
            ],
            items: [
              {
                id: "col_1",
                label: "Remplacer Karim par un intérimaire pendant son absence",
                categoryId: "collective",
              },
              {
                id: "col_2",
                label: "Fixer les priorités une seule fois par jour et laisser une marge pour réorganiser les séries",
                categoryId: "collective",
              },
              {
                id: "col_3",
                label: "Renvoyer les appels du client vers le responsable commercial",
                categoryId: "collective",
              },
              {
                id: "col_4",
                label: "Ne plus expédier de pièce non conforme et renégocier le délai avec le client",
                categoryId: "collective",
              },
              {
                id: "col_5",
                label: "Rapprocher le poste isolé de l’équipe et rappeler en réunion les règles de respect",
                categoryId: "collective",
              },
              {
                id: "inf_1",
                label: "Organiser une réunion pour expliquer le rachat et le calendrier des affectations",
                categoryId: "information",
              },
              {
                id: "inf_2",
                label: "Afficher les interlocuteurs : médecin du travail, représentants du personnel",
                categoryId: "information",
              },
              {
                id: "for_1",
                label: "Former les responsables d’équipe à repérer les signes de risques psychosociaux",
                categoryId: "formation",
              },
              {
                id: "for_2",
                label: "Former les salariés à gérer un échange avec un client agressif",
                categoryId: "formation",
              },
              {
                id: "per_1",
                label: "Offrir à Élodie une application de relaxation",
                categoryId: "personne",
              },
              {
                id: "per_2",
                label: "Conseiller à Élodie de « prendre sur elle »",
                categoryId: "personne",
              },
              {
                id: "per_3",
                label: "Proposer à Élodie de changer d’équipe",
                categoryId: "personne",
              },
            ],
            explanation:
              "Les trois dernières ne changent aucune cause : elles laissent le facteur en place pour la personne suivante. Les autres agissent sur le travail, et la formation comme l’information viennent les compléter.",
          },
        },
        {
          title: "Jeu : une mesure en face de chaque facteur",
          type: "matching",
          instructions:
            "Relier chaque facteur repéré chez CDE à la mesure de prévention qui lui répond.",
          payload: {
            prompt:
              "Le plan d’action de CDE : à chaque facteur sa mesure.",
            pairs: [
              {
                id: "intensite",
                left: "Intensité et temps de travail : 180 pièces, délai avancé, Karim absent",
                right: "Remplacer Karim, renégocier le délai, étaler la commande",
              },
              {
                id: "emotion",
                left: "Exigences émotionnelles : Élodie répond elle-même au client",
                right: "Renvoyer les appels vers le commercial et former à la gestion d’un client agressif",
              },
              {
                id: "autonomie",
                left: "Manque d’autonomie : l’ordre des séries est imposé",
                right: "Fixer les priorités une fois par jour et laisser une marge pour réorganiser",
              },
              {
                id: "social",
                left: "Rapports sociaux dégradés : remarques, poste isolé",
                right: "Rapprocher le poste, réunion d’équipe et règles de respect",
              },
              {
                id: "valeurs",
                left: "Conflit de valeurs : expédier des pièces non conformes",
                right: "Appliquer la procédure qualité et dialoguer avec le client",
              },
              {
                id: "insecurite",
                left: "Insécurité : rachat et affectations inconnues",
                right: "Réunion d’information sur le rachat et le calendrier",
              },
            ],
            explanation:
              "Une mesure utile se reconnaît à ceci : elle répond à un facteur précis, et elle protège aussi les salariés qui occuperont le poste après.",
          },
        },
      ],
    },
    {
      title: "Bilan de séquence : agir sur le travail chez CDE",
      description:
        "Tu vas réinvestir tout ce que tu as appris sur trois situations nouvelles de l’atelier CDE, en repérant un fait, en choisissant le bon mot et en justifiant ta réponse.",
      activities: [
        {
          title: "La méthode attendue dans une réponse rédigée",
          type: "content",
          instructions:
            "Repérer les quatre étapes attendues dans une réponse rédigée.",
          payload: {
            body: "Une réponse complète suit toujours les mêmes étapes.\n\n1. Je repère les faits dans le document indiqué.\n2. Je choisis le mot précis de la séquence : un facteur, un dommage, un type de mesure.\n3. J’explique le lien entre le fait et ce mot.\n4. Je propose ou je justifie avec « parce que ».\n\nExemple : « Le document indique que le planning change plusieurs fois par jour sans explication. C’est un manque d’autonomie, parce que les compagnons ne décident plus de l’ordre de leur travail. Un point d’équipe chaque matin fixerait les priorités, parce qu’il agit sur l’organisation et protège toute l’équipe. »\n\nLes mots de la séquence à réemployer : risque psychosocial, stress, violence interne, violence externe, facteur, dommage, intégrité physique, intégrité mentale, coût, climat social, prévention collective, formation, information.\n\nÀ qui en parler si une situation de travail te pèse : ton tuteur de PFMP, le médecin du travail, les représentants du personnel, l’infirmière scolaire, le CPE.",
          },
        },
        {
          title: "Mission CDE 01 : le planning qui change sans arrêt",
          type: "qcm",
          instructions:
            "Identifier les facteurs présents dans la situation.",
          payload: {
            question:
              "Chez CDE, le chef d’atelier change les priorités plusieurs fois par jour sans explication. Les compagnons se sentent débordés. Quels facteurs reconnais-tu ?",
            choices: [
              {
                id: "deux",
                label: "L’intensité du travail et le manque d’autonomie",
              },
              { id: "externe", label: "La violence externe et le conflit de valeurs" },
              { id: "interne", label: "La violence interne et l’insécurité de la situation de travail" },
              { id: "aucun", label: "Aucun facteur : un chef a le droit d’organiser le travail" },
            ],
            correctChoiceIds: ["deux"],
            explanation:
              "Les compagnons sont débordés, c’est l’intensité du travail. Ils ne savent plus quelle pièce lancer et n’ont pas d’explication, c’est un manque d’autonomie.",
          },
        },
        {
          title: "Mission CDE 02 : du facteur à la conséquence pour l’entreprise",
          type: "qcm",
          instructions:
            "Expliquer le lien entre les facteurs repérés et une conséquence pour CDE.",
          payload: {
            question:
              "Dans ce même atelier, deux compagnons sont en arrêt et des pièces sont rebutées. Quelle explication relie correctement les faits ?",
            choices: [
              {
                id: "chaine",
                label: "La surcharge et la confusion provoquent stress et fatigue : des compagnons s’arrêtent et les rebuts augmentent, ce qui a un coût pour CDE",
              },
              {
                id: "hasard",
                label: "Les arrêts et les rebuts arrivent par hasard, sans lien avec l’organisation",
              },
              {
                id: "machine",
                label: "Les rebuts viennent forcément d’un défaut des machines",
              },
              {
                id: "personnes",
                label: "Les compagnons concernés manquent de motivation",
              },
            ],
            correctChoiceIds: ["chaine"],
            explanation:
              "Le facteur agit sur la santé, l’absence et la non-qualité suivent, et l’entreprise les paie. C’est l’effet domino vu avec Élodie.",
          },
        },
        {
          title: "Mission CDE 03 : la mesure à proposer",
          type: "qcm",
          instructions:
            "Formuler la mesure de prévention collective adaptée à la situation.",
          payload: {
            question:
              "Quelle mesure agit vraiment sur la cause du problème dans cet atelier ?",
            choices: [
              {
                id: "point",
                label: "Organiser un point d’équipe chaque matin qui fixe et explique les priorités, et établir un planning réaliste",
              },
              { id: "relax", label: "Proposer un atelier de relaxation le vendredi soir" },
              { id: "prime", label: "Verser une prime aux compagnons qui tiennent les délais" },
              { id: "silence", label: "Demander aux compagnons de ne plus se plaindre" },
            ],
            correctChoiceIds: ["point"],
            explanation:
              "Le point d’équipe agit sur l’organisation du travail et protège toute l’équipe : c’est de la prévention collective, prioritaire.",
          },
        },
        {
          title: "Mission CDE 04 : justifier la priorité",
          type: "qcm",
          instructions:
            "Justifier pourquoi une mesure collective passe avant un atelier de relaxation.",
          payload: {
            question:
              "Pourquoi le point d’équipe passe-t-il avant l’atelier de relaxation ?",
            choices: [
              {
                id: "source",
                label: "Parce qu’il agit sur la cause, dans l’organisation, et pour toute l’équipe",
              },
              { id: "gratuit", label: "Parce qu’il ne coûte rien à l’entreprise" },
              { id: "rapide", label: "Parce qu’il prend moins de temps qu’un atelier de relaxation" },
              { id: "oblige", label: "Parce que la relaxation est interdite dans les entreprises" },
            ],
            correctChoiceIds: ["source"],
            explanation:
              "La relaxation peut aider une personne, mais elle laisse le facteur en place. La mesure collective réduit le facteur à la source et l’employeur y est tenu.",
          },
        },
        {
          title: "Vrai ou faux : nommer la forme de risque",
          type: "true_false",
          instructions: "Nommer la forme de risque psychosocial correspondant au fait.",
          payload: {
            statement:
              "Un conflit entre l’équipe soudage et l’équipe tôlerie est une violence interne.",
            correctAnswer: true,
            explanation:
              "Vrai. Les deux équipes appartiennent à l’entreprise : la violence est interne.",
          },
        },
        {
          title: "Vrai ou faux : la cadence après le rachat",
          type: "true_false",
          instructions: "Distinguer un facteur d’un dommage.",
          payload: {
            statement:
              "L’augmentation de la cadence depuis le rachat de CDE est un dommage.",
            correctAnswer: false,
            explanation:
              "Faux. C’est un facteur : un élément de l’organisation qui augmente le risque. Le dommage, c’est l’atteinte à la santé qui peut en résulter.",
          },
        },
        {
          title: "Vrai ou faux : pièces rebutées et troubles du sommeil",
          type: "true_false",
          instructions: "Classer un effet entre la santé et l’entreprise.",
          payload: {
            statement:
              "Les pièces rebutées et le départ de soudeurs sont des effets sur l’entreprise, les troubles du sommeil et l’anxiété des effets sur la santé.",
            correctAnswer: true,
            explanation:
              "Vrai. Les premiers relèvent du coût et du climat social, les seconds de l’intégrité physique et de l’intégrité mentale.",
          },
        },
        {
          title: "Vrai ou faux : l’entretien de retour après un arrêt",
          type: "true_false",
          instructions: "Indiquer à quoi sert un entretien de retour après un arrêt.",
          payload: {
            statement:
              "Recevoir un salarié en entretien à son retour d’arrêt ne sert à rien tant que l’organisation du travail n’a pas changé.",
            correctAnswer: false,
            explanation:
              "Faux. L’entretien de retour accompagne la personne et permet de repérer ce qui doit changer. Il complète la prévention collective, il ne la remplace pas.",
          },
        },
        {
          title: "Jeu : facteur, dommage ou mesure",
          type: "sorting",
          instructions:
            "Classer chaque élément selon qu’il est une cause, un effet ou une mesure de prévention.",
          payload: {
            prompt:
              "Toute la séquence en un tableau : ce qui provoque, ce qui en résulte, ce qui protège.",
            categories: [
              { id: "facteur", label: "Facteur, donc une cause dans le travail" },
              { id: "dommage", label: "Effet sur la santé ou sur l’entreprise" },
              { id: "mesure", label: "Mesure de prévention" },
            ],
            items: [
              {
                id: "fac_1",
                label: "Des délais raccourcis et des pauses difficiles",
                categoryId: "facteur",
              },
              {
                id: "fac_2",
                label: "Ne plus choisir l’ordre de ses pièces",
                categoryId: "facteur",
              },
              {
                id: "fac_3",
                label: "L’inquiétude liée au rachat de l’entreprise",
                categoryId: "facteur",
              },
              {
                id: "dom_1",
                label: "Des troubles du sommeil et de l’anxiété",
                categoryId: "dommage",
              },
              {
                id: "dom_2",
                label: "De l’absentéisme et des pièces rebutées",
                categoryId: "dommage",
              },
              {
                id: "dom_3",
                label: "Une ambiance dégradée et des départs de salariés",
                categoryId: "dommage",
              },
              {
                id: "mes_1",
                label: "Un point d’équipe chaque matin sur les priorités",
                categoryId: "mesure",
              },
              {
                id: "mes_2",
                label: "La formation des chefs d’atelier au dialogue",
                categoryId: "mesure",
              },
              {
                id: "mes_3",
                label: "L’affichage du médecin du travail et des représentants du personnel",
                categoryId: "mesure",
              },
            ],
            explanation:
              "La cause est dans le travail, l’effet se lit sur la santé et dans l’entreprise, et la mesure revient agir sur la cause. C’est la chaîne complète de la séquence.",
          },
        },
        {
          title: "Relier le vocabulaire de toute la séquence",
          type: "matching",
          instructions:
            "Définir chaque notion de la séquence en la reliant à son sens exact.",
          payload: {
            prompt: "Les mots à savoir réemployer dans une réponse rédigée.",
            pairs: [
              {
                id: "rps",
                left: "Risque psychosocial",
                right:
                  "Situation de travail où l’on trouve du stress ou des violences",
              },
              {
                id: "facteur",
                left: "Facteur",
                right: "Élément du travail qui augmente le risque",
              },
              {
                id: "dommage",
                left: "Dommage",
                right: "Atteinte à la santé subie du fait d’une exposition",
              },
              {
                id: "cout",
                left: "Coût",
                right: "Charge financière supportée par l’entreprise",
              },
              {
                id: "climat",
                left: "Climat social",
                right: "Qualité des relations et du dialogue dans l’entreprise",
              },
              {
                id: "collective",
                left: "Prévention collective",
                right: "Mesure qui agit sur l’organisation et protège plusieurs personnes",
              },
              {
                id: "formation",
                left: "Formation",
                right: "Action qui développe des connaissances et des compétences",
              },
              {
                id: "information",
                left: "Information",
                right: "Action qui transmet des repères utiles",
              },
            ],
            explanation:
              "Employer le mot juste, c’est déjà montrer que l’on a compris la situation : le facteur est dans le travail, le dommage dans la santé, la mesure revient sur le travail.",
          },
        },
      ],
    },
  ],
};
