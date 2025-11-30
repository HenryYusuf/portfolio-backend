import type { Context } from "hono";
import * as authService from "./auth.service";
import { successResponse, errorResponse } from "../../utils/response";

export const signUpController = async (c: Context) => {
  try {
    const body = await c.req.json();
    const result = await authService.signUp(body);
    return successResponse(c, result);
  } catch (e) {
    return errorResponse(c, "Failed to sign up", 500);
  }
};
