import { offers } from "../schema/offer";

export type SelectOffer = typeof offers.$inferSelect;
export type InsertOffer = typeof offers.$inferInsert;

export type Offer = SelectOffer;
