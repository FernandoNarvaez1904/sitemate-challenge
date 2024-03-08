import { db } from "db";
import { issuesTable } from "db/schema";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc/context";

export const appRouter = createTRPCRouter({
  sayName: publicProcedure.query(() => {
    return { name: "John Doe" };
  }),
  createIssue: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const newIssue = (
        await db.insert(issuesTable).values(input).returning()
      )[0];

      if (!newIssue) {
        throw new Error("Failed to create issue");
      }

      // Comply with log requirement
      console.log("Created issue", newIssue);

      return newIssue;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
