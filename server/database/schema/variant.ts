import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { locales } from "./locale";
import { relations } from "drizzle-orm";
import { VariantType } from "~/models/variant";
import { productVariants } from "./product";
import { storageUnits } from "./storage";
import { Locale } from "~/models";

export const variants = sqliteTable("variants", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  type: text("type").notNull().$type<VariantType>(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const variantContents = sqliteTable(
  "variantContents",
  {
    variantId: text("variantId")
      .notNull()
      .references(() => variants.id),
    localeId: text("localeId")
      .$type<Locale>()
      .notNull()
      .references(() => locales.id),
    description: text("description").notNull(),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.variantId, table.localeId] }),
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
      fields: [variantContents.variantId],
      references: [variants.id],
    }),
    locale: one(locales, {
      fields: [variantContents.localeId],
      references: [locales.id],
    }),
  })
);
