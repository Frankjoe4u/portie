import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db/mongoose";
import { BlogPost } from "@/models/BlogPost";
import BlogMarkdown from "@/components/BlogMarkdown";

async function getPost(slug: string) {
  await dbConnect();
  const post = await BlogPost.findOne({ slug, published: true }).lean();
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title + " | Frank Joe",
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="hero-glow min-h-screen bg-bg px-5 pb-24 pt-24 md:pt-28">
      <div className="mx-auto mb-10 max-w-3xl">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors duration-200 hover:text-brand"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M19 12H5M12 5l-7 7 7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Blog
        </Link>
      </div>

      <article className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="chip">{post.tag}</span>
          <span>{post.date}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <p className="mb-10 border-b border-line pb-10 text-lg font-medium leading-relaxed text-muted">
          {post.excerpt}
        </p>

        <div className="mb-12 flex items-center gap-4">
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-brand/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pix1.jpg"
              alt="Frank Joe"
              className="h-full w-full object-cover object-[28%_center]"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-ink">Franklin Emeka Agbo</p>
            <p className="text-xs text-muted">Full Stack Developer, Nigeria</p>
          </div>
        </div>

        <BlogMarkdown content={post.content} />

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-bold text-ink">
              Enjoyed this article?
            </p>
            <p className="text-sm text-muted">
              More posts on the way. Follow along on GitHub.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/#blog" className="btn btn-outline px-4 py-2 text-sm">
              All Posts
            </Link>
            <Link href="/#contact" className="btn btn-primary px-4 py-2 text-sm">
              Let&apos;s Build
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
