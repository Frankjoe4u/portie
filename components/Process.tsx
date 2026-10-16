import type { ReactNode } from "react";

type Step = { title: string; text: string; outcome: string; icon: ReactNode };

const steps: Step[] = [
  {
    title: "Discover",
    text: "Understand the business, its users and its constraints before a single line of code is written.",
    outcome: "Clear scope & priorities",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
  {
    title: "Design",
    text: "Map the data model, user flows and system architecture so the build has a solid foundation.",
    outcome: "Architecture & UI plan",
    icon: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
  },
  {
    title: "Build",
    text: "Ship typed, modular code in small increments so progress is visible and easy to review.",
    outcome: "Working features, early",
    icon: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  },
  {
    title: "Test",
    text: "Verify payments, permissions and edge cases, and harden every API route before release.",
    outcome: "A secure, verified release",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Deploy",
    text: "Go live on production infrastructure with environment config, domains and HTTPS in place.",
    outcome: "A live production system",
    icon: (
      <>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </>
    ),
  },
  {
    title: "Maintain",
    text: "Fix, refine and scale the system as the business and its users grow.",
    outcome: "Ongoing support",
    icon: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative scroll-mt-16 overflow-hidden border-t border-line bg-surface/40 py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-(--cyan-glow) opacity-40 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">My Process</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-4xl">
            How I Work
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            A disciplined, transparent process. Every stage ends with something concrete you can
            review, so there are no surprises at launch.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="group relative">
              <div className="card relative h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1">
                <span
                  className="pointer-events-none absolute -right-2 -top-4 select-none font-mono text-7xl font-black leading-none text-brand/10 transition-colors duration-300 group-hover:text-brand/20"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-brand to-brand-2 text-white shadow-lg shadow-brand/25">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </svg>
                </span>

                <p className="kicker mt-5 uppercase tracking-widest">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>

                <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-xs font-semibold text-ink">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </span>
                  {s.outcome}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
