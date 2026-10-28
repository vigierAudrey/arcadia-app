# Mapping pédagogique — T TCI / PSE / Module A9

Traçabilité de la séquence A9 de PSE en T TCI, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§3, §7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-t-aero-a9.md`](mapping-pedagogique-t-aero-a9.md).
Le contenu est produit par un générateur commun, `prisma/content/pse-terminale-a9.ts`,
paramétré par classe.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro TCI |
| Niveau | Terminale |
| Classe | `T TCI` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe terminale professionnelle — « Annexe 2 : Prévention-santé-environnement — Classe terminale professionnelle », © Ministère de l'Éducation nationale et de la Jeunesse |
| Chemin exact du référentiel | `BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf` |
| Partie du référentiel utilisée | Thématique A, **Module A9 — La sécurité alimentaire** : les 4 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/07_Sequence_7_A9/S7_seance_01_la_qualite_sanitaire/S7_seance_01_complete.md`, `.../S7_seance_02_conserver_et_lire_l_etiquette/S7_seance_02_complete.md`, `.../S7_seance_03_le_dispositif_de_securite_alimentaire/S7_seance_03_complete.md`, et les exercices interactifs HTML de ces trois séances |
| Sources citées par le cours | `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/07_Sequence_7_A9/S7_SOURCES_PEDAGOGIQUES.md` (dossier) |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` ; vérification automatique : ≥ 4 verbes par séance, ≥ 8 par séquence, dont « Justifier » et « Expliquer » |
| État du mapping (§10) | `VALIDE` — contenu directement repris des séances déjà rédigées et validées par l'enseignante pour cette classe (notions, exercices, corrections), lu et vérifié le 2026-10-14 |
| Conformité constatée | **OUI** |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (module A9) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Expliquer les deux principaux critères de la qualité sanitaire des aliments | Qualité microbiologique ; qualité chimique ; agent contaminant | La qualité sanitaire des aliments |
| Expliquer les précautions qui permettent de maintenir la qualité microbiologique des aliments jusqu'à leur consommation | Flore de décomposition ; matière organique ; chaîne du froid ; conservation ; date limite de consommation ; lavage des mains | Conserver et lire une étiquette |
| Expliquer l'intérêt de la mention des substances allergènes sur les étiquettes d'aliments | Allergène ; additif | Conserver et lire une étiquette |
| Présenter le dispositif garantissant la sécurité alimentaire du consommateur en France | Réglementation ; principe de précaution | Le dispositif de sécurité alimentaire |

Le fil rouge est celui des cours de la classe : l'atelier CDE, avec Élodie et Karim.

## Paramétrage transversal

Le générateur `buildPseTerminaleA9Sequence` ne paramètre que le nom de l'atelier et de
l'élève du fil rouge. Les notions, le lexique, les QCM, les vrai/faux et les jeux de tri
et d'association sont génériques et ne dépendent d'aucun métier particulier.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro TCI",
    "niveau": "Terminale",
    "classe": "T TCI",
    "enseignement": "PSE",
    "sequence": "A9. La sécurité alimentaire",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe terminale professionnelle (annexe 2)",
        "referenceRelative": "BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf",
        "sectionOuPage": "Thématique A, module A9",
        "extraitOuNotionUtilisee": "Qualité microbiologique, qualité chimique, agent contaminant, flore de décomposition, matière organique, chaîne du froid, conservation, date limite de consommation, lavage des mains, allergène, additif, réglementation, principe de précaution"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 7 — Séance 1 : la qualité sanitaire",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/07_Sequence_7_A9/S7_seance_01_la_qualite_sanitaire/S7_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 7 — Séance 2 : conserver et lire l'étiquette",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/07_Sequence_7_A9/S7_seance_02_conserver_et_lire_l_etiquette/S7_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 7 — Séance 3 : le dispositif de sécurité alimentaire",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/07_Sequence_7_A9/S7_seance_03_le_dispositif_de_securite_alimentaire/S7_seance_03_complete.md"
      },
      {
        "typeSource": "RESSOURCE",
        "titreSource": "Verbes d'action des consignes (référence commune)",
        "referenceRelative": "_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md"
      }
    ],
    "conformiteReferentiel": "CONFIRME",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-10-14",
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Contenu repris des trois séances déjà rédigées et validées par l'enseignante pour T TCI, via le générateur transversal buildPseTerminaleA9Sequence (prisma/content/pse-terminale-a9.ts), paramétré ici par pse-ttci-a9.ts (atelier CDE, Élodie et Karim). Les activités sont classées CORE, le seed ne produisant pas d'autre track."
  }
]
```

## Emplacement du contenu

Le contenu de cette séquence vit dans [`pse-terminale-a9.ts`](../prisma/content/pse-terminale-a9.ts)
(générateur transversal) et [`pse-ttci-a9.ts`](../prisma/content/pse-ttci-a9.ts)
(paramétrage T TCI), inscrit au registre
[`prisma/content/index.ts`](../prisma/content/index.ts) : il part sur le site en ligne
par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
