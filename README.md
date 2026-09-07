# ArcadiA

Socle d'une plateforme pédagogique mobile-first destinée aux élèves de lycée
professionnel et de CAP.

Le projet contient actuellement :

- un accès élève par code classe sur `/`, puis l'espace classe sur `/classe` ;
- une administration du catalogue authentifiée sur `/admin` ;
- un manifest PWA, sans service worker ni fonctionnement hors ligne ;
- un catalogue pédagogique stocké dans PostgreSQL via Prisma.

L'administration est protégée par une authentification argon2 avec sessions et
limitation des tentatives en base. L'accès élève repose sur des codes classe
hachés, avec sessions et limitation des tentatives par IP. Les deux systèmes
utilisent des secrets distincts et ne partagent jamais de clé.

## Préparer l'environnement local

Copier `.env.example` vers `.env`, puis remplacer le mot de passe de
développement dans les deux variables concernées. Ensuite :

```bash
pnpm install
pnpm db:start
pnpm db:migrate
pnpm db:seed
```

Le conteneur PostgreSQL est réservé au développement de ce projet. Il utilise
le port `127.0.0.1:5433`, un réseau et un volume Docker dédiés.

Créer ensuite un compte administrateur :

```bash
pnpm admin:create
```

## Lancer l'application

```bash
pnpm dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000) pour l'espace
élève et [http://localhost:3000/admin](http://localhost:3000/admin) pour
l'aperçu de l'administration.

## Vérifications

```bash
pnpm test
pnpm lint
pnpm build
```

## Modèle pédagogique

```text
Formation → Niveau → Classe → Enseignement → Séquence → Séance → Activité
```

Les séquences peuvent être en brouillon, verrouillées ou ouvertes. Les séances
peuvent être en brouillon ou publiées. Le futur sommaire est généré directement
depuis cette hiérarchie ordonnée, sans table dédiée. Les activités sont
rattachées à une séance et conservent un type textuel et un payload JSON
versionné afin de pouvoir ajouter de nouveaux moteurs progressivement.

## Déploiement

La production tourne sur un VPS Hetzner mutualisé avec le projet Blob, en
Docker Compose, derrière le Caddy déjà en place. Les deux projets sont séparés :
dossier, projet Compose, réseau, volume, base, secrets, logs et sauvegardes.

| Fichier | Rôle |
|---|---|
| [`Dockerfile`](Dockerfile) | Image de production Node 22 / pnpm 10 / Next 16 |
| [`docker-compose.production.yml`](docker-compose.production.yml) | Stack `arcadia` : web + PostgreSQL 16 |
| [`.env.production.example`](.env.production.example) | Variables de production, sans aucun secret |
| [`deploy/caddy/arcadia.caddy`](deploy/caddy/arcadia.caddy) | Bloc de site `arcadia.blobsurf.com` |
| [`deploy/README.md`](deploy/README.md) | L'unique modification à faire côté Blob |
| [`scripts/backup-arcadia-pg.sh`](scripts/backup-arcadia-pg.sh) | Dump PostgreSQL validé, avec rotation, isolé de celui de Blob |
| [`docs/deploiement.md`](docs/deploiement.md) | Checklist complète de première mise en ligne |
| [`.github/workflows/`](.github/workflows/) | CI (lint, build, tests) et déploiement continu |
| [`docs/ci-cd.md`](docs/ci-cd.md) | Secrets, clé SSH, environnement protégé, procédure de déploiement |

URL publique prévue : `https://arcadia.blobsurf.com`.
URL stable pour les élèves, utilisable en QR code :
`https://arcadia.blobsurf.com/classe`.

Deux pièges propres à ce projet, détaillés dans les fichiers concernés :

- `src/generated/prisma` est ignoré par Git — `pnpm db:generate` doit tourner
  avant `pnpm build` sur toute machine fraîchement clonée ;
- `prisma.config.ts` exige `DATABASE_URL` dès la génération du client, y compris
  au moment du build.

## Périmètre différé

L'édition des activités, IndexedDB, le service worker et le mode hors ligne
restent différés.
