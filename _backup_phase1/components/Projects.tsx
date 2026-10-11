import { dbConnect } from "@/lib/db/mongoose";
import { Project } from "@/models/Project";
import { isProjectCategory } from "@/lib/projectCategories";
import ProjectsClient, { type ProjectDisplay } from "./ProjectsClient";

export default async function Projects() {
  await dbConnect();

  const docs = await Project.find().sort({ order: 1, createdAt: -1 }).lean();

  const projects: ProjectDisplay[] = docs.map((p) => ({
    id: String(p._id),
    title: p.title,
    description: p.description ?? "",
    category: isProjectCategory(p.category) ? p.category : null,
    tech: p.tech ?? [],
    live: p.live,
    github: p.github,
    image: p.image,
  }));

  return <ProjectsClient projects={projects} />;
}
