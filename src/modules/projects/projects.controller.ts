import type { Context } from "hono";
import * as projectService from "./projects.service";
import { successResponse, errorResponse } from "../../utils/response";

export const getProjects = async (c: Context) => {
  try {
    const data = await projectService.getAllProjects();
    return successResponse(c, data);
  } catch (e) {
    return errorResponse(c, "Failed to fetch projects", 500);
  }
};

export const createProject = async (c: Context) => {
  try {
    const body = await c.req.json();
    const newProject = await projectService.createProject(body);
    return successResponse(c, newProject, "Project created", 201);
  } catch (e) {
    return errorResponse(c, "Failed to create project", 500);
  }
};
