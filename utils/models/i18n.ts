import { z } from "zod";

export const localeSchema = z.union([z.literal("pl"), z.literal("en")]);
export const currencySchema = z.union([z.literal("PLN"), z.literal("EUR")]);

export type Locale = z.infer<typeof localeSchema>;
export type Currency = z.infer<typeof currencySchema>;
