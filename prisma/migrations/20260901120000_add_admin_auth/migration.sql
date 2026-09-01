-- CreateTable
CREATE TABLE "AdminUser" (
    "id" UUID NOT NULL,
    "login" VARCHAR(100) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" UUID NOT NULL,
    "adminUserId" UUID NOT NULL,
    "tokenHash" CHAR(64) NOT NULL,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "revokedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminLoginRateLimit" (
    "keyHash" CHAR(64) NOT NULL,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "windowStartedAt" TIMESTAMPTZ(3) NOT NULL,
    "blockedUntil" TIMESTAMPTZ(3),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AdminLoginRateLimit_pkey" PRIMARY KEY ("keyHash")
);

-- Enforce the single-admin V1 invariant even under concurrent CLI runs.
CREATE UNIQUE INDEX "AdminUser_singleton_key" ON "AdminUser" ((true));
CREATE UNIQUE INDEX "AdminUser_login_key" ON "AdminUser"("login");
CREATE UNIQUE INDEX "AdminSession_tokenHash_key" ON "AdminSession"("tokenHash");
CREATE INDEX "AdminSession_adminUserId_expiresAt_idx" ON "AdminSession"("adminUserId", "expiresAt");
CREATE INDEX "AdminSession_expiresAt_revokedAt_idx" ON "AdminSession"("expiresAt", "revokedAt");
CREATE INDEX "AdminLoginRateLimit_updatedAt_idx" ON "AdminLoginRateLimit"("updatedAt");

ALTER TABLE "AdminSession"
ADD CONSTRAINT "AdminSession_adminUserId_fkey"
FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AdminLoginRateLimit"
ADD CONSTRAINT "AdminLoginRateLimit_attemptCount_nonnegative"
CHECK ("attemptCount" >= 0);

ALTER TABLE "AdminUser"
ADD CONSTRAINT "AdminUser_login_not_blank"
CHECK (length(btrim("login")) > 0);
