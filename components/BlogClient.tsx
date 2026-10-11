"use client";

import { useState } from "react";
import Link from "next/link";

export type BlogPostDisplay = {
  coverImage?: string;
  slug: string;
  tag: string;
  tagColor: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
};

const INITIAL_COUNT = 3;

function Cover({ src, tag }: { src?: string; tag: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand/30 to-brand-2/30 px-4 text-center text-lg font-extrabold tracking-tight text-ink">
        {tag}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading="lazy"
      ref={(el) => {
        if (el && el.complete && el.naturalWidth === 0) setFailed(true);
      }}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export default function BlogClient({
  posts,
  error = false,
}: {
  posts: BlogPostDisplay[];
  error?: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? posts : posts.slice(0, INITIAL_COUNT);

  return (
    <section
      id="blog"
      className="border-t border-line bg-bg py-16 md:py-24"
    >
      <div className="container-x">
        <div>
          <p className="eyebrow">From The Blog</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Latest Articles
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Thoughts, lessons and tutorials from my journey building for the
            web.
          </p>
        </div>

        {error ? (
          <div role="alert" className="mt-10 rounded-2xl border border-dashed border-line p-8 text-center">
            <p className="text-sm font-semibold text-ink">Articles couldn&apos;t be loaded right now.</p>
            <p className="mt-1 text-xs text-muted">Check your connection and try again.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-outline mt-4 px-4 py-2 text-xs"
            >
              Reload
            </button>
          </div>
        ) : posts.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-line py-14 text-center text-sm text-muted">
            New articles are coming soon.
          </p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <Link
                key={post.slug}
                href={"/blog/" + post.slug}
                className="card group flex flex-col p-3"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-xl border border-line bg-surface">
                  <Cover src={post.coverImage} tag={post.tag} />
                </div>

                <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
                    <span className="chip">{post.tag}</span>
                    <span>{post.date}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="mt-3 line-clamp-2 text-base font-bold leading-snug text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
                    {post.excerpt}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold text-brand">
                    Read Article
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {posts.length > INITIAL_COUNT && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="btn btn-outline"
            >
              {showAll ? "Show Less" : "View All Posts"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
