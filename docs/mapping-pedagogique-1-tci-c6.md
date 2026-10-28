# Mapping pédagogique — 1 TCI / PSE / Module C6

Traçabilité des contenus 1 TCI ajoutés au catalogue applicatif, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-1-aero-c6.md`](mapping-pedagogique-1-aero-c6.md).
Fait suite à [`mapping-pedagogique-1-tci.md`](mapping-pedagogique-1-tci.md) (module C3, état
`A_REVOIR`, non concerné par cette fiche) et
[`mapping-pedagogique-1-tci-c5.md`](mapping-pedagogique-1-tci-c5.md) (module C5), dans l'ordre
de la progression annuelle de la classe (séquence 3).

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Technicien en chaudronnerie industrielle |
| Niveau | Première |
| Classe | `1 TCI` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de première professionnelle — « Annexe 1 : Prévention-santé-environnement — Classe de première professionnelle », BO spécial n° 1 du 6 février 2020 |
| Chemin exact du référentiel | `BACPRO/1/1TCI PSE/spe005_annexe1_1239665 (1).pdf` (exemplaire identique à celui de 1 AERO) |
| Partie du référentiel utilisée | Thématique C, **Module C6 — L'analyse d'un risque spécifique au secteur professionnel** : les 4 objectifs ciblés et leurs notions clés |
| Progression consultée | `BACPRO/1/1TCI PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1TCI.pdf` — Séquence 3 « Analyser un risque spécifique à mon métier » |
| Cours consultés | `…/Sequences/Sequence_3/S3_seance_01_reperer_les_risques_specifiques_du_metier/S3_seance_01_complete.md`, `.../S3_seance_02_analyser_les_fumees_de_soudage_et_leurs_effet/S3_seance_02_complete.md`, `.../S3_seance_03_hierarchiser_les_mesures_de_prevention/S3_seance_03_complete.md`, `.../S3_bilan_et_evaluation_sequence/S3_bilan_et_evaluation_sequence_complete.md` |
| État du mapping (§10) | `VALIDE` — contenu directement repris des trois séances déjà rédigées pour cette classe (notions, lexique, mini-situations, corrections), transposé le 2026-10-28 |
| Conformité constatée | **OUI** |

## Point de vigilance : ne pas confondre avec 1 AERO

Le module C6 est également traité en `1 AERO` ([`pse-1aero-c6.ts`](../prisma/content/pse-1aero-c6.ts)),
avec le même référentiel mais un fil rouge différent (maintenance aéronautique). Les
situations, les personnages et les risques cités sont propres à chaque classe. Ici, le
risque spécifique analysé est celui des fumées de soudage, propre à la chaudronnerie
(poste MIG-MAG), distinct des poussières de composite étudiées en 1 AERO.

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (annexe 1, module C6) | Notions clés associées | Séance créée |
|---|---|---|
| Repérer les risques spécifiques du secteur professionnel | Risque spécifique, Nature du risque | Repérer les risques spécifiques du métier |
| Appliquer la démarche d'analyse et d'évaluation d'un risque spécifique (cf. module C5) | Danger, situation dangereuse, dommage, processus, gravité, probabilité, priorité | Analyser les fumées de soudage et leurs effets |
| Expliquer les effets physiopathologiques de l'exposition au danger | Affection aiguë, affection chronique, atteinte à la santé | Analyser les fumées de soudage et leurs effets |
| Proposer des mesures de prévention hiérarchisées en lien avec le risque | Suppression, réduction, protection collective, protection individuelle, formation, information | Hiérarchiser les mesures de prévention |

Le fil rouge est celui déjà publié pour C3/C5 de cette classe : l'atelier
« Chaudronnerie de l'Estuaire (CDE) », avec M. Berthier (mentor), Karim et Élodie.

## Point de vigilance repris du cours

Le cours source cite un élément factuel précis — le classement des fumées de soudage
comme cancérogènes pour l'homme par le CIRC depuis 2017 — repris tel quel, sans ajout ni
interprétation, et sourcé dans le cours lui-même (`S3_seance_02_complete.md`, section
« Sources », qui cite les ressources INRS correspondantes).

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Technicien en chaudronnerie industrielle",
    "niveau": "Première",
    "classe": "1 TCI",
    "enseignement": "PSE",
    "sequence": "C6. L'analyse d'un risque spécifique au secteur professionnel",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de première professionnelle (annexe 1)",
        "referenceRelative": "BACPRO/1/1TCI PSE/spe005_annexe1_1239665 (1).pdf",
        "sectionOuPage": "Thématique C, module C6",
        "extraitOuNotionUtilisee": "risque spécifique, nature du risque, danger, situation dangereuse, dommage, processus, gravité, probabilité, priorité, affection aiguë, affection chronique, atteinte à la santé, suppression, réduction, protection collective, protection individuelle, formation, information"
      },
      {
        "typeSource": "PROGRESSION",
        "titreSource": "Progression annuelle PSE 1 TCI 2026-2027",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1TCI.pdf",
        "sectionOuPage": "Séquence 3",
        "extraitOuNotionUtilisee": "Module C6"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 1 : repérer les risques spécifiques du métier",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_01_reperer_les_risques_specifiques_du_metier/S3_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 2 : analyser les fumées de soudage et leurs effets",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_02_analyser_les_fumees_de_soudage_et_leurs_effet/S3_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 3 : hiérarchiser les mesures de prévention",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_03_hierarchiser_les_mesures_de_prevention/S3_seance_03_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Bilan et évaluation de séquence",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_bilan_et_evaluation_sequence/S3_bilan_et_evaluation_sequence_complete.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-10-28",
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Contenu repris des trois séances déjà rédigées pour cette classe (prisma/content/pse-1tci-c6.ts), avec le même fil rouge CDE que C3 et C5. L'élément factuel du classement CIRC 2017 est repris tel quel du cours source, sans ajout. Les activités sont classées CORE, le seed ne produisant pas d'autre track. Ne concerne pas l'état A_REVOIR du mapping C3 de cette classe, propre à ce module."
  }
]
```

## Contenu créé

3 séances, 25 activités publiées, couvrant les 4 objectifs ciblés du module C6.

## Emplacement du contenu

Le contenu de cette séquence vit dans [`pse-1tci-c6.ts`](../prisma/content/pse-1tci-c6.ts),
inscrit au registre [`prisma/content/index.ts`](../prisma/content/index.ts) : il part sur le
site en ligne par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
