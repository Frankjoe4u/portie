"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Projects Built" },
  { value: "5+", label: "Happy Clients" },
  { value: "3", label: "Mobile Apps" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden bg-[linear-gradient(180deg,#eaf6fd_0%,#ffffff_100%)] dark:bg-[linear-gradient(180deg,#1a003e_0%,#0d0020_100%)]"
    >
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none bg-[radial-gradient(circle,#38bdf8,transparent)] dark:bg-[radial-gradient(circle,#facc15,transparent)]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none bg-[radial-gradient(circle,#0ea5e9,transparent)] dark:bg-[radial-gradient(circle,#7c3aed,transparent)]" />

      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-sky-600 dark:text-yellow-400 text-5xl font-semibold tracking-wider mb-2">
            ABOUT ME
          </h2>
          <div className="w-20 h-0.5 bg-sky-400/50 dark:bg-yellow-400/50 mx-auto"></div>
        </div>

        {/* ── DESKTOP: Image LEFT + Content RIGHT ── */}
        {/* ── MOBILE: Bio → Image → Buttons (stacked) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-9 items-center">
          {/* LEFT: Image — hidden on mobile, shown on desktop */}
          <div
            className={`hidden lg:flex relative justify-start transition-all duration-700 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Dot grid decoration */}
            <div className="absolute -top-4 -left-4 grid grid-cols-5 gap-2 opacity-30 pointer-events-none z-10">
              {Array.from({ length: 25 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-sky-400 dark:bg-yellow-400 block"
                />
              ))}
            </div>

            {/* Purple brush blob behind image */}
            <div className="absolute bottom-0 left-0 w-full h-full rounded-tl-3xl rounded-br-3xl bg-purple-300/30 dark:bg-purple-700/30 blur-sm skew-y-2" />

            {/* Photo — wider on desktop */}
            <div className="relative z-10 w-full max-w-none rounded-2xl overflow-hidden border-2 border-yellow-400/20 shadow-2xl shadow-purple-900/10 dark:shadow-purple-900/60">
              <img
                src="/pix1.jpg"
                alt="Frank Joe"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.onerror = null;
                  t.src = "https://placehold.co/400x500/1a003e/facc15?text=FJ";
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-sky-900/30 dark:from-purple-950/50 to-transparent" />
            </div>
          </div>

          {/* RIGHT (desktop) / Full column (mobile): Bio + [mobile image] + Buttons */}
          <div
            className={`flex flex-col gap-5 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Bio text */}
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              <span className="text-gray-900 dark:text-white font-extrabold text-2xl md:text-3xl block mb-3">
                I am Agbo Franklin Emeka
              </span>
              a passionate software developer who loves turning ideas into
              real, working products. From clean pixel-perfect frontends to
              powerful backend APIs, I build things that are fast, scalable and
              beautiful.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              I work primarily with{" "}
              <span className="text-sky-600 dark:text-yellow-400 font-semibold">
                Next.js, TypeScript and Tailwind CSS
              </span>{" "}
              on the frontend, and{" "}
              <span className="text-sky-600 dark:text-yellow-400 font-semibold">
                Node.js, Express and PostgreSQL
              </span>{" "}
              on the backend. When I am not coding, I am exploring Igbo culture
              or writing about what I am learning.
            </p>

            {/* Mobile-only image — between bio and buttons */}
            <div
              className={`relative flex justify-center lg:hidden transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {/* Dot grid decoration */}
              <div className="absolute -top-4 -left-4 grid grid-cols-5 gap-2 opacity-30 pointer-events-none z-10">
                {Array.from({ length: 25 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-sky-400 dark:bg-yellow-400 block"
                  />
                ))}
              </div>

              {/* Purple brush blob */}
              <div className="absolute bottom-0 left-0 w-full h-full rounded-tl-3xl rounded-br-3xl bg-purple-300/30 dark:bg-purple-700/30 blur-sm skew-y-2" />

              <div className="relative z-10 w-full max-w-xs rounded-2xl overflow-hidden border-2 border-yellow-400/20 shadow-2xl shadow-purple-900/10 dark:shadow-purple-900/60">
                <img
                  src="/pix1.jpg"
                  alt="Frank Joe"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.onerror = null;
                    t.src =
                      "https://placehold.co/400x500/1a003e/facc15?text=FJ";
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-sky-900/30 dark:from-purple-950/50 to-transparent" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:text-black text-sm font-bold transition-all duration-200 shadow-md shadow-sky-500/20 hover:shadow-sky-500/40 dark:shadow-yellow-400/20 dark:hover:shadow-yellow-400/40 flex items-center gap-2"
              >
                Start Your Project <span>→</span>
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full border border-sky-500/50 dark:border-yellow-400/50 hover:border-sky-500 dark:hover:border-yellow-400 text-sky-600 dark:text-yellow-400 hover:bg-sky-400/10 dark:hover:bg-yellow-400/10 text-sm font-bold transition-all duration-200 tracking-widest"
              >
                LEARN MORE
              </a>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Stats full-width below ── */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative text-center p-5 rounded-2xl border border-sky-200 dark:border-purple-800/30 hover:border-sky-400 dark:hover:border-yellow-400/40 transition-all duration-300 group overflow-hidden bg-sky-50 dark:bg-[rgba(124,58,237,0.05)]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent)] dark:bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.06),transparent)]" />
              <p className="text-3xl md:text-4xl font-black text-sky-600 dark:text-yellow-400 mb-1">
                {s.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}