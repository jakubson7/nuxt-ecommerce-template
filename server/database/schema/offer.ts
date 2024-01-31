import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { Locale } from "~/i18n/config";
import { locales } from "./locale";
import { relations } from "drizzle-orm";

export const offers = sqliteTable("offers", {
  id: integer("id").primaryKey(),
  scheme: text("scheme", { mode: "json" }).notNull().default("{}"),
  productsAffected: text("productsAffected", { mode: "json" })
    .notNull()
    .default("[]")
    .$type<number[]>(),
  metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  expiresAt: integer("expiresAt", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const offerContents = sqliteTable(
  "offerContents",
  {
    offerId: integer("offerId")
      .notNull()
      .references(() => offers.id),
    localeId: text("localeId")
      .notNull()
      .$type<Locale>()
      .references(() => locales.id),
    name: text("name").notNull(),
    description: text("description").notNull(),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.offerId, table.localeId] }),
  })
);

export const offersRelations = relations(offers, ({ many }) => ({
  contents: many(offerContents),
}));

export const offerContentsRelations = relations(offerContents, ({ one }) => ({
  offer: one(offers, {
    fields: [offerContents.offerId],
    references: [offers.id],
  }),
  locale: one(locales, {
    fields: [offerContents.localeId],
    references: [locales.id],
  }),
}));
