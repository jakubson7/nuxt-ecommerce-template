import * as schema from "../schema";
import {
  drizzle as betterSqlite3Drizzle,
  BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import DriverBetterSqlite3Database from "better-sqlite3";

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
