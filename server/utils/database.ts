import * as schema from "../database/schema";
import {
  drizzle as betterSqlite3Drizzle,
  BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import DriverBetterSqlite3Database from "better-sqlite3";
import { CreateVariant, Locale, Variant } from "~/utils/models";
import { genID } from "./id";

let __database: null | BetterSQLite3Database<typeof schema> = null;

export function database(): BetterSQLite3Database<typeof schema> {
  if (!__database) {
    if (process.dev) {
      const sqlite = new DriverBetterSqlite3Database("local_data/dev.sqlite");
      __database = betterSqlite3Drizzle(sqlite, { schema });
    } else {
      throw Error("Database init error!");
    }
  }

  // @ts-ignore
  return __database;
}

export async function insertVariant(
  db: BetterSQLite3Database<typeof schema>,
  createVariant: CreateVariant
) {
  const id = genID();
  let variant: Variant = {
    id,
    contents: createVariant.contents,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: createVariant.metadata,
    text: createVariant.text,
    type: createVariant.type,
  };

  db.transaction(async (tx) => {
    const result = await tx
      .insert(schema.variants)
      .values({
        id: variant.id,
        text: variant.text,
        type: variant.type,
        metadata: variant.metadata,
        createdAt: variant.createdAt,
        updatedAt: variant.updatedAt,
      })
      .returning();

    if (!result) {
      tx.rollback();
      throw createError({ message: "insertVariant" });
    }

    for (const [locale, content] of Object.entries(createVariant.contents)) {
      const result = await tx
        .insert(schema.variantContents)
        .values({
          variantId: id,
          localeId: locale as Locale,
          description: content.description,
          metadata: content.metadata,
        })
        .returning();

      if (!result) {
        tx.rollback();
        throw createError({ message: "insertVariant" });
      }
    }
  });

  return variant;
}
