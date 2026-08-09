import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";
import { Project } from "@/models/Project";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { revalidatePath } from "next/cache";

export async function GET() {
  await dbConnect();
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();

  try {
    const body = await request.json();
    const { title, tech, live, github, color, image, imagePublicId, order } =
      body;

    if (!title || !live || !github || !image) {
      return NextResponse.json(
        { error: "title, live, github, and image are required" },
        { status: 400 }
      );
    }

    const project = await Project.create({
      title,
      tech: Array.isArray(tech) ? tech : [],
      live,
      github,
      color: color || "#facc15",
      image,
      imagePublicId,
      order: typeof order === "number" ? order : 0,
    });

    revalidatePath("/");

    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error("Create project error:", err);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
