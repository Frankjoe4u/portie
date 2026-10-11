import { ImageResponse } from "next/og";

export const alt = "5G Hotel Management System - case study by Frank Joe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tech = ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Paystack"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 85% 15%, rgba(47,123,255,0.35), rgba(5,8,22,0) 55%), #050816",
          color: "#eef2ff",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 3, color: "#1fb6ff" }}>
          CASE STUDY
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -2, lineHeight: 1.04 }}>
            5G Hotel Management System
          </div>
          <div style={{ marginTop: 22, fontSize: 38, color: "#94a3c7" }}>
            Full-stack hotel booking and operations platform.
          </div>
          <div style={{ display: "flex", marginTop: 34 }}>
            {tech.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  marginRight: 12,
                  padding: "8px 18px",
                  border: "1px solid rgba(96,130,255,0.5)",
                  borderRadius: 10,
                  fontSize: 24,
                  color: "#eef2ff",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#94a3c7" }}>
          <div style={{ display: "flex" }}>Frank Joe - Full-Stack Software Engineer</div>
          <div style={{ display: "flex" }}>fjoe.vercel.app</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
