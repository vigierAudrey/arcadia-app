---
name: mettre-en-ligne
description: Met les exercices et le code sur arcadia.blobsurf.com de bout en bout — vérifications, enregistrement, déclenchement du déploiement, approbation, lecture du journal, compte rendu. À utiliser dès que l'enseignante demande de « mettre en ligne », « pousser sur le site », « publier » des exercices, ou de déployer.
---

# Mettre en ligne, sans rien demander à l'enseignante

Audrey ne veut pas gérer GitHub : elle a explicitement demandé que l'IA prenne
tout le côté GitHub en charge. Ne jamais lui décrire des clics à faire. Faire, puis
rendre compte en français, sans jargon.

## 1. Vérifier avant d'enregistrer

```bash
pnpm lint && pnpm exec tsc --noEmit
```

Pour tout ajout de contenu pédagogique, contrôler aussi les charges utiles et les
verbes de consigne (script jetable à écrire dans le scratchpad : parcourir
`contentImports`, appeler `parseActivityPayload`, exiger ≥ 4 verbes par séance,
≥ 8 par séquence, dont `Justifier` et `Expliquer`).

## 2. Enregistrer directement sur `main`

Pas de branche, pas de pull request : elle est seule sur le dépôt et chaque étape
en plus lui coûte du temps. Message de commit en français, `Co-Authored-By` inclus.

```bash
git add -A && git commit -F - <<'EOF'
...
EOF
git push origin main
```

## 3. Déclencher le déploiement

`contenus` vaut `simulation` (n'écrit rien, affiche le plan), `appliquer`
(ajoute ce qui manque) ou `ignorer`. Enchaîner simulation puis application quand
le contenu est nouveau ; `appliquer` directement pour un lot déjà vérifié.

```bash
gh workflow run deploy.yml -f reason="<raison>" -f contenus=simulation
```

## 4. Approuver à sa place

L'environnement `arcadia-production` exige une approbation humaine. Le jeton `gh`
est le sien : l'approbation se fait d'ici, elle n'a rien à cliquer.

```bash
RUN=$(gh run list --workflow deploy.yml --limit 1 --json databaseId -q '.[0].databaseId')
gh api -X POST repos/vigierAudrey/arcadia-app/actions/runs/$RUN/pending_deployments \
  -F 'environment_ids[]=21303131448' -f state=approved -f comment="<raison>"
```

## 5. Lire le journal et rendre compte

```bash
gh run watch $RUN --exit-status
gh run view $RUN --log | sed 's/^[^\t]*\t[^\t]*\t//' | grep -A 60 "Exercices :"
```

Contrôles à faire vraiment, jamais supposés :

- la ligne `─── Conteneurs après démarrage ───` doit apparaître : sans elle, le
  script distant s'est arrêté en route (voir l'incident du 2026-09-07 dans
  `docs/ci-cd.md` — ne jamais retirer les `< /dev/null`) ;
- le rapport d'import distingue `+` (créé) et `=` (déjà là, laissé tel quel) ;
- en cas d'échec, rien n'a été écrit : l'import est transactionnel.

Rendre compte en trois lignes : ce qui est en ligne, ce qui a été ignoré parce que
déjà présent, ce qui reste à valider par elle. Ne jamais annoncer « c'est en
ligne » sans avoir lu le journal.

## Ne jamais faire

- `pnpm db:seed` sur la base en ligne — il écraserait le catalogue réel.
- Modifier ou republier un contenu existant : l'import ne fait qu'ajouter.
- Annoncer un succès sur la foi d'un « success » vert : ce vert a déjà menti
  (incident du 2026-09-07).
