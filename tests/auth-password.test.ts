import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { test } from "node:test";

import {
  hashAdminPassword,
  verifyAdminPassword,
} from "../src/server/auth/password";

test("hashes admin passwords with Argon2id and verifies them", async () => {
  const password = randomBytes(24).toString("base64url");
  const otherPassword = randomBytes(24).toString("base64url");
  const passwordHash = await hashAdminPassword(password);

  assert.match(passwordHash, /^\$argon2id\$/);
  assert.equal(await verifyAdminPassword(passwordHash, password), true);
  assert.equal(await verifyAdminPassword(passwordHash, otherPassword), false);
  assert.equal(await verifyAdminPassword("malformed", password), false);
});
