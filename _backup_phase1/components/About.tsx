import TechStack from "./TechStack";

const timeline = [
  {
    year: "2021",
    text: "Started learning to code (HTML, CSS, JS)",
    icon: <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />,
  },
  {
    year: "2025",
    text: "Joined NEXTCOLLEGE (Full-stack mentorship)",
    icon: <path d="M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 2 9 2 12 0v-5" />,
  },
  {
    year: "Today",
    text: "Building real projects, sharpening skills, and chasing bigger dreams.",
    icon: <path d="M4 22V4M4 4h13l-2 4 2 4H4" />,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-t border-line bg-bg py-16 md:py-20"
    >
      <div className="container-x grid gap-10 md:grid-cols-2 lg:grid-cols-[1fr_0.9fr_1.25fr] lg:gap-8">
        {/* Story */}
        <div>
          <p className="eyebrow">About Me</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            My Journey
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            I&apos;m Emeka (Frank Joe), a passionate Full-Stack Software
            Engineer with a strong interest in building scalable web
            applications and solving real-world problems through technology.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            My journey started with a curiosity to understand how the web
            works, and over time, it turned into a mission &mdash; to build
            products that make life easier, help people and create impact.
          </p>
          <a
            href="/Agbo_Franklin_Emeka_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-6"
          >
            More About Me
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
          </a>
        </div>

        {/* Timeline (hidden on phones, as in the mockup) */}
        <div className="hidden md:block">
          <div className="card divide-y divide-line shadow-none">
            {timeline.map((t) => (
              <div key={t.year} className="flex items-start gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
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
                    {t.icon}
                  </svg>
                </span>
                <div>
                  <p className="text-base font-bold text-ink">{t.year}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {t.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="md:col-span-2 lg:col-span-1">
          <TechStack />
        </div>
      </div>
    </section>
  );
}
