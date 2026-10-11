import { aboutAreas, journey, site } from "@/data/site";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-bg py-16 md:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-4xl">
            Full-Stack Software Engineer building for real businesses
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            I&apos;m a Full-Stack Software Engineer focused on building
            production-ready web applications and business systems. I take a
            project from requirements to a deployed product, and I care that it
            keeps working once real people depend on it.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            My experience covers the whole stack:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Areas of experience">
            {aboutAreas.map((a) => (
              <li key={a} className="chip px-3 py-1 text-xs">
                {a}
              </li>
            ))}
          </ul>
          <a
            href={site.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-8"
          >
            Learn More About Me
            <Icon name="arrow" />
          </a>
        </Reveal>

        <Reveal delay={100}>
          <p className="kicker mb-5">journey</p>
          <ol className="relative space-y-7 border-l border-line pl-7">
            {journey.map((j) => (
              <li key={j.year} className="relative">
                <span
                  className="absolute -left-[2.2rem] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-(--cyan) bg-bg"
                  aria-hidden="true"
                />
                <p className="text-lg font-bold text-ink">{j.year}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{j.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
