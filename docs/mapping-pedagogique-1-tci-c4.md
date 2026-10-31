# Mapping pédagogique — 1 TCI / PSE / Module C4

Traçabilité des contenus 1 TCI ajoutés au catalogue applicatif, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-1-aero-c4.md`](mapping-pedagogique-1-aero-c4.md).
Fait suite à [`mapping-pedagogique-1-tci.md`](mapping-pedagogique-1-tci.md) (module C3, état
`A_REVOIR`, non concerné par cette fiche), [`mapping-pedagogique-1-tci-c5.md`](mapping-pedagogique-1-tci-c5.md)
(module C5) et [`mapping-pedagogique-1-tci-c6.md`](mapping-pedagogique-1-tci-c6.md) (module
C6), en revenant à la séquence 4 de la progression annuelle.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Technicien en chaudronnerie industrielle |
| Niveau | Première |
| Classe | `1 TCI` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de première professionnelle — « Annexe 1 : Prévention-santé-environnement — Classe de première professionnelle », BO spécial n° 1 du 6 février 2020 |
| Chemin exact du référentiel | `BACPRO/1/1TCI PSE/spe005_annexe1_1239665 (1).pdf` (exemplaire identique à celui de 1 AERO) |
| Partie du référentiel utilisée | Thématique C, **Module C4 — L'assistance et le secours en milieu professionnel** : les 3 objectifs ciblés et leurs notions clés |
| Progression consultée | `BACPRO/1/1TCI PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1TCI.pdf` — Séquence 4 « Alerter et secourir en milieu professionnel » |
| Cours consultés | `…/Sequences/Sequence_4/S4_seance_01_comprendre_l_organisation_des_secours/S4_seance_01_complete.md`, `.../S4_seance_02_construire_un_message_d_alerte_et_porter_assi/S4_seance_02_complete.md`, `.../S4_bilan_et_evaluation_sequence/S4_bilan_et_evaluation_sequence_complete.md` |
| État du mapping (§10) | `VALIDE` — contenu directement repris des deux séances déjà rédigées pour cette classe (notions, lexique, mini-situations, corrections), transposé le 2026-10-31 |
| Conformité constatée | **OUI** |

## Point de vigilance : ne pas confondre avec 1 AERO

Le module C4 est également traité en `1 AERO` ([`pse-1aero-c4.ts`](../prisma/content/pse-1aero-c4.ts)),
avec le même référentiel mais un fil rouge différent (maintenance aéronautique). Les
situations et les personnages sont propres à chaque classe. Ici, les situations sont
celles de la chaudronnerie (ébavurage, meulage, chute d'un escabeau en fixant une virole).

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (annexe 1, module C4) | Notions clés associées | Séance créée |
|---|---|---|
| Présenter l'organisation des secours et des moyens d'alerte en milieu professionnel | Plan d'évacuation, Signalisation, Procédure | Comprendre l'organisation des secours |
| Proposer les éléments d'un message d'alerte adapté à une situation | Alerte | Alerter et porter assistance |
| Expliquer l'obligation de porter assistance à toute personne en danger | Responsabilité, Cadre législatif | Alerter et porter assistance |

Le fil rouge est celui déjà publié pour C3/C5/C6 de cette classe : l'atelier
« Chaudronnerie de l'Estuaire (CDE) », avec M. Berthier (mentor) et Karim (élève).

## Point de vigilance repris du cours

Le cours source cite l'article 223-6 du Code pénal (non-assistance à personne en péril)
et sa sanction maximale (5 ans d'emprisonnement, 75 000 € d'amende), sourcés à Légifrance
dans le cours lui-même (`S4_seance_02_complete.md`, section « Sources »). Ces éléments
sont repris tels quels, sans ajout ni interprétation.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Technicien en chaudronnerie industrielle",
    "niveau": "Première",
    "classe": "1 TCI",
    "enseignement": "PSE",
    "sequence": "C4. L'assistance et le secours en milieu professionnel",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de première professionnelle (annexe 1)",
        "referenceRelative": "BACPRO/1/1TCI PSE/spe005_annexe1_1239665 (1).pdf",
        "sectionOuPage": "Thématique C, module C4",
        "extraitOuNotionUtilisee": "plan d'évacuation, signalisation, procédure, alerte, responsabilité, cadre législatif"
      },
      {
        "typeSource": "PROGRESSION",
        "titreSource": "Progression annuelle PSE 1 TCI 2026-2027",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1TCI.pdf",
        "sectionOuPage": "Séquence 4",
        "extraitOuNotionUtilisee": "Module C4"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 4 — Séance 1 : comprendre l'organisation des secours",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Sequences/Sequence_4/S4_seance_01_comprendre_l_organisation_des_secours/S4_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 4 — Séance 2 : alerter et porter assistance",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Sequences/Sequence_4/S4_seance_02_construire_un_message_d_alerte_et_porter_assi/S4_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 4 — Bilan et évaluation de séquence",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Sequences/Sequence_4/S4_bilan_et_evaluation_sequence/S4_bilan_et_evaluation_sequence_complete.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-10-31",
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Contenu repris des deux séances déjà rédigées pour cette classe (prisma/content/pse-1tci-c4.ts), avec le même fil rouge CDE que C3, C5 et C6. L'article 223-6 du Code pénal et sa sanction sont repris tels quels du cours source, sans ajout. Les activités sont classées CORE, le seed ne produisant pas d'autre track. Ne concerne pas l'état A_REVOIR du mapping C3 de cette classe, propre à ce module."
  }
]
```

## Contenu créé

2 séances, 17 activités publiées, couvrant les 3 objectifs ciblés du module C4.

## Emplacement du contenu

Le contenu de cette séquence vit dans [`pse-1tci-c4.ts`](../prisma/content/pse-1tci-c4.ts),
inscrit au registre [`prisma/content/index.ts`](../prisma/content/index.ts) : il part sur le
site en ligne par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
