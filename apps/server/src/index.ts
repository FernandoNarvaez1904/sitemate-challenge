import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { trpcServer } from "./trpc/hono-puglin";
import { appRouter } from "./trpc/router";

const app = new Hono();

app.use(
  "/trpc/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "trpc-batch-mode"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "Set-Cookie"],
    credentials: true,
  }),
);

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  }),
);

serve({
  fetch: app.fetch,
  port: 8787, // Port number, default is 3000
});
