import type { ReactNode } from "react";

type Step = { title: string; text: string; icon: ReactNode };

const steps: Step[] = [
  {
    title: "Discover",
    text: "Understand your needs",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
  {
    title: "Design",
    text: "Plan the best approach",
    icon: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
  },
  {
    title: "Build",
    text: "Write clean, scalable code",
    icon: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  },
  {
    title: "Test",
    text: "Ensure quality & security",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Deploy",
    text: "Launch to production",
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
    text: "Keep it running",
    icon: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-16 border-t border-line bg-bg py-16 md:py-20"
    >
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_3fr] lg:items-center lg:gap-8">
        <div>
          <p className="eyebrow">My Process</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            How I Work
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            A simple, effective process to turn ideas into great products.
          </p>
        </div>

        <ol className="relative lg:grid lg:grid-cols-6 lg:gap-2">
          {/* horizontal connector (desktop) */}
          <div
            className="absolute left-[8.3%] right-[8.3%] top-5 hidden h-px bg-line lg:block"
            aria-hidden="true"
          />

          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative flex gap-4 pb-8 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center"
            >
              {/* vertical connector (mobile) */}
              {i < steps.length - 1 && (
                <span
                  className="absolute left-5 top-10 h-[calc(100%-2.5rem)] w-px bg-line lg:hidden"
                  aria-hidden="true"
                />
              )}

              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/50 bg-card text-brand shadow-lg shadow-brand/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4.5 w-4.5"
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

              <div className="lg:mt-4">
                <h3 className="text-sm font-bold text-ink">
                  {i + 1}. {s.title}
                </h3>
                <p className="mt-1 text-xs leading-snug text-muted lg:px-1">
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
