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
    locale: text("locale")
      .$type<Locale>()
      .notNull()
      .references(() => locales.ID),
    name: text("name").notNull(),
    description: text("description").notNull(),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
    createdAt: integer("createdAt", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productID, table.locale] }),
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
    isAvailable: integer("isAvailable", { mode: "boolean" }).notNull(),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
    createdAt: integer("createdAt", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productID, table.variantID] }),
  })
);

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(productPrices),
  contents: many(productContents),
  variants: many(productVariants),
  storageUnits: many(storageUnits),
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
