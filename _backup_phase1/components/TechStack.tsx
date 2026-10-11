"use client";

import { useState } from "react";
import { techIcons, type TechIconKey } from "@/data/techIcons";

type Tech = { name: string; icon: TechIconKey | "aws" };

const core: Tech[] = [
  { name: "Next.js", icon: "nextjs" },
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Express", icon: "express" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "AWS", icon: "aws" },
  { name: "Git & GitHub", icon: "github" },
  { name: "Docker", icon: "docker" },
];

const more: Tech[] = [
  { name: "Git", icon: "git" },
  { name: "Capacitor", icon: "capacitor" },
  { name: "Vercel", icon: "vercel" },
  { name: "PWA", icon: "pwa" },
  { name: "HTML", icon: "html" },
  { name: "CSS", icon: "css" },
];

function TechLogo({ icon }: { icon: Tech["icon"] }) {
  if (icon === "aws") {
    return (
      <svg viewBox="0 0 48 30" className="h-7 w-9 text-ink" aria-hidden="true">
        <text
          x="24"
          y="15"
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          fill="currentColor"
        >
          aws
        </text>
        <path
          d="M9 21c9 6 21 6 30 0"
          fill="none"
          stroke="#FF9900"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M35 17.5 39.5 21 34 23"
          fill="none"
          stroke="#FF9900"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  const item = techIcons[icon];
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill={item.color ?? "currentColor"}
      style={item.color ? undefined : { color: "var(--ink)" }}
      aria-hidden="true"
    >
      <path d={item.path} />
    </svg>
  );
}

export default function TechStack() {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? [...core, ...more] : core;

  return (
    <div id="skills" className="scroll-mt-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Core Skills</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Tech Stack
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="pb-1 text-sm font-medium text-brand transition-opacity duration-200 hover:opacity-80"
        >
          {expanded ? "Show Less" : "View All Skills"}{" "}
          <span aria-hidden="true">{expanded ? "\u2191" : "\u2192"}</span>
        </button>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3">
        {items.map((t) => (
          <div
            key={t.name}
            className="card flex flex-col items-center justify-center gap-2 px-1 py-3.5 text-center"
          >
            <TechLogo icon={t.icon} />
            <span className="text-[11px] font-medium leading-tight text-muted">
              {t.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
