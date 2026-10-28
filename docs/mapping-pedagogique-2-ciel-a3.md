# Mapping pédagogique — 2 CIEL / PSE / Module A3

Traçabilité de la séquence A3 de PSE en 2 CIEL, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§3, §7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-2-aero-a3.md`](mapping-pedagogique-2-aero-a3.md).
Le contenu est produit par un générateur commun, `prisma/content/pse-seconde-a3.ts`,
paramétré par classe, sur le même principe que `pse-seconde-a1.ts` et `pse-seconde-a2.ts`.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro CIEL |
| Niveau | Seconde |
| Classe | `2 CIEL` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de seconde professionnelle — « Annexe : Prévention-santé-environnement — Classe de seconde professionnelle » (texte commun à toutes les spécialités Bac Pro) |
| Chemin exact du référentiel | `BACPRO/2/2CIEL PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf` |
| Partie du référentiel utilisée | Thématique A, **Module A3 — L'activité physique** : les 4 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/2/2CIEL PSE/Sequences/Sequence_5/S5_seance_01_le_muscle_et_le_mouvement_volontaire/S5_seance_01_complete.md`, `.../S5_seance_02_le_corps_pendant_l_effort/S5_seance_02_complete.md`, `.../S5_seance_03_activite_physique_sante_et_sedentarite/S5_seance_03_complete.md`, `.../S5_bilan_et_evaluation_sequence/S5_bilan_et_evaluation_sequence_complete.md` |
| État du mapping (§10) | `VALIDE` — contenu directement repris des trois séances déjà rédigées pour cette classe (notions, lexique, mini-situations), transposé le 2026-10-28 |
| Conformité constatée | **OUI** |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (module A3) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Expliquer le mouvement volontaire à l'aide de la structure anatomique et des propriétés du muscle strié squelettique | Muscle strié squelettique, Excitabilité, Contractilité, Élasticité, Tonicité | Le muscle et le mouvement volontaire |
| Expliquer le mécanisme de la contraction du muscle | Consommation d'énergie, Production de déchets | Le corps pendant l'effort |
| Repérer les modifications physiologiques lors d'un travail musculaire | Rythme cardiaque, Rythme respiratoire, Thermorégulation | Le corps pendant l'effort |
| Démontrer l'intérêt d'une activité physique régulière sur la santé | Activité physique, Sédentarité, Bien-être (physique, mental et social) | Activité physique, santé et sédentarité |

Le fil rouge est celui déjà publié pour C1/C2/A1/A2 de cette classe : l'atelier
« CIEL Réseaux & Systèmes (CRS) », avec Mme Nadaud (mentor), Malik (élève) et Léa (pair).

## Point de vigilance repris du cours

Le repère chiffré « au moins 60 minutes d'activité par jour » (5 à 17 ans) cité dans le
cours source (`S5_seance_03_complete.md`) est repris tel quel : il est sourcé par le cours
lui-même aux lignes directrices de l'Organisation mondiale de la santé sur l'activité
physique et la sédentarité (2020), sans ajout ni extrapolation de notre part.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro CIEL",
    "niveau": "Seconde",
    "classe": "2 CIEL",
    "enseignement": "PSE",
    "sequence": "A3. L'activité physique",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de seconde professionnelle",
        "referenceRelative": "BACPRO/2/2CIEL PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf",
        "sectionOuPage": "Thématique A, module A3",
        "extraitOuNotionUtilisee": "muscle strié squelettique, excitabilité, contractilité, élasticité, tonicité, consommation d'énergie, production de déchets, rythme cardiaque, rythme respiratoire, thermorégulation, activité physique, sédentarité, bien-être physique, mental et social"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 5 — Séance 1 : le muscle et le mouvement volontaire",
        "referenceRelative": "BACPRO/2/2CIEL PSE/Sequences/Sequence_5/S5_seance_01_le_muscle_et_le_mouvement_volontaire/S5_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 5 — Séance 2 : le corps pendant l'effort",
        "referenceRelative": "BACPRO/2/2CIEL PSE/Sequences/Sequence_5/S5_seance_02_le_corps_pendant_l_effort/S5_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 5 — Séance 3 : activité physique, santé et sédentarité",
        "referenceRelative": "BACPRO/2/2CIEL PSE/Sequences/Sequence_5/S5_seance_03_activite_physique_sante_et_sedentarite/S5_seance_03_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 5 — Bilan et évaluation de séquence",
        "referenceRelative": "BACPRO/2/2CIEL PSE/Sequences/Sequence_5/S5_bilan_et_evaluation_sequence/S5_bilan_et_evaluation_sequence_complete.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-10-28",
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Contenu repris des trois séances déjà rédigées pour cette classe, via le générateur commun buildPseSecondeA3Sequence (prisma/content/pse-seconde-a3.ts), paramétré ici par pse-2ciel-a3.ts (atelier CRS, Mme Nadaud, Malik, Léa). Le repère OMS de 60 minutes d'activité quotidienne est repris tel quel du cours source, qui le cite lui-même. Les activités sont classées CORE, le seed ne produisant pas d'autre track."
  }
]
```

## Emplacement du contenu

Le contenu de cette séquence vit dans [`pse-seconde-a3.ts`](../prisma/content/pse-seconde-a3.ts)
(générateur commun) et [`pse-2ciel-a3.ts`](../prisma/content/pse-2ciel-a3.ts) (paramétrage
2 CIEL), inscrit au registre [`prisma/content/index.ts`](../prisma/content/index.ts) : il
part sur le site en ligne par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
