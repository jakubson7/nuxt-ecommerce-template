import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Locale } from "~/i18n/config";

export const locales = sqliteTable("locales", {
  ID: text("ID").$type<Locale>().primaryKey(),
});

export type LocalesTable = typeof locales.$inferSelect;
export type InsertLocalesTable = typeof locales.$inferInsert;
