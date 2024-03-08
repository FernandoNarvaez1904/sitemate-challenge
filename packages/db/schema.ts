import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const issuesTable = sqliteTable("issues", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});
