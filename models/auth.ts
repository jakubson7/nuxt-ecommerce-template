import { userSessions, users } from "~/server/database/schema";

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type SelectUserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = typeof userSessions.$inferInsert;

export type User = SelectUser;
export type UserSession = SelectUserSession;
