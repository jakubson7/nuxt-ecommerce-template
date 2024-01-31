import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { UserRole } from "~/models";

export const users = sqliteTable("users", {
  // Lucia style
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  hashedPassword: text("hashedPassword").notNull(),
  role: text("role").notNull().$type<UserRole>(),
});

export const userSessions = sqliteTable("userSessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userSessions: many(userSessions),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, { fields: [userSessions.userId], references: [users.id] }),
}));
