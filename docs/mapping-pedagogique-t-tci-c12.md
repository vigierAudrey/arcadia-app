# Mapping pédagogique — T TCI / PSE / Module C12

Traçabilité de la séquence C12 de PSE en T TCI, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§3, §7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-t-aero-c12.md`](mapping-pedagogique-t-aero-c12.md).
Le contenu est produit par un générateur commun, `prisma/content/pse-terminale-c12.ts`,
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
| Partie du référentiel utilisée | Thématique C, **Module C12 — L'égalité de traitement au travail** : les 3 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/06_Sequence_6_C12/S6_seance_01_reconnaitre_une_discrimination/S6_seance_01_complete.md`, `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/06_Sequence_6_C12/S6_seance_02_egalite_et_recours/S6_seance_02_complete.md` |
| Sources citées par le cours | `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/06_Sequence_6_C12/S6_SOURCES_PEDAGOGIQUES.md` |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` ; vérification automatique : ≥ 4 verbes par séance, ≥ 8 par séquence, dont « Justifier » et « Expliquer » |
| État du mapping (§10) | `VALIDE` — contenu directement repris des séances déjà rédigées et validées par l'enseignante pour cette classe (notions, exercices, corrections), lu et vérifié le 2026-10-14 |
| Conformité constatée | **OUI** |

## Correspondance objectifs du référentiel → séances du catalogue

Les objectifs ciblés du module C12 sont repris textuellement de l'annexe 2, colonne
« Objectifs ciblés ».

| Objectif ciblé (module C12) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Repérer les différentes catégories de discrimination au travail en identifiant les publics considérés | Discrimination ; Code du travail ; critère | Reconnaître une discrimination |
| Identifier les obligations en termes d'égalité professionnelle entre les femmes et les hommes | Égalité professionnelle ; législation ; obligation | Égalité et recours |
| Identifier les interlocuteurs à solliciter en cas de discrimination au travail | Comité social économique ; Défenseur des droits ; inspection du travail ; organisation syndicale | Égalité et recours |

Le fil rouge est celui des cours de la classe : l'atelier CDE.

## Paramétrage transversal

Le générateur `buildPseTerminaleC12Sequence` ne paramètre que le nom de l'atelier. Les
notions, le lexique, les QCM, les vrai/faux et les jeux de tri et d'association sont
génériques : ils ne dépendent d'aucun métier particulier et peuvent être réutilisés par
toute classe de terminale Bac Pro, par simple ajout d'un fichier de contexte
(`pse-t<classe>-c12.ts`) et d'une entrée dans `prisma/content/index.ts`.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro TCI",
    "niveau": "Terminale",
    "classe": "T TCI",
    "enseignement": "PSE",
    "sequence": "C12. L'égalité de traitement au travail",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe terminale professionnelle (annexe 2)",
        "referenceRelative": "BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf",
        "sectionOuPage": "Thématique C, module C12",
        "extraitOuNotionUtilisee": "Discrimination, Code du travail, critère, égalité professionnelle, législation, obligation, comité social économique, Défenseur des droits, inspection du travail, organisation syndicale"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 6 — Séance 1 : reconnaître une discrimination",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/06_Sequence_6_C12/S6_seance_01_reconnaitre_une_discrimination/S6_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 6 — Séance 2 : égalité et recours",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/06_Sequence_6_C12/S6_seance_02_egalite_et_recours/S6_seance_02_complete.md"
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
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Contenu repris des deux séances déjà rédigées et validées par l'enseignante pour T TCI, via le générateur transversal buildPseTerminaleC12Sequence (prisma/content/pse-terminale-c12.ts), paramétré ici par pse-ttci-c12.ts (atelier CDE). Les activités sont classées CORE, le seed ne produisant pas d'autre track."
  }
]
```

## Emplacement du contenu

Le contenu de cette séquence vit dans [`pse-terminale-c12.ts`](../prisma/content/pse-terminale-c12.ts)
(générateur transversal) et [`pse-ttci-c12.ts`](../prisma/content/pse-ttci-c12.ts)
(paramétrage T TCI), inscrit au registre
[`prisma/content/index.ts`](../prisma/content/index.ts) : il part sur le site en ligne
par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
