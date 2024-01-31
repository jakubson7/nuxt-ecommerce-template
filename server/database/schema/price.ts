import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Currency, Locale } from "~/i18n/config";
import { locales } from "./locale";
import { products } from "./product";
import { relations } from "drizzle-orm";

export const prices = sqliteTable("prices", {
  id: integer("id").primaryKey(),
  productId: integer("productId")
    .notNull()
    .references(() => products.id),
  localeId: text("localeId")
    .$type<Locale>()
    .notNull()
    .references(() => locales.id),
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

export const pricesRelations = relations(prices, ({ one }) => ({
  product: one(products, {
    fields: [prices.productId],
    references: [products.id],
  }),
  locale: one(locales, {
    fields: [prices.localeId],
    references: [locales.id],
  }),
}));
