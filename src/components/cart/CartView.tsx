"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProductImageAlt } from "@/lib/seo/product-seo";
import { productDetailPath } from "@/lib/urls";
import { formatPrice, getDisplayPrices } from "@/lib/pricing";

export function CartView() {
  const { cartItems, removeFromCart, ready } = useCart();
  const subtotal = cartItems.reduce(
    (sum, product) => sum + getDisplayPrices(product).current,
    0
  );

  if (!ready) {
    return (
      <p className="text-center text-sm text-slate-500">Loading your cart…</p>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900/40">
        <p className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
          Your cart is empty
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Add notes from the store to get started.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ul className="space-y-4">
        {cartItems.map((product) => {
          const { current, original } = getDisplayPrices(product);
          const href = productDetailPath(product);
          const alt = getProductImageAlt(product);
          return (
            <li
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-900/60"
            >
              <Link
                href={href}
                className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 sm:h-24 sm:w-36 dark:border-slate-700 dark:bg-slate-900"
              >
                <Image
                  src={product.coverImage}
                  alt={alt}
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="144px"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={href}
                  className="font-semibold text-slate-900 hover:text-violet-600 dark:text-slate-100"
                >
                  {product.title}
                </Link>
                <p className="mt-2 font-display text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                  {formatPrice(current)}
                  {original != null && (
                    <span className="ml-2 text-sm font-normal text-slate-500 line-through">
                      {formatPrice(original)}
                    </span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(product.id)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-slate-700">
        <div className="flex justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <Link
          href="/checkout"
          className="inline-flex justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
