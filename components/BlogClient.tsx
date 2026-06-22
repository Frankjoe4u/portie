"use client";

import { useEffect, useRef, useState } from "react";

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

export default function BlogClient({ posts }: { posts: BlogPostDisplay[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (posts.length === 0) {
    return (
      <section
        id="blog"
        ref={sectionRef}
        className="relative py-24 px-6 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0d0020 0%, #1a003e 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Latest <span className="text-yellow-400">Articles</span>
          </h2>
          <p className="text-gray-500 text-sm">
            No posts published yet. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0d0020 0%, #1a003e 100%)",
      }}
    >
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #facc15, transparent)" }}
      />
      <div
        className="absolute top-20 right-0 w-64 h-64 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
      />

      <div className="max-w-6xl mx-auto">
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div>
            <span className="text-yellow-400 text-sm font-bold tracking-widest uppercase">
              My Thoughts
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-4">
              Latest <span className="text-yellow-400">Articles</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <article
            className={`lg:col-span-2 relative flex flex-col justify-end rounded-2xl overflow-hidden border border-purple-800/30 hover:border-yellow-400/40 transition-all duration-500 group cursor-pointer min-h-105 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{
              background:
                "linear-gradient(160deg, rgba(124,58,237,0.12), rgba(13,0,32,0.98))",
              transitionDelay: "100ms",
            }}
          >
            <div
              className="absolute top-6 right-6 text-[120px] font-black leading-none select-none pointer-events-none"
              style={{ color: "rgba(250,204,21,0.04)" }}
            >
              01
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-b-2xl"
              style={{ background: featured.tagColor }}
            />

            {featured.coverImage && (
              <div className="absolute inset-0 z-0">
                <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(13,0,32,0.75) 35%, rgba(13,0,32,0.1) 100%)"}} />
              </div>
            )}
            <div className="relative z-10 p-8">
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: featured.tagColor }}
                />
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: featured.tagColor }}
                >
                  Featured
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full border"
                  style={{
                    color: featured.tagColor,
                    borderColor: `${featured.tagColor}55`,
                    background: `${featured.tagColor}10`,
                  }}
                >
                  {featured.tag}
                </span>
                <span className="text-xs text-gray-500">{featured.date}</span>
                <span className="text-xs text-gray-500">.</span>
                <span className="text-xs text-gray-500">
                  {featured.readTime}
                </span>
              </div>
              <h3 className="text-white text-xl font-extrabold leading-snug mb-4 group-hover:text-yellow-400 transition-colors duration-200">
                {featured.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <a
                href={`/blog/${featured.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-black px-5 py-2.5 rounded-full transition-all duration-200"
                style={{ background: featured.tagColor }}
              >
                Read Article
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </article>

          <div className="lg:col-span-3 flex flex-col gap-6">
            {rest.map((post, i: number) => (
              <article
                key={post.slug}
                className={`relative flex flex-col sm:flex-row gap-5 rounded-2xl p-6 border border-purple-800/30 hover:border-yellow-400/30 transition-all duration-500 group cursor-pointer overflow-hidden ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  transitionDelay: `${(i + 2) * 100}ms`,
                }}
              >
                <div
                  className="hidden sm:block w-1 shrink-0 rounded-full self-stretch opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: post.tagColor }}
                />
                <div
                  className="absolute right-5 top-4 text-6xl font-black leading-none select-none pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.03)" }}
                >
                  {String(i + 2).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full border"
                      style={{
                        color: post.tagColor,
                        borderColor: `${post.tagColor}55`,
                        background: `${post.tagColor}10`,
                      }}
                    >
                      {post.tag}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <span className="text-xs text-gray-500">.</span>
                    <span className="text-xs text-gray-500">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-white text-base font-extrabold leading-snug mb-2 group-hover:text-yellow-400 transition-colors duration-200 pr-8">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                    <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors duration-200"
                    style={{ color: post.tagColor }}
                  >
                    Read More
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className={`text-center mt-14 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-gray-500 text-sm mb-4">
            More articles on the way , follow along to stay updated.
          </p>
          <a
            href="https://github.com/Frankjoe4u"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Follow on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

