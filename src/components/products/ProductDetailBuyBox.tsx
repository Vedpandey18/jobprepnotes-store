"use client";

import { formatPrice, getDisplayPrices } from "@/lib/pricing";
import type { Product } from "@/types/product";
import { ProductDetailActions } from "@/components/ProductDetailActions";

const TRUST_PILLS = [
  "Instant PDF download",
  "Secure payment",
  "No subscription",
];

type Props = {
  product: Product;
  variant?: "hero" | "sticky" | "cta";
};

export function ProductDetailBuyBox({ product, variant = "hero" }: Props) {
  const { current, original } = getDisplayPrices(product);
  const hasDiscount = original !== undefined;

  const shellClass =
    variant === "sticky"
      ? "rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
      : variant === "cta"
        ? "rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none sm:p-10"
        : "rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none";

  return (
    <div className={shellClass}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
        One-time purchase
      </p>

      <div
        className={
          variant === "cta"
            ? "mt-4 flex flex-col items-center gap-2"
            : "mt-3 flex flex-wrap items-baseline gap-3"
        }
      >
        <span className="font-display text-4xl font-bold tabular-nums text-slate-900 dark:text-white sm:text-[2.75rem]">
          {formatPrice(current)}
        </span>
        {hasDiscount && original != null && (
          <span className="text-xl tabular-nums text-slate-400 line-through dark:text-slate-500">
            {formatPrice(original)}
          </span>
        )}
        {hasDiscount && product.discountPercent != null && (
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
            Save {product.discountPercent}%
          </span>
        )}
      </div>

      <ProductDetailActions
        product={product}
        buttonStyle={variant === "cta" ? "accent" : "primary"}
      />

      <ul
        className={
          variant === "cta"
            ? "mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-slate-100 pt-6 dark:border-slate-800"
            : "mt-5 space-y-2.5 border-t border-slate-100 pt-5 dark:border-slate-800"
        }
      >
        {TRUST_PILLS.map((label) => (
          <li
            key={label}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white"
              aria-hidden
            >
              ✓
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
