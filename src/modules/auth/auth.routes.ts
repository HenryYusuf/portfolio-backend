import { Hono } from "hono";
import { validate } from "../../middlewares/validator";
import * as controller from "./auth.controller";
import { signUpSchema } from "./auth.schema";

const app = new Hono();

app.post(
  "/sign-up/email",
  validate("json", signUpSchema),
  controller.signUpController
);

export default app;
