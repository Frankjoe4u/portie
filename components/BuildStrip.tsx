import { buildCategories } from "@/data/site";

export default function BuildStrip() {
  return (
    <section
      aria-label="What I build"
      className="border-y border-line bg-surface/60 py-7"
    >
      <div className="container-x">
        <p className="eyebrow">What I build</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-medium text-ink sm:grid-cols-3 lg:grid-cols-6">
          {buildCategories.map((c) => (
            <li key={c} className="flex items-start gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-(--cyan)" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
