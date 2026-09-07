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

const TAGAA = {
  program: "CAP",
  level: "Terminale",
  classroom: "T AGAA",
  teachingArea: "PSE",
  sequence: "C1. Les différents contrats de travail",
} as const;

const LECON_CONTRATS = "Identifier les différents contrats de travail";
const LECON_DROITS = "Repérer les droits et obligations liés au contrat de travail";

/** Consigne réécrite avec un verbe de la liste officielle, un seul par consigne. */
function verbe(
  lesson: string,
  activity: string,
  from: string,
  to: string,
): ContentCorrection {
  return {
    ...TAGAA,
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
    ...TAGAA,
    lesson: "Lire les informations essentielles d'un contrat de travail",
    field: "title",
    from: "Lire les informations essentielles d'un contrat de travail",
    to: "Repérer les informations essentielles d’un contrat de travail",
    reason:
      "« Lire » ne figure pas dans la liste officielle des verbes de consigne ; « Repérer » y correspond (examiner avec précision, puis lister). Cette séance était affichée aux élèves sans aucune activité : l'import lui en ajoute quatre.",
  },
  {
    ...TAGAA,
    lesson: "Repérer les informations essentielles d’un contrat de travail",
    field: "description",
    from: null,
    to: "Retrouver la durée, le poste, le lieu de travail et le type de contrat dans un extrait, avant de signer.",
    reason: "Séance sans description ; la description situe la capacité travaillée.",
  },

  // ── Séquence : note pédagogique de préparation ──────────────────────────────
  {
    ...TAGAA,
    field: "description",
    from: "Module/thème référentiel ; la position indique uniquement l'ordre d'affichage.",
    to: "Module C1 du programme de PSE en CAP (thématique C). Objectif : faire travailler les élèves sur les compétences C1, C4, C5 et C6 du référentiel à travers les exercices réalisés. Situation fil rouge de la classe : l’EHPAD Les Glycines. La position indique uniquement l’ordre d’affichage.",
    reason:
      "Description générique, sans rattachement au référentiel ni note pédagogique de préparation (§9 de docs/pedagogie-agents.md).",
  },
];
