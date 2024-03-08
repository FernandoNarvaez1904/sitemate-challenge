import { createTRPCRouter, publicProcedure } from "../trpc/context";

export const appRouter = createTRPCRouter({
  sayName: publicProcedure.query(() => {
    return { name: "John Doe" };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
