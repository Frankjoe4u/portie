"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export type ProjectDisplay = {
  title: string;
  tech: string[];
  live: string;
  github: string;
  color: string;
  image: string;
};

export default function ProjectsClient({
  projects,
}: {
  projects: ProjectDisplay[];
}) {
  const [active, setActive] = useState<number>(Math.min(3, projects.length - 1));
  const total = projects.length;
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted ? theme === "dark" : true;

  // ── Theme tokens ──
  const sectionBg = isDark
    ? "linear-gradient(180deg, #0d0020 0%, #1a003e 100%)"
    : "linear-gradient(180deg, #f5f3ff 0%, #ffffff 100%)";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const subCopyColor = isDark ? "text-gray-400" : "text-gray-600";
  const cardBg = isDark ? "rgba(13, 0, 32, 0.95)" : "rgba(255, 255, 255, 0.97)";
  const cardBorderIdle = isDark ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.2)";
  const cardTitleColor = isDark ? "#fff" : "#1e1b3a";
  const idNumberColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(30,27,58,0.06)";
  const navBtnBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(124,58,237,0.08)";
  const navBtnBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(124,58,237,0.2)";
  const navBtnColor = isDark ? "#fff" : "#4c1d95";
  const dotInactive = isDark ? "rgba(255,255,255,0.2)" : "rgba(124,58,237,0.2)";
  const gradientOverlay = isDark
    ? "linear-gradient(to bottom, transparent 60%, rgba(13,0,32,0.9) 100%)"
    : "linear-gradient(to bottom, transparent 60%, rgba(255,255,255,0.92) 100%)";

  const getStyle = (i: number): React.CSSProperties => {
    const offset = i - active;
    const abs = Math.abs(offset);
    if (abs > 2) {
      return {
        opacity: 0,
        pointerEvents: "none" as const,
        transform: "translateX(0) scale(0.5)",
        zIndex: 0,
      };
    }
    const tx = offset * 200;
    const tz = -abs * 120;
    const ry = offset * -35;
    const scale = 1 - abs * 0.15;
    const opacity = 1 - abs * 0.3;
    return {
      transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity,
      zIndex: 10 - abs,
      filter: abs > 0 ? "brightness(0.5)" : "brightness(1)",
    };
  };

  if (total === 0) {
    return (
      <section
        id="projects"
        style={{ background: sectionBg }}
        className="py-20"
      >
        <div className="text-center px-6">
          <h2 className={`text-4xl md:text-5xl font-extrabold ${headingColor} mb-4`}>
            My <span className="text-yellow-500 dark:text-yellow-400">Projects</span>
          </h2>
          <p className={`${subCopyColor} text-base`}>
            No projects added yet. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      style={{ background: sectionBg }}
      className="py-20 overflow-hidden"
    >
      <div className="text-center mb-16 px-6">
        <h2 className={`text-4xl md:text-5xl font-extrabold ${headingColor} mb-4`}>
          My <span className="text-yellow-500 dark:text-yellow-400">Projects</span>
        </h2>
        <p className={`${subCopyColor} text-base max-w-xl mx-auto`}>
          A collection of things I have built from web apps to mobile
          experiences.
        </p>
        <div className="w-16 h-1 bg-yellow-400 mx-auto mt-6 rounded-full" />
      </div>

      <div
        style={{ perspective: "1000px" }}
        className="w-full flex justify-center"
      >
        <div
          style={{
            position: "relative",
            width: 260,
            height: 380,
            transformStyle: "preserve-3d",
          }}
        >
          {projects.map((p, i: number) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                marginLeft: -130,
                width: 260,
                height: 370,
                borderRadius: 20,
                cursor: "pointer",
                border:
                  i === active
                    ? `2px solid ${p.color}`
                    : `2px solid ${cardBorderIdle}`,
                background: cardBg,
                backdropFilter: "blur(12px)",
                transition: "all 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
                ...getStyle(i),
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow:
                  i === active
                    ? `0 0 40px ${p.color}44, 0 20px 60px rgba(0,0,0,${isDark ? 0.6 : 0.15})`
                    : `0 10px 40px rgba(0,0,0,${isDark ? 0.4 : 0.08})`,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 140,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://placehold.co/260x140/1a003e/${p.color.replace("#", "")}?text=${p.title.substring(0, 15)}`;
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: gradientOverlay,
                  }}
                />
              </div>

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "16px 20px 20px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -60,
                    right: 16,
                    fontSize: 80,
                    fontWeight: 900,
                    color: idNumberColor,
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: p.color,
                    marginBottom: 12,
                    boxShadow: `0 0 16px ${p.color}`,
                  }}
                />

                <h3
                  style={{
                    color: cardTitleColor,
                    fontSize: 18,
                    fontWeight: 800,
                    margin: "0 0 10px",
                  }}
                >
                  {p.title}
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 16,
                  }}
                >
                  {p.tech.map((t: string) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 10,
                        color: p.color,
                        border: `1px solid ${p.color}`,
                        borderRadius: 20,
                        padding: "2px 8px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {i === active && (
                  <div style={{ display: "flex", gap: 8 }}>
                      
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        background: p.color,
                        color: "#000",
                        padding: "5px 14px",
                        borderRadius: 20,
                        textDecoration: "none",
                      }}
                    >
                      Live
                    </a>
                      
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        border: `1px solid ${p.color}`,
                        color: p.color,
                        padding: "5px 14px",
                        borderRadius: 20,
                        textDecoration: "none",
                      }}
                    >
                      GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-16">
        {projects.map((p, i: number) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 28 : 8,
              height: 8,
              borderRadius: 20,
              background: i === active ? p.color : dotInactive,
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-5">
        <button
          onClick={() => setActive(Math.max(0, active - 1))}
          style={{
            background: navBtnBg,
            border: `1px solid ${navBtnBorder}`,
            color: navBtnColor,
            borderRadius: 12,
            padding: "8px 18px",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          Prev
        </button>
        <button
          onClick={() => setActive(Math.min(total - 1, active + 1))}
          style={{
            background: navBtnBg,
            border: `1px solid ${navBtnBorder}`,
            color: navBtnColor,
            borderRadius: 12,
            padding: "8px 18px",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          Next
        </button>
      </div>
    </section>
  );
}
