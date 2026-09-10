# Mapping pédagogique — T AAGA / Bloc 2 / Module CT3

Traçabilité des contenus Bloc 2 ajoutés au catalogue applicatif, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | CAP Agent accompagnant au grand âge (AAGA) |
| Niveau | Terminale |
| Classe | `T AAGA` |
| Enseignement/bloc | Bloc 2 (TeachingArea `BLOCK`), distinct du TeachingArea PSE de la même classe |
| Référentiel officiel identifié | Arrêté du 6 février 2023 portant création de la spécialité « agent accompagnant au grand âge » de CAP, publié au JO du 14 mars 2023 — bloc n°2 « Promotion de l'autonomie de la personne dans son espace privé », unité UP2 |
| Chemin exact du référentiel | `CAP/le_nouveau_referentiel_cap_aaga_-_agent_accompagnant_au_grand_age.pdf` |
| Partie du référentiel utilisée | Bloc n°2, module **CT3 — Recueillir les informations, s'informer sur les éléments du contexte et de la situation professionnels** : compétences CT3.1, CT3.2 et CT3.3, avec leurs performances attendues, savoirs associés et limites de connaissances |
| Progression consultée | `CAP/CAP AAGA - Bloc 2/Progression_annuelle_Bloc2_CAP_AAGA.pdf` — « S1 — Cadre d'intervention, autonomie et ressources », septembre au 16/10, 14 h / 7 séances, compétences CT3.1 · CT3.2 · CT3.3 |
| Cours consultés | Les 7 séances de `CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1/` et le bilan de séquence (fichiers `*_complete.md`) |
| Audit de conformité consulté | `CAP/CAP AAGA - Bloc 2/_Ressources_enseignant/Audits_referentiel/AUDIT_CONFORMITE_REFERENTIEL_BLOC2_2026-08-16.md` |
| Fil rouge de la classe | EHPAD Les Glycines — Mme Leroux, Mme Rose, Mme Yvette, M. Karim, Mme Denise |
| Conformité constatée | **OUI** — correspondance compétence par compétence, voir le tableau ci-dessous |

## Correspondance référentiel → séances du catalogue

| Compétence (bloc 2, module CT3) | Savoirs associés du référentiel | Séance créée |
|---|---|---|
| CT3.1 Identifier le cadre de son intervention | Établissements et structures d'accueil des personnes âgées ; fiabilité des sources | Identifier une structure d'accueil et vérifier la fiabilité d'une information |
| CT3.1 | Rôles et missions des personnels, positions hiérarchiques et fonctionnelles ; acteurs de la prévention ; moyens de prévention | Repérer son rôle, ses limites et les moyens de prévention |
| CT3.1 | Le cadre réglementaire ; les différents projets : projet d'établissement, de service, projet de vie | Classer les décisions selon le projet d'établissement, de service ou de vie |
| CT3.1 | Protection des majeurs vulnérables (types de mesures, juge des tutelles) | Définir les mesures de protection des majeurs et respecter les droits |
| CT3.2 Prendre en compte le degré d'autonomie | Vieillissement, perte d'autonomie et dépendance ; modifications biologiques, cognitives et de l'état psychologique | Repérer les effets du vieillissement sans généraliser |
| CT3.2 · CT3.3 | Outils d'évaluation de l'autonomie ; déterminants liés à l'environnement qui facilitent ou limitent le déplacement | Déduire l'aide juste à partir du degré d'autonomie |
| CT3.1 · CT3.2 · CT3.3 | *(réinvestissement)* adaptation et sécurisation de l'espace ; gestion des produits et matériels ; alerte sur l'état du stock | Traiter une situation d'accueil complète aux Glycines |

Les sept séances du catalogue reprennent les sept séances de la séquence 1 de la
progression, dans le même ordre et avec les mêmes situations professionnelles.

## Titre de la séquence : code du référentiel, pas numéro de progression

La séquence est intitulée `CT3. Cadre d'intervention, autonomie et ressources` : le code
`CT3` vient du référentiel officiel, qui regroupe lui-même CT3.1, CT3.2 et CT3.3 sous ce
module ; le libellé reprend le nom donné par la progression annuelle. Conformément à la
doctrine de catalogue (§4 de [`pedagogie-agents.md`](pedagogie-agents.md)), c'est le
référentiel qui structure le catalogue ; le numéro « S1 » de la progression n'est qu'un
ordre personnel, susceptible de changer.

## Point de vigilance : Bloc 2 n'est pas PSE

`T AAGA` porte deux TeachingArea distincts déjà en ligne, `PSE` et `Bloc 2`, plus
`Maths appliquées`. Leurs référentiels sont différents : le programme de PSE en CAP d'un
côté, l'arrêté du 6 février 2023 de l'autre. Aucune source de l'un ne justifie une
activité de l'autre. Le contenu décrit ici est rattaché au seul TeachingArea `Bloc 2`.

## ⚠️ Divergence signalée : CT3.3 dans les cours existants

L'audit de conformité du 16 août 2026 relève (P1) que **CT3.3 est annoncée dans la
progression mais pratiquement non construite** dans les séances : pas de séance dédiée aux
ressources et contraintes techniques, quelques mentions du stock en séance 2, et une
évaluation de fin de séquence qui n'évalue pas réellement CT3.3.

Le contenu du catalogue ne reproduit donc pas cette lacune : les notions CT3.3 du
référentiel — environnement facilitant ou limitant le déplacement, adaptation et
sécurisation de l'espace, besoins en matériels et produits, alerte sur l'état du stock —
sont travaillées dans les séances 2, 6 et 7, à partir du texte du référentiel et des
supports réellement présents dans ces séances (plan de chambre, inventaire du matériel,
état du stock, fiche de transmission).

Ce choix suit la hiérarchie d'autorité (§2) : le référentiel prime sur les cours
existants. Il reste à valider par l'enseignante, notamment si elle prévoit de traiter
CT3.3 ailleurs dans l'année.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "CAP Agent accompagnant au grand âge",
    "niveau": "Terminale",
    "classe": "T AAGA",
    "enseignement": "Bloc 2",
    "sequence": "CT3. Cadre d’intervention, autonomie et ressources",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Arrêté du 6 février 2023 portant création de la spécialité « agent accompagnant au grand âge » de CAP (JO du 14 mars 2023)",
        "referenceRelative": "CAP/le_nouveau_referentiel_cap_aaga_-_agent_accompagnant_au_grand_age.pdf",
        "sectionOuPage": "Bloc n°2, module CT3 (CT3.1, CT3.2, CT3.3)",
        "extraitOuNotionUtilisee": "Établissements et structures d’accueil ; rôles et missions des personnels ; cadre réglementaire ; projets d’établissement, de service, projet de vie ; protection des majeurs vulnérables ; vieillissement, perte d’autonomie et dépendance ; outils d’évaluation de l’autonomie ; déterminants liés à l’environnement ; adaptation et sécurisation de l’espace ; gestion des produits et matériels"
      },
      {
        "typeSource": "PROGRESSION",
        "titreSource": "Progression annuelle corrigée — CAP AAGA — Bloc 2",
        "referenceRelative": "CAP/CAP AAGA - Bloc 2/Progression_annuelle_Bloc2_CAP_AAGA.pdf",
        "sectionOuPage": "S1 — Cadre d’intervention, autonomie et ressources (septembre-16/10, 14 h / 7 séances)",
        "extraitOuNotionUtilisee": "CT3.1 · CT3.2 · CT3.3"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 1 : structures d’accueil et fiabilité des informations",
        "referenceRelative": "CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1/S1_seance_01_structures_daccueil_et_fiabilite_des_informations/S1_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 2 : qui fait quoi, obligations, limites et prévention",
        "referenceRelative": "CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1/S1_seance_02_qui_fait_quoi_obligations_limites_et_prevention/S1_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 3 : projets d’établissement, de service et de vie",
        "referenceRelative": "CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1/S1_seance_03_projets_detablissement_de_service_et_de_vie/S1_seance_03_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 4 : protéger les majeurs sans décider à leur place",
        "referenceRelative": "CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1/S1_seance_04_proteger_les_majeurs_sans_decider_a_leur_place/S1_seance_04_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 5 : vieillissement, observer sans généraliser",
        "referenceRelative": "CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1/S1_seance_05_vieillissement_observer_sans_generaliser/S1_seance_05_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 6 : degré d’autonomie, AGGIR et environnement facilitant",
        "referenceRelative": "CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1/S1_seance_06_degre_dautonomie_aggir_et_environnement_facilitant/S1_seance_06_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 7 : accueillir un nouveau résident, évaluation et transfert",
        "referenceRelative": "CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1/S1_seance_07_accueillir_un_nouveau_resident_evaluation_et_transfert/S1_seance_07_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Bilan et évaluation de séquence",
        "referenceRelative": "CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1/S1_bilan_et_evaluation_sequence/S1_bilan_et_evaluation_sequence_complete.md"
      },
      {
        "typeSource": "RESSOURCE",
        "titreSource": "Audit de conformité — CAP AAGA Bloc 2 (16 août 2026)",
        "referenceRelative": "CAP/CAP AAGA - Bloc 2/_Ressources_enseignant/Audits_referentiel/AUDIT_CONFORMITE_REFERENTIEL_BLOC2_2026-08-16.md",
        "sectionOuPage": "P1 — CT3.3 est annoncé mais pratiquement non construit",
        "extraitOuNotionUtilisee": "Lacune CT3.3 comblée à partir du référentiel, voir la divergence signalée ci-dessus"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-09-10",
    "commentaire": "Séquence demandée explicitement par l’enseignante. Conformité vérifiée compétence par compétence dans l’arrêté du 6 février 2023, bloc n°2, module CT3. Les 39 activités sont classées CORE. Le fil rouge « EHPAD Les Glycines » est fictif et sert l’apprentissage. La couverture de CT3.3 va au-delà des cours existants, conformément à la hiérarchie d’autorité : à confirmer par l’enseignante."
  }
]
```

## Emplacement du contenu

`prisma/content/bloc2-taaga-ct3.ts`, inscrit au registre `prisma/content/index.ts` sur le
TeachingArea `Bloc 2` de la classe `T AAGA`. Voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
