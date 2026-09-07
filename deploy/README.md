# Intégration au Caddy existant — modification unique côté Blob

Le serveur Hetzner héberge déjà la stack **Blob** (`docker-compose.vps.yml`,
projet Compose `blobconnect-vps`). Son conteneur **Caddy détient les ports 80 et
443**. Un second Caddy est donc impossible : ArcadiA doit passer par celui-ci.

Pour éviter un couplage permanent entre les deux projets, on ne met **pas** le
bloc de site ArcadiA dans le Caddyfile de Blob. On rend ce Caddyfile capable de
charger des configurations externes, **une fois pour toutes**.

---

## Les 3 lignes à ajouter côté Blob (opération unique)

Dépôt Blob : `~/dev/blobevolutionClaudeCodex` (sur le serveur :
`/home/<VPS_USER>/blob-app`).

### 1. `docker/Caddyfile` — une ligne, tout à la fin du fichier

```caddyfile
# Configurations de sites externes (projets voisins hébergés sur ce serveur).
# ArcadiA : /home/<VPS_USER>/arcadia-app/deploy/caddy/arcadia.caddy
import /etc/caddy/conf.d/*.caddy
```

> `import` doit être au niveau racine du fichier, **en dehors** de tout bloc de
> site, après le bloc `{$STORAGE_DOMAIN}`.

### 2 et 3. `docker-compose.vps.yml` — deux montages dans le service `caddy`

```yaml
  caddy:
    volumes:
      - ./docker/Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy-data:/data
      # ── Ajouts ArcadiA ──────────────────────────────────────────────────
      # Configuration ArcadiA, en lecture seule : Caddy ne peut pas la modifier.
      - /home/<VPS_USER>/arcadia-app/deploy/caddy:/etc/caddy/conf.d:ro
      # Logs d'accès ArcadiA, persistés sur l'hôte (Caddy doit pouvoir écrire).
      - /home/<VPS_USER>/arcadia-app/logs/caddy:/var/log/caddy
```

### Application

```bash
cd /home/<VPS_USER>/blob-app
install -d -m 755 /home/<VPS_USER>/arcadia-app/logs/caddy

# Contrôle de syntaxe AVANT de toucher au conteneur en production
docker compose -f docker-compose.vps.yml --env-file .env.vps exec caddy \
  caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile

# Le montage de volume impose un recreate (un reload ne suffit pas)
docker compose -f docker-compose.vps.yml --env-file .env.vps up -d caddy
```

---

## Après cette opération, Blob n'est plus jamais modifié

Toute évolution du routage ArcadiA — nouveau sous-domaine, en-têtes, redirections,
mise en maintenance — se fait dans **`deploy/caddy/arcadia.caddy`** de ce dépôt,
suivie d'un simple rechargement :

```bash
docker compose -f docker-compose.vps.yml --env-file .env.vps exec caddy \
  caddy reload --config /etc/caddy/Caddyfile
```

Aucun `git pull`, aucun rebuild et aucune modification du dépôt Blob ne sont
nécessaires. C'est tout l'intérêt de la ligne `import`.

---

## Contraintes imposées par la CI de Blob

Le dépôt Blob possède des garde-fous qui inspectent les Caddyfiles. Les respecter
évite de casser sa CI, et ce sont de bonnes règles en soi :

| Garde-fou | Règle | Conséquence si violée |
|---|---|---|
| `check-caddy-syntax.sh` | `{$VAR}` uniquement, jamais `{env.VAR}` | Panne TLS « subject does not qualify for certificate » (incident réel Blob du 2026-05-25) |
| `guard-caddyfile-xff.sh` | `header_up X-Forwarded-For {remote_host}` | Usurpation d'IP possible → contournement du rate limiting des codes classe |
| `guard-no-nginx-vps.sh` | Caddy est le seul reverse proxy | — |

`deploy/caddy/arcadia.caddy` respecte déjà ces trois règles.

> **Note** : `caddy validate` affiche un avertissement
> « Unnecessary header_up X-Forwarded-For ». Il est attendu et sans gravité :
> Caddy signale que l'en-tête serait transmis de toute façon, mais notre
> directive le **remplace** par l'IP TCP réelle, ce qui est précisément le but
> anti-usurpation. La configuration est validée « Valid configuration ».

---

## Ce que Blob et ArcadiA ne partagent pas

| Ressource | Séparation |
|---|---|
| Base de données | `arcadia-postgres` sur le réseau privé `arcadia` (172.23.0.0/16), volume `arcadia-pgdata`. Invisible depuis Blob. |
| Secrets | `/home/<VPS_USER>/arcadia-app/.env.production`, aucune valeur commune avec `.env.vps`. |
| Dossier serveur | `/home/<VPS_USER>/arcadia-app/` vs `/home/<VPS_USER>/blob-app/`. |
| Volumes | `arcadia-pgdata` vs `pgdata-vps` / `miniodata-vps`. |
| Logs applicatifs | `docker compose -p arcadia logs` + `arcadia-access.log` dédié. |
| Sauvegardes | `/home/<VPS_USER>/backups/arcadia/` vs `/home/<VPS_USER>/backups/blobsurf/`. |
| Projet Compose | `arcadia` vs `blobconnect-vps`. |

Seul point de contact : le service `arcadia-web` est attaché au réseau
`blobconnect-vps_vps` pour être joignable par Caddy. Ce réseau est déclaré
`external: true` dans `docker-compose.production.yml` : un `docker compose down`
d'ArcadiA ne le supprimera jamais.
