# Mapping pédagogique — T AERO / PSE / Module C9

Traçabilité de la séquence C9 de PSE en T AERO, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§3, §7 et §10).

La classe T TCI a sa propre séquence C9 ([`mapping-pedagogique-t-tci-c9.md`](mapping-pedagogique-t-tci-c9.md)),
dans un fichier dédié (`pse-ttci-c9.ts`). Cette fiche documente le fichier dédié
équivalent pour T AERO (`pse-taero-c9.ts`) : un premier jet avait délégué ce module au
générateur transversal `prisma/content/pse-terminale-c9.ts`, avec un fil rouge réduit à
« l'atelier AMA » sans mise en situation développée. Ce premier jet n'a **jamais été mis
en ligne** (seule une simulation `pnpm pse:import` avait été vérifiée), ce qui permettait
de le réécrire sans risque de doublon. Il a été remplacé par un contenu propre à T AERO,
construit sur le même modèle que T TCI : personnages nommés (Sarah, Théo, M. Ferrand),
quatre séances dont une séance de bilan avec des mises en situation type bac, et le
même nombre d'activités (50) que T TCI (51). Le générateur transversal
`pse-terminale-c9.ts` reste disponible pour une future classe sans fil rouge propre
(T CIEL par exemple).

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
| Cours consultés | `BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_01_reconnaitre_les_rps/S3_seance_01_complete.md`, `.../S3_seance_02_facteurs_et_consequences/S3_seance_02_complete.md`, `.../S3_seance_03_prevenir_les_rps/S3_seance_03_complete.md`, et la banque d'évaluation de séquence `.../S3_bilan_et_evaluation_sequence/TAERO - PSE - Seq3 - Bilan et evaluation de sequence - Evaluation sequence eleve competences.pdf` (situation de Sarah, documents 1 à 4, questions Q1 à Q6) |
| Sources citées par le cours | `BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_SOURCES_PEDAGOGIQUES.md` |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` ; vérification automatique : 50 activités, 10 verbes distincts employés en consigne, tous de la liste, dont « Justifier » et « Expliquer » |
| État du mapping (§10) | `VALIDE` — contenu directement repris des trois séances et de la banque d'évaluation déjà rédigées par l'enseignante pour cette classe (notions, exercices, situation de Sarah), réécrit le 2026-10-28 |
| Conformité constatée | **OUI** |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (module C9) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Identifier les principales conséquences des risques psychosociaux sur la santé | Risque psychosocial ; dommage ; intégrité physique ; intégrité mentale | Reconnaître les risques psychosociaux |
| Repérer les principaux facteurs de risques psychosociaux | Stress ; violence interne ; violence externe | Reconnaître les risques psychosociaux ; Facteurs et conséquences |
| Identifier les conséquences des risques psychosociaux sur l'entreprise | Coût ; climat social | Facteurs et conséquences |
| Proposer des mesures de prévention limitant les risques psychosociaux | Prévention collective ; formation ; information | Prévenir les risques psychosociaux |

Le fil rouge est celui des cours de la classe : le hangar AMA, avec Sarah (séance 1 et
bilan), Théo (violence externe d'un passager, séance 1 et 3) et M. Ferrand, le chef
d'équipe qui mène l'enquête puis réunit l'équipe pour chercher des mesures durables
(séances 1 et 3).

## Contenu bespoke, au même niveau que T TCI

Quatre séances, comme T TCI : « Repérer les facteurs de risques psychosociaux »,
« Identifier les conséquences sur la santé et sur l'entreprise », « Proposer des
mesures de prévention », et une séance de bilan « Agir sur le travail chez AMA » avec
quatre mises en situation (« Mission AMA 01 » à « 04 ») construites sur le modèle des
« Mission CDE » de T TCI, elles-mêmes alignées sur la structure de la banque
d'évaluation réelle de la séquence (situation de Sarah, documents 1 à 4, méthode en
quatre étapes : repérer les faits, choisir le mot juste, expliquer le lien, proposer ou
justifier).

Les exemples ajoutés au-delà des trois séances stricto sensu (signature d'un contrôle
inachevé pour tenir un délai, pénalité d'une compagnie régionale partenaire, poste de
test avionique que personne ne veut plus tenir) restent dans le métier de la
maintenance aéronautique et n'introduisent aucune notion absente du module C9 — ils
illustrent les six familles de facteurs et les deux conséquences (coût, climat social)
déjà nommées par le référentiel et par les cours, conformément à l'autorisation donnée
par l'enseignante le 2026-09-19 (compléter en respectant le métier visé par le diplôme).

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Aéronautique",
    "niveau": "Terminale",
    "classe": "T AERO",
    "enseignement": "PSE",
    "sequence": "C9. Les risques psychosociaux",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe terminale professionnelle (annexe 2)",
        "referenceRelative": "BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf",
        "sectionOuPage": "Thématique C, module C9",
        "extraitOuNotionUtilisee": "Risque psychosocial, dommage, intégrité physique, intégrité mentale, stress, violence interne, violence externe, coût, climat social, prévention collective, formation, information"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 1 : reconnaître les RPS",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_01_reconnaitre_les_rps/S3_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 2 : facteurs et conséquences",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_02_facteurs_et_consequences/S3_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 3 : prévenir les RPS",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_03_prevenir_les_rps/S3_seance_03_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Banque d'évaluation élève (situation de Sarah)",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_bilan_et_evaluation_sequence/TAERO - PSE - Seq3 - Bilan et evaluation de sequence - Evaluation sequence eleve competences.pdf"
      },
      {
        "typeSource": "RESSOURCE",
        "titreSource": "Verbes d'action des consignes (référence commune)",
        "referenceRelative": "_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-10-28",
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Fichier dédié pse-taero-c9.ts (50 activités, 4 séances dont un bilan), réécrit à partir des trois séances et de la banque d'évaluation réelle de la séquence (situation de Sarah), au même niveau de développement que pse-ttci-c9.ts. Remplace un premier jet (généré via buildPseTerminaleC9Sequence) qui n'avait jamais été mis en ligne : aucun doublon ni écrasement de contenu publié. Les activités sont classées CORE, le seed ne produisant pas d'autre track."
  }
]
```

## Emplacement du contenu

Le contenu de cette séquence vit dans [`pse-taero-c9.ts`](../prisma/content/pse-taero-c9.ts),
fichier dédié au même titre que [`pse-ttci-c9.ts`](../prisma/content/pse-ttci-c9.ts),
inscrit au registre [`prisma/content/index.ts`](../prisma/content/index.ts) : il part
sur le site en ligne par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md). Le générateur
transversal [`pse-terminale-c9.ts`](../prisma/content/pse-terminale-c9.ts) reste
disponible, inutilisé pour l'instant, pour une future classe sans fil rouge propre.
