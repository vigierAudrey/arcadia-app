# Mapping pédagogique — 1 AERO / PSE / Module C6

Traçabilité des contenus 1 AERO ajoutés au catalogue applicatif, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-1-tci-c6.md`](mapping-pedagogique-1-tci-c6.md).
Fait suite à [`mapping-pedagogique-1-aero.md`](mapping-pedagogique-1-aero.md) (module C3) et
[`mapping-pedagogique-1-aero-c5.md`](mapping-pedagogique-1-aero-c5.md) (module C5), dans l'ordre
de la progression annuelle de la classe (séquence 3).

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Aéronautique |
| Niveau | Première |
| Classe | `1 AERO` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de première professionnelle — « Annexe 1 : Prévention-santé-environnement — Classe de première professionnelle », BO spécial n° 1 du 6 février 2020 |
| Chemin exact du référentiel | `BACPRO/1/1AERO PSE/spe005_annexe1_1239665.pdf` |
| Partie du référentiel utilisée | Thématique C, **Module C6 — L'analyse d'un risque spécifique au secteur professionnel** : les 4 objectifs ciblés et leurs notions clés |
| Progression consultée | `BACPRO/1/1AERO PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1AERO.pdf` — Séquence 3 « Analyser un risque spécifique à mon métier », novembre, 3 h, compétences C2 · C3 · C4 |
| Cours consultés | `…/Sequences/Sequence_3/S3_seance_01_reperer_les_risques_specifiques_du_metier/S3_seance_01_complete.md`, `.../S3_seance_02_analyser_les_poussieres_de_composite_et_leurs/S3_seance_02_complete.md`, `.../S3_seance_03_hierarchiser_les_mesures_de_prevention/S3_seance_03_complete.md`, `.../S3_bilan_et_evaluation_sequence/S3_bilan_et_evaluation_sequence_complete.md` |
| État du mapping (§10) | `VALIDE` — contenu directement repris des trois séances déjà rédigées pour cette classe (notions, lexique, mini-situations, corrections), transposé le 2026-10-28 |
| Conformité constatée | **OUI** |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (annexe 1, module C6) | Notions clés associées | Séance créée |
|---|---|---|
| Repérer les risques spécifiques du secteur professionnel | Risque spécifique, Nature du risque | Repérer les risques spécifiques du métier |
| Appliquer la démarche d'analyse et d'évaluation d'un risque spécifique (cf. module C5) | Danger, situation dangereuse, dommage, processus, gravité, probabilité, priorité | Analyser les poussières de composite et leurs effets |
| Expliquer les effets physiopathologiques de l'exposition au danger | Affection aiguë, affection chronique, atteinte à la santé | Analyser les poussières de composite et leurs effets |
| Proposer des mesures de prévention hiérarchisées en lien avec le risque | Suppression, réduction, protection collective, protection individuelle, formation, information | Hiérarchiser les mesures de prévention |

Le fil rouge est celui déjà publié pour C3/C5 de cette classe : l'atelier
AéroMaintenance Atlantique (AMA), avec M. Ferrand (mentor) et Théo (élève). Le risque
spécifique étudié, les poussières de composite dégagées au ponçage, est celui déjà
identifié dans le cours de l'enseignante pour ce métier.

## Point de vigilance repris du cours

Le cours source cite des éléments factuels précis (tableau n° 51 du régime général pour
les affections liées aux résines époxydiques, articles du code du travail, ressources
INRS) : ces éléments sont repris tels quels, sans ajout ni interprétation, et restent
sourcés dans le cours lui-même (`S3_seance_02_complete.md`, section « Sources »). Comme
pour C3 de cette classe, le fil rouge AMA reste explicitement fictif et ne décrit aucune
entreprise réelle.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Aéronautique",
    "niveau": "Première",
    "classe": "1 AERO",
    "enseignement": "PSE",
    "sequence": "C6. L'analyse d'un risque spécifique au secteur professionnel",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de première professionnelle (annexe 1)",
        "referenceRelative": "BACPRO/1/1AERO PSE/spe005_annexe1_1239665.pdf",
        "sectionOuPage": "Thématique C, module C6",
        "extraitOuNotionUtilisee": "risque spécifique, nature du risque, danger, situation dangereuse, dommage, processus, gravité, probabilité, priorité, affection aiguë, affection chronique, atteinte à la santé, suppression, réduction, protection collective, protection individuelle, formation, information"
      },
      {
        "typeSource": "PROGRESSION",
        "titreSource": "Progression annuelle PSE 1 AERO 2026-2027",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1AERO.pdf",
        "sectionOuPage": "Séquence 3 (novembre, 3 h)",
        "extraitOuNotionUtilisee": "Module C6 — compétences C2 · C3 · C4"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 1 : repérer les risques spécifiques du métier",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_01_reperer_les_risques_specifiques_du_metier/S3_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 2 : analyser les poussières de composite et leurs effets",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_02_analyser_les_poussieres_de_composite_et_leurs/S3_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 3 : hiérarchiser les mesures de prévention",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_03_hierarchiser_les_mesures_de_prevention/S3_seance_03_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Bilan et évaluation de séquence",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_bilan_et_evaluation_sequence/S3_bilan_et_evaluation_sequence_complete.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-10-28",
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Contenu repris des trois séances déjà rédigées pour cette classe (prisma/content/pse-1aero-c6.ts), avec le même fil rouge AMA que C3 et C5. Les éléments factuels (tableau n° 51, code du travail, ressources INRS) sont repris tels quels du cours source, sans ajout. Les activités sont classées CORE, le seed ne produisant pas d'autre track."
  }
]
```

## Contenu créé

3 séances, 25 activités publiées (9 `qcm`/`matching`/`sorting`/`true_false` répartis selon
les mêmes proportions que C3/C5), couvrant les 4 objectifs ciblés du module C6.

## Emplacement du contenu

Le contenu de cette séquence vit dans [`pse-1aero-c6.ts`](../prisma/content/pse-1aero-c6.ts),
inscrit au registre [`prisma/content/index.ts`](../prisma/content/index.ts) : il part sur le
site en ligne par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
