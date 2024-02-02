import { z } from "zod";

export type UserRole = "admin";

export const userSignupSchema = z.object({
  email: z.string().email(),
  name: z.string().min(4).max(64),
  password: z.string().min(8).max(64),
  role: z.literal("admin"),
});

export const userSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(64),
});
