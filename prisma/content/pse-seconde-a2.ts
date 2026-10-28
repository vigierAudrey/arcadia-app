import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

type Context = {
  classroom: "2 AERO" | "2 CIEL";
  place: string;
  mentor: string;
  learner: string;
  peer: string;
  wakeTaskPhrase: string;
  shiftChangeReason: string;
  criticalTask: string;
  concentrationTask: string;
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
      { id: "presenter", left: "Présenter", right: "Faire connaître de façon organisée" },
      { id: "proposer", left: "Proposer", right: "Faire une suggestion justifiée pour résoudre un problème" },
    ],
    explanation:
      "Lire le verbe de consigne évite de répondre à côté : une consigne demande une action précise.",
  },
};

export function buildPseSecondeA2Sequence(context: Context): InitialLearningSequence {
  return {
    title: "A2. Les rythmes biologiques et le sommeil",
    description: `Tu vas comprendre comment fonctionnent tes rythmes biologiques et ton sommeil, et pourquoi bien dormir te protège au travail, à partir de situations chez ${context.place}.`,
    lessons: [
      {
        title: "Rythmes, cycles et phases du sommeil",
        description: `Identifier un rythme biologique et présenter les rôles des phases du sommeil, à partir d'une situation chez ${context.place}.`,
        activities: [
          verbsActivity,
          {
            title: "À retenir : rythme biologique, cycle et phases du sommeil",
            type: "content",
            instructions: "Identifier un rythme biologique et présenter les rôles des phases du sommeil.",
            payload: {
              body: `${context.learner} enchaîne une soirée tardive et arrive fatigué(e) ${context.wakeTaskPhrase}. Une courbe de sommeil montre plusieurs cycles qui se succèdent pendant la nuit. ${context.learner} veut comprendre pourquoi il/elle récupère mal.\n\nUn rythme biologique est une fonction du corps qui se répète régulièrement, selon un cycle et une fréquence propres (le rythme cardiaque et le rythme respiratoire en sont des exemples). Le sommeil, lui, est organisé en un cycle qui se répète plusieurs fois au cours d'une même nuit.\n\nLe sommeil lent participe surtout à la récupération physique du corps. Le sommeil paradoxal participe notamment aux fonctions mentales, comme la mémoire. Une nuit écourtée réduit la part de ces phases, et donc la récupération.`,
            },
          },
          {
            title: "Défi 01 : le cycle du sommeil",
            type: "qcm",
            instructions: "Identifier ce qu'est un cycle du sommeil.",
            payload: {
              question: "En observant une courbe de sommeil, comment appelle-t-on la suite de phases qui se répète plusieurs fois pendant la nuit ?",
              choices: [
                { id: "cycle", label: "Le cycle du sommeil" },
                { id: "rythme_social", label: "Le rythme social" },
                { id: "horloge", label: "L'horloge biologique" },
                { id: "hygiene", label: "L'hygiène du sommeil" },
              ],
              correctChoiceIds: ["cycle"],
              explanation:
                "Le cycle du sommeil est la suite de phases (dont le sommeil lent et le sommeil paradoxal) qui se répète plusieurs fois pendant la nuit.",
            },
          },
          {
            title: "Défi 02 : le rôle des phases du sommeil",
            type: "qcm",
            instructions: "Présenter le rôle de chaque phase du sommeil.",
            payload: {
              question: `${context.peer} a bien dormi et se souvient facilement de ce qu'elle a appris la veille. Quelle phase du sommeil est surtout concernée ?`,
              choices: [
                { id: "paradoxal", label: "Le sommeil paradoxal, qui participe notamment aux fonctions mentales" },
                { id: "lent", label: "Le sommeil lent, qui participe surtout à la récupération physique" },
                { id: "social", label: "Le rythme social" },
                { id: "desync", label: "La désynchronisation" },
              ],
              correctChoiceIds: ["paradoxal"],
              explanation:
                "Le sommeil paradoxal participe notamment aux fonctions mentales, comme la mémoire. Le sommeil lent, lui, participe surtout à la récupération physique.",
            },
          },
          {
            title: "Jeu : classer les éléments de la situation",
            type: "sorting",
            instructions: "Classer chaque élément selon qu'il s'agit d'un rythme biologique, du cycle du sommeil ou d'une phase du sommeil.",
            payload: {
              prompt: "Rythme biologique, cycle du sommeil, ou phase du sommeil ?",
              categories: [
                { id: "rythme", label: "Rythme biologique" },
                { id: "cycle", label: "Cycle du sommeil" },
                { id: "phase", label: "Phase du sommeil" },
              ],
              items: [
                { id: "cardiaque", label: "Le rythme cardiaque", categoryId: "rythme" },
                { id: "respiratoire", label: "Le rythme respiratoire", categoryId: "rythme" },
                { id: "suite_phases", label: "La suite de phases qui se répète pendant la nuit", categoryId: "cycle" },
                { id: "lent", label: "Le sommeil lent", categoryId: "phase" },
                { id: "paradoxal", label: "Le sommeil paradoxal", categoryId: "phase" },
              ],
              explanation:
                "Un rythme biologique est une fonction qui se répète régulièrement ; le sommeil est organisé en cycles, eux-mêmes composés de phases (sommeil lent, sommeil paradoxal).",
            },
          },
          {
            title: "Vrai ou faux : le rôle du sommeil paradoxal",
            type: "true_false",
            instructions: "Présenter le rôle principal du sommeil paradoxal.",
            payload: {
              statement: "Le sommeil paradoxal participe surtout à la récupération physique.",
              correctAnswer: false,
              explanation:
                "Faux : c'est le sommeil lent qui participe surtout à la récupération physique. Le sommeil paradoxal participe notamment aux fonctions mentales.",
            },
          },
          {
            title: "Vrai ou faux : plusieurs cycles par nuit",
            type: "true_false",
            instructions: "Identifier le nombre de cycles de sommeil au cours d'une nuit.",
            payload: {
              statement: "Plusieurs cycles de sommeil se succèdent pendant une même nuit.",
              correctAnswer: true,
              explanation: "Vrai : le cycle du sommeil se répète plusieurs fois au cours d'une même nuit.",
            },
          },
          {
            title: "Jeu : relier les mots clés de la séance",
            type: "matching",
            instructions: "Définir chaque notion en la reliant à son sens exact.",
            payload: {
              prompt: "Reconstitue le lexique des rythmes et du sommeil.",
              pairs: [
                { id: "rythme", left: "Rythme biologique", right: "Fonction du corps qui se répète régulièrement" },
                { id: "cycle", left: "Cycle du sommeil", right: "Suite de phases qui se répète pendant le sommeil" },
                { id: "lent", left: "Sommeil lent", right: "Phase participant notamment à la récupération physique" },
                { id: "paradoxal", left: "Sommeil paradoxal", right: "Phase participant notamment aux fonctions mentales" },
              ],
              explanation:
                "Ces notions sont celles attendues par le module A2 du programme de PSE en seconde professionnelle.",
            },
          },
        ],
      },
      {
        title: "Désynchronisation et travail posté",
        description: `Repérer les facteurs qui désynchronisent le sommeil et expliquer pourquoi le travail de nuit est encadré par des règles, à partir d'une situation chez ${context.place}.`,
        activities: [
          {
            title: "À retenir : horloge biologique, synchronisation et désynchronisation",
            type: "content",
            instructions: "Repérer les facteurs qui influencent les rythmes biologiques et présenter les conséquences d'une désynchronisation.",
            payload: {
              body: `${context.shiftChangeReason} modifie les horaires de l'équipe chez ${context.place}. ${context.learner} dort à des heures inhabituelles. Il/elle se sent moins vigilant(e) avant ${context.criticalTask}.\n\nL'horloge biologique est un système interne qui règle plusieurs fonctions du corps sur un cycle d'environ 24 heures. Elle se règle normalement sur des repères externes comme la lumière du jour et les habitudes de vie : c'est la synchronisation.\n\nLe rythme social (les horaires de travail, les loisirs, les repas) peut aussi influencer les rythmes biologiques. Quand les horaires de vie ne correspondent plus aux repères habituels, par exemple lors d'un travail posté où plusieurs équipes se relaient, l'horloge biologique se décale par rapport à ces repères : c'est la désynchronisation.\n\nLa désynchronisation a des conséquences sur la santé (fatigue, baisse de vigilance, risque d'erreur), sur la vie sociale (décalage avec l'entourage) et sur la vie professionnelle (risque accru pendant une tâche critique).\n\nLe travail de nuit expose à ce risque : il est pour cette raison encadré par une réglementation, qui prévoit notamment des temps de repos et peut ouvrir des droits, comme ceux du compte professionnel de prévention. Les règles précises doivent toujours être vérifiées auprès d'une source officielle à jour (code du travail, convention collective).`,
            },
          },
          {
            title: "Défi 03 : pourquoi la vigilance baisse",
            type: "qcm",
            instructions: "Justifier pourquoi la vigilance baisse après un changement brutal d'horaires.",
            payload: {
              question: `Pourquoi ${context.learner} se sent-il/elle moins vigilant(e) avant ${context.criticalTask} après un changement brutal d'horaires ?`,
              choices: [
                { id: "desync", label: "Parce que ses rythmes biologiques sont désynchronisés par rapport à ses repères habituels" },
                { id: "pas_horloge", label: "Parce qu'il/elle n'a pas d'horloge biologique" },
                { id: "pas_social", label: "Parce que le rythme social n'existe pas dans ce métier" },
                { id: "interdit", label: "Parce que la réglementation l'interdit" },
              ],
              correctChoiceIds: ["desync"],
              explanation:
                "Un changement brutal d'horaires désynchronise l'horloge biologique par rapport aux repères habituels, ce qui réduit la vigilance.",
            },
          },
          {
            title: "Défi 04 : les repères de l'horloge biologique",
            type: "qcm",
            instructions: "Identifier ce qui règle normalement l'horloge biologique.",
            payload: {
              question: "Qu'est-ce qui règle normalement l'horloge biologique sur un cycle d'environ 24 heures ?",
              choices: [
                { id: "reperes", label: "Des repères externes comme la lumière du jour et les habitudes de vie" },
                { id: "volonte", label: "Uniquement la volonté de la personne" },
                { id: "cpp", label: "Le compte professionnel de prévention" },
                { id: "cardiaque", label: "Le rythme cardiaque uniquement" },
              ],
              correctChoiceIds: ["reperes"],
              explanation:
                "La synchronisation de l'horloge biologique repose sur des repères externes, notamment la lumière du jour et les habitudes de vie.",
            },
          },
          {
            title: "Jeu : classer les conséquences de la désynchronisation",
            type: "sorting",
            instructions: "Classer chaque conséquence selon qu'elle touche la santé, la vie sociale ou la vie professionnelle.",
            payload: {
              prompt: "Conséquence sur la santé, la vie sociale, ou la vie professionnelle ?",
              categories: [
                { id: "sante", label: "Conséquence sur la santé" },
                { id: "sociale", label: "Conséquence sur la vie sociale" },
                { id: "pro", label: "Conséquence sur la vie professionnelle" },
              ],
              items: [
                { id: "fatigue", label: "Une fatigue accrue et une baisse de vigilance", categoryId: "sante" },
                { id: "entourage", label: "Moins de temps partagé avec l'entourage le soir", categoryId: "sociale" },
                { id: "erreur", label: `Un risque d'erreur plus élevé pendant ${context.criticalTask}`, categoryId: "pro" },
              ],
              explanation:
                "La désynchronisation touche à la fois la santé, la vie sociale et la vie professionnelle de la personne concernée.",
            },
          },
          {
            title: "Vrai ou faux : le travail de nuit est encadré",
            type: "true_false",
            instructions: "Expliquer que le travail de nuit est encadré par une réglementation.",
            payload: {
              statement: "Le travail de nuit est encadré par une réglementation, qui prévoit notamment des temps de repos.",
              correctAnswer: true,
              explanation:
                "Vrai : des règles encadrent le travail de nuit, notamment des temps de repos. Les règles précises doivent être vérifiées sur une source officielle à jour.",
            },
          },
          {
            title: "Vrai ou faux : aucune conséquence sur la vigilance",
            type: "true_false",
            instructions: "Présenter une conséquence possible de la désynchronisation sur la vigilance.",
            payload: {
              statement: "La désynchronisation des rythmes biologiques n'a aucune conséquence sur la vigilance.",
              correctAnswer: false,
              explanation:
                "Faux : une désynchronisation peut réduire la vigilance et augmenter le risque d'erreur, en particulier pendant une tâche critique.",
            },
          },
          {
            title: "Jeu : relier les mots clés de la séance",
            type: "matching",
            instructions: "Définir chaque notion en la reliant à son sens exact.",
            payload: {
              prompt: "Reconstitue le lexique de la désynchronisation et du travail posté.",
              pairs: [
                { id: "horloge", left: "Horloge biologique", right: "Système interne qui règle les rythmes du corps" },
                { id: "sync", left: "Synchronisation", right: "Accord entre les rythmes du corps et les repères externes" },
                { id: "desync", left: "Désynchronisation", right: "Décalage entre ces rythmes et les repères" },
                { id: "poste", left: "Travail posté", right: "Organisation où plusieurs équipes se relaient" },
              ],
              explanation:
                "Ces quatre notions permettent d'expliquer pourquoi un changement d'horaires affecte la vigilance, comme le demande le module A2.",
            },
          },
        ],
      },
      {
        title: "Améliorer la qualité du sommeil",
        description: `Proposer des mesures réalistes pour mieux dormir, à partir d'une situation chez ${context.place}.`,
        activities: [
          {
            title: "À retenir : hygiène du sommeil",
            type: "content",
            instructions: "Proposer des mesures pour améliorer la qualité du sommeil.",
            payload: {
              body: `${context.peer} utilise son téléphone tard le soir et boit une boisson stimulante avant de se coucher. Le lendemain, ${context.peer} manque de concentration ${context.concentrationTask}. Il/elle cherche des changements réalistes pour mieux dormir.\n\nL'hygiène du sommeil regroupe les habitudes qui favorisent un sommeil de qualité. Des horaires de coucher et de lever réguliers aident l'horloge biologique à se synchroniser.\n\nLa lumière émise par les écrans en fin de journée peut retarder l'endormissement. Les stimulants, pris tard dans la soirée, peuvent eux aussi gêner l'endormissement et la qualité du sommeil.\n\nUn environnement calme (chambre peu éclairée, peu bruyante) favorise le repos. Un rituel de coucher, c'est-à-dire une suite d'habitudes calmes avant de dormir, aide le corps à se préparer au sommeil.\n\nProposer une mesure pour mieux dormir suppose de choisir un changement réaliste, adapté à la situation de la personne, et de l'expliquer.`,
            },
          },
          {
            title: "Défi 05 : pourquoi limiter les écrans",
            type: "qcm",
            instructions: "Expliquer pourquoi réduire les écrans le soir aide à s'endormir.",
            payload: {
              question: "Pourquoi réduire les écrans avant de se coucher aide-t-il à s'endormir ?",
              choices: [
                { id: "lumiere", label: "Parce que la lumière des écrans peut retarder l'endormissement" },
                { id: "remplace", label: "Parce que les écrans remplacent le rituel de coucher" },
                { id: "recup", label: "Parce que les écrans augmentent la récupération physique" },
                { id: "regle", label: "Parce que les écrans règlent l'horloge biologique" },
              ],
              correctChoiceIds: ["lumiere"],
              explanation:
                "La lumière émise par les écrans en fin de journée peut retarder l'endormissement.",
            },
          },
          {
            title: "Défi 06 : l'effet des stimulants",
            type: "qcm",
            instructions: "Expliquer l'effet d'un stimulant pris tard dans la soirée sur le sommeil.",
            payload: {
              question: `${context.peer} boit une boisson stimulante juste avant de se coucher. Quel est l'effet probable sur son sommeil ?`,
              choices: [
                { id: "difficile", label: "Un endormissement plus difficile et un sommeil de moins bonne qualité" },
                { id: "aucun", label: "Aucun effet, les stimulants n'agissent que le matin" },
                { id: "recup", label: "Une meilleure récupération physique" },
                { id: "sync", label: "Une synchronisation plus rapide de l'horloge biologique" },
              ],
              correctChoiceIds: ["difficile"],
              explanation:
                "Les stimulants pris tard dans la soirée peuvent gêner l'endormissement et réduire la qualité du sommeil.",
            },
          },
          {
            title: "Jeu : trier les habitudes du soir",
            type: "sorting",
            instructions: "Classer chaque habitude selon qu'il faut la favoriser, la limiter le soir, ou l'adapter à la situation.",
            payload: {
              prompt: "À favoriser, à limiter le soir, ou à adapter ?",
              categories: [
                { id: "favoriser", label: "À favoriser" },
                { id: "limiter", label: "À limiter le soir" },
                { id: "adapter", label: "À adapter" },
              ],
              items: [
                { id: "horaires", label: "Des horaires de coucher réguliers", categoryId: "favoriser" },
                { id: "chambre", label: "Une chambre calme et peu éclairée", categoryId: "favoriser" },
                { id: "ecrans", label: "Les écrans en fin de soirée", categoryId: "limiter" },
                { id: "stimulants", label: "Les boissons stimulantes tardives", categoryId: "limiter" },
                { id: "rituel", label: "Un rituel de coucher adapté à sa situation", categoryId: "adapter" },
              ],
              explanation:
                "Certaines habitudes favorisent le sommeil, d'autres le gênent si elles sont prises le soir ; un rituel de coucher doit être adapté à chaque situation.",
            },
          },
          {
            title: "Vrai ou faux : le rituel de coucher",
            type: "true_false",
            instructions: "Définir ce qu'est un rituel de coucher.",
            payload: {
              statement: "Un rituel de coucher regroupe des habitudes calmes avant de dormir.",
              correctAnswer: true,
              explanation: "Vrai : c'est une suite d'habitudes calmes avant le sommeil, qui aide le corps à s'y préparer.",
            },
          },
          {
            title: "Vrai ou faux : les stimulants sans effet",
            type: "true_false",
            instructions: "Préciser l'effet des stimulants pris tard le soir.",
            payload: {
              statement: "Les stimulants pris tard dans la soirée n'ont aucun effet sur le sommeil.",
              correctAnswer: false,
              explanation:
                "Faux : pris tard, ils peuvent gêner l'endormissement et réduire la qualité du sommeil.",
            },
          },
          {
            title: "Jeu : relier les mots clés de la séance",
            type: "matching",
            instructions: "Définir chaque notion en la reliant à son sens exact.",
            payload: {
              prompt: "Reconstitue le lexique de l'hygiène du sommeil.",
              pairs: [
                { id: "hygiene", left: "Hygiène du sommeil", right: "Habitudes favorables à un sommeil de qualité" },
                { id: "ecran", left: "Écran", right: "Appareil lumineux pouvant retarder l'endormissement" },
                { id: "stimulant", left: "Stimulant", right: "Produit pouvant augmenter temporairement l'éveil" },
                { id: "rituel", left: "Rituel de coucher", right: "Suite d'habitudes calmes avant le sommeil" },
              ],
              explanation:
                "Ces quatre notions permettent de proposer des mesures concrètes pour améliorer la qualité du sommeil, comme le demande le module A2.",
            },
          },
        ],
      },
    ],
  };
}
