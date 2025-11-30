import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  // Node Env
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // App Port
  PORT: z.coerce.number().default(3000),

  // Database
  DATABASE_URL: z.url(),

  // Better Auth
  BETTER_AUTH_SECRET: z
    .string()
    .min(10, "Secret must be at least 10 characters long"),
  BETTER_AUTH_URL: z.url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    z.flattenError(parsedEnv.error).fieldErrors
  );
  process.exit(1);
}

export const env = parsedEnv.data;
