import { auth } from "../../lib/auth";
import type { SignInData, SignUpData } from "./auth.types";

export const signUp = async (data: SignUpData) => {
  try {
    return await auth.api.signUpEmail({ body: data });
  } catch (e) {
    throw e;
  }
};

export const signIn = async (data: SignInData, headers: Headers) => {
  try {
    return await auth.api.signInEmail({ body: data, headers });
  } catch (e) {
    throw e;
  }
};

export const signOut = async (headers: Headers) => {
  try {
    return await auth.api.signOut({ headers });
  } catch (e) {
    throw e;
  }
};
