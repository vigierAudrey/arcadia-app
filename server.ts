import { createServer } from "node:http";

import next from "next";

import { attachLiveWebSocketServer } from "@/server/live-sessions/websocket";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const hostname = process.env.HOSTNAME ?? "0.0.0.0";
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

const server = createServer((request, response) => {
  handle(request, response);
});

attachLiveWebSocketServer(server);

server.listen(port, hostname, () => {
  console.log(
    `ArcadiA listening on http://${hostname}:${port} (${dev ? "dev" : "production"})`,
  );
});
