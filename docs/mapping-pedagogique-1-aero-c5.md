# Mapping pédagogique — 1 AERO / PSE / Module C5

Traçabilité de la séquence 2 de PSE en 1 AERO, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

La séquence 1 de cette classe fait l'objet d'une fiche distincte :
[`mapping-pedagogique-1-aero.md`](mapping-pedagogique-1-aero.md).

Les deux classes de première suivent la même séquence C5, avec le même découpage en quatre
séances : seul le contexte professionnel change. La fiche de l'autre classe est
[`mapping-pedagogique-1-tci-c5.md`](mapping-pedagogique-1-tci-c5.md). Le contenu est
produit par un générateur commun, `prisma/content/pse-premiere-c5.ts`, paramétré par classe.

**Attention à ne pas confondre les deux modules C5 du catalogue.** Le module C5 de première
professionnelle, objet de cette fiche, est « L'analyse des risques professionnels ». Le
module C5 du programme de CAP, utilisé par la classe T AAGA, est « Les risques liés à
l'activité physique du métier ». Ce sont deux programmes distincts (§5).

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Aéronautique |
| Niveau | Première |
| Classe | `1 AERO` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de première professionnelle — « Annexe 1 : Prévention-santé-environnement — Classe de première professionnelle », © Ministère de l'Éducation nationale et de la Jeunesse, 19 p. |
| Chemin exact du référentiel | `BACPRO/1/1AERO PSE/spe005_annexe1_1239665.pdf` |
| Partie du référentiel utilisée | Thématique C, **Module C5 — L'analyse des risques professionnels** : les 7 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_2/S2_seance_01_decomposer_une_activite_de_travail/S2_seance_01_complete.md`, `…/S2_seance_02_construire_le_processus_d_apparition_d_un_dom/S2_seance_02_complete.md`, `…/S2_seance_03_evaluer_et_hierarchiser_un_risque/S2_seance_03_complete.md`, `…/S2_seance_04_choisir_des_mesures_de_prevention_et_de_prote/S2_seance_04_complete.md` |
| Sources citées par le cours | `BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_2/S2_SOURCES_PEDAGOGIQUES.md` — programme officiel, arrêté du 3 février 2020, et page INRS sur l'évaluation des risques professionnels |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` |
| État du mapping (§10) | `VALIDE` — validé par l'enseignante le 2026-09-19 |
| Conformité constatée | **OUI** pour le contenu, objectif par objectif |

## Correspondance objectifs du référentiel → séances du catalogue

Les sept objectifs ciblés du module C5 sont repris textuellement de l'annexe, colonne
« Objectifs ciblés ».

| Objectif ciblé (module C5) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Repérer les composantes d'une activité de travail dans un secteur professionnel à l'aide de l'outil d'analyse fourni | Activité de travail ; opérateur ; tâche ; matériel ; milieu | Décomposer une activité de travail |
| Identifier les éléments d'apparition d'un dommage dans une activité de travail | Danger ; situation dangereuse ; événement déclencheur ; dommage ; opérateur | Construire le processus d'apparition d'un dommage |
| Proposer une représentation mettant en lien les éléments du processus d'apparition d'un dommage pour un risque identifié | Processus ; risque professionnel | Construire le processus d'apparition d'un dommage |
| Évaluer le risque à l'aide d'un outil pour une situation donnée | Gravité du dommage ; probabilité d'occurrence ; niveau de priorité | Évaluer et hiérarchiser un risque |
| Proposer une mesure de prévention visant à supprimer ou à réduire le risque | Suppression du risque ; réduction du risque | Choisir des mesures de prévention et de protection |
| Proposer une mesure visant à protéger un ou des opérateurs face à un risque | Protection collective ; protection individuelle | Choisir des mesures de prévention et de protection |
| Proposer une mesure d'information ou de formation d'un opérateur en lien avec le risque identifié | Formation ; information | Choisir des mesures de prévention et de protection |

Le découpage en quatre séances est celui des cours de la classe. La deuxième séance porte
deux objectifs, la quatrième en porte trois, parce que le cours les traite ensemble.

Le fil rouge est celui des cours de la classe : l'atelier AMA, Théo comme
élève et M. Ferrand comme tuteur. Les situations cotées et les mesures proposées sont
celles du cours : le perçage-rivetage d'un panneau de fuselage, le contact avec un solvant et la chute sur un flexible.

## Contenu ajouté au-delà du cours, sur autorisation explicite

L'enseignante a autorisé le 2026-09-19 l'ajout d'exemples absents de ses cours, à la
condition de rester fidèle à la réalité du métier. Les quatre fichiers de cours de cette
séquence décrivent le déroulé des séances et donnent les repères corrigés, mais peu de
situations détaillées : les exercices en ligne demandent davantage de matière.

Ce qui a été ajouté, et sur quoi il s'appuie :

1. **L'écart entre tâche prescrite et activité réelle** — le référentiel distingue
   « Tâche » et « Activité de travail » comme deux notions clés séparées. Un défi fait
   constater que le travail réellement fait peut différer du travail prescrit, et que
   c'est souvent là que le risque apparaît.
2. **Le milieu organisationnel** — le cours pose que le milieu ne se réduit pas à la
   météo. Les exemples ajoutés, urgence de la commande, travail seul, encombrement du
   sol, rendent cette dimension concrète sur les postes réels de la filière.
3. **Dommage immédiat et dommage différé** — le référentiel demande explicitement de
   rechercher des dommages « potentiels, immédiats ou différés » et d'établir le lien
   avec l'accident du travail et la maladie professionnelle. Un tri porte sur cette
   distinction, que le cours mentionne sans l'exercer.
4. **L'endroit où casser la chaîne** — un défi fait choisir le maillon sur lequel agir en
   premier. Il prépare directement la quatrième séance et l'ordre des mesures.
5. **Le fonctionnement de la cotation** — gravité qui ne dépend pas de la fréquence,
   probabilité qui monte avec l'exposition, priorité qui combine les deux. Ces trois
   points sont la lecture normale d'une grille de cotation, et le cours les affirme dans
   ses repères corrigés sans les faire travailler.
6. **L'ordre complet des mesures** — suppression, réduction à la source, protection
   collective, protection individuelle, information et formation en accompagnement. Cet
   ordre est celui des principes généraux de prévention de l'article L. 4121-2 du Code du
   travail, auquel le référentiel renvoie explicitement dans sa colonne « Propositions
   d'activités ».
7. **La place de l'information et de la formation** — septième objectif du module, que le
   cours ne traite pas. Un défi établit qu'elles accompagnent les autres mesures sans
   jamais les remplacer, et que « faire attention » n'est pas une mesure de prévention.
8. **La justification attendue** — le cours demande de justifier « avec une notion du
   document ». Un défi précise ce qui est attendu à l'épreuve : dire sur quel élément du
   processus la mesure agit.

## Consignes et verbes d'action

Huit verbes de `VERBES_ACTION_CONSIGNES.md` sont employés, à l'infinitif, un seul par
consigne : **Repérer, Identifier, Décrire, Classer, Comparer, Déduire, Expliquer,
Justifier**, dont `Justifier` et `Expliquer`. Chaque séance en emploie au moins quatre
différents, et l'activité de décodage des consignes, placée en tête de séquence, porte
exactement sur ces huit verbes.

Le verbe « Proposer », employé par le référentiel dans l'intitulé de quatre de ses
objectifs, ne figure pas dans la liste des verbes de consigne : les consignes
correspondantes emploient `Identifier`, `Expliquer` ou `Justifier`.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Aéronautique",
    "niveau": "Première",
    "classe": "1 AERO",
    "enseignement": "PSE",
    "sequence": "C5. L’analyse des risques professionnels",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de première professionnelle (annexe 1)",
        "referenceRelative": "BACPRO/1/1AERO PSE/spe005_annexe1_1239665.pdf",
        "sectionOuPage": "Thématique C, module C5",
        "extraitOuNotionUtilisee": "Activité de travail, opérateur, tâche, matériel, milieu, danger, situation dangereuse, événement déclencheur, dommage, processus, risque professionnel, gravité, probabilité d’occurrence, niveau de priorité, suppression, réduction, protection collective, protection individuelle, formation, information"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 2 — Séance 1 : décomposer une activité de travail",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_2/S2_seance_01_decomposer_une_activite_de_travail/S2_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 2 — Séance 2 : construire le processus d’apparition d’un dommage",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_2/S2_seance_02_construire_le_processus_d_apparition_d_un_dom/S2_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 2 — Séance 3 : évaluer et hiérarchiser un risque",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_2/S2_seance_03_evaluer_et_hierarchiser_un_risque/S2_seance_03_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 2 — Séance 4 : choisir des mesures de prévention et de protection",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_2/S2_seance_04_choisir_des_mesures_de_prevention_et_de_prote/S2_seance_04_complete.md"
      },
      {
        "typeSource": "RESSOURCE",
        "titreSource": "Verbes d’action des consignes (référence commune)",
        "referenceRelative": "_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-09-19",
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Séquence rédigée le 2026-09-19 à partir du module C5 du programme de première professionnelle et des quatre séances du cours. Les 30 activités sont classées CORE. L’enseignante a autorisé l’ajout d’exemples absents de ses cours, à condition de respecter la réalité du métier. L’ordre des mesures suit les principes généraux de prévention de l’article L. 4121-2, auquel le référentiel renvoie. Le fil rouge « atelier AMA » est fictif et sert l’apprentissage."
  }
]
```

## Emplacement du contenu

`prisma/content/pse-1-aero-c5.ts`, qui paramètre le générateur commun
`prisma/content/pse-premiere-c5.ts`, inscrit au registre `prisma/content/index.ts`.
