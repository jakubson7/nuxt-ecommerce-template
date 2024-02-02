import { createVariantSchema } from "~/models";
import VariantRepo from "~/server/database/repo/variant";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    createVariantSchema.safeParse(body)
  );

  if (!body.success) throw createError({ statusCode: 422 });

  const variant = await new VariantRepo().insertVariant(body.data);

  if (!variant) throw createError({ statusCode: 400 });

  return variant;
});
