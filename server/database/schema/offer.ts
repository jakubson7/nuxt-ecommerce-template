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
  ID: integer("offers").primaryKey(),
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
    offerID: integer("offerID")
      .notNull()
      .references(() => offers.ID),
    localeID: text("localeID")
      .notNull()
      .$type<Locale>()
      .references(() => locales.ID),
    name: text("name").notNull(),
    description: text("description").notNull(),
    metadata: text("metadata", { mode: "json" }).notNull().default("{}"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.offerID, table.localeID] }),
  })
);

export const offersRelations = relations(offers, ({ many }) => ({
  contents: many(offerContents),
}));

export const offerContentsRelations = relations(offerContents, ({ one }) => ({
  offer: one(offers, {
    fields: [offerContents.offerID],
    references: [offers.ID],
  }),
  locale: one(locales, {
    fields: [offerContents.localeID],
    references: [locales.ID],
  }),
}));
