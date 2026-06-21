import { dbConnect } from "@/lib/db/mongoose";
import { Project } from "@/models/Project";
import ProjectsClient, { type ProjectDisplay } from "./ProjectsClient";

export default async function Projects() {
  await dbConnect();

  const docs = await Project.find().sort({ order: 1, createdAt: -1 }).lean();

  const projects: ProjectDisplay[] = docs.map((p) => ({
    title: p.title,
    tech: p.tech,
    live: p.live,
    github: p.github,
    color: p.color,
    image: p.image,
  }));

  return <ProjectsClient projects={projects} />;
}
