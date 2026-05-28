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
  const [formStep, setFormStep] = useState<"basic" | "media">("basic");

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
    setFormStep("basic");
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
    setFormStep("basic");
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
    <div className="space-y-6">
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

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
          {editingId ? "Edit product" : "Add product"}
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Keep it simple: add title, price, cover image, and optional payment link.
        </p>
        <div className="mt-4 inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 text-sm dark:border-slate-700 dark:bg-slate-800/60">
          <button
            type="button"
            onClick={() => setFormStep("basic")}
            className={`rounded-lg px-3 py-1.5 font-medium transition ${
              formStep === "basic"
                ? "bg-white text-violet-700 shadow-sm dark:bg-slate-900 dark:text-violet-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            }`}
          >
            1. Basic info
          </button>
          <button
            type="button"
            onClick={() => setFormStep("media")}
            className={`rounded-lg px-3 py-1.5 font-medium transition ${
              formStep === "media"
                ? "bg-white text-violet-700 shadow-sm dark:bg-slate-900 dark:text-violet-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            }`}
          >
            2. Media & payment
          </button>
        </div>

        {formStep === "basic" ? (
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
              rows={4}
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
          <div className="col-span-full">
            <button
              type="button"
              onClick={() => setFormStep("media")}
              className="mt-1 text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
            >
              Continue to Media & Payment →
            </button>
          </div>
          </div>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
            <span className="text-slate-600 dark:text-slate-400">
              Payment link (SuperProfile) (optional)
            </span>
            <p className="mt-0.5 text-xs text-slate-500">
              Add full checkout link (https://...). If set, Proceed to Pay will
              redirect there.
            </p>
            <input
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.pdfUrl}
              onChange={(e) => setForm((f) => ({ ...f, pdfUrl: e.target.value }))}
            />
          </label>
          <label className="col-span-full block text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Premium bundle files (optional)
            </span>
            <textarea
              rows={2}
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
          <div className="col-span-full">
            <button
              type="button"
              onClick={() => setFormStep("basic")}
              className="mt-1 text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
            >
              ← Back to Basic info
            </button>
          </div>
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4 dark:border-slate-700">
          <button type="button" disabled={busy} onClick={() => void save()} className="btn-primary rounded-xl px-5 py-2.5 text-sm">
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
          <div className="mt-4 grid gap-3">
            {rows.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900 dark:text-slate-100">
                      {p.title}
                    </p>
                    <p className="mt-1 font-mono text-xs text-slate-500">
                      /products/{p.slug}
                    </p>
                    <p className="mt-2 text-sm tabular-nums text-slate-700 dark:text-slate-300">
                      Price: ₹{String(p.price)}
                      {p.discountPrice != null && p.discountPrice !== "" && (
                        <span className="ml-2 text-emerald-600 dark:text-emerald-400">
                          Offer: ₹{String(p.discountPrice)}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(p.id)}
                      className="text-sm font-medium text-rose-600 hover:underline dark:text-rose-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
