"use client";

import { useCallback, useEffect, useState } from "react";

type BlogRow = {
  id: string;
  title: string;
  slug: string;
  content: string;
};

const empty = { title: "", slug: "", content: "" };

export function AdminBlogsClient() {
  const [rows, setRows] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/blogs", { credentials: "include" });
      const data = await r.json();
      if (!r.ok) {
        setError((data as { error?: string }).error ?? "Failed to load");
        setRows([]);
        return;
      }
      setRows(data as BlogRow[]);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function startCreate() {
    setEditingId(null);
    setForm(empty);
  }

  function startEdit(b: BlogRow) {
    setEditingId(b.id);
    setForm({ title: b.title, slug: b.slug, content: b.content });
  }

  async function save() {
    setBusy(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const payload = {
        title: form.title,
        slug: form.slug || undefined,
        content: form.content,
      };
      const url = editingId ? `/api/blogs/${editingId}` : "/api/blogs";
      const method = editingId ? "PUT" : "POST";
      const r = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      if (!r.ok) {
        setError((data as { error?: string }).error ?? "Save failed");
        return;
      }
      const saved = data as { title?: string; slug?: string };
      setSuccessMsg(
        `Saved “${saved.title ?? "Post"}” — public URL: /blog/${saved.slug ?? "…"}`
      );
      await load();
      startCreate();
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this blog post?")) return;
    setBusy(true);
    try {
      const r = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!r.ok) {
        setError("Delete failed");
        return;
      }
      await load();
      if (editingId === id) startCreate();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      {error && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
          {error}
        </p>
      )}
      {successMsg && (
        <p
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200"
          role="status"
        >
          {successMsg}
        </p>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
          {editingId ? "Edit blog" : "Add blog"}
        </h2>
        <div className="mt-4 space-y-3">
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Title *</span>
            <input
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Slug <span className="font-normal text-slate-400">(auto from title if empty)</span>
            </span>
            <input
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="leave blank to auto-generate"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Content *</span>
            <textarea
              rows={12}
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 font-mono text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" disabled={busy} onClick={() => void save()} className="btn-primary px-4 py-2 text-sm">
            {editingId ? "Update" : "Publish"}
          </button>
          {editingId && (
            <button type="button" onClick={startCreate} className="rounded-lg border border-slate-200 px-4 py-2 text-sm dark:border-slate-600">
              Cancel edit
            </button>
          )}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">All posts</h2>
        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No blog posts yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Title</th>
                  <th className="p-3 font-semibold">Slug</th>
                  <th className="p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((b) => (
                  <tr key={b.id} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">{b.title}</td>
                    <td className="p-3 font-mono text-xs text-slate-500">{b.slug}</td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => startEdit(b)}
                        className="mr-2 text-violet-600 hover:underline dark:text-violet-400"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void remove(b.id)}
                        className="text-rose-600 hover:underline dark:text-rose-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
