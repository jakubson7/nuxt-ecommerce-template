import { z } from "zod";
import { localeSchema } from "./i18n";
import { idSchema } from "./id";
import { timestampSchema } from "./timestamp";

export const categoryContentSchema = z.object({
  localeId: localeSchema,
  name: z.string().max(512),
  metadata: z.unknown().default({}),
});

export const createCategorySchema = z.object({
  metadata: z.unknown().default({}),
  contents: z.array(categoryContentSchema),
});

export const patchCategorySchema = createCategorySchema.partial();

export const categorySchema = createCategorySchema
  .extend(idSchema.shape)
  .extend(timestampSchema.shape);

export const localCategorySchema = createCategorySchema
  .extend(idSchema.shape)
  .extend(timestampSchema.shape)
  .omit({ contents: true })
  .extend({ content: categoryContentSchema });

export type CreateCategory = z.infer<typeof createCategorySchema>;
export type PatchCategory = z.infer<typeof patchCategorySchema>;
export type Category = z.infer<typeof categorySchema>;
export type LocalCategory = z.infer<typeof localCategorySchema>;
