import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InsertProductChoice } from "../models";

export const carts = sqliteTable("carts", {
  ID: integer("ID").primaryKey(),
  products: text("products", { mode: "json" })
    .notNull()
    .default("[]")
    .$type<InsertProductChoice[]>(),
  metadata: text("metadata", { mode: "json" }).default("{}"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});
