"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type Service = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  color: string;
  icon: string;
};

const services: Service[] = [
  {
    id: "01",
    title: "Web Application Development",
    subtitle: "Full-cycle product engineering",
    description:
      "End-to-end development of fast, scalable web applications — from architecture to deployment. Built with modern frameworks and production-grade standards.",
    deliverables: [
      "Next.js / React SPA & SSR apps",
      "REST & GraphQL API integration",
      "Authentication & role-based access",
      "Performance optimization & Core Web Vitals",
    ],
    color: "#facc15",
    icon: "⬡",
  },
  {
    id: "02",
    title: "Backend & API Engineering",
    subtitle: "Reliable server-side systems",
    description:
      "Robust server infrastructure and API design that powers your product reliably at any scale — clean, documented, and maintainable.",
    deliverables: [
      "RESTful & GraphQL API design",
      "Node.js / Express backends",
      "Database design (SQL & NoSQL)",
      "Third-party API integrations",
    ],
    color: "#a78bfa",
    icon: "◈",
  },
  {
    id: "03",
    title: "Progressive Web Apps",
    subtitle: "Native feel, web reach",
    description:
      "Web applications that install like native apps — offline-capable, fast on any device, and deployable without an app store.",
    deliverables: [
      "Offline-first architecture",
      "Push notifications",
      "App-like UX & transitions",
      "Cross-platform (iOS, Android, Desktop)",
    ],
    color: "#34d399",
    icon: "▣",
  },
  {
    id: "04",
    title: "Database Architecture",
    subtitle: "Data that scales with you",
    description:
      "Thoughtful data modeling and database setup — whether relational or document-based — designed for speed, integrity, and future growth.",
    deliverables: [
      "Schema design & normalization",
      "PostgreSQL & MongoDB setup",
      "Query optimization & indexing",
      "Migrations & seeding strategies",
    ],
    color: "#f472b6",
    icon: "⬢",
  },
  {
    id: "05",
    title: "Deployment & DevOps",
    subtitle: "Ship fast, stay stable",
    description:
      "CI/CD pipelines, cloud deployment, and infrastructure setup so your app goes live reliably and updates without downtime.",
    deliverables: [
      "Vercel / Railway / VPS deployment",
      "CI/CD pipeline setup",
      "Environment & secrets management",
      "Domain, SSL & monitoring config",
    ],
    color: "#38bdf8",
    icon: "▲",
  },
  {
    id: "06",
    title: "Web Performance & SEO",
    subtitle: "Seen, fast, and findable",
    description:
      "Technical performance audits and SEO implementation that make your site rank higher and load faster — measurably.",
    deliverables: [
      "Core Web Vitals optimization",
      "Server-side rendering for SEO",
      "Meta, OG & structured data",
      "Lighthouse audit & remediation",
    ],
    color: "#fb923c",
    icon: "◎",
  },
  {
    id: "07",
    title: "API Integration & Automation",
    subtitle: "Connect your tools",
    description:
      "Seamlessly integrate third-party services — payments, communication, analytics, AI — into your existing product.",
    deliverables: [
      "Stripe / Paystack payments",
      "Email & SMS (Resend, Twilio)",
      "AI APIs (OpenAI, Claude)",
      "Webhooks & event-driven flows",
    ],
    color: "#c084fc",
    icon: "⟳",
  },
  {
    id: "08",
    title: "Code Review & Consulting",
    subtitle: "A second expert opinion",
    description:
      "Technical consulting for teams who need an experienced eye on architecture decisions, code quality, or a roadmap for a new product.",
    deliverables: [
      "Codebase audit & refactoring plan",
      "Architecture recommendations",
      "Tech stack selection advice",
      "MVP scoping & feature planning",
    ],
    color: "#6ee7b7",
    icon: "✦",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted ? theme === "dark" : true;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Theme tokens ──
  const sectionBg = isDark
    ? "linear-gradient(180deg, #1a003e 0%, #0d0020 50%, #160040 100%)"
    : "linear-gradient(180deg, #eaf6fd 0%, #ffffff 50%, #eaf6fd 100%)";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(14,159,214,0.18)";
  const cardBg = isDark ? "rgba(255,255,255,0.018)" : "rgba(14,159,214,0.03)";
  const cardBgHover = isDark ? "rgba(255,255,255,0.03)" : "rgba(14,159,214,0.06)";
  const headingColor = isDark ? "#fff" : "#0c3a5c";
  const subCopyColor = isDark ? "rgba(255,255,255,0.32)" : "rgba(12,58,92,0.55)";
  const cardTitleColor = isDark ? "#fff" : "#0c3a5c";
  const cardDescColor = isDark ? "rgba(255,255,255,0.38)" : "rgba(12,58,92,0.6)";
  const deliverableColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(12,58,92,0.55)";
  const deliverableHoverColor = isDark ? "rgba(255,255,255,0.58)" : "rgba(12,58,92,0.8)";
  const idNumberColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(12,58,92,0.15)";
  const dividerBase = isDark ? "rgba(255,255,255,0.05)" : "rgba(14,159,214,0.2)";
  const bottomNoteColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(12,58,92,0.3)";

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "100px 24px",
        overflow: "hidden",
        background: sectionBg,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Syne:wght@600;700;800&display=swap');

        @keyframes floatGlow {
          0%,100% { opacity:0.05; transform:scale(1) translate(-50%,-50%); }
          50%      { opacity:0.09; transform:scale(1.06) translate(-50%,-50%); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmerGold {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .service-card {
          position: relative;
          border-radius: 14px;
          border: 1px solid ${cardBorder};
          background: ${cardBg};
          padding: 28px 28px 24px;
          cursor: default;
          transition: border-color 0.3s, background 0.3s, transform 0.35s;
          overflow: hidden;
        }
        .service-card:hover {
          background: ${cardBgHover};
          transform: translateY(-4px);
        }

        .deliverable-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-family: 'Fira Code', monospace;
          font-size: 11.5px;
          color: ${deliverableColor};
          line-height: 1.55;
          transition: color 0.2s;
        }
        .service-card:hover .deliverable-item {
          color: ${deliverableHoverColor};
        }

        .cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 72px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 800ms, transform 0.6s ease 800ms;
        }
        .cta-row.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          border-radius: 50px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          border: none;
          background: linear-gradient(90deg, #fde68a, #f59e0b);
          color: #0a001f;
          box-shadow: 0 0 28px rgba(250,204,21,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 50px rgba(250,204,21,0.55);
        }
        .cta-btn.light {
          background: linear-gradient(90deg, #38bdf8, #0e9fd6);
          color: #ffffff;
          box-shadow: 0 0 28px rgba(14,159,214,0.35);
        }
        .cta-btn.light:hover {
          box-shadow: 0 0 50px rgba(14,159,214,0.55);
        }
      `}</style>

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, #7c3aed, transparent)"
            : "radial-gradient(circle, #0ea5e9, transparent)",
          animation: "floatGlow 9s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, #facc15, transparent)"
            : "radial-gradient(circle, #38bdf8, transparent)",
          opacity: 0.06,
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, #a78bfa, transparent)"
            : "radial-gradient(circle, #7dd3fc, transparent)",
          opacity: 0.06,
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
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
            textAlign: "center",
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                height: 1,
                width: 32,
                background: isDark ? "rgba(250,204,21,0.4)" : "rgba(14,159,214,0.4)",
              }}
            />
            <span
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 11,
                color: isDark ? "#facc15" : "#0e9fd6",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              what i offer
            </span>
            <div
              style={{
                height: 1,
                width: 32,
                background: isDark ? "rgba(250,204,21,0.4)" : "rgba(14,159,214,0.4)",
              }}
            />
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1.08,
              color: headingColor,
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
            }}
          >
            Services
          </h2>

          <p
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: 13,
              color: subCopyColor,
              maxWidth: 440,
              lineHeight: 1.8,
              margin: "0 auto",
            }}
          >
            Every engagement is hands-on, direct, and built to last — no bloated
            agencies, no handoffs.
          </p>

          {/* Rule */}
          <div
            style={{
              marginTop: 36,
              height: 1,
              background: isDark
                ? "linear-gradient(90deg, transparent, rgba(250,204,21,0.3), rgba(167,139,250,0.2), transparent)"
                : "linear-gradient(90deg, transparent, rgba(14,159,214,0.35), rgba(56,189,248,0.25), transparent)",
            }}
          />
        </div>

        {/* ── Services grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {services.map((svc, i) => {
            const isHovered = hoveredId === svc.id;
            return (
              <div
                key={svc.id}
                className="service-card"
                onMouseEnter={() => setHoveredId(svc.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  borderColor: isHovered ? `${svc.color}40` : cardBorder,
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? isHovered
                      ? "translateY(-4px)"
                      : "translateY(0)"
                    : "translateY(28px)",
                  transition: `opacity 0.55s ease ${i * 70}ms, transform 0.35s ease, border-color 0.3s, background 0.3s`,
                }}
              >
                {/* Top accent line on hover */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 24,
                    right: 24,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${svc.color}${isHovered ? "80" : "00"}, transparent)`,
                    borderRadius: "0 0 4px 4px",
                    transition: "background 0.4s",
                  }}
                />

                {/* Card top row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  {/* Icon box */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${svc.color}12`,
                      border: `1px solid ${svc.color}28`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      color: svc.color,
                      transition: "background 0.3s, box-shadow 0.3s",
                      boxShadow: isHovered ? `0 0 16px ${svc.color}33` : "none",
                      flexShrink: 0,
                    }}
                  >
                    {svc.icon}
                  </div>

                  {/* ID number */}
                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: 11,
                      color: idNumberColor,
                      letterSpacing: "0.08em",
                      fontWeight: 500,
                    }}
                  >
                    {svc.id}
                  </span>
                </div>

                {/* Title + subtitle */}
                <div style={{ marginBottom: 10 }}>
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 15.5,
                      color: cardTitleColor,
                      margin: "0 0 4px",
                      lineHeight: 1.3,
                      letterSpacing: "0.01em",
                      transition: "color 0.2s",
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: 10.5,
                      color: svc.color,
                      opacity: isHovered ? 0.85 : 0.55,
                      margin: 0,
                      letterSpacing: "0.05em",
                      transition: "opacity 0.3s",
                    }}
                  >
                    {svc.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 12,
                    color: cardDescColor,
                    lineHeight: 1.75,
                    margin: "0 0 18px",
                  }}
                >
                  {svc.description}
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background: `linear-gradient(90deg, ${svc.color}20, transparent)`,
                    marginBottom: 14,
                  }}
                />

                {/* Deliverables */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 7 }}
                >
                  {svc.deliverables.map((d, di) => (
                    <div key={di} className="deliverable-item">
                      <span
                        style={{
                          color: svc.color,
                          flexShrink: 0,
                          marginTop: 1,
                          fontSize: 9,
                        }}
                      >
                        ▸
                      </span>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className={`cta-row ${visible ? "visible" : ""}`}>
          <div style={{ height: 1, flex: 1, background: dividerBase }} />
          <a
            href="https://wa.me/2347066823448"
            target="_blank"
            rel="noopener noreferrer"
            className={`cta-btn ${isDark ? "" : "light"}`}
          >
            Let's discuss your project ↗
          </a>
          <div style={{ height: 1, flex: 1, background: dividerBase }} />
        </div>

        {/* Bottom note */}
        <p
          style={{
            textAlign: "center",
            marginTop: 28,
            fontFamily: "'Fira Code', monospace",
            fontSize: 11,
            color: bottomNoteColor,
            letterSpacing: "0.06em",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 900ms",
          }}
        >
          // custom scope? every project is different — let's talk
        </p>
      </div>
    </section>
  );
}