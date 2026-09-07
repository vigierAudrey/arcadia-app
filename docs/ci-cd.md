# CI/CD ArcadiA — GitHub Actions vers le VPS Hetzner

Déploiement de `main` vers `https://arcadia.blobsurf.com`, calqué sur la
stratégie éprouvée du projet Blob.

> **La CI est automatique, le déploiement ne l'est pas.** `ci.yml` tourne seul à
> chaque push sur `main` et à chaque pull request. `deploy.yml` ne part **que**
> sur clic humain dans `Actions -> Deploy -> Run workflow`. Voir
> [§ Pourquoi le déploiement est manuel](#pourquoi-le-déploiement-est-manuel).

| | Valeur |
|---|---|
| Serveur | `<VPS_HOSTNAME>` — Hetzner, Nuremberg, `<VPS_PUBLIC_IP>` |
| Utilisateur | `<VPS_USER>` (à confirmer, voir § Première mise en place) |
| Chemin | `/home/<VPS_USER>/arcadia-app` |
| Projet Compose | `arcadia` |
| Domaine | `https://arcadia.blobsurf.com` |
| Smoke test | `https://arcadia.blobsurf.com/classe` |

> **Conventions de ce document.** Le dépôt étant public, les coordonnées exactes
> du serveur sont remplacées par des placeholders. Substituer mentalement :
>
> | Placeholder | Où retrouver la vraie valeur |
> |---|---|
> | `<VPS_PUBLIC_IP>` | Console Hetzner, ou secret GitHub `ARCADIA_VPS_HOST` |
> | `<VPS_USER>` | Secret GitHub `ARCADIA_VPS_USER` |
> | `<VPS_HOSTNAME>` | Console Hetzner (nom de la machine) |
>
> Le domaine public `arcadia.blobsurf.com` est volontairement écrit en clair :
> il est de toute façon visible de tous.

---

## Le flux

```text
push sur main / pull request
   -> workflow « CI »            (.github/workflows/ci.yml)     [AUTOMATIQUE]
      - lint, build, tests sur base jetable
      - s'arrête là : la CI ne déclenche AUCUN déploiement

   ══ frontière manuelle ═══════════════════════════════════════════════════

Actions -> Deploy -> Run workflow   (branche main, raison saisie)
   -> workflow « Deploy »        (.github/workflows/deploy.yml)  [MANUEL]
      - refuse toute branche autre que main
   -> ⏸  ATTENTE D'APPROBATION   (si required reviewers configurés)
   -> SSH vers le VPS (clé dédiée, StrictHostKeyChecking=yes)
   -> git fetch origin main && git reset --hard origin/main
   -> docker compose build arcadia-web
   -> docker compose up -d arcadia-postgres
   -> pnpm prisma migrate deploy      (dans le conteneur web)
   -> docker compose up -d --build
   -> pnpm pse:import                 (exercices : simulation / appliquer /
                                       ignorer, choisi au lancement)
   -> smoke test public sur https://arcadia.blobsurf.com
   -> si échec : rollback sur le commit précédent
```

Rien ne part en production sans **décision humaine explicite** : une CI verte
ne déclenche rien du tout, il faut lancer le workflow à la main.

---

## Pourquoi le déploiement est manuel

`deploy.yml` se déclenchait initialement sur `workflow_run`, dès que la CI
passait au vert sur `main`. Le tout premier push du dépôt a donc lancé un
déploiement que personne n'avait demandé (run `34095005546`).

Il n'a fait aucun dégât : `/home/<VPS_USER>/arcadia-app` n'existait pas encore sur
le VPS, le script distant s'est arrêté sur son `cd` — avant `git reset --hard`,
avant `docker compose`, avant toute migration. Mais le garde-fou censé
l'arrêter, l'approbation d'environment, n'était pas actif : **les required
reviewers ne sont pas disponibles sur les dépôts privés** des offres Free.
L'environment existait donc sans aucune règle, et GitHub a laissé passer.

D'où la règle actuelle, inscrite dans le workflow lui-même :

- `deploy.yml` n'a plus qu'un seul déclencheur, `workflow_dispatch` ;
- il n'y a plus ni `push`, ni `workflow_run`, ni `schedule` ;
- une étape `Vérifier la branche déployée` refuse toute branche autre que
  `main`, puisque le menu « Run workflow » laisse choisir n'importe laquelle ;
- l'environment `arcadia-production` est conservé : dès que des required
  reviewers y sont configurés, ils s'ajoutent au déclenchement manuel.

**N'ajoutez jamais de déclencheur automatique à ce workflow.** Il fait un
`git reset --hard` et joue les migrations sur la base de production réelle.

---

## Ce que la CI vérifie

`ci.yml` tourne sur chaque push `main` et chaque pull request, en deux jobs
parallèles :

| Job | Contenu |
|---|---|
| `quality` | `pnpm install` → `db:generate` → `lint` → `build` (le build inclut le typecheck TypeScript complet) |
| `test` | `pnpm install` → `db:generate` → `migrate deploy` → `db:seed` → `test` sur un PostgreSQL 16 jetable |

Deux subtilités du projet qui expliquent la forme de ces jobs :

- **`db:generate` avant tout** : `src/generated/prisma` est dans `.gitignore`,
  donc absent du dépôt cloné. Sans cette étape, lint, build et tests échouent
  tous sur un import introuvable.
- **`DATABASE_URL` obligatoire même sans base** : `prisma.config.ts` résout
  `env("DATABASE_URL")` au chargement. Le job `quality` utilise une URL factice
  et injoignable (`127.0.0.1:1`) — aucune connexion n'est ouverte.

Le **seed est exécuté en CI**, et c'est normal : les tests d'intégration
vérifient de vraies données (« CAP », « T AGAA », « PSE »…) sur une base
éphémère détruite à la fin du job. Il reste **formellement interdit en
production**, où il écraserait le catalogue réel par des démonstrations.

---

## Secrets GitHub nécessaires

`Settings -> Secrets and variables -> Actions -> New repository secret`

| Secret | Valeur | Obligatoire |
|---|---|---|
| `ARCADIA_VPS_HOST` | `<VPS_PUBLIC_IP>` | oui |
| `ARCADIA_VPS_USER` | `<VPS_USER>` | oui |
| `ARCADIA_VPS_PORT` | `22`, ou le port SSH réel | oui |
| `ARCADIA_VPS_SSH_KEY` | Contenu de la **clé privée** dédiée, en entier | oui |
| `ARCADIA_DEPLOY_PATH` | `/home/<VPS_USER>/arcadia-app` | oui |
| `ARCADIA_VPS_HOST_KEY` | Clé publique du serveur, pour épingler l'empreinte | recommandé |

**Ne jamais mettre dans les secrets GitHub** : `.env.production`, les secrets de
session, le mot de passe PostgreSQL, ou toute clé privée autre que celle dédiée
au déploiement. Le workflow n'en a pas besoin : les secrets applicatifs vivent
uniquement dans `/home/<VPS_USER>/arcadia-app/.env.production`, sur le serveur.

Le workflow refuse de démarrer si un secret obligatoire manque, si le port n'est
pas numérique, ou si le chemin de déploiement pointe vers un répertoire système
(`/`, `/home`, `/root`, `/etc`…) — un `git reset --hard` à cet endroit détruirait
le serveur.

---

## Créer la clé SSH dédiée

Une clé **spécifique au déploiement**, distincte de ta clé personnelle : si elle
fuite, elle se révoque sans t'empêcher d'accéder au serveur.

Sur ta machine :

```bash
ssh-keygen -t ed25519 -C "github-actions-arcadia-deploy" -f ~/.ssh/arcadia-deploy -N ""
```

Deux fichiers sont créés :

- `~/.ssh/arcadia-deploy` — la **clé privée**, à coller dans le secret
  `ARCADIA_VPS_SSH_KEY` (contenu complet, en-têtes `BEGIN`/`END` compris) ;
- `~/.ssh/arcadia-deploy.pub` — la **clé publique**, à installer sur le serveur.

```bash
# Copier la clé privée dans le presse-papier (WSL)
clip.exe < ~/.ssh/arcadia-deploy
```

Ne jamais commiter ces fichiers, ne jamais les envoyer par message.

### Installer la clé publique sur le serveur

```bash
ssh <VPS_USER>@<VPS_PUBLIC_IP>

install -d -m 700 ~/.ssh
cat >> ~/.ssh/authorized_keys   # coller le contenu de arcadia-deploy.pub, puis Ctrl-D
chmod 600 ~/.ssh/authorized_keys
```

Vérifier depuis ta machine que la clé fonctionne **avant** de configurer le
workflow :

```bash
ssh -i ~/.ssh/arcadia-deploy <VPS_USER>@<VPS_PUBLIC_IP> 'echo connexion OK'
```

### Épingler la clé hôte (recommandé)

Le workflow accepte deux modes. Sans `ARCADIA_VPS_HOST_KEY`, il découvre la clé
du serveur à la volée avec `ssh-keyscan` : cela fonctionne, mais fait confiance
au réseau lors du premier contact, et le workflow émet un avertissement.

Le mode recommandé épingle l'empreinte :

```bash
ssh-keyscan -p 22 -H <VPS_PUBLIC_IP>
```

Comparer l'empreinte obtenue avec celle affichée dans la **console Hetzner**
(ou depuis une session SSH déjà fiable) :

```bash
ssh-keyscan -p 22 <VPS_PUBLIC_IP> | ssh-keygen -lf -
```

Si elles correspondent, coller la sortie complète de `ssh-keyscan -H` dans le
secret `ARCADIA_VPS_HOST_KEY`. En cas de différence : **ne pas activer le
déploiement** et investiguer.

---

## Dépôt public et environnement protégé

### Pourquoi le dépôt est public

Sur un dépôt **privé**, chaque minute de GitHub Actions est décomptée du quota
mensuel du compte (2 000 minutes/mois en offre Free), et un build Next.js
complet en consomme vite. Sur un dépôt **public**, les runners standard
`ubuntu-*` sont **gratuits et sans quota**. La CI peut donc tourner sur chaque
push et chaque pull request sans surveiller un compteur.

Le passage en public a une seconde conséquence, utile ici : **les protections
d'environment (required reviewers) deviennent disponibles**, alors qu'elles
sont réservées aux offres payantes sur les dépôts privés. C'est exactement la
protection qui manquait au moment du déploiement non voulu.

Ce que « public » implique, à garder en tête :

- le code **et tout l'historique Git** deviennent lisibles par n'importe qui ;
- les **secrets Actions restent secrets** : ils ne sont pas exposés par le
  passage en public, et GitHub ne les fournit pas aux workflows déclenchés par
  une pull request venant d'un fork ;
- `deploy.yml` étant en `workflow_dispatch` seul, **personne d'autre que les
  personnes ayant les droits d'écriture sur le dépôt ne peut le lancer** — une
  pull request extérieure ne peut pas déclencher de déploiement ;
- en revanche, n'importe qui peut ouvrir une pull request qui fera tourner la
  CI. C'est sans risque (aucun secret) et sans coût (runners gratuits).

### Configurer les required reviewers

À faire **une fois le dépôt public**, si GitHub propose bien l'option :

1. `Settings -> Environments -> arcadia-production` (l'environment existe déjà)
2. Cocher **Required reviewers** et t'ajouter (au moins une personne)
3. Conseillé : `Deployment branches` → `Selected branches` → `main`
4. Enregistrer avec **Save protection rules**

Une fois en place, chaque déploiement — même lancé à la main — apparaît en
attente dans l'onglet `Actions`, avec un bouton **Review deployments** pour
approuver ou rejeter.

Cette étape est un **confort supplémentaire, pas un prérequis** : le
déclenchement manuel exclusif suffit déjà à empêcher tout déploiement
automatique. Si l'option n'apparaît pas, le workflow reste sûr.

---

## Première mise en place serveur

Le workflow **met à jour** une installation existante : il ne l'installe pas.
La première mise en ligne se fait à la main, en suivant
[`deploiement.md`](deploiement.md). Résumé des prérequis côté serveur :

- [ ] `free -h`, `df -h`, `docker ps` vérifiés (disque de 40 Go partagé avec Blob)
- [ ] Enregistrement Cloudflare `A arcadia -> <VPS_PUBLIC_IP>`, nuage gris
- [ ] Modification unique côté Blob appliquée ([`deploy/README.md`](../deploy/README.md))
- [ ] Dépôt cloné dans `/home/<VPS_USER>/arcadia-app`
- [ ] `.env.production` créé et rempli, en `chmod 600`
- [ ] Stack démarrée, migrations appliquées, compte admin créé
- [ ] `https://arcadia.blobsurf.com` répond en HTTPS

Puis, spécifiquement pour la CI/CD :

- [ ] Le dépôt distant est configuré sur le serveur et `git status` est **propre**
      — le workflow refuse de déployer sur un worktree modifié à la main, pour
      ne pas écraser silencieusement un correctif en cours
- [ ] `git fetch origin main` fonctionne depuis le serveur, sans mot de passe
      (clé de déploiement en lecture seule côté GitHub, ou dépôt public)
- [ ] L'utilisateur `<VPS_USER>` peut lancer `docker compose` sans `sudo`
      (`docker ps` doit répondre)
- [ ] Les 5 secrets obligatoires sont renseignés
- [ ] L'environment `arcadia-production` existe ; required reviewers configurés
      si le dépôt est public (facultatif, le workflow est déjà manuel)

> **`ARCADIA_VPS_USER`** : `<VPS_USER>` est l'utilisateur qui exploite Blob (cron,
> `docker compose`). Confirmer qu'il s'agit bien du même compte avant de le
> mettre dans les secrets. Un utilisateur `deploy` distinct serait plus propre
> à terme, mais il devrait appartenir au groupe `docker` et pouvoir écrire dans
> `/home/<VPS_USER>/arcadia-app`.

---

## Procédure normale

1. Travailler sur une branche, ouvrir une pull request → la CI tourne dessus.
2. Fusionner dans `main`.
3. La CI retourne sur `main`. **Rien ne se déploie**, quel que soit son résultat.
4. Vérifier que la CI est verte : `Actions -> CI -> dernier run`. Ne jamais
   déployer sur une CI rouge — plus rien ne l'interdit techniquement, c'est
   devenu une discipline.
5. Lancer le déploiement : `Actions -> Deploy -> Run workflow`
   → branche **`main`** → saisir une raison → **Run workflow**.
6. Si des required reviewers sont configurés, approuver via
   **Review deployments**.
7. Le déploiement se déroule et se termine par le smoke test.
8. Vérifier `https://arcadia.blobsurf.com/classe` depuis un téléphone.

C'est la **même procédure** pour une première mise en ligne, une mise à jour
après merge, ou un redéploiement après incident sans nouveau commit : le
workflow n'a qu'un seul mode de déclenchement.

---

## Le smoke test

Exécuté depuis le runner GitHub, par l'internet public : il valide d'un seul
coup le DNS Cloudflare, le certificat Let's Encrypt, le routage Caddy **et**
l'application. Aucun `-k` : un certificat invalide fait échouer le déploiement.

| Contrôle | Attendu | Ce que ça prouve |
|---|---|---|
| `GET /` | `200` + texte « Entre ton code classe » | L'application sert la page d'entrée des élèves |
| `GET /classe` | `200`, `307` ou `308` | L'URL du QR code répond ; sans session elle renvoie vers la saisie du code |
| `GET /admin` | `307` ou `308` | L'administration est protégée et redirige vers la connexion |
| En-têtes | `Strict-Transport-Security` présent | Le bloc Caddy d'ArcadiA est bien actif |

Le contrôle sur `/classe` accepte volontairement 200 **ou** une redirection :
c'est exactement le comportement qui rend l'URL du QR code utilisable toute
l'année — un élève déjà connecté arrive dans sa classe, un élève sans session
est renvoyé vers la saisie du code.

Avant les assertions, le workflow patiente jusqu'à 100 secondes que
l'application réponde : `next start` démarre en quelques secondes, mais le
conteneur peut être en cours de remplacement.

---

## Rollback

Si le smoke test échoue après un déploiement réussi, le workflow :

1. se reconnecte en SSH ;
2. `git reset --hard <commit précédent>` ;
3. reconstruit et redémarre la stack ;
4. échoue explicitement, pour que l'échec reste visible.

Un `trap ... ERR` couvre également les échecs survenant **pendant** le script
distant (build, migration, démarrage).

> ⚠️ **Le rollback ne touche jamais au schéma de base.** Les migrations déjà
> appliquées par `prisma migrate deploy` ne sont pas annulées : Prisma n'a pas
> de « migrate down » automatique, et une annulation aveugle détruirait des
> données. Après un rollback, vérifier la cohérence entre le code restauré et le
> schéma en base avant de redéployer. En pratique, cela reste sans conséquence
> tant que les migrations sont additives (nouvelle colonne, nouvelle table).

---

## Incident du 2026-09-07 — le script distant s'arrêtait après les migrations

Les trois premiers déploiements ont été rapportés « success » alors que le script
distant s'arrêtait silencieusement juste après `prisma migrate deploy` : ni
`docker compose up -d --build`, ni `docker compose ps` n'ont jamais tourné.
L'application est donc restée sur le conteneur démarré à la main lors de
l'installation initiale, et le smoke test passait — il interrogeait l'ancien
conteneur, bien vivant.

**Cause.** Le script est exécuté par `ssh 'bash -s' < remote-deploy.sh` : bash lit
ses instructions sur l'entrée standard. `docker compose run` transmet cette même
entrée standard au conteneur, dont le processus a consommé le reste du script.
Bash n'avait plus rien à lire et s'est terminé normalement, avec un code de sortie
nul — d'où l'absence totale d'erreur.

**Correctif.** Chaque `docker compose run` du script distant se termine par
`< /dev/null`. **Ne jamais retirer cette redirection** : sans elle, toute
instruction placée après le premier `docker compose run` est silencieusement
ignorée.

**Limite connue, non corrigée.** Le smoke test vérifie que le site répond, pas
qu'il sert bien le commit déployé. Un conteneur périmé mais fonctionnel passe le
test. Ajouter un contrôle de version servie reste à faire.

---

## Interdits, et comment ils sont appliqués

| Interdit | Application |
|---|---|
| `prisma migrate dev` en production | Contrôle automatique du script distant avant l'envoi — le workflow échoue si la chaîne apparaît |
| `prisma db push` | idem |
| `pnpm db:seed` en production | idem — écraserait le catalogue réel. La seule écriture de contenu autorisée est `pnpm pse:import`, qui n'ajoute que ce qui manque et ne modifie jamais l'existant — voir [`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md) |
| `docker volume prune` | idem — détruirait `arcadia-pgdata` et les certificats de Blob |
| Déploiement hors `main` | Étape `Vérifier la branche déployée` (échec si `GITHUB_REF_NAME != main`) + `Deployment branches` sur l'environment |
| Déploiement automatique non voulu | `deploy.yml` n'a qu'un déclencheur : `workflow_dispatch`. Aucun `push`, `workflow_run` ni `schedule` |
| Secrets dans les logs | Aucun `set -x`, aucun `echo` de secret ; la clé privée est écrite en `600` puis supprimée à la fin, même en cas d'échec |
| Écrasement d'un correctif serveur | Le script refuse un worktree modifié |

Ce test négatif a été vérifié : en remplaçant `migrate deploy` par
`migrate dev` dans le script distant, le workflow s'arrête avec
`::error title=Commande interdite`.

---

## Diagnostic

Côté GitHub : `Actions -> Deploy -> dernier run`.

Côté serveur :

```bash
ssh <VPS_USER>@<VPS_PUBLIC_IP>
cd /home/<VPS_USER>/arcadia-app

docker compose -p arcadia --env-file .env.production -f docker-compose.production.yml ps
docker compose -p arcadia --env-file .env.production -f docker-compose.production.yml logs arcadia-web --tail=100

git log --oneline -3     # quel commit est réellement déployé
```

| Symptôme | Piste |
|---|---|
| `Permission denied (publickey)` | Clé publique absente de `authorized_keys`, ou mauvais `ARCADIA_VPS_USER` |
| `Host key verification failed` | `ARCADIA_VPS_HOST_KEY` obsolète (serveur réinstallé) — revérifier l'empreinte avant de la mettre à jour |
| « modifications locales non commitées » | Quelqu'un a édité des fichiers sur le serveur : les récupérer ou les annuler à la main |
| Smoke test en échec sur le certificat | DNS pas encore propagé, ou passage en proxy Cloudflare pendant le déploiement |
| Le job ne démarre jamais | L'environment `arcadia-production` attend une approbation |

---

## Désactivation temporaire

Options sûres, par ordre de préférence :

1. Désactiver le workflow `Deploy` dans l'onglet `Actions`.
2. Supprimer temporairement `ARCADIA_VPS_SSH_KEY` des secrets.
3. Retirer l'approbateur de l'environment (le job restera bloqué en attente).

Ne pas contourner la condition « CI verte » en modifiant le workflow.
