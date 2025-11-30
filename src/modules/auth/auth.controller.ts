import type { Context } from "hono";
import * as authService from "./auth.service";
import { successResponse, errorResponse } from "../../utils/response";

export const signUpController = async (c: Context) => {
  try {
    const body = await c.req.json();
    const result = await authService.signUp(body);
    return successResponse(c, result);
  } catch (e: any) {
    console.error("Sign up error:", e);
    if (e.statusCode === 422) {
      return errorResponse(c, e.body.message, e.statusCode);
    }

    return errorResponse(c, "Failed to sign up, please try again!", 500);
  }
};

export const signInController = async (c: Context) => {
  try {
    const headers = c.req.raw.headers;
    const body = await c.req.json();
    const result = await authService.signIn(body, headers);
    return successResponse(c, result);
  } catch (e: any) {
    console.error("Sign in error:", e);
    if (e.statusCode === 401) {
      return errorResponse(c, e.body.message, e.statusCode);
    }

    return errorResponse(c, "Failed to sign in, please try again!", 500);
  }
};

export const signOutController = async (c: Context) => {
  try {
    const headers = c.req.raw.headers;
    const result = await authService.signOut(headers);
    return successResponse(c, result);
  } catch (e: any) {
    console.error("Sign out error:", e);
    return errorResponse(c, "Failed to sign out, please try again!", 500);
  }
};
