import type { MetadataRoute } from "next";
import { dbConnect } from "@/lib/db/mongoose";
import { BlogPost } from "@/models/BlogPost";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
  ];

  try {
    await dbConnect();
    const posts = await BlogPost.find({ published: true }).select("slug updatedAt").lean();
    for (const p of posts) {
      entries.push({
        url: site.url + "/blog/" + p.slug,
        lastModified: p.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch (err) {
    console.error("sitemap: could not load blog posts", err);
  }

  return entries;
}
