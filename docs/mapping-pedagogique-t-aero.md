# Mapping pédagogique — T AERO / PSE / Module C7

Traçabilité des contenus T AERO ajoutés au catalogue applicatif, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

C'est le **premier mapping réel** produit à partir de ce format.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Aéronautique |
| Niveau | Terminale |
| Classe | `T AERO` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe terminale professionnelle — arrêté du 3 avril 2019, annexe 2 |
| Chemin exact du référentiel | `BACPRO/T/TAERO PSE/spe005_annexe2_1239667.pdf` (exemplaire identique : `BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf`) |
| Partie du référentiel utilisée | Thématique C, **Module C7 — Le suivi de la santé au travail** : les 4 objectifs ciblés et leurs notions clés associées |
| Progression consultée | `BACPRO/T/TAERO PSE/PSE - Progression et sequences/Progression_annuelle_PSE_TAERO.pdf` — Séquence 1 (07/09-25/09, 3 h), module C7, compétences C1 · C3 · C6 |
| Cours consultés | `…/Sequences/Sequence_1/S1_seance_01_le_suivi_medical_du_salarie/S1_seance_01_complete.md`, `…/S1_seance_02_les_defenses_de_l_organisme/S1_seance_02_complete.md`, `…/S1_seance_03_vaccination_et_memoire_immunitaire/S1_seance_03_complete.md`, `…/Sequence_1/S1_SOURCES_PEDAGOGIQUES.md` |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md`, `_COMMUN_CONSIGNES_IA/RAPPEL_COURT_A_COLLER.md` |
| Conformité constatée | **OUI** — correspondance objectif par objectif, voir le tableau ci-dessous |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (annexe 2, module C7) | Notions clés associées | Séance créée |
|---|---|---|
| Identifier les modalités de suivi individuel médical des salariés | VIP, EMA, suivi médical | Identifier les modalités de suivi individuel médical des salariés |
| Expliquer les moyens de défense de l'organisme face à l'infection microbienne | barrière cutanéo-muqueuse, immunité non spécifique, immunité spécifique | Expliquer les moyens de défense de l'organisme face à l'infection microbienne |
| Expliquer le principe de la vaccination | antigène, anticorps, mémoire immunitaire | Expliquer le principe de la vaccination et justifier les vaccinations préconisées |
| Justifier les vaccinations obligatoires et les vaccinations préconisées dans le secteur professionnel concerné | risque microbiologique, protection individuelle, protection collective | *(même séance)* |

## Point de vigilance repris du cours

Le cours `S1_seance_03_complete.md` tranche, sources à l'appui, un point que les contenus
générés ne doivent pas contredire :

- aucune obligation vaccinale sectorielle ne s'applique à la maintenance aéronautique ;
  ce qui s'applique est le calendrier vaccinal de tous (rappel dTP-coqueluche à 25, 45,
  65 ans, puis tous les dix ans) ;
- le tétanos ne se transmet pas d'une personne à une autre : l'argument de la protection
  collective ne lui est pas applicable et ne doit porter que sur une maladie transmissible ;
- l'employeur recommande d'autres vaccinations, à sa charge, sur proposition du médecin
  du travail, en cas d'exposition à des agents biologiques.

Ces trois points sont repris tels quels dans la fiche et les exercices de la séance 3.
**À revérifier chaque année** : le calendrier vaccinal évolue.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Aéronautique",
    "niveau": "Terminale",
    "classe": "T AERO",
    "enseignement": "PSE",
    "sequence": "C7. Le suivi de la santé au travail",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe terminale professionnelle (arrêté du 3 avril 2019, annexe 2)",
        "referenceRelative": "BACPRO/T/TAERO PSE/spe005_annexe2_1239667.pdf",
        "sectionOuPage": "Thématique C, module C7",
        "extraitOuNotionUtilisee": "VIP, EMA, suivi médical, barrière cutanéo-muqueuse, immunité non spécifique, immunité spécifique, antigène, anticorps, mémoire immunitaire, risque microbiologique, protection individuelle, protection collective"
      },
      {
        "typeSource": "PROGRESSION",
        "titreSource": "Progression annuelle PSE T AERO 2026-2027",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Progression_annuelle_PSE_TAERO.pdf",
        "sectionOuPage": "Séquence 1 (07/09-25/09, 3 h)",
        "extraitOuNotionUtilisee": "Module C7 — compétences C1 · C3 · C6"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 1 : le suivi médical du salarié",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_seance_01_le_suivi_medical_du_salarie/S1_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 2 : les défenses de l'organisme",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_seance_02_les_defenses_de_l_organisme/S1_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 3 : vaccination et mémoire immunitaire",
        "referenceRelative": "BACPRO/T/TAERO PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_seance_03_vaccination_et_memoire_immunitaire/S1_seance_03_complete.md"
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
    "dateValidation": "2026-09-07",
    "commentaire": "Dossier source et classe désignés explicitement par l'enseignante ; conformité vérifiée objectif par objectif dans l'annexe 2. Les 17 activités sont classées CORE, le seed ne produisant pas d'autre track. Si cette validation doit être ramenée à PROPOSE, les activités devront être repassées en BONUS ou dépubliées."
  }
]
```

## Règles de rédaction appliquées aux consignes

Consignes tirées des 14 verbes de `VERBES_ACTION_CONSIGNES.md`, un seul verbe par consigne,
aucun verbe de la liste interdite. Contrôle automatique passé :

- séance 1 : 5 verbes distincts (Identifier, Repérer, Classer, Déduire, Expliquer) ;
- séance 2 : 5 verbes distincts (Repérer, Classer, Définir, Expliquer, Justifier) ;
- séance 3 : 6 verbes distincts (Repérer, Expliquer, Classer, Justifier, Indiquer, Définir) ;
- séquence : 8 verbes distincts, dont **Justifier** et **Expliquer** — minimum atteint.

La règle « une activité par séquence porte sur les verbes eux-mêmes » est satisfaite par
l'activité `matching` « Décodage des consignes : les verbes de l'épreuve », placée en
première position de la séquence.

### Écart assumé

Les consignes ne peuvent pas afficher le verbe **en gras** : le champ `instructions` est
rendu en texte brut (`src/app/classe/student-activity.tsx`), et des marqueurs Markdown
s'afficheraient littéralement. Le verbe reste en tête de consigne, à l'infinitif.

## Emplacement du contenu

Le contenu de cette séquence vit dans [`prisma/content/pse-taero-c7.ts`](../prisma/content/pse-taero-c7.ts)
et est inscrit au registre de mise en ligne
([`prisma/content/index.ts`](../prisma/content/index.ts)) : il part sur le site en ligne
par ajout seul, sans jamais écraser l'existant — voir
[`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).
