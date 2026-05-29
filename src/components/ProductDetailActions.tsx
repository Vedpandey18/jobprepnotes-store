"use client";

import type { Product } from "@/types/product";
import { getCheckoutUrlForProduct } from "@/lib/client-payment-link";

type Props = { product: Product };

export function ProductDetailActions({ product }: Props) {
  const checkoutUrl = getCheckoutUrlForProduct(product);

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => {
          if (!checkoutUrl) return;
          window.location.assign(checkoutUrl);
        }}
        disabled={!checkoutUrl}
        className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Buy Now
      </button>
    </div>
  );
}
