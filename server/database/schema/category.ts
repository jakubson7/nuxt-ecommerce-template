import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Locale } from "~/utils/models";
import { locales } from "./locale";
import { relations } from "drizzle-orm";
import { productCategories } from "./product";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const categoryContents = sqliteTable("categoryContents", {
  categoryId: integer("categoryId").notNull(),
  localeId: text("localeId")
    .notNull()
    .$type<Locale>()
    .references(() => locales.id),
  name: text("name").notNull(),
  metadata: text("metadata").notNull().default("{}"),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  contents: many(categoryContents),
  productCategories: many(productCategories),
}));

export const categoryContentsRelations = relations(
  categoryContents,
  ({ one }) => ({
    category: one(categories, {
      fields: [categoryContents.categoryId],
      references: [categories.id],
    }),
    locale: one(locales, {
      fields: [categoryContents.localeId],
      references: [locales.id],
    }),
  })
);
