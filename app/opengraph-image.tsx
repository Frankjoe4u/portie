import { ImageResponse } from "next/og";

export const alt = "Frank Joe - Full-Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
            "radial-gradient(circle at 85% 20%, rgba(47,123,255,0.35), rgba(5,8,22,0) 55%), #050816",
          color: "#eef2ff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 4,
            color: "#1fb6ff",
          }}
        >
          FJ
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 800, letterSpacing: -2, lineHeight: 1.02 }}>
            Frank Joe
          </div>
          <div style={{ marginTop: 14, fontSize: 48, fontWeight: 600, color: "#1fb6ff" }}>
            Full-Stack Software Engineer
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#94a3c7", maxWidth: 900 }}>
            Production-ready web applications and business systems.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#94a3c7" }}>fjoe.vercel.app</div>
      </div>
    ),
    { ...size },
  );
}
