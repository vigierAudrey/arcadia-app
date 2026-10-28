# Mapping pédagogique — T AERO / PSE / Module B5

Traçabilité de la séquence B5 de PSE en T AERO, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§3, §7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-t-tci-b5.md`](mapping-pedagogique-t-tci-b5.md).
Le contenu est produit par un générateur commun, `prisma/content/pse-terminale-b5.ts`,
paramétré par classe.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Aéronautique |
| Niveau | Terminale |
| Classe | `T AERO` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe terminale professionnelle — « Annexe 2 : Prévention-santé-environnement — Classe terminale professionnelle », © Ministère de l'Éducation nationale et de la Jeunesse |
| Chemin exact du référentiel | `BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf` |
| Partie du référentiel utilisée | Thématique B, **Module B5 — Les ressources en énergie et le développement durable** : les 5 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_8/S8_seance_01_les_sources_d_energie/S8_seance_01_complete.md`, `.../S8_seance_02_la_consommation_du_menage/S8_seance_02_complete.md`, `.../S8_seance_03_impacts_sur_l_environnement_et_la_sante/S8_seance_03_complete.md`, `.../S8_seance_04_agir_collectivement_et_individuellement/S8_seance_04_complete.md`, et les exercices interactifs HTML de ces quatre séances |
| Sources citées par le cours | `BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_8/S8_SOURCES_PEDAGOGIQUES.md` |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` ; vérification automatique : ≥ 4 verbes par séance, ≥ 8 par séquence, dont « Justifier » et « Expliquer » |
| État du mapping (§10) | `VALIDE` — contenu directement repris des séances déjà rédigées et validées par l'enseignante pour cette classe (notions, exercices, corrections), lu et vérifié le 2026-10-14 |
| Conformité constatée | **OUI** |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (module B5) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Caractériser les sources d'énergies renouvelables et non renouvelables en fonction de leurs avantages et leurs limites | Énergie renouvelable/non renouvelable ; énergie épuisable/non épuisable | Les sources d'énergie |
| Repérer les ressources en énergie au niveau mondial | Répartition inégale ; épuisement | Les sources d'énergie |
| Repérer les différents postes de consommation énergétique d'un ménage | Poste de consommation | La consommation du ménage |
| Identifier les impacts de la consommation d'énergie sur l'environnement et sur la santé de l'individu | Effet de serre ; réchauffement climatique ; empreinte carbone ; épuisement de ressources ; pollution ; atteinte à la santé | Impacts sur l'environnement et la santé |
| Repérer des mesures mises en place au niveau collectif ; proposer des mesures individuelles | Mesure collective ; réglementation ; geste écocitoyen | Agir collectivement et individuellement |

Le fil rouge est celui des cours de la classe : l'atelier AMA, avec Théo.

## Paramétrage transversal

Le générateur `buildPseTerminaleB5Sequence` ne paramètre que le nom de l'atelier et de
l'élève du fil rouge. Les notions, le lexique, les QCM, les vrai/faux et les jeux de tri
et d'association sont génériques et ne dépendent d'aucun métier particulier.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Aéronautique",
    "niveau": "Terminale",
    "classe": "T AERO",
    "enseignement": "PSE",
    "sequence": "B5. Les ressources en énergie et le développement durable",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe terminale professionnelle (annexe 2)",
        "referenceRelative": "BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf",
        "sectionOuPage": "Thématique B, module B5",
        "extraitOuNotionUtilisee": "Énergie renouvelable, énergie non renouvelable, énergie épuisable, répartition inégale, poste de consommation, effet de serre, réchauffement climatique, empreinte carbone, pollution, atteinte à la santé, mesure collective, geste écocitoyen"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 8 — Séance 1 : les sources d'énergie",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_8/S8_seance_01_les_sources_d_energie/S8_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 8 — Séance 2 : la consommation du ménage",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_8/S8_seance_02_la_consommation_du_menage/S8_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 8 — Séance 3 : impacts sur l'environnement et la santé",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_8/S8_seance_03_impacts_sur_l_environnement_et_la_sante/S8_seance_03_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 8 — Séance 4 : agir collectivement et individuellement",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_8/S8_seance_04_agir_collectivement_et_individuellement/S8_seance_04_complete.md"
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
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Contenu repris des quatre séances déjà rédigées et validées par l'enseignante pour T AERO, via le générateur transversal buildPseTerminaleB5Sequence (prisma/content/pse-terminale-b5.ts), paramétré ici par pse-taero-b5.ts (atelier AMA, élève Théo). Les activités sont classées CORE, le seed ne produisant pas d'autre track."
  }
]
```

## Emplacement du contenu

Le contenu de cette séquence vit dans [`pse-terminale-b5.ts`](../prisma/content/pse-terminale-b5.ts)
(générateur transversal) et [`pse-taero-b5.ts`](../prisma/content/pse-taero-b5.ts)
(paramétrage T AERO), inscrit au registre
[`prisma/content/index.ts`](../prisma/content/index.ts) : il part sur le site en ligne
par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
