import { z } from "zod";
import { localeSchema } from "./i18n";

export const variantTypeSchema = z.union([
  z.literal("color"),
  z.literal("size"),
]);

export type VariantType = z.infer<typeof variantTypeSchema>;

export const createVariantSchema = z.object({
  id: z.string().length(32),
  text: z.string().max(128),
  type: variantTypeSchema,
  metadata: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  contents: z.record(
    localeSchema,
    z.object({
      description: z.string().max(512),
      metadata: z.string(),
    })
  ),
});

export type CreateVariantSchema = z.infer<typeof createVariantSchema>;
