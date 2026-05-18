"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

type Props = { product: Product };

export function ProductDetailActions({ product }: Props) {
  const { addToCart, buyNow } = useCart();
  const router = useRouter();

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => {
          buyNow(product);
          router.push(`/checkout?product=${encodeURIComponent(product.id)}`);
        }}
        className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110"
      >
        Buy Now
      </button>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-violet-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
      >
        Add to Cart
      </button>
    </div>
  );
}
