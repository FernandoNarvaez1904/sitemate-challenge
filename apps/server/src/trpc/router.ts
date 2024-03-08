import { db, eq } from "db";
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

  getAllIssues: publicProcedure.query(() => {
    return db.select().from(issuesTable);
  }),

  deleteIssue: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const deletedIssue = (
        await db
          .delete(issuesTable)
          .where(eq(issuesTable.id, input.id))
          .returning()
      )[0];

      if (!deletedIssue) {
        throw new Error("Failed to delete issue");
      }

      // Comply with log requirement
      console.log("Deleted issue", input.id);

      return deletedIssue;
    }),

  updateIssue: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          title: z.string().min(1).max(255),
          description: z.string().min(1),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const updatedIssue = (
        await db
          .update(issuesTable)
          .set(input.data)
          .where(eq(issuesTable.id, input.id))
          .returning()
      )[0];

      if (!updatedIssue) {
        throw new Error("Failed to update issue");
      }

      // Comply with log requirement
      console.log("Updated issue", input.id);

      return updatedIssue;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
