import { categories, categoryContents } from "~/server/database/schema";

export type SelectCategory = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategoryContent = typeof categoryContents.$inferSelect;
export type InsertCategorycontent = typeof categoryContents.$inferInsert;

export type Category = SelectCategory;
