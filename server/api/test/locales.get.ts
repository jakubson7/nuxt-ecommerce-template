import { database } from "~/server/database/services";

export default defineEventHandler(async () => {
  const db = database();
  const locales = await db.query.locales.findMany();
  return { locales };
});
