"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  _id: string;
  title: string;
  tech: string[];
  live: string;
  github: string;
  color: string;
  image: string;
  imagePublicId?: string;
  order: number;
};

const emptyForm = {
  title: "",
  techInput: "",
  live: "",
  github: "",
  color: "#facc15",
  image: "",
  imagePublicId: "",
  order: 0,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  };

  const startEdit = (p: Project) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      techInput: p.tech.join(", "),
      live: p.live,
      github: p.github,
      color: p.color,
      image: p.image,
      imagePublicId: p.imagePublicId || "",
      order: p.order,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setForm((f) => ({ ...f, image: data.url, imagePublicId: data.publicId }));
    } catch {
      setError("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.image) {
      setError("Please upload an image before saving.");
      return;
    }

    setSaving(true);

    const payload = {
      title: form.title,
      tech: form.techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      live: form.live,
      github: form.github,
      color: form.color,
      image: form.image,
      imagePublicId: form.imagePublicId,
      order: Number(form.order) || 0,
    };

    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }

      resetForm();
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      await loadProjects();
    } else {
      alert("Failed to delete project.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d0020 0%, #1a003e 100%)",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <Link href="/admin" style={{ color: "#9ca3af", fontSize: 13 }}>
            &larr; Back to Dashboard
          </Link>
        </div>

        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 24 }}>
          Manage Projects
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
          }}
        >
          <h2 style={{ color: "#facc15", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
            {editingId ? "Edit Project" : "Add New Project"}
          </h2>

          <div style={{ display: "grid", gap: 14 }}>
            <FormField label="Title">
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                style={inputStyle}
              />
            </FormField>

            <FormField label="Tech Stack (comma separated)">
              <input
                required
                placeholder="Next.js, TypeScript, Tailwind CSS"
                value={form.techInput}
                onChange={(e) => setForm((f) => ({ ...f, techInput: e.target.value }))}
                style={inputStyle}
              />
            </FormField>

            <FormField label="Live URL">
              <input
                required
                type="url"
                value={form.live}
                onChange={(e) => setForm((f) => ({ ...f, live: e.target.value }))}
                style={inputStyle}
              />
            </FormField>

            <FormField label="GitHub URL">
              <input
                required
                type="url"
                value={form.github}
                onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))}
                style={inputStyle}
              />
            </FormField>

            <FormField label="Accent Color">
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                style={{ ...inputStyle, padding: 4, height: 42, width: 80 }}
              />
            </FormField>

            <FormField label="Order (lower shows first)">
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                style={inputStyle}
              />
            </FormField>

            <FormField label="Project Image">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                style={{ color: "#d1d5db", fontSize: 13 }}
              />
              {uploading && (
                <p style={{ color: "#9ca3af", fontSize: 12, marginTop: 6 }}>
                  Uploading...
                </p>
              )}
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  style={{
                    marginTop: 10,
                    width: 160,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />
              )}
            </FormField>
          </div>

          {error && (
            <p style={{ color: "#f87171", fontSize: 13, marginTop: 12 }}>{error}</p>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button
              type="submit"
              disabled={saving || uploading}
              style={{
                background: "#facc15",
                color: "#000",
                fontWeight: 700,
                border: "none",
                borderRadius: 8,
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: 14,
                opacity: saving || uploading ? 0.7 : 1,
              }}
            >
              {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List */}
        {loading ? (
          <p style={{ color: "#9ca3af" }}>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>No projects yet. Add one above.</p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {projects.map((p) => (
              <div
                key={p._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: 14,
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{p.title}</p>
                  <p style={{ color: "#9ca3af", fontSize: 12 }}>{p.tech.join(", ")}</p>
                </div>
                <button
                  onClick={() => startEdit(p)}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    borderRadius: 8,
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  style={{
                    background: "rgba(248,113,113,0.15)",
                    border: "1px solid rgba(248,113,113,0.4)",
                    color: "#f87171",
                    borderRadius: 8,
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", color: "#d1d5db", fontSize: 13, marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(0,0,0,0.3)",
  color: "#fff",
  fontSize: 14,
};

