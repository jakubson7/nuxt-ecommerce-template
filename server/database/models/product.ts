import { productContents, prices, productVariants, products } from "../schema";
import { Offer } from "./offer";
import { StorageUnit } from "./storage";
import { Variant } from "./variant";

export type SelectProduct = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type SelectPrice = typeof prices.$inferSelect;
export type InsertPrice = typeof prices.$inferInsert;
export type SelectProductContent = typeof productContents.$inferSelect;
export type InsertProductContent = typeof productContents.$inferInsert;
export type SelectProductVariant = typeof productVariants.$inferSelect;
export type InsertProductVariant = typeof productVariants.$inferInsert;

export type ProductVariant = SelectProductVariant & { variant: Variant };
export type Product = SelectProduct & {
  content: SelectProductContent;
  price: SelectPrice;
  variants: ProductVariant[];
  offers: Offer[];
  storageUnits: StorageUnit[];
};

export type ProductChoice = SelectProduct & {
  amount: number;
  price: SelectPrice;
  variant: ProductVariant;
  offer?: Offer;
  storageUnit: StorageUnit;
};

export type InsertProductChoice = ProductChoice;
