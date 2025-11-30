import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../config/database"; // your drizzle instance
import * as schema from "../db/schema";
import { bearer } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [bearer()],
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  advanced: {
    disableOriginCheck: true,
  },
  emailAndPassword: {
    enabled: true,
  },
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
