#!/usr/bin/env bash
# scripts/backup-arcadia-pg.sh — Sauvegarde PostgreSQL d'ArcadiA
#
# Dump quotidien de la base ArcadiA, isolé de la sauvegarde de Blob
# (~/backups/blobsurf/). Reprend les garde-fous éprouvés côté Blob :
# fail-fast si le dump est vide ou trop petit, écriture atomique, permissions
# restrictives, rotation, fichier d'état lisible sans secret.
#
# TOUT l'état d'ArcadiA tient dans PostgreSQL : aucun téléversement, aucun
# stockage fichier, public/ ne contient qu'une icône. Ce dump protège donc
# 100 % des données (catalogue, comptes, codes classe, traçabilité pédagogique).
#
# Aucun mot de passe n'est manipulé : pg_dump s'exécute DANS le conteneur, via
# la socket Unix locale, que l'image postgres officielle autorise en « trust ».
# Rien ne transite par la ligne de commande ni par les logs.
#
# Usage :
#   ./scripts/backup-arcadia-pg.sh
#   ./scripts/backup-arcadia-pg.sh --dry-run
#
# Variables surchargeables :
#   ENV_FILE               défaut $HOME/arcadia-app/.env.production
#   BACKUP_DIR             défaut $HOME/backups/arcadia/pg
#   BACKUP_STATE_FILE      défaut $HOME/backups/arcadia/last-backup.json
#   ARCADIA_PG_CONTAINER   défaut arcadia-postgres
#   BACKUP_RETENTION_DAYS  défaut 14
#   BACKUP_MIN_BYTES       défaut 1024
#
# Cron (voir docs/deploiement.md) :
#   30 3 * * * /home/<VPS_USER>/arcadia-app/scripts/backup-arcadia-pg.sh >> /home/<VPS_USER>/backups/arcadia/logs/backup-pg.log 2>&1

set -euo pipefail

ENV_FILE="${ENV_FILE:-$HOME/arcadia-app/.env.production}"
BACKUP_DIR="${BACKUP_DIR:-$HOME/backups/arcadia/pg}"
BACKUP_STATE_FILE="${BACKUP_STATE_FILE:-$HOME/backups/arcadia/last-backup.json}"
ARCADIA_PG_CONTAINER="${ARCADIA_PG_CONTAINER:-arcadia-postgres}"
BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-14}"
BACKUP_MIN_BYTES="${BACKUP_MIN_BYTES:-1024}"
BACKUP_PREFIX="${BACKUP_PREFIX:-arcadia}"

DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

log() { echo "$(date -u '+%Y-%m-%dT%H:%M:%SZ') [backup-arcadia] $*"; }

# Écrit un état lisible par un humain ou un futur superviseur.
# Ne contient AUCUN secret : ni mot de passe, ni DATABASE_URL.
write_state() {
  local status="$1" message="$2" file="${3:-}" size="${4:-0}"
  [ "$DRY_RUN" -eq 1 ] && return 0
  mkdir -p "$(dirname "$BACKUP_STATE_FILE")"
  cat > "$BACKUP_STATE_FILE" <<JSON
{
  "project": "arcadia",
  "status": "$status",
  "finishedAt": "$(date -u '+%Y-%m-%dT%H:%M:%SZ')",
  "message": "$message",
  "file": "$file",
  "sizeBytes": $size
}
JSON
  chmod 644 "$BACKUP_STATE_FILE"
}

fail() {
  log "ERREUR: $*"
  write_state "failed" "$1"
  exit 1
}

# ── 1. Contexte ───────────────────────────────────────────────────────────────

[ -f "$ENV_FILE" ] || fail "ENV_FILE introuvable: $ENV_FILE"

# Extraction ciblée : le fichier n'est JAMAIS sourcé en entier, pour ne pas
# charger les secrets de session dans l'environnement de ce script.
read_env() {
  grep -E "^$1=" "$ENV_FILE" | tail -n 1 | cut -d= -f2- | tr -d "\"'" || true
}

PG_USER="$(read_env POSTGRES_USER)"
PG_DB="$(read_env POSTGRES_DB)"
: "${PG_USER:=arcadia}"
: "${PG_DB:=arcadia}"

command -v docker >/dev/null 2>&1 || fail "docker introuvable dans le PATH"

docker inspect --format '{{.State.Running}}' "$ARCADIA_PG_CONTAINER" 2>/dev/null \
  | grep -q true || fail "conteneur $ARCADIA_PG_CONTAINER absent ou arrêté"

# ── 2. Préparation ────────────────────────────────────────────────────────────

STAMP="$(date -u '+%Y%m%dT%H%M%SZ')"
TARGET="$BACKUP_DIR/${BACKUP_PREFIX}_${STAMP}.dump"
TMP="$TARGET.partial"

if [ "$DRY_RUN" -eq 1 ]; then
  log "DRY-RUN — aucune écriture, aucune suppression"
  log "  conteneur      : $ARCADIA_PG_CONTAINER"
  log "  base / rôle    : $PG_DB / $PG_USER"
  log "  destination    : $TARGET"
  log "  rétention      : $BACKUP_RETENTION_DAYS jours"
  exit 0
fi

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"

cleanup() { rm -f "$TMP"; }
trap cleanup EXIT

# ── 3. Dump ───────────────────────────────────────────────────────────────────
# Format custom : compressé, et restaurable sélectivement avec pg_restore.

log "dump de $PG_DB depuis $ARCADIA_PG_CONTAINER"

docker exec "$ARCADIA_PG_CONTAINER" \
  pg_dump -U "$PG_USER" -d "$PG_DB" --format=custom --no-owner --no-privileges \
  > "$TMP" || fail "pg_dump a échoué"

# ── 4. Validation avant publication ───────────────────────────────────────────
# Un dump tronqué qui écraserait le précédent serait pire que pas de dump.

SIZE="$(stat -c %s "$TMP")"
[ "$SIZE" -ge "$BACKUP_MIN_BYTES" ] \
  || fail "dump suspect: $SIZE octets (< $BACKUP_MIN_BYTES)"

# En-tête du format custom PostgreSQL : détecte immédiatement un fichier vide,
# tronqué ou remplacé par un message d'erreur.
head -c 5 "$TMP" | grep -q '^PGDMP' || fail "dump sans en-tête PGDMP (tronqué ?)"

# Vérification d'intégrité réelle : la table des matières doit être lisible.
# pg_restore ne sait pas lire un flux non-seekable, donc pas de « docker exec -i » :
# on monte le dossier en lecture seule dans un conteneur jetable, avec la MÊME
# image que la base pour éviter tout écart de version de format.
PG_IMAGE="$(docker inspect --format '{{.Config.Image}}' "$ARCADIA_PG_CONTAINER")"
docker run --rm -v "$BACKUP_DIR:/backup:ro" "$PG_IMAGE" \
  pg_restore --list "/backup/$(basename "$TMP")" >/dev/null 2>&1 \
  || fail "dump illisible par pg_restore --list"

# Publication atomique : le fichier final n'apparaît que complet et validé.
mv "$TMP" "$TARGET"
chmod 600 "$TARGET"
trap - EXIT

log "OK $TARGET ($SIZE octets)"

# ── 5. Rotation ───────────────────────────────────────────────────────────────
# Ne touche QUE les fichiers de ce préfixe, jamais un autre projet.

DELETED="$(find "$BACKUP_DIR" -maxdepth 1 -name "${BACKUP_PREFIX}_*.dump" \
  -mtime "+$BACKUP_RETENTION_DAYS" -print -delete | wc -l)"
log "rotation: $DELETED fichier(s) de plus de $BACKUP_RETENTION_DAYS jours supprimé(s)"

write_state "ok" "dump réussi" "$TARGET" "$SIZE"
log "terminé"
