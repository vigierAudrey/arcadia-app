# Mapping pédagogique — T AAGA / PSE / Module C1

Traçabilité des contenus T AAGA en PSE, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

Ce contenu existait **avant** la mise en place de la traçabilité : il a été publié en ligne
sans fiche. Cette fiche est donc une **régularisation a posteriori**, établie le
2026-09-07 en remontant aux sources réelles.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | CAP Agent accompagnant au grand âge (AAGA) |
| Niveau | Terminale |
| Classe | `T AAGA` |
| Enseignement/bloc | **PSE** — et non le Bloc 2, qui est un TeachingArea distinct de la même classe |
| Référentiel officiel identifié | Programme de PSE en CAP — « Annexe : Prévention-santé-environnement — Classes préparant au certificat d'aptitude professionnelle », © Ministère de l'Éducation nationale et de la Jeunesse, 32 p. |
| Chemin exact du référentiel | `CAP/REFERENTIEL_CAP_PSE/spe641annexe1105406pdf-85401.pdf` |
| Partie du référentiel utilisée | Thématique C, **Module C1 — Les différents contrats de travail** : les 2 objectifs ciblés et leurs notions clés |
| Progression consultée | `CAP/CAP AAGA - PSE/Progression_annuelle_PSE_CAP_AAGA_CORRIGEE.pdf` — Séquence 1 « Jeune salarié(e) aux Glycines : mon contrat, mes droits », septembre, module C1, 2 séances |
| Cours consultés | `CAP/CAP AAGA - PSE/Sequences/Sequence_1/S1_seance_01_contrats_travail/S1_seance_01_complete.md`, `…/S1_seance_02_droits_obligations/S1_seance_02_complete.md` |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` |
| Conformité constatée | **OUI** pour le contenu, après correction des consignes (voir ci-dessous) |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (module C1) | Notions clés associées | Séance |
|---|---|---|
| Identifier les spécificités des différents contrats de travail | CDI / CDD, contrat d'apprentissage | Identifier les différents contrats de travail |
| Identifier droit et obligation dans un contrat de travail | contrat, droits, obligations | Repérer les droits et obligations liés au contrat de travail |
| *(les deux objectifs, en réinvestissement)* | *(idem)* | Repérer les informations essentielles d'un contrat de travail |

La troisième séance n'ajoute aucune notion : elle reprend le « Je retiens » de la séance 1
du cours — « Avant de signer, je dois lire les informations importantes. Je repère la
durée, le poste, le lieu de travail et le type de contrat » — et le lexique PSE de la
séquence.

## Ce qui a été corrigé le 2026-09-07

Le contenu était **déjà en ligne** et vu par les élèves. Trois écarts ont été relevés puis
corrigés ; aucun ne portait sur l'exactitude des notions.

1. **Consignes rédigées avec des verbes hors liste officielle** — « Lis », « Choisis »,
   « Sélectionne », « Repère » (à l'impératif) et « Pour chaque indice, choisis… ». Les
   11 consignes ont été réécrites avec les verbes de
   `VERBES_ACTION_CONSIGNES.md`, à l'infinitif, un seul verbe par consigne, avec le sens
   exact attendu.
2. **Séance affichée mais vide** — « Lire les informations essentielles d'un contrat de
   travail » n'avait aucune activité, et son titre employait un verbe hors liste. Renommée
   « Repérer les informations essentielles d'un contrat de travail », elle reçoit
   quatre activités.
3. **Séquence sans note pédagogique de préparation** ni rattachement explicite au
   référentiel. Description réécrite (§9).

Les règles de variété sont désormais satisfaites : au moins 4 verbes distincts par séance,
8 sur la séquence — Repérer, Identifier, Indiquer, Nommer, Classer, Déduire, Justifier,
Expliquer — dont `Justifier` et `Expliquer`, et une activité de décodage des consignes qui
porte exactement sur ces 8 verbes.

**Écart assumé, à corriger d'un geste depuis `/admin` :** l'activité « Décodage des
consignes » devrait se placer **en début de séquence** (règle 6 du fichier de consignes).
L'import n'ayant pas le droit de déplacer une activité existante, elle apparaît à la fin de
la séance 1. Un glisser-déposer dans `/admin` suffit à la remonter.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "CAP AAGA",
    "niveau": "Terminale",
    "classe": "T AAGA",
    "enseignement": "PSE",
    "sequence": "C1. Les différents contrats de travail",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE en CAP (annexe, classes préparant au CAP)",
        "referenceRelative": "CAP/REFERENTIEL_CAP_PSE/spe641annexe1105406pdf-85401.pdf",
        "sectionOuPage": "Thématique C, module C1",
        "extraitOuNotionUtilisee": "CDI / CDD, contrat d'apprentissage, contrat, droits, obligations"
      },
      {
        "typeSource": "PROGRESSION",
        "titreSource": "Progression annuelle PSE CAP AAGA (corrigée)",
        "referenceRelative": "CAP/CAP AAGA - PSE/Progression_annuelle_PSE_CAP_AAGA_CORRIGEE.pdf",
        "sectionOuPage": "Séquence 1 (septembre, 2 h)",
        "extraitOuNotionUtilisee": "Module C1 — compétences C1, C4, C5, C6"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 1 : CDI, CDD, apprentissage",
        "referenceRelative": "CAP/CAP AAGA - PSE/Sequences/Sequence_1/S1_seance_01_contrats_travail/S1_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 2 : mes droits, mes obligations",
        "referenceRelative": "CAP/CAP AAGA - PSE/Sequences/Sequence_1/S1_seance_02_droits_obligations/S1_seance_02_complete.md"
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
    "dateValidation": "2026-09-07",
    "commentaire": "Régularisation d'un contenu déjà publié. Conformité vérifiée objectif par objectif dans l'annexe CAP PSE, sources retrouvées dans CAP/CAP AAGA - PSE. Les 18 activités sont classées CORE. Le fil rouge « EHPAD Les Glycines » est fictif et sert l'apprentissage."
  }
]
```

## Emplacement du contenu

`prisma/content/pse-taaga-c1.ts`, inscrit au registre `prisma/content/index.ts`. Les
corrections des lignes déjà en ligne sont déclarées nominativement dans
`prisma/content/corrections.ts` — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
