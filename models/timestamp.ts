import { z } from "zod";

export const timestampSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});
