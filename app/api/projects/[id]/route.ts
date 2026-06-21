import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";
import { Project } from "@/models/Project";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { deleteCloudinaryImage } from "@/lib/cloudinary";

export async function PUT(
  request: NextRequest,
  context: RouteContext<"/api/projects/[id]">
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();

  try {
    const { id } = await context.params;
    const body = await request.json();
    const { title, tech, live, github, color, image, imagePublicId, order } =
      body;

    const existing = await Project.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (
      image &&
      existing.imagePublicId &&
      imagePublicId &&
      existing.imagePublicId !== imagePublicId
    ) {
      await deleteCloudinaryImage(existing.imagePublicId);
    }

    existing.title = title ?? existing.title;
    existing.tech = Array.isArray(tech) ? tech : existing.tech;
    existing.live = live ?? existing.live;
    existing.github = github ?? existing.github;
    existing.color = color ?? existing.color;
    existing.image = image ?? existing.image;
    existing.imagePublicId = imagePublicId ?? existing.imagePublicId;
    if (typeof order === "number") existing.order = order;

    await existing.save();

    return NextResponse.json(existing);
  } catch (err) {
    console.error("Update project error:", err);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext<"/api/projects/[id]">
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();

  try {
    const { id } = await context.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await deleteCloudinaryImage(project.imagePublicId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete project error:", err);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
