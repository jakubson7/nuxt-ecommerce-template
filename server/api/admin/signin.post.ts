import { userSigninSchema } from "~/models";
import { Argon2id } from "oslo/password";

export default defineEventHandler(async (event) => {
  const t = await useTranslation(event);
  const body = await readValidatedBody(event, (body) =>
    userSigninSchema.safeParse(body)
  );

  if (!body.success)
    throw createError({
      statusCode: 403,
      message: JSON.stringify(body.error.flatten()),
    });

  const { email, password } = body.data;

  const user = await database().query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (!user)
    throw createError({
      status: 400,
      message: t("error.data.incorrectEmailOrPassword"),
    });

  const isPasswordValid = await new Argon2id().verify(
    user.hashedPassword,
    password
  );

  if (!isPasswordValid)
    throw createError({
      statusCode: 400,
      message: t("error.data.inecorrectEmailOrPassword"),
    });

  const session = await lucia.createSession(user.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );

  return user;
});
