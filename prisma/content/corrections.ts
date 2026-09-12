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
  field: "title" | "description" | "instructions";
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
