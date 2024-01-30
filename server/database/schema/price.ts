import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Currency, Locale } from "~/i18n/config";
import { locales } from "./locale";
import { products } from "./product";
import { relations } from "drizzle-orm";

export const prices = sqliteTable("prices", {
  ID: integer("ID").primaryKey(),
  productID: integer("productID")
    .notNull()
    .references(() => products.ID),
  localeID: text("locale")
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

export const pricesRelations = relations(prices, ({ one }) => ({
  product: one(products, {
    fields: [prices.productID],
    references: [products.ID],
  }),
  locale: one(locales, {
    fields: [prices.localeID],
    references: [locales.ID],
  }),
}));
