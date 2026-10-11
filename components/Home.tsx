import { site } from "@/data/site";
import { techIcons } from "@/data/techIcons";
import Icon from "@/components/Icon";
import HeroPortraits from "@/components/HeroPortraits";

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

const chips = [
  { label: "Next.js", pos: "left-0 top-[14%] sm:-left-4" },
  { label: "Supabase", pos: "right-0 top-[8%] sm:-right-4" },
  { label: "Paystack", pos: "right-0 top-[52%] sm:-right-6" },
];

export default function Home() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="hero-glow-cyan pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <p
        aria-hidden="true"
        className="watermark-text pointer-events-none absolute inset-x-0 top-20 select-none text-center text-[26vw] font-black uppercase leading-none tracking-tighter md:top-24 lg:text-[15rem]"
      >
        Frank Joe
      </p>

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
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

          <h1 className="mt-3 text-[2.15rem] font-extrabold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
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
        <div className="relative mx-auto w-full max-w-md lg:max-w-xl">
          <div
            className="pointer-events-none absolute left-1/2 top-[40%] h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--cyan-glow) blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto w-[17rem] sm:w-[25rem] lg:w-[29rem]">
            {/* offset outline hex */}
            <div
              className="hex absolute inset-0 translate-x-5 translate-y-4 rotate-[8deg] bg-linear-to-br from-[#00c6ff] to-[#8b5cf6] p-[2px] opacity-60"
              aria-hidden="true"
            >
              <div className="hex h-full w-full bg-bg" />
            </div>

            {/* main portrait */}
            <div className="relative drop-shadow-[0_24px_50px_var(--cyan-glow)]">
              <div className="hex bg-linear-to-br from-[#00c6ff] via-[#2f7bff] to-[#8b5cf6] p-[5px]">
                <div className="hex relative aspect-square w-full bg-surface">
                  <HeroPortraits />
                </div>
              </div>
            </div>

            {chips.map((c) => (
              <span
                key={c.label}
                aria-hidden="true"
                className={
                  "float-slow absolute hidden rounded-xl border border-line bg-card/95 px-3 py-1.5 text-xs font-bold text-ink shadow-lg backdrop-blur sm:block " +
                  c.pos
                }
              >
                {c.label}
              </span>
            ))}
          </div>

          <div className="relative z-10 -mt-10 w-full rounded-2xl border border-line bg-card/95 p-4 shadow-xl backdrop-blur sm:-mt-14 sm:p-5">
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
