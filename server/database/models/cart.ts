import { carts } from "../schema";
import { ProductChoice } from "./product";

export type SelectCart = typeof carts.$inferSelect;
export type InsertCart = typeof carts.$inferInsert;

export type Cart = SelectCart;
