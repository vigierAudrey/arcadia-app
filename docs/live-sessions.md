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

1. Ajouter les transitions de manche et le scoreboard projeté.
2. Ajouter rate limits et tests d'autorisation sur les routes live.

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
