# Format du mapping pédagogique (sources → catalogue)

Ce document définit uniquement le **format** de correspondance entre les documents de
`cours-source/` et la hiérarchie du catalogue pédagogique (Formation → Niveau → Classe →
TeachingArea → thème/module référentiel → notion/capacité). Voir la règle d'autorité complète et les états dans
[`pedagogie-agents.md`](pedagogie-agents.md) (§9-10).

**Un seul mapping réel a été produit à ce jour** — voir
[`mapping-pedagogique-t-aero.md`](mapping-pedagogique-t-aero.md) (T AERO / PSE / module C7).
En dehors de celui-ci, le format ne couvre
aucun des 4121 fichiers de `cours-source/` — voir « Ce qui n'est pas fait » en fin de
document.

## Principe

Le système peut *proposer* des correspondances à partir de l'arborescence, des noms de
fichiers, des titres de séquences/séances et du contenu indexé (`.cours-index/`). Une
correspondance proposée automatiquement n'est jamais une vérité pédagogique tant qu'elle
n'a pas été validée explicitement.

| État | Sens | Utilisable pour une activité CORE ? |
|---|---|---|
| `PROPOSE` | trouvée automatiquement, non validée | Non |
| `VALIDE` | validée explicitement par l'enseignante | Oui |
| `A_REVOIR` | incertaine ou signalée comme à corriger | Non |

## Format d'une entrée

Chemins toujours **relatifs** à la racine `cours-source/` — jamais `/mnt/c/...` ni
`C:\Users\...`. Ce format est destiné à devenir, plus tard et après validation séparée,
la donnée source d'une migration Prisma (traçabilité portable au niveau `Lesson`/
`Activity` — voir `base-documentaire.md`).

```ts
type MappingState = "PROPOSE" | "VALIDE" | "A_REVOIR";

type MappingSource = {
  typeSource: "REFERENTIEL" | "PROGRESSION" | "COURS" | "RESSOURCE";
  titreSource: string;
  referenceRelative: string; // chemin relatif dans cours-source/, jamais absolu
  sectionOuPage?: string;
  extraitOuNotionUtilisee?: string;
};

type PedagogyMappingEntry = {
  formation: string;
  niveau: string;
  classe: string;              // nom de la Classroom dans le catalogue applicatif
  enseignement: string;        // nom de la TeachingArea
  sequence?: string;           // thème/module, stocké temporairement dans LearningSequence
  seance?: string;             // notion/capacité, stockée temporairement dans Lesson
  sources: MappingSource[];
  conformiteReferentiel: "CONFIRME" | "A_VERIFIER";
  etat: MappingState;
  commentaire?: string;
  proposePar?: "auto" | "enseignante";
  dateValidation?: string;     // ISO 8601, uniquement si etat === "VALIDE"
};
```

## Exemple illustratif (fictif — ne correspond à aucune donnée validée)

```json
[
  {
    "formation": "Bac Pro Aéronautique",
    "niveau": "2de",
    "classe": "2 AERO",
    "enseignement": "PSE",
    "sequence": "Prévenir les risques",
    "seance": "Identifier les situations à risque",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme PSE Bac Pro officiel",
        "referenceRelative": "BACPRO/2/2AERO PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf",
        "sectionOuPage": "Module C1",
        "extraitOuNotionUtilisee": "Enjeux santé-sécurité au travail"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 - Séance 1",
        "referenceRelative": "BACPRO/2/2AERO PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_seance_01.docx"
      }
    ],
    "conformiteReferentiel": "A_VERIFIER",
    "etat": "PROPOSE",
    "proposePar": "auto"
  },
  {
    "formation": "CAP AAGA",
    "niveau": "Tle",
    "classe": "T AGAA",
    "enseignement": "Bloc 2",
    "sequence": "Séquence 4",
    "seance": "S4 séance 1 — Appareil locomoteur",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Référentiel du diplôme CAP AAGA",
        "referenceRelative": "CAP/le_nouveau_referentiel_cap_aaga_-_agent_accompagnant_au_grand_age.pdf",
        "sectionOuPage": "Bloc 2, compétences C2.1.1-6",
        "extraitOuNotionUtilisee": "Observer et adapter sans diagnostiquer"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 4 - Séance 1 (version prof)",
        "referenceRelative": "CAP/CAP AAGA - Bloc 2/Sequences/Sequence_4/S4_seance_01_appareil_locomoteur_observer_et_adapter_sans_diagnostiq/S4_seance_01_version_prof.docx"
      }
    ],
    "conformiteReferentiel": "A_VERIFIER",
    "etat": "PROPOSE",
    "proposePar": "auto"
  }
]
```

Ces deux entrées illustrent le format pour deux `TeachingArea` différents d'une même
famille de classe (`2 AERO` en PSE, `T AGAA` en Bloc 2) : le champ `enseignement`
distingue explicitement les deux, et leurs `sources[].referenceRelative` pointent vers
des dossiers `cours-source/` totalement séparés — jamais de confusion entre les
programmes/référentiels des différents enseignements d'une même classe, même quand ils
partagent la même `Classroom` applicative. Aucune des deux n'a été validée : leur état
`PROPOSE` interdit explicitement de les utiliser pour générer une activité CORE tant
qu'elles ne sont pas passées à `VALIDE`.

## Ce qui n'est pas fait à ce stade

- Aucun fichier de mapping réel n'existe dans le dépôt.
- Aucune génération automatique de propositions (`PROPOSE`) n'a été lancée sur
  `cours-source/`.
- Le mécanisme qui produirait ces propositions à partir de `.cours-index/` (arborescence,
  titres, contenu) est une étape ultérieure et distincte, à valider avant d'être
  construite.
