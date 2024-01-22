import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { Locale } from "~/i18n/config";
import { locales } from "./locale";

export const variants = sqliteTable("variants", {
  ID: integer("ID").primaryKey(),
  metadata: text("metadata").notNull().default("{}"),
});

export const variantsContent = sqliteTable(
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
    metadata: text("metadata").notNull().default("{}"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.variantID, table.locale] }),
  })
);

export type Variant = typeof variants.$inferSelect;
export type InsertVariant = typeof variants.$inferInsert;
export type VariantContent = typeof variantsContent.$inferSelect;
export type InsertVariantContent = typeof variantsContent.$inferInsert;
