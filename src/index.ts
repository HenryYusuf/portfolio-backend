import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { env } from "./config/env";
import { globalErrorHandler } from "./middlewares/error-handler";
import { auth } from "./lib/auth";

// Import Routes
import projectRoutes from "./modules/projects/projects.routes";
import authRoutes from "./modules/auth/auth.routes";

const app = new Hono();

// Global Middlewares
app.use("*", logger());
app.use("*", cors());

app.onError((err, c) => {
  return globalErrorHandler(err, c);
});

app.notFound((c) => {
  return c.json(
    {
      success: false,
      message: `Route not found: ${c.req.path}`,
      data: null,
    },
    404
  );
});

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/", (c) => c.text("Portfolio API is running! 🚀"));
app.route("/api/auth", authRoutes);
app.route("/api/projects", projectRoutes);

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
