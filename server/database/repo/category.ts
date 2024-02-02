import { CreateVariant, Variant } from "~/models";
import {
  categories,
  categoryContents,
  variantContents,
  variants,
} from "../schema";
import { Category, CreateCategory } from "~/models/category";

export default class CategoryRepo {
  private db = database();

  async insertCategory(createCategory: CreateCategory): Promise<Category> {
    return this.db.transaction(async (tx) => {
      const categoryId = genId();

      const DbCategory = await tx
        .insert(categories)
        .values({
          id: categoryId,
          metadata: createCategory.metadata,
        })
        .returning();

      const DbContents = await tx
        .insert(categoryContents)
        .values(
          createCategory.contents.map((c) => ({
            categoryId,
            localeId: c.localeId,
            name: c.name,
            metadata: c.metadata,
          }))
        )
        .returning();

      return {
        ...DbCategory[0],
        contents: DbContents.map((c) => ({
          localeId: c.localeId,
          name: c.name,
          metadata: c.metadata,
        })),
      };
    });
  }
}
