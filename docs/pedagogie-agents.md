# RÈGLE IMPÉRATIVE — RÉFÉRENTIELS OFFICIELS

Cette règle est prioritaire pour toute analyse ou génération de contenu pédagogique
(cours, séquence, situation professionnelle, QCM, vrai/faux, cartes mémoire, exercice
interactif, mini-jeu pédagogique, correction, activité d'évaluation) : PSE, CAP, Bac Pro,
Maths appliquées, Bloc 2 AGAA, ou tout autre enseignement présent dans la base
documentaire.

## 1. Rechercher soi-même le référentiel dans les dossiers

Les référentiels officiels sont stockés dans la base documentaire, via le lien local
`cours-source/` → `/mnt/c/Users/audre/Documents/cours` (voir
[`base-documentaire.md`](base-documentaire.md) pour l'inventaire connu — cette
documentation aide à localiser les fichiers mais ne remplace jamais la consultation
directe des sources).

**Ne jamais supposer quel référentiel s'applique à partir des seules connaissances
générales.**

Pour chaque niveau, diplôme, spécialité, matière ou bloc concerné :

1. parcourir les dossiers concernés ;
2. rechercher le ou les dossiers contenant les référentiels, notamment `REFERENTIELS_OFFICIELS/` ou équivalents ;
3. identifier le fichier officiel correspondant au diplôme/niveau/spécialité ;
4. consulter réellement ce fichier (extraction texte via `pdftotext`/`unzip`, cf. base-documentaire.md) ;
5. identifier la partie du référentiel concernant la tâche demandée ;
6. seulement ensuite consulter les progressions, cours et activités existantes.

Le fait qu'un fichier soit appelé « cours », « progression », « cours IA » ou similaire
ne signifie **pas** qu'il constitue une source officielle.

## 2. Le référentiel officiel est l'autorité

Les référentiels doivent être respectés scrupuleusement. Ils priment sur : les cours
existants, les progressions existantes, les anciens documents, les manuels scolaires,
les contenus précédemment générés par une IA, et les connaissances générales de Claude.

Si un cours existant semble contredire le référentiel officiel, ne pas le reproduire
automatiquement. Signaler :

`⚠️ DIVERGENCE AVEC LE RÉFÉRENTIEL`

et expliquer précisément la divergence trouvée. Ne jamais modifier les fichiers sources
sous `cours-source/` sans autorisation explicite (rappel : lecture seule, voir
base-documentaire.md).

## 3. Interdiction d'inventer le contenu d'un référentiel

Ne jamais inventer ou compléter de mémoire : une compétence, une capacité, un savoir
associé, un objectif, un module, une limite de connaissances, un attendu, une
compétence professionnelle, une correspondance entre enseignements, une exigence
d'évaluation, ou toute formulation supposément issue d'un référentiel.

Affirmer qu'un élément vient du référentiel implique de l'avoir effectivement retrouvé
dans le document présent dans la base documentaire. À défaut :

`SOURCE OFFICIELLE NON RETROUVÉE — VALIDATION NÉCESSAIRE`

Ne jamais combler le manque par une supposition.

## 4. Hiérarchie obligatoire

1. Référentiel officiel correspondant
2. Autres textes/documents institutionnels officiels
3. Progression pédagogique existante
4. Cours existants de l'enseignante
5. Ressources pédagogiques complémentaires / manuels
6. Génération nouvelle

La génération IA intervient en dernier, après consultation des sources.

**Nuance importante entre autorité réglementaire et contenu réellement enseigné :**
le référentiel officiel définit ce qui est réglementairement attendu pour le
diplôme — il ne dit jamais ce qui est concrètement travaillé à une séance donnée.
Cela relève uniquement de la progression et des cours de l'enseignante (niveaux 3
et 4 ci-dessus). Une notion peut être conforme au référentiel sans avoir été
prévue à cette séance précise ; dans ce cas elle n'appartient pas au contenu
obligatoire (CORE, voir §8) de cette séance, même si le référentiel la mentionne
ailleurs dans le programme.

## 5. Cas des différents enseignements

Ne pas considérer la base documentaire comme un seul corpus. Déterminer précisément le
contexte avant de rechercher les sources : PSE Bac Pro, PSE CAP, Bac Pro Aéronautique,
Bac Pro TCI, Bac Pro CIEL, CAP AAGA, CAP AAGA Bloc 2, Maths appliquées/co-intervention,
etc.

**Un référentiel trouvé pour une formation ne doit jamais être appliqué automatiquement
à une autre formation** — y compris entre CAP et Bac Pro pour une même discipline comme
PSE : leurs programmes officiels sont distincts, même quand leur architecture se
ressemble (voir le constat du test du 2026-08-16 dans base-documentaire.md).

**Une même Classroom peut porter plusieurs TeachingArea indépendants.** Exemple réel :
la classe T AGAA porte à la fois PSE, Maths appliquées et Bloc 2 — trois TeachingArea
distincts, chacun avec sa propre progression, ses propres séquences/séances, son propre
référentiel et ses propres règles de conformité. Le système ne doit jamais supposer
qu'un TeachingArea donné d'une Classroom est « le » TeachingArea PSE, ni traiter les
noms `PSE`, `Maths appliquées` ou `Bloc 2` comme des constantes en dur dans la logique
métier : ce sont des données administrables, créées et nommées librement depuis
l'administration. Une source ou un référentiel associé à un TeachingArea ne doit jamais
être réutilisé pour un autre TeachingArea de la même Classroom sans validation explicite.

## 6. Traçabilité obligatoire

Pour chaque activité pédagogique générée, indiquer au minimum :

- **Formation :**
- **Niveau :**
- **Enseignement/bloc :**
- **Référentiel officiel identifié :**
- **Chemin exact du référentiel :**
- **Partie du référentiel utilisée :**
- **Cours/progression consulté :**
- **Chemin du cours :**
- **Conformité constatée :** OUI / NON / À VÉRIFIER

Ces informations n'ont pas besoin d'être affichées aux élèves : elles peuvent servir de
métadonnées internes à la plateforme.

Le format portable de ces métadonnées (sans jamais de chemin absolu Windows/WSL) est
défini dans [`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) : `typeSource`,
`titreSource`, `referenceRelative`, `sectionOuPage`, `extraitOuNotionUtilisee`,
`conformite`, `commentaire`.

**Avant toute génération ou association de source, le système doit résoudre le contexte
pédagogique complet de la cible et identifier son TeachingArea réel. Aucune source ne
doit être rattachée sur la seule base d'un nom de fichier ou d'une supposition.**
Techniquement, `createPedagogicalSourceReference` (voir `server/pedagogie/mutations.ts`)
résout toujours ce contexte via `getTeachingContextForLesson`/
`getTeachingContextForActivity` (`server/pedagogie/context.ts`) avant d'écrire — le
contexte réel fait autorité ; une valeur fournie par l'appelant (`expectedTeachingAreaId`)
ne sert que de garde supplémentaire, jamais de source de vérité. Toute future génération
pédagogique doit utiliser ces mêmes helpers pour connaître le contexte complet avant de
rechercher ou associer des sources.

## 7. Incertitude

Si une information importante n'est pas présente dans la base documentaire, ou si deux
documents se contredisent : **ne pas inventer**. Signaler la contradiction ou demander
une validation avant de poursuivre.

## 8. CORE / BONUS

Toute activité pédagogique porte une classification explicite, jamais déduite
automatiquement d'une difficulté ou d'un type de contenu :

- **CORE** (valeur par défaut) : correspond à la progression réelle de l'enseignante et
  au contenu réellement travaillé à cette séance ; vérifié par rapport au référentiel ;
  n'introduit jamais une notion obligatoire inventée ou non prévue par l'enseignante.
- **BONUS** : facultatif, clairement identifié « Pour aller plus loin » côté élève ; peut
  approfondir une notion, proposer davantage d'entraînement, faire des liens utiles, ou
  augmenter légèrement la difficulté ; ne modifie et ne complète jamais les attendus
  obligatoires de la séance.

Un BONUS ne devient jamais automatiquement un attendu obligatoire.

## 9. États de validation d'une correspondance documentaire (mapping)

Une correspondance entre un document de `cours-source/` et un élément du catalogue
(séquence, séance) porte l'un de ces trois états — voir le format complet dans
[`pedagogie-mapping-format.md`](pedagogie-mapping-format.md) :

- `PROPOSE` : trouvée automatiquement (arborescence, noms de fichiers, titres, contenu
  indexé) — **non validée**.
- `VALIDE` : validée explicitement par l'enseignante.
- `A_REVOIR` : incertaine ou signalée comme à corriger.

**Règle impérative : une activité CORE ne peut jamais être générée à partir d'une
correspondance encore à l'état `PROPOSE`.** Seul l'état `VALIDE` autorise une
génération CORE. Une correspondance `PROPOSE` peut, au mieux, nourrir une proposition de
BONUS explicitement présentée comme telle — jamais un contenu obligatoire.

---

Cette procédure est la règle de fonctionnement permanente pour toutes les générations
pédagogiques du projet PSE Interactif. Elle a été vérifiée en conditions réelles le
2026-08-16 sur trois cas (Bac Pro, CAP, AAGA Bloc 2/Maths) — voir le compte rendu
correspondant pour le détail des chemins et constats.
