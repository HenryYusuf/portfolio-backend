import { db } from "../../config/database";
import { projects } from "../../db/schema";
import { eq } from "drizzle-orm";

export const getAllProjects = async () => {
  return await db.select().from(projects);
};

export const createProject = async (data: typeof projects.$inferInsert) => {
  const result = await db.insert(projects).values(data).returning();
  return result;
};

export const getProjectById = async (id: number) => {
  const result = await db.select().from(projects).where(eq(projects.id, id));
  return result[0];
};

// Implement update & delete...
