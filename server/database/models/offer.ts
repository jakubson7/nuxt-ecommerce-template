import { offers } from "../schema/offer";

export type Offer = typeof offers.$inferSelect;
export type InsertOffer = typeof offers.$inferInsert;
