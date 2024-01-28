import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { products } from "./product";
import { variants } from "./variant";
import { relations } from "drizzle-orm";

export const warehouses = sqliteTable("warehouses", {
  ID: integer("ID").primaryKey(),
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
    productID: integer("productID")
      .notNull()
      .references(() => products.ID),
    variantID: integer("variantID")
      .notNull()
      .references(() => variants.ID),
    warehouseID: integer("warehouseID")
      .notNull()
      .references(() => warehouses.ID),
    amount: integer("amount"),
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
      columns: [table.productID, table.variantID, table.warehouseID],
    }),
  })
);

export const warehousesRelations = relations(warehouses, ({ many }) => ({
  storageUnits: many(storageUnits),
}));

export const storageUnitsRelations = relations(storageUnits, ({ one }) => ({
  product: one(products, {
    fields: [storageUnits.productID],
    references: [products.ID],
  }),
  variant: one(variants, {
    fields: [storageUnits.variantID],
    references: [variants.ID],
  }),
  warehouse: one(warehouses, {
    fields: [storageUnits.warehouseID],
    references: [warehouses.ID],
  }),
}));
