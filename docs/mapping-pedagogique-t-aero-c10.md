# Mapping pédagogique — T AERO / PSE / Module C10

Traçabilité de la séquence C10 de PSE en T AERO, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§3, §7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-t-tci-c10.md`](mapping-pedagogique-t-tci-c10.md).
Le contenu est produit par un générateur commun, `prisma/content/pse-terminale-c10.ts`,
paramétré par classe.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Aéronautique |
| Niveau | Terminale |
| Classe | `T AERO` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe terminale professionnelle — « Annexe 2 : Prévention-santé-environnement — Classe terminale professionnelle », © Ministère de l'Éducation nationale et de la Jeunesse |
| Chemin exact du référentiel | `BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf` |
| Partie du référentiel utilisée | Thématique C, **Module C10 — Les risques liés à l'activité physique** : les 4 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_4/S4_seance_01_facteurs_de_risque_et_atteintes/S4_seance_01_complete.md`, `BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_4/S4_seance_02_la_colonne_vertebrale/S4_seance_02_complete.md`, `BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_4/S4_seance_03_prevenir_et_economiser_l_effort/S4_seance_03_complete.md` |
| Sources citées par le cours | `BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_4/S4_SOURCES_PEDAGOGIQUES.md` |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` ; vérification automatique : ≥ 4 verbes par séance, ≥ 8 par séquence, dont « Justifier » et « Expliquer » |
| État du mapping (§10) | `VALIDE` — contenu directement repris des séances déjà rédigées et validées par l'enseignante pour cette classe (notions, exercices, corrections), lu et vérifié le 2026-10-14 |
| Conformité constatée | **OUI** |

## Correspondance objectifs du référentiel → séances du catalogue

Les objectifs ciblés du module C10 sont repris textuellement de l'annexe 2, colonne
« Objectifs ciblés ».

| Objectif ciblé (module C10) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Identifier les facteurs de risques liés à l'activité physique dans une situation de travail | Activité physique ; activité dynamique ; activité statique ; posture | Facteurs de risque et atteintes |
| Identifier la nature de l'atteinte à la santé causée par une activité physique au travail ; caractériser les atteintes à la santé liées à l'activité physique | Trouble musculosquelettique (TMS) ; trouble circulatoire ; traumatisme physique ; fatigue musculaire ; aiguë ; chronique | Facteurs de risque et atteintes |
| Décrire les atteintes de la colonne vertébrale à l'aide de supports | Vertèbre ; disque intervertébral ; noyau ; déformation/détérioration ; nerf | La colonne vertébrale |
| Proposer des mesures de prévention hiérarchisées | Économie d'effort ; posture ; protection collective ; protection individuelle ; formation ; information ; suppression du risque ; réduction du risque | Prévenir et économiser l'effort |

Le fil rouge est celui des cours de la classe : l'atelier AMA, avec Théo.

## Paramétrage transversal

Le générateur `buildPseTerminaleC10Sequence` ne paramètre que le nom de l'atelier et de l'élève du fil rouge. Les
notions, le lexique, les QCM, les vrai/faux et les jeux de tri et d'association sont
génériques : ils ne dépendent d'aucun métier particulier et peuvent être réutilisés par
toute classe de terminale Bac Pro, par simple ajout d'un fichier de contexte
(`pse-t<classe>-c10.ts`) et d'une entrée dans `prisma/content/index.ts`.
