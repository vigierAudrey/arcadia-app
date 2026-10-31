# Mapping pédagogique — 1 AERO / PSE / Module A8

Traçabilité des contenus 1 AERO ajoutés au catalogue applicatif, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-1-tci-a8.md`](mapping-pedagogique-1-tci-a8.md).
Fait suite à [`mapping-pedagogique-1-aero-c4.md`](mapping-pedagogique-1-aero-c4.md) (module C4),
dans l'ordre de la progression annuelle (séquence 5, janvier).

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Aéronautique |
| Niveau | Première |
| Classe | `1 AERO` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de première professionnelle — « Annexe 1 : Prévention-santé-environnement — Classe de première professionnelle », BO spécial n° 1 du 6 février 2020 |
| Chemin exact du référentiel | `BACPRO/1/1AERO PSE/spe005_annexe1_1239665.pdf` |
| Partie du référentiel utilisée | Thématique A, **Module A8 — Le stress au quotidien** : les 5 objectifs ciblés et leurs notions clés |
| Progression consultée | `BACPRO/1/1AERO PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1AERO.pdf` — Séquence 5 « Le stress au quotidien : comprendre et agir », janvier, 2 h |
| Cours consultés | `…/Sequences/Sequence_5/S5_seance_01_comprendre_la_reaction_de_stress/S5_seance_01_complete.md`, `.../S5_seance_02_differencier_stress_aigu_et_chronique_et_agir/S5_seance_02_complete.md`, `.../S5_bilan_et_evaluation_sequence/` |
| État du mapping (§10) | `VALIDE` — contenu directement repris des deux séances déjà rédigées pour cette classe (notions, lexique, mini-situations, corrections), transposé le 2026-10-31 |
| Conformité constatée | **OUI** |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (annexe 1, module A8) | Notions clés associées | Séance créée |
|---|---|---|
| Présenter les caractéristiques du stress | Vulnérabilité, Adaptation | Comprendre la réaction de stress |
| Lister les facteurs de stress dans la vie quotidienne | Facteur de stress | Comprendre la réaction de stress |
| Expliquer le mécanisme physiologique du stress par l'action de l'adrénaline et du cortisol | Phase, Hormone | Comprendre la réaction de stress |
| Différencier les effets du stress aigu et du stress chronique sur la santé | Aigu/chronique, Conséquence pathologique | Différencier stress aigu et chronique, et agir |
| Proposer des actions visant à gérer le stress au quotidien | Mesure individuelle | Différencier stress aigu et chronique, et agir |

## Point de vigilance repris du cours

Le personnage principal de cette séquence est Sarah (compagnon en avionique, 27 ans),
et non Théo comme dans les modules C3/C4/C5/C6 de la même classe : c'est le choix fait
par l'enseignante dans son cours source (`S5_seance_01_complete.md`, `S5_seance_02_complete.md`),
repris à l'identique, sans substitution. Le mentor reste M. Ferrand. Un second personnage,
Yanis (technicien, 30 ans), apparaît uniquement dans les mini-situations d'entraînement du
cours, également repris tel quel.

Les contenus relatifs aux conséquences du stress chronique sur la santé (troubles du
sommeil, hypertension, troubles musculosquelettiques, troubles anxieux, dépression,
épuisement professionnel) sont repris tels quels du cours source, sourcés par celui-ci à
l'INRS (« Stress au travail : effets sur la santé »), sans ajout ni interprétation de
notre part.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Aéronautique",
    "niveau": "Première",
    "classe": "1 AERO",
    "enseignement": "PSE",
    "sequence": "A8. Le stress au quotidien",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de première professionnelle (annexe 1)",
        "referenceRelative": "BACPRO/1/1AERO PSE/spe005_annexe1_1239665.pdf",
        "sectionOuPage": "Thématique A, module A8",
        "extraitOuNotionUtilisee": "vulnérabilité, adaptation, facteur de stress, phase, hormone, aigu/chronique, conséquence pathologique, mesure individuelle"
      },
      {
        "typeSource": "PROGRESSION",
        "titreSource": "Progression annuelle PSE 1 AERO 2026-2027",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1AERO.pdf",
        "sectionOuPage": "Séquence 5 (janvier, 2 h)",
        "extraitOuNotionUtilisee": "Module A8"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 5 — Séance 1 : comprendre la réaction de stress",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_5/S5_seance_01_comprendre_la_reaction_de_stress/S5_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 5 — Séance 2 : différencier stress aigu et chronique, et agir",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_5/S5_seance_02_differencier_stress_aigu_et_chronique_et_agir/S5_seance_02_complete.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-10-31",
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Contenu repris des deux séances déjà rédigées pour cette classe (prisma/content/pse-1aero-a8.ts), avec les personnages déjà utilisés par l'enseignante pour cette séquence précise (Sarah, M. Ferrand, Yanis), distincts de Théo utilisé dans les autres modules C de la classe. Les conséquences du stress chronique citées (troubles du sommeil, TMS, hypertension, troubles anxieux) sont reprises telles quelles du cours source, sourcé à l'INRS. Les activités sont classées CORE, le seed ne produisant pas d'autre track."
  }
]
```

## Contenu créé

2 séances, 17 activités publiées, couvrant les 5 objectifs ciblés du module A8.

## Emplacement du contenu

Le contenu de cette séquence vit dans [`pse-1aero-a8.ts`](../prisma/content/pse-1aero-a8.ts),
inscrit au registre [`prisma/content/index.ts`](../prisma/content/index.ts) : il part sur le
site en ligne par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
