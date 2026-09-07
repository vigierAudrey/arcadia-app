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

## 4. Hiérarchie obligatoire et doctrine de catalogue

1. Référentiel officiel correspondant
2. Autres textes/documents institutionnels officiels
3. Progression pédagogique existante
4. Cours existants de l'enseignante
5. Ressources pédagogiques complémentaires / manuels
6. Génération nouvelle

La génération IA intervient en dernier, après consultation des sources.

**Doctrine de structuration du catalogue :** le référentiel officiel structure en
priorité le catalogue par thématiques, modules, capacités, compétences, notions ou
autres entrées qu'il définit. La progression annuelle personnelle devient une source
secondaire : elle peut changer et ne représente pas nécessairement l'organisation d'un
autre enseignant.

La hiérarchie technique actuelle est conservée temporairement :

`Program → Level → Classroom → TeachingArea → LearningSequence → Lesson → Activity`

Sa signification pédagogique cible évolue :

- `LearningSequence` représente un thème, un module ou un regroupement référentiel ;
- `Lesson` représente une notion, une capacité, une compétence, un savoir-faire ou une
  autre entrée pédagogique ;
- `Activity` représente une activité rattachée à cette entrée ;
- `position` représente uniquement un ordre d'affichage local, jamais un ordre obligatoire
  d'apprentissage, un prérequis ou une progression réglementaire.

Les noms techniques `LearningSequence` et `Lesson` sont donc conservés pour éviter une
migration prématurée, mais leur signification pédagogique n'est plus limitée à une
séquence chronologique ou à une séance personnelle.

L'enseignant peut accéder aux entrées dans l'ordre pédagogique de son choix. Le
catalogue doit aussi permettre la révision et la consolidation de notions d'un autre
niveau lorsque cela est utile.

**Nuance importante entre autorité réglementaire et contenu réellement enseigné :**
le référentiel officiel définit ce qui est réglementairement attendu pour le
diplôme — il ne dit jamais ce qui est concrètement travaillé à une séance donnée.
Les cours existants servent à produire des contenus adaptés, concrets et cohérents
avec les situations déjà travaillées. Les progressions personnelles servent à retrouver
les cours, à comprendre le contexte réellement enseigné et à suggérer un ordre, mais
elles ne sont pas l'autorité principale de structuration.

Une notion peut être conforme au référentiel sans avoir été prévue dans l'ordre
personnel initial ; elle peut être proposée comme entrée du catalogue, révision ou
consolidation, sous réserve des validations nécessaires.

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

Cette séparation s'applique à toutes les sources : une source associée à un TeachingArea
ne justifie pas automatiquement une activité d'un autre TeachingArea. Une source PSE ne
justifie pas une activité Maths, une source Maths ne justifie pas une activité PSE, et
une source PSE ou Maths ne justifie pas automatiquement une activité Bloc 2. Le
TeachingArea réel résolu côté serveur à partir de la cible reste l'autorité ; les noms
de fichiers, les titres et les valeurs fournies par un appelant ne peuvent pas le
remplacer.

## 6. Révision et niveaux d'accès

Le catalogue doit distinguer :

- le **niveau recommandé**, auquel l'entrée est généralement proposée dans le
  référentiel ou le parcours éditorial ;
- le **niveau accessible**, auquel l'enseignant peut rendre l'entrée disponible pour
  apprendre, réviser ou consolider.

Les révisions inter-années sont autorisées. Une classe de Terminale CAP peut accéder à
une notion normalement rencontrée en première année CAP si cette utilisation sert la
révision ou la consolidation. Ce cas ne constitue pas une erreur de progression et ne
doit pas être bloqué par une règle limitant les notions à l'année courante.

Le modèle actuel ne porte pas encore explicitement ces deux notions. La règle est donc
documentaire et éditoriale à ce stade ; elle devra être mieux modélisée plus tard si les
besoins de recherche, d'affectation ou de réutilisation le justifient.

## 7. Traçabilité obligatoire

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

## 8. Incertitude

Si une information importante n'est pas présente dans la base documentaire, ou si deux
documents se contredisent : **ne pas inventer**. Signaler la contradiction ou demander
une validation avant de poursuivre.

## 9. CORE / BONUS

Toute activité pédagogique porte une classification explicite, jamais déduite
automatiquement d'une difficulté ou d'un type de contenu :

- **CORE** (valeur par défaut) : correspond à une notion ou un objectif confirmé par le
  référentiel et suffisamment étayé par les sources pédagogiques retenues. Le cours ou
  la progression peut confirmer le contexte, la formulation et le fait que la notion a
  été travaillée, mais la progression personnelle n'est plus l'autorité de structuration
  du catalogue. Un contenu CORE ne doit jamais introduire une notion inventée, non
  confirmée ou attribuée au mauvais TeachingArea.
- **BONUS** : facultatif, clairement identifié « Pour aller plus loin » côté élève ; peut
  approfondir une notion, proposer davantage d'entraînement, faire des liens utiles, ou
  augmenter légèrement la difficulté ; ne modifie et ne complète jamais les attendus
  obligatoires de la séance.

Un BONUS ne devient jamais automatiquement un attendu obligatoire.

### Note pédagogique de préparation

Quand une séquence, une séance ou un ensemble d'exercices vise explicitement à faire
travailler les élèves sur des compétences du référentiel, consigner cette intention
dans la description de la séquence ou de la séance, ou dans le commentaire associé à
une référence pédagogique si la note porte sur une source précise.

Formulation recommandée, si besoin :

`Objectif : faire travailler les élèves sur les compétences C1 à C6 du référentiel à
travers les exercices réalisés.`

Les compétences concernées sont :

- **C1 — Traiter une information** : identifier et sélectionner les informations
  utiles pour analyser une situation donnée, expliquer un phénomène physiologique,
  un enjeu environnemental ou une disposition réglementaire, proposer des solutions
  ou argumenter un choix. Cette compétence est évaluée à travers les autres
  compétences et ne fait pas l'objet d'une évaluation distincte.
- **C2 — Appliquer une démarche d'analyse dans une situation donnée** : analyser une
  situation donnée en s'appuyant sur une démarche ; les outils appropriés peuvent
  être utilisés dans le cadre de cette analyse.
- **C3 — Expliquer un phénomène physiologique, un enjeu environnemental, une
  disposition réglementaire, en lien avec une mesure de prévention** : expliquer le
  phénomène, l'enjeu ou la disposition réglementaire qui justifie les mesures de
  prévention.
- **C4 — Proposer une solution pour résoudre un problème** : proposer des solutions
  au regard d'un problème identifié.
- **C5 — Argumenter un choix** : donner des critères et des arguments pour justifier
  un choix.
- **C6 — Communiquer à l'écrit avec une syntaxe claire et un vocabulaire adapté** :
  formuler une réponse complète à une question en rédigeant un texte élaboré, avec
  une syntaxe claire, un vocabulaire adapté et précis, et un propos organisé sans
  faute d'orthographe. Cette compétence transversale est mobilisée et évaluée de
  façon globale.

### Principaux verbes d'action utilisés dans les consignes de PSE

Les consignes des exercices doivent employer ces verbes de manière précise et
cohérente avec la production attendue :

- **Citer** : nommer précisément un ou plusieurs éléments sans donner d'explication.
- **Classer** : ranger des éléments dans l'ordre ou de la manière indiquée.
- **Comparer** : présenter les points communs et les différences entre plusieurs
  éléments.
- **Décrire** : dire ce que l'on voit.
- **Déduire** : établir une conséquence logique.
- **Définir** : donner le sens précis d'une notion ou d'un mot et, si nécessaire,
  ajouter un exemple.
- **Expliquer** : rendre clair et compréhensible un phénomène ou une argumentation.
- **Formuler** : rédiger ou exprimer le résultat dans le contexte de l'exercice.
- **Identifier** : reconnaître et nommer.
- **Indiquer** : donner un renseignement.
- **Justifier** : trouver dans ses connaissances ou dans les documents les éléments
  qui montrent la réalité d'une affirmation.
- **Nommer** : donner un nom.
- **Préciser** : rendre clair ou exprimer de façon plus exacte.
- **Repérer** : examiner avec précision, puis lister.

## 10. États de validation d'une correspondance documentaire (mapping)

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
pédagogiques du projet ArcadiA. Elle a été vérifiée en conditions réelles le
2026-08-16 sur trois cas (Bac Pro, CAP, AAGA Bloc 2/Maths) — voir le compte rendu
correspondant pour le détail des chemins et constats.
