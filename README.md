# PSE Interactif

Socle d'une plateforme pédagogique mobile-first destinée aux élèves de lycée
professionnel et de CAP.

Le projet contient actuellement :

- une page élève statique sur `/` ;
- une page d'administration en lecture seule sur `/admin` ;
- un manifest PWA, sans service worker ni fonctionnement hors ligne ;
- un catalogue pédagogique stocké dans PostgreSQL local via Prisma.

L'administration n'est pas encore protégée et aucune action de l'interface
n'écrit dans la base.

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
Formation → Niveau → Classe → Enseignement → Séquence → Activité
```

Les séquences peuvent être en brouillon, verrouillées ou ouvertes. Les
activités utilisent un type textuel et un payload JSON versionné, validé par le
code applicatif afin de pouvoir ajouter de nouveaux moteurs progressivement.

## Périmètre différé

L'authentification, les codes classe, l'édition des contenus, IndexedDB, le
service worker, le mode hors ligne et le déploiement restent différés.
