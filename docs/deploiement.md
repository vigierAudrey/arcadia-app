# Déploiement d'ArcadiA — VPS Hetzner, Cloudflare, Caddy, Docker Compose

Procédure complète de mise en ligne sur `https://arcadia.blobsurf.com`.

## Infrastructure cible

| | Valeur |
|---|---|
| Serveur | `<VPS_HOSTNAME>` — Hetzner Cloud |
| Région | `eu-central`, Nuremberg |
| Architecture | x86 |
| Disque | 40 Go |
| IPv4 publique | `<VPS_PUBLIC_IP>` |
| Domaine | `blobsurf.com` (zone DNS chez **Cloudflare**) |
| Sous-domaine ArcadiA | `arcadia.blobsurf.com` |
| URL élèves (QR code) | `https://arcadia.blobsurf.com/classe` |

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

> **Deux remarques factuelles sur la fiche serveur.**
>
> L'offre notée « CX23 » n'existe pas au catalogue Hetzner (la gamme est
> CX22 / CX32 / CX42 / CX52). Les 40 Go de disque correspondent exactement au
> **CX22 : 2 vCPU, 4 Go de RAM, 40 Go**. C'est l'hypothèse retenue ici, et elle
> rend l'étape 1 (`free -h`) réellement importante : 4 Go partagés avec toute la
> stack Blob, c'est juste pour un build Next.
>
> L'IPv4 est bien un serveur Hetzner — le reverse DNS renvoie
> `static.57.144.224.46.clients.your-server.de` (`your-server.de` = Hetzner).
> Vérifier tout de même l'IP dans la console Hetzner avant de créer
> l'enregistrement DNS : une adresse erronée pointerait `arcadia.blobsurf.com`
> vers la machine de quelqu'un d'autre.

---

**Contexte** : le VPS Hetzner héberge déjà la stack **Blob**
(`blobconnect-vps`), dont le conteneur **Caddy détient les ports 80/443**.
ArcadiA s'installe à côté, dans un projet Docker Compose entièrement séparé, et
emprunte uniquement ce Caddy. Voir [`deploy/README.md`](../deploy/README.md) pour
l'unique modification à faire côté Blob.

| | Blob | ArcadiA |
|---|---|---|
| Dossier | `/home/<VPS_USER>/blob-app` | `/home/<VPS_USER>/arcadia-app` |
| Projet Compose | `blobconnect-vps` | `arcadia` |
| Sous-réseau | `172.21.0.0/16` | `172.23.0.0/16` |
| Base | `pgdata-vps` (PostGIS 15) | `arcadia-pgdata` (PostgreSQL 16) |
| Secrets | `.env.vps` | `.env.production` |
| Sauvegardes | `~/backups/blobsurf/` | `~/backups/arcadia/` |
| Domaines | `blobsurf.com`, `api.`, `storage.` | `arcadia.blobsurf.com` |

---

## 0. Préparation locale (avant de toucher au serveur)

- [ ] Le dépôt a un remote : `git remote -v` ne doit plus être vide.
      Créer un dépôt **privé** (il contient la structure pédagogique) et pousser.
- [ ] Vérifier qu'aucun secret ne part : `git status --porcelain | grep -i env`
      ne doit montrer que `.env.production.example`.
- [ ] Le build passe : `pnpm lint && pnpm test && pnpm build`.

---

## 1. Vérifications serveur

```bash
ssh <VPS_USER>@<VPS_PUBLIC_IP>

free -h      # ≥ ~2 Go disponibles : le build Next fait un typecheck de ~75 s
df -h        # ≥ ~8 Go libres : image ~1,5 Go + cache de build + volume PostgreSQL
docker ps    # la stack Blob doit être saine avant d'ajouter quoi que ce soit
```

> **Le disque de 40 Go est le point de tension.** Blob y stocke déjà ses images
> Docker, son volume PostgreSQL/PostGIS et son volume MinIO (les médias). Si
> `df -h` montre moins de 8 Go libres, faire d'abord le ménage côté images
> inutilisées — `docker image prune` (**jamais** `docker system prune --volumes`,
> qui détruirait les données et les certificats Let's Encrypt).
>
> **Taille de l'image : ~1,5 Go.** Elle conserve volontairement les
> devDependencies, indispensables au runtime pour `prisma migrate deploy` et
> `pnpm admin:create` (voir les commentaires du [`Dockerfile`](../Dockerfile)).
> Si le disque devient contraint, la piste d'optimisation est
> `output: "standalone"` dans `next.config.ts` avec une image d'outillage
> séparée pour les migrations — à ne faire qu'après une mise en ligne stable.

> **Si la RAM disponible est insuffisante**, ne pas builder sur le serveur :
> soit ajouter du swap, soit agrandir l'instance chez Hetzner, soit construire
> l'image ailleurs et la pousser sur un registre. Un build qui déclenche l'OOM
> killer pendant que Blob tourne peut faire tomber Blob.

Vérifier aussi que le port hôte 3000 est libre (Blob n'expose rien) et que le
réseau attendu existe :

```bash
docker network ls | grep blobconnect-vps_vps
```

---

## 2. DNS — dans **Cloudflare**, pas dans la zone OVH

`blobsurf.com` est délégué à Cloudflare (`ines.ns.cloudflare.com`,
`cleo.ns.cloudflare.com`). OVH est le registrar, mais **la zone DNS active est
chez Cloudflare** : un enregistrement créé côté OVH n'aurait aucun effet.

- [ ] Cloudflare → zone `blobsurf.com` → **Add record**
  - Type : `A`
  - Name : `arcadia`
  - IPv4 : `<VPS_PUBLIC_IP>`
  - Proxy status : **DNS only (nuage gris)** pour le premier déploiement
  - TTL : Auto
- [ ] Vérifier la propagation :

```bash
getent hosts arcadia.blobsurf.com
```

> **Pourquoi « nuage gris » d'abord** : en mode proxy, l'IP renvoyée est celle de
> Cloudflare, ce qui masque toute erreur d'origine et complique le diagnostic si
> le certificat ne s'émet pas. Une fois le site en HTTPS et vérifié, le passage
> en « nuage orange » se fait en un clic (Blob fonctionne déjà ainsi).

---

## 3. Modification unique côté Blob

Suivre [`deploy/README.md`](../deploy/README.md) : ligne `import` dans
`docker/Caddyfile`, deux montages dans le service `caddy`, `caddy validate`, puis
`up -d caddy`.

- [ ] `install -d -m 755 /home/<VPS_USER>/arcadia-app/logs/caddy`
- [ ] `caddy validate` retourne « Valid configuration »
- [ ] `https://blobsurf.com` répond toujours après le recreate

---

## 4. Installation d'ArcadiA

```bash
# Alias SSH « github-arcadia », et non « github.com » : le serveur porte déjà une
# clé pour le dépôt de Blob, et GitHub identifie le dépôt par la clé présentée.
# L'alias est défini dans ~/.ssh/config du serveur et pointe sur ~/.ssh/arcadia-deploy.
# Prérequis : la deploy key « arcadia-vps-readonly » est enregistrée côté GitHub.
git clone git@github-arcadia:vigierAudrey/arcadia-app.git /home/<VPS_USER>/arcadia-app
cd /home/<VPS_USER>/arcadia-app

cp .env.production.example .env.production
chmod 600 .env.production
```

Générer les secrets, **un par un**, et les coller dans `.env.production` :

```bash
openssl rand -base64 48    # -> ADMIN_SESSION_SECRET
openssl rand -base64 48    # -> CLASS_SESSION_SECRET  (différent !)
openssl rand -base64 32    # -> POSTGRES_PASSWORD
```

- [ ] `POSTGRES_PASSWORD` reporté à l'identique dans `DATABASE_URL`
- [ ] L'hôte dans `DATABASE_URL` est bien `arcadia-postgres` (pas `postgres`)
- [ ] `ADMIN_SESSION_SECRET` ≠ `CLASS_SESSION_SECRET`
- [ ] Plus aucun `<PLACEHOLDER_` dans le fichier :
      `grep -c PLACEHOLDER .env.production` doit renvoyer `0`

> ⚠️ `CLASS_SESSION_SECRET` sert d'HMAC aux **codes classe**. Le modifier plus
> tard invalide tous les codes déjà distribués aux élèves. On le fixe une fois.

---

## 5. Démarrage de la stack

```bash
cd /home/<VPS_USER>/arcadia-app

docker compose -f docker-compose.production.yml --env-file .env.production up -d --build
docker compose -f docker-compose.production.yml --env-file .env.production ps
```

Le build enchaîne `pnpm db:generate` puis `pnpm build` — dans cet ordre, car
`src/generated/prisma` est absent du dépôt cloné.

---

## 6. Migrations Prisma

```bash
docker compose -f docker-compose.production.yml --env-file .env.production \
  run --rm arcadia-web pnpm prisma migrate deploy
```

- [ ] Les 7 migrations s'appliquent sans erreur

> **Jamais** `prisma migrate dev` (il peut proposer de réinitialiser la base) ni
> `prisma db push --accept-data-loss`.
>
> **Ne pas seeder.** `prisma/seed.ts` crée un catalogue de démonstration. Les
> vraies données se saisissent depuis `/admin`, et les exercices écrits dans le
> dépôt arrivent par `pnpm pse:import` — ajout seul, jamais d'écrasement, voir
> [`mettre-des-exercices-en-ligne.md`](mettre-des-exercices-en-ligne.md).

---

## 7. Création du compte administrateur

```bash
docker compose -f docker-compose.production.yml --env-file .env.production \
  run --rm arcadia-web pnpm admin:create
```

La commande **demande le login et le mot de passe de façon interactive**, avec la
saisie masquée, et refuse de s'exécuter sans terminal. `docker compose run`
alloue un TTY par défaut : ne pas ajouter l'option `-T`.

Le mot de passe est haché en argon2. En cas d'oubli :

```bash
docker compose -f docker-compose.production.yml --env-file .env.production \
  run --rm arcadia-web pnpm admin:reset
```

---

## 8. Vérification HTTPS

```bash
curl -I https://arcadia.blobsurf.com
```

Attendu : `HTTP/2 200`, certificat Let's Encrypt valide, en-tête
`strict-transport-security` présent, en-tête `server` absent.

En cas d'échec du certificat :

```bash
cd /home/<VPS_USER>/blob-app
docker compose -f docker-compose.vps.yml --env-file .env.vps logs caddy --tail=80
```

Causes fréquentes : DNS pas encore propagé, port 80 fermé (ACME HTTP-01 en a
besoin), ou enregistrement Cloudflare en mode proxy dès le départ.

- [ ] `https://blobsurf.com` et `https://api.blobsurf.com` répondent toujours

---

## 9. Vérification de l'accès élève

- [ ] `https://arcadia.blobsurf.com/classe` **redirige vers `/`** quand aucune
      session n'existe — comportement normal imposé par [`src/proxy.ts`](../src/proxy.ts)
- [ ] `/` affiche « Entre ton code classe »
- [ ] Créer un code classe depuis `/admin`, le saisir : arrivée sur l'espace
      classe avec les enseignements (PSE, maths appliquées, bloc 2…)
- [ ] Dans l'inspecteur, le cookie de session porte `Secure` et `HttpOnly`
      (preuve que `NODE_ENV=production` est bien pris en compte)
- [ ] `https://arcadia.blobsurf.com/admin` redirige vers `/admin/login`
- [ ] Tester depuis un téléphone en 4G, pas seulement en Wi-Fi de l'établissement

---

## 10. QR code pour les élèves

**URL stable : `https://arcadia.blobsurf.com/classe`**

C'est le bon choix, et pour une raison précise : un élève sans session est
renvoyé automatiquement vers la saisie du code, tandis qu'un élève déjà connecté
retombe **directement dans sa classe**. Le même QR code sert donc toute l'année,
avant et après la saisie du code.

```bash
sudo apt install qrencode

# SVG vectoriel — pour une impression nette en grand format
qrencode -o arcadia-classe.svg -t SVG -l M "https://arcadia.blobsurf.com/classe"

# PNG 800 px avec marge — pour une projection ou un document
qrencode -o arcadia-classe.png -s 12 -m 4 -l M "https://arcadia.blobsurf.com/classe"
```

Niveau de correction `M` : bon compromis pour une affiche plastifiée.

Sur l'affiche, faire figurer **aussi l'URL en toutes lettres** : certains
téléphones d'établissement bloquent l'appareil photo, et un élève doit pouvoir
la taper à la main.

---

## 11. Sauvegarde PostgreSQL séparée

Le script [`scripts/backup-arcadia-pg.sh`](../scripts/backup-arcadia-pg.sh) fait
le dump, le valide et le fait tourner. Il est indépendant de la sauvegarde de
Blob : autre dossier, autre préfixe, autre ligne de cron.

**Tout l'état d'ArcadiA tient dans PostgreSQL** — aucun téléversement, aucun
stockage fichier, `public/` ne contient qu'une icône. Ce dump protège donc 100 %
des données : catalogue, comptes, codes classe, traçabilité pédagogique.

### Préparation

```bash
install -d -m 700 /home/<VPS_USER>/backups/arcadia
install -d -m 700 /home/<VPS_USER>/backups/arcadia/pg
install -d -m 755 /home/<VPS_USER>/backups/arcadia/logs
```

### Premier essai

```bash
cd /home/<VPS_USER>/arcadia-app

# Affiche ce qui serait fait, sans rien écrire ni supprimer
./scripts/backup-arcadia-pg.sh --dry-run

# Sauvegarde réelle
./scripts/backup-arcadia-pg.sh
```

Ce que le script garantit, et pourquoi :

| Garde-fou | Raison |
|---|---|
| Écriture dans un `.partial` puis `mv` atomique | Un dump interrompu ne remplace jamais un dump valide |
| Refus si la taille est sous `BACKUP_MIN_BYTES` | Un dump vide qui écrase le précédent est pire que pas de dump |
| Vérification de l'en-tête `PGDMP` | Détecte un fichier tronqué ou un message d'erreur capturé à la place du dump |
| `pg_restore --list` dans un conteneur jetable, **même image** que la base | Prouve que la table des matières est lisible, sans écart de version de format |
| Dumps en `600` dans un dossier `700` | Le dump contient les hachages de mots de passe et de codes classe |
| Aucun mot de passe en ligne de commande | `pg_dump` tourne dans le conteneur via la socket Unix locale |
| Rotation limitée au préfixe `arcadia_*` | Ne peut jamais supprimer un fichier d'un autre projet |
| `last-backup.json` sans aucun secret | État consultable, et exploitable plus tard par une supervision |

### Automatisation

`crontab -e` (utilisateur `<VPS_USER>`) :

```cron
# ArcadiA — dump PostgreSQL quotidien 3h30 UTC
# Décalé de 30 min par rapport au backup Blob de 3h00 pour ne pas charger
# le disque et le CPU en même temps.
30 3 * * * /home/<VPS_USER>/arcadia-app/scripts/backup-arcadia-pg.sh >> /home/<VPS_USER>/backups/arcadia/logs/backup-pg.log 2>&1
```

Variables surchargeables : `ENV_FILE`, `BACKUP_DIR`, `BACKUP_STATE_FILE`,
`ARCADIA_PG_CONTAINER`, `BACKUP_RETENTION_DAYS` (défaut 14), `BACKUP_MIN_BYTES`.

`ENV_FILE` vaut par défaut `$HOME/arcadia-app/.env.production`, comme
`BACKUP_DIR` et `BACKUP_STATE_FILE` qui reposent déjà sur `$HOME`. Le script
doit donc tourner sous le compte propriétaire de l'installation — ce que fait
la ligne de cron ci-dessus. Sous un autre compte (ou via `sudo` sans `-H`),
passer `ENV_FILE` explicitement.

### Restauration

```bash
docker exec -i arcadia-postgres \
  pg_restore -U arcadia -d arcadia --clean --if-exists \
  < /home/<VPS_USER>/backups/arcadia/pg/arcadia_<horodatage>.dump
```

- [ ] `--dry-run` affiche les bons chemins
- [ ] Un dump réel a réussi, `last-backup.json` indique `"status": "ok"`
- [ ] La ligne de cron est installée
- [ ] **Une restauration a été testée au moins une fois** — une sauvegarde
      jamais restaurée n'est pas une sauvegarde

> Les scripts de Blob vont plus loin (chiffrement `age`, upload Cloudflare R2,
> rotation distante, test de restore hebdomadaire). Ils sont paramétrables par
> `ENV_FILE`, `BACKUP_DIR`, `BACKUP_PREFIX` et pourront être branchés sur
> ArcadiA une fois la mise en ligne stabilisée. Tant que ce n'est pas fait, les
> dumps ArcadiA vivent **uniquement sur le serveur** : une panne disque les
> emporterait avec la base. Prévoir au minimum une copie manuelle périodique.

---

## Exploitation courante

```bash
cd /home/<VPS_USER>/arcadia-app
alias adc='docker compose -f docker-compose.production.yml --env-file .env.production'

adc ps                       # état des services
adc logs arcadia-web --tail=100
adc logs arcadia-postgres --tail=50
adc restart arcadia-web
```

Logs d'accès HTTP dédiés (sur l'hôte, hors conteneur) :

```bash
tail -f /home/<VPS_USER>/arcadia-app/logs/caddy/arcadia-access.log
```

Inspecter la base sans jamais l'exposer — `arcadia-postgres` n'est résolvable
que depuis le réseau Docker, donc on ouvre `psql` **dans** le conteneur :

```bash
docker exec -it arcadia-postgres psql -U arcadia -d arcadia
```

### Mise à jour du code

```bash
cd /home/<VPS_USER>/arcadia-app
git pull
adc up -d --build
adc run --rm arcadia-web pnpm prisma migrate deploy
```

### Changement de config Caddy

Modifier `deploy/caddy/arcadia.caddy`, `git pull`, puis :

```bash
cd /home/<VPS_USER>/blob-app
docker compose -f docker-compose.vps.yml --env-file .env.vps exec caddy \
  caddy reload --config /etc/caddy/Caddyfile
```

Aucune modification du dépôt Blob n'est nécessaire.

---

## Interdits en production

Repris de la doctrine Blob, applicables tels quels :

- Aucun secret dans le dépôt.
- Aucun `prisma db push --accept-data-loss`, aucun `prisma migrate dev`.
- Aucun `docker volume prune` ni `docker system prune --volumes` : cela
  détruirait `arcadia-pgdata` **et** les volumes de Blob, dont les certificats
  Let's Encrypt (réémission limitée à 5 par semaine et par domaine).
- Aucun `docker compose down` sur la stack Blob sans plan de maintenance.
- Aucun déploiement depuis une branche autre que `main`.

---

## Ensuite : automatiser les mises à jour

Cette procédure est la **première mise en ligne**, entièrement manuelle depuis
le serveur. Les déploiements suivants passent par GitHub Actions, mais restent
déclenchés à la main : `Actions -> Deploy -> Run workflow` → (approbation si
des required reviewers sont configurés) → SSH → migrations → smoke test →
rollback si besoin. Une CI verte ne déclenche jamais de déploiement toute
seule. Mise en place et exploitation dans [`ci-cd.md`](ci-cd.md).

---

## Étapes différées (volontairement hors périmètre)

- Chiffrement `age` et externalisation des sauvegardes vers Cloudflare R2.
- Supervision UptimeRobot sur `https://arcadia.blobsurf.com`.
- Passage de l'enregistrement Cloudflare en mode proxy.
