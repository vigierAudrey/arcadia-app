# Mapping pédagogique — 1 AERO / PSE / Module C3

Traçabilité des contenus 1 AERO ajoutés au catalogue applicatif, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

Deuxième mapping réel, après [`mapping-pedagogique-t-aero.md`](mapping-pedagogique-t-aero.md).

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro Aéronautique |
| Niveau | Première |
| Classe | `1 AERO` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de première professionnelle — « Annexe 1 : Prévention-santé-environnement — Classe de première professionnelle », © Ministère de l'Éducation nationale et de la Jeunesse, 19 p. |
| Chemin exact du référentiel | `BACPRO/1/1AERO PSE/spe005_annexe1_1239665.pdf` (exemplaire identique, même empreinte MD5 : `BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe1_1239665.pdf`) |
| Partie du référentiel utilisée | Thématique C, **Module C3 — Les acteurs de prévention** : les 2 objectifs ciblés et leurs notions clés associées |
| Progression consultée | `BACPRO/1/1AERO PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1AERO.pdf` — Séquence 1 (septembre, 2 h), module C3, compétences C1 · C3 · C6 |
| Cours consultés | `…/Sequences/Sequence_1/S1_seance_01_acteurs_internes/S1_seance_01_complete.md`, `…/S1_seance_02_organismes_externes/S1_seance_02_complete.md`, `…/S1_bilan_et_evaluation_sequence/S1_bilan_et_evaluation_sequence_complete.md`, ainsi que les deux activités interactives hors ligne `S1_seance_0{1,2}_activite_interactive.html` (cartes, appariements, vrai/faux et missions repris tels quels) |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md`, `_COMMUN_CONSIGNES_IA/RAPPEL_COURT_A_COLLER.md` |
| Conformité constatée | **OUI** — correspondance objectif par objectif, voir le tableau ci-dessous |

## Correspondance objectifs du référentiel → séances du catalogue

| Objectif ciblé (annexe 1, module C3) | Notions clés associées | Séance créée |
|---|---|---|
| Identifier les rôles des acteurs internes de prévention | comité social et économique, salarié compétent, sauveteur secouriste du travail, service de santé au travail | Identifier les rôles des acteurs internes de prévention |
| Identifier les missions des organismes de prévention externes à l'entreprise | inspection du travail, CARSAT (caisse d'assurance retraite et de la santé au travail) | Identifier les missions des organismes de prévention externes à l'entreprise |
| *(les deux objectifs, en réinvestissement)* | *(idem)* | Choisir l'interlocuteur adapté à une situation de prévention — bilan de séquence |

La troisième séance n'ajoute aucune notion : elle reprend le bilan de séquence existant
(`S1_bilan_et_evaluation_sequence_complete.md`) et fait réinvestir les deux objectifs du
module. Elle n'introduit donc pas d'attendu hors référentiel.

## Point de vigilance — date de l'arrêté

`SOURCE OFFICIELLE NON RETROUVÉE — VALIDATION NÉCESSAIRE` sur ce point précis, et sur ce
point seulement : le PDF de l'annexe 1 **ne cite aucune date d'arrêté** dans son texte
(vérifié par recherche plein texte ; métadonnées PDF : Word 2010, 04/02/2020). Deux dates
différentes circulent dans la base documentaire :

- `Progression_annuelle_PSE_1AERO.pdf` : « arrêté du 21 novembre 2018 – classe de première
  professionnelle » ;
- [`mapping-pedagogique-t-aero.md`](mapping-pedagogique-t-aero.md) : « arrêté du 3 avril 2019,
  annexe 2 » — la même date est par ailleurs rattachée, dans
  [`base-documentaire.md`](base-documentaire.md), au programme **PSE CAP**.

Aucun accès internet ne permet de trancher (Légifrance/BOEN). En conséquence, la
description de la séquence dans le catalogue **ne mentionne aucune date d'arrêté** : elle
nomme l'annexe telle qu'elle s'intitule. Le **contenu** du module C3 utilisé ici, lui, est
bien lu dans le PDF officiel — c'est uniquement la référence réglementaire datée qui reste
à confirmer. La mention datée du mapping T AERO mérite la même vérification.

## Point de vigilance repris du cours

Le fil rouge **AéroMaintenance Atlantique (AMA)** est explicitement fictif
(`Sequences/AVERTISSEMENT_ADAPTATION_LOCALE.md`) et sert uniquement à l'apprentissage : il
ne décrit aucune entreprise réelle et ne remplace aucune procédure locale. Les situations
des exercices restent donc au niveau des missions des acteurs, sans jamais énoncer une
procédure d'entreprise présentée comme réelle.

Deux formulations sont reprises telles quelles du cours, et ne doivent pas être
contredites par un contenu ultérieur :

- le sauveteur secouriste du travail intervient **dans la limite de sa formation** et ne
  remplace pas les secours spécialisés ;
- les organismes externes **ne remplacent pas** les acteurs internes : leurs rôles sont
  complémentaires, et le choix de l'interlocuteur dépend du problème.

Le cours emploie « service de prévention et de santé au travail (SPST) » là où le
référentiel écrit « service de santé au travail ». Les deux formulations sont données
ensemble dans la fiche « À retenir », comme le fait la séance 1 : ce n'est pas une
divergence de fond.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro Aéronautique",
    "niveau": "Première",
    "classe": "1 AERO",
    "enseignement": "PSE",
    "sequence": "C3. Les acteurs de prévention",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de première professionnelle (annexe 1)",
        "referenceRelative": "BACPRO/1/1AERO PSE/spe005_annexe1_1239665.pdf",
        "sectionOuPage": "Thématique C, module C3",
        "extraitOuNotionUtilisee": "comité social et économique, salarié compétent, sauveteur secouriste du travail, service de santé au travail, inspection du travail, CARSAT"
      },
      {
        "typeSource": "PROGRESSION",
        "titreSource": "Progression annuelle PSE 1 AERO 2026-2027",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Progression_annuelle_PSE_1AERO.pdf",
        "sectionOuPage": "Séquence 1 (septembre, 2 h)",
        "extraitOuNotionUtilisee": "Module C3 — compétences C1 · C3 · C6"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 1 : les acteurs internes",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_seance_01_acteurs_internes/S1_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Séance 2 : les organismes externes",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_seance_02_organismes_externes/S1_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 1 — Bilan et évaluation",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_bilan_et_evaluation_sequence/S1_bilan_et_evaluation_sequence_complete.md"
      },
      {
        "typeSource": "RESSOURCE",
        "titreSource": "Activité interactive hors ligne — séance 1 (cartes de tri, appariements, vrai/faux, mission)",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_seance_01_acteurs_internes/S1_seance_01_activite_interactive.html"
      },
      {
        "typeSource": "RESSOURCE",
        "titreSource": "Activité interactive hors ligne — séance 2 (cartes de tri, appariements, vrai/faux, mission)",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/Sequence_1/S1_seance_02_organismes_externes/S1_seance_02_activite_interactive.html"
      },
      {
        "typeSource": "RESSOURCE",
        "titreSource": "Avertissement d'adaptation locale (fil rouge AMA fictif)",
        "referenceRelative": "BACPRO/1/1AERO PSE/PSE - Progression et sequences/Sequences/AVERTISSEMENT_ADAPTATION_LOCALE.md"
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
    "commentaire": "Classe et séquence désignées explicitement par l'enseignante ; conformité vérifiée objectif par objectif dans l'annexe 1. Les 21 activités sont classées CORE, le seed ne produisant pas d'autre track. Réserve isolée sur la date de l'arrêté (voir « Point de vigilance — date de l'arrêté ») : elle ne porte pas sur le contenu du module C3. Si cette validation doit être ramenée à PROPOSE, les activités devront être repassées en BONUS ou dépubliées."
  }
]
```

## Règles de rédaction appliquées aux consignes

Consignes tirées des 14 verbes de `VERBES_ACTION_CONSIGNES.md`, un seul verbe par consigne,
aucun verbe de la liste interdite. Contrôle automatique passé (validation des 21 payloads
par `parseActivityPayload` + relevé des verbes de tête) :

- séance 1 : 7 verbes distincts (Identifier, Repérer, Déduire, Classer, Justifier, Expliquer, Définir) ;
- séance 2 : 6 verbes distincts (Repérer, Identifier, Indiquer, Classer, Expliquer, Justifier) ;
- séance 3 : 6 verbes distincts (Repérer, Classer, Déduire, Justifier, Définir, Identifier) ;
- séquence : 8 verbes distincts, dont **Justifier** et **Expliquer** — minimum atteint.

Les 8 verbes employés dans la séquence sont exactement les 8 verbes de l'activité
`matching` « Décodage des consignes : les verbes de l'épreuve », placée en première position
de la séquence : la règle « une activité par séquence porte sur les verbes eux-mêmes » est
satisfaite, et aucun verbe employé n'échappe à son décodage.

### Écart assumé

Les consignes ne peuvent pas afficher le verbe **en gras** : le champ `instructions` est
rendu en texte brut (`src/app/classe/student-activity.tsx`), et des marqueurs Markdown
s'afficheraient littéralement. Le verbe reste en tête de consigne, à l'infinitif.

## Contenu créé

`1 AERO` n'avait aucun TeachingArea. Le seed crée : PSE (`SUBJECT`), une séquence
`C3. Les acteurs de prévention` (`OPEN`), 3 séances et 21 activités publiées — 6 `qcm`, 5 `true_false`, 4 `matching`,
3 `content` et 3 `sorting`.
