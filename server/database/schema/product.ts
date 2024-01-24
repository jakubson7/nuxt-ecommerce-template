import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { Locale, Currency } from "~/i18n/config";
import { locales } from "./locale";
import { relations } from "drizzle-orm";

export const products = sqliteTable("products", {
  ID: integer("ID").primaryKey(),
  slug: text("slug").notNull(),
  metadata: text("metadata").notNull().default("{}"),
});

export const productPrices = sqliteTable("productPrices", {
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

export const productContents = sqliteTable(
  "productContents",
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

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(productPrices),
  contents: many(productContents),
}));

export const productPricesRelations = relations(productPrices, ({ one }) => ({
  product: one(products, {
    fields: [productPrices.productID],
    references: [products.ID],
  }),
}));

export const productContentsRelations = relations(
  productContents,
  ({ one }) => ({
    product: one(products, {
      fields: [productContents.productID],
      references: [products.ID],
    }),
  })
);

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type ProductPrice = typeof productPrices.$inferSelect;
export type InsertProductPrice = typeof productPrices.$inferInsert;
export type ProductContent = typeof productContents.$inferSelect;
export type InsertProductContent = typeof productContents.$inferInsert;
