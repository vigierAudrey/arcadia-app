import { headers } from "next/headers";

/**
 * Returns a rate-limit subject carrying the raw client IP. Callers must only
 * ever pass this through an HMAC (see login-rate-limit.ts) — the raw value
 * must never be persisted or logged.
 */
export async function getClientIpSubject() {
  const headerList = await headers();

  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0]?.trim();
    if (ip) return `ip:${ip}`;
  }

  const realIp = headerList.get("x-real-ip");
  if (realIp?.trim()) return `ip:${realIp.trim()}`;

  return "ip:unknown";
}
