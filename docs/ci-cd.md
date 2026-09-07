# CI/CD ArcadiA — GitHub Actions vers le VPS Hetzner

Déploiement automatisé de `main` vers `https://arcadia.blobsurf.com`, calqué sur
la stratégie éprouvée du projet Blob.

| | Valeur |
|---|---|
| Serveur | `blobsurf-prevps` — Hetzner, Nuremberg, `46.224.144.57` |
| Utilisateur | `audrey` (à confirmer, voir § Première mise en place) |
| Chemin | `/home/audrey/arcadia-app` |
| Projet Compose | `arcadia` |
| Domaine | `https://arcadia.blobsurf.com` |
| Smoke test | `https://arcadia.blobsurf.com/classe` |

---

## Le flux

```text
push sur main
   -> workflow « CI »            (.github/workflows/ci.yml)
      - lint, build, tests sur base jetable
   -> workflow « Deploy »        (.github/workflows/deploy.yml)
      - déclenché UNIQUEMENT si la CI est verte sur main
   -> ⏸  ATTENTE D'APPROBATION   (environment arcadia-production)
   -> SSH vers le VPS (clé dédiée, StrictHostKeyChecking=yes)
   -> git fetch origin main && git reset --hard origin/main
   -> docker compose build arcadia-web
   -> docker compose up -d arcadia-postgres
   -> pnpm prisma migrate deploy      (dans le conteneur web)
   -> docker compose up -d --build
   -> smoke test public sur https://arcadia.blobsurf.com
   -> si échec : rollback sur le commit précédent
```

Rien ne part en production sans **deux feux verts** : la CI, puis une
approbation humaine.

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
| `ARCADIA_VPS_HOST` | `46.224.144.57` | oui |
| `ARCADIA_VPS_USER` | `audrey` | oui |
| `ARCADIA_VPS_PORT` | `22`, ou le port SSH réel | oui |
| `ARCADIA_VPS_SSH_KEY` | Contenu de la **clé privée** dédiée, en entier | oui |
| `ARCADIA_DEPLOY_PATH` | `/home/audrey/arcadia-app` | oui |
| `ARCADIA_VPS_HOST_KEY` | Clé publique du serveur, pour épingler l'empreinte | recommandé |

**Ne jamais mettre dans les secrets GitHub** : `.env.production`, les secrets de
session, le mot de passe PostgreSQL, ou toute clé privée autre que celle dédiée
au déploiement. Le workflow n'en a pas besoin : les secrets applicatifs vivent
uniquement dans `/home/audrey/arcadia-app/.env.production`, sur le serveur.

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
ssh audrey@46.224.144.57

install -d -m 700 ~/.ssh
cat >> ~/.ssh/authorized_keys   # coller le contenu de arcadia-deploy.pub, puis Ctrl-D
chmod 600 ~/.ssh/authorized_keys
```

Vérifier depuis ta machine que la clé fonctionne **avant** de configurer le
workflow :

```bash
ssh -i ~/.ssh/arcadia-deploy audrey@46.224.144.57 'echo connexion OK'
```

### Épingler la clé hôte (recommandé)

Le workflow accepte deux modes. Sans `ARCADIA_VPS_HOST_KEY`, il découvre la clé
du serveur à la volée avec `ssh-keyscan` : cela fonctionne, mais fait confiance
au réseau lors du premier contact, et le workflow émet un avertissement.

Le mode recommandé épingle l'empreinte :

```bash
ssh-keyscan -p 22 -H 46.224.144.57
```

Comparer l'empreinte obtenue avec celle affichée dans la **console Hetzner**
(ou depuis une session SSH déjà fiable) :

```bash
ssh-keyscan -p 22 46.224.144.57 | ssh-keygen -lf -
```

Si elles correspondent, coller la sortie complète de `ssh-keyscan -H` dans le
secret `ARCADIA_VPS_HOST_KEY`. En cas de différence : **ne pas activer le
déploiement** et investiguer.

---

## Créer l'environnement protégé

C'est le garde-fou qui impose l'approbation humaine. **Sans lui, GitHub crée
l'environment sans règle et le déploiement part tout seul.**

1. `Settings -> Environments -> New environment`
2. Nom exact : **`arcadia-production`**
3. Cocher **Required reviewers** et t'ajouter (au moins une personne)
4. Optionnel mais conseillé : `Deployment branches` → `Selected branches` →
   `main`, pour qu'aucune autre branche ne puisse déployer

Une fois en place, chaque déploiement apparaît en attente dans l'onglet
`Actions`, avec un bouton **Review deployments** pour approuver ou rejeter.

---

## Première mise en place serveur

Le workflow **met à jour** une installation existante : il ne l'installe pas.
La première mise en ligne se fait à la main, en suivant
[`deploiement.md`](deploiement.md). Résumé des prérequis côté serveur :

- [ ] `free -h`, `df -h`, `docker ps` vérifiés (disque de 40 Go partagé avec Blob)
- [ ] Enregistrement Cloudflare `A arcadia -> 46.224.144.57`, nuage gris
- [ ] Modification unique côté Blob appliquée ([`deploy/README.md`](../deploy/README.md))
- [ ] Dépôt cloné dans `/home/audrey/arcadia-app`
- [ ] `.env.production` créé et rempli, en `chmod 600`
- [ ] Stack démarrée, migrations appliquées, compte admin créé
- [ ] `https://arcadia.blobsurf.com` répond en HTTPS

Puis, spécifiquement pour la CI/CD :

- [ ] Le dépôt distant est configuré sur le serveur et `git status` est **propre**
      — le workflow refuse de déployer sur un worktree modifié à la main, pour
      ne pas écraser silencieusement un correctif en cours
- [ ] `git fetch origin main` fonctionne depuis le serveur, sans mot de passe
      (clé de déploiement en lecture seule côté GitHub, ou dépôt public)
- [ ] L'utilisateur `audrey` peut lancer `docker compose` sans `sudo`
      (`docker ps` doit répondre)
- [ ] Les 5 secrets obligatoires sont renseignés
- [ ] L'environment `arcadia-production` existe avec un reviewer requis

> **`ARCADIA_VPS_USER`** : `audrey` est l'utilisateur qui exploite Blob (cron,
> `docker compose`). Confirmer qu'il s'agit bien du même compte avant de le
> mettre dans les secrets. Un utilisateur `deploy` distinct serait plus propre
> à terme, mais il devrait appartenir au groupe `docker` et pouvoir écrire dans
> `/home/audrey/arcadia-app`.

---

## Procédure normale

1. Travailler sur une branche, ouvrir une pull request → la CI tourne dessus.
2. Fusionner dans `main`.
3. La CI retourne sur `main`. Si elle est rouge, **rien ne se déploie**.
4. Le workflow `Deploy` passe en attente : `Actions -> Deploy -> Review deployments`.
5. Approuver. Le déploiement se déroule et se termine par le smoke test.
6. Vérifier `https://arcadia.blobsurf.com/classe` depuis un téléphone.

**Redéploiement manuel** (après un incident, sans nouveau commit) :
`Actions -> Deploy -> Run workflow`, avec une raison. L'approbation reste exigée.

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

## Interdits, et comment ils sont appliqués

| Interdit | Application |
|---|---|
| `prisma migrate dev` en production | Contrôle automatique du script distant avant l'envoi — le workflow échoue si la chaîne apparaît |
| `prisma db push` | idem |
| `pnpm db:seed` en production | idem — écraserait le catalogue réel |
| `docker volume prune` | idem — détruirait `arcadia-pgdata` et les certificats de Blob |
| Déploiement hors `main` | Filtre `branches: [main]` + `Deployment branches` sur l'environment |
| Déploiement sans CI verte | Condition `workflow_run.conclusion == 'success'` |
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
ssh audrey@46.224.144.57
cd /home/audrey/arcadia-app

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
