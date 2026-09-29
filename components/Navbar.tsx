"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

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

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="flex items-center gap-2.5"
      aria-label="Frank Joe - home"
    >
      <span className="text-hero-gradient select-none pr-0.5 text-[30px] font-black italic leading-none tracking-tighter">
        FJ
      </span>
      <span className="text-[17px] font-extrabold uppercase tracking-[0.07em] text-ink">
        Frank<span className="text-hero-gradient">Joe</span>
      </span>
    </a>
  );
}

export default function Navbar() {
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const goTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-line bg-bg/80 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-[68px] items-center justify-between md:h-[78px]">
          <Logo onClick={() => goTo("#home")} />

          {/* Desktop links */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(href);
                  }}
                  className={cn(
                    "relative py-2 text-[13px] font-semibold transition-colors duration-200",
                    isActive ? "text-ink" : "text-ink/80 hover:text-ink",
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
          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                goTo("#contact");
              }}
              className="btn btn-cyan px-5 py-2.5 text-[13px]"
            >
              Let&apos;s Talk
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
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
          className={cn(
            "absolute right-0 top-0 flex h-full w-72 flex-col border-l border-line bg-surface px-6 pb-10 pt-24 shadow-2xl transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <nav className="flex flex-1 flex-col gap-1.5" aria-label="Mobile">
            {navLinks.map(({ label, href }, idx) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(href);
                  }}
                  style={{ transitionDelay: isOpen ? idx * 40 + "ms" : "0ms" }}
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

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              goTo("#contact");
            }}
            className="btn btn-cyan w-full"
          >
            Let&apos;s Talk
          </a>
          <a
            href="/Agbo_Franklin_Emeka_CV.pdf"
            download="Agbo_Franklin_Emeka_CV.pdf"
            className="btn btn-cyan-outline mt-3 w-full"
          >
            Download CV
          </a>
        </div>
      </div>
    </>
  );
}
