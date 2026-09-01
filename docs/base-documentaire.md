# Base documentaire pédagogique — PSE Interactif

Ce document décrit l'accès à la base documentaire de référence (cours, référentiels,
progressions) utilisée pour générer tout contenu pédagogique dans ce projet.

## Accès

Les documents sources vivent **hors du dépôt Git**, sur le système de fichiers Windows
de l'enseignante :

- Chemin Windows : `C:\Users\audre\Documents\cours`
- Chemin WSL : `/mnt/c/Users/audre/Documents/cours`
- Lien symbolique dans le projet : [`cours-source`](../cours-source) → pointe vers le chemin ci-dessus

`cours-source` est un lien symbolique local, **ignoré par Git** (voir `.gitignore`).
Il n'existe que sur la machine de l'enseignante et ne doit jamais être committé ni recréé
en CI. Le dossier cible doit être traité comme **strictement en lecture seule** : ne
jamais écrire, déplacer ou supprimer un fichier sous `cours-source/`.

**Aucune donnée dérivée de cette base (index, mapping, traçabilité) ne doit jamais
contenir de chemin absolu Windows/WSL** (`/mnt/c/...`, `C:\Users\...`). Toute référence à
un document source est stockée en chemin **relatif** à la racine `cours-source/`, pour
rester valable indépendamment de la machine (y compris un futur VPS qui n'aura pas ce
dossier monté).

Taille actuelle : environ 2,0 Go, 4121 fichiers (mise à jour 2026-09-01 ; ~4300 fichiers
lors du premier inventaire du 2026-08-16 — écart cohérent avec un nettoyage effectué lors
de la réorganisation décrite ci-dessous).

⚠️ Deux sous-dossiers contiennent eux-mêmes un `.git` interne (dépôts personnels séparés
de l'enseignante, sans rapport avec ce projet) : `CAP/CAP AAGA - Bloc 2/.git` et
`BACPRO/T/TTCI PSE/.git`. Ne jamais exécuter de commande Git à l'intérieur de
`cours-source/`.

## Arborescence (résumé, 2026-09-01)

Le dossier a été réorganisé depuis le premier inventaire (2026-08-16) : les classes sont
désormais regroupées sous deux parents `BACPRO/` et `CAP/`, eux-mêmes subdivisés par
niveau (`1/`, `2/`, `T/`).

```
cours-source/
  BACPRO/
    1/
      1AERO PSE/
      1TCI PSE/
    2/
      2AERO PSE/
      2CIEL PSE/
    T/
      TAERO PSE/
      TTCI PSE/
    BACPRO PSE REFERENTIEL/
      REFERENTIELBACPRO/
  CAP/
    CAP AAGA - Bloc 2/         (.git interne)
    CAP AAGA - PSE/
    CAP AAGA -Maths/
    CAP PSE DELAGRAVE/
    CAP PSE FOUCHER/
    REFERENTIEL_CAP_PSE/
      _extraits_texte/
  manuelPSEFoucherDelagrave/
    BAC PRO PSE DELAGRAVE/
    BAC PRO PSE FOUCHER/
    listeManuels/
```

Chaque dossier de classe (`<X>AERO PSE/`, `<X>TCI PSE/`, `<X>CIEL PSE/`, `CAP AAGA - .../`)
suit désormais généralement ce schéma interne (remplace l'ancien
`PSE - Progression et cours IA/{Consignes_IA/, Cours_generes_Hermes/}`) :

```
<Classe> PSE/
  REFERENTIELS_OFFICIELS/          # présent pour 2AERO PSE, 2CIEL PSE — pas systématique
  PSE - Progression et sequences/
    Sequences/                     # (ou équivalent selon la classe)
  _Ressources_enseignant/
    Archives/
    Audits_referentiel/            # nouveau : audits de conformité internes, datés
    Notes_de_preparation/
    Outils_techniques/
    Relecture_qualite/
```

| Dossier | Fichiers | Taille | Contenu |
|---|---|---|---|
| `BACPRO/1/1AERO PSE` | 377 | 81 M | Bac Pro Aéronautique, 1re |
| `BACPRO/1/1TCI PSE` | 266 | 35 M | Bac Pro Chaudronnerie Industrielle, 1re |
| `BACPRO/2/2AERO PSE` | 402 | 304 M | Bac Pro Aéronautique, 2de — référentiels officiels présents |
| `BACPRO/2/2CIEL PSE` | 387 | 298 M | Bac Pro Cybersécurité/Électronique, 2de — référentiels officiels présents |
| `BACPRO/T/TAERO PSE` | 795 | 133 M | Bac Pro Aéronautique, Tle |
| `BACPRO/T/TTCI PSE` | 914 | 58 M | Bac Pro Chaudronnerie Industrielle, Tle — `.git` interne |
| `BACPRO/BACPRO PSE REFERENTIEL` | 13 | 7,5 M | Ressources transverses Bac Pro : programme officiel, annales, grilles d'évaluation |
| `CAP/CAP AAGA - Bloc 2` | 488 | 196 M | CAP AAGA Bloc 2 — `.git` interne, `_Ressources_enseignant/` avec `MATRICE_REFERENTIEL_EXHAUSTIVE.json` |
| `CAP/CAP AAGA - PSE` | 354 | 151 M | PSE pour CAP AAGA |
| `CAP/CAP AAGA -Maths` | 61 | 313 M | Maths appliquées / co-intervention CAP AAGA |
| `CAP/CAP PSE DELAGRAVE` | 8 | 23 M | Manuel éditeur |
| `CAP/CAP PSE FOUCHER` | 8 | 218 M | Manuel éditeur (gros PDF, voir points d'attention) |
| `CAP/REFERENTIEL_CAP_PSE` | 4 | 1,1 M | Référentiel officiel CAP PSE — voir section dédiée ci-dessous |
| `manuelPSEFoucherDelagrave` | 37 | 174 M | Manuels profs Bac Pro (Foucher/Delagrave) + inventaire manuels rentrée 2026 |

**Résidus de réorganisation à clarifier** : `BACPRO/2AERO PSE/` (ne contient plus qu'un
fichier vide `LIRE_MOI_ORGANISATION.md`) et `TAERO PSE/` à la racine du dossier (vide) —
semblent être d'anciens emplacements non supprimés après le déplacement du contenu réel
vers `BACPRO/2/2AERO PSE/` et `BACPRO/T/TAERO PSE/`. À confirmer et nettoyer par
l'enseignante ; l'indexation les traite comme des dossiers ordinaires (quasi vides, sans
impact).

## Référentiel officiel CAP PSE (vérifié 2026-09-01)

`CAP/REFERENTIEL_CAP_PSE/` contient deux documents de niveau d'autorité différent — à ne
jamais confondre :

- **`spe641annexe1105406pdf-85401.pdf`** — **référentiel/programme officiel primaire**,
  identifié avec forte confiance (confirmation externe encore souhaitable, aucun accès
  internet disponible pour croiser avec Légifrance/éduscol) :
  - En-tête « © Ministère de l'Éducation nationale et de la Jeunesse »
  - Titre : « Annexe — Prévention-santé-environnement — Classes préparant au certificat
    d'aptitude professionnelle »
  - Structure conforme à un programme officiel : Préambule, Finalités et enjeux,
    Compétences à développer (6 compétences transversales), Repères pour l'enseignement,
    Modalités de lecture, puis 4 thématiques A/B/C/D avec leurs modules
  - Métadonnées PDF : créé le 01/04/2019, modifié le 03/04/2019 — cohérent avec l'arrêté
    du 3 avril 2019 (BOEN spécial n°6 du 4 avril 2019)
  - 32 pages
- **`ra19lyceeprocap1re2ndepsenouveauprogrammepseencap1178363pdf-85410.pdf`** —
  **document institutionnel d'accompagnement, source secondaire** (niveau 2 de la
  hiérarchie, jamais niveau 1) : intitulé « Vers un nouveau programme de PSE en CAP »,
  finalité explicite dans le texte : « faciliter la découverte et la mise en œuvre du
  nouveau programme [...] en proposant un comparatif entre l'ancien et le nouveau
  programme ». Les deux documents se recoupent exactement (mêmes thématiques A-D, mêmes
  modules A1-A7/B1-B4/C1-C8/D1-D3) — cohérence croisée qui renforce la fiabilité de
  l'identification du texte officiel.

Un dossier `_extraits_texte/` existe déjà à cet emplacement avec le texte pré-extrait des
deux PDF — pratique désormais généralisée par l'index `.cours-index/` (voir plus bas).

**Historique** : le test du 2026-08-16 (voir plus bas) n'avait pas retrouvé le texte
réglementaire précis du programme PSE CAP et avait signalé
`SOURCE OFFICIELLE NON RETROUVÉE — VALIDATION NÉCESSAIRE`. Cette lacune est considérée
comme comblée depuis la vérification du 2026-09-01 ci-dessus, sous réserve de la
confirmation externe mentionnée.

## Audits de conformité internes

Le dossier `_Ressources_enseignant/Audits_referentiel/` (présent pour la plupart des
classes depuis la réorganisation) contient des audits internes datés, par exemple
`AUDIT_CONFORMITE_1AERO_1TCI_PSE_REFERENTIEL_2026_08_30.md`. Comme
`MATRICE_REFERENTIEL_EXHAUSTIVE.json` (`CAP/CAP AAGA - Bloc 2/`), ce sont des **aides de
navigation internes**, jamais une autorité de substitution au PDF référentiel officiel —
même règle que pour tout document de niveau 5 de la hiérarchie des sources.

## Types de fichiers et indexabilité

| Extension | Nombre | Traité par l'index (`.cours-index/`) |
|---|---|---|
| `.docx` | 1346 | Oui — `unzip` + extraction XML |
| `.png` | 1042 | Non (image, pas d'OCR) |
| `.md` | 585 | Oui — copie directe |
| `.pdf` | 433 | Oui — `pdftotext` (sauf fichiers > 25 Mo, voir points d'attention) |
| `.html` | 336 | Oui — copie directe |
| `.pptx` | 133 | Oui — `unzip` + extraction XML des diapositives (ordre des diapositives non garanti) |
| `.py` | 72 | Oui — copie directe (scripts de génération, pas du contenu pédagogique, mais texte exploitable) |
| `.json` | 39 | Oui — copie directe |
| `.txt` | 34 | Oui — copie directe |
| `.zip` | 17 | **Non, jamais ouvert** — archives non indexées par choix |
| `.jpg` | 12 | Non (image, pas d'OCR) |
| `.sample`, `.pyc`, `.tmp`, `.lock`, `.ini`, `.log`, `.csv`, `.bat`, `.odg` | quelques unités chacun | Non — fichiers techniques (voir ci-dessous) |

**Fichiers techniques toujours exclus** (jamais indexés, jamais comptés comme
pédagogiques) : tout fichier sous un dossier `.git/` ou `__pycache__/` ; `Desktop.ini` ;
`.nextcloudsync.log` ; `.sync_*.db*` (métadonnées Nextcloud) ; extensions `.sample`,
`.pyc`, `.tmp`, `.lock`, `.ini`, `.log`, `.csv`, `.bat`, `.odg`.

## Hiérarchie des sources

Voir la règle complète dans [`pedagogie-agents.md`](pedagogie-agents.md). Ordre de priorité :

1. Référentiel officiel (dossiers `REFERENTIELS_OFFICIELS/`, `REFERENTIEL_CAP_PSE/`,
   `BACPRO PSE REFERENTIEL/`, PDF de diplôme/programme)
2. Document institutionnel officiel (annales, grilles d'évaluation officielles,
   documents d'accompagnement — ex. `BACPRO/BACPRO PSE REFERENTIEL/`, le PDF `ra19...`
   du programme PSE CAP)
3. Progression validée par l'enseignante
4. Cours existant de l'enseignante (y compris les dossiers `Sequences/`, à condition
   qu'il ait été relu/validé — en cas de doute, demander)
5. Autres ressources (manuels éditeurs, contenus générés non validés,
   `MATRICE_REFERENTIEL_EXHAUSTIVE.json`, `Audits_referentiel/` internes)

## Index documentaire local (`.cours-index/`)

Un index texte local, incrémental, régénérable, permet de rechercher dans l'ensemble du
corpus sans rescanner 2 Go à chaque demande. Il vit entièrement hors du dépôt Git
(`.cours-index/` dans `.gitignore`) et ne modifie jamais `cours-source/`.

```
.cours-index/
  manifest.json     # un enregistrement par fichier source : chemin relatif, taille,
                     # date de modification, statut, chemin du texte extrait
  text/              # miroir de cours-source/, un .txt par fichier exploitable
```

Commandes :

```bash
pnpm cours:index                    # construit/actualise l'index (incrémental)
pnpm cours:search "accident du travail"   # recherche dans le texte indexé
```

Détails d'implémentation, statuts et limites : voir `scripts/cours-index/`.

## Points d'attention identifiés

- `le_nouveau_referentiel_cap_aaga_...pdf` : toujours présent en double, dans `CAP/` et
  `CAP/CAP AAGA -Maths/` (fichier identique, vérifié par empreinte)
- `9968-bac-pro-technicien-...referentiels-du-diplome.pdf` : toujours présent en double,
  dans `BACPRO/T/TTCI PSE/` et `BACPRO/1/1TCI PSE/` (fichier identique, vérifié par
  empreinte)
- `CAP/CAP AAGA - PSE/` : deux versions parallèles historiquement signalées
  (`Cours_generes_Hermes` vs `Cours_generes_Hermes_ILLUSTRE`) — à revérifier après la
  réorganisation, non recontrôlé lors de la mise à jour du 2026-09-01
- `MATRICE_REFERENTIEL_EXHAUSTIVE.json` (`CAP/CAP AAGA - Bloc 2/`) et les
  `Audits_referentiel/` internes : aides de navigation, jamais une autorité de
  substitution au PDF référentiel
- Gros PDF volumineux (ex. `CAP/CAP PSE FOUCHER/...` ≈ 177 Mo, `CAP AAGA/Corrige Bloc
  1...` ≈ 82 Mo) : au-delà de 25 Mo, `pnpm cours:index` les marque
  `skipped:too-large` plutôt que de lancer un `pdftotext` systématique coûteux — extraire
  ces cas à la demande, en ciblant les pages utiles
- Référentiel Maths CAP identifié : `programme_cap_maths_-_2019.pdf` (sous
  `CAP/CAP AAGA -Maths/`)

## Test de la chaîne référentiel → cours (2026-08-16, historique)

Trois vérifications réelles ont été menées (extraction effective des PDF, lecture du
contenu, comparaison avec les cours générés) pour valider que la procédure décrite dans
[`pedagogie-agents.md`](pedagogie-agents.md) fonctionne en pratique. Résumé :

1. **Bac Pro PSE (2AERO, Module C1 « santé et sécurité au travail »)** — référentiel
   trouvé, attendus comparés séance par séance au cours existant : **conformité
   confirmée**.
2. **CAP PSE (CAP AAGA - PSE)** — le texte réglementaire précis du programme PSE CAP
   n'avait **pas été retrouvé** à cette date ; seul le référentiel du diplôme CAP AAGA
   citait l'arrêté sans le reproduire. →
   `SOURCE OFFICIELLE NON RETROUVÉE — VALIDATION NÉCESSAIRE` à l'époque. **Mise à jour
   2026-09-01 : lacune comblée, voir la section « Référentiel officiel CAP PSE »
   ci-dessus.**
3. **CAP AAGA Bloc 2 + Maths co-intervention** — référentiel du diplôme trouvé et lu,
   codes de compétences correspondant exactement à `MATRICE_REFERENTIEL_EXHAUSTIVE.json` :
   **conformité confirmée** pour cet outil interne. Programme Maths CAP retrouvé et
   confirmé.

**Conclusion du test** : la chaîne référentiel → attendus → cours → traçabilité
fonctionne, mais nécessite une lecture réelle des documents à chaque fois (les noms de
dossiers/fichiers seuls ne suffisent pas à conclure).
