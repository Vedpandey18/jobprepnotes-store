"use client";

import { useEffect, useMemo, useState } from "react";

type PersistProps = {
  email: string | null;
  fullName: string | null;
  amount: string | null;
  subtotal: string | null;
  taxAmount: string | null;
  coupon: string | null;
  discount: string | null;
  paid: string | null;
};

export function SuccessPersistClient({
  email,
  fullName,
  amount,
  subtotal,
  taxAmount,
  coupon,
  discount,
  paid,
}: PersistProps) {
  const [msg, setMsg] = useState<string | null>(null);

  const saveKey = useMemo(() => {
    if (!email || !amount) return null;
    return `order_saved:${email}:${amount}:${coupon ?? ""}:${discount ?? ""}`;
  }, [email, amount, coupon, discount]);

  useEffect(() => {
    if (paid !== "1" || !email || !amount || !saveKey) return;
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(saveKey) === "1") return;

    const payload = {
      email,
      fullName: fullName || null,
      amount: Number(amount),
      subtotal: subtotal != null ? Number(subtotal) : null,
      taxAmount: taxAmount != null ? Number(taxAmount) : null,
      couponCode: coupon || null,
      discountAmount: discount != null ? Number(discount) : null,
    };

    if (!Number.isFinite(payload.amount)) return;

    void fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("save failed");
        window.sessionStorage.setItem(saveKey, "1");
      })
      .catch(() => {
        setMsg("Order save pending. Please refresh once if it does not appear in admin.");
      });
  }, [amount, coupon, discount, email, fullName, paid, saveKey, subtotal, taxAmount]);

  if (!msg) return null;
  return (
    <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
      {msg}
    </p>
  );
}

