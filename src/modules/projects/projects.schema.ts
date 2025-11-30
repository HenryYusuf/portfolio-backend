import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  url: z.string().optional(),
  techStack: z.array(z.string()).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();
