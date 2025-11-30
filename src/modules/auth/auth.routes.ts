import { Hono } from "hono";
import { validate } from "../../middlewares/validator";
import * as controller from "./auth.controller";
import { signInSchema, signUpSchema } from "./auth.schema";

const app = new Hono();

app.post(
  "/sign-up/email",
  validate("json", signUpSchema),
  controller.signUpController
);

app.post(
  "/sign-in/email",
  validate("json", signInSchema),
  controller.signInController
);

app.post("/sign-out", controller.signOutController);

export default app;
