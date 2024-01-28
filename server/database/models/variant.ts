import { variantContents, variants } from "../schema";

export type ProductVariantType = "color" | "size";

export type Variant = typeof variants.$inferSelect;
export type InsertVariant = typeof variants.$inferInsert;
export type VariantContent = typeof variantContents.$inferSelect;
export type InsertVariantContent = typeof variantContents.$inferInsert;
