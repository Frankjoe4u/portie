import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";
import { BlogPost } from "@/models/BlogPost";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { slugify } from "@/lib/slugify";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  await dbConnect();

  const showAll = request.nextUrl.searchParams.get("all") === "true";

  const query = showAll ? {} : { published: true };
  const posts = await BlogPost.find(query).sort({ createdAt: -1 });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();

  try {
    const body = await request.json();
    const {
      title,
      tag,
      tagColor,
      excerpt,
      content,
      coverImage,
      coverImagePublicId,
      readTime,
      published,
    } = body;

    if (!title || !tag || !excerpt || !content) {
      return NextResponse.json(
        { error: "title, tag, excerpt, and content are required" },
        { status: 400 }
      );
    }

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let suffix = 1;

    while (await BlogPost.findOne({ slug })) {
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
    }

    const autoDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    const post = await BlogPost.create({
      slug,
      title,
      tag,
      tagColor: tagColor || "#facc15",
      date: body.date || autoDate,
      excerpt,
      content,
      coverImage,
      coverImagePublicId,
      readTime: readTime || "5 min read",
      published: published !== false,
    });

    revalidatePath("/");
    revalidatePath("/blog/[slug]", "page");

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("Create blog post error:", err);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
