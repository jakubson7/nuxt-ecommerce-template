import { carts } from "~/server/database/schema";

export type SelectCart = typeof carts.$inferSelect;
export type InsertCart = typeof carts.$inferInsert;

export type Cart = SelectCart;
