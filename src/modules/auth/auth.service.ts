import { auth } from "../../lib/auth";
import type { SignUpData } from "./auth.types";

export const signUp = async (data: SignUpData) => {
  return await auth.api.signUpEmail({ body: data });
};
