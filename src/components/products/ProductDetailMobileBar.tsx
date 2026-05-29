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
    <div
      className="product-mobile-buy-bar fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white shadow-[0_-4px_20px_rgba(15,23,42,0.08)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-slate-500">
            {product.title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold tabular-nums text-slate-900">
              {formatPrice(current)}
            </span>
            {hasDiscount && original != null && (
              <span className="text-sm tabular-nums text-slate-400 line-through">
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
          className="shrink-0 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-sm disabled:opacity-60"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
