# Mapping pédagogique — T TCI / PSE / Module C8

Traçabilité de la séquence 2 de PSE en T TCI, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§3, §7 et §10).

La séquence 1 de cette classe fait l'objet d'une fiche distincte :
[`mapping-pedagogique-t-tci.md`](mapping-pedagogique-t-tci.md).

Les deux classes de terminale suivent la même séquence C8, en deux séances : seul le
contexte professionnel change. La fiche de l'autre classe est
[`mapping-pedagogique-t-aero-c8.md`](mapping-pedagogique-t-aero-c8.md). Le contenu est
produit par un générateur commun, `prisma/content/pse-terminale-c8.ts`, paramétré par classe.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro TCI |
| Niveau | Terminale |
| Classe | `T TCI` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe terminale professionnelle — « Annexe 2 : Prévention-santé-environnement — Classe terminale professionnelle », © Ministère de l'Éducation nationale et de la Jeunesse |
| Chemin exact du référentiel | `BACPRO/T/TTCI PSE/spe005_annexe2_1239667 (1).pdf` |
| Partie du référentiel utilisée | Thématique C, **Module C8 — Déclaration et réparation des accidents du travail et des maladies professionnelles** : les 3 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/02_Sequence_2_C8/S2_seance_01_declarer_un_at_ou_une_mp/S2_seance_01_complete.md`, `…/S2_seance_02_responsabilites_et_reparation/S2_seance_02_complete.md` |
| Sources citées par le cours | le point de vigilance professeur des séances, qui renvoie à ameli.fr et service-public.fr |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` |
| État du mapping (§10) | `VALIDE` — validé par l'enseignante le 2026-09-19 |
| Conformité constatée | **OUI** pour le contenu, sous la réserve sur les délais chiffrés ci-dessous |

## Correspondance objectifs du référentiel → séances du catalogue

Les trois objectifs ciblés du module C8 sont repris textuellement de l'annexe 2, colonne
« Objectifs ciblés ».

| Objectif ciblé (module C8) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Identifier les différents acteurs impliqués, les étapes, les délais et les documents nécessaires dans une procédure de déclaration | Déclaration ; délai ; reconnaissance ; procédure | Déclarer un accident du travail ou une maladie professionnelle |
| Différencier responsabilité civile et responsabilité pénale de l'employeur | Conséquence juridique ; faute inexcusable ; responsabilité civile ; responsabilité pénale | Responsabilités et réparation |
| Repérer les modalités d'indemnisation des victimes | Prestation en nature ; prestation en espèces ; rente d'incapacité | Responsabilités et réparation |

Le découpage en deux séances est celui des cours de la classe. La deuxième séance porte
deux objectifs, parce que le cours traite ensemble les responsabilités et la réparation.

Le fil rouge est celui des cours de la classe : l'atelier CDE, avec Karim.

## Les délais chiffrés sont volontairement absents

C'est le point à connaître sur cette séquence.

Le premier objectif du module nomme les « délais » parmi ce que l'élève doit identifier.
Les deux cours de l'enseignante s'en tiennent pourtant à la formule : « Les délais exacts
se vérifient sur une source officielle à jour », et le point de vigilance destiné au
professeur précise : « Les taux, plafonds et délais évoluent : les vérifier sur ameli.fr ou
service-public.fr avant la séance. »

**Aucun délai chiffré n'a donc été écrit dans les exercices en ligne.** Écrire un nombre de
jours qui aurait changé serait pire que de ne rien écrire : l'élève le retiendrait, et le
réciterait faux à l'épreuve comme en PFMP. La règle §3 de `pedagogie-agents.md` interdit par
ailleurs d'attribuer au référentiel une valeur qui n'y figure pas, et l'annexe ne donne
aucun chiffre.

Les exercices portent donc sur ce qui est stable et vérifié par les cours : les acteurs,
leurs rôles respectifs, l'ordre des étapes, les documents échangés, et la distinction entre
déclarer et être reconnu. Un défi porte explicitement sur le réflexe attendu : vérifier le
délai sur un site officiel à jour plutôt que de se fier à sa mémoire.

`SOURCE OFFICIELLE NON RETROUVÉE — VALIDATION NÉCESSAIRE` pour les valeurs chiffrées. Si
l'enseignante souhaite que les délais figurent dans les exercices, il suffit qu'elle les
relève sur ameli.fr ou service-public.fr et les transmette : ils seront ajoutés avec leur
date de consultation.

## Contenu ajouté au-delà du cours, sur autorisation explicite

L'enseignante a autorisé le 2026-09-19 l'ajout d'exemples absents de ses cours, à la
condition de rester fidèle à la réalité du métier et du droit.

Ce qui a été ajouté, et sur quoi il s'appuie :

1. **Le rôle distinct de chaque acteur** — la version T TCI du cours donne l'enchaînement
   complet : la victime informe et fait constater, le médecin établit le certificat médical
   initial, l'employeur déclare et remet la feuille d'accident, l'organisme d'assurance
   maladie instruit et décide. Les exercices reprennent cet enchaînement, sans y ajouter
   d'acteur.
2. **L'utilité de la feuille d'accident** — être soigné sans avancer les frais. Le lien
   avec les prestations en nature de la seconde séance est fait explicitement.
3. **L'indépendance des deux responsabilités** — un même accident peut engager la
   responsabilité civile et la responsabilité pénale. Le référentiel demande de les
   différencier ; les cours définissent chacune sans dire qu'elles peuvent coexister.
4. **La mise en danger d'autrui** — le référentiel renvoie explicitement à l'article 223-1
   du Code pénal dans sa colonne « Propositions d'activités ». La fiche « À retenir » le
   mentionne comme exemple de ce que sanctionne le plan pénal, sans citer l'article aux
   élèves ni détailler les peines.
5. **L'effet de la faute inexcusable sur l'indemnisation** — sa reconnaissance majore
   l'indemnisation de la victime. Les cours la définissent sans dire à quoi elle sert.
6. **Un exemple de maladie professionnelle propre au métier** — l'exposition au bruit de
   l'atelier et la perte d'audition qui peut en résulter. Les cours traitent surtout
   l'accident ; l'exemple long était nécessaire pour faire travailler la distinction.
7. **Le fait qu'une sanction pénale n'indemnise pas la victime** — confusion fréquente,
   que la situation de départ du cours T TCI signale d'ailleurs comme le problème à
   résoudre : « l'équipe confond sanction, réparation et prise en charge des soins ».

Les trois termes exacts attendus par le référentiel, prestation en nature, prestation en
espèces et rente d'incapacité, sont travaillés séparément puis ensemble, comme le demande
le point de vigilance du cours.

## Consignes et verbes d'action

Huit verbes de `VERBES_ACTION_CONSIGNES.md` sont employés, à l'infinitif, un seul par
consigne : **Repérer, Identifier, Définir, Classer, Comparer, Déduire, Expliquer,
Justifier**, dont `Justifier` et `Expliquer`. Chaque séance en emploie au moins quatre
différents, et l'activité de décodage des consignes, placée en tête de séquence, porte
exactement sur ces huit verbes.

Le verbe « Différencier », employé par le référentiel dans l'intitulé de son deuxième
objectif, ne figure pas dans la liste des verbes de consigne : les consignes
correspondantes emploient `Comparer`, dont le sens attendu est justement de présenter les
points communs et les différences.

## Sigles définis pour les élèves

`AT` et `MP` sont développés à leur première apparition dans la fiche « À retenir » de la
première séance.

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro TCI",
    "niveau": "Terminale",
    "classe": "T TCI",
    "enseignement": "PSE",
    "sequence": "C8. Déclaration et réparation des accidents du travail et des maladies professionnelles",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe terminale professionnelle (annexe 2)",
        "referenceRelative": "BACPRO/T/TTCI PSE/spe005_annexe2_1239667 (1).pdf",
        "sectionOuPage": "Thématique C, module C8",
        "extraitOuNotionUtilisee": "Déclaration, délai, reconnaissance, procédure, conséquence juridique, faute inexcusable, responsabilité civile, responsabilité pénale, prestation en nature, prestation en espèces, rente d’incapacité"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 2 — Séance 1 : déclarer un AT ou une MP",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/02_Sequence_2_C8/S2_seance_01_declarer_un_at_ou_une_mp/S2_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 2 — Séance 2 : responsabilités et réparation",
        "referenceRelative": "BACPRO/T/TTCI PSE/TTCI_PSE_2026_2027/02_Sequence_2_C8/S2_seance_02_responsabilites_et_reparation/S2_seance_02_complete.md"
      },
      {
        "typeSource": "RESSOURCE",
        "titreSource": "Verbes d’action des consignes (référence commune)",
        "referenceRelative": "_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md"
      }
    ],
    "conformiteReferentiel": "A_VERIFIER",
    "etat": "VALIDE",
    "proposePar": "enseignante",
    "dateValidation": "2026-09-19",
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Séquence rédigée le 2026-09-19 à partir du module C8 du programme de terminale professionnelle et des deux séances du cours. Les 23 activités sont classées CORE. Conformité marquée A_VERIFIER sur un seul point : les délais chiffrés de la procédure de déclaration sont volontairement absents, les cours renvoyant à une source officielle à jour et le référentiel n’en donnant aucun. Ils seront ajoutés avec leur date de consultation si l’enseignante les relève sur ameli.fr ou service-public.fr. Le fil rouge « atelier CDE » est fictif et sert l’apprentissage."
  }
]
```

## Emplacement du contenu

`prisma/content/pse-t-tci-c8.ts`, qui paramètre le générateur commun
`prisma/content/pse-terminale-c8.ts`, inscrit au registre `prisma/content/index.ts`.
