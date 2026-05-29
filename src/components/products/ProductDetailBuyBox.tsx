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
      ? "rounded-2xl border border-violet-200/80 bg-white/95 p-5 shadow-xl shadow-violet-500/10 backdrop-blur dark:border-violet-800/60 dark:bg-slate-900/95"
      : variant === "cta"
        ? "rounded-3xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur sm:p-8"
        : "rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg dark:border-slate-700/80 dark:bg-slate-900 sm:p-6";

  const priceClass =
    variant === "cta"
      ? "font-display text-4xl font-semibold tabular-nums text-white sm:text-5xl"
      : "font-display text-3xl font-semibold tabular-nums text-slate-900 dark:text-slate-100";

  return (
    <div className={shellClass}>
      <div
        className={
          variant === "cta"
            ? "flex flex-col items-center gap-3"
            : "flex flex-wrap items-baseline gap-3"
        }
      >
        <span className={priceClass}>{formatPrice(current)}</span>
        {hasDiscount && original != null && (
          <span
            className={
              variant === "cta"
                ? "text-lg tabular-nums text-violet-200 line-through"
                : "text-lg tabular-nums text-slate-500 line-through"
            }
          >
            {formatPrice(original)}
          </span>
        )}
        {hasDiscount && product.discountPercent != null && (
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            Save {product.discountPercent}%
          </span>
        )}
      </div>

      <ProductDetailActions product={product} />

      <ul
        className={
          variant === "cta"
            ? "mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2"
            : "mt-5 space-y-2.5"
        }
      >
        {TRUST_PILLS.map((label) => (
          <li
            key={label}
            className={
              variant === "cta"
                ? "flex items-center gap-2 text-sm font-medium text-violet-100"
                : "flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
            }
          >
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs text-emerald-600 dark:text-emerald-400"
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
