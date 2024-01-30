import { variantContents, variants } from "../schema";

export type ProductVariantType = "color" | "size";

export type SelectVariant = typeof variants.$inferSelect;
export type InsertVariant = typeof variants.$inferInsert;
export type SelectVariantContent = typeof variantContents.$inferSelect;
export type InsertVariantContent = typeof variantContents.$inferInsert;

export type Variant = SelectVariant & { content: SelectVariantContent };
