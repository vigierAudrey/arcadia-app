# Mapping pédagogique — T TCI / PSE / Module C7

Traçabilité des contenus T TCI ajoutés au catalogue applicatif, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Technicien en chaudronnerie industrielle |
| Niveau | Terminale |
| Classe | `T TCI` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe terminale professionnelle — arrêté du 3 avril 2019, annexe 2 |
| Chemin exact du référentiel | `BACPRO/T/TTCI PSE/spe005_annexe2_1239667 (1).pdf` |
| Partie du référentiel utilisée | Thématique C, **Module C7 — Le suivi de la santé au travail** : les 4 objectifs ciblés et leurs notions clés associées |
| Progression consultée | `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/PSE - Progression et sequences/Progression_annuelle_PSE_TTCI.pdf` |
| Cours consultés | `…/01_Sequence_1_C7/S1_seance_01_le_suivi_individuel_du_salarie/S1_seance_01_complete.md`, `…/S1_seance_02_les_defenses_de_l_organisme/S1_seance_02_complete.md`, `…/S1_seance_03_la_vaccination_au_travail/S1_seance_03_complete.md`, `…/S1_bilan_et_evaluation_sequence/S1_bilan_et_evaluation_sequence_complete.md` |
| Audits consultés | `BACPRO/T/TTCI PSE/_Ressources_enseignant/Audits_referentiel/AUDIT_ALIGNEMENT_REFERENTIEL_TTCI.md`, `BACPRO/T/TTCI PSE/_Ressources_enseignant/CONTROLE_TTCI_notions_referentiel.md` |
| Fil rouge de la classe | Chaudronnerie de l'Estuaire (CDE) — M. Berthier, Karim, Élodie |
| Conformité constatée | **OUI** — correspondance objectif par objectif, voir le tableau ci-dessous |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (annexe 2, module C7) | Notions clés associées | Séance créée |
|---|---|---|
| Identifier les modalités de suivi individuel médical des salariés | VIP, EMA, suivi médical | Identifier les modalités de suivi individuel médical des salariés |
| Expliquer les moyens de défense de l'organisme face à l'infection microbienne | barrière cutanéo-muqueuse, immunité non spécifique, immunité spécifique | Expliquer les moyens de défense de l'organisme face à l'infection microbienne |
| Expliquer le principe de la vaccination | antigène, anticorps, mémoire immunitaire | Expliquer le principe de la vaccination et justifier les vaccinations préconisées |
| Justifier les vaccinations obligatoires et les vaccinations préconisées dans le secteur professionnel concerné | risque microbiologique, protection individuelle, protection collective | *(même séance)* |
| *(réinvestissement des quatre objectifs)* | — | Bilan de séquence : traiter une situation professionnelle chez CDE |

La séance de bilan ne correspond pas à un objectif supplémentaire du référentiel : elle
reprend le dossier « défi épreuve » du bilan de séquence de l'enseignante (reprise d'Élodie
sur la découpe laser, coupure de Karim, message du SPST) et la méthode en quatre étapes
qui y est décrite.

## Point de vigilance repris du cours

Le cours `S1_seance_03_complete.md` de T TCI tranche, sources à l'appui, un point que les
contenus générés ne doivent pas contredire :

- aucun texte n'impose de vaccination propre au métier de la **chaudronnerie** ; ce qui
  s'applique est le calendrier vaccinal de tous, avec un rappel diphtérie-tétanos-poliomyélite
  et coqueluche à 25, 45, 65 ans, puis tous les dix ans ;
- ce rappel compte en atelier parce que le tétanos s'attrape par une **plaie souillée**, comme
  une coupure sur une tôle ;
- le tétanos ne se transmet pas d'une personne à une autre : la vaccination antitétanique est
  une **protection individuelle**, et l'argument de la protection collective ne s'applique
  qu'à une maladie transmissible ;
- l'employeur peut recommander d'autres vaccinations, à sa charge, sur proposition du médecin
  du travail, en cas d'exposition à des agents biologiques établie par l'évaluation des risques.

Ces quatre points sont repris tels quels dans la fiche « À retenir » et dans les exercices de la
troisième séance. **À revérifier chaque année** : le calendrier vaccinal évolue.

## Point de vigilance : ne pas confondre avec T AERO

Le module C7 est également traité en `T AERO` ([`pse-taero-c7.ts`](../prisma/content/pse-taero-c7.ts)),
avec le même référentiel. Les deux séquences partagent les notions du programme mais pas
leurs situations : T AERO parle du hangar et de Théo, T TCI de l'atelier CDE, d'Élodie et de
Karim. La conclusion sur l'absence d'obligation vaccinale sectorielle est formulée séparément
dans chaque cours, pour son propre secteur — elle n'a pas été transposée d'une classe à l'autre.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Technicien en chaudronnerie industrielle",
    "niveau": "Terminale",
    "classe": "T TCI",
    "enseignement": "PSE",
    "sequence": "C7. Le suivi de la santé au travail",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe terminale professionnelle (arrêté du 3 avril 2019, annexe 2)",
        "referenceRelative": "BACPRO/T/TTCI PSE/spe005_annexe2_1239667 (1).pdf",
        "sectionOuPage": "Thématique C, module C7",
        "extraitOuNotionUtilisee": "VIP, EMA, suivi médical, barrière cutanéo-muqueuse, immunité non spécifique, immunité spécifique, antigène, anticorps, mémoire immunitaire, risque microbiologique, protection individuelle, protection collective"
      },
      {
        "typeSource": "PROGRESSION",
        "titreSource": "Progression annuelle PSE T TCI 2026-2027",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/PSE - Progression et sequences/Progression_annuelle_PSE_TTCI.pdf",
        "sectionOuPage": "Séquence 1",
        "extraitOuNotionUtilisee": "Module C7 — compétences C1 · C3 · C6"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 1 : le suivi individuel du salarié",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/01_Sequence_1_C7/S1_seance_01_le_suivi_individuel_du_salarie/S1_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 2 : les défenses de l'organisme",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/01_Sequence_1_C7/S1_seance_02_les_defenses_de_l_organisme/S1_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 3 : la vaccination au travail",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/01_Sequence_1_C7/S1_seance_03_la_vaccination_au_travail/S1_seance_03_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Bilan et évaluation de séquence",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/01_Sequence_1_C7/S1_bilan_et_evaluation_sequence/S1_bilan_et_evaluation_sequence_complete.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "A_REVOIR",
    "proposePar": "assistant",
    "commentaire": "Conformité vérifiée objectif par objectif dans l'annexe 2 et sources du dossier TTCI consultées directement. État A_REVOIR tant que l'enseignante n'a pas validé explicitement la correspondance : la génération CORE de nouvelles activités à partir de ce mapping suppose le passage à VALIDE (§10)."
  }
]
```

## Séance de rappel ajoutée hors module C7 (§6 — révision inter-années)

La séance « Rappel : distinguer danger, situation dangereuse, événement déclencheur et
dommage » et ses quatre activités **ne relèvent pas du module C7**. Elles rappellent des
notions introduites plus tôt dans le cursus, ce que la §6 de
[`pedagogie-agents.md`](pedagogie-agents.md) autorise explicitement au titre de la révision
et de la consolidation.

| Champ | Valeur |
|---|---|
| Référentiel officiel identifié | Programme de PSE, seconde professionnelle — `spe632annexe1103982pdf-85404.pdf` ; et classe de première — arrêté du 3 avril 2019, annexe 1 |
| Chemin exact | `BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe632annexe1103982pdf-85404.pdf` et `…/spe005_annexe1_1239665.pdf` |
| Partie utilisée | **Module C2 — Les notions de base en prévention des risques professionnels** (seconde), objectif « Établir une relation entre le(s) danger(s) et le(s) dommage(s) potentiel(s) dans une situation dangereuse », notions « Danger », « Situation dangereuse », « Dommage potentiel ». La notion « Événement déclencheur » est nommée dans l'annexe 1 au **module C5 — L'analyse des risques professionnels** (première), objectif « Identifier les éléments d'apparition d'un dommage dans une activité de travail ». |
| Conformité constatée | **OUI en tant que rappel** — les quatre notions sont retrouvées dans les référentiels cités. Ce contenu ne complète ni ne modifie les attendus du module C7. |
| État de la correspondance | `A_REVOIR` — non validé par l'enseignante (§10) |

Aucun cours de `cours-source/` n'a été rattaché à cette séance : elle a été rédigée à
partir du référentiel et de la situation fil rouge déjà utilisée dans la séquence.

## Emplacement du contenu

Le contenu de cette séquence vit dans [`prisma/content/pse-ttci-c7.ts`](../prisma/content/pse-ttci-c7.ts)
et est inscrit au registre de mise en ligne
([`prisma/content/index.ts`](../prisma/content/index.ts)) : il part sur le site en ligne
par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
