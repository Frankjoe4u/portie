import Image from "next/image";
import { navLinks, site, socials } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface pb-8 pt-12">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="/#home" className="inline-flex items-center gap-3" aria-label="Frank Joe - back to top">
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-(--cyan) ring-offset-2 ring-offset-surface">
                <Image src="/pix2.jpg" alt="" fill sizes="44px" className="object-cover object-[50%_22%] contrast-[1.08] saturate-[1.1]" />
              </span>
              <span className="text-lg font-extrabold uppercase tracking-[0.07em] text-ink">
                Frank<span className="text-hero-gradient">Joe</span>
              </span>
            </a>
            <p className="mt-1 text-sm font-medium text-ink">{site.role}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="kicker uppercase tracking-widest">Navigation</h2>
            <ul className="mt-3 space-y-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="kicker uppercase tracking-widest">Connect</h2>
            <ul className="mt-3 space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label + " (opens in a new tab)"}
                    className="text-sm text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="kicker uppercase tracking-widest">Contact</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={"mailto:" + site.email}
                  className="break-all text-sm text-muted transition-colors duration-200 hover:text-ink"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-muted">
          &copy; {new Date().getFullYear()} {site.legalName} ({site.name}). All rights reserved.
        </p>
      </div>
    </footer>
  );
}
