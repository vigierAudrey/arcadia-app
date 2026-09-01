import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { after, before, test } from "node:test";

import { loginAdminAction } from "../src/app/admin/login/actions";
import {
  AdminCreationError,
  createInitialAdmin,
} from "../src/server/auth/admin-user";
import { authenticateAdmin } from "../src/server/auth/authenticate";
import {
  ADMIN_LOGIN_MAX_ATTEMPTS,
  ADMIN_SESSION_DURATION_MS,
} from "../src/server/auth/constants";
import {
  consumeAdminLoginAttempt,
  getAdminLoginRateLimitKey,
} from "../src/server/auth/login-rate-limit";
import { requireAdminFromToken } from "../src/server/auth/require-admin";
import {
  createAdminSession,
  getAdminBySessionToken,
  hashAdminSessionToken,
  revokeAdminSession,
} from "../src/server/auth/session";
import { prisma } from "../src/server/db/prisma";

process.env.ADMIN_SESSION_SECRET = randomBytes(48).toString("base64url");

const generatedPassword = () => randomBytes(24).toString("base64url");
const testStartedAt = new Date();
const createdTokenHashes = new Set<string>();
const rateLimitSubjects = new Set<string>();

let admin: { id: string; login: string };
let ownedAdminId: string | null = null;
let ownedAdminPassword: string | null = null;

before(async () => {
  const existing = await prisma.adminUser.findFirst({
    select: { id: true, login: true },
  });

  if (existing) {
    admin = existing;
    return;
  }

  ownedAdminPassword = generatedPassword();
  admin = await createInitialAdmin(
    `auth-test-${randomUUID()}@example.invalid`,
    ownedAdminPassword,
  );
  ownedAdminId = admin.id;
});

after(async () => {
  if (createdTokenHashes.size > 0) {
    await prisma.adminSession.deleteMany({
      where: { tokenHash: { in: [...createdTokenHashes] } },
    });
  }

  const keyHashes = [...rateLimitSubjects].map(getAdminLoginRateLimitKey);
  if (keyHashes.length > 0) {
    await prisma.adminLoginRateLimit.deleteMany({
      where: { keyHash: { in: keyHashes } },
    });
  }

  if (ownedAdminId) {
    await prisma.adminUser.delete({ where: { id: ownedAdminId } });
  }

  await prisma.adminSession.deleteMany({
    where: { createdAt: { gte: testStartedAt }, adminUserId: admin.id },
  });
  await prisma.$disconnect();
});

test("creates, expires and revokes database-backed admin sessions", async () => {
  const active = await createAdminSession(admin.id);
  createdTokenHashes.add(hashAdminSessionToken(active.token));
  assert.deepEqual(await getAdminBySessionToken(active.token), admin);

  const expired = await createAdminSession(
    admin.id,
    new Date(Date.now() - ADMIN_SESSION_DURATION_MS - 1_000),
  );
  createdTokenHashes.add(hashAdminSessionToken(expired.token));
  assert.equal(await getAdminBySessionToken(expired.token), null);

  assert.equal(await revokeAdminSession(active.token), true);
  assert.equal(await getAdminBySessionToken(active.token), null);
});

test("rejects access without a valid session", async () => {
  await assert.rejects(() => requireAdminFromToken(undefined), {
    name: "AdminAccessError",
    message: "ADMIN_ACCESS_REQUIRED",
  });
});

test("returns the same neutral message for invalid login data", async () => {
  rateLimitSubjects.add("unknown-account");
  const formData = new FormData();
  formData.set("login", `unknown-${randomUUID()}@example.invalid`);
  formData.set("password", generatedPassword());

  const result = await loginAdminAction({ message: null }, formData);
  assert.equal(
    result.message,
    "Connexion impossible. Vérifiez vos informations et réessayez plus tard.",
  );
});

test("limits concurrent-safe login attempts and resets after its window", async () => {
  const subject = `rate-test:${randomUUID()}`;
  rateLimitSubjects.add(subject);
  const now = new Date();

  for (let attempt = 0; attempt < ADMIN_LOGIN_MAX_ATTEMPTS; attempt += 1) {
    assert.equal(await consumeAdminLoginAttempt(subject, now), true);
  }
  assert.equal(await consumeAdminLoginAttempt(subject, now), false);

  const afterBlock = new Date(now.getTime() + 16 * 60 * 1_000);
  assert.equal(await consumeAdminLoginAttempt(subject, afterBlock), true);
});

test("refuses creation of a second V1 administrator", async () => {
  await assert.rejects(
    () =>
      createInitialAdmin(
        `second-${randomUUID()}@example.invalid`,
        generatedPassword(),
      ),
    (error: unknown) =>
      error instanceof AdminCreationError && error.code === "ALREADY_EXISTS",
  );
});

test(
  "authenticates the initial admin and creates a usable session",
  async (context) => {
    if (!ownedAdminPassword) {
      context.skip("A pre-existing local administrator is preserved.");
      return;
    }

    rateLimitSubjects.add(`account:${admin.id}`);
    const result = await authenticateAdmin(admin.login, ownedAdminPassword);
    assert.equal(result.authenticated, true);
    if (!result.authenticated) return;

    createdTokenHashes.add(hashAdminSessionToken(result.token));
    assert.deepEqual(await getAdminBySessionToken(result.token), admin);
  },
);
