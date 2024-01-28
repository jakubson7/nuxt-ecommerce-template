import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const offers = sqliteTable("offers", {
  ID: integer("offers").primaryKey(),
  scheme: text("scheme", { mode: "json" }).notNull().default("{}"),
  productsAffected: text("productsAffected", { mode: "json" })
    .notNull()
    .default("[]")
    .$type<number[]>(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  expiresAt: integer("expiresAt", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});
