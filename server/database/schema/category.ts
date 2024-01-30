import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Locale } from "~/i18n/config";
import { locales } from "./locale";
import { relations } from "drizzle-orm";

export const categories = sqliteTable("categories", {
  ID: integer("ID").primaryKey(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const categoryContents = sqliteTable("categoryContents", {
  categoryID: integer("categoryID").notNull(),
  localeID: text("localeID")
    .notNull()
    .$type<Locale>()
    .references(() => locales.ID),
  name: text("name").notNull(),
  metadata: text("metadata").notNull().default("{}"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  contents: many(categoryContents),
}));

export const categoryContentsRelations = relations(
  categoryContents,
  ({ one }) => ({
    category: one(categories, {
      fields: [categoryContents.categoryID],
      references: [categories.ID],
    }),
    locale: one(locales, {
      fields: [categoryContents.localeID],
      references: [locales.ID],
    }),
  })
);
