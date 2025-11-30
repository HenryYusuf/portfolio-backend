import type { Context, Env } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError, z } from "zod";
import { env } from "../config/env";

export const globalErrorHandler = (
  err: Error | HTTPException,
  c: Context<any, any, {}>
) => {
  let status = 500;
  let message = "Internal Server Error";
  let errors: any = undefined;

  // 1. Handle Hono HTTP Exceptions (misal: c.notFound(), 401, dll)
  if (err instanceof HTTPException) {
    status = err.status;
    message = err.message;
  }

  // 2. Handle Zod Validation Errors (dari zValidator)
  // Ini menangkap error jika validasi input gagal
  else if (err instanceof ZodError) {
    status = 400;
    message = "Validation Error";
    errors = z.flattenError(err).fieldErrors;
  }

  // 3. Handle Generic Errors
  else {
    message = err.message || "Something went wrong";
  }

  // Log error di console (kecuali di test environment)
  if (env.NODE_ENV !== "test") {
    console.error(
      `[${new Date().toISOString()}] ${c.req.method} ${
        c.req.path
      } >> Status: ${status}`
    );
    console.error(err);
  }

  // Return JSON Response Konsisten
  return c.json(
    {
      success: false,
      message: message,
      errors: errors,
      // Tampilkan stack trace hanya di mode development untuk debugging
      stack: env.NODE_ENV === "development" ? err.stack : undefined,
    },
    status as any
  );
};
