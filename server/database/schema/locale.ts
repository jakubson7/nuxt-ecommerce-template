import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { productContents } from "./product";
import { categoryContents } from "./category";
import { variantContents } from "./variant";
import { prices } from "./price";
import { offerContents } from "./offer";
import { Locale } from "~/models";

export const locales = sqliteTable("locales", {
  id: text("id").$type<Locale>().primaryKey(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const localesRelations = relations(locales, ({ many }) => ({
  productContents: many(productContents),
  prices: many(prices),
  categoryContents: many(categoryContents),
  variantContents: many(variantContents),
  offerContents: many(offerContents),
}));
