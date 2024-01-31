import { userSessions, users } from "~/server/database/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export type UserRole = "admin";

export type DBSelectUser = typeof users.$inferSelect;
export type DBInsertUser = typeof users.$inferInsert;
export type DBSelectUserSession = typeof userSessions.$inferSelect;
export type DBInsertUserSession = typeof userSessions.$inferInsert;
