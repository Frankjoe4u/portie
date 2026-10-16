import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db/mongoose";
import { BlogPost } from "@/models/BlogPost";
import BlogMarkdown from "@/components/BlogMarkdown";
import ShareButtons from "@/components/ShareButtons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { extractHeadings, readingTime } from "@/lib/blog";
import { site } from "@/data/site";

async function getPost(slug: string) {
  await dbConnect();
  const post = await BlogPost.findOne({ slug, published: true }).lean();
  return post;
}

async function getRelated(slug: string, tag: string) {
  const others = await BlogPost.find({ published: true, slug: { $ne: slug } })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();
  // Same category first, then newest.
  return others
    .sort((a, b) => Number(b.tag === tag) - Number(a.tag === tag))
    .slice(0, 3);
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
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: "/blog/" + slug },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: "/blog/" + slug,
      type: "article",
      authors: [site.name],
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
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

  const related = await getRelated(slug, post.tag);
  const headings = extractHeadings(post.content);
  const minutes = readingTime(post.content);
  const url = site.url + "/blog/" + slug;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: site.legalName, alternateName: site.name, url: site.url },
    datePublished: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
    mainEntityOfPage: url,
    ...(post.coverImage ? { image: post.coverImage } : {}),
  };

  return (
    <div className="bg-bg">
      <Navbar />
      <main id="main" className="hero-glow min-h-screen px-5 pb-24 pt-24 md:pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blog
          </Link>
        </div>

        <article className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="chip">{post.tag}</span>
            <span>{post.date}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{minutes}</span>
          </div>

          <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mb-8 text-lg font-medium leading-relaxed text-muted">{post.excerpt}</p>

          <div className="mb-10 flex items-center gap-4 border-b border-line pb-8">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-brand/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pix1.jpg"
                alt="Frank Joe"
                className="h-full w-full object-cover object-[28%_center]"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">{site.name}</p>
              <p className="text-xs text-muted">{site.role}, Nigeria</p>
            </div>
          </div>

          {post.coverImage && (
            <div className="mb-10 aspect-video overflow-hidden rounded-2xl border border-line bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={"Cover image for " + post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {headings.length >= 4 && (
            <nav
              aria-label="Table of contents"
              className="mb-10 rounded-2xl border border-line bg-card p-5"
            >
              <p className="kicker uppercase tracking-widest">On this page</p>
              <ol className="mt-3 space-y-2">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={"#" + h.id}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <BlogMarkdown content={post.content} />

          <div className="mt-14 border-t border-line pt-8">
            <ShareButtons url={url} title={post.title} />
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-card p-6 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-sm font-bold text-ink">Building something similar?</p>
              <p className="text-sm text-muted">
                I build production-ready web apps and business systems.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/#blog" className="btn btn-outline px-4 py-2 text-sm">
                All Posts
              </Link>
              <Link href="/#contact" className="btn btn-primary px-4 py-2 text-sm">
                Discuss Your Project
              </Link>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <aside aria-labelledby="related-heading" className="mx-auto mt-16 max-w-5xl">
            <h2 id="related-heading" className="eyebrow">
              Related posts
            </h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={"/blog/" + r.slug} className="card flex h-full flex-col p-5">
                    <span className="chip self-start">{r.tag}</span>
                    <span className="mt-3 line-clamp-2 text-base font-bold leading-snug text-ink">
                      {r.title}
                    </span>
                    <span className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
                      {r.excerpt}
                    </span>
                    <span className="mt-auto pt-4 text-xs font-semibold text-brand">
                      Read Article
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </main>
      <Footer />
    </div>
  );
}
