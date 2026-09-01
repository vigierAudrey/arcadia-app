-- CreateTable
CREATE TABLE "ClassAccessCode" (
    "id" UUID NOT NULL,
    "classroomId" UUID NOT NULL,
    "codeHash" CHAR(64) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ClassAccessCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassSession" (
    "id" UUID NOT NULL,
    "classroomId" UUID NOT NULL,
    "tokenHash" CHAR(64) NOT NULL,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "revokedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassCodeRateLimit" (
    "keyHash" CHAR(64) NOT NULL,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "windowStartedAt" TIMESTAMPTZ(3) NOT NULL,
    "blockedUntil" TIMESTAMPTZ(3),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ClassCodeRateLimit_pkey" PRIMARY KEY ("keyHash")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassAccessCode_classroomId_key" ON "ClassAccessCode"("classroomId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassAccessCode_codeHash_key" ON "ClassAccessCode"("codeHash");

-- CreateIndex
CREATE INDEX "ClassAccessCode_active_idx" ON "ClassAccessCode"("active");

-- CreateIndex
CREATE UNIQUE INDEX "ClassSession_tokenHash_key" ON "ClassSession"("tokenHash");

-- CreateIndex
CREATE INDEX "ClassSession_classroomId_expiresAt_idx" ON "ClassSession"("classroomId", "expiresAt");

-- CreateIndex
CREATE INDEX "ClassSession_expiresAt_revokedAt_idx" ON "ClassSession"("expiresAt", "revokedAt");

-- CreateIndex
CREATE INDEX "ClassCodeRateLimit_updatedAt_idx" ON "ClassCodeRateLimit"("updatedAt");

-- AddForeignKey
ALTER TABLE "ClassAccessCode" ADD CONSTRAINT "ClassAccessCode_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSession" ADD CONSTRAINT "ClassSession_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
