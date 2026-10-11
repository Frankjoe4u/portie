import { currentlyBuilding, statusMeta } from "@/data/site";
import Reveal from "@/components/Reveal";

export default function CurrentlyBuilding() {
  if (currentlyBuilding.length === 0) return null;

  return (
    <section aria-labelledby="building-heading" className="border-t border-line bg-surface/40 py-12 md:py-14">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Currently building</p>
          <h2 id="building-heading" className="sr-only">
            Currently building
          </h2>
        </Reveal>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {currentlyBuilding.map((b) => {
            const s = statusMeta[b.status];
            return (
              <li key={b.name}>
                <div className="card flex items-start justify-between gap-4 p-4">
                  <div>
                    <p className="text-sm font-bold text-ink">{b.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{b.text}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] font-semibold text-ink">
                    <span className={"h-1.5 w-1.5 rounded-full " + s.dot} aria-hidden="true" />
                    {s.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
