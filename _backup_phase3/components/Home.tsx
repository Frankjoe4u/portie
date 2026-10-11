import Image from "next/image";
import { site } from "@/data/site";
import { techIcons } from "@/data/techIcons";
import Icon from "@/components/Icon";

const heroTech = [
  { name: "Next.js", icon: techIcons.nextjs },
  { name: "TypeScript", icon: techIcons.typescript },
  { name: "Node.js", icon: techIcons.nodejs },
  { name: "PostgreSQL", icon: techIcons.postgresql },
  { name: "MongoDB", icon: techIcons.mongodb },
];

const shipped = [
  "Authentication & role-based access",
  "Paystack webhook verified server-side",
  "Unique booking code + email confirmation",
  "Deployed to production",
];

export default function Home() {
  return (
    <section id="home" className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="hero-glow-cyan pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* Copy */}
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card/70 px-3.5 py-1.5 text-xs font-medium text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for freelance &amp; full-time opportunities
          </p>

          <p className="kicker mt-6">
            {site.name} / {site.role}
          </p>

          <h1 className="mt-3 text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            I build production-ready web applications and{" "}
            <span className="text-hero-gradient">business systems.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Full-Stack Software Engineer specializing in Next.js, TypeScript,
            Node.js and modern backend systems. I turn complex business
            requirements into reliable, scalable products.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/#projects" className="btn btn-cyan px-6 py-3">
              View My Work
              <Icon name="arrow" />
            </a>
            <a
              href={site.cv}
              download={site.cvFileName}
              className="btn btn-cyan-outline px-6 py-3"
            >
              <Icon name="download" />
              Download CV
            </a>
            <a
              href="/#contact"
              className="group inline-flex items-center justify-center gap-1.5 px-2 py-3 text-sm font-semibold text-ink transition-colors hover:text-(--cyan)"
            >
              Let&apos;s Work Together
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs text-muted">
            <Icon name="pin" className="h-3.5 w-3.5" strokeWidth={2} />
            Based in Nigeria &middot; Available remotely
          </p>

          <ul
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6"
            aria-label="Core technologies"
          >
            {heroTech.map((t) => (
              <li key={t.name} className="flex items-center gap-2 text-xs font-medium text-muted">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill={t.icon.color ?? "currentColor"}
                  style={t.icon.color ? undefined : { color: "var(--ink)" }}
                  aria-hidden="true"
                >
                  <path d={t.icon.path} />
                </svg>
                {t.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="hex mx-auto w-[15rem] bg-linear-to-br from-[#00c6ff] via-[#2f7bff] to-[#8b5cf6] p-[3px] sm:w-[19rem] lg:w-[22rem]">
            <div className="hex relative aspect-square w-full bg-surface">
              <Image
                src="/pix1.jpg"
                alt="Portrait of Frank Joe"
                fill
                priority
                sizes="(min-width: 1024px) 352px, (min-width: 640px) 304px, 240px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="float-slow relative z-10 -mt-8 w-full rounded-2xl border border-line bg-card/95 p-4 shadow-xl backdrop-blur sm:-mt-12 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="kicker">production / 5g-hotel</p>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                live
              </span>
            </div>
            <ul className="mt-3 space-y-2">
              {shipped.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[13px] leading-snug text-ink">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
