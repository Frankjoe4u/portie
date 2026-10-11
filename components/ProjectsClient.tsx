"use client";

import { useState } from "react";
import {
  PROJECT_CATEGORIES,
  categoryLabel,
  type ProjectCategory,
} from "@/lib/projectCategories";
import { techIcons } from "@/data/techIcons";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

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
const MORE_INITIAL = 6;

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

function CompactCard({ p }: { p: ProjectDisplay }) {
  return (
    <article className="card group flex gap-3.5 p-3">
      <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-line bg-surface sm:h-24 sm:w-32">
        <ProjectImage src={p.image} title={p.title} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        {p.category && <p className="kicker uppercase tracking-widest">{categoryLabel(p.category)}</p>}
        <h4 className="truncate text-sm font-bold text-ink">{p.title}</h4>
        {p.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{p.description}</p>
        )}
        <div className="mt-auto pt-2">
          <ProjectLinks p={p} />
        </div>
      </div>
    </article>
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
  const [showAll, setShowAll] = useState(false);

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

  const selected = projects.slice(0, SELECTED_COUNT);
  const more = projects.slice(SELECTED_COUNT);

  const presentCategories = PROJECT_CATEGORIES.filter((c) =>
    more.some((p) => p.category === c.value),
  );
  // Filtering only appears when it genuinely helps discovery.
  const showFilters = more.length > MORE_INITIAL && presentCategories.length > 1;

  const filtered = filter === "all" ? more : more.filter((p) => p.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, MORE_INITIAL);

  const changeFilter = (value: Filter) => {
    setFilter(value);
    setShowAll(false);
  };

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
        <div className="mt-14">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <p className="eyebrow">More projects</p>
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
                      onClick={() => changeFilter(f.value as Filter)}
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

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {visible.map((p) => (
              <CompactCard key={p.id} p={p} />
            ))}
          </div>

          {filtered.length > MORE_INITIAL && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                className="btn btn-outline"
              >
                {showAll ? "Show Less" : "View All Projects"}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
