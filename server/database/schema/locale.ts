import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { Locale } from "~/i18n/config";

export const locales = sqliteTable("locales", {
  ID: text("ID").$type<Locale>().primaryKey(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});
