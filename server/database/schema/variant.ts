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
import { storageUnits } from "./storage";

export const variants = sqliteTable("variants", {
  ID: integer("ID").primaryKey(),
  value: text("value").notNull(),
  type: text("type").notNull().$type<ProductVariantType>(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const variantContents = sqliteTable(
  "variantsContent",
  {
    variantID: integer("variantID")
      .notNull()
      .references(() => variants.ID),
    localeID: text("locale")
      .$type<Locale>()
      .notNull()
      .references(() => locales.ID),
    description: text("description").notNull(),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.variantID, table.localeID] }),
  })
);

export const variantsRelations = relations(variants, ({ many }) => ({
  contents: many(variantContents),
  productVariants: many(productVariants),
  storageUnits: many(storageUnits),
}));

export const variantContentsRelations = relations(
  variantContents,
  ({ one }) => ({
    variant: one(variants, {
      fields: [variantContents.variantID],
      references: [variants.ID],
    }),
    locale: one(locales, {
      fields: [variantContents.localeID],
      references: [locales.ID],
    }),
  })
);
