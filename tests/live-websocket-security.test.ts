import assert from "node:assert/strict";
import type { IncomingMessage } from "node:http";
import { test } from "node:test";

import { isAllowedLiveOrigin } from "@/server/live-sessions/websocket";

function requestWithHeaders(
  headers: IncomingMessage["headers"],
): IncomingMessage {
  return { headers, socket: { encrypted: false } } as unknown as IncomingMessage;
}

test("live websocket accepts only the public same origin", () => {
  assert.equal(
    isAllowedLiveOrigin(
      requestWithHeaders({
        host: "arcadia.blobsurf.com",
        origin: "https://arcadia.blobsurf.com",
        "x-forwarded-proto": "https",
      }),
    ),
    true,
  );
  assert.equal(
    isAllowedLiveOrigin(
      requestWithHeaders({
        host: "127.0.0.1:3000",
        origin: "https://arcadia.blobsurf.com",
        "x-forwarded-host": "arcadia.blobsurf.com",
        "x-forwarded-proto": "https",
      }),
    ),
    true,
  );
});

test("live websocket rejects cross-origin and origin-less upgrades", () => {
  assert.equal(
    isAllowedLiveOrigin(
      requestWithHeaders({
        host: "arcadia.blobsurf.com",
        origin: "https://evil.example",
        "x-forwarded-proto": "https",
      }),
    ),
    false,
  );
  assert.equal(
    isAllowedLiveOrigin(requestWithHeaders({ host: "localhost:3000" })),
    false,
  );
});
