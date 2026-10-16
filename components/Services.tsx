import Link from "next/link";
import { services } from "@/data/site";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

type Built = { name: string; href?: string; external?: boolean };

function BuiltChip({ item, color }: { item: Built; color: string }) {
  if (!item.href) {
    return <span className="chip backdrop-blur-sm">{item.name}</span>;
  }

  const cls =
    "chip group/chip inline-flex items-center gap-1.5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-px hover:border-(--chip-accent) hover:text-(--chip-accent)";
  const style = { ["--chip-accent" as string]: color } as React.CSSProperties;

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        style={style}
        aria-label={item.name + " (opens live site in a new tab)"}
      >
        {item.name}
        <Icon name="external" className="h-3 w-3 opacity-70 transition-transform group-hover/chip:translate-x-px group-hover/chip:-translate-y-px" />
      </a>
    );
  }
  return (
    <Link href={item.href} className={cls} style={style}>
      {item.name}
      <Icon name="arrow" className="h-3 w-3 opacity-70 transition-transform group-hover/chip:translate-x-0.5" />
    </Link>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden border-t border-line bg-bg py-16 md:py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">Services</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-4xl">
            Software built around your business
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            From the first requirement to a deployed, working system. Tap any project below to open
            the live product.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 70}>
              <div className="card group relative h-full overflow-hidden p-6 hover:-translate-y-1">
                {/* faint themed picture behind the card */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-contain bg-right-bottom bg-no-repeat opacity-[0.16] transition-all duration-500 group-hover:scale-105 group-hover:opacity-[0.28] dark:opacity-[0.2] dark:group-hover:opacity-[0.34]"
                  style={{
                    backgroundImage: "url(" + s.image + ")",
                    maskImage: "linear-gradient(115deg, transparent 15%, #000 85%)",
                    WebkitMaskImage: "linear-gradient(115deg, transparent 15%, #000 85%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl"
                  style={{ backgroundColor: s.color + "33" }}
                />

                <div className="relative flex h-full flex-col">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset"
                    style={{
                      color: s.color,
                      backgroundColor: s.color + "1f",
                      ["--tw-ring-color" as string]: s.color + "40",
                    }}
                  >
                    <Icon name={s.icon} className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>

                  {s.built.length > 0 && (
                    <div className="mt-auto border-t border-line pt-4">
                      <p className="kicker uppercase tracking-widest">Built &middot; click to view</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {(s.built as readonly Built[]).map((b) => (
                          <li key={b.name}>
                            <BuiltChip item={b} color={s.color} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <a href="/#contact" className="btn btn-primary">
            Discuss Your Project
            <Icon name="arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
