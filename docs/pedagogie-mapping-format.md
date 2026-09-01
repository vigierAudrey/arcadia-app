# Format du mapping pédagogique (cours → catalogue)

Ce document définit uniquement le **format** de correspondance entre les documents de
`cours-source/` et la hiérarchie du catalogue pédagogique (Formation → Niveau → Classe →
Enseignement → Séquence → Séance). Voir la règle d'autorité complète et les états dans
[`pedagogie-agents.md`](pedagogie-agents.md) (§8-9).

**Aucun mapping réel n'a été généré à partir de ce format.** Il ne couvre, à ce stade,
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
  sequence?: string;           // titre de la LearningSequence, si connu à ce niveau
  seance?: string;             // titre du Lesson, si connu à ce niveau
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
  }
]
```

Cette entrée illustre le format uniquement : elle n'a pas été validée, son état
`PROPOSE` interdit explicitement de l'utiliser pour générer une activité CORE tant
qu'elle n'est pas passée à `VALIDE`.

## Ce qui n'est pas fait à ce stade

- Aucun fichier de mapping réel n'existe dans le dépôt.
- Aucune génération automatique de propositions (`PROPOSE`) n'a été lancée sur
  `cours-source/`.
- Le mécanisme qui produirait ces propositions à partir de `.cours-index/` (arborescence,
  titres, contenu) est une étape ultérieure et distincte, à valider avant d'être
  construite.
