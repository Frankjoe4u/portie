import HotelHero from "@/components/HotelHero";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import BookingFlow from "@/components/BookingFlow";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { fiveGHotel as cs } from "@/data/caseStudies";
import { featuredProject } from "@/data/projects";
import { loadGallery } from "@/lib/gallery";

const path = "/projects/" + cs.slug;

export const metadata: Metadata = {
  title: cs.title + " - Case Study",
  description: cs.description,
  alternates: { canonical: path },
  openGraph: {
    title: cs.title + " - Case Study",
    description: cs.description,
    url: path,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: cs.title + " - Case Study",
    description: cs.description,
  },
};

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-12 first:border-t-0 first:pt-0 md:py-14">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </Reveal>
    </section>
  );
}

function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <div className="max-w-2xl space-y-4">
      {items.map((p) => (
        <p key={p} className="text-base leading-relaxed text-muted">
          {p}
        </p>
      ))}
    </div>
  );
}

export default function FiveGHotelCaseStudy() {
  const images = loadGallery();

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "The problem" },
    { id: "solution", label: "The solution" },
    { id: "features", label: "Key features" },
    { id: "technology", label: "Technology" },
    { id: "architecture", label: "Architecture" },
    { id: "booking-flow", label: "Booking flow" },
    { id: "challenges", label: "Challenges" },
    { id: "security", label: "Security" },
    ...(images.length > 0 ? [{ id: "screenshots", label: "Screenshots" }] : []),
    { id: "outcome", label: "Outcome" },
    { id: "lessons", label: "Lessons learned" },
  ];

  return (
    <div className="bg-bg">
      <Navbar />
      <main id="main" className="hero-glow-cyan px-5 pb-24 pt-24 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            All projects
          </Link>

          <header className="mt-6 max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-brand-soft px-3 py-1 text-[11px] font-semibold text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Case study
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
              {cs.title}
            </h1>
            <p className="mt-3 text-lg font-medium text-(--cyan)">{cs.subtitle}</p>

            <dl className="mt-8 grid gap-4 border-y border-line py-5 sm:grid-cols-3">
              {cs.meta.map((m) => (
                <div key={m.label}>
                  <dt className="kicker uppercase tracking-widest">{m.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {featuredProject.liveUrl && (
                <a
                  href={featuredProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-cyan px-5 py-2.5"
                >
                  Live Demo
                  <Icon name="external" />
                </a>
              )}
              <a href="/#contact" className="btn btn-cyan-outline px-5 py-2.5">
                Discuss a similar project
              </a>
            </div>
          </header>

          <HotelHero
            priority
            className="mt-10 aspect-[4/3] w-full rounded-2xl border border-line shadow-2xl sm:aspect-[16/9] lg:aspect-[21/9]"
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-14">
            {/* Sticky section nav (desktop) */}
            <nav aria-label="Case study sections" className="hidden lg:block">
              <ul className="sticky top-28 space-y-2 border-l border-line pl-4">
                {nav.map((n) => (
                  <li key={n.id}>
                    <a
                      href={"#" + n.id}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0">
              <Section id="overview" eyebrow="Overview" title="What it is">
                <Paragraphs items={[cs.overview]} />
              </Section>

              <Section id="problem" eyebrow="The problem" title="What the hotel needed">
                <Paragraphs items={cs.problem} />
              </Section>

              <Section id="solution" eyebrow="The solution" title="What I built">
                <Paragraphs items={cs.solution} />
              </Section>

              <Section id="features" eyebrow="Key features" title="What the system does">
                <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {cs.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-soft text-(--cyan)">
                        <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="technology" eyebrow="Technology" title="What it is built with">
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cs.tech.map((t) => (
                    <li key={t.name} className="rounded-xl border border-line bg-card p-4">
                      <p className="text-sm font-bold text-ink">{t.name}</p>
                      <p className="mt-0.5 text-xs text-muted">{t.role}</p>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="architecture" eyebrow="Architecture" title="How the pieces fit together">
                <ArchitectureDiagram />
              </Section>

              <Section id="booking-flow" eyebrow="Booking flow" title="From search to confirmed room">
                <BookingFlow />
              </Section>

              <Section id="challenges" eyebrow="Challenges" title="Problems I had to solve, and how">
                <div className="grid gap-4 md:grid-cols-2">
                  {cs.challenges.map((c) => (
                    <article key={c.title} className="rounded-2xl border border-line bg-card p-5">
                      <h3 className="text-base font-bold text-ink">{c.title}</h3>
                      <p className="kicker mt-4 uppercase tracking-widest">Challenge</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{c.problem}</p>
                      <p className="kicker mt-4 uppercase tracking-widest">How I solved it</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink/90">{c.solution}</p>
                    </article>
                  ))}
                </div>
              </Section>

              <Section id="security" eyebrow="Security" title="How it is protected">
                <ul className="divide-y divide-line rounded-2xl border border-line bg-card">
                  {cs.security.map((s) => (
                    <li key={s.title} className="flex items-start gap-3 p-4">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-(--cyan)">
                        <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{s.title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>

              {images.length > 0 && (
                <Section id="screenshots" eyebrow="Screenshots" title="The system in use">
                  <Gallery images={images} name={cs.title} />
                </Section>
              )}

              <Section id="outcome" eyebrow="Outcome" title="Where it stands">
                <Paragraphs items={cs.outcome} />
              </Section>

              <Section id="lessons" eyebrow="Lessons learned" title="What this project taught me">
                <ul className="max-w-2xl space-y-3">
                  {cs.lessons.map((l) => (
                    <li key={l} className="flex items-start gap-3 text-base leading-relaxed text-muted">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--cyan)" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                </ul>
              </Section>

              <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-card p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-base font-bold text-ink">Need a system like this?</p>
                  <p className="mt-1 text-sm text-muted">
                    I build production-ready web applications and business systems.
                  </p>
                </div>
                <Link href="/#contact" className="btn btn-cyan shrink-0 px-5 py-2.5">
                  Start a Conversation
                  <Icon name="arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
