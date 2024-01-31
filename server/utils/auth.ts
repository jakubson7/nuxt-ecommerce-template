import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { userSessions, users } from "../database/schema";
import { Lucia } from "lucia";

const luciaDrizzleSqliteAdapter = new DrizzleSQLiteAdapter(
  // @ts-ignore
  database(),
  userSessions,
  users
);
export const lucia = new Lucia(luciaDrizzleSqliteAdapter, {
  sessionCookie: {
    attributes: {
      secure: !import.meta.dev,
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      name: databaseUserAttributes.name,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  name: string;
}
