# Mapping pédagogique — 2 CIEL / PSE / Module C2

Traçabilité de la séquence 2 de PSE en 2 CIEL, au format défini par
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) et selon la règle d'autorité de
[`pedagogie-agents.md`](pedagogie-agents.md) (§7 et §10).

La séquence 1 de cette classe fait l'objet d'une fiche distincte :
[`mapping-pedagogique-2-ciel.md`](mapping-pedagogique-2-ciel.md).

Les deux classes de seconde suivent la même séquence C2, avec le même découpage et les
mêmes objectifs : seul le contexte professionnel change. La fiche de l'autre classe est
[`mapping-pedagogique-2-aero-c2.md`](mapping-pedagogique-2-aero-c2.md). Le contenu est
produit par un générateur commun, `prisma/content/pse-seconde-c2.ts`, paramétré par classe.

## Fiche de traçabilité (§7)

| Champ | Valeur |
|---|---|
| Formation | Bac Pro CIEL |
| Niveau | Seconde |
| Classe | `2 CIEL` |
| Enseignement/bloc | PSE (TeachingArea `SUBJECT`) |
| Référentiel officiel identifié | Programme de PSE, classe de seconde professionnelle — « Annexe : Prévention-santé-environnement — Classe de seconde professionnelle », © Ministère de l'Éducation nationale et de la Jeunesse |
| Chemin exact du référentiel | `BACPRO/2/2CIEL PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf` |
| Partie du référentiel utilisée | Thématique C, **Module C2 — Les notions de base en prévention des risques professionnels** : les 4 objectifs ciblés et leurs notions clés |
| Cours consultés | `BACPRO/2/2CIEL PSE/Sequences/Sequence_2/S2_seance_01_decoder_les_consignes_de_securite_du_poste/S2_seance_01_complete.md`, `…/S2_seance_02_relier_danger_situation_dangereuse_et_dommage/S2_seance_02_complete.md`, `…/S2_seance_03_identifier_les_familles_de_risques/S2_seance_03_complete.md` |
| Consignes appliquées | `_COMMUN_CONSIGNES_IA/VERBES_ACTION_CONSIGNES.md` |
| État du mapping (§10) | `VALIDE` — validé par l'enseignante le 2026-09-19 |
| Conformité constatée | **OUI** pour le contenu, objectif par objectif |

## Correspondance objectifs du référentiel → séances du catalogue

Les quatre objectifs ciblés du module C2 sont repris textuellement de l'annexe, colonne
« Objectifs ciblés ».

| Objectif ciblé (module C2) | Notions clés associées (référentiel) | Séance du catalogue |
|---|---|---|
| Expliquer les consignes de sécurité au poste de travail lors de la mise en œuvre d'une activité professionnelle en plateau technique | Instruction / information | Expliquer les consignes de sécurité du poste |
| Repérer les dangers lors d'une activité de travail à partir de son analyse simple ou à l'aide d'outils méthodologiques | Activité de travail ; danger | Relier danger, situation dangereuse et dommage |
| Établir une relation entre le(s) danger(s) et le(s) dommage(s) potentiel(s) dans une situation dangereuse | Situation dangereuse ; dommage potentiel | Relier danger, situation dangereuse et dommage |
| Identifier un risque professionnel par l'analyse d'une activité de travail | Risques professionnels ; familles de risque | Identifier un risque professionnel et sa famille |

Le découpage en trois séances est celui des cours de la classe. La deuxième séance porte
deux objectifs du référentiel, parce que le cours traite la chaîne complète en une heure.

Le fil rouge est celui des cours de la classe : CIEL Réseaux & Systèmes (CRS), avec Mme Nadaud comme
tuteur. Les familles de risques travaillées sont celles que le cours nomme pour cette
classe : risque électrique (multiprise surchargée, coffret sous tension, gaine abîmée), risque chimique (fumées de flux de brasage, aérosols, contact avec l'étain) et risque lié à l'activité physique (travail prolongé devant écran, manutention d'une baie, tirage de câbles bras levés).

## Contenu ajouté au-delà du cours, sur autorisation explicite

L'enseignante a autorisé le 2026-09-19 l'ajout d'exemples absents de ses cours, à la
condition de rester fidèle à la réalité du métier. Les cours de cette séquence sont
volontairement brefs : ils décrivent le déroulé de la séance plutôt que le détail des
situations. Les exercices en ligne demandent davantage de matière.

Ce qui a été ajouté, et sur quoi il s'appuie :

1. **La distinction instruction / information** — notion clé du premier objectif, nommée
   telle quelle par le référentiel, mais que le cours ne développe pas. Traitée par un
   défi qui oppose une phrase impérative à deux phrases purement informatives.
2. **La forme et la couleur des panneaux de sécurité** — rond bleu d'obligation, rond
   rouge barré d'interdiction, triangle jaune d'avertissement, carré vert de secours,
   carré rouge d'incendie. Signalisation normalisée, identique dans tous les ateliers et
   sur tous les chantiers, donc directement réutilisable en PFMP.
3. **L'ordre collectif avant individuel** — la protection collective est cherchée en
   premier, l'EPI vient en complément. Principe général de prévention, cohérent avec ce
   que le cours dit déjà de la différence entre les deux.
4. **Les exemples de protections collectives** — aspiration à la source, carter fixe,
   balisage au sol. Équipements réels des plateaux techniques concernés.
5. **La description factuelle** — le cours pose la règle « Je décris les faits sans juger
   la personne » sans l'exercer. Un défi oppose une observation vérifiable à un jugement
   sur la personne et à une généralité.
6. **L'inventaire des familles de risques** — le référentiel renvoie explicitement à la
   classification des risques professionnels de l'INRS (brochure ED-840,
   « TutoPrev'-Pédagogie »). Les familles retenues sont celles que le cours nomme déjà
   pour la classe, et les situations qui les illustrent viennent des postes réels de la
   filière.
7. **Le cumul de risques sur une même activité** — le cours affirme qu'une activité peut
   exposer à plusieurs risques. Un défi le fait constater sur la mini-situation du cours,
   le câblage en espace étroit.

## Consignes et verbes d'action

Huit verbes de `VERBES_ACTION_CONSIGNES.md` sont employés, à l'infinitif, un seul par
consigne : **Repérer, Identifier, Décrire, Indiquer, Classer, Déduire, Expliquer,
Justifier**, dont `Justifier` et `Expliquer`. Chaque séance en emploie au moins quatre
différents, et l'activité de décodage des consignes, placée en tête de séquence, porte
exactement sur ces huit verbes.

Cette séquence n'emploie pas « Différencier » ni « Rédiger », qui figurent dans la
séquence C1 déjà en ligne de cette classe alors qu'ils ne sont pas dans la liste
officielle. L'enseignante a décidé le 2026-09-19 de ne pas corriger la séquence C1 :
l'écart est donc connu et assumé, il n'est pas reproduit ici.

## Sigles définis pour les élèves

`EPI` et `INRS` sont développés à leur première apparition dans une fiche « À retenir ».

## Entrée au format `PedagogyMappingEntry`

```json
[
  {
    "formation": "Bac Pro CIEL",
    "niveau": "Seconde",
    "classe": "2 CIEL",
    "enseignement": "PSE",
    "sequence": "C2. Les notions de base en prévention des risques professionnels",
    "sources": [
      {
        "typeSource": "REFERENTIEL",
        "titreSource": "Programme de PSE, classe de seconde professionnelle (annexe)",
        "referenceRelative": "BACPRO/2/2CIEL PSE/REFERENTIELS_OFFICIELS/Programme_PSE_Bac_Pro_officiel.pdf",
        "sectionOuPage": "Thématique C, module C2",
        "extraitOuNotionUtilisee": "Instruction / information, activité de travail, danger, situation dangereuse, dommage potentiel, risques professionnels, familles de risque"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 2 — Séance 1 : décoder les consignes de sécurité du poste",
        "referenceRelative": "BACPRO/2/2CIEL PSE/Sequences/Sequence_2/S2_seance_01_decoder_les_consignes_de_securite_du_poste/S2_seance_01_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 2 — Séance 2 : relier danger, situation dangereuse et dommage",
        "referenceRelative": "BACPRO/2/2CIEL PSE/Sequences/Sequence_2/S2_seance_02_relier_danger_situation_dangereuse_et_dommage/S2_seance_02_complete.md"
      },
      {
        "typeSource": "COURS",
        "titreSource": "Séquence 2 — Séance 3 : identifier les familles de risques",
        "referenceRelative": "BACPRO/2/2CIEL PSE/Sequences/Sequence_2/S2_seance_03_identifier_les_familles_de_risques/S2_seance_03_complete.md"
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
    "commentaire": "Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à travers les exercices réalisés. Séquence rédigée le 2026-09-19 à partir du module C2 du programme de seconde professionnelle et des trois séances du cours. Les 26 activités sont classées CORE. L’enseignante a autorisé l’ajout d’exemples absents de ses cours, à condition de respecter la réalité du métier. Le fil rouge « CIEL Réseaux & Systèmes (CRS) » est fictif et sert l’apprentissage."
  }
]
```

## Emplacement du contenu

`prisma/content/pse-2-ciel-c2.ts`, qui paramètre le générateur commun
`prisma/content/pse-seconde-c2.ts`, inscrit au registre `prisma/content/index.ts`.
