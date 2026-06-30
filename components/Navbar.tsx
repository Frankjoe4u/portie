"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Detect scroll for navbar background blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active nav link based on scroll position
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-[#0d0020]/90 backdrop-blur-md border-b border-purple-900/40 shadow-lg shadow-black/30"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
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
            <span className="text-white font-extrabold text-lg tracking-tight group-hover:text-yellow-400 transition-colors duration-200">
              Frank
              <span className="text-yellow-400 group-hover:text-white transition-colors duration-200">
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
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${isActive
                      ? "text-black bg-yellow-400"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="/cv.pdf"
            download
            className="hidden md:flex items-center gap-2 px-5 py-2 text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-full transition-all duration-200 shadow-md shadow-yellow-400/20 hover:shadow-yellow-400/40"
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.25 rounded-lg border border-purple-800/50 hover:border-yellow-400/50 transition-colors duration-200"
          >
            <span
              className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.75" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.75" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isOpen
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
          className={`absolute top-0 right-0 h-full w-72 bg-[#0d0020] border-l border-purple-900/50 flex flex-col pt-24 pb-10 px-6 transition-transform duration-300 shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Mobile links */}
          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map(({ label, href }, idx) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  style={{ transitionDelay: isOpen ? `${idx * 40}ms` : "0ms" }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${isActive
                      ? "text-black bg-yellow-400"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
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
          <a
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
          <p className="text-center text-xs text-gray-600 mt-4">
            frankjoe4u@gmail.com
          </p>
        </div>
      </div>
    </>
  )
}