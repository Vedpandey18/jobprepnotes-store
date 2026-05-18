import Image from "next/image";
import Link from "next/link";
import { ProductDetailActions } from "@/components/ProductDetailActions";
import {
  getProductDetailTitle,
  getProductImageAlt,
  getWhatYouWillLearnBullets,
} from "@/lib/seo/product-seo";
import { formatPrice, getDisplayPrices } from "@/lib/pricing";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  showDemoBanner?: boolean;
};

export function ProductDetailView({ product, showDemoBanner }: Props) {
  const { current, original } = getDisplayPrices(product);
  const hasDiscount = original !== undefined;
  const learn = getWhatYouWillLearnBullets(product);
  const imageAlt = getProductImageAlt(product);
  const detailTitle = getProductDetailTitle(product);
  const fullDescription = product.description?.trim() || product.shortDescription;
  const showExpandableDescription = fullDescription.length > 220;
  const previewDescription = showExpandableDescription
    ? `${fullDescription.slice(0, 220).trim()}...`
    : fullDescription;

  return (
    <main className="relative pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-violet-500/10 to-transparent dark:from-violet-500/5" />
      <div className="relative mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="transition hover:text-violet-600">
            Home
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/products" className="transition hover:text-violet-600">
            Products
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 dark:text-slate-100">{product.title}</span>
        </nav>

        {showDemoBanner && (
          <div className="mt-6 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100/90">
            Demo catalog — connect a database and set{" "}
            <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/50">
              USE_DEMO_CATALOG=false
            </code>{" "}
            for production products.
          </div>
        )}

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-lg dark:border-slate-700/80 dark:bg-slate-900">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[360px] bg-slate-100 p-3 dark:bg-slate-800">
              <Image
                src={product.coverImage}
                alt={imageAlt}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              {product.category}
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 text-balance dark:text-slate-100 sm:text-4xl">
              {detailTitle}
            </h1>
            {showExpandableDescription ? (
              <details className="mt-4 group">
                <p className="text-lg leading-relaxed text-slate-600 group-open:hidden dark:text-slate-400">
                  {previewDescription}
                </p>
                <p className="hidden text-lg leading-relaxed text-slate-600 group-open:block dark:text-slate-400">
                  {fullDescription}
                </p>
                <summary className="mt-2 list-none cursor-pointer text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400">
                  <span className="group-open:hidden">See more</span>
                  <span className="hidden group-open:inline">Show less</span>
                </summary>
              </details>
            ) : (
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {fullDescription}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-3xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                {formatPrice(current)}
              </span>
              {hasDiscount && original != null && (
                <span className="text-lg tabular-nums text-slate-500 line-through">
                  {formatPrice(original)}
                </span>
              )}
              {hasDiscount && product.discountPercent != null && (
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  Save {product.discountPercent}%
                </span>
              )}
            </div>

            <ProductDetailActions product={product} />

            <div className="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
              <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                What you will learn
              </h2>
              <ul className="mt-3 space-y-2.5">
                {learn.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
                      ✓
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700 dark:text-violet-400"
            >
              <span aria-hidden>←</span> Back to all products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
