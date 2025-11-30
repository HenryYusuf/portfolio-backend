import { email, z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  image: z.url().optional(),
  callbackUrl: z.url().optional(),
});
