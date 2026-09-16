/**
 * Corrections explicites de contenus DÉJÀ en ligne.
 *
 * L'import (scripts/import-contenus.ts) n'ajoute que ce qui manque et ne
 * modifie jamais une ligne existante. Corriger un texte déjà publié demande
 * donc une autorisation nominative : une entrée ici, une par champ, avec la
 * valeur attendue avant modification.
 *
 * Garde-fou : la correction n'est appliquée que si la valeur en base est
 * EXACTEMENT `from`. Si elle vaut déjà `to`, elle est signalée comme déjà
 * corrigée. Si elle vaut autre chose — parce qu'elle a été retouchée depuis
 * /admin — elle est laissée telle quelle et signalée : une retouche de
 * l'enseignante n'est jamais écrasée.
 */
export type ContentCorrection = {
  program: string;
  level: string;
  classroom: string;
  teachingArea: string;
  sequence: string;
  /** Titre ACTUEL de la séance en base. Absent = la correction porte sur la séquence. */
  lesson?: string;
  /** Titre ACTUEL de l'activité en base. Absent = la correction porte sur la séance. */
  activity?: string;
  field: "title" | "description" | "instructions" | `payload.${string}`;
  from: string | null;
  to: string;
  reason: string;
};

const TAAGA = {
  program: "CAP",
  level: "Terminale",
  classroom: "T AAGA",
  teachingArea: "PSE",
  sequence: "C1. Les différents contrats de travail",
} as const;

const LECON_CONTRATS = "Identifier les différents contrats de travail";
const LECON_DROITS = "Repérer les droits et obligations liés au contrat de travail";
const DESCRIPTION_ELEVE =
  "Description visible côté élèves : formulation courte, concrète, sans mention de référentiel ni note d'administration.";

/** Consigne réécrite avec un verbe de la liste officielle, un seul par consigne. */
function verbe(
  lesson: string,
  activity: string,
  from: string,
  to: string,
): ContentCorrection {
  return {
    ...TAAGA,
    lesson,
    activity,
    field: "instructions",
    from,
    to,
    reason:
      "Consigne rédigée avec un verbe hors liste officielle (_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md).",
  };
}

export const contentCorrections: readonly ContentCorrection[] = [
  // ── Séance 1 : les différents contrats ──────────────────────────────────────
  verbe(LECON_CONTRATS, "À retenir : les trois contrats",
    "Lis cette fiche avant de relever le défi.",
    "Repérer les trois contrats de travail présentés dans la fiche."),
  verbe(LECON_CONTRATS, "Défi 01 : le contrat de remplacement",
    "Choisis la bonne réponse, puis vérifie.",
    "Identifier le contrat adapté à un remplacement de trois semaines."),
  verbe(LECON_CONTRATS, "Défi 02 : la durée du contrat",
    "Repère l'indice qui caractérise le CDI.",
    "Indiquer l'information qui permet de reconnaître un CDI."),
  verbe(LECON_CONTRATS, "Défi 03 : travail et formation",
    "Choisis le contrat qui associe emploi et formation.",
    "Nommer le contrat qui associe le travail et la formation."),
  verbe(LECON_CONTRATS, "Jeu : tri express des contrats",
    "Sélectionne une carte, puis choisis sa catégorie.",
    "Classer chaque indice dans la colonne du contrat correspondant."),
  verbe(LECON_CONTRATS, "Jeu : relie les indices",
    "Pour chaque indice, choisis le contrat qui correspond.",
    "Identifier le contrat qui correspond à chaque indice."),

  // ── Séance 2 : droits et obligations ────────────────────────────────────────
  verbe(LECON_DROITS, "À retenir : mes droits et mes obligations",
    "Lis cette fiche avant de conseiller Lina.",
    "Repérer les droits et les obligations présentés dans la fiche."),
  verbe(LECON_DROITS, "Défi 01 : côté salarié",
    "Repère l'obligation du salarié.",
    "Identifier une obligation du salarié aux Glycines."),
  verbe(LECON_DROITS, "Défi 02 : côté employeur",
    "Repère ce que l'employeur doit faire.",
    "Indiquer une obligation de l'employeur."),
  verbe(LECON_DROITS, "Défi 03 : le conseil à Lina",
    "Choisis le conseil professionnel le plus adapté.",
    "Déduire la conduite à tenir par Lina dans cette situation."),
  verbe(LECON_DROITS, "Jeu : classe les responsabilités",
    "Sélectionne une carte, puis choisis qui est concerné.",
    "Classer chaque action selon qu'elle relève du salarié ou de l'employeur."),

  // ── Séance 3 : titre au verbe officiel, et séance jusqu'ici vide ────────────
  {
    ...TAAGA,
    lesson: "Lire les informations essentielles d'un contrat de travail",
    field: "title",
    from: "Lire les informations essentielles d'un contrat de travail",
    to: "Repérer les informations essentielles d’un contrat de travail",
    reason:
      "« Lire » ne figure pas dans la liste officielle des verbes de consigne ; « Repérer » y correspond (examiner avec précision, puis lister). Cette séance était affichée aux élèves sans aucune activité : l'import lui en ajoute quatre.",
  },
  {
    ...TAAGA,
    lesson: "Repérer les informations essentielles d’un contrat de travail",
    field: "description",
    from: null,
    to: "Retrouver la durée, le poste, le lieu de travail et le type de contrat dans un extrait, avant de signer.",
    reason: "Séance sans description ; la description situe la capacité travaillée.",
  },

  // ── Séquence : note pédagogique de préparation ──────────────────────────────
  {
    ...TAAGA,
    field: "description",
    from: "Module C1 du programme de PSE en CAP (thématique C). Objectif : faire travailler les élèves sur les compétences C1, C4, C5 et C6 du référentiel à travers les exercices réalisés. Situation fil rouge de la classe : l’EHPAD Les Glycines. La position indique uniquement l’ordre d’affichage.",
    to: "Tu vas apprendre à reconnaître les principaux contrats de travail et à repérer les droits et obligations utiles avant de signer.",
    reason: DESCRIPTION_ELEVE,
  },
  {
    program: "BAC PRO",
    level: "Seconde",
    classroom: "2 AERO",
    teachingArea: "PSE",
    sequence: "C1. Les enjeux de la santé et sécurité au travail",
    field: "description",
    from: "Module C1 du programme de PSE de seconde professionnelle. Objectif : faire travailler les élèves sur les compétences C1, C3 et C6 à partir de situations du fil rouge AéroMaintenance Atlantique (AMA). La séquence couvre les enjeux humains, sociaux et économiques de la santé-sécurité au travail, la différence accident du travail / maladie professionnelle, le cadre réglementaire, les obligations de l'employeur et du salarié, ainsi que les dispositions spécifiques aux jeunes travailleurs et aux nouveaux embauchés. La position indique uniquement l'ordre d'affichage.",
    to: "Tu vas comprendre pourquoi la santé-sécurité au travail protège les personnes, l'équipe et l'entreprise, à partir de situations chez AéroMaintenance Atlantique (AMA).",
    reason: DESCRIPTION_ELEVE,
  },
  {
    program: "BAC PRO",
    level: "Seconde",
    classroom: "2 CIEL",
    teachingArea: "PSE",
    sequence: "C1. Les enjeux de la santé et sécurité au travail",
    field: "description",
    from: "Module C1 du programme de PSE de seconde professionnelle. Objectif : faire travailler les élèves sur les compétences C1, C3 et C6 à partir de situations du fil rouge CIEL Réseaux & Systèmes (CRS). La séquence couvre les enjeux humains, sociaux et économiques de la santé-sécurité au travail, la différence accident du travail / maladie professionnelle, le cadre réglementaire, les obligations de l'employeur et du salarié, ainsi que les dispositions spécifiques aux jeunes travailleurs et aux nouveaux embauchés. La position indique uniquement l'ordre d'affichage.",
    to: "Tu vas comprendre pourquoi la santé-sécurité au travail protège les personnes, l'équipe et l'entreprise, à partir de situations chez CIEL Réseaux & Systèmes (CRS).",
    reason: DESCRIPTION_ELEVE,
  },
  {
    program: "BAC PRO",
    level: "Première",
    classroom: "1 AERO",
    teachingArea: "PSE",
    sequence: "C3. Les acteurs de prévention",
    field: "description",
    from: "Module C3 du programme de PSE de première professionnelle (annexe 1 « Prévention-santé-environnement — Classe de première professionnelle »). Objectif : faire travailler les élèves sur les compétences C1, C3 et C6 du référentiel à travers les exercices réalisés. Situation fil rouge de la classe : l’atelier de maintenance AéroMaintenance Atlantique (AMA). La position indique uniquement l’ordre d’affichage.",
    to: "Tu vas apprendre qui agit pour prévenir les risques au travail, dans l’entreprise et autour d’elle, à partir de situations de l’atelier AMA.",
    reason: DESCRIPTION_ELEVE,
  },
  {
    program: "BAC PRO",
    level: "Première",
    classroom: "1 TCI",
    teachingArea: "PSE",
    sequence: "C3. Les acteurs de prévention",
    field: "description",
    from: "Module C3 du programme de PSE de première professionnelle. Objectif : faire travailler les élèves sur les compétences C1, C3 et C6 du référentiel à travers les exercices réalisés. Situation fil rouge de la classe : l'atelier de chaudronnerie Chaudronnerie de l'Estuaire (CDE). La position indique uniquement l'ordre d'affichage.",
    to: "Tu vas apprendre qui agit pour prévenir les risques au travail, dans l’entreprise et autour d’elle, à partir de situations de l’atelier CDE.",
    reason: DESCRIPTION_ELEVE,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    sequence: "C7. Le suivi de la santé au travail",
    field: "description",
    from: "Module C7 du programme de PSE de terminale professionnelle (arrêté du 3 avril 2019, annexe 2). Objectif : faire travailler les élèves sur les compétences C1, C3 et C6 du référentiel à travers les exercices réalisés. La position indique uniquement l’ordre d’affichage.",
    to: "Tu vas comprendre comment le suivi de santé au travail protège les salariés, comment l’organisme réagit face aux microbes et pourquoi certaines vaccinations peuvent être utiles dans un hangar aéronautique.",
    reason: DESCRIPTION_ELEVE,
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    sequence: "C7. Le suivi de la santé au travail",
    field: "description",
    from: "Module C7 du programme de PSE de terminale professionnelle (arrêté du 3 avril 2019, annexe 2). Objectif : faire travailler les élèves sur les compétences C1, C3 et C6 du référentiel à travers les exercices réalisés. Situation fil rouge de la classe : l'atelier de chaudronnerie Chaudronnerie de l'Estuaire (CDE). La position indique uniquement l'ordre d'affichage.",
    to: "Tu vas comprendre comment le suivi de santé au travail protège les salariés, comment l'organisme réagit face aux microbes et pourquoi certaines vaccinations peuvent être utiles dans l'atelier CDE.",
    reason: DESCRIPTION_ELEVE,
  },
  {
    program: "CAP",
    level: "Terminale",
    classroom: "T AAGA",
    teachingArea: "Bloc 2",
    sequence: "CT3. Cadre d’intervention, autonomie et ressources",
    field: "description",
    from: "Module CT3 du référentiel du CAP Agent accompagnant au grand âge, bloc n°2 « Promotion de l’autonomie de la personne dans son espace privé » (arrêté du 6 février 2023). Objectif : faire travailler les élèves sur les compétences CT3.1, CT3.2 et CT3.3 à travers les exercices réalisés. Situation fil rouge de la classe : l’EHPAD Les Glycines. La position indique uniquement l’ordre d’affichage.",
    to: "Tu vas apprendre à choisir une information fiable, à comprendre le rôle de chaque structure et à adapter ton accompagnement aux besoins d’une personne âgée.",
    reason: DESCRIPTION_ELEVE,
  },
  {
    program: "CAP",
    level: "Terminale",
    classroom: "T AAGA",
    teachingArea: "Bloc 2",
    sequence: "CT3. Cadre d’intervention, autonomie et ressources",
    lesson: "Identifier une structure d’accueil et vérifier la fiabilité d’une information",
    field: "description",
    from: "Distinguer l’EHPAD, la résidence autonomie, l’USLD et l’accueil de jour, puis contrôler l’auteur, la date et l’organisme d’une information avant de la transmettre à une famille.",
    to: "Distinguer l’EHPAD, l’établissement d’hébergement pour personnes âgées dépendantes, la résidence autonomie, l’USLD, unité de soins de longue durée, et l’accueil de jour, puis contrôler l’auteur, la date et l’organisme d’une information avant de la transmettre à une famille.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "CAP",
    level: "Terminale",
    classroom: "T AAGA",
    teachingArea: "Bloc 2",
    sequence: "CT3. Cadre d’intervention, autonomie et ressources",
    lesson: "Identifier une structure d’accueil et vérifier la fiabilité d’une information",
    activity: "À retenir : quatre structures, quatre besoins",
    field: "payload.body",
    from: "Une structure d’accueil accueille un public défini et remplit des missions précises.\n\nEHPAD : hébergement permanent et accompagnement de personnes dépendantes.\n\nRésidence autonomie : logement et services pour des personnes encore autonomes.\n\nUSLD, unité de soins de longue durée : soins médicaux importants et surveillance continue.\n\nAccueil de jour : accueil organisé pendant la journée, sans hébergement permanent.\n\nIndices à repérer : public accueilli, présence soignante, hébergement ou non, durée de l’accueil et degré d’autonomie.",
    to: "Une structure d’accueil accueille un public défini et remplit des missions précises.\n\nEHPAD signifie établissement d’hébergement pour personnes âgées dépendantes : il propose un hébergement permanent et un accompagnement de personnes dépendantes.\n\nRésidence autonomie : logement et services pour des personnes encore autonomes.\n\nUSLD signifie unité de soins de longue durée : elle assure des soins médicaux importants et une surveillance continue.\n\nAccueil de jour : accueil organisé pendant la journée, sans hébergement permanent.\n\nIndices à repérer : public accueilli, présence soignante, hébergement ou non, durée de l’accueil et degré d’autonomie.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "CAP",
    level: "Terminale",
    classroom: "T AAGA",
    teachingArea: "Bloc 2",
    sequence: "CT3. Cadre d’intervention, autonomie et ressources",
    lesson: "Repérer son rôle, ses limites et les moyens de prévention",
    activity: "À retenir : mon rôle, mes limites, mes relais",
    field: "payload.body",
    from: "L’agent accompagnant au grand âge réalise les activités autorisées par sa fonction et transmet les demandes qui sortent de son champ.\n\nL’équipe des Glycines : direction, médecin coordonnateur, infirmier, aide-soignant, agent AAGA, animation, maintenance.\n\nLe relais dépend de la situation : un soin va à l’équipe soignante, une panne à la maintenance, un stock au responsable identifié.\n\nAvant d’agir sur un danger : repérer le danger, ne pas créer un second danger, sécuriser dans ses limites, alerter le relais et tracer selon le protocole.\n\nUne transmission décrit des faits observés, datés et adressés. Elle ne contient ni interprétation ni diagnostic.",
    to: "L’agent accompagnant au grand âge réalise les activités autorisées par sa fonction et transmet les demandes qui sortent de son champ.\n\nAAGA signifie agent accompagnant au grand âge. Dans l’équipe des Glycines, l’agent AAGA travaille avec la direction, le médecin coordonnateur, l’infirmier, l’aide-soignant, l’animation et la maintenance.\n\nLe relais dépend de la situation : un soin va à l’équipe soignante, une panne à la maintenance, un stock au responsable identifié.\n\nAvant d’agir sur un danger : repérer le danger, ne pas créer un second danger, sécuriser dans ses limites, alerter le relais et tracer selon le protocole.\n\nUne transmission décrit des faits observés, datés et adressés. Elle ne contient ni interprétation ni diagnostic.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "CAP",
    level: "Terminale",
    classroom: "T AAGA",
    teachingArea: "Bloc 2",
    sequence: "CT3. Cadre d’intervention, autonomie et ressources",
    lesson: "Déduire l’aide juste à partir du degré d’autonomie",
    activity: "À retenir : autonomie, dépendance et environnement",
    field: "payload.body",
    from: "L’autonomie est la capacité de décider et d’agir dans sa vie quotidienne. Elle varie selon les actes et selon les moments.\n\nLa dépendance est le besoin d’aide pour réaliser certains actes.\n\nAGGIR est une grille utilisée par des professionnels pour apprécier l’autonomie. L’élève exploite des informations, il ne calcule pas seul un GIR.\n\nAider juste ce qu’il faut : laisser faire ce qui est possible, compléter seulement ce qui est nécessaire, encourager sans faire à la place.\n\nUn environnement peut faciliter ou limiter le déplacement. Un facilitateur aide la personne à agir, par exemple un bon éclairage. Un obstacle la gêne, par exemple un meuble dans le passage.",
    to: "L’autonomie est la capacité de décider et d’agir dans sa vie quotidienne. Elle varie selon les actes et selon les moments.\n\nLa dépendance est le besoin d’aide pour réaliser certains actes.\n\nAGGIR signifie autonomie gérontologie groupes iso-ressources : c’est une grille utilisée par des professionnels pour apprécier l’autonomie. Le GIR, groupe iso-ressources, indique un niveau de perte d’autonomie. L’élève exploite des informations, il ne calcule pas seul un GIR.\n\nAider juste ce qu’il faut : laisser faire ce qui est possible, compléter seulement ce qui est nécessaire, encourager sans faire à la place.\n\nUn environnement peut faciliter ou limiter le déplacement. Un facilitateur aide la personne à agir, par exemple un bon éclairage. Un obstacle la gêne, par exemple un meuble dans le passage.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "CAP",
    level: "Terminale",
    classroom: "T AAGA",
    teachingArea: "Bloc 2",
    sequence: "CT3. Cadre d’intervention, autonomie et ressources",
    lesson: "Déduire l’aide juste à partir du degré d’autonomie",
    activity: "Vrai ou faux : calculer le GIR",
    field: "payload.explanation",
    from: "Faux : AGGIR est utilisée par des professionnels. L’élève exploite des informations sur l’autonomie et respecte les consignes de l’équipe.",
    to: "Faux : AGGIR, autonomie gérontologie groupes iso-ressources, est utilisée par des professionnels. L’élève exploite des informations sur l’autonomie et respecte les consignes de l’équipe.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "CAP",
    level: "Terminale",
    classroom: "T AAGA",
    teachingArea: "Bloc 2",
    sequence: "CT3. Cadre d’intervention, autonomie et ressources",
    lesson: "Traiter une situation d’accueil complète aux Glycines",
    activity: "La méthode attendue à l’épreuve",
    field: "payload.body",
    from: "Face à une situation professionnelle, la réponse suit toujours les mêmes étapes.\n\n1. Repérer les faits utiles : qui, où, quand, ce qui est observé.\n\n2. Vérifier la source : auteur identifiable, date, organisme, information recoupée.\n\n3. Agir dans son rôle : ce que je peux faire, ce que je sécurise, ce que je ne fais pas seul.\n\n4. Transmettre : des faits précis, datés, adressés au bon professionnel, sans interprétation.\n\nCette méthode vaut pour l’accueil d’un résident comme pour l’analyse d’une activité en PFMP.",
    to: "Face à une situation professionnelle, la réponse suit toujours les mêmes étapes.\n\n1. Repérer les faits utiles : qui, où, quand, ce qui est observé.\n\n2. Vérifier la source : auteur identifiable, date, organisme, information recoupée.\n\n3. Agir dans son rôle : ce que je peux faire, ce que je sécurise, ce que je ne fais pas seul.\n\n4. Transmettre : des faits précis, datés, adressés au bon professionnel, sans interprétation.\n\nCette méthode vaut pour l’accueil d’un résident comme pour l’analyse d’une activité en PFMP, période de formation en milieu professionnel.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Première",
    classroom: "1 AERO",
    teachingArea: "PSE",
    sequence: "C3. Les acteurs de prévention",
    lesson: "Identifier les rôles des acteurs internes de prévention",
    activity: "À retenir : les quatre acteurs internes de la prévention",
    field: "payload.body",
    from: "Chez AMA, Théo se coupe légèrement sur le bord d’un panneau après perçage. Un sauveteur secouriste du travail intervient. M. Ferrand remarque que ce type d’incident revient. Le salarié compétent étudie le poste. Le CSE demande que le sujet soit discuté. Le service de prévention et de santé au travail conseille l’entreprise.\n\nLe comité social et économique (CSE) représente les salariés. Il contribue aux questions de santé et de sécurité, analyse des situations avec les représentants du personnel et formule des propositions.\n\nLe salarié compétent aide l’employeur dans les activités de protection et de prévention des risques professionnels. Il repère un besoin d’amélioration d’un poste et participe à l’organisation des actions de prévention.\n\nLe sauveteur secouriste du travail (SST) intervient face à un accident dans la limite de sa formation. Il protège, examine, alerte et secourt selon la situation. Il ne remplace pas les secours spécialisés.\n\nLe service de prévention et de santé au travail (SPST) suit la santé des salariés. Il conseille les salariés comme l’employeur pour prévenir les risques professionnels et informe sur les effets possibles d’une exposition.\n\nLa prévention est une action collective : selon le problème rencontré, plusieurs de ces acteurs peuvent coopérer.",
    to: "Chez AMA, Théo se coupe légèrement sur le bord d’un panneau après perçage. Un sauveteur secouriste du travail intervient. M. Ferrand remarque que ce type d’incident revient. Le salarié compétent étudie le poste. Le CSE demande que le sujet soit discuté. Le SPST conseille l’entreprise.\n\nLe CSE signifie comité social et économique : il représente les salariés. Il contribue aux questions de santé et de sécurité, analyse des situations avec les représentants du personnel et formule des propositions.\n\nLe salarié compétent aide l’employeur dans les activités de protection et de prévention des risques professionnels. Il repère un besoin d’amélioration d’un poste et participe à l’organisation des actions de prévention.\n\nLe SST signifie sauveteur secouriste du travail : il intervient face à un accident dans la limite de sa formation. Il protège, examine, alerte et secourt selon la situation. Il ne remplace pas les secours spécialisés.\n\nLe SPST signifie service de prévention et de santé au travail : il suit la santé des salariés. Il conseille les salariés comme l’employeur pour prévenir les risques professionnels et informe sur les effets possibles d’une exposition.\n\nLa prévention est une action collective : selon le problème rencontré, plusieurs de ces acteurs peuvent coopérer.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Première",
    classroom: "1 AERO",
    teachingArea: "PSE",
    sequence: "C3. Les acteurs de prévention",
    lesson: "Choisir l’interlocuteur adapté à une situation de prévention",
    activity: "À retenir : l’essentiel de la séquence",
    field: "payload.body",
    from: "Les acteurs internes agissent dans l’entreprise : le CSE, le salarié compétent, le sauveteur secouriste du travail et le service de prévention et de santé au travail.\n\nLes organismes externes complètent l’action : l’inspection du travail et la CARSAT.\n\nChaque acteur a une mission précise, et plusieurs acteurs peuvent coopérer sur une même situation.\n\nPour choisir un interlocuteur, je décris d’abord les faits, puis j’identifie le besoin.\n\nJe formule enfin une demande claire, sans accusation ni rumeur.",
    to: "Les acteurs internes agissent dans l’entreprise : le CSE, comité social et économique ; le salarié compétent ; le SST, sauveteur secouriste du travail ; et le SPST, service de prévention et de santé au travail.\n\nLes organismes externes complètent l’action : l’inspection du travail et la CARSAT, caisse d’assurance retraite et de la santé au travail.\n\nChaque acteur a une mission précise, et plusieurs acteurs peuvent coopérer sur une même situation.\n\nPour choisir un interlocuteur, je décris d’abord les faits, puis j’identifie le besoin.\n\nJe formule enfin une demande claire, sans accusation ni rumeur.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Première",
    classroom: "1 TCI",
    teachingArea: "PSE",
    sequence: "C3. Les acteurs de prévention",
    lesson: "Identifier les rôles des acteurs internes de prévention",
    field: "description",
    from: "Distinguer le CSE, le salarié compétent, le SST et le service de prévention et de santé au travail à partir d'un incident d'ébavurage chez CDE.",
    to: "Distinguer le CSE, comité social et économique, le salarié compétent, le SST, sauveteur secouriste du travail, et le SPST, service de prévention et de santé au travail, à partir d'un incident d'ébavurage chez CDE.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Première",
    classroom: "1 TCI",
    teachingArea: "PSE",
    sequence: "C3. Les acteurs de prévention",
    lesson: "Identifier les rôles des acteurs internes de prévention",
    activity: "À retenir : les acteurs internes chez CDE",
    field: "payload.body",
    from: "Chez CDE, Karim se coupe légèrement pendant l'ébavurage d'une tôle. Un sauveteur secouriste du travail intervient. M. Berthier constate que ce type d'incident revient. Le salarié compétent observe le poste. Le CSE demande que le sujet soit discuté. Le service de prévention et de santé au travail conseille l'entreprise.\n\nLe comité social et économique (CSE) représente les salariés. Il contribue aux questions de santé et de sécurité, analyse des situations et formule des propositions.\n\nLe salarié compétent aide l'employeur dans les activités de protection et de prévention des risques professionnels.\n\nLe sauveteur secouriste du travail (SST) intervient face à un accident dans la limite de sa formation : il protège, examine, alerte et secourt selon la situation.\n\nLe service de prévention et de santé au travail (SPST) suit la santé des salariés et conseille le salarié comme l'employeur.\n\nLa prévention est une action collective : plusieurs acteurs peuvent coopérer sur une même situation.",
    to: "Chez CDE, Karim se coupe légèrement pendant l'ébavurage d'une tôle. Un sauveteur secouriste du travail intervient. M. Berthier constate que ce type d'incident revient. Le salarié compétent observe le poste. Le CSE demande que le sujet soit discuté. Le SPST conseille l'entreprise.\n\nLe CSE signifie comité social et économique : il représente les salariés. Il contribue aux questions de santé et de sécurité, analyse des situations et formule des propositions.\n\nLe salarié compétent aide l'employeur dans les activités de protection et de prévention des risques professionnels.\n\nLe SST signifie sauveteur secouriste du travail : il intervient face à un accident dans la limite de sa formation. Il protège, examine, alerte et secourt selon la situation.\n\nLe SPST signifie service de prévention et de santé au travail : il suit la santé des salariés et conseille le salarié comme l'employeur.\n\nLa prévention est une action collective : plusieurs acteurs peuvent coopérer sur une même situation.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Première",
    classroom: "1 TCI",
    teachingArea: "PSE",
    sequence: "C3. Les acteurs de prévention",
    lesson: "Identifier les missions des organismes externes à l'entreprise",
    activity: "À retenir : inspection du travail et CARSAT",
    field: "payload.body",
    from: "Chez CDE, plusieurs presque-accidents surviennent près de la cisaille. M. Berthier cherche un accompagnement pour améliorer la prévention. Des salariés s'interrogent aussi sur l'application de règles de sécurité.\n\nL'inspection du travail informe et conseille les salariés et l'employeur sur le droit du travail. Elle contrôle son application et peut intervenir dans le cadre de ses pouvoirs de contrôle.\n\nLa CARSAT accompagne les entreprises dans la prévention des risques professionnels : conseils, outils, actions et ressources adaptées.\n\nCes organismes externes ne remplacent pas les acteurs internes. Le bon interlocuteur dépend du problème rencontré.\n\nAvant un contact, il faut décrire des faits précis et formuler une demande claire, sans accusation ni rumeur.",
    to: "Chez CDE, plusieurs presque-accidents surviennent près de la cisaille. M. Berthier cherche un accompagnement pour améliorer la prévention. Des salariés s'interrogent aussi sur l'application de règles de sécurité.\n\nL'inspection du travail informe et conseille les salariés et l'employeur sur le droit du travail. Elle contrôle son application et peut intervenir dans le cadre de ses pouvoirs de contrôle.\n\nLa CARSAT signifie caisse d'assurance retraite et de la santé au travail : elle accompagne les entreprises dans la prévention des risques professionnels avec des conseils, des outils, des actions et des ressources adaptées.\n\nCes organismes externes ne remplacent pas les acteurs internes. Le bon interlocuteur dépend du problème rencontré.\n\nAvant un contact, il faut décrire des faits précis et formuler une demande claire, sans accusation ni rumeur.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Première",
    classroom: "1 TCI",
    teachingArea: "PSE",
    sequence: "C3. Les acteurs de prévention",
    lesson: "Choisir l'interlocuteur adapté à une situation de prévention",
    activity: "À retenir : l'essentiel de la séquence",
    field: "payload.body",
    from: "Les acteurs internes agissent dans l'entreprise : CSE, salarié compétent, SST et SPST.\n\nLes organismes externes complètent l'action : inspection du travail et CARSAT.\n\nChaque acteur a une mission précise. Plusieurs acteurs peuvent coopérer sur une même situation.\n\nPour choisir un interlocuteur, je décris d'abord les faits, puis j'identifie le besoin : secours, conseil santé, organisation de la prévention, expression collective, droit du travail ou accompagnement.\n\nJe formule ensuite une demande claire, sans accusation ni rumeur.",
    to: "Les acteurs internes agissent dans l'entreprise : CSE, comité social et économique ; salarié compétent ; SST, sauveteur secouriste du travail ; SPST, service de prévention et de santé au travail.\n\nLes organismes externes complètent l'action : inspection du travail et CARSAT, caisse d'assurance retraite et de la santé au travail.\n\nChaque acteur a une mission précise. Plusieurs acteurs peuvent coopérer sur une même situation.\n\nPour choisir un interlocuteur, je décris d'abord les faits, puis j'identifie le besoin : secours, conseil santé, organisation de la prévention, expression collective, droit du travail ou accompagnement.\n\nJe formule ensuite une demande claire, sans accusation ni rumeur.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    sequence: "C7. Le suivi de la santé au travail",
    lesson: "Identifier les modalités de suivi individuel médical des salariés",
    activity: "À retenir : VIP, EMA et suivi individuel renforcé",
    field: "title",
    from: "À retenir : VIP, EMA et suivi individuel renforcé",
    to: "À retenir : la VIP, l’EMA et le suivi individuel renforcé",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    sequence: "C7. Le suivi de la santé au travail",
    lesson: "Identifier les modalités de suivi individuel médical des salariés",
    activity: "À retenir : la VIP, l’EMA et le suivi individuel renforcé",
    field: "payload.body",
    from: "Le suivi de santé au travail dépend du poste occupé et des risques réellement présents.\n\nLa visite d’information et de prévention (VIP) informe le salarié sur les risques de son poste et sur les moyens de prévention. Elle est réalisée par le service de prévention et de santé au travail.\n\nL’examen médical d’aptitude (EMA) concerne les postes présentant des risques particuliers. Il vérifie que le salarié peut occuper ce poste sans danger pour lui ni pour les autres.\n\nCertains postes exposés donnent lieu à un suivi individuel renforcé : les visites sont plus fréquentes et adaptées à l’exposition.\n\nAu hangar, Théo est exposé aux coupures sur tôles et rivets, ainsi qu’aux solvants et aux matériaux composites. Le service de prévention et de santé au travail conseille à la fois le salarié et l’employeur.",
    to: "Le suivi de santé au travail dépend du poste occupé et des risques réellement présents.\n\nVIP signifie visite d’information et de prévention : elle informe le salarié sur les risques de son poste et sur les moyens de prévention. Elle est réalisée par le SPST, service de prévention et de santé au travail.\n\nEMA signifie examen médical d’aptitude : il concerne les postes présentant des risques particuliers. Il vérifie que le salarié peut occuper ce poste sans danger pour lui ni pour les autres.\n\nCertains postes exposés donnent lieu à un suivi individuel renforcé : les visites sont plus fréquentes et adaptées à l’exposition.\n\nAu hangar, Théo est exposé aux coupures sur tôles et rivets, ainsi qu’aux solvants et aux matériaux composites. Le SPST conseille à la fois le salarié et l’employeur.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    sequence: "C7. Le suivi de la santé au travail",
    lesson: "Rappel : distinguer danger, situation dangereuse, événement déclencheur et dommage",
    activity: "À retenir : le PAD en quatre étapes",
    field: "title",
    from: "À retenir : le PAD en quatre étapes",
    to: "À retenir : le processus d’apparition du dommage",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T AERO",
    teachingArea: "PSE",
    sequence: "C7. Le suivi de la santé au travail",
    lesson: "Rappel : distinguer danger, situation dangereuse, événement déclencheur et dommage",
    activity: "À retenir : le processus d’apparition du dommage",
    field: "payload.body",
    from: "Le processus d’apparition du dommage aide à comprendre comment une blessure ou une atteinte à la santé peut arriver.\n\n1. Le danger est ce qui peut provoquer un dommage : un foret en rotation, un bord de tôle, un produit irritant.\n\n2. La situation dangereuse existe quand une personne est exposée au danger : la main de Théo reste proche de la zone de perçage.\n\n3. L’événement déclencheur fait basculer la situation : le panneau bouge, la main dérape, l’outil accroche.\n\n4. Le dommage est l’atteinte possible à la santé : coupure, brûlure, douleur, intoxication.\n\nOrdre à retenir : danger, situation dangereuse, événement déclencheur, dommage.",
    to: "Le processus d’apparition du dommage, parfois abrégé PAD, aide à comprendre comment une blessure ou une atteinte à la santé peut arriver.\n\n1. Le danger est ce qui peut provoquer un dommage : un foret en rotation, un bord de tôle, un produit irritant.\n\n2. La situation dangereuse existe quand une personne est exposée au danger : la main de Théo reste proche de la zone de perçage.\n\n3. L’événement déclencheur fait basculer la situation : le panneau bouge, la main dérape, l’outil accroche.\n\n4. Le dommage est l’atteinte possible à la santé : coupure, brûlure, douleur, intoxication.\n\nOrdre à retenir : danger, situation dangereuse, événement déclencheur, dommage.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    sequence: "C7. Le suivi de la santé au travail",
    lesson: "Identifier les modalités de suivi individuel médical des salariés",
    activity: "À retenir : VIP, EMA et suivi individuel renforcé",
    field: "title",
    from: "À retenir : VIP, EMA et suivi individuel renforcé",
    to: "À retenir : la VIP, l’EMA et le suivi individuel renforcé",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    sequence: "C7. Le suivi de la santé au travail",
    lesson: "Identifier les modalités de suivi individuel médical des salariés",
    activity: "À retenir : la VIP, l’EMA et le suivi individuel renforcé",
    field: "payload.body",
    from: "Élodie reçoit une convocation du service de prévention et de santé au travail avant de reprendre sa machine à commande numérique chez CDE.\n\nLe suivi de santé dépend du poste réellement occupé et des expositions, jamais du seul nom du métier.\n\nLa visite d’information et de prévention (VIP) informe le salarié sur les risques de son poste et sur les moyens de prévention. Elle fait le point sur sa situation.\n\nL’examen médical d’aptitude (EMA) est prévu pour certains postes présentant des risques particuliers. Il vérifie l’aptitude avant l’affectation à ce poste.\n\nUn suivi individuel renforcé s’applique lorsque l’exposition le justifie : les visites sont adaptées à cette exposition.\n\nLe service de prévention et de santé au travail (SPST) conseille le salarié et l’employeur, et participe à la prévention comme au suivi de santé.",
    to: "Élodie reçoit une convocation du SPST, service de prévention et de santé au travail, avant de reprendre sa machine à commande numérique chez CDE.\n\nLe suivi de santé dépend du poste réellement occupé et des expositions, jamais du seul nom du métier.\n\nVIP signifie visite d’information et de prévention : elle informe le salarié sur les risques de son poste et sur les moyens de prévention. Elle fait le point sur sa situation.\n\nEMA signifie examen médical d’aptitude : il est prévu pour certains postes présentant des risques particuliers. Il vérifie l’aptitude avant l’affectation à ce poste.\n\nUn suivi individuel renforcé s’applique lorsque l’exposition le justifie : les visites sont adaptées à cette exposition.\n\nLe SPST conseille le salarié et l’employeur, et participe à la prévention comme au suivi de santé.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    sequence: "C7. Le suivi de la santé au travail",
    lesson: "Rappel : distinguer danger, situation dangereuse, événement déclencheur et dommage",
    activity: "À retenir : le PAD en quatre étapes",
    field: "title",
    from: "À retenir : le PAD en quatre étapes",
    to: "À retenir : le processus d’apparition du dommage",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Terminale",
    classroom: "T TCI",
    teachingArea: "PSE",
    sequence: "C7. Le suivi de la santé au travail",
    lesson: "Rappel : distinguer danger, situation dangereuse, événement déclencheur et dommage",
    activity: "À retenir : le processus d’apparition du dommage",
    field: "payload.body",
    from: "Le processus d’apparition du dommage aide à comprendre comment une blessure ou une atteinte à la santé peut arriver.\n\n1. Le danger est ce qui peut provoquer un dommage : une arête vive, un produit irritant, une machine en mouvement.\n\n2. La situation dangereuse existe quand une personne est exposée au danger : la main de Karim est proche d’une tôle à arêtes vives.\n\n3. L’événement déclencheur fait basculer la situation : la tôle glisse, la main dérape, la machine se met en mouvement.\n\n4. Le dommage est l’atteinte possible à la santé : coupure, brûlure, douleur, intoxication.\n\nOrdre à retenir : danger, situation dangereuse, événement déclencheur, dommage.",
    to: "Le processus d’apparition du dommage, parfois abrégé PAD, aide à comprendre comment une blessure ou une atteinte à la santé peut arriver.\n\n1. Le danger est ce qui peut provoquer un dommage : une arête vive, un produit irritant, une machine en mouvement.\n\n2. La situation dangereuse existe quand une personne est exposée au danger : la main de Karim est proche d’une tôle à arêtes vives.\n\n3. L’événement déclencheur fait basculer la situation : la tôle glisse, la main dérape, la machine se met en mouvement.\n\n4. Le dommage est l’atteinte possible à la santé : coupure, brûlure, douleur, intoxication.\n\nOrdre à retenir : danger, situation dangereuse, événement déclencheur, dommage.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Seconde",
    classroom: "2 AERO",
    teachingArea: "PSE",
    sequence: "C1. Les enjeux de la santé et sécurité au travail",
    lesson: "Identifier les enjeux de la santé-sécurité au travail",
    activity: "À retenir : les trois enjeux de la prévention",
    field: "payload.body",
    from: "Premier jour chez AéroMaintenance Atlantique (AMA). M. Ferrand remet la tenue, les EPI et le livret d'accueil sécurité. Le message est simple : la sécurité protège la personne, l'équipe et l'entreprise.\n\nUn enjeu humain concerne la santé ou la vie d'une personne : douleur, blessure, fatigue, stress, handicap ou perte de confiance.\n\nUn enjeu social concerne le collectif : famille inquiète, équipe désorganisée, entraide nécessaire, retard dans le travail.\n\nUn enjeu socio-économique concerne les coûts et l'activité : soins, arrêt de travail, remplacement, matériel abîmé, intervention retardée, perte de qualité ou de confiance.\n\nDans le secteur aéronautique, les situations de travail exposent notamment à la manutention de pièces lourdes, le bruit, les projections, les produits chimiques, les postures contraignantes, les poussières de composites et le risque électrique. La prévention sert à réduire ces dommages avant qu'ils arrivent.",
    to: "Premier jour chez AéroMaintenance Atlantique (AMA). M. Ferrand remet la tenue, les EPI, équipements de protection individuelle, et le livret d'accueil sécurité. Le message est simple : la sécurité protège la personne, l'équipe et l'entreprise.\n\nUn enjeu humain concerne la santé ou la vie d'une personne : douleur, blessure, fatigue, stress, handicap ou perte de confiance.\n\nUn enjeu social concerne le collectif : famille inquiète, équipe désorganisée, entraide nécessaire, retard dans le travail.\n\nUn enjeu socio-économique concerne les coûts et l'activité : soins, arrêt de travail, remplacement, matériel abîmé, intervention retardée, perte de qualité ou de confiance.\n\nDans le secteur aéronautique, les situations de travail exposent notamment à la manutention de pièces lourdes, le bruit, les projections, les produits chimiques, les postures contraignantes, les poussières de composites et le risque électrique. La prévention sert à réduire ces dommages avant qu'ils arrivent.",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Seconde",
    classroom: "2 AERO",
    teachingArea: "PSE",
    sequence: "C1. Les enjeux de la santé et sécurité au travail",
    lesson: "Repérer les obligations et la protection des jeunes travailleurs",
    activity: "Défi 05 : l'obligation du salarié",
    field: "payload.question",
    from: "Pendant une intervention, un protecteur est absent et l'élève ne connaît pas la consigne. Que doit faire le salarié ou l'élève en PFMP ?",
    to: "Pendant une intervention, un protecteur est absent et l'élève ne connaît pas la consigne. Que doit faire le salarié ou l'élève en PFMP, période de formation en milieu professionnel ?",
    reason: "Définir les sigles visibles par les élèves.",
  },
  {
    program: "BAC PRO",
    level: "Seconde",
    classroom: "2 CIEL",
    teachingArea: "PSE",
    sequence: "C1. Les enjeux de la santé et sécurité au travail",
    lesson: "Repérer les obligations et la protection des jeunes travailleurs",
    activity: "Défi 05 : l'obligation du salarié",
    field: "payload.question",
    from: "Pendant l'installation d'une baie réseau, un câble électrique semble abîmé. Que doit faire le salarié ou l'élève en PFMP ?",
    to: "Pendant l'installation d'une baie réseau, un câble électrique semble abîmé. Que doit faire le salarié ou l'élève en PFMP, période de formation en milieu professionnel ?",
    reason: "Définir les sigles visibles par les élèves.",
  },
];

/**
 * Renommages de classes déjà en ligne.
 *
 * Une classe est créée depuis /admin : ce script ne la crée jamais et n'en
 * renomme une que sur déclaration explicite ici. Même garde-fou que les
 * corrections de texte : le renommage n'a lieu que si la classe s'appelle
 * EXACTEMENT `from`. Si elle s'appelle déjà `to`, c'est signalé comme déjà
 * fait. Si les deux noms existent en base, rien n'est touché : fusionner deux
 * classes n'est pas le rôle de ce script.
 *
 * Le nom d'une classe est indépendant du code d'accès des élèves : renommer
 * une classe ne change pas le code distribué et ne détache aucun contenu.
 */
export type ClassroomRename = {
  program: string;
  level: string;
  from: string;
  to: string;
  reason: string;
};

export const classroomRenames: readonly ClassroomRename[] = [
  {
    program: "CAP",
    level: "Terminale",
    from: "T AGAA",
    to: "T AAGA",
    reason:
      "Inversion de lettres dans le sigle du diplôme : le référentiel officiel est le CAP AAGA — Agent Accompagnant au Grand Âge.",
  },
];
