import { CreateVariant, Variant } from "~/models";
import { variantContents, variants } from "../schema";

export default class VariantRepo {
  private db = database();

  async insertVariant(createVariant: CreateVariant): Promise<Variant | null> {
    const variantId = genId();

    const DbVariants = await this.db
      .insert(variants)
      .values({
        id: variantId,
        text: createVariant.text,
        type: createVariant.type,
        metadata: createVariant.metadata,
      })
      .returning();

    const DbContents = await this.db
      .insert(variantContents)
      .values(
        createVariant.contents.map((c) => ({
          variantId,
          localeId: c.localeId,
          description: c.description,
          metadata: c.metadata,
        }))
      )
      .returning();

    return {
      ...DbVariants[0],
      contents: DbContents.map((c) => ({
        localeId: c.localeId,
        description: c.description,
        metadata: c.metadata,
      })),
    };
  }
}
