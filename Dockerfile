# Dockerfile — ArcadiA (Next.js 16 / pnpm 10 / Node 22)
#
# Image de production pour le déploiement sur le VPS Hetzner, à côté de la
# stack Blob mais totalement séparée (voir docs/deploiement.md).
#
# Trois particularités de ce projet, à ne pas « simplifier » :
#
#   1. `src/generated/prisma` est dans .gitignore : le client Prisma N'EXISTE PAS
#      dans le dépôt cloné. `pnpm db:generate` doit donc tourner AVANT `pnpm build`,
#      sinon le build échoue sur un import introuvable.
#
#   2. `prisma.config.ts` résout `env("DATABASE_URL")` au chargement. Sans cette
#      variable, `prisma generate` s'arrête sur
#      « PrismaConfigEnvError: Cannot resolve environment variable: DATABASE_URL ».
#      On fournit donc une URL FACTICE et INJOIGNABLE au build. Aucune connexion
#      n'est ouverte : toutes les routes sont dynamiques (ƒ), rien n'est prérendu
#      depuis la base. La vraie URL est injectée au runtime par .env.production.
#
#   3. L'image finale conserve les devDependencies. C'est volontaire : le CLI
#      `prisma` est une devDependency et il est indispensable au runtime pour
#      `prisma migrate deploy`. Une image « prod only » rendrait les migrations
#      impossibles depuis le conteneur.
#
# Base glibc (bookworm) et non Alpine : `argon2` fournit des prebuilds
# linux-x64 glibc ET musl, mais glibc reste le chemin le plus éprouvé pour
# Next.js. Aucune compilation native n'est nécessaire.

# ─── Socle commun ─────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS base

# pnpm installé explicitement plutôt que via corepack : corepack matérialise le
# binaire dans le cache de l'utilisateur qui l'exécute, ce qui casse au runtime
# quand le conteneur tourne en utilisateur non-root. Version alignée sur le
# champ packageManager de package.json.
RUN npm install --global pnpm@10.28.2

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# ─── Dépendances ──────────────────────────────────────────────────────────────
FROM base AS deps

# Couche isolée : réinstallée uniquement quand le lockfile change.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ─── Build ────────────────────────────────────────────────────────────────────
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# URL factice : port 1, jamais joignable. Elle satisfait la validation zod de
# src/server/db/prisma.ts et prisma.config.ts sans permettre aucune connexion.
ARG BUILD_DATABASE_URL="postgresql://build:build@127.0.0.1:1/build"
ENV DATABASE_URL=$BUILD_DATABASE_URL

# Ordre impératif : génération du client Prisma, puis build Next.
RUN pnpm db:generate
RUN pnpm build

# ─── Image finale ─────────────────────────────────────────────────────────────
FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Utilisateur non privilégié dédié (l'image node fournit déjà « node » en 1000).
RUN groupadd --system --gid 1001 arcadia \
 && useradd --system --uid 1001 --gid arcadia arcadia

# node_modules complet : nécessaire à `next start` ET au CLI prisma des migrations.
COPY --from=builder /app/node_modules   ./node_modules
COPY --from=builder /app/.next          ./.next
COPY --from=builder /app/public         ./public

# Sources TypeScript. Nécessaires pour DEUX raisons :
#   - src/generated/prisma : le client Prisma, importé par le code applicatif ;
#   - scripts/create-admin.ts et reset-admin.ts importent ../src/server/... et
#     sont exécutés par tsx dans le conteneur (pnpm admin:create). Sans src/,
#     la création du compte administrateur échoue sur un import introuvable.
COPY --from=builder /app/src            ./src

# Nécessaires à `pnpm start`.
COPY --from=builder /app/package.json       ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/next.config.ts     ./next.config.ts
COPY --from=builder /app/tsconfig.json      ./tsconfig.json

# Nécessaires à `prisma migrate deploy` et à `pnpm admin:create` au runtime.
COPY --from=builder /app/prisma            ./prisma
COPY --from=builder /app/prisma.config.ts  ./prisma.config.ts
COPY --from=builder /app/scripts           ./scripts

USER arcadia
EXPOSE 3000

# next start. Le port et l'interface d'écoute viennent des variables ci-dessus.
CMD ["pnpm", "start"]
