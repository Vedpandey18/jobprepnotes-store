"use client";

import { useCallback, useEffect, useState } from "react";

type CouponRow = {
  id: string;
  code: string;
  discountType: "percentage" | "flat";
  discountValue: unknown;
  minAmount: unknown;
  maxDiscount: unknown;
  expiryDate: string;
  usageLimit: number | null;
  usedCount: number;
  isActive: boolean;
};

function defaultExpiryLocal() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 16);
}

function emptyForm() {
  return {
    code: "",
    discountType: "percentage" as "percentage" | "flat",
    discountValue: "",
    minAmount: "",
    maxDiscount: "",
    expiryDate: defaultExpiryLocal(),
    usageLimit: "",
    isActive: true,
  };
}

export function AdminCouponsClient() {
  const [rows, setRows] = useState<CouponRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(() => emptyForm());
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/admin/coupons");
      const data = await r.json();
      if (!r.ok) {
        setError((data as { error?: string }).error ?? "Failed to load");
        setRows([]);
        return;
      }
      setRows(data as CouponRow[]);
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
    setForm(emptyForm());
  }

  function startEdit(c: CouponRow) {
    setEditingId(c.id);
    const exp = c.expiryDate.includes("T") ? c.expiryDate.slice(0, 16) : c.expiryDate;
    setForm({
      code: c.code,
      discountType: c.discountType,
      discountValue: String(c.discountValue),
      minAmount: c.minAmount != null ? String(c.minAmount) : "",
      maxDiscount: c.maxDiscount != null ? String(c.maxDiscount) : "",
      expiryDate: exp,
      usageLimit: c.usageLimit != null ? String(c.usageLimit) : "",
      isActive: c.isActive,
    });
  }

  async function save() {
    setBusy(true);
    setError(null);
    try {
      const payload = {
        code: form.code,
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        minAmount: form.minAmount === "" ? null : Number(form.minAmount),
        maxDiscount: form.maxDiscount === "" ? null : Number(form.maxDiscount),
        expiryDate: new Date(form.expiryDate).toISOString(),
        usageLimit: form.usageLimit === "" ? null : Number(form.usageLimit),
        isActive: form.isActive,
      };
      const url = editingId ? `/api/admin/coupons/${editingId}` : "/api/admin/coupons";
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
      await load();
      startCreate();
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  async function toggleActive(c: CouponRow) {
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/coupons/${c.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !c.isActive }),
      });
      if (!r.ok) {
        setError("Toggle failed");
        return;
      }
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this coupon?")) return;
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
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

  function status(c: CouponRow) {
    if (!c.isActive) return "Inactive";
    if (new Date(c.expiryDate) < new Date()) return "Expired";
    return "Active";
  }

  return (
    <div className="space-y-8">
      {error && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
          {error}
        </p>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
          {editingId ? "Edit coupon" : "Create coupon"}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Code *</span>
            <input
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 font-mono uppercase dark:border-slate-600 dark:bg-slate-950"
              value={form.code}
              onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Discount type</span>
            <select
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.discountType}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  discountType: e.target.value as "percentage" | "flat",
                }))
              }
            >
              <option value="percentage">Percentage (%)</option>
              <option value="flat">Flat (₹)</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Value * ({form.discountType === "percentage" ? "%" : "₹"})
            </span>
            <input
              type="number"
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.discountValue}
              onChange={(e) => setForm((f) => ({ ...f, discountValue: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Min order (₹)</span>
            <input
              type="number"
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.minAmount}
              onChange={(e) => setForm((f) => ({ ...f, minAmount: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Max discount (₹)</span>
            <input
              type="number"
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.maxDiscount}
              onChange={(e) => setForm((f) => ({ ...f, maxDiscount: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Expiry *</span>
            <input
              type="datetime-local"
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.expiryDate}
              onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600 dark:text-slate-400">Usage limit</span>
            <input
              type="number"
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-950"
              value={form.usageLimit}
              onChange={(e) => setForm((f) => ({ ...f, usageLimit: e.target.value }))}
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
            />
            Active
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
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">All coupons</h2>
        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No coupons yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Code</th>
                  <th className="p-3 font-semibold">Discount</th>
                  <th className="p-3 font-semibold">Expires</th>
                  <th className="p-3 font-semibold">Used</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3 font-mono font-semibold">{c.code}</td>
                    <td className="p-3">
                      {c.discountType === "flat"
                        ? `₹${String(c.discountValue)}`
                        : `${String(c.discountValue)}%`}
                    </td>
                    <td className="p-3 text-xs text-slate-600">
                      {new Date(c.expiryDate).toLocaleString()}
                    </td>
                    <td className="p-3 tabular-nums">
                      {c.usedCount}
                      {c.usageLimit != null ? ` / ${c.usageLimit}` : ""}
                    </td>
                    <td className="p-3">{status(c)}</td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => startEdit(c)}
                        className="mr-2 text-violet-600 hover:underline dark:text-violet-400"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void toggleActive(c)}
                        className="mr-2 text-slate-600 hover:underline dark:text-slate-400"
                      >
                        Toggle
                      </button>
                      <button
                        type="button"
                        onClick={() => void remove(c.id)}
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
