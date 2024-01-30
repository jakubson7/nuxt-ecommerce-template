import { locales } from "~/server/database/schema";

export type SelectLocalesTable = typeof locales.$inferSelect;
export type InsertLocalesTable = typeof locales.$inferInsert;
