"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductImageAlt } from "@/lib/seo/product-seo";
import { productDetailPath } from "@/lib/urls";
import type { Product } from "@/types/product";
import { formatPrice, getDisplayPrices } from "@/lib/pricing";
import { getCheckoutUrlForProduct } from "@/lib/client-payment-link";

export function ProductCard({ product }: { product: Product }) {
  const { current, original } = getDisplayPrices(product);
  const hasDiscount = original !== undefined;
  const href = productDetailPath(product);
  const coverAlt = getProductImageAlt(product);
  const checkoutUrl = getCheckoutUrlForProduct(product);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-md transition-all hover:border-violet-200 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-900/70">
      <div className="relative">
        <Link
          href={href}
          className="relative block aspect-[3/4] overflow-hidden bg-slate-100 p-2 dark:bg-slate-800"
        >
          <Image
            src={product.coverImage}
            alt={coverAlt}
            fill
            className="object-contain transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-violet-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
          {product.category}
        </p>
        <Link
          href={href}
          className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-slate-100"
        >
          {product.title}
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
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
        <div className="mt-5">
          <button
            type="button"
            onClick={() => {
              if (!checkoutUrl) return;
              window.location.assign(checkoutUrl);
            }}
            disabled={!checkoutUrl}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
