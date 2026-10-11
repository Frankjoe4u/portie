import { fiveGHotel } from "@/data/caseStudies";

export default function BookingFlow() {
  const steps = fiveGHotel.flow;
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s} className="flex items-start gap-3 rounded-xl border border-line bg-card p-3.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--cyan-line) bg-bg text-[11px] font-bold text-(--cyan)">
            {i + 1}
          </span>
          <span className="pt-0.5 text-sm leading-snug text-ink">{s}</span>
        </li>
      ))}
    </ol>
  );
}
