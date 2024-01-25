import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const warehouses = sqliteTable("warehouses", {
  ID: integer("ID").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
});

export type Warehouse = typeof warehouses.$inferSelect;
export type InsertWarehouse = typeof warehouses.$inferInsert;
