import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { Locale } from "~/models";
import { locales } from "./locale";
import { relations } from "drizzle-orm";
import { variants } from "./variant";
import { storageUnits } from "./storage";
import { prices } from "./price";
import { categories } from "./category";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  universalSlug: text("universalSlug").notNull(),
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
    productId: text("productId")
      .notNull()
      .references(() => products.id),
    localeId: text("localeId")
      .$type<Locale>()
      .notNull()
      .references(() => locales.id),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productId, table.localeId] }),
  })
);

export const productVariants = sqliteTable(
  "productVariants",
  {
    productId: text("productId")
      .notNull()
      .references(() => products.id),
    variantId: text("variantId")
      .notNull()
      .references(() => variants.id),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productId, table.variantId] }),
  })
);

export const productCategories = sqliteTable("productCategories", {
  productId: text("productId")
    .notNull()
    .references(() => products.id),
  categoryId: text("categoryId")
    .notNull()
    .references(() => categories.id),
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
      fields: [productContents.productId],
      references: [products.id],
    }),
    locale: one(locales, {
      fields: [productContents.localeId],
      references: [locales.id],
    }),
  })
);

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    variant: one(variants, {
      fields: [productVariants.variantId],
      references: [variants.id],
    }),
    storageUnits: many(storageUnits),
  })
);

export const productCategoriesRelations = relations(
  productCategories,
  ({ one }) => ({
    product: one(products, {
      fields: [productCategories.productId],
      references: [products.id],
    }),
    category: one(categories, {
      fields: [productCategories.categoryId],
      references: [categories.id],
    }),
  })
);
