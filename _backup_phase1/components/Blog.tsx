import { dbConnect } from "@/lib/db/mongoose";
import { BlogPost } from "@/models/BlogPost";
import BlogClient, { type BlogPostDisplay } from "./BlogClient";

export default async function Blog() {
  await dbConnect();

  const docs = await BlogPost.find({ published: true })
    .sort({ createdAt: -1 })
    .lean();

  const posts: BlogPostDisplay[] = docs.map((p) => ({
    slug: p.slug,
    tag: p.tag,
    tagColor: p.tagColor,
    date: p.date,
    readTime: p.readTime,
    title: p.title,
    excerpt: p.excerpt,
    coverImage: p.coverImage || "",
  }));

  return <BlogClient posts={posts} />;
}
