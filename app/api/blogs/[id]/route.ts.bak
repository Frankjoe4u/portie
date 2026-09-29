import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";
import { BlogPost } from "@/models/BlogPost";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { deleteCloudinaryImage } from "@/lib/cloudinary";
import { slugify } from "@/lib/slugify";

export async function PUT(
  request: NextRequest,
  context: RouteContext<"/api/blogs/[id]">
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();

  try {
    const { id } = await context.params;
    const body = await request.json();
    const {
      title,
      tag,
      tagColor,
      date,
      excerpt,
      content,
      coverImage,
      coverImagePublicId,
      readTime,
      published,
    } = body;

    const existing = await BlogPost.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (title && title !== existing.title) {
      const baseSlug = slugify(title);
      let slug = baseSlug;
      let suffix = 1;
      while (await BlogPost.findOne({ slug, _id: { $ne: id } })) {
        suffix += 1;
        slug = `${baseSlug}-${suffix}`;
      }
      existing.slug = slug;
      existing.title = title;
    }

    if (
      coverImage &&
      existing.coverImagePublicId &&
      coverImagePublicId &&
      existing.coverImagePublicId !== coverImagePublicId
    ) {
      await deleteCloudinaryImage(existing.coverImagePublicId);
    }

    existing.tag = tag ?? existing.tag;
    existing.tagColor = tagColor ?? existing.tagColor;
    existing.date = date ?? existing.date;
    existing.excerpt = excerpt ?? existing.excerpt;
    existing.content = content ?? existing.content;
    existing.coverImage = coverImage ?? existing.coverImage;
    existing.coverImagePublicId =
      coverImagePublicId ?? existing.coverImagePublicId;
    existing.readTime = readTime ?? existing.readTime;
    if (typeof published === "boolean") existing.published = published;

    await existing.save();

    return NextResponse.json(existing);
  } catch (err) {
    console.error("Update blog post error:", err);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext<"/api/blogs/[id]">
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();

  try {
    const { id } = await context.params;
    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await deleteCloudinaryImage(post.coverImagePublicId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete blog post error:", err);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
