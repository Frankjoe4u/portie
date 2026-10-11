"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  PROJECT_CATEGORIES,
  categoryLabel,
  type ProjectCategory,
} from "@/lib/projectCategories";
import { techIcons } from "@/data/techIcons";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { selectedProjectPatterns } from "@/data/projects";

export type ProjectDisplay = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory | null;
  tech: string[];
  live: string;
  github: string;
  image: string;
};

type Filter = "all" | ProjectCategory;

const SELECTED_COUNT = 3;
const FILTER_MIN = 6;

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function ProjectImage({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand/30 to-brand-2/30 text-2xl font-extrabold text-ink">
        {title.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={title + " preview"}
      loading="lazy"
      decoding="async"
      ref={(el) => {
        if (el && el.complete && el.naturalWidth === 0) setFailed(true);
      }}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

function ProjectLinks({ p }: { p: ProjectDisplay }) {
  return (
    <div className="flex gap-2">
      {p.live && (
        <a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={"Live demo of " + p.title + " (opens in a new tab)"}
          className="btn btn-primary px-4 py-2 text-xs"
        >
          <Icon name="external" className="h-3.5 w-3.5" />
          Live Demo
        </a>
      )}
      {p.github && (
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.title + " on GitHub (opens in a new tab)"}
          className="btn btn-outline px-4 py-2 text-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={techIcons.github.path} />
          </svg>
          GitHub
        </a>
      )}
    </div>
  );
}

function SelectedCard({ p }: { p: ProjectDisplay }) {
  return (
    <article className="card group flex h-full flex-col p-3 hover:-translate-y-0.5">
      <div className="aspect-video overflow-hidden rounded-xl border border-line bg-surface">
        <ProjectImage src={p.image} title={p.title} />
      </div>
      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
        {p.category && <p className="kicker uppercase tracking-widest">{categoryLabel(p.category)}</p>}
        <h4 className="mt-1 text-base font-bold text-ink">{p.title}</h4>
        {p.description && (
          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted">{p.description}</p>
        )}
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.tech.slice(0, 4).map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          <ProjectLinks p={p} />
        </div>
      </div>
    </article>
  );
}

function CarouselCard({ p }: { p: ProjectDisplay }) {
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden p-0 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface">
        <ProjectImage src={p.image} title={p.title} />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent"
          aria-hidden="true"
        />
        {p.category && (
          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
            {categoryLabel(p.category)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h4 className="text-base font-bold text-ink">{p.title}</h4>
        {p.description && (
          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted">{p.description}</p>
        )}
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.tech.slice(0, 3).map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          <ProjectLinks p={p} />
        </div>
      </div>
    </article>
  );
}

function Carousel({ items, resetKey }: { items: ProjectDisplay[]; resetKey: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState({ start: true, end: false, progress: 0 });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPos({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft >= max - 4,
      progress: max > 0 ? el.scrollLeft / max : 0,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    update();
    const onResize = () => update();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [resetKey, items.length, update]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-ink transition-all duration-200 hover:border-(--cyan) hover:text-(--cyan) disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink";

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div
          className="h-1 w-24 overflow-hidden rounded-full bg-line sm:w-40"
          role="presentation"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-[#00c6ff] to-[#8b5cf6] transition-[width] duration-200"
            style={{ width: Math.max(18, 18 + pos.progress * 82) + "%" }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={pos.start}
            aria-label="Previous projects"
            className={arrow}
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={pos.end}
            aria-label="Next projects"
            className={arrow}
          >
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ul
        ref={ref}
        onScroll={update}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="More projects"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByPage(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByPage(-1);
          }
        }}
        className="snap-row -mx-5 mt-5 flex gap-4 overflow-x-auto scroll-smooth px-5 pb-6 pt-1 [scroll-padding-inline:1.25rem] motion-reduce:scroll-auto md:mx-0 md:px-0 md:[scroll-padding-inline:0]"
      >
        {items.map((p) => (
          <li key={p.id} className="w-[78vw] max-w-[22rem] shrink-0 sm:w-[20rem]">
            <CarouselCard p={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectsClient({
  projects,
  error = false,
}: {
  projects: ProjectDisplay[];
  error?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  if (error) {
    return (
      <div role="alert" className="mt-8 rounded-2xl border border-dashed border-line p-8 text-center">
        <Icon name="alert" className="mx-auto h-6 w-6 text-muted" strokeWidth={1.8} />
        <p className="mt-3 text-sm font-semibold text-ink">Projects couldn&apos;t be loaded right now.</p>
        <p className="mt-1 text-xs text-muted">Check your connection and try again.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn btn-outline mt-4 px-4 py-2 text-xs"
        >
          Reload
        </button>
      </div>
    );
  }

  if (projects.length === 0) return null;

  // Pinned projects first (in the order set in data/projects.ts), then pad
  // with the next projects so the section always has a full row.
  const pinned: ProjectDisplay[] = [];
  for (const pattern of selectedProjectPatterns) {
    const re = new RegExp(pattern, "i");
    const hit = projects.find((p) => re.test(p.title) && !pinned.includes(p));
    if (hit) pinned.push(hit);
  }
  const selected = [
    ...pinned,
    ...projects.filter((p) => !pinned.includes(p)).slice(0, Math.max(0, SELECTED_COUNT - pinned.length)),
  ];
  const more = projects.filter((p) => !selected.includes(p));

  const presentCategories = PROJECT_CATEGORIES.filter((c) =>
    more.some((p) => p.category === c.value),
  );
  const showFilters = more.length > FILTER_MIN && presentCategories.length > 1;
  const filtered = filter === "all" ? more : more.filter((p) => p.category === filter);

  return (
    <>
      <div className="mt-14">
        <Reveal>
          <p className="eyebrow">Selected projects</p>
        </Reveal>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <SelectedCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>

      {more.length > 0 && (
        <div className="mt-16">
          <Reveal>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow">More projects</p>
                <p className="mt-1 text-sm text-muted">Swipe or use the arrows to browse.</p>
              </div>
              {showFilters && (
                <div
                  role="group"
                  aria-label="Filter more projects"
                  className="-mx-5 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0 lg:pb-0"
                >
                  <div className="flex w-max gap-1 rounded-full border border-line bg-card p-1">
                    {[{ value: "all" as Filter, label: "All" }, ...presentCategories].map((f) => (
                      <button
                        key={f.value}
                        type="button"
                        aria-pressed={filter === f.value}
                        onClick={() => setFilter(f.value as Filter)}
                        className={cn(
                          "whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200",
                          filter === f.value
                            ? "bg-linear-to-r from-brand to-brand-2 text-white shadow-md shadow-brand/30"
                            : "text-muted hover:text-ink",
                        )}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <div className="mt-6">
            <Carousel items={filtered} resetKey={filter} />
          </div>
        </div>
      )}
    </>
  );
}
