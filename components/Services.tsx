import Link from "next/link";
import { services } from "@/data/site";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

export default function Services() {
  return (
    <section id="services" className="border-t border-line bg-bg py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Services</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Software built around your business
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            From the first requirement to a deployed, working system.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 70}>
              <div className="card h-full p-5 hover:-translate-y-0.5">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ color: s.color, backgroundColor: s.color + "22" }}
                >
                  <Icon name={s.icon} className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
                {s.built.length > 0 && (
                  <div className="mt-4 border-t border-line pt-3">
                    <p className="kicker uppercase tracking-widest">Built</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {s.built.map((b) => (
                        <li key={b.name}>
                          {"href" in b && b.href ? (
                            <Link
                              href={b.href}
                              className="chip transition-colors hover:border-(--cyan) hover:text-(--cyan)"
                            >
                              {b.name}
                            </Link>
                          ) : (
                            <span className="chip">{b.name}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <a href="/#contact" className="btn btn-primary">
            Discuss Your Project
            <Icon name="arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
