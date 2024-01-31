import { locales } from "~/server/database/schema";

export type DBSelectLocale = typeof locales.$inferSelect;
export type DBInsertLocale = typeof locales.$inferInsert;
