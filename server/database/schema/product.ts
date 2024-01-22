import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { Locale, Currency } from "~/i18n/config";
import { locales } from "./locale";

export const products = sqliteTable("products", {
  ID: integer("ID").primaryKey(),
  slug: text("slug").notNull(),
  metadata: text("metadata").notNull().default("{}"),
});

export const productsPrice = sqliteTable("productsPrice", {
  ID: integer("ID").primaryKey(),
  productID: integer("productID")
    .notNull()
    .references(() => products.ID),
  locale: text("locale")
    .$type<Locale>()
    .notNull()
    .references(() => locales.ID),
  currency: text("currency").$type<Currency>().notNull(),
  value: integer("value").notNull(),
  metadata: text("metadata").notNull().default("{}"),
});

export const productsContent = sqliteTable(
  "productsContent",
  {
    productID: integer("productID")
      .notNull()
      .references(() => products.ID),
    locale: text("locale")
      .$type<Locale>()
      .notNull()
      .references(() => locales.ID),
    name: text("name").notNull(),
    description: text("description").notNull(),
    metadata: text("metadata").notNull().default("{}"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productID, table.locale] }),
  })
);

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type ProductPrice = typeof productsPrice.$inferSelect;
export type InsertProductPrice = typeof productsPrice.$inferInsert;
export type ProductContent = typeof productsContent.$inferSelect;
export type InsertProductContent = typeof productsContent.$inferInsert;
