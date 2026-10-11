import { fiveGHotel } from "@/data/caseStudies";

const a = fiveGHotel.architecture;

function Tier({
  label,
  title,
  items,
  accent,
}: {
  label: string;
  title: string;
  items: readonly string[];
  accent?: boolean;
}) {
  return (
    <div
      className={
        "rounded-2xl border p-4 md:p-5 " +
        (accent ? "border-(--cyan-line) bg-brand-soft" : "border-line bg-card")
      }
    >
      <p className="kicker uppercase tracking-widest">{label}</p>
      <p className="mt-1 text-sm font-bold text-ink md:text-base">{title}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {items.map((i) => (
          <li
            key={i}
            className="rounded-md border border-line bg-bg px-2 py-1 text-[11px] font-medium leading-tight text-muted md:text-xs"
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Link({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center py-1.5" aria-hidden="true">
      <span className="h-3 w-px bg-line" />
      <svg className="h-3 w-3 text-(--cyan)" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 10 1.5 4h9z" />
      </svg>
      <span className="kicker mt-0.5 text-[10px]">{text}</span>
    </div>
  );
}

export default function ArchitectureDiagram() {
  return (
    <figure>
      <div className="grid gap-6 lg:grid-cols-[1fr_16rem] lg:items-start">
        <div>
          <Tier label="Clients" title="Browsers and phones" items={a.clients} />
          <Link text="HTTPS" />
          <Tier label="Frontend" title="Next.js application (TypeScript)" items={a.app} accent />
          <Link text="requests" />
          <Tier label="Backend" title="Backend / API layer" items={a.api} accent />
          <Link text="queries" />
          <Tier label="Data" title="Supabase / PostgreSQL" items={a.data} />
        </div>

        <div className="space-y-3 rounded-2xl border border-dashed border-line p-4">
          <p className="kicker uppercase tracking-widest">External services</p>
          {a.external.map((s) => (
            <div key={s.name} className="rounded-xl border border-line bg-card p-3.5">
              <p className="text-sm font-bold text-ink">{s.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
          <p className="text-[11px] leading-relaxed text-muted">
            Both connect to the backend layer: Paystack calls back with a webhook, and confirmation
            emails are sent from the backend.
          </p>
        </div>
      </div>
      <figcaption className="sr-only">
        System architecture: clients use the Next.js application, which calls the backend API layer,
        which reads and writes Supabase PostgreSQL and talks to Paystack and the email service.
      </figcaption>
    </figure>
  );
}
