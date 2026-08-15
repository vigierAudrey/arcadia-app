# PSE Interactif

Socle d'une plateforme pédagogique mobile-first destinée aux élèves de lycée
professionnel et de CAP.

Le projet contient actuellement :

- une page élève statique sur `/` ;
- une page d'administration du catalogue sur `/admin` ;
- un manifest PWA, sans service worker ni fonctionnement hors ligne ;
- un catalogue pédagogique stocké dans PostgreSQL local via Prisma.

L'administration n'est pas encore authentifiée. Ses écritures sont disponibles
en développement local et volontairement bloquées en production jusqu'à
l'ajout de la protection administrateur.

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
Formation → Niveau → Classe → Enseignement → Séquence → Séance → Activité
```

Les séquences peuvent être en brouillon, verrouillées ou ouvertes. Les séances
peuvent être en brouillon ou publiées. Le futur sommaire est généré directement
depuis cette hiérarchie ordonnée, sans table dédiée. Les activités sont
rattachées à une séance et conservent un type textuel et un payload JSON
versionné afin de pouvoir ajouter de nouveaux moteurs progressivement.

## Périmètre différé

L'authentification, les codes classe, l'édition des activités, IndexedDB, le
service worker, le mode hors ligne et le déploiement restent différés.
