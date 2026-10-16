import HotelHero from "@/components/HotelHero";
import Link from "next/link";
import { featuredProject as p } from "@/data/projects";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

export default function FeaturedProject() {
  return (
    <Reveal>
      <article className="card overflow-hidden p-0 hover:bg-card">
        <HotelHero className="aspect-[4/3] w-full border-b border-line sm:aspect-[16/9] lg:aspect-[21/9]" />
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          {/* Story */}
          <div className="p-6 md:p-9">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-brand-soft px-3 py-1 text-[11px] font-semibold text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {p.badge}
            </p>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
              {p.title}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-(--cyan) md:text-base">{p.subtitle}</p>

            <dl className="mt-6 space-y-4">
              {p.story.map((s) => (
                <div key={s.label} className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                  <dt className="kicker pt-0.5 uppercase tracking-widest">{s.label}</dt>
                  <dd className="text-sm leading-relaxed text-ink/90">{s.text}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology">
              {p.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {p.caseStudy && (
                <Link href={"/projects/" + p.slug} className="btn btn-cyan px-5 py-2.5">
                  View Case Study
                  <Icon name="arrow" />
                </Link>
              )}
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-cyan-outline px-5 py-2.5"
                >
                  Live Demo
                  <Icon name="external" />
                </a>
              )}
              <a href="/#contact" className="btn btn-cyan-outline px-5 py-2.5">
                Need something similar?
              </a>
            </div>
          </div>

          {/* System preview: booking flow + features */}
          <div className="border-t border-line bg-surface/70 p-6 md:p-9 lg:border-l lg:border-t-0">
            <p className="kicker">booking flow</p>
            <ol className="mt-4">
              {p.flow.map((step, i) => (
                <li key={step.title} className="relative flex gap-3.5 pb-5 last:pb-0">
                  {i < p.flow.length - 1 && (
                    <span
                      className="absolute left-[13px] top-7 h-[calc(100%-1.25rem)] w-px bg-line"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--cyan-line) bg-bg text-[11px] font-bold text-(--cyan)">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{step.title}</p>
                    <p className="text-xs text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="kicker mt-7">what it does</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="rounded-md border border-line bg-card px-2 py-1 text-[11px] font-medium leading-tight text-muted"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
