"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const FEATURE_COUNT = 3; // posts that rotate in the carousel
const MORE_STEP = 4;
const AUTOPLAY_MS = 7000;

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

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={dir === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
    </svg>
  );
}

function Meta({ post }: { post: BlogPostDisplay }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
      <span className="chip">{post.tag}</span>
      <span>{post.date}</span>
      <span aria-hidden="true">&middot;</span>
      <span>{post.readTime}</span>
    </div>
  );
}

function SideCard({
  post,
  onSelect,
  label,
}: {
  post: BlogPostDisplay;
  onSelect: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={label + ": " + post.title}
      className="card group hidden w-full scale-[0.94] self-center p-2.5 text-left opacity-70 transition-all duration-300 hover:scale-[0.97] hover:opacity-100 md:block"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface">
        <Cover src={post.coverImage} tag={post.tag} />
      </div>
      <div className="px-1 pb-1 pt-3">
        <span className="chip">{post.tag}</span>
        <h3 className="mt-2 line-clamp-3 text-sm font-bold leading-snug text-ink">{post.title}</h3>
        <p className="mt-2 text-[11px] text-muted">{post.readTime}</p>
      </div>
    </button>
  );
}

export default function BlogClient({
  posts,
  error = false,
}: {
  posts: BlogPostDisplay[];
  error?: boolean;
}) {
  const featured = posts.slice(0, FEATURE_COUNT);
  const more = posts.slice(FEATURE_COUNT);
  const n = featured.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [moreCount, setMoreCount] = useState(MORE_STEP);
  const touchX = useRef<number | null>(null);

  const go = useCallback((d: number) => setActive((i) => (i + d + n) % n), [n]);

  useEffect(() => {
    if (n < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [n, paused, go]);

  const main = featured[active];
  const prev = n >= 3 ? featured[(active - 1 + n) % n] : null;
  const next = n >= 2 ? featured[(active + 1) % n] : null;

  return (
    <section id="blog" className="relative overflow-hidden border-t border-line bg-bg py-16 md:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">From The Blog</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Thoughts, lessons and tutorials from my journey building for the web.
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
          <>
            {/* Carousel: one big card in the middle, a small one on each side */}
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured articles"
              className="relative mt-12"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null || n < 2) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") go(-1);
                if (e.key === "ArrowRight") go(1);
              }}
            >
              <div
                className={
                  "grid items-stretch gap-5 " +
                  (n >= 3 ? "md:grid-cols-[1fr_2.2fr_1fr]" : n === 2 ? "md:grid-cols-[2.2fr_1fr]" : "")
                }
              >
                {prev && <SideCard post={prev} label="Previous article" onSelect={() => go(-1)} />}

                <Link
                  key={main.slug}
                  href={"/blog/" + main.slug}
                  aria-live="polite"
                  className="card carousel-in group relative flex flex-col p-3.5 shadow-xl md:p-4"
                >
                  <div className="aspect-[16/9] overflow-hidden rounded-xl border border-line bg-surface">
                    <Cover src={main.coverImage} tag={main.tag} />
                  </div>
                  <div className="flex flex-1 flex-col px-1.5 pb-2 pt-5 md:px-2">
                    <Meta post={main} />
                    <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-tight text-ink md:text-2xl">
                      {main.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{main.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand">
                      Read Article
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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

                {next && <SideCard post={next} label="Next article" onSelect={() => go(1)} />}
              </div>

              {n > 1 && (
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous article"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    <Arrow dir="left" />
                  </button>
                  <div className="flex items-center gap-2">
                    {featured.map((p, i) => (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={"Show article " + (i + 1) + " of " + n}
                        aria-current={i === active}
                        className={
                          "h-2 rounded-full transition-all duration-300 " +
                          (i === active ? "w-7 bg-brand" : "w-2 bg-line hover:bg-muted")
                        }
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next article"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    <Arrow dir="right" />
                  </button>
                </div>
              )}
            </div>

            {/* Read more */}
            {more.length > 0 && (
              <div className="mt-16">
                <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
                  <h3 className="text-lg font-bold tracking-tight text-ink md:text-xl">Read more articles</h3>
                  <span className="kicker">{more.length} more</span>
                </div>

                <ul className="mt-6 grid gap-4 md:grid-cols-2">
                  {more.slice(0, moreCount).map((post) => (
                    <li key={post.slug}>
                      <Link href={"/blog/" + post.slug} className="card group flex h-full gap-4 p-3">
                        <div className="aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg border border-line bg-surface sm:w-36">
                          <Cover src={post.coverImage} tag={post.tag} />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col py-0.5">
                          <Meta post={post} />
                          <h4 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-ink">
                            {post.title}
                          </h4>
                          <span className="mt-auto pt-2 text-xs font-semibold text-brand">Read Article &rarr;</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {more.length > moreCount && (
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={() => setMoreCount((c) => c + MORE_STEP)}
                      className="btn btn-outline"
                    >
                      Load more articles
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
