import { skillGroups, practices, type SkillItem } from "@/data/site";
import { techIcons } from "@/data/techIcons";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

function SkillIcon({ icon }: { icon?: SkillItem["icon"] }) {
  if (!icon) {
    return <span className="h-1.5 w-1.5 rounded-full bg-(--cyan)" aria-hidden="true" />;
  }
  if (icon === "aws") {
    return (
      <span className="text-[10px] font-extrabold leading-none text-[#FF9900]" aria-hidden="true">
        aws
      </span>
    );
  }
  const item = techIcons[icon];
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill={item.color ?? "currentColor"}
      style={item.color ? undefined : { color: "var(--ink)" }}
      aria-hidden="true"
    >
      <path d={item.path} />
    </svg>
  );
}

export default function TechStack() {
  return (
    <section id="skills" className="border-t border-line bg-surface/40 py-16 md:py-24">
      <div className="container-x grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">Technical skills</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
              The tools I build with
            </h2>
          </Reveal>

          <div className="mt-8 space-y-6">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 60}>
                <h3 className="kicker uppercase tracking-widest">{g.title}</h3>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-1.5 text-sm font-medium text-ink"
                    >
                      <SkillIcon icon={s.icon} />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">Engineering</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Engineering with production in mind
            </h2>
          </Reveal>

          <ul className="mt-8 divide-y divide-line rounded-2xl border border-line bg-card">
            {practices.map((p) => (
              <li key={p.title} className="flex items-start gap-3 p-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-(--cyan)">
                  <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{p.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
