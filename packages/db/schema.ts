import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const issuesTable = sqliteTable("issues", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
});
