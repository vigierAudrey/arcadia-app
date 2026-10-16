# Activités en direct ArcadIa

Ce document décrit la fonctionnalité de jeu interactif en direct à construire
pour ArcadIa. Elle vise des sessions courtes, lancées par l'enseignante depuis
l'administration, avec 24 élèves maximum.

## Objectif

Créer une expérience de type quiz live :

- l'enseignante lance une session depuis une classe ;
- le tableau affiche un PIN temporaire ;
- les élèves entrent d'abord par le code classe existant, puis rejoignent la
  session avec le PIN ;
- les élèves ne saisissent jamais de pseudo libre : ils choisissent un avatar
  prédéfini et le serveur attribue le nom affiché ;
- les réponses, états de jeu et scores restent temporaires ;
- la session est effacée à l'arrêt ou à l'expiration.

Aucune donnée élève nominative ne doit être persistée en base pour le live.

## Etat actuel

Une première base locale existe :

- `src/server/live-sessions/store.ts` garde les sessions live en mémoire ;
- `src/server/live-sessions/websocket.ts` attache le WebSocket `/live` au
  serveur HTTP Node ;
- `src/features/live/avatars.ts` définit les personnages et noms autorisés ;
- `src/server/live-sessions/admin.ts` vérifie qu'une classe existe avant de
  lancer ou terminer une session ;
- `src/app/admin/live-session-actions.ts` expose les actions serveur admin ;
- `src/features/admin/live-session-panel.tsx` ajoute les commandes dans les
  cartes classe de `/admin` ;
- `src/features/live/question-bank.ts` contient une première banque Bac Pro PSE
  générale, sans contexte métier obligatoire, et tracée vers les référentiels
  officiels ;
- `/admin#banque-live` affiche la banque préparée par formation et niveau, avec
  un bouton d'envoi vers une session active ;
- `/admin/live/[sessionId]/tableau` affiche le PIN, les joueurs connectés et la
  question live courante ;
- `/classe` affiche un encart informant qu'une session live est disponible ;
- `/classe/live` permet de rejoindre avec un avatar autorisé et affiche la
  question courante après connexion.

Cette base ne contient pas encore les animations de manche. Le transport
WebSocket diffuse actuellement l'état de session, les participants temporaires,
une question courante assainie, le compteur de réponses, les scores temporaires,
le compte à rebours et la correction uniquement après action admin de
révélation.

Les sons simples sont générés côté navigateur avec Web Audio. Ils sont
désactivés par défaut et nécessitent une action utilisateur explicite sur chaque
page concernée.

## Choix technique cible

Le choix retenu est l'option 1 : garder le même conteneur `arcadia-web`, mais
remplacer `next start` par un serveur Node custom qui démarre Next.js et
intercepte uniquement le chemin WebSocket `/live`.

Architecture :

```text
Caddy public 443
  -> arcadia-web:3000
      -> server.ts
          -> Next.js pour les pages HTTP
          -> WebSocket /live pour les activités en direct
```

Le besoin final correspond mieux à WebSocket qu'a un simple polling :

- etat bidirectionnel : admin, tableau, élèves ;
- transitions entre questions ;
- réponses reçues en direct ;
- scoreboards animés ;
- sons et effets côté navigateur.

La dépendance `ws` fournit le serveur WebSocket. Elle est justifiée parce que
Node ne fournit pas de serveur WebSocket complet dans l'API standard. Aucun
service externe, aucune image Docker séparée et aucun Redis ne sont nécessaires
tant qu'ArcadIa tourne sur une seule instance.

Le script `pnpm dev` et le script `pnpm start` lancent maintenant `server.ts`
via `tsx`. Le `Dockerfile` copie donc `server.ts` dans l'image finale. Le projet
conserve déjà les devDependencies au runtime pour Prisma et les scripts admin ;
`tsx` reste disponible dans l'image.

## Modèle de sécurité

Toutes les entrées live sont hostiles.

Règles non négociables :

- admin authentifié obligatoire pour créer, piloter ou arrêter une session ;
- élève autorisé par `ClassSession` obligatoire pour rejoindre ;
- un élève ne peut rejoindre qu'une session de sa propre classe ;
- le WebSocket `/live` refuse l'upgrade sans cookie classe valide ;
- PIN court mais non prédictible, temporaire, jamais stocké en base ;
- validation stricte des événements, tailles et valeurs ;
- erreurs publiques neutres ;
- pas de logs contenant PIN actifs, réponses élèves, identifiants de session ou
  contenu sensible ;
- nettoyage automatique des sessions expirées ;
- pas de confiance dans le score envoyé par le client.
- pas de pseudo libre projeté au tableau : un client envoie uniquement
  `avatarId`, et le serveur choisit `displayName`.
- pas de correction exposée au navigateur pendant la question : `currentQuestion`
  ne contient ni `correctChoiceIndex`, ni `explanation`.
- pas de confiance dans la réponse client : le client envoie seulement
  `choiceIndex`, et le serveur retrouve la bonne réponse dans la banque.
- correction diffusée uniquement en phase `reveal`, via action admin.
- délai de réponse appliqué côté serveur à partir de `sentAt` et
  `timeLimitSeconds`.
- contrôle strict de l'origine lors de l'upgrade WebSocket ;
- limites de connexions, de messages et de tentatives de PIN par session
  classe ;
- réévaluation périodique des sessions d'authentification pendant la
  connexion ;
- réponse liée à un identifiant de manche généré côté serveur, afin qu'une
  réponse retardée ne puisse pas être appliquée à la manche suivante ;
- score attribué et diffusé seulement au moment de la révélation ;
- reprise du même participant et de sa réponse après une coupure, à partir du
  cookie HttpOnly de la classe. Aucun jeton de reprise n'est exposé au
  JavaScript du navigateur.

## Modèle performance

Dimensionnement cible : 1 classe, 24 élèves, 1 tableau.

La charge attendue est faible :

- 25 connexions temps réel environ ;
- messages courts ;
- calcul de score serveur en temps constant ;
- état en mémoire compact.

Ne pas envoyer tout l'historique à chaque événement. Diffuser seulement l'état
utile : phase de jeu, question courante, compteur de réponses, résultats agrégés,
scoreboard.

## Etat en mémoire recommandé

```ts
type LiveGameSession = {
  id: string;
  classroomId: string;
  pin: string;
  status: "waiting" | "question" | "reveal" | "scoreboard" | "ended";
  createdAt: Date;
  expiresAt: Date;
  participants: Map<string, Participant>;
  currentQuestion?: LiveQuestion;
  answers: Map<string, Answer>;
  scores: Map<string, number>;
};
```

Les `Participant` doivent rester anonymes, temporaires et issus des avatars
autorisés. Ne pas écrire ces données dans PostgreSQL.

Les noms affichés sont générés côté serveur depuis `LIVE_AVATARS`, par exemple
`Pac Bleu 1` ou `Blob Vert 2`. Aucun texte libre envoyé par un élève ne doit
être affiché au tableau.

## Evenements cibles

Evenements admin :

- `session:start`
- `question:start`
- `question:close`
- `results:reveal`
- `scoreboard:show`
- `session:end`

Evenements élève :

- `session:join`
- `participant:join` avec `pin` et `avatarId` uniquement ;
- `answer:submit` avec `choiceIndex` uniquement ;
- `heartbeat`

Evenements serveur :

- `session:state`
- `participant:count`
- `answer:accepted`
- `answer:rejected`
- `scoreboard:update`
- `session:ended`

## Animations et sons

Les animations et sons doivent rester côté navigateur :

- compte à rebours ;
- son de début de question ;
- son de réponse validée ;
- transition de révélation ;
- animation de classement.

Le serveur n'envoie que des événements et des timestamps. Il ne calcule pas les
animations.

Respecter `prefers-reduced-motion` et prévoir un mode silencieux.

Etat actuel : les sons question, réponse, fin de compte à rebours et révélation
existent côté tableau et côté élève, via un bouton `Son coupé` / `Son activé`.

## Etapes suivantes

1. Valider régulièrement le parcours multi-navigateurs après les changements
   de transport ou d'authentification.
2. Ajouter les transitions de manche et le scoreboard projeté.

## Banque PSE générale

La première banque de questions est volontairement simple :

- Bac Pro PSE et CAP PSE ;
- questions générales, sans mise en situation métier obligatoire ;
- types `true-false` et `single-choice` ;
- `contextMode: "general-pse"` ;
- `track: "CORE"` ;
- référence interne vers le PDF officiel consulté.

Les sources consultées sont :

- `BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe632annexe1103982pdf-85404.pdf`
  — PSE seconde professionnelle ;
- `BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe1_1239665.pdf`
  — PSE première professionnelle ;
- `BACPRO/BACPRO PSE REFERENTIEL/REFERENTIELBACPRO/spe005_annexe2_1239667.pdf`
  — PSE terminale professionnelle.
- `CAP/REFERENTIEL_CAP_PSE/spe641annexe1105406pdf-85401.pdf`
  — PSE classes préparant au CAP.

Ne pas ajouter de question live PSE sans indiquer le module, la section du
référentiel et le chemin relatif du document source.


## Mini-quiz par module (octobre 2026)

La banque live contient 140 questions : 5 pour chacun des 21 modules PSE déjà
présents et 5 pour chacune des 7 séances de la séquence 1 du Bloc 2 CAP AAGA.
Ce périmètre n'est pas une couverture exhaustive de tous les modules des
référentiels.

Dans la Banque live, sélectionner le module puis « Afficher les 5 questions ».
Un seul module (5 questions) est rendu à la fois pour borner la taille de la page.
Les questions sont numérotées et restent envoyées manuellement dans la session
active choisie. Révéler la correction avant d'envoyer la question suivante.

Chaque question laisse 45 secondes de réponse, contrôlées côté serveur. Avec
une correction d'environ 15 secondes par question, le module dure environ
5 minutes (225 secondes de réponse + 75 secondes de correction). Ce n'est pas
un arrêt automatique à cinq minutes : les échanges et les transitions restent
au rythme de l'enseignante. Une session peut servir à plusieurs modules.

Les questions évaluent des connaissances et des situations simples, plutôt que
la présence d'un thème dans le programme. Chaque question conserve une référence
au PDF officiel de sa formation et à la section du module. Les corrections et
les scores restent révélés uniquement sur commande admin.

### Bloc 2 CAP AAGA — Séquence 1

Les 35 questions du Bloc 2 suivent strictement les sept séances de la séquence
« Cadre d’intervention, autonomie et ressources professionnelles » : structures
d’accueil et fiabilité des sources ; limites de rôle et prévention ; projets ;
protection des majeurs ; vieillissement ; autonomie et environnement ; accueil
d’un nouveau résident.

Elles révisent l’observation, l’ajustement de l’aide, la sécurité et la
transmission. Elles ne demandent pas de diagnostic, de calcul autonome d’un GIR
ni de geste de soin hors rôle. La traçabilité de chaque question pointe vers la
séance concernée dans `CAP/CAP AAGA - Bloc 2/Sequences/Sequence_1/`.

Sources de cadrage consultées : les quatre référentiels locaux cités ci-dessus,
ainsi que les ressources officielles suivantes pour recouper les notions :

- Programmes PSE en vigueur : https://eduscol.education.gouv.fr/5901/programmes-et-ressources-en-prevention-sante-environnement-voie-professionnelle
- Alternance : https://www.service-public.gouv.fr/particuliers/vosdroits/F31704
- Bruit : https://www.inrs.fr/risques/bruit/ce-qu-il-faut-retenir.html
- Organisation des secours : https://www.inrs.fr/demarche/organisation-secours/accident-malaise

Le mini-quiz C8 révise la protection et l'alerte ; il ne remplace pas une
formation pratique SST. Aucun geste médical technique n'est enseigné par le quiz.
