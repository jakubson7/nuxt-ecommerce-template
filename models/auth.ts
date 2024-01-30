import { userSessions, users } from "~/server/database/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export type UserRole = "admin";

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type SelectUserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = typeof userSessions.$inferInsert;

export type User = SelectUser;
export type UserSession = SelectUserSession;

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
});
