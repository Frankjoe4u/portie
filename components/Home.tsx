
"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FILE_TABS = ["role.ts", "stack.json", "contact.ts"];

const CODE_BLOCKS: Record<
  string,
  {
    lines: {
      text: string;
      indent: number;
      kind:
        | "keyword"
        | "string"
        | "comment"
        | "type"
        | "value"
        | "plain"
        | "fn";
    }[];
  }
> = {
  "role.ts": {
    lines: [
      {
        text: "// ✦ Available for new opportunities",
        indent: 0,
        kind: "comment",
      },
      { text: "", indent: 0, kind: "plain" },
      { text: "interface Developer {", indent: 0, kind: "plain" },
      { text: "name:", indent: 1, kind: "keyword" },
      { text: "  'Frank Joe';", indent: 1, kind: "string" },
      { text: "role:", indent: 1, kind: "keyword" },
      { text: "  'Full Stack Engineer';", indent: 1, kind: "string" },
      { text: "focus:", indent: 1, kind: "keyword" },
      { text: "  'Performance' | 'UX' | 'Scale';", indent: 1, kind: "type" },
      { text: "available:", indent: 1, kind: "keyword" },
      { text: "  true;", indent: 1, kind: "value" },
      { text: "}", indent: 0, kind: "plain" },
      { text: "", indent: 0, kind: "plain" },
      { text: "export const build = (", indent: 0, kind: "fn" },
      { text: "  idea: string", indent: 1, kind: "plain" },
      { text: "): Promise<Product> => {", indent: 0, kind: "fn" },
      { text: "  return ship(idea); ✓", indent: 1, kind: "value" },
      { text: "}", indent: 0, kind: "plain" },
    ],
  },
  "stack.json": {
    lines: [
      { text: "{", indent: 0, kind: "plain" },
      { text: '"frontend":', indent: 1, kind: "keyword" },
      {
        text: '  ["React", "Next.js", "TypeScript"],',
        indent: 1,
        kind: "string",
      },
      { text: '"backend":', indent: 1, kind: "keyword" },
      { text: '  ["Node.js", "Express", "REST"],', indent: 1, kind: "string" },
      { text: '"database":', indent: 1, kind: "keyword" },
      { text: '  ["MongoDB", "PostgreSQL"],', indent: 1, kind: "string" },
      { text: '"styling":', indent: 1, kind: "keyword" },
      {
        text: '  ["TailwindCSS", "Framer Motion"],',
        indent: 1,
        kind: "string",
      },
      { text: '"tools":', indent: 1, kind: "keyword" },
      { text: '  ["Git", "Docker", "Vercel"]', indent: 1, kind: "string" },
      { text: "}", indent: 0, kind: "plain" },
    ],
  },
  "contact.ts": {
    lines: [
      { text: "// Let's build something great", indent: 0, kind: "comment" },
      { text: "", indent: 0, kind: "plain" },
      { text: "export const contact = {", indent: 0, kind: "fn" },
      { text: "email:", indent: 1, kind: "keyword" },
      { text: '  "frankjoe4u@gmail.com",', indent: 1, kind: "string" },
      { text: "github:", indent: 1, kind: "keyword" },
      { text: '  "github.com/frankjoe4u",', indent: 1, kind: "string" },
      { text: "linkedin:", indent: 1, kind: "keyword" },
      { text: '  "linkedin.com/in/frankjoe4u",', indent: 1, kind: "string" },
      { text: "whatsapp:", indent: 1, kind: "keyword" },
      { text: '  "+234 706 682 3448",', indent: 1, kind: "value" },
      { text: "status:", indent: 1, kind: "keyword" },
      { text: '  "Open to work ✦"', indent: 1, kind: "value" },
      { text: "}", indent: 0, kind: "plain" },
    ],
  },
};

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "TailwindCSS",
  "Docker",
  "PostgreSQL",
];

const kindColor: Record<string, string> = {
  keyword: "#79c0ff",
  string: "#a5d6a7",
  comment: "#6e7681",
  type: "#d2a8ff",
  value: "#ffa657",
  fn: "#fde68a",
  plain: "#e2e8f0",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
  const [time, setTime] = useState("");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted ? theme === "dark" : true;

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setVisibleLines(0);
    setTypedChars(0);
    setCurrentLineIdx(0);
  }, [activeTab]);

  useEffect(() => {
    const lines = CODE_BLOCKS[FILE_TABS[activeTab]].lines;
    if (currentLineIdx >= lines.length) return;
    const line = lines[currentLineIdx];
    const full = "  ".repeat(line.indent) + line.text;
    if (typedChars < full.length) {
      const t = setTimeout(
        () => setTypedChars((c) => c + 1),
        line.kind === "comment" ? 22 : 18,
      );
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(
        () => {
          setVisibleLines((v) => v + 1);
          setCurrentLineIdx((i) => i + 1);
          setTypedChars(0);
        },
        full.length === 0 ? 60 : 80,
      );
      return () => clearTimeout(t);
    }
  }, [currentLineIdx, typedChars, activeTab]);

  // Star canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.2 + 0.04,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random(),
      tw: Math.random() * 0.018 + 0.004,
      twOff: Math.random() * Math.PI * 2,
    }));
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;
      for (const s of stars) {
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        if (s.x < -5) s.x = canvas.width + 5;
        if (s.x > canvas.width + 5) s.x = -5;
        if (s.y < -5) s.y = canvas.height + 5;
        if (s.y > canvas.height + 5) s.y = -5;
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * s.tw * 60 + s.twOff));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${tw * s.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const lines = CODE_BLOCKS[FILE_TABS[activeTab]].lines;

  const mainBg = isDark
    ? "linear-gradient(135deg,#0a001f 0%,#160040 50%,#0a0020 100%)"
    : "linear-gradient(135deg,#f5f3ff 0%,#ede9fe 50%,#f8fafc 100%)";
  const headlineColor = isDark ? "#e2e8f0" : "#1e1b3a";
  const bodyColor = isDark ? "#94a3b8" : "#4b5563";
  const microLabelColor = isDark ? "#c4b5fd" : "#7c3aed";
  const statLabelColor = isDark ? "#64748b" : "#6b7280";

  return (
    <main
      id="home"
      className="relative overflow-hidden flex flex-col items-center justify-start pt-20 pb-16"
      style={{ background: mainBg }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes scaleIn {
          from { opacity:0; transform:scale(0.95); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 30px rgba(124,58,237,0.35), inset 0 0 30px rgba(124,58,237,0.06); }
          50%      { box-shadow: 0 0 70px rgba(124,58,237,0.6), inset 0 0 60px rgba(124,58,237,0.12); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(500px); }
        }
        @keyframes borderGlow {
          0%,100% { border-color: rgba(124,58,237,0.4); }
          50%      { border-color: rgba(250,204,21,0.6); }
        }
        @keyframes shimmerGold {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes nameReveal {
          0%   { opacity:0; letter-spacing:0.4em; filter:blur(10px); }
          100% { opacity:1; letter-spacing:-0.02em; filter:blur(0); }
        }
        @keyframes floatSkill {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-4px); }
        }

        .scanline-fx { animation: scanline 3s linear infinite; }

        .tab-btn {
          cursor:pointer; border:none; outline:none; background:transparent;
          font-family:'Fira Code',monospace; font-size:12px;
          padding:8px 16px; border-right:1px solid rgba(124,58,237,0.2);
          color:#64748b; transition:all 0.18s; white-space:nowrap;
        }
        .tab-btn:hover { color:#e2e8f0; background:rgba(124,58,237,0.1); }
        .tab-btn.active {
          color:#fde68a; background:rgba(124,58,237,0.15);
          border-bottom:2px solid #fde68a; margin-bottom:-1px;
        }

        .skill-pill {
          display:inline-flex; align-items:center; gap:5px;
          padding:4px 11px; border-radius:20px;
          font-family:'Fira Code',monospace; font-size:11px;
          color:#c4b5fd; border:1px solid rgba(124,58,237,0.35);
          background:rgba(124,58,237,0.1); white-space:nowrap;
          backdrop-filter:blur(8px);
        }

        .stat-card {
          background:rgba(255,255,255,0.04); border:1px solid rgba(124,58,237,0.25);
          border-radius:10px; padding:14px 20px; min-width:80px;
          backdrop-filter:blur(10px); transition:all 0.2s;
        }
        .stat-card:hover {
          background:rgba(124,58,237,0.12); border-color:rgba(250,204,21,0.4);
          transform:translateY(-3px);
        }

        .cta-primary {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; border-radius:50px;
          font-family:'Syne',sans-serif; font-weight:700; font-size:13px;
          letter-spacing:0.08em; text-transform:uppercase;
          text-decoration:none; cursor:pointer; border:none;
          background:linear-gradient(90deg,#fde68a,#f59e0b); color:#0a001f;
          box-shadow:0 0 30px rgba(250,204,21,0.4); transition:all 0.2s;
        }
        .cta-primary:hover { transform:translateY(-2px) scale(1.03); box-shadow:0 0 50px rgba(250,204,21,0.6); }

        .cta-secondary {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; border-radius:50px;
          font-family:'Syne',sans-serif; font-weight:600; font-size:13px;
          letter-spacing:0.08em; text-transform:uppercase;
          text-decoration:none; cursor:pointer;
          color:#e2e8f0; border:1px solid rgba(124,58,237,0.4);
          background:rgba(124,58,237,0.08); backdrop-filter:blur(10px);
          transition:all 0.2s; animation:borderGlow 3s ease-in-out infinite;
        }
        .cta-secondary:hover { transform:translateY(-2px); background:rgba(124,58,237,0.2); }

        .line-num {
          color:#4a5568; font-size:12px; user-select:none;
          min-width:24px; text-align:right;
          padding-right:14px; border-right:1px solid rgba(124,58,237,0.15);
          margin-right:14px; flex-shrink:0;
        }
      `}</style>

      {/* Star canvas — fades out in light mode */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 transition-opacity duration-300"
        style={{ opacity: isDark ? 1 : 0 }}
      />

      {/* Nebula blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none z-1"
        style={{
          background:
            "radial-gradient(circle,rgba(124,58,237,0.22) 0%,transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none z-1"
        style={{
          background:
            "radial-gradient(circle,rgba(250,204,21,0.1) 0%,transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full pointer-events-none z-1"
        style={{
          background:
            "radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 65%)",
        }}
      />

      {/* Main layout */}
      <div className="w-full max-w-6xl mx-auto px-6 py-8 pt-24 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* ── LEFT ── */}
        <div
          className="flex-1 text-left"
          style={{
            animation: "fadeSlideUp 0.7s ease forwards",
            minWidth: 280,
            maxWidth: 460,
          }}
        >
          {/* Warm unique headline */}
          <p
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: 12,
              letterSpacing: "0.2em",
              color: microLabelColor,
              marginBottom: 20,
              opacity: 0.8,
              animation: "fadeSlideUp 0.6s ease 0.1s both",
            }}
          >
            ✦ &nbsp; crafted with intention
          </p>

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              lineHeight: 1.1,
              fontSize: "clamp(34px, 4.8vw, 60px)",
              marginBottom: 18,
              color: headlineColor,
              animation: "fadeSlideUp 0.7s ease 0.2s both",
            }}
          >
            Good ideas deserve{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg,#fde68a 0%,#f59e0b 40%,#fde68a 70%,#f59e0b 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmerGold 4s linear 1s infinite",
                display: "inline-block",
              }}
            >
              great software.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Fira Code', monospace",
              color: bodyColor,
              fontSize: 13.5,
              lineHeight: 1.9,
              animation: "fadeSlideUp 0.7s ease 0.35s both",
            }}
            className="mb-7 max-w-md"
          >
            Whether it's your first product or your tenth — I help bring it to
            life with clean code, thoughtful design, and a{" "}
            <span style={{ color: "#f59e0b" }}>
              genuine care for the end result.
            </span>
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-7"
            style={{ animation: "fadeSlideUp 0.7s ease 0.5s both" }}
          >
            <a
              href="https://wa.me/2347066823448"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
            >
              Build with me ↗
            </a>
            <a href="#projects" className="cta-secondary">
              View Work
            </a>
          </div>

          {/* Skill pills */}
          <div
            className="flex flex-wrap gap-2 mb-7"
            style={{ animation: "fadeSlideUp 0.7s ease 0.6s both" }}
          >
            {SKILLS.map((s, i) => (
              <span
                key={s}
                className="skill-pill"
                style={{
                  animation: `floatSkill ${2.5 + i * 0.3}s ease-in-out ${i * 0.12}s infinite`,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#c4b5fd",
                    opacity: 0.6,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {s}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div
            className="flex gap-3 flex-wrap"
            style={{ animation: "fadeSlideUp 0.7s ease 0.7s both" }}
          >
            {[
              ["3+", "Years Exp."],
              ["10+", "Projects"],
              ["5+", "Clients"],
            ].map(([num, label]) => (
              <div key={label} className="stat-card">
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 22,
                    color: "#f59e0b",
                    lineHeight: 1,
                    marginBottom: 3,
                  }}
                >
                  {num}
                </p>
                <p
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 10,
                    color: statLabelColor,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — IDE Editor (always dark, like a real code editor) ── */}
        <div
          className="flex-1 flex justify-center items-center"
          style={{
            animation: "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both",
            minWidth: 300,
            maxWidth: 520,
          }}
        >
          <div
            style={{
              width: "100%",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(124,58,237,0.4)",
              background: "rgba(10,0,31,0.82)",
              backdropFilter: "blur(24px)",
              animation: "glowPulse 4s ease-in-out infinite",
              position: "relative",
            }}
          >
            {/* Scanline */}
            <div
              className="scanline-fx"
              style={{
                position: "absolute",
                inset: "0 0 auto 0",
                height: 32,
                pointerEvents: "none",
                zIndex: 10,
                background:
                  "linear-gradient(transparent,rgba(124,58,237,0.07),transparent)",
              }}
            />

            {/* Title bar */}
            <div
              style={{
                background: "rgba(124,58,237,0.1)",
                borderBottom: "1px solid rgba(124,58,237,0.25)",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#ff5f57",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#febc2e",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#28c840",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: 11,
                  color: "#64748b",
                  marginLeft: 10,
                  flex: 1,
                  textAlign: "center",
                  paddingRight: 40,
                }}
              >
                portfolio — VS Code
              </span>
            </div>

            {/* File tabs */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid rgba(124,58,237,0.2)",
                background: "rgba(124,58,237,0.06)",
                overflowX: "auto",
              }}
            >
              {FILE_TABS.map((name, i) => (
                <button
                  key={name}
                  className={`tab-btn ${activeTab === i ? "active" : ""}`}
                  onClick={() => setActiveTab(i)}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* Editor body */}
            <div style={{ display: "flex" }}>
              {/* Sidebar */}
              <div
                style={{
                  width: 36,
                  background: "rgba(124,58,237,0.06)",
                  borderRight: "1px solid rgba(124,58,237,0.15)",
                  flexShrink: 0,
                  paddingTop: 14,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {["◈", "⬡", "⊞"].map((icon, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 13,
                      color: i === 0 ? "#c4b5fd" : "rgba(124,58,237,0.3)",
                      cursor: "pointer",
                    }}
                  >
                    {icon}
                  </span>
                ))}
              </div>

              {/* Code */}
              <div
                style={{
                  flex: 1,
                  padding: "16px 0",
                  fontFamily: "'Fira Code', monospace",
                  fontSize: 13,
                  lineHeight: 1.9,
                  minHeight: 300,
                  overflowX: "auto",
                  background: "transparent",
                }}
              >
                {lines.slice(0, visibleLines).map((line, i) => {
                  const full = "  ".repeat(line.indent) + line.text;
                  return (
                    <div
                      key={`${activeTab}-${i}`}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        paddingRight: 20,
                        animation: "fadeIn 0.15s ease both",
                      }}
                    >
                      <span className="line-num">{i + 1}</span>
                      <span
                        style={{
                          color: kindColor[line.kind] ?? "#e2e8f0",
                          whiteSpace: "pre",
                          fontStyle:
                            line.kind === "comment" ? "italic" : "normal",
                        }}
                      >
                        {full}
                      </span>
                    </div>
                  );
                })}

                {currentLineIdx < lines.length && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      paddingRight: 20,
                      background: "rgba(124,58,237,0.08)",
                    }}
                  >
                    <span className="line-num">{visibleLines + 1}</span>
                    <span
                      style={{
                        color:
                          kindColor[lines[currentLineIdx].kind] ?? "#e2e8f0",
                        whiteSpace: "pre",
                        fontStyle:
                          lines[currentLineIdx].kind === "comment"
                            ? "italic"
                            : "normal",
                      }}
                    >
                      {(
                        "  ".repeat(lines[currentLineIdx].indent) +
                        lines[currentLineIdx].text
                      ).slice(0, typedChars)}
                      <span
                        style={{
                          display: "inline-block",
                          width: 2,
                          height: "1em",
                          background: cursorOn ? "#fde68a" : "transparent",
                          verticalAlign: "text-bottom",
                          marginLeft: 1,
                          transition: "background 0.1s",
                        }}
                      />
                    </span>
                  </div>
                )}

                {currentLineIdx >= lines.length && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      paddingRight: 20,
                    }}
                  >
                    <span className="line-num">{lines.length + 1}</span>
                    <span
                      style={{
                        color: "#34d399",
                        fontStyle: "italic",
                        fontSize: 12,
                      }}
                    >
                      // ✓ compiled successfully
                      <span
                        style={{
                          display: "inline-block",
                          width: 2,
                          height: "1em",
                          background: cursorOn ? "#34d399" : "transparent",
                          verticalAlign: "text-bottom",
                          marginLeft: 2,
                        }}
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Status bar */}
            <div
              style={{
                background: "rgba(124,58,237,0.55)",
                borderTop: "1px solid rgba(124,58,237,0.3)",
                color: "rgba(255,255,255,0.8)",
                fontFamily: "'Fira Code', monospace",
                fontSize: 11,
                padding: "4px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <span>⎇ main</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#34d399",
                      display: "inline-block",
                    }}
                  />
                  {FILE_TABS[activeTab]}
                </span>
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                <span>TypeScript</span>
                <span>UTF-8</span>
                <span>{time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}