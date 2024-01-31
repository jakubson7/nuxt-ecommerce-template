import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body: { name?: string; password?: string } = await readBody(event);

  if (!body.name || !body.password) {
    throw createError({
      statusCode: 422,
      statusMessage: "name or password wrong!",
    });
  }

  const hashedPassword = await new Argon2id().hash(body.password);
  const ID = generateId(16);

  const user = await database()
    .insert(users)
    .values({
      ID,
      hashedPassword,
      name: body.name,
      email: "test@gmail.com",
      role: "admin",
    })
    .returning();

  return user[0];
});
