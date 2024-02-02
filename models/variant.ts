import { z } from "zod";
import { localeSchema } from "./i18n";
import { idSchema } from "./id";
import { timestampSchema } from "./timestamp";

export const variantTypeSchema = z.union([
  z.literal("color"),
  z.literal("size"),
]);

export type VariantType = z.infer<typeof variantTypeSchema>;

export const variantContentSchema = z.object({
  localeId: localeSchema,
  description: z.string().max(512),
  metadata: z.unknown().default({}),
});

export const createVariantSchema = z.object({
  text: z.string().max(128),
  type: variantTypeSchema,
  metadata: z.unknown().default({}),
  contents: z.array(variantContentSchema),
});

export const patchVariantSchema = createVariantSchema.partial();

export const variantSchema = createVariantSchema
  .extend(idSchema.shape)
  .extend(timestampSchema.shape);

export const localVariantSchema = createVariantSchema
  .omit({ contents: true })
  .extend(idSchema.shape)
  .extend(timestampSchema.shape)
  .extend({ content: variantContentSchema });

export type CreateVariant = z.infer<typeof createVariantSchema>;
export type PatchVariant = z.infer<typeof patchVariantSchema>;
export type Variant = z.infer<typeof variantSchema>;
export type Localvariant = z.infer<typeof localVariantSchema>;
