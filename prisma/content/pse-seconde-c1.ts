import type { InitialActivity, InitialLearningSequence } from "./catalog-types";

type Context = {
  classroom: "2 AERO" | "2 CIEL";
  formation: string;
  place: string;
  mentor: string;
  learner: string;
  peer: string;
  introDocs: string;
  risks: string;
  suddenIncident: string;
  chronicExample: string;
  unknownTask: string;
  signalDanger: string;
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
      { id: "classer", left: "Classer", right: "Ranger dans la bonne catégorie" },
      { id: "differencier", left: "Différencier", right: "Montrer ce qui distingue deux notions" },
      { id: "expliquer", left: "Expliquer", right: "Rendre clair avec un argument" },
      { id: "rediger", left: "Rédiger", right: "Écrire une réponse construite" },
    ],
    explanation:
      "Lire le verbe de consigne évite de répondre à côté : une consigne demande une action précise.",
  },
};

export function buildPseSecondeC1Sequence(context: Context): InitialLearningSequence {
  return {
    title: "C1. Les enjeux de la santé et sécurité au travail",
    description:
      `Tu vas comprendre pourquoi la santé-sécurité au travail protège les personnes, l'équipe et l'entreprise, à partir de situations chez ${context.place}.`,
    lessons: [
      {
        title: "Identifier les enjeux de la santé-sécurité au travail",
        description:
          `Repérer les conséquences humaines, sociales et socio-économiques d'un incident professionnel dans le contexte ${context.formation}.`,
        activities: [
          verbsActivity,
          {
            title: "À retenir : les trois enjeux de la prévention",
            type: "content",
            instructions:
              "Repérer les trois familles d'enjeux de la santé-sécurité au travail.",
            payload: {
              body:
                `Premier jour chez ${context.place}. ${context.mentor} remet ${context.introDocs}. Le message est simple : la sécurité protège la personne, l'équipe et l'entreprise.\n\nUn enjeu humain concerne la santé ou la vie d'une personne : douleur, blessure, fatigue, stress, handicap ou perte de confiance.\n\nUn enjeu social concerne le collectif : famille inquiète, équipe désorganisée, entraide nécessaire, retard dans le travail.\n\nUn enjeu socio-économique concerne les coûts et l'activité : soins, arrêt de travail, remplacement, matériel abîmé, intervention retardée, perte de qualité ou de confiance.\n\nDans le secteur ${context.formation}, les situations de travail exposent notamment à ${context.risks}. La prévention sert à réduire ces dommages avant qu'ils arrivent.`,
            },
          },
          {
            title: "Défi 01 : qui est concerné par la prévention ?",
            type: "qcm",
            instructions:
              "Identifier les personnes concernées par la santé-sécurité au travail.",
            payload: {
              question:
                `${context.learner} observe une situation dangereuse pendant une activité. Qui est concerné par la prévention ?`,
              choices: [
                { id: "tous", label: "L'élève, les collègues, l'entreprise et parfois la famille" },
                { id: "seul", label: "Uniquement la personne qui se blesse" },
                { id: "client", label: "Uniquement le client" },
                { id: "personne", label: "Personne si l'activité est habituelle" },
              ],
              correctChoiceIds: ["tous"],
              explanation:
                "Un accident ou une maladie liée au travail peut avoir des conséquences humaines, sociales et socio-économiques.",
            },
          },
          {
            title: "Jeu : classer les conséquences d'un incident",
            type: "sorting",
            instructions:
              "Classer chaque conséquence dans la famille d'enjeu correspondante.",
            payload: {
              prompt:
                `Après un incident chez ${context.place}, classe chaque conséquence.`,
              categories: [
                { id: "humain", label: "Enjeu humain" },
                { id: "social", label: "Enjeu social" },
                { id: "socio_eco", label: "Enjeu socio-économique" },
              ],
              items: [
                { id: "douleur", label: "Douleur ou blessure", categoryId: "humain" },
                { id: "stress", label: "Stress après l'incident", categoryId: "humain" },
                { id: "famille", label: "Famille inquiète", categoryId: "social" },
                { id: "equipe", label: "Équipe réorganisée", categoryId: "social" },
                { id: "retard", label: "Intervention retardée", categoryId: "socio_eco" },
                { id: "remplacement", label: "Remplacement à organiser", categoryId: "socio_eco" },
                { id: "materiel", label: "Matériel endommagé", categoryId: "socio_eco" },
                { id: "soins", label: "Soins nécessaires", categoryId: "humain" },
              ],
              explanation:
                "Une même situation peut produire plusieurs effets : sur la personne, sur le collectif et sur l'activité.",
            },
          },
          {
            title: "Vrai ou faux : la prévention coûte seulement de l'argent",
            type: "true_false",
            instructions:
              "Expliquer si la prévention a uniquement un enjeu économique.",
            payload: {
              statement:
                "La prévention concerne seulement l'argent dépensé par l'entreprise.",
              correctAnswer: false,
              explanation:
                "Faux : l'enjeu économique existe, mais la prévention protège d'abord la santé des personnes et le fonctionnement du collectif.",
            },
          },
          {
            title: "Jeu : relier les mots clés de la séance",
            type: "matching",
            instructions:
              "Définir chaque notion en la reliant à son sens exact.",
            payload: {
              prompt: "Reconstitue le lexique de la santé-sécurité au travail.",
              pairs: [
                { id: "humain", left: "Enjeu humain", right: "Effet sur la santé ou la vie d'une personne" },
                { id: "social", left: "Enjeu social", right: "Effet sur l'équipe, la famille ou l'organisation" },
                { id: "eco", left: "Enjeu socio-économique", right: "Effet sur les coûts et l'activité" },
                { id: "prevention", left: "Prévention", right: "Action réalisée avant le dommage" },
              ],
              explanation:
                "Ces trois enjeux sont explicitement attendus dans le module C1 du programme de seconde professionnelle.",
            },
          },
        ],
      },
      {
        title: "Différencier accident du travail et maladie professionnelle",
        description:
          "Distinguer un fait soudain lié au travail d'une exposition répétée ou prolongée, à partir d'indices simples.",
        activities: [
          {
            title: "À retenir : accident, maladie, lésion et exposition",
            type: "content",
            instructions:
              "Repérer les critères qui permettent de différencier accident du travail et maladie professionnelle.",
            payload: {
              body:
                `${context.suddenIncident} Cet événement est soudain, datable et lié au travail : il peut correspondre à un accident du travail s'il provoque une lésion.\n\n${context.chronicExample} Ici, l'atteinte apparaît après une exposition répétée ou prolongée : elle peut correspondre à une maladie professionnelle si le lien avec le travail est reconnu.\n\nUne lésion est une atteinte physique ou psychique. Une exposition chronique est un contact ou une contrainte qui se répète dans le temps.\n\nPour différencier les deux situations, il faut repérer les circonstances, le moment d'apparition, la durée d'exposition et les informations disponibles.`,
            },
          },
          {
            title: "Défi 02 : l'événement soudain",
            type: "qcm",
            instructions:
              "Identifier la situation qui correspond le mieux à un accident du travail.",
            payload: {
              question:
                "Quelle situation contient l'indice principal d'un accident du travail ?",
              choices: [
                { id: "soudain", label: "Une coupure se produit pendant une tâche, à un moment précis" },
                { id: "progressif", label: "Une douleur augmente après des gestes répétés pendant plusieurs mois" },
                { id: "fatigue", label: "Une fatigue apparaît sans lien décrit avec une tâche" },
                { id: "ancien", label: "Une gêne ancienne est évoquée sans circonstance connue" },
              ],
              correctChoiceIds: ["soudain"],
              explanation:
                "L'accident du travail repose sur un fait soudain lié au travail et une lésion.",
            },
          },
          {
            title: "Défi 03 : l'exposition chronique",
            type: "qcm",
            instructions:
              "Identifier l'indice qui oriente vers une maladie professionnelle.",
            payload: {
              question:
                "Quel indice oriente vers une maladie professionnelle possible ?",
              choices: [
                { id: "duree", label: "Une exposition répétée ou prolongée dans le travail" },
                { id: "hasard", label: "Un événement sans rapport avec le travail" },
                { id: "unique", label: "Un seul choc soudain pendant une tâche" },
                { id: "rumeur", label: "Une information rapportée sans fait précis" },
              ],
              correctChoiceIds: ["duree"],
              explanation:
                "Une maladie professionnelle est recherchée quand une atteinte peut être liée à une exposition professionnelle répétée ou prolongée.",
            },
          },
          {
            title: "Jeu : accident, maladie ou information insuffisante",
            type: "sorting",
            instructions:
              "Classer chaque situation à partir des indices fournis.",
            payload: {
              prompt: "Lis chaque carte et classe-la dans la colonne adaptée.",
              categories: [
                { id: "accident", label: "Accident du travail" },
                { id: "maladie", label: "Maladie professionnelle possible" },
                { id: "insuffisant", label: "Information insuffisante" },
              ],
              items: [
                { id: "coupure", label: "Coupure pendant une tâche, à 10 h 15", categoryId: "accident" },
                { id: "projection", label: "Projection dans l'oeil pendant une opération", categoryId: "accident" },
                { id: "poignet", label: "Douleur au poignet après des gestes répétés", categoryId: "maladie" },
                { id: "audition", label: "Baisse d'audition après des années d'exposition au bruit", categoryId: "maladie" },
                { id: "mal_tete", label: "Mal de tête sans circonstance décrite", categoryId: "insuffisant" },
                { id: "douleur_vague", label: "Douleur évoquée sans date, tâche ni exposition", categoryId: "insuffisant" },
              ],
              explanation:
                "Quand les faits sont incomplets, on ne conclut pas trop vite : on cherche les indices manquants.",
            },
          },
          {
            title: "Vrai ou faux : une maladie professionnelle est toujours soudaine",
            type: "true_false",
            instructions:
              "Justifier la réponse avec la notion d'exposition chronique.",
            payload: {
              statement:
                "Une maladie professionnelle apparaît toujours après un événement soudain et unique.",
              correctAnswer: false,
              explanation:
                "Faux : elle est souvent liée à une exposition répétée ou prolongée dans le travail.",
            },
          },
          {
            title: "Jeu : relier chaque indice à la bonne notion",
            type: "matching",
            instructions:
              "Différencier les indices d'un accident et d'une maladie professionnelle.",
            payload: {
              prompt: "Relie l'indice à la notion correspondante.",
              pairs: [
                { id: "fait_soudain", left: "Fait soudain", right: "Accident du travail" },
                { id: "lesion", left: "Lésion", right: "Atteinte physique ou psychique" },
                { id: "exposition", left: "Exposition chronique", right: "Répétition ou durée" },
                { id: "faits", left: "Faits précis", right: "Base d'une analyse fiable" },
              ],
              explanation:
                "La différenciation repose sur les indices présents dans les documents et dans la situation.",
            },
          },
        ],
      },
      {
        title: "Repérer les obligations et la protection des jeunes travailleurs",
        description:
          "Repérer dans un document le cadre réglementaire, les obligations de l'employeur et du salarié, et les règles spécifiques aux jeunes travailleurs ou nouveaux embauchés.",
        activities: [
          {
            title: "À retenir : le cadre réglementaire au travail",
            type: "content",
            instructions:
              "Repérer qui doit agir dans une situation encadrée par des règles de santé-sécurité.",
            payload: {
              body:
                `La santé-sécurité au travail s'appuie sur un cadre réglementaire : des règles organisent les responsabilités de chacun.\n\nL'employeur doit évaluer les risques, organiser la prévention, informer, former et fournir les moyens de protection adaptés.\n\nLe salarié doit respecter les consignes, utiliser correctement le matériel et les protections, et signaler une situation dangereuse.\n\nUn jeune travailleur ou un nouvel embauché bénéficie d'un accueil et de consignes adaptés. Certaines tâches dangereuses sont interdites ou réglementées. Avant une tâche inconnue, il ne faut pas improviser : il faut demander une consigne et un encadrement.\n\nSituation ${context.classroom} : ${context.unknownTask}`,
            },
          },
          {
            title: "Défi 04 : l'obligation de l'employeur",
            type: "qcm",
            instructions:
              "Identifier une obligation de l'employeur en santé-sécurité.",
            payload: {
              question:
                "Quelle action relève de l'obligation de l'employeur ?",
              choices: [
                { id: "former", label: "Informer, former et organiser la prévention" },
                { id: "ignorer", label: "Laisser le nouvel arrivant deviner les consignes" },
                { id: "risquer", label: "Demander une tâche dangereuse sans encadrement" },
                { id: "cacher", label: "Ne pas parler des risques du poste" },
              ],
              correctChoiceIds: ["former"],
              explanation:
                "L'employeur organise la prévention et donne les informations nécessaires pour travailler en sécurité.",
            },
          },
          {
            title: "Défi 05 : l'obligation du salarié",
            type: "qcm",
            instructions:
              "Identifier une obligation du salarié face à une situation dangereuse.",
            payload: {
              question:
                context.signalDanger,
              choices: [
                { id: "signaler", label: "Respecter les consignes et signaler le danger" },
                { id: "continuer", label: "Continuer sans rien dire" },
                { id: "modifier", label: "Modifier seul le matériel" },
                { id: "rumeur", label: "Répéter une rumeur sans fait précis" },
              ],
              correctChoiceIds: ["signaler"],
              explanation:
                "Le salarié participe à la prévention : il respecte les règles et signale les situations dangereuses.",
            },
          },
          {
            title: "Jeu : qui doit faire quoi ?",
            type: "sorting",
            instructions:
              "Classer chaque action selon l'acteur concerné.",
            payload: {
              prompt: "Employeur, salarié, jeune travailleur ou nouvel embauché : classe les actions.",
              categories: [
                { id: "employeur", label: "Employeur" },
                { id: "salarie", label: "Salarié" },
                { id: "jeune", label: "Jeune ou nouvel embauché" },
              ],
              items: [
                { id: "evaluer", label: "Évaluer les risques", categoryId: "employeur" },
                { id: "former", label: "Former à la sécurité", categoryId: "employeur" },
                { id: "epi", label: "Fournir les protections nécessaires", categoryId: "employeur" },
                { id: "respecter", label: "Respecter les consignes", categoryId: "salarie" },
                { id: "utiliser", label: "Utiliser correctement les protections", categoryId: "salarie" },
                { id: "signaler", label: "Signaler un danger", categoryId: "salarie" },
                { id: "accueil", label: "Recevoir un accueil sécurité adapté", categoryId: "jeune" },
                { id: "demander", label: "Demander avant une tâche inconnue", categoryId: "jeune" },
              ],
              explanation:
                "La prévention repose sur des responsabilités complémentaires, dans un cadre réglementaire.",
            },
          },
          {
            title: "Vrai ou faux : un jeune nouvel embauché improvise",
            type: "true_false",
            instructions:
              "Expliquer la conduite sûre avant une tâche inconnue.",
            payload: {
              statement:
                "Un jeune ou un nouvel embauché doit improviser si la consigne n'est pas claire.",
              correctAnswer: false,
              explanation:
                "Faux : il doit demander une consigne, un encadrement ou une validation avant d'agir.",
            },
          },
          {
            title: `Mission ${context.classroom} : rédiger une conduite sûre`,
            type: "qcm",
            instructions:
              "Identifier le message professionnel le plus adapté.",
            payload: {
              question:
                "La consigne n'est pas claire et la tâche peut présenter un danger. Quel message est le plus professionnel ?",
              choices: [
                { id: "clair", label: `${context.mentor}, je n'ai pas la consigne pour cette tâche. Je suspends l'action et je vous demande de vérifier les conditions de sécurité.` },
                { id: "vague", label: "Je fais comme je peux, on verra bien." },
                { id: "accusation", label: "Personne ne s'occupe de la sécurité ici." },
                { id: "silence", label: "Je ne dis rien pour ne pas déranger." },
              ],
              correctChoiceIds: ["clair"],
              explanation:
                "Une communication sûre décrit le problème, annonce l'action prudente et formule une demande claire.",
            },
          },
          {
            title: "Bilan : relier le cadre réglementaire aux réflexes sûrs",
            type: "matching",
            instructions:
              "Définir chaque notion de la séance en la reliant à son rôle.",
            payload: {
              prompt: "Le cadre réglementaire donne des repères pour agir sans improviser.",
              pairs: [
                { id: "cadre", left: "Cadre réglementaire", right: "Règles qui organisent les responsabilités" },
                { id: "employeur", left: "Employeur", right: "Évalue, organise, informe et forme" },
                { id: "salarie", left: "Salarié", right: "Respecte les consignes et signale" },
                { id: "jeune", left: "Jeune travailleur", right: "Bénéficie de protections renforcées" },
                { id: "nouveau", left: "Nouvel embauché", right: "Reçoit un accueil et des consignes adaptés" },
              ],
              explanation:
                "Le module C1 demande de repérer les dispositions réglementaires de l'employeur, du salarié et des jeunes travailleurs ou nouveaux embauchés.",
            },
          },
        ],
      },
    ],
  };
}
