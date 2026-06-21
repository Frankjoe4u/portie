"use client";

import { useEffect, useRef, useState } from "react";

type Skill = {
  name: string;
  level: number;
  icon: string;
};

type SkillCategory = {
  category: string;
  subtitle: string;
  color: string;
  accent: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    subtitle: "What the user sees",
    color: "#facc15",
    accent: "rgba(250,204,21,0.08)",
    skills: [
      { name: "Next.js", level: 90, icon: "▲" },
      { name: "React", level: 88, icon: "⚛" },
      { name: "TypeScript", level: 85, icon: "TS" },
      { name: "Tailwind CSS", level: 92, icon: "◈" },
    ],
  },
  {
    category: "Backend",
    subtitle: "What makes it work",
    color: "#a78bfa",
    accent: "rgba(167,139,250,0.08)",
    skills: [
      { name: "Node.js", level: 80, icon: "⬡" },
      { name: "Express", level: 78, icon: "Ex" },
      { name: "PostgreSQL", level: 72, icon: "⬢" },
      { name: "MongoDB", level: 75, icon: "◉" },
    ],
  },
  {
    category: "Tooling",
    subtitle: "How it gets shipped",
    color: "#34d399",
    accent: "rgba(52,211,153,0.08)",
    skills: [
      { name: "Capacitor", level: 70, icon: "📱" },
      { name: "Git & GitHub", level: 88, icon: "⑂" },
      { name: "Vercel", level: 85, icon: "▲" },
      { name: "VS Code", level: 95, icon: "⬜" },
    ],
  },
];

const techStack: {
  label: string;
  weight: "primary" | "secondary" | "tertiary";
}[] = [
  { label: "Next.js", weight: "primary" },
  { label: "React", weight: "primary" },
  { label: "TypeScript", weight: "primary" },
  { label: "Tailwind CSS", weight: "primary" },
  { label: "Node.js", weight: "primary" },
  { label: "PostgreSQL", weight: "secondary" },
  { label: "MongoDB", weight: "secondary" },
  { label: "Express", weight: "secondary" },
  { label: "REST API", weight: "secondary" },
  { label: "Capacitor", weight: "secondary" },
  { label: "JavaScript", weight: "tertiary" },
  { label: "Git", weight: "tertiary" },
  { label: "GitHub", weight: "tertiary" },
  { label: "Vercel", weight: "tertiary" },
  { label: "PWA", weight: "tertiary" },
  { label: "HTML", weight: "tertiary" },
  { label: "CSS", weight: "tertiary" },
];

function ProficiencyDots({ level, color }: { level: number; color: string }) {
  const total = 5;
  const filled = Math.round((level / 100) * total);
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            width: i < filled ? 8 : 6,
            height: i < filled ? 8 : 6,
            borderRadius: "50%",
            background: i < filled ? color : "rgba(255,255,255,0.08)",
            boxShadow: i < filled ? `0 0 6px ${color}88` : "none",
            display: "inline-block",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function SkillRow({
  skill,
  color,
  visible,
  index,
}: {
  skill: Skill;
  color: string;
  visible: boolean;
  index: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-12px)",
        transition: `opacity 0.5s ease ${index * 80 + 200}ms, transform 0.5s ease ${index * 80 + 200}ms`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: `${color}15`,
            border: `1px solid ${color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            color,
            fontWeight: 700,
            flexShrink: 0,
            fontFamily: "'Fira Code', monospace",
          }}
        >
          {skill.icon}
        </span>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: 13.5,
            color: "#d1d5db",
            letterSpacing: "0.01em",
          }}
        >
          {skill.name}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.05em",
          }}
        >
          {skill.level}%
        </span>
        <ProficiencyDots level={skill.level} color={color} />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "96px 24px",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #0d0020 0%, #1a003e 50%, #0d0020 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Syne:wght@600;700;800&display=swap');

        @keyframes floatGlow {
          0%,100% { opacity: 0.06; transform: scale(1); }
          50%      { opacity: 0.1;  transform: scale(1.05); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .skill-card {
          background: rgba(255,255,255,0.018);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 28px;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
          position: relative;
          overflow: hidden;
        }
        .skill-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .skill-card:hover {
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.028);
          transform: translateY(-3px);
        }

        .tag-primary {
          font-family: 'Fira Code', monospace;
          font-size: 12px; font-weight: 500;
          padding: 7px 16px; border-radius: 6px;
          color: #fde68a;
          background: rgba(250,204,21,0.08);
          border: 1px solid rgba(250,204,21,0.25);
          cursor: default;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .tag-primary:hover {
          background: rgba(250,204,21,0.15);
          border-color: rgba(250,204,21,0.5);
        }
        .tag-secondary {
          font-family: 'Fira Code', monospace;
          font-size: 11.5px; font-weight: 400;
          padding: 6px 14px; border-radius: 6px;
          color: #a78bfa;
          background: rgba(167,139,250,0.06);
          border: 1px solid rgba(167,139,250,0.18);
          cursor: default;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .tag-secondary:hover {
          background: rgba(167,139,250,0.12);
          border-color: rgba(167,139,250,0.4);
        }
        .tag-tertiary {
          font-family: 'Fira Code', monospace;
          font-size: 11px; font-weight: 400;
          padding: 5px 12px; border-radius: 6px;
          color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          cursor: default;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .tag-tertiary:hover {
          color: rgba(255,255,255,0.55);
          border-color: rgba(255,255,255,0.15);
        }

        .divider-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent);
        }
      `}</style>

      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, #7c3aed, transparent)",
          animation: "floatGlow 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 80,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, #facc15, transparent)",
          opacity: 0.07,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, #a78bfa, transparent)",
          opacity: 0.06,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Section header ── */}
        <div
          style={{
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                height: 1,
                width: 32,
                background: "rgba(250,204,21,0.4)",
              }}
            />
            <span
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 11,
                color: "#facc15",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              capabilities
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4vw, 52px)",
                lineHeight: 1.1,
                color: "#fff",
                margin: 0,
              }}
            >
              Built to ship.{" "}
              <span style={{ color: "#facc15" }}>End to end.</span>
            </h2>
            <p
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                maxWidth: 320,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              From database schema to polished UI — the full picture, no
              handoffs needed.
            </p>
          </div>

          {/* Rule */}
          <div
            style={{
              marginTop: 28,
              height: 1,
              background:
                "linear-gradient(90deg, rgba(250,204,21,0.3), rgba(167,139,250,0.15), transparent)",
            }}
          />
        </div>

        {/* ── Skill cards grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
            marginBottom: 64,
          }}
        >
          {skillCategories.map((cat, ci) => (
            <div
              key={ci}
              className="skill-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${ci * 120}ms, transform 0.6s ease ${ci * 120}ms`,
              }}
            >
              {/* Card top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 28,
                  right: 28,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${cat.color}60, transparent)`,
                  borderRadius: "0 0 4px 4px",
                }}
              />

              {/* Category header */}
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: 3,
                      height: 18,
                      borderRadius: 2,
                      background: cat.color,
                      boxShadow: `0 0 10px ${cat.color}`,
                      flexShrink: 0,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 16,
                      color: "#fff",
                      margin: 0,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {cat.category}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 11,
                    color: cat.color,
                    opacity: 0.6,
                    margin: 0,
                    paddingLeft: 13,
                    letterSpacing: "0.05em",
                  }}
                >
                  {cat.subtitle}
                </p>
              </div>

              {/* Skill rows */}
              <div>
                {cat.skills.map((skill, si) => (
                  <SkillRow
                    key={si}
                    skill={skill}
                    color={cat.color}
                    visible={visible}
                    index={ci * 4 + si}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Divider with label ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 36,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 500ms",
          }}
        >
          <div
            style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }}
          />
          <span
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            full tech stack
          </span>
          <div
            style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }}
          />
        </div>

        {/* ── Tech stack tags ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease 600ms, transform 0.6s ease 600ms",
          }}
        >
          {techStack.map((t, i) => (
            <span key={i} className={`tag-${t.weight}`}>
              {t.label}
            </span>
          ))}
        </div>

        {/* ── Bottom note ── */}
        <div
          style={{
            marginTop: 48,
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 700ms",
          }}
        >
          <p
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.18)",
              letterSpacing: "0.08em",
            }}
          >
            // always learning · currently exploring AI integrations & edge
            computing
          </p>
        </div>
      </div>
    </section>
  );
}
