"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-purple-800/50 hover:border-yellow-400/50 transition-colors duration-200 ${className}`}
    >
      {theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-[#0d0020]/90 backdrop-blur-md border-b border-gray-200 dark:border-purple-900/40 shadow-lg shadow-black/10 dark:shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center gap-2 group"
          >
            <span className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-black font-black text-sm select-none">
              FJ
            </span>
            <span className="text-gray-900 dark:text-white font-extrabold text-lg tracking-tight group-hover:text-yellow-400 transition-colors duration-200">
              Frank
              <span className="text-yellow-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                Joe
              </span>
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                
                  key={label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-black bg-yellow-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA + toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            
              href="/Agbo_Franklin_Emeka_CV.pdf"
              download="Agbo_Franklin_Emeka_CV.pdf"
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-full transition-all duration-200 shadow-md shadow-yellow-400/20 hover:shadow-yellow-400/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="flex flex-col justify-center items-center w-10 h-10 gap-1.25 rounded-lg border border-gray-300 dark:border-purple-800/50 hover:border-yellow-400/50 transition-colors duration-200"
            >
              <span
                className={`block w-5 h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.75" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.75" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white dark:bg-[#0d0020] border-l border-gray-200 dark:border-purple-900/50 flex flex-col pt-24 pb-10 px-6 transition-transform duration-300 shadow-2xl ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile links */}
          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map(({ label, href }, idx) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                
                  key={label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  style={{ transitionDelay: isOpen ? `${idx * 40}ms` : "0ms" }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-black bg-yellow-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  } ${isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-black" : "bg-purple-500"}`}
                  />
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Mobile CV button */}
          
            href="/Agbo_Franklin_Emeka_CV.pdf"
            download
            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-full transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>

          {/* Social hint */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-600 mt-4">
            frankjoe4u@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}
