"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getProductImageAlt } from "@/lib/seo/product-seo";
import { productDetailPath } from "@/lib/urls";
import type { Product } from "@/types/product";
import { formatPrice, getDisplayPrices } from "@/lib/pricing";

type Props = { product: Product };

export function FeaturedProductCard({ product }: Props) {
  const { addToCart, buyNow } = useCart();
  const router = useRouter();
  const { current, original } = getDisplayPrices(product);
  const hasDiscount = original !== undefined;
  const badge = product.badge ?? "Featured";
  const href = productDetailPath(product);
  const coverAlt = getProductImageAlt(product);

  const handleBuyNow = () => {
    buyNow(product);
    router.push(`/checkout?product=${encodeURIComponent(product.id)}`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-violet-200/80 bg-white/95 shadow-md shadow-violet-500/10 ring-1 ring-violet-100/80 transition-all duration-300 hover:scale-[1.02] hover:border-violet-300/90 hover:shadow-xl dark:border-violet-800/60 dark:bg-slate-900/70 dark:ring-violet-900/40">
      <div className="relative">
        <Link
          href={href}
          className="relative block aspect-[3/4] overflow-hidden bg-violet-100/80 p-2 dark:bg-slate-800"
        >
          <Image
            src={product.coverImage}
            alt={coverAlt}
            fill
            className="object-contain transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm ${
            badge.toLowerCase().includes("limited")
              ? "bg-amber-400 text-amber-950"
              : "bg-violet-600 text-white"
          }`}
        >
          {badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
          {product.category}
        </p>
        <Link
          href={href}
          className="mt-1.5 font-display text-lg font-semibold leading-snug text-slate-900 transition duration-200 group-hover:text-violet-700 dark:text-slate-100 dark:group-hover:text-violet-300"
        >
          {product.title}
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="font-display text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
            {formatPrice(current)}
          </span>
          {hasDiscount && original != null && (
            <span className="text-sm tabular-nums text-slate-500 line-through">
              {formatPrice(original)}
            </span>
          )}
        </div>

        <div className="mt-5 flex w-full flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={handleBuyNow}
            className="inline-flex w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 sm:w-auto"
          >
            Buy Now
          </button>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="inline-flex w-full flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-violet-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 sm:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
