import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { productVariants, products } from "./product";
import { variants } from "./variant";
import { relations } from "drizzle-orm";

export const warehouses = sqliteTable("warehouses", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const storageUnits = sqliteTable(
  "storageUnits",
  {
    productId: text("productId")
      .notNull()
      .references(() => products.id),
    variantId: text("variantId")
      .notNull()
      .references(() => variants.id),
    warehouseId: text("warehouseId")
      .notNull()
      .references(() => warehouses.id),
    amount: integer("amount").notNull(),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
    createdAt: integer("createdAt", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.productId, table.variantId, table.warehouseId],
    }),
  })
);

export const warehousesRelations = relations(warehouses, ({ many }) => ({
  storageUnits: many(storageUnits),
}));

export const storageUnitsRelations = relations(storageUnits, ({ one }) => ({
  product: one(products, {
    fields: [storageUnits.productId],
    references: [products.id],
  }),
  variant: one(variants, {
    fields: [storageUnits.variantId],
    references: [variants.id],
  }),
  warehouse: one(warehouses, {
    fields: [storageUnits.warehouseId],
    references: [warehouses.id],
  }),
  productVariant: one(productVariants, {
    fields: [storageUnits.productId, storageUnits.variantId],
    references: [productVariants.productId, productVariants.variantId],
  }),
}));
