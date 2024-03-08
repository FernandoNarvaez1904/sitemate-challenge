"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  httpBatchLink,
  splitLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { authTokenAtom } from "app/jotai";
import { useAtomValue } from "jotai";
import superjson from "superjson";

import { trpc } from "./trpc";

const queryClient = new QueryClient();

function createTrpcClient(authToken: string) {
  return trpc.createClient({
    links: [
      splitLink({
        condition: (op) => op.path.startsWith("authentication."),
        true: httpBatchLink({
          url: `http://localhost:8787/trpc`,
          transformer: superjson,
          headers() {
            return {
              Authorization: `Bearer ${authToken}`,
            };
          },
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
        }),
        false: unstable_httpBatchStreamLink({
          url: `http://localhost:8787/trpc`,
          transformer: superjson,
          headers() {
            return {
              Authorization: `Bearer ${authToken}`,
            };
          },
        }),
      }),
    ],
  });
}

export function TRPCProvider(props: { children: ReactNode }) {
  const authToken = useAtomValue(authTokenAtom);
  const trpcClient = createTrpcClient(authToken ?? "");

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
