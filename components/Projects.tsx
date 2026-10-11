import { dbConnect } from "@/lib/db/mongoose";
import { Project } from "@/models/Project";
import { isProjectCategory } from "@/lib/projectCategories";
import FeaturedProject from "./FeaturedProject";
import ProjectsClient, { type ProjectDisplay } from "./ProjectsClient";
import Reveal from "./Reveal";

async function loadProjects(): Promise<{ projects: ProjectDisplay[]; error: boolean }> {
  try {
    await dbConnect();
    const docs = await Project.find().sort({ order: 1, createdAt: -1 }).lean();

    const projects: ProjectDisplay[] = docs
      // The flagship project is rendered separately above the list.
      .filter((p) => !/\b5g\b/i.test(p.title))
      .map((p) => ({
        id: String(p._id),
        title: p.title,
        description: p.description ?? "",
        category: isProjectCategory(p.category) ? p.category : null,
        tech: p.tech ?? [],
        live: p.live,
        github: p.github,
        image: p.image,
      }));

    return { projects, error: false };
  } catch (err) {
    console.error("Failed to load projects", err);
    return { projects: [], error: true };
  }
}

export default async function Projects() {
  const { projects, error } = await loadProjects();

  return (
    <section id="projects" className="border-t border-line bg-bg py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Projects</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-4xl">
            Systems I&apos;ve built and shipped
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Each project started with a real business problem. These are the ones I&apos;m
            proudest of.
          </p>
        </Reveal>

        <div className="mt-10">
          <FeaturedProject />
        </div>

        <ProjectsClient projects={projects} error={error} />
      </div>
    </section>
  );
}
