import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const carts = sqliteTable("carts", {
  id: text("id").primaryKey(),
  products: text("products", { mode: "json" }).notNull().default("[]").$type(),
  metadata: text("metadata", { mode: "json" }).default("{}"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});
