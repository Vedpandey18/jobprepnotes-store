"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { getProductImageAlt } from "@/lib/seo/product-seo";
import { productDetailPath } from "@/lib/urls";
import type { Product } from "@/types/product";
import { formatPrice, getDisplayPrices } from "@/lib/pricing";

type Props = {
  products: Product[];
};

/** Compact catalog strip on checkout — add items without leaving the page. */
export function CheckoutAddMoreProducts({ products }: Props) {
  const { addToCart, cartItems } = useCart();
  const inCartIds = useMemo(
    () => new Set(cartItems.map((p) => p.id)),
    [cartItems],
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <div
      className="mt-4 rounded-xl border border-violet-200/60 bg-slate-50/90 p-3 dark:border-violet-800/50 dark:bg-violet-950/20"
      aria-labelledby="checkout-add-more-heading"
    >
      <h3
        id="checkout-add-more-heading"
        className="text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-400"
      >
        Add more products
      </h3>
      <p className="mt-1 text-[11px] leading-snug text-slate-500 dark:text-slate-400">
        Tap Add to include another ebook — totals update automatically.
      </p>
      <ul className="mt-2 max-h-52 space-y-2 overflow-y-auto pr-0.5 sm:max-h-60">
        {products.map((p) => {
          const inCart = inCartIds.has(p.id);
          const { current, original } = getDisplayPrices(p);
          const hasDisc = original !== undefined;
          const thumbAlt = getProductImageAlt(p);
          return (
            <li key={p.id}>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200/90 bg-white px-2 py-1.5 shadow-sm dark:border-slate-600/80 dark:bg-slate-900/70">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={p.coverImage}
                    alt={thumbAlt}
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={productDetailPath(p)}
                    className="line-clamp-1 text-xs font-medium text-slate-900 transition hover:text-violet-600 dark:text-slate-100 sm:text-[13px] dark:hover:text-violet-400"
                  >
                    {p.title}
                  </Link>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                      {formatPrice(current)}
                    </span>
                    {hasDisc && original != null && (
                      <span className="text-[10px] tabular-nums text-slate-500 line-through">
                        {formatPrice(original)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  disabled={inCart}
                  onClick={() => addToCart(p)}
                  className="shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition disabled:cursor-not-allowed sm:text-xs bg-violet-600 text-white hover:bg-violet-500 disabled:bg-slate-200 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
                >
                  {inCart ? "In cart" : "Add"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <Link
        href="/products"
        className="mt-3 inline-flex text-xs font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
      >
        Browse all products →
      </Link>
    </div>
  );
}
