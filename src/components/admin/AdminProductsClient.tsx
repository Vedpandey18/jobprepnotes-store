"use client";

import { useCallback, useEffect, useState } from "react";
import { upload } from "@vercel/blob/client";

type ProductRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  price: unknown;
  discountPrice: unknown;
  imageUrl: string;
  pdfUrl: string;
  bundlePdfUrls: string | null;
  badge: string | null;
};

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  category: "Interview",
  price: "",
  discountPrice: "",
  imageUrl: "",
  pdfUrl: "",
  bundlePdfUrls: "",
  badge: "",
};

export function AdminProductsClient() {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/products");
      const data = await r.json();
      if (!r.ok) {
        setError((data as { error?: string }).error ?? "Failed to load");
        setRows([]);
        return;
      }
      setRows(data as ProductRow[]);
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
    setForm(emptyForm);
  }

  function startEdit(p: ProductRow) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      description: p.description,
      category: p.category,
      price: String(p.price),
      discountPrice: p.discountPrice != null ? String(p.discountPrice) : "",
      imageUrl: p.imageUrl,
      pdfUrl: p.pdfUrl,
      bundlePdfUrls: p.bundlePdfUrls ?? "",
      badge: p.badge ?? "",
    });
  }

  async function save() {
    setBusy(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const payload = {
        title: form.title,
        slug: form.slug || undefined,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        discountPrice: form.discountPrice === "" ? null : Number(form.discountPrice),
        imageUrl: form.imageUrl,
        pdfUrl: form.pdfUrl,
        bundlePdfUrls: form.bundlePdfUrls,
        badge: form.badge || null,
      };
      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PUT" : "POST";
      const r = await fetch(url, {
        method,
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
        `Saved “${saved.title ?? "Product"}” — store URL uses slug: /products/${saved.slug ?? "…"}`
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
    if (!confirm("Delete this product?")) return;
    setBusy(true);
    try {
      const r = await fetch(`/api/products/${id}`, { method: "DELETE" });
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

  async function uploadFile(kind: "image" | "pdf" | "bundle", file: File | null) {
    if (!file) return;
    setError(null);
    setUploadProgress(`Uploading ${file.name}…`);

    try {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
      const pathname = `uploads/${Date.now()}-${safe}`;

      const blob = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        multipart: true,
        onUploadProgress: ({ percentage }) => {
          setUploadProgress(`Uploading ${file.name}… ${Math.round(percentage)}%`);
        },
      });

      const url = blob.url;
      setUploadProgress(null);
      if (kind === "image") {
        setForm((f) => ({ ...f, imageUrl: url }));
        setSuccessMsg(`Image uploaded: ${url}`);
      } else if (kind === "pdf") {
        setForm((f) => ({ ...f, pdfUrl: url }));
        setSuccessMsg(`PDF uploaded: ${url}`);
      } else {
        setForm((f) => ({
          ...f,
          bundlePdfUrls: f.bundlePdfUrls
            ? `${f.bundlePdfUrls}\n${url}`
            : url,
        }));
        setSuccessMsg(`Bundle file uploaded: ${url}`);
      }
    } catch (err) {
      setUploadProgress(null);
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(`Upload failed: ${msg}`);
    }
  }

  return (
    <div className="space-y-8">
      {error && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
          {error}
        </p>
      )}
      {uploadProgress && (
        <p className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
          {uploadProgress}
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
          {editingId ? "Edit product" : "Add product"}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Title *</span>
            <input
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Slug</span>
            <input
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="auto from title if empty"
            />
          </label>
          <label className="col-span-full block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Description *</span>
            <textarea
              rows={3}
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Price (₹) *</span>
            <input
              type="number"
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Discount price (₹)</span>
            <input
              type="number"
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.discountPrice}
              onChange={(e) => setForm((f) => ({ ...f, discountPrice: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Cover image URL *</span>
            <p className="mt-0.5 text-xs text-slate-500">
              Use Choose File below — URL must start with https:// or /uploads/
            </p>
            <input
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            />
            <input
              type="file"
              accept="image/*"
              className="mt-1 text-xs"
              onChange={(e) => void uploadFile("image", e.target.files?.[0] ?? null)}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">PDF URL *</span>
            <p className="mt-0.5 text-xs text-slate-500">
              Use Choose File below — do not type the file name manually
            </p>
            <input
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.pdfUrl}
              onChange={(e) => setForm((f) => ({ ...f, pdfUrl: e.target.value }))}
            />
            <input
              type="file"
              accept="application/pdf"
              className="mt-1 text-xs"
              onChange={(e) => void uploadFile("pdf", e.target.files?.[0] ?? null)}
            />
          </label>
          <label className="col-span-full block text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Premium bundle files (optional)
            </span>
            <textarea
              rows={3}
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.bundlePdfUrls}
              onChange={(e) =>
                setForm((f) => ({ ...f, bundlePdfUrls: e.target.value }))
              }
              placeholder="One file URL per line"
            />
            <input
              type="file"
              accept="application/pdf"
              className="mt-1 text-xs"
              onChange={(e) => void uploadFile("bundle", e.target.files?.[0] ?? null)}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Category</span>
            <input
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Badge</span>
            <input
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.badge}
              onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" disabled={busy} onClick={() => void save()} className="btn-primary px-4 py-2 text-sm">
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button type="button" onClick={startCreate} className="rounded-lg border border-slate-200 px-4 py-2 text-sm dark:border-slate-600">
              Cancel edit
            </button>
          )}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
          All products
        </h2>
        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No products yet. Connect MySQL and add items.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Title</th>
                  <th className="p-3 font-semibold">Price</th>
                  <th className="p-3 font-semibold">Slug</th>
                  <th className="p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">{p.title}</td>
                    <td className="p-3 tabular-nums">₹{String(p.price)}</td>
                    <td className="p-3 font-mono text-xs text-slate-500">{p.slug}</td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => startEdit(p)}
                        className="mr-2 text-violet-600 hover:underline dark:text-violet-400"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void remove(p.id)}
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
