import {
  productContents,
  productVariants,
  products,
  productCategories,
} from "~/server/database/schema";
import type { Variant } from "./variant";
import type { Price } from "./price";
import type { Offer } from "./offer";
import type { StorageUnit } from "./storage";
import type { Category } from "./category";

export type SelectProduct = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type SelectProductContent = typeof productContents.$inferSelect;
export type InsertProductContent = typeof productContents.$inferInsert;
export type SelectProductVariant = typeof productVariants.$inferSelect;
export type InsertProductVariant = typeof productVariants.$inferInsert;
export type SelectProductCategory = typeof productCategories.$inferSelect;
export type InsertProductCategory = typeof productCategories.$inferInsert;

export type ProductVariant = SelectProductVariant & { variant: Variant };
export type Product = SelectProduct & {
  content: SelectProductContent;
  price: Price;
  variants: ProductVariant[];
  offers: Offer[];
  storageUnits: StorageUnit[];
  categories: Category[];
};

export type ProductChoice = SelectProduct & {
  amount: number;
  price: Price;
  variant: ProductVariant;
  offer?: Offer;
  storageUnit: StorageUnit;
  category: Category;
};

// TODO
// This will be stored in Database
// So in future make it more compact
// Because this json will be pretty beefy
export type InsertProductChoice = ProductChoice;
