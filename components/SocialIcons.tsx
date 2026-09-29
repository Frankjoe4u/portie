import { techIcons } from "@/data/techIcons";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/Frankjoe4u",
    path: techIcons.github.path,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/frankjoe4u",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  },
  {
    label: "X",
    href: "https://x.com/FJ_AirMayCar",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

const base =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors duration-200 hover:border-brand hover:text-brand";

export default function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-3 " + (className ?? "")}>
      {links.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={base}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={s.path} />
          </svg>
        </a>
      ))}
      <a href="mailto:frankjoe4u@gmail.com" aria-label="Email" className={base}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </a>
    </div>
  );
}
