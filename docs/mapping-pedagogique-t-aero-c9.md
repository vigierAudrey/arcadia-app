# Mapping pédagogique — T AERO / PSE / Module C9

Traçabilité de la séquence C9 de PSE en T AERO, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§3, §7 et §10).

La classe T TCI a déjà sa propre séquence C9, publiée indépendamment avant cette
génération ([`mapping-pedagogique-t-tci-c9.md`](mapping-pedagogique-t-tci-c9.md)). Cette
fiche ne la modifie pas : elle documente une nouvelle version transversale,
`prisma/content/pse-terminale-c9.ts`, qui sert ici T AERO et pourra, plus tard, servir
une autre classe (T CIEL par exemple) sans dupliquer le contenu — contrairement à la
séquence C9 déjà publiée de T TCI, qui reste un fichier dédié (`pse-ttci-c9.ts`, non
touché).

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Aéronautique |
| Niveau | Terminale |
| Classe | `T AERO` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe terminale professionnelle — « Annexe 2 : Prévention-santé-environnement — Classe terminale professionnelle », © Ministère de l'Éducation nationale et de la Jeunesse |
| Chemin exact du référentiel | `BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf` |
| Partie du référentiel utilisée | Thématique C, **Module C9 — Les risques psychosociaux** : les 4 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_01_reconnaitre_les_rps/S3_seance_01_complete.md`, `.../S3_seance_02_facteurs_et_consequences/S3_seance_02_complete.md`, `.../S3_seance_03_prevenir_les_rps/S3_seance_03_complete.md`, et les exercices interactifs HTML de ces trois séances |
| Sources citées par le cours | `BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_SOURCES_PEDAGOGIQUES.md` |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` ; vérification automatique : ≥ 4 verbes par séance, ≥ 8 par séquence, dont « Justifier » et « Expliquer » |
| État du mapping (§10) | `VALIDE` — contenu directement repris des séances déjà rédigées et validées par l'enseignante pour cette classe (notions, exercices, corrections), lu et vérifié le 2026-10-14 |
| Conformité constatée | **OUI** |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (module C9) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Identifier les principales conséquences des risques psychosociaux sur la santé | Risque psychosocial ; dommage ; intégrité physique ; intégrité mentale | Reconnaître les risques psychosociaux |
| Repérer les principaux facteurs de risques psychosociaux | Stress ; violence interne ; violence externe | Reconnaître les risques psychosociaux ; Facteurs et conséquences |
| Identifier les conséquences des risques psychosociaux sur l'entreprise | Coût ; climat social | Facteurs et conséquences |
| Proposer des mesures de prévention limitant les risques psychosociaux | Prévention collective ; formation ; information | Prévenir les risques psychosociaux |

Le fil rouge est celui des cours de la classe : l'atelier AMA, avec Théo (et un
responsable d'équipe cité dans la mission de la première séance).

## Paramétrage transversal

Le générateur `buildPseTerminaleC9Sequence` ne paramètre que le nom de l'atelier et de
l'élève ou salarié du fil rouge, avec un type `context.classroom` qui accepte déjà
`"T CIEL"` pour une future classe. Les notions (risque psychosocial, stress, violence
interne/externe, intégrité physique/mentale, facteurs organisationnels, mesures de
prévention) sont génériques et ne dépendent d'aucun métier particulier.
