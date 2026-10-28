import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

type Context = {
  classroom: "2 AERO" | "2 CIEL";
  place: string;
  mentor: string;
  learner: string;
  peer: string;
  liftTask: string;
  effortTask: string;
  effortPlace: string;
  sedentaryTask: string;
};

const verbsActivity: InitialActivity = {
  title: "Décodage des consignes : les verbes de la séquence",
  type: "matching",
  instructions:
    "Identifier le sens exact de chaque verbe de consigne utilisé dans la séquence.",
  payload: {
    prompt: "Relie chaque verbe de consigne à ce que tu dois produire.",
    pairs: [
      { id: "identifier", left: "Identifier", right: "Reconnaître et nommer" },
      { id: "reperer", left: "Repérer", right: "Trouver une information dans un document" },
      { id: "expliquer", left: "Expliquer", right: "Rendre clair avec un argument" },
      { id: "comparer", left: "Comparer", right: "Présenter les points communs et les différences entre plusieurs éléments" },
      { id: "justifier", left: "Justifier", right: "Donner des arguments fondés sur les faits" },
    ],
    explanation:
      "Lire le verbe de consigne évite de répondre à côté : une consigne demande une action précise.",
  },
};

export function buildPseSecondeA3Sequence(context: Context): InitialLearningSequence {
  return {
    title: "A3. L'activité physique",
    description: `Tu vas comprendre comment ton muscle te fait bouger, ce qui se passe dans ton corps pendant un effort, et pourquoi bouger régulièrement te fait du bien, à partir de situations chez ${context.place}.`,
    lessons: [
      {
        title: "Le muscle et le mouvement volontaire",
        description: `Expliquer le mouvement volontaire à l'aide de la structure et des propriétés du muscle strié squelettique, à partir d'une situation chez ${context.place}.`,
        activities: [
          verbsActivity,
          {
            title: "À retenir : le muscle strié squelettique et ses propriétés",
            type: "content",
            instructions: "Expliquer le mouvement volontaire à l'aide de la structure et des propriétés du muscle.",
            payload: {
              body: `${context.learner} lève l'avant-bras pour ${context.liftTask}. Il/elle sent le muscle de l'avant de son bras durcir. ${context.mentor} lui montre un schéma du bras : les os, les tendons, le biceps à l'avant et le triceps à l'arrière.\n\nLe muscle strié squelettique est relié aux os par les tendons ; il est commandé par la volonté. Un message nerveux, venu du cerveau par un nerf, déclenche la contraction. Le muscle se raccourcit et tire sur l'os : c'est le mouvement volontaire. Les muscles fonctionnent par paires opposées : l'un se contracte, l'autre se relâche.\n\nLe muscle a quatre propriétés. L'excitabilité est sa capacité à réagir à un message nerveux. La contractilité est sa capacité à se raccourcir en produisant une force. L'élasticité est sa capacité à reprendre sa forme après un étirement. La tonicité est une légère contraction permanente du muscle au repos.`,
            },
          },
          {
            title: "Défi 01 : la propriété qui raccourcit le muscle",
            type: "qcm",
            instructions: "Identifier la propriété du muscle qui lui permet de se raccourcir.",
            payload: {
              question: `${context.peer} soulève un objet et sent son biceps durcir pendant la montée. Quelle propriété du muscle lui permet de se raccourcir en produisant une force ?`,
              choices: [
                { id: "contractilite", label: "La contractilité" },
                { id: "elasticite", label: "L'élasticité" },
                { id: "tonicite", label: "La tonicité" },
                { id: "excitabilite", label: "L'excitabilité" },
              ],
              correctChoiceIds: ["contractilite"],
              explanation:
                "La contractilité est la propriété du muscle de se raccourcir en produisant une force : c'est elle qui permet le mouvement.",
            },
          },
          {
            title: "Défi 02 : pourquoi le muscle opposé se relâche",
            type: "qcm",
            instructions: "Expliquer pourquoi les muscles fonctionnent par paires opposées.",
            payload: {
              question: "Pendant que le biceps se contracte pour plier le bras, que doit faire le triceps pour que le mouvement soit possible ?",
              choices: [
                { id: "relacher", label: "Il doit se relâcher, sinon il s'opposerait au mouvement" },
                { id: "contracter_aussi", label: "Il doit se contracter en même temps que le biceps" },
                { id: "disparaitre", label: "Il n'intervient à aucun moment" },
                { id: "casser", label: "Le tendon qui le relie à l'os doit se rompre" },
              ],
              correctChoiceIds: ["relacher"],
              explanation:
                "Les muscles fonctionnent par paires opposées : si le triceps restait contracté, il s'opposerait au biceps et le bras ne pourrait pas se plier.",
            },
          },
          {
            title: "Jeu : classer les éléments du mouvement",
            type: "sorting",
            instructions: "Classer chaque élément selon qu'il s'agit d'une structure, d'une étape du mouvement ou d'une propriété du muscle.",
            payload: {
              prompt: "Structure, étape du mouvement, ou propriété du muscle ?",
              categories: [
                { id: "structure", label: "Structure" },
                { id: "etape", label: "Étape du mouvement" },
                { id: "propriete", label: "Propriété du muscle" },
              ],
              items: [
                { id: "tendon", label: "Le tendon, qui relie le muscle à l'os", categoryId: "structure" },
                { id: "message", label: "Le message nerveux venu du cerveau", categoryId: "etape" },
                { id: "contraction", label: "La contraction du muscle", categoryId: "etape" },
                { id: "contractilite", label: "La contractilité", categoryId: "propriete" },
                { id: "elasticite", label: "L'élasticité", categoryId: "propriete" },
                { id: "tonicite", label: "La tonicité", categoryId: "propriete" },
              ],
              explanation:
                "Le mouvement volontaire s'appuie sur une structure (muscle, tendon, os), se déroule en étapes (message nerveux puis contraction), et dépend des propriétés du muscle.",
            },
          },
          {
            title: "Vrai ou faux : le muscle strié squelettique",
            type: "true_false",
            instructions: "Définir ce qu'est le muscle strié squelettique.",
            payload: {
              statement: "Le muscle strié squelettique est relié aux os par des tendons et commandé par la volonté.",
              correctAnswer: true,
              explanation: "Vrai : un message nerveux, venu du cerveau, déclenche sa contraction volontaire.",
            },
          },
          {
            title: "Vrai ou faux : les muscles opposés se contractent ensemble",
            type: "true_false",
            instructions: "Justifier le fonctionnement des muscles opposés.",
            payload: {
              statement: "Les deux muscles d'une paire opposée se contractent toujours en même temps.",
              correctAnswer: false,
              explanation: "Faux : l'un se contracte pendant que l'autre se relâche, sinon le mouvement serait impossible.",
            },
          },
          {
            title: "Jeu : relier les mots clés de la séance",
            type: "matching",
            instructions: "Définir chaque notion en la reliant à son sens exact.",
            payload: {
              prompt: "Reconstitue le lexique du muscle et du mouvement volontaire.",
              pairs: [
                { id: "muscle", left: "Muscle strié squelettique", right: "Muscle relié aux os par des tendons, commandé par la volonté" },
                { id: "excitabilite", left: "Excitabilité", right: "Propriété du muscle de réagir à un message nerveux" },
                { id: "contractilite", left: "Contractilité", right: "Propriété du muscle de se raccourcir en produisant une force" },
                { id: "elasticite", left: "Élasticité", right: "Propriété du muscle de reprendre sa forme après un étirement" },
                { id: "tonicite", left: "Tonicité", right: "Légère contraction permanente du muscle au repos" },
              ],
              explanation:
                "Ces notions sont celles attendues par le module A3 du programme de PSE en seconde professionnelle.",
            },
          },
        ],
      },
      {
        title: "Le corps pendant l'effort",
        description: `Expliquer d'où le muscle tire son énergie et repérer les modifications du corps pendant un effort, à partir d'une situation chez ${context.place}.`,
        activities: [
          {
            title: "À retenir : énergie, déchets et modifications du corps pendant l'effort",
            type: "content",
            instructions: "Expliquer d'où le muscle tire son énergie et repérer les modifications du corps pendant l'effort.",
            payload: {
              body: `${context.peer} ${context.effortTask} chez ${context.effortPlace} pendant vingt minutes. Son cœur bat plus vite, sa respiration s'accélère, elle/il a chaud et transpire. Après une pause de dix minutes, tout revient peu à peu à la normale.\n\nPour se contracter, le muscle consomme de l'énergie, tirée des nutriments (glucose) grâce au dioxygène. Le travail du muscle produit des déchets, dont le dioxyde de carbone, et de la chaleur.\n\nPendant l'effort, le rythme cardiaque (nombre de battements du cœur par minute) et le rythme respiratoire (nombre de mouvements respiratoires par minute) augmentent pour apporter plus de dioxygène aux muscles. La thermorégulation, notamment grâce à la transpiration, limite la hausse de la température du corps.\n\nPendant la récupération, après l'effort, le corps revient progressivement à l'état de repos.`,
            },
          },
          {
            title: "Défi 03 : pourquoi le cœur bat plus vite",
            type: "qcm",
            instructions: "Expliquer pourquoi le rythme cardiaque augmente pendant l'effort.",
            payload: {
              question: `Pendant l'effort chez ${context.effortPlace}, pourquoi le rythme cardiaque de ${context.peer} augmente-t-il ?`,
              choices: [
                { id: "plus_dioxygene", label: "Pour apporter plus vite le dioxygène et les nutriments dont les muscles ont besoin" },
                { id: "moins_energie", label: "Parce que les muscles consomment moins d'énergie" },
                { id: "stress", label: "Uniquement à cause du stress, sans lien avec l'effort musculaire" },
                { id: "chaleur_externe", label: "Uniquement à cause de la température extérieure" },
              ],
              correctChoiceIds: ["plus_dioxygene"],
              explanation:
                "Pendant l'effort, le muscle consomme plus d'énergie et a besoin de plus de dioxygène : le cœur bat plus vite pour l'apporter plus rapidement.",
            },
          },
          {
            title: "Défi 04 : le rôle de la transpiration",
            type: "qcm",
            instructions: "Expliquer le rôle de la thermorégulation pendant l'effort.",
            payload: {
              question: "À quoi sert la transpiration pendant un effort physique ?",
              choices: [
                { id: "thermoregulation", label: "Elle limite la hausse de la température du corps : c'est la thermorégulation" },
                { id: "energie", label: "Elle fournit de l'énergie supplémentaire au muscle" },
                { id: "dechet_seul", label: "Elle n'a aucun rôle, c'est juste un inconvénient" },
                { id: "respiration", label: "Elle remplace la respiration pendant l'effort" },
              ],
              correctChoiceIds: ["thermoregulation"],
              explanation:
                "La transpiration participe à la thermorégulation : elle aide à évacuer la chaleur produite par le travail musculaire.",
            },
          },
          {
            title: "Jeu : classer besoin, réponse du corps et déchet",
            type: "sorting",
            instructions: "Classer chaque élément selon qu'il s'agit d'un besoin de l'effort, d'une réponse du corps ou d'un déchet produit.",
            payload: {
              prompt: "Besoin de l'effort, réponse du corps, ou déchet produit ?",
              categories: [
                { id: "besoin", label: "Besoin de l'effort" },
                { id: "reponse", label: "Réponse du corps" },
                { id: "dechet", label: "Déchet produit" },
              ],
              items: [
                { id: "dioxygene", label: "Le dioxygène, nécessaire à la contraction du muscle", categoryId: "besoin" },
                { id: "nutriments", label: "Les nutriments (glucose), nécessaires à la contraction", categoryId: "besoin" },
                { id: "rythme_cardiaque", label: "L'augmentation du rythme cardiaque", categoryId: "reponse" },
                { id: "transpiration", label: "La transpiration", categoryId: "reponse" },
                { id: "co2", label: "Le dioxyde de carbone", categoryId: "dechet" },
                { id: "chaleur", label: "La chaleur produite par le muscle", categoryId: "dechet" },
              ],
              explanation:
                "Le muscle a besoin de dioxygène et de nutriments ; le corps répond en augmentant le rythme cardiaque, respiratoire et la transpiration ; il produit aussi des déchets, comme le dioxyde de carbone et la chaleur.",
            },
          },
          {
            title: "Vrai ou faux : l'énergie du muscle",
            type: "true_false",
            instructions: "Expliquer d'où le muscle tire l'énergie nécessaire à sa contraction.",
            payload: {
              statement: "Le muscle tire son énergie des nutriments, grâce au dioxygène.",
              correctAnswer: true,
              explanation: "Vrai : pour se contracter, le muscle consomme de l'énergie tirée des nutriments (glucose) grâce au dioxygène.",
            },
          },
          {
            title: "Vrai ou faux : le retour au repos",
            type: "true_false",
            instructions: "Préciser ce qui se passe pendant la récupération après l'effort.",
            payload: {
              statement: "Pendant la récupération, le corps revient immédiatement à l'état de repos, sans transition.",
              correctAnswer: false,
              explanation: "Faux : pendant la récupération, le corps revient progressivement, et non immédiatement, à l'état de repos.",
            },
          },
          {
            title: "Jeu : relier les mots clés de la séance",
            type: "matching",
            instructions: "Définir chaque notion en la reliant à son sens exact.",
            payload: {
              prompt: "Reconstitue le lexique du corps pendant l'effort.",
              pairs: [
                { id: "rythme_cardiaque", left: "Rythme cardiaque", right: "Nombre de battements du cœur par minute" },
                { id: "rythme_respiratoire", left: "Rythme respiratoire", right: "Nombre de mouvements respiratoires par minute" },
                { id: "thermoregulation", left: "Thermorégulation", right: "Maintien de la température du corps, notamment par la transpiration" },
                { id: "recuperation", left: "Récupération", right: "Retour progressif du corps à l'état de repos après l'effort" },
              ],
              explanation:
                "Ces notions permettent de repérer et d'expliquer les modifications physiologiques observées lors d'un effort musculaire.",
            },
          },
        ],
      },
      {
        title: "Activité physique, santé et sédentarité",
        description: `Démontrer l'intérêt d'une activité physique régulière pour la santé et repérer les risques de la sédentarité, à partir d'une situation chez ${context.place}.`,
        activities: [
          {
            title: "À retenir : activité physique et sédentarité",
            type: "content",
            instructions: "Démontrer l'intérêt d'une activité physique régulière pour la santé et repérer les risques de la sédentarité.",
            payload: {
              body: `Cette semaine, ${context.learner} passe ses journées assis(e) ${context.sedentaryTask}. Le soir, il/elle joue sur son téléphone, allongé(e). Il/elle se sent fatigué(e) et de mauvaise humeur. ${context.mentor} lui propose de venir le mardi soir à l'équipe de football de l'entreprise.\n\nL'activité physique est tout mouvement du corps qui augmente la dépense d'énergie : elle ne se limite pas à une activité sportive de loisir ou de compétition. La sédentarité, elle, est le temps passé éveillé assis ou allongé, avec très peu de mouvement.\n\nUne activité physique régulière améliore le bien-être physique (endurance, force, souplesse), le bien-être mental (bonne humeur, stress maîtrisé, sommeil de qualité) et le bien-être social (relations satisfaisantes avec les autres).\n\nLa régularité, c'est-à-dire une pratique répétée chaque jour ou chaque semaine, est nécessaire pour que ces bienfaits se maintiennent. Choisir une activité progressive et adaptée, et limiter le temps assis devant les écrans, aide à sortir de la sédentarité.`,
            },
          },
          {
            title: "Défi 05 : ce qu'est l'activité physique",
            type: "qcm",
            instructions: "Définir ce qu'est l'activité physique.",
            payload: {
              question: "Laquelle de ces affirmations décrit correctement l'activité physique ?",
              choices: [
                { id: "tout_mouvement", label: "C'est tout mouvement du corps qui augmente la dépense d'énergie, pas seulement le sport" },
                { id: "sport_seul", label: "C'est uniquement une activité sportive de compétition" },
                { id: "repos", label: "C'est le temps passé assis ou allongé" },
                { id: "ecran", label: "C'est le temps passé devant un écran" },
              ],
              correctChoiceIds: ["tout_mouvement"],
              explanation:
                "L'activité physique est tout mouvement du corps qui augmente la dépense d'énergie : elle ne se limite pas à une activité sportive de loisir ou de compétition.",
            },
          },
          {
            title: "Défi 06 : les trois dimensions du bien-être",
            type: "qcm",
            instructions: "Identifier les trois dimensions du bien-être améliorées par une activité physique régulière.",
            payload: {
              question: "Une activité physique régulière améliore quelles dimensions du bien-être ?",
              choices: [
                { id: "trois_dimensions", label: "Le bien-être physique, mental et social" },
                { id: "physique_seul", label: "Uniquement le bien-être physique" },
                { id: "financier", label: "Le bien-être financier" },
                { id: "aucun", label: "Aucune, l'activité physique n'a pas d'effet sur le bien-être" },
              ],
              correctChoiceIds: ["trois_dimensions"],
              explanation:
                "Une activité physique régulière améliore le bien-être physique, mental et social : trois dimensions complémentaires.",
            },
          },
          {
            title: "Jeu : classer les bienfaits selon leur dimension",
            type: "sorting",
            instructions: "Classer chaque bienfait selon la dimension du bien-être qu'il concerne.",
            payload: {
              prompt: "Bien-être physique, mental, ou social ?",
              categories: [
                { id: "physique", label: "Bien-être physique" },
                { id: "mental", label: "Bien-être mental" },
                { id: "social", label: "Bien-être social" },
              ],
              items: [
                { id: "endurance", label: "Une meilleure endurance", categoryId: "physique" },
                { id: "force", label: "Plus de force musculaire", categoryId: "physique" },
                { id: "humeur", label: "Une meilleure humeur", categoryId: "mental" },
                { id: "stress", label: "Un stress mieux maîtrisé", categoryId: "mental" },
                { id: "relations", label: "Des relations satisfaisantes avec les autres pratiquants", categoryId: "social" },
              ],
              explanation:
                "L'activité physique régulière agit sur trois dimensions complémentaires : le corps, l'état mental et les relations sociales.",
            },
          },
          {
            title: "Vrai ou faux : la sédentarité",
            type: "true_false",
            instructions: "Définir ce qu'est la sédentarité.",
            payload: {
              statement: "La sédentarité est le temps passé éveillé assis ou allongé, avec très peu de mouvement.",
              correctAnswer: true,
              explanation: "Vrai : c'est cette définition qui permet de la distinguer du simple repos nécessaire après un effort.",
            },
          },
          {
            title: "Vrai ou faux : la régularité",
            type: "true_false",
            instructions: "Justifier l'intérêt de la régularité dans une activité physique.",
            payload: {
              statement: "Une activité physique pratiquée une seule fois dans l'année suffit à maintenir ses bienfaits.",
              correctAnswer: false,
              explanation: "Faux : la régularité, c'est-à-dire une pratique répétée chaque jour ou chaque semaine, est nécessaire pour maintenir les bienfaits.",
            },
          },
          {
            title: "Jeu : relier les mots clés de la séance",
            type: "matching",
            instructions: "Définir chaque notion en la reliant à son sens exact.",
            payload: {
              prompt: "Reconstitue le lexique de l'activité physique et de la sédentarité.",
              pairs: [
                { id: "activite_physique", left: "Activité physique", right: "Tout mouvement du corps qui augmente la dépense d'énergie" },
                { id: "sedentarite", left: "Sédentarité", right: "Temps passé éveillé assis ou allongé, avec très peu de mouvement" },
                { id: "bien_etre_physique", left: "Bien-être physique", right: "Bon état du corps : endurance, force, souplesse" },
                { id: "bien_etre_mental", left: "Bien-être mental", right: "Bonne humeur, stress maîtrisé, sommeil de qualité" },
                { id: "bien_etre_social", left: "Bien-être social", right: "Relations satisfaisantes avec les autres" },
                { id: "regularite", left: "Régularité", right: "Pratique répétée dans le temps, chaque jour ou chaque semaine" },
              ],
              explanation:
                "Ces notions permettent de démontrer l'intérêt d'une activité physique régulière et de repérer les risques de la sédentarité, comme le demande le module A3.",
            },
          },
        ],
      },
    ],
  };
}
