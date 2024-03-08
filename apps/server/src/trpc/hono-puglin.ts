import type { AnyRouter } from "@trpc/server";
import type { FetchHandlerRequestOptions } from "@trpc/server/adapters/fetch";
import type { MiddlewareHandler } from "hono";
import type { setCookie as _setCookie } from "hono/cookie";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createTRPCContext } from "./context";

interface tRPCOptions
  extends Omit<FetchHandlerRequestOptions<AnyRouter>, "req" | "endpoint"> {
  endpoint?: FetchHandlerRequestOptions<AnyRouter>["endpoint"];
}

export const trpcServer = ({
  endpoint = "/trpc",
  ...rest
}: tRPCOptions): MiddlewareHandler => {
  return async (c) => {
    const res = await fetchRequestHandler({
      ...rest,
      endpoint,
      req: c.req.raw,
      createContext: (opts) => createTRPCContext(opts, c),
    });

    return res;
  };
};
