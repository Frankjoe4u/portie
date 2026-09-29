import Image from "next/image";
import { Caveat } from "next/font/google";

const script = Caveat({ subsets: ["latin"], weight: ["500", "700"] });

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Frankjoe4u",
    path: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/franklin-emeka-agbo-799396431?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  },
  {
    label: "X",
    href: "https://x.com/FJ_AirMayCar",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

export default function Home() {
  return (
    <section
      id="home"
      className="hero-glow relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        {/* Text */}
        <div className="order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-brand-soft px-3.5 py-1.5 text-xs font-medium text-ink">
            <span aria-hidden="true">{"\uD83D\uDC4B"}</span>
            Hello, I&apos;m
          </span>

          <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Frank <span className="text-brand-gradient">Joe</span>
          </h1>

          <p className="mt-4 text-xl font-semibold text-ink md:text-2xl">
            Full-Stack Software Engineer
          </p>

          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            I build modern web applications that solve real problems, create
            great user experiences and drive impact.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="btn btn-primary">
              View My Projects
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
            <a href="#contact" className="btn btn-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              Let&apos;s Work Together
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors duration-200 hover:border-brand hover:text-brand"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
            <a
              href="mailto:frankjoe4u@gmail.com"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors duration-200 hover:border-brand hover:text-brand"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
            <a
              href="/Agbo_Franklin_Emeka_CV.pdf"
              download="Agbo_Franklin_Emeka_CV.pdf"
              className="ml-1 text-sm font-medium text-muted underline-offset-4 transition-colors duration-200 hover:text-brand hover:underline"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Portrait */}
        <div className="order-2 mx-auto w-full max-w-md lg:max-w-lg">
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-brand/40 to-brand-2/40 opacity-70 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative aspect-4/5 overflow-hidden rounded-4xl border border-line shadow-2xl">
              <Image
                src="/pix1.jpg"
                alt="Frank Joe, full-stack software engineer"
                fill
                priority
                sizes="(min-width: 1024px) 512px, (min-width: 448px) 448px, 100vw"
                className="object-cover object-[28%_center]"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-bg/60 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Script note */}
            <div
              className={
                script.className +
                " pointer-events-none absolute -top-3 right-2 rotate-6 text-2xl leading-6 text-ink sm:-right-4 sm:text-3xl sm:leading-7"
              }
              aria-hidden="true"
            >
              <span className="block">Build</span>
              <span className="block">Create</span>
              <span className="block">Impact</span>
            </div>

            {/* Availability */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border border-line bg-card/90 px-3 py-2 text-xs font-medium text-ink shadow-lg backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Available for
              <br />
              new opportunities
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
