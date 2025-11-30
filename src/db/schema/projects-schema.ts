import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const projects = pgTable("project", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  url: text("url"),
  techStack: text("tech_stack").array(), // Simpan sebagai array string
  createdAt: timestamp("created_at").defaultNow(),
});
