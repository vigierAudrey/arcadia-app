# PSE Interactif

Socle d'une plateforme pédagogique mobile-first destinée aux élèves de lycée
professionnel et de CAP.

Cette première étape contient uniquement :

- une page élève statique sur `/` ;
- une page d'administration de démonstration sur `/admin` ;
- un manifest PWA, sans service worker ni fonctionnement hors ligne ;
- des données temporaires pour visualiser la future hiérarchie pédagogique.

L'administration n'est pas encore protégée et aucune donnée n'est enregistrée.

## Lancer le projet

```bash
pnpm dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000) pour l'espace
élève et [http://localhost:3000/admin](http://localhost:3000/admin) pour
l'aperçu de l'administration.

## Vérifications

```bash
pnpm lint
pnpm build
```

## Périmètre différé

Prisma, PostgreSQL, l'authentification, IndexedDB, le service worker, Docker et
la gestion réelle des contenus seront traités dans les étapes suivantes après
validation.
