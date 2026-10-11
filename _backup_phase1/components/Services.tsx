import type { ReactNode } from "react";

type Service = {
  title: string;
  text: string;
  color: string;
  icon: ReactNode;
};

const services: Service[] = [
  {
    title: "SaaS Applications",
    text: "Scalable and modern web apps",
    color: "#3b73ff",
    icon: (
      <>
        <path d="m12 2 10 5-10 5L2 7l10-5z" />
        <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
      </>
    ),
  },
  {
    title: "Business Platforms",
    text: "Custom solutions for your business",
    color: "#6366f1",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </>
    ),
  },
  {
    title: "Dashboards",
    text: "Data-driven and interactive",
    color: "#14b8a6",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 15 4-4 3 3 5-6" />
      </>
    ),
  },
  {
    title: "APIs & Backend Systems",
    text: "Secure and reliable APIs",
    color: "#3b82f6",
    icon: (
      <>
        <rect x="2" y="3" width="20" height="7" rx="2" />
        <rect x="2" y="14" width="20" height="7" rx="2" />
        <path d="M6 6.5h.01M6 17.5h.01" />
      </>
    ),
  },
  {
    title: "AI-Powered Applications",
    text: "Smart solutions with AI",
    color: "#d946ef",
    icon: (
      <>
        <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
        <path d="m19 15 .7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7L19 15z" />
      </>
    ),
  },
  {
    title: "Mobile & Web Apps",
    text: "Cross-platform & responsive",
    color: "#ef4444",
    icon: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-16 border-t border-line bg-bg py-16 md:py-20"
    >
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-10">
        <div>
          <p className="eyebrow">What I Build</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Services I Offer
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            I build digital solutions that help businesses, individuals and
            organizations grow.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="card flex items-center gap-3.5 p-4">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ color: s.color, backgroundColor: s.color + "22" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {s.icon}
                </svg>
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-ink">{s.title}</h3>
                <p className="mt-0.5 text-xs leading-snug text-muted">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
