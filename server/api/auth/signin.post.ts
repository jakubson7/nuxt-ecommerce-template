export default defineEventHandler(async (event) => {
  const userResult = await readValidatedBody(event, (body) =>
    userParamsSchema.safeParse(body)
  );

  if (!userResult.success)
    throw createError({
      statusCode: 403,
      message: JSON.stringify(userResult.error.issues),
    });

  return userResult.data;
});
