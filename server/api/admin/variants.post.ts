import { createVariantSchema } from "~/utils/models";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    createVariantSchema.safeParse(body)
  );

  if (!result.success) throw createError({ statusCode: 422 });

  const db = database();
  const variant = await insertVariant(db, result.data);

  return variant;
});
