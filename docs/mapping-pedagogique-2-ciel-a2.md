# Mapping pédagogique — 2 CIEL / PSE / Module A2

Traçabilité de la séquence A2 de PSE en 2 CIEL, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§3, §7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-2-aero-a2.md`](mapping-pedagogique-2-aero-a2.md).
Le contenu est produit par un générateur commun, `prisma/content/pse-seconde-a2.ts`,
paramétré par classe, sur le même principe que `pse-seconde-a1.ts`.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro CIEL |
| Niveau | Seconde |
| Classe | `2 CIEL` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de seconde professionnelle — « Annexe : Prévention-santé-environnement — Classe de seconde professionnelle » (texte commun à toutes les spécialités Bac Pro) |
| Chemin exact du référentiel | `BACPRO/2/2CIEL PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf` |
| Partie du référentiel utilisée | Thématique A, **Module A2 — Les rythmes biologiques, le sommeil** : les 6 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/2/2CIEL PSE/Sequences/Sequence_4/S4_seance_01_rythmes_cycles_et_phases_du_sommeil/S4_seance_01_complete.md`, `.../S4_seance_02_desynchronisation_et_travail_poste/S4_seance_02_complete.md`, `.../S4_seance_03_ameliorer_la_qualite_du_sommeil/S4_seance_03_complete.md`, `.../S4_bilan_et_evaluation_sequence/S4_bilan_et_evaluation_sequence_complete.md` |
| État du mapping (§10) | `VALIDE` — contenu directement repris des trois séances déjà rédigées pour cette classe (notions, lexique, mini-situations), transposé le 2026-10-28 |
| Conformité constatée | **OUI** |

## Point de vigilance repris de la documentation source

Le cours source (séance 2 — désynchronisation et travail posté) indique explicitement
que « les règles exactes [de la réglementation du travail de nuit] doivent être
vérifiées sur une source officielle à jour » : aucun chiffre précis n'y est donné. La
séquence générée reprend cette même réserve mot pour mot, sans inventer de valeur
chiffrée — conformément à l'interdiction d'inventer le contenu d'un référentiel (§3).

⚠️ Comme pour A1 de cette classe (voir `mapping-pedagogique-2-ciel-a1.md`), l'atelier fil
rouge est publié sous le nom « CIEL Réseaux & Systèmes (CRS) » ; une divergence
(« Centre Réseaux & Systèmes ») existe dans d'autres cours sources de la classe et n'a
jamais été tranchée par l'enseignante. Ce point n'affecte pas cette séquence (aucun
développement de l'acronyme n'y figure), mais reste signalé par cohérence.

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (module A2) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Identifier la fréquence d'un rythme biologique à partir d'un document descriptif ou scientifique | Rythmes biologiques, Cycle, Fréquence d'un rythme biologique | Rythmes, cycles et phases du sommeil |
| Présenter les rôles des principales phases d'un cycle du sommeil | Phases du sommeil, Récupération physique, Récupération mentale | Rythmes, cycles et phases du sommeil |
| Repérer les facteurs qui influencent les rythmes biologiques comme le sommeil | Rythme social, Synchronisation/désynchronisation, Horloge biologique | Désynchronisation et travail posté |
| Présenter les conséquences d'une désynchronisation des rythmes biologiques sur la santé, la vie sociale et professionnelle | (idem) | Désynchronisation et travail posté |
| Expliquer la réglementation appliquée au travail de nuit | Compte professionnel de prévention, Règlementation | Désynchronisation et travail posté |
| Proposer des mesures pour améliorer la qualité du sommeil | Hygiène du sommeil | Améliorer la qualité du sommeil |

Le fil rouge est celui déjà publié pour C1/C2/A1 de cette classe : l'atelier
« CIEL Réseaux & Systèmes (CRS) », avec Mme Nadaud (mentor), Malik (élève) et Léa (pair).

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro CIEL",
    "niveau": "Seconde",
    "classe": "2 CIEL",
    "enseignement": "PSE",
    "sequence": "A2. Les rythmes biologiques et le sommeil",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de seconde professionnelle",
        "referenceRelative": "BACPRO/2/2CIEL PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf",
        "sectionOuPage": "Thématique A, module A2",
        "extraitOuNotionUtilisee": "Rythmes biologiques, cycle, fréquence, phases du sommeil, récupération physique, récupération mentale, rythme social, synchronisation, désynchronisation, horloge biologique, compte professionnel de prévention, réglementation, hygiène du sommeil"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 4 — Séance 1 : rythmes, cycles et phases du sommeil",
        "referenceRelative": "BACPRO/2/2CIEL PSE/Sequences/Sequence_4/S4_seance_01_rythmes_cycles_et_phases_du_sommeil/S4_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 4 — Séance 2 : désynchronisation et travail posté",
        "referenceRelative": "BACPRO/2/2CIEL PSE/Sequences/Sequence_4/S4_seance_02_desynchronisation_et_travail_poste/S4_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 4 — Séance 3 : améliorer la qualité du sommeil",
        "referenceRelative": "BACPRO/2/2CIEL PSE/Sequences/Sequence_4/S4_seance_03_ameliorer_la_qualite_du_sommeil/S4_seance_03_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 4 — Bilan et évaluation de séquence",
        "referenceRelative": "BACPRO/2/2CIEL PSE/Sequences/Sequence_4/S4_bilan_et_evaluation_sequence/S4_bilan_et_evaluation_sequence_complete.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-10-28",
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Contenu repris des trois séances déjà rédigées pour cette classe, via le générateur commun buildPseSecondeA2Sequence (prisma/content/pse-seconde-a2.ts), paramétré ici par pse-2ciel-a2.ts (atelier CRS, Mme Nadaud, Malik, Léa). Aucun chiffre de réglementation du travail de nuit n'a été inventé : le cours source indique explicitement que ces règles doivent être vérifiées sur une source officielle à jour, et la séquence reprend cette réserve à l'identique. Les activités sont classées CORE, le seed ne produisant pas d'autre track."
  }
]
```

## Emplacement du contenu

Le contenu de cette séquence vit dans [`pse-seconde-a2.ts`](../prisma/content/pse-seconde-a2.ts)
(générateur commun) et [`pse-2ciel-a2.ts`](../prisma/content/pse-2ciel-a2.ts) (paramétrage
2 CIEL), inscrit au registre [`prisma/content/index.ts`](../prisma/content/index.ts) : il
part sur le site en ligne par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
