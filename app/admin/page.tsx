"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminDashboardPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d0020 0%, #1a003e 100%)",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800 }}>
            Admin Dashboard
          </h1>
          <div style={{ display: "flex", gap: 10 }}>
          <Link
            href="/admin/settings"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            Settings
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: 8,
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Sign Out
          </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          <Link
            href="/admin/projects"
            style={{
              display: "block",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: 28,
              textDecoration: "none",
            }}
          >
            <h2 style={{ color: "#facc15", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Projects
            </h2>
            <p style={{ color: "#9ca3af", fontSize: 14 }}>
              Add, edit, or remove portfolio projects.
            </p>
          </Link>

          <Link
            href="/admin/blogs"
            style={{
              display: "block",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: 28,
              textDecoration: "none",
            }}
          >
            <h2 style={{ color: "#a78bfa", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Blog Posts
            </h2>
            <p style={{ color: "#9ca3af", fontSize: 14 }}>
              Write, edit, publish, or delete blog posts.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

