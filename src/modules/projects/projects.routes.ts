import { Hono } from "hono";
import { validate } from "../../middlewares/validator";
import * as controller from "./projects.controller";
import { createProjectSchema } from "./projects.schema";
import { authMiddleware } from "../../middlewares/auth-guard"; // Kita buat nanti

const app = new Hono();

app.get("/", controller.getProjects);

// Route yang butuh login
app.post(
  "/",
  authMiddleware,
  validate("json", createProjectSchema),
  controller.createProject
);

export default app;
