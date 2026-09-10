# Mapping pédagogique — 1 TCI / PSE / Module C3

Traçabilité des contenus 1 TCI ajoutés au catalogue applicatif, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Technicien en chaudronnerie industrielle |
| Niveau | Première |
| Classe | `1 TCI` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de première professionnelle — arrêté du 21 novembre 2018, annexe 1 |
| Chemin exact du référentiel | `BACPRO/1/1TCI PSE/spe005_annexe1_1239665 (1).pdf` |
| Partie du référentiel utilisée | Thématique C, **Module C3 — Les acteurs de prévention** : les 2 objectifs ciblés et leurs notions clés associées |
| Progression consultée | `BACPRO/1/1TCI PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1TCI.pdf` — Séquence 1 « Les acteurs de la prévention : qui me protège au travail ? », septembre, 2 h, compétences C1 · C3 · C6 |
| Cours consultés | `…/Sequences/Sequence_1/S1_seance_01_acteurs_internes/S1_seance_01_complete.md`, `…/S1_seance_02_organismes_externes/S1_seance_02_complete.md`, `…/S1_bilan_et_evaluation_sequence/S1_bilan_et_evaluation_sequence_complete.md` |
| Audit de conformité consulté | `BACPRO/1/1TCI PSE/_Ressources_enseignant/Audits_referentiel/AUDIT_CONFORMITE_1AERO_1TCI_PSE_REFERENTIEL_2026_08_30.md` |
| Fil rouge de la classe | « Ma santé, ma sécurité au travail chez Chaudronnerie de l'Estuaire (CDE) » — M. Berthier, Karim, Élodie |
| Conformité constatée | **OUI** — correspondance objectif par objectif, voir le tableau ci-dessous |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (annexe 1, module C3) | Notions clés associées | Séance créée |
|---|---|---|
| Identifier les rôles des acteurs internes de prévention | comité social et économique, salarié compétent, sauveteur secouriste du travail, service de santé au travail | Identifier les rôles des acteurs internes de prévention |
| Identifier les missions des organismes de prévention externes à l'entreprise | inspection du travail, CARSAT | Identifier les missions des organismes externes à l'entreprise |
| *(réinvestissement des deux objectifs)* | — | Choisir l'interlocuteur adapté à une situation de prévention |

La troisième séance ne correspond pas à un objectif supplémentaire du référentiel : elle
réinvestit les deux objectifs ciblés sur des situations de l'atelier, conformément au bilan de
séquence du cours de l'enseignante.

## Point de vigilance : ne pas confondre avec 1 AERO

Le module C3 est également traité en `1 AERO` ([`pse-1aero-c3.ts`](../prisma/content/pse-1aero-c3.ts)),
avec le même référentiel mais un fil rouge différent (maintenance aéronautique). Les
situations, les personnages et les risques cités sont propres à chaque classe : les contenus
ne doivent pas être recopiés d'une classe à l'autre. Ici, les situations sont celles de la
chaudronnerie (ébavurage, tôles à arêtes vives, poste de soudage).

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Technicien en chaudronnerie industrielle",
    "niveau": "Première",
    "classe": "1 TCI",
    "enseignement": "PSE",
    "sequence": "C3. Les acteurs de prévention",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de première professionnelle (arrêté du 21 novembre 2018, annexe 1)",
        "referenceRelative": "BACPRO/1/1TCI PSE/spe005_annexe1_1239665 (1).pdf",
        "sectionOuPage": "Thématique C, module C3",
        "extraitOuNotionUtilisee": "comité social et économique, salarié compétent, sauveteur secouriste du travail, service de santé au travail, inspection du travail, CARSAT"
      },
      {
        "typeSource": "PROGRESSION",
        "titreSource": "Progression annuelle PSE 1 TCI 2026-2027",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1TCI.pdf",
        "sectionOuPage": "Séquence 1 (septembre, 2 h)",
        "extraitOuNotionUtilisee": "Module C3 — compétences C1 · C3 · C6"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 1 : les acteurs internes",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_seance_01_acteurs_internes/S1_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 2 : les organismes externes",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_seance_02_organismes_externes/S1_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Bilan et évaluation de séquence",
        "referenceRelative": "BACPRO/1/1TCI PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_bilan_et_evaluation_sequence/S1_bilan_et_evaluation_sequence_complete.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "A_REVOIR",
    "proposePar": "assistant",
    "commentaire": "Conformité vérifiée objectif par objectif dans l'annexe 1 et sources du dossier 1TCI consultées directement. État A_REVOIR tant que l'enseignante n'a pas validé explicitement la correspondance : la génération CORE de nouvelles activités à partir de ce mapping suppose le passage à VALIDE (§10)."
  }
]
```

## Emplacement du contenu

Le contenu de cette séquence vit dans [`prisma/content/pse-1tci-c3.ts`](../prisma/content/pse-1tci-c3.ts)
et est inscrit au registre de mise en ligne
([`prisma/content/index.ts`](../prisma/content/index.ts)) : il part sur le site en ligne
par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
