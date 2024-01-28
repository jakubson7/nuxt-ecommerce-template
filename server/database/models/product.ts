import {
  productContents,
  productPrices,
  productVariants,
  products,
} from "../schema";

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type ProductPrice = typeof productPrices.$inferSelect;
export type InsertProductPrice = typeof productPrices.$inferInsert;
export type ProductContent = typeof productContents.$inferSelect;
export type InsertProductContent = typeof productContents.$inferInsert;
export type ProductVariants = typeof productVariants.$inferSelect;
export type InsertProductVariants = typeof productVariants.$inferInsert;
