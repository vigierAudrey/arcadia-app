# Mapping pédagogique — T TCI / PSE / Module C11

Traçabilité de la séquence C11 de PSE en T TCI, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§3, §7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-t-aero-c11.md`](mapping-pedagogique-t-aero-c11.md).
Le contenu est produit par un générateur commun, `prisma/content/pse-terminale-c11.ts`,
paramétré par classe.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro TCI |
| Niveau | Terminale |
| Classe | `T TCI` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe terminale professionnelle — « Annexe 2 : Prévention-santé-environnement — Classe terminale professionnelle », © Ministère de l'Éducation nationale et de la Jeunesse |
| Chemin exact du référentiel | `BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf` |
| Partie du référentiel utilisée | Thématique C, **Module C11 — L'analyse d'une situation de travail** : les 3 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/05_Sequence_5_C11/S5_seance_01_travail_reel_et_travail_prescrit/S5_seance_01_complete.md`, `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/05_Sequence_5_C11/S5_seance_02_des_causes_a_l_effet/S5_seance_02_complete.md`, `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/05_Sequence_5_C11/S5_seance_03_choisir_une_prevention/S5_seance_03_complete.md`, `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/05_Sequence_5_C11/S5_seance_04_entrainement_avec_l_outil_local_en_quatre_reperes/S5_seance_04_complete.md` |
| Sources citées par le cours | `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/05_Sequence_5_C11/S5_SOURCES_PEDAGOGIQUES.md` |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` ; vérification automatique : ≥ 4 verbes par séance, ≥ 8 par séquence, dont « Justifier » et « Expliquer » |
| État du mapping (§10) | `VALIDE` — contenu directement repris des séances déjà rédigées et validées par l'enseignante pour cette classe (notions, exercices, corrections), lu et vérifié le 2026-10-14 |
| Conformité constatée | **OUI** |

## Correspondance objectifs du référentiel → séances du catalogue

Les objectifs ciblés du module C11 sont repris textuellement de l'annexe 2, colonne
« Objectifs ciblés ».

| Objectif ciblé (module C11) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Répertorier de manière exhaustive les composantes d'une situation de travail présentant une problématique liée à l'activité physique | Déterminant ; travail réel/travail prescrit ; activité/tâche ; ergonomie ; effet | Travail réel et travail prescrit |
| Mettre en évidence la relation entre un effet constaté et les facteurs de cause dans la situation de travail | Causalité ; multifactoriel | Relier causes et effets |
| Proposer une mesure de prévention visant à la suppression ou la réduction du risque | Suppression du risque ; réduction du risque ; protection collective ; protection individuelle ; formation ; information | Choisir et argumenter des mesures |

Le fil rouge est celui des cours de la classe : l'atelier CDE, avec Karim.

## Paramétrage transversal

Le générateur `buildPseTerminaleC11Sequence` ne paramètre que le nom de l'atelier et de l'élève ou salarié du fil rouge. Les
notions, le lexique, les QCM, les vrai/faux et les jeux de tri et d'association sont
génériques : ils ne dépendent d'aucun métier particulier et peuvent être réutilisés par
toute classe de terminale Bac Pro, par simple ajout d'un fichier de contexte
(`pse-t<classe>-c11.ts`) et d'une entrée dans `prisma/content/index.ts`.
