import { experience } from "@/data/site";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line bg-surface/40 py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Experience</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            What I do day to day
          </h2>
        </Reveal>

        <div className="mt-8 space-y-5">
          {experience.map((e) => (
            <Reveal key={e.role + e.period}>
              <article className="card p-6 md:p-8">
                <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-ink md:text-xl">{e.role}</h3>
                    <p className="mt-0.5 text-sm font-medium text-(--cyan)">{e.org}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-sm font-semibold text-ink">{e.period}</p>
                    <p className="kicker mt-0.5">{e.meta}</p>
                  </div>
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{e.summary}</p>

                <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-ink">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-soft text-(--cyan)">
                        <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
