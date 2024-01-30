import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/database/schema/index.ts",
  out: "./server/database/migrations",

  // For local development only
  driver: "better-sqlite",
  dbCredentials: {
    url: "local_data/dev.sqlite",
  },
  verbose: true,
});
