"use client";

import type { Product } from "@/types/product";
import { getCheckoutUrlForProduct } from "@/lib/client-payment-link";

type Props = {
  product: Product;
  buttonStyle?: "primary" | "accent";
};

export function ProductDetailActions({
  product,
  buttonStyle = "primary",
}: Props) {
  const checkoutUrl = getCheckoutUrlForProduct(product);

  const buttonClass =
    buttonStyle === "accent"
      ? "inline-flex w-full items-center justify-center rounded-xl bg-amber-400 px-6 py-4 text-base font-bold text-slate-900 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      : "inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => {
          if (!checkoutUrl) return;
          window.location.assign(checkoutUrl);
        }}
        disabled={!checkoutUrl}
        className={buttonClass}
      >
        Buy Now — Get Instant Access
      </button>
    </div>
  );
}
