import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { UserRole } from "~/models";

export const users = sqliteTable("users", {
  ID: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  hashedPassword: text("hashedPassword").notNull(),
  role: text("role").notNull().$type<UserRole>(),
});

export const userSessions = sqliteTable("userSessions", {
  ID: text("id").notNull().primaryKey(),
  userID: text("user_id")
    .notNull()
    .references(() => users.ID),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userSessions: many(userSessions),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, { fields: [userSessions.userID], references: [users.ID] }),
}));
