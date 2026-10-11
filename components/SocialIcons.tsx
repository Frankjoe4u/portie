import { site, socials } from "@/data/site";
import Icon from "@/components/Icon";

const base =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors duration-200 hover:border-brand hover:text-brand";

export default function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-3 " + (className ?? "")}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label + " (opens in a new tab)"}
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
      <a href={"mailto:" + site.email} aria-label="Email" className={base}>
        <Icon name="mail" strokeWidth={2} />
      </a>
    </div>
  );
}
