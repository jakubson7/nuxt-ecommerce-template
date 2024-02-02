import { z } from "zod";
import { localeSchema } from "./i18n";

export const variantTypeSchema = z.union([
  z.literal("color"),
  z.literal("size"),
]);

export type VariantType = z.infer<typeof variantTypeSchema>;

export const createVariantSchema = z.object({
  text: z.string().max(128),
  type: variantTypeSchema,
  metadata: z.string(),
  contents: z.record(
    localeSchema,
    z.object({
      description: z.string().max(512),
      metadata: z.string(),
    })
  ),
});

export const variantSchema = createVariantSchema.extend({
  id: z.string().length(32),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const localVariantSchema = createVariantSchema
  .extend({
    id: z.string().length(32),
    createdAt: z.date(),
    updatedAt: z.date(),
    content: z.object({
      description: z.string().max(512),
      metadata: z.string(),
    }),
  })
  .omit({ contents: true });

export type CreateVariant = z.infer<typeof createVariantSchema>;
export type Variant = z.infer<typeof variantSchema>;
export type Localvariant = z.infer<typeof localVariantSchema>;
