import SocialIcons from "./SocialIcons";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface py-10">
      <div className="container-x flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-10 w-10 select-none items-center justify-center rounded-xl bg-linear-to-br from-brand to-brand-2 text-sm font-black tracking-tight text-white shadow-lg shadow-brand/30">
            FJ
          </span>
          <span className="text-left">
            <span className="block text-sm font-bold leading-tight text-ink">
              Frank Joe
            </span>
            <span className="block text-xs text-muted">
              Full-Stack Software Engineer
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Footer"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs font-medium text-muted transition-colors duration-200 hover:text-brand"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <SocialIcons className="md:hidden" />

        <div className="flex items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Frank Joe. All rights reserved.
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors duration-200 hover:border-brand hover:text-brand md:flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
