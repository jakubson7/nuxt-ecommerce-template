import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { Locale } from "~/i18n/config";
import { locales } from "./locale";
import { relations } from "drizzle-orm";
import { ProductVariantType } from "../models/variant";
import { productVariants } from "./product";

export const variants = sqliteTable("variants", {
  ID: integer("ID").primaryKey(),
  value: text("value").notNull(),
  type: text("type").notNull().$type<ProductVariantType>(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
});

export const variantContents = sqliteTable(
  "variantsContent",
  {
    variantID: integer("variantID")
      .notNull()
      .references(() => variants.ID),
    locale: text("locale")
      .$type<Locale>()
      .notNull()
      .references(() => locales.ID),
    description: text("description").notNull(),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.variantID, table.locale] }),
  })
);

export const variantsRelations = relations(variants, ({ many }) => ({
  contents: many(variantContents),
  productVariants: many(productVariants),
}));

export const variantsContentsRelations = relations(
  variantContents,
  ({ one }) => ({
    variant: one(variants, {
      fields: [variantContents.variantID],
      references: [variants.ID],
    }),
  })
);

export type Variant = typeof variants.$inferSelect;
export type InsertVariant = typeof variants.$inferInsert;
export type VariantContent = typeof variantContents.$inferSelect;
export type InsertVariantContent = typeof variantContents.$inferInsert;
