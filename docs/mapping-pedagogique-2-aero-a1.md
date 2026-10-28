# Mapping pédagogique — 2 AERO / PSE / Module A1

Traçabilité de la séquence A1 de PSE en 2 AERO, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§3, §7 et §10).

La fiche de l'autre classe est [`mapping-pedagogique-2-ciel-a1.md`](mapping-pedagogique-2-ciel-a1.md).
Le contenu est produit par un générateur commun, `prisma/content/pse-seconde-a1.ts`,
paramétré par classe, sur le même principe que `pse-seconde-c1.ts` et `pse-seconde-c2.ts`.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Aéronautique |
| Niveau | Seconde |
| Classe | `2 AERO` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de seconde professionnelle — « Annexe : Prévention-santé-environnement — Classe de seconde professionnelle » |
| Chemin exact du référentiel | `BACPRO/2/2AERO PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf` |
| Partie du référentiel utilisée | Thématique A, **Module A1 — Le système de santé** : les 4 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/2/2AERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_01_mon_capital_sante_et_ses_facteurs/S3_seance_01_complete.md`, `.../S3_seance_02_enjeux_plan_sante/S3_seance_02_master.md`, `.../S3_seance_03_solidarite_secu/S3_seance_03_master.md`, `.../S3_seance_04_parcours_soins_coordonnes/S3_seance_04_master.md` |
| Sources citées par le cours | `BACPRO/2/2AERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_SOURCES_PEDAGOGIQUES.md` |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` ; vérification automatique : 29 activités, 11 verbes distincts, ≥ 5 par séance, dont « Justifier » et « Expliquer » |
| État du mapping (§10) | `VALIDE` — contenu directement repris des quatre séances déjà rédigées pour cette classe (notions, mini-situations, corrections), réécrit le 2026-10-28 |
| Conformité constatée | **OUI** |

## Point de vigilance repris de la documentation source

Le fichier `S3_bilan_et_evaluation_sequence_complete.md` de la classe décrit encore
l'ancienne version de la séquence à 3 séances (une séance « Solidarité et parcours de
soins » fusionnée). Les cours ont depuis été réécrits en 4 séances distinctes
(capital santé, plan santé, solidarité, parcours de soins coordonnés) sans que ce
fichier de bilan soit mis à jour. Le barème qu'il donne (3+3+4+3+4+3 = 20 points) reste
cohérent avec la banque d'évaluation réelle à 8 questions et a été repris tel quel ; seul
le découpage en séances du texte de présentation est périmé, ce qui ne change rien au
contenu des exercices.

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (module A1) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Repérer les effets des facteurs internes et externes sur la santé d'un individu | Individu, Santé, Capital santé, Facteurs internes, Facteurs externes | Mon capital santé et ses facteurs |
| Identifier les enjeux dans un plan santé | Plan santé, Prévention collective | Identifier les enjeux d'un plan santé |
| Expliquer le principe de solidarité nationale de la sécurité sociale | Solidarité, Assurance maladie | Expliquer le principe de solidarité de la sécurité sociale |
| Présenter le principe et l'intérêt du parcours de soins coordonnés | Parcours de soins coordonnés | Le parcours de soins coordonnés |

Le fil rouge est celui déjà publié pour C1/C2 de cette classe : l'atelier AéroMaintenance
Atlantique (AMA), avec M. Ferrand (mentor), Théo (élève) et Sarah (pair).

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Aéronautique",
    "niveau": "Seconde",
    "classe": "2 AERO",
    "enseignement": "PSE",
    "sequence": "A1. Mon capital santé et le système de santé qui me protège",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de seconde professionnelle",
        "referenceRelative": "BACPRO/2/2AERO PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf",
        "sectionOuPage": "Thématique A, module A1",
        "extraitOuNotionUtilisee": "Individu, santé, capital santé, facteurs internes, facteurs externes, plan santé, prévention collective, prévention individuelle, solidarité, assurance maladie, cotisation, reste à charge, médecin traitant, parcours de soins coordonnés, carte Vitale, dossier médical partagé"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 1 : mon capital santé et ses facteurs",
        "referenceRelative": "BACPRO/2/2AERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_01_mon_capital_sante_et_ses_facteurs/S3_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 2 : identifier les enjeux d'un plan santé",
        "referenceRelative": "BACPRO/2/2AERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_02_enjeux_plan_sante/S3_seance_02_master.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 3 : expliquer le principe de solidarité de la sécurité sociale",
        "referenceRelative": "BACPRO/2/2AERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_03_solidarite_secu/S3_seance_03_master.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 3 — Séance 4 : le parcours de soins coordonnés",
        "referenceRelative": "BACPRO/2/2AERO PSE/PSE - Progression et sequences/Sequences/Sequence_3/S3_seance_04_parcours_soins_coordonnes/S3_seance_04_master.md"
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
    "dateValidation": "2026-10-28",
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Contenu repris des quatre séances déjà rédigées et validées par l'enseignante pour cette classe, via le générateur commun buildPseSecondeA1Sequence (prisma/content/pse-seconde-a1.ts), paramétré ici par pse-2aero-a1.ts (atelier AMA, M. Ferrand, Théo, Sarah). Les montants chiffrés (remboursement à 80 %, 19 €/8,40 € de consultation) sont repris tels quels de la banque d'évaluation réelle de la séquence et doivent être revérifiés chaque année sur ameli.fr avant diffusion. Les activités sont classées CORE, le seed ne produisant pas d'autre track."
  }
]
```

## Emplacement du contenu

Le contenu de cette séquence vit dans [`pse-seconde-a1.ts`](../prisma/content/pse-seconde-a1.ts)
(générateur commun) et [`pse-2aero-a1.ts`](../prisma/content/pse-2aero-a1.ts) (paramétrage
2 AERO), inscrit au registre [`prisma/content/index.ts`](../prisma/content/index.ts) : il
part sur le site en ligne par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
