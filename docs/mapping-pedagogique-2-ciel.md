# Mapping pédagogique — 2 CIEL / PSE / Module C1

Traçabilité des contenus 2 CIEL ajoutés au catalogue applicatif, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md).

## Fiche de traçabilité

| Champ | Valeur |
|---|---|
| Formation | Bac Pro CIEL |
| Niveau | Seconde |
| Classe | `2 CIEL` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de seconde professionnelle — « Annexe : Prévention-santé-environnement — Classe de seconde professionnelle » |
| Chemin exact du référentiel | `BACPRO/2/2CIEL PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf` |
| Partie du référentiel utilisée | Thématique C, **Module C1 — Les enjeux de la santé et sécurité au travail** |
| Progression consultée | `BACPRO/2/2CIEL PSE/PSE - Progression et sequences/Progression_annuelle_PSE_2CIEL.pdf` — Séquence 1, septembre, 3 h |
| Cours consultés | Versions Markdown archivées de la séquence 1 : `.../S1_seance_01_enjeux_sante_securite/S1_seance_01_complete.md`, `.../S1_seance_02_accident_maladie/S1_seance_02_complete.md`, `.../S1_seance_03_droits_obligations/S1_seance_03_complete.md` |
| Audit consulté | `BACPRO/2/2CIEL PSE/_Ressources_enseignant/Audits_referentiel/AUDIT_CONFORMITE_2AERO_2CIEL_2026_08_28.md` |
| Conformité constatée | **OUI** — les notions `enjeux socio-économiques` et `cadre réglementaire`, signalées comme faibles dans l'audit source, sont explicitement intégrées |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé | Notions clés associées | Séance créée |
|---|---|---|
| Identifier les enjeux de la santé et de la sécurité au travail pour les salariés | enjeux humains, enjeux socio-économiques, accident du travail / maladie professionnelle | Identifier les enjeux de la santé-sécurité au travail |
| Différencier accident du travail et maladie professionnelle | lésion, exposition chronique | Différencier accident du travail et maladie professionnelle |
| Repérer sur un document les dispositions réglementaires de l'employeur et du salarié en matière de santé et sécurité au travail | cadre réglementaire, responsabilité / obligations de l'employeur, droits / obligations du salarié | Repérer les obligations et la protection des jeunes travailleurs |
| Identifier sur un document les dispositions réglementaires spécifiques aux jeunes travailleurs et/ou aux nouveaux embauchés | jeune travailleur, nouvel embauché, cadre réglementaire | Repérer les obligations et la protection des jeunes travailleurs |

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro CIEL",
    "niveau": "Seconde",
    "classe": "2 CIEL",
    "enseignement": "PSE",
    "sequence": "C1. Les enjeux de la santé et sécurité au travail",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de seconde professionnelle",
        "referenceRelative": "BACPRO/2/2CIEL PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf",
        "sectionOuPage": "Thématique C, module C1",
        "extraitOuNotionUtilisee": "enjeux humains, enjeux socio-économiques, accident du travail, maladie professionnelle, lésion, exposition chronique, cadre réglementaire, obligations de l'employeur, droits et obligations du salarié, jeune travailleur, nouvel embauché"
      },
      {
        "typeSource": "PROGRESSION",
        "titreSource": "Progression annuelle PSE 2 CIEL 2026-2027",
        "referenceRelative": "BACPRO/2/2CIEL PSE/PSE - Progression et sequences/Progression_annuelle_PSE_2CIEL.pdf",
        "sectionOuPage": "Séquence 1 (septembre, 3 h)",
        "extraitOuNotionUtilisee": "Module C1 — compétences C1, C3, C6"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 1 : enjeux santé-sécurité",
        "referenceRelative": "BACPRO/2/2CIEL PSE/_Ressources_enseignant/Archives/ARCHIVE_ANNUELLE/_versions_non_illustrees_20260819_rangees_20260828_055925/avant_remplacement_par_illustre/S1_seance_01_enjeux_sante_securite/S1_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 2 : accident du travail ou maladie professionnelle",
        "referenceRelative": "BACPRO/2/2CIEL PSE/_Ressources_enseignant/Archives/ARCHIVE_ANNUELLE/_versions_non_illustrees_20260819_rangees_20260828_055925/avant_remplacement_par_illustre/S1_seance_02_accident_maladie/S1_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 3 : droits, obligations et jeunes travailleurs",
        "referenceRelative": "BACPRO/2/2CIEL PSE/_Ressources_enseignant/Archives/ARCHIVE_ANNUELLE/_versions_non_illustrees_20260819_rangees_20260828_055925/avant_remplacement_par_illustre/S1_seance_03_droits_obligations/S1_seance_03_complete.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-09-09",
    "commentaire": "Classe et séquence demandées explicitement. Les activités sont classées CORE par le mécanisme d'import existant."
  }
]
```

## Contenu créé

Le fichier [`pse-2ciel-c1.ts`](../prisma/content/pse-2ciel-c1.ts) crée une séquence PSE pour
`2 CIEL` : 3 séances et 19 activités publiables. Le contenu est inscrit dans
[`prisma/content/index.ts`](../prisma/content/index.ts) pour l'import additif en ligne.
