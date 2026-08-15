export class AdminAccessError extends Error {
  constructor() {
    super("ADMIN_ACCESS_REQUIRED");
    this.name = "AdminAccessError";
  }
}

/**
 * Single authorization boundary for every admin mutation.
 *
 * Authentication is intentionally deferred to the next project step. Until it
 * exists, writes are available only in local development/test and fail closed
 * in production so an accidental deployment cannot expose a public admin API.
 */
export async function requireAdmin() {
  if (process.env.NODE_ENV === "production") {
    throw new AdminAccessError();
  }
}
