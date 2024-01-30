import { prices } from "../schema";

export type SelectPrice = typeof prices.$inferSelect;
export type InsertPrice = typeof prices.$inferInsert;

export type Price = SelectPrice;
