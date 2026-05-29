"use client";

import { formatPrice, getDisplayPrices } from "@/lib/pricing";
import { getCheckoutUrlForProduct } from "@/lib/client-payment-link";
import type { Product } from "@/types/product";

type Props = { product: Product };

export function ProductDetailMobileBar({ product }: Props) {
  const { current, original } = getDisplayPrices(product);
  const checkoutUrl = getCheckoutUrlForProduct(product);
  const hasDiscount = original !== undefined;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-violet-200/80 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(91,33,182,0.12)] backdrop-blur-lg dark:border-violet-900/50 dark:bg-slate-950/95 lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
            {product.title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {formatPrice(current)}
            </span>
            {hasDiscount && original != null && (
              <span className="text-sm tabular-nums text-slate-500 line-through">
                {formatPrice(original)}
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (!checkoutUrl) return;
            window.location.assign(checkoutUrl);
          }}
          disabled={!checkoutUrl}
          className="shrink-0 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 disabled:opacity-60"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
