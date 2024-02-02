import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { users } from "~/server/database/schema";
import { userSignupSchema } from "~/models";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    userSignupSchema.safeParse(body)
  );

  if (!body.success)
    throw createError({
      statusCode: 422,
      message: JSON.stringify(body.error.flatten()),
    });

  const { password, name, email, role } = body.data;
  const hashedPassword = await new Argon2id().hash(password);
  const id = generateId(16);

  const user = await database()
    .insert(users)
    .values({
      id,
      hashedPassword,
      name,
      email,
      role,
    })
    .returning();

  const session = await lucia.createSession(id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
  return user[0];
});
