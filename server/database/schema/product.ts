import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { Locale, Currency } from "~/i18n/config";
import { locales } from "./locale";
import { relations } from "drizzle-orm";
import { variants } from "./variant";
import { storageUnits } from "./storage";
import { prices } from "./price";
import { categories } from "./category";

export const products = sqliteTable("products", {
  ID: integer("ID").primaryKey(),
  slug: text("slug").notNull(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const productContents = sqliteTable(
  "productContents",
  {
    productID: integer("productID")
      .notNull()
      .references(() => products.ID),
    localeID: text("locale")
      .$type<Locale>()
      .notNull()
      .references(() => locales.ID),
    name: text("name").notNull(),
    description: text("description").notNull(),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productID, table.localeID] }),
  })
);

export const productVariants = sqliteTable(
  "productVariants",
  {
    productID: integer("productID")
      .notNull()
      .references(() => products.ID),
    variantID: integer("variantID")
      .notNull()
      .references(() => variants.ID),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productID, table.variantID] }),
  })
);

export const productCategories = sqliteTable("productCategories", {
  productID: integer("productID")
    .notNull()
    .references(() => products.ID),
  categoryID: integer("categoryID")
    .notNull()
    .references(() => categories.ID),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
});

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(prices),
  productContents: many(productContents),
  productVariants: many(productVariants),
  storageUnits: many(storageUnits),
  productCategories: many(productCategories),
}));

export const productContentsRelations = relations(
  productContents,
  ({ one }) => ({
    product: one(products, {
      fields: [productContents.productID],
      references: [products.ID],
    }),
    locale: one(locales, {
      fields: [productContents.localeID],
      references: [locales.ID],
    }),
  })
);

export const productVariantsRelations = relations(
  productVariants,
  ({ one }) => ({
    product: one(products, {
      fields: [productVariants.productID],
      references: [products.ID],
    }),
    variant: one(variants, {
      fields: [productVariants.variantID],
      references: [variants.ID],
    }),
  })
);

export const productCategoriesRelations = relations(
  productCategories,
  ({ one }) => ({
    product: one(products, {
      fields: [productCategories.productID],
      references: [products.ID],
    }),
    category: one(categories, {
      fields: [productCategories.categoryID],
      references: [categories.ID],
    }),
  })
);
