"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type BlogPost = {
  _id: string;
  slug: string;
  title: string;
  tag: string;
  tagColor: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  coverImagePublicId?: string;
  readTime: string;
  published: boolean;
};

const emptyForm = {
  title: "",
  tag: "",
  tagColor: "#facc15",
  date: "",
  excerpt: "",
  content: "",
  coverImage: "",
  coverImagePublicId: "",
  readTime: "5 min read",
  published: true,
};

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    const res = await fetch("/api/blogs?all=true");
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  };

  const startEdit = (p: BlogPost) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      tag: p.tag,
      tagColor: p.tagColor,
      date: p.date,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage || "",
      coverImagePublicId: p.coverImagePublicId || "",
      readTime: p.readTime,
      published: p.published,
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
      setForm((f) => ({
        ...f,
        coverImage: data.url,
        coverImagePublicId: data.publicId,
      }));
    } catch {
      setError("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const url = editingId ? `/api/blogs/${editingId}` : "/api/blogs";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }

      resetForm();
      await loadPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    if (res.ok) {
      await loadPosts();
    } else {
      alert("Failed to delete post.");
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
          Manage Blog Posts
        </h1>

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
          <h2 style={{ color: "#a78bfa", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
            {editingId ? "Edit Post" : "Write New Post"}
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
              <FormField label="Tag">
                <input
                  required
                  placeholder="Next.js / PWA"
                  value={form.tag}
                  onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                  style={inputStyle}
                />
              </FormField>
              <FormField label="Tag Color">
                <input
                  type="color"
                  value={form.tagColor}
                  onChange={(e) => setForm((f) => ({ ...f, tagColor: e.target.value }))}
                  style={{ ...inputStyle, padding: 4, height: 42 }}
                />
              </FormField>
              <FormField label="Date (e.g. Jun 2026)">
                <input
                  placeholder="auto if blank"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  style={inputStyle}
                />
              </FormField>
              <FormField label="Read Time">
                <input
                  placeholder="5 min read"
                  value={form.readTime}
                  onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
                  style={inputStyle}
                />
              </FormField>
            </div>

            <FormField label="Excerpt">
              <textarea
                required
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </FormField>

            <FormField label="Content (Markdown)">
              <textarea
                required
                rows={14}
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  fontFamily: "monospace",
                  fontSize: 13,
                }}
              />
            </FormField>

            <FormField label="Cover Image (optional)">
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
              {form.coverImage && (
                <img
                  src={form.coverImage}
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

            <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#d1d5db", fontSize: 13 }}>
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Published (visible on public site)
            </label>
          </div>

          {error && (
            <p style={{ color: "#f87171", fontSize: 13, marginTop: 12 }}>{error}</p>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button
              type="submit"
              disabled={saving || uploading}
              style={{
                background: "#a78bfa",
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
              {saving ? "Saving..." : editingId ? "Update Post" : "Publish Post"}
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

        {loading ? (
          <p style={{ color: "#9ca3af" }}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>No posts yet. Write one above.</p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {posts.map((p) => (
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
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
                    {p.title}{" "}
                    {!p.published && (
                      <span style={{ color: "#f87171", fontSize: 11, fontWeight: 600 }}>
                        (draft)
                      </span>
                    )}
                  </p>
                  <p style={{ color: "#9ca3af", fontSize: 12 }}>/{p.slug}</p>
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

