"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { navLinks, site, socials } from "@/data/site";
import Icon from "@/components/Icon";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return <span className="block h-10 w-10" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:text-(--cyan)"
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[19px] w-[19px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[19px] w-[19px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}

function Logo({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <a
      href="/#home"
      onClick={onClick}
      className="flex items-center gap-2.5"
      aria-label="Frank Joe - home"
    >
      <span className="text-hero-gradient select-none pr-0.5 text-[28px] font-black italic leading-none tracking-tighter">
        FJ
      </span>
      <span className="text-[16px] font-extrabold uppercase tracking-[0.07em] text-ink">
        Frank<span className="text-hero-gradient">Joe</span>
      </span>
    </a>
  );
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-1.5 " + (className ?? "")}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label + " (opens in a new tab)"}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:text-(--cyan)"
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
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // On the home page, smooth-scroll and close the drawer. On other pages the
  // plain "/#section" link navigates home and lands on the section.
  const go = (id: string) => (e: React.MouseEvent) => {
    setIsOpen(false);
    if (!onHome) return;
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", "/#" + id);
    }
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-line bg-bg/80 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-[64px] items-center justify-between md:h-[72px]">
          <Logo onClick={go("home")} />

          {/* Desktop links */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-7" aria-label="Main">
            {navLinks.map(({ label, href, id }) => {
              const isActive = onHome && activeSection === id;
              return (
                <a
                  key={id}
                  href={href}
                  onClick={go(id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative py-2 text-[13px] font-semibold transition-colors duration-200",
                    isActive ? "text-ink" : "text-ink/75 hover:text-ink",
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-linear-to-r from-[#00c6ff] to-[#2f7bff] transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <SocialLinks className="hidden xl:flex" />
            <ThemeToggle />
            <a
              href="/#contact"
              onClick={go("contact")}
              className="btn btn-cyan px-5 py-2.5 text-[13px]"
            >
              Contact
              <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2.4} />
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
            >
              <span
                className={cn(
                  "block h-0.5 w-[22px] rounded-full bg-ink transition-all duration-300",
                  isOpen && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-[22px] rounded-full bg-ink transition-all duration-300",
                  isOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-[22px] rounded-full bg-ink transition-all duration-300",
                  isOpen && "-translate-y-[7px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300 lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={cn(
            "absolute right-0 top-0 flex h-full w-[min(20rem,86vw)] flex-col overflow-y-auto border-l border-line bg-surface px-6 pb-8 pt-24 shadow-2xl transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map(({ label, href, id }, idx) => {
              const isActive = onHome && activeSection === id;
              return (
                <a
                  key={id}
                  href={href}
                  onClick={go(id)}
                  aria-current={isActive ? "location" : undefined}
                  style={{ transitionDelay: isOpen ? idx * 35 + "ms" : "0ms" }}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-300",
                    isActive
                      ? "bg-brand-soft text-ink"
                      : "text-muted hover:bg-brand-soft hover:text-ink",
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isActive ? "bg-(--cyan)" : "bg-line",
                    )}
                  />
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="mt-auto pt-8">
            <a
              href="/#contact"
              onClick={go("contact")}
              className="btn btn-cyan w-full"
            >
              Let&apos;s Work Together
            </a>
            <a
              href={site.cv}
              download={site.cvFileName}
              className="btn btn-cyan-outline mt-3 w-full"
            >
              <Icon name="download" />
              Download CV
            </a>
            <SocialLinks className="mt-5 justify-center" />
          </div>
        </div>
      </div>
    </>
  );
}
