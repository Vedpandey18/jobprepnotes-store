"use client";

import { formatPrice, getDisplayPrices } from "@/lib/pricing";
import { getCheckoutUrlForProduct } from "@/lib/client-payment-link";
import type { Product } from "@/types/product";

type Props = { product: Product };

export function ProductDetailBottomBuy({ product }: Props) {
  const { current, original } = getDisplayPrices(product);
  const checkoutUrl = getCheckoutUrlForProduct(product);
  const hasDiscount = original !== undefined;

  return (
    <section
      className="border-t border-slate-200 bg-gradient-to-b from-violet-50/80 to-white py-10 sm:py-12"
      aria-label="Purchase"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 sm:p-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
            Ready to buy?
          </p>
          <h2 className="mt-2 text-center font-display text-lg font-semibold text-slate-900 sm:text-xl">
            {product.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="font-display text-3xl font-bold tabular-nums text-slate-900">
              {formatPrice(current)}
            </span>
            {hasDiscount && original != null && (
              <span className="text-lg tabular-nums text-slate-400 line-through">
                {formatPrice(original)}
              </span>
            )}
            {hasDiscount && product.discountPercent != null && (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-800">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              if (!checkoutUrl) return;
              window.location.assign(checkoutUrl);
            }}
            disabled={!checkoutUrl}
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Buy Now — Get Instant Access
          </button>

          <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-slate-100 pt-5 text-sm text-slate-600">
            {["Instant PDF download", "Secure payment", "No subscription"].map(
              (label) => (
                <li key={label} className="flex items-center gap-1.5">
                  <span className="text-emerald-600" aria-hidden>
                    ✓
                  </span>
                  {label}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
