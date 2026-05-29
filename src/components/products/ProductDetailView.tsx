import Image from "next/image";
import Link from "next/link";
import { ProductDescriptionContent } from "@/components/products/ProductDescriptionContent";
import { ProductDetailBottomBuy } from "@/components/products/ProductDetailBottomBuy";
import {
  getProductDetailTitle,
  getProductImageAlt,
  getWhatYouWillLearnBullets,
} from "@/lib/seo/product-seo";
import { parseProductDescription } from "@/lib/format-product-description";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  showDemoBanner?: boolean;
};

const HIGHLIGHTS = [
  {
    icon: "📄",
    title: "Complete PDF notes",
    text: "Structured chapters you can search, highlight, and revise offline.",
    color: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300",
  },
  {
    icon: "⚡",
    title: "Instant access",
    text: "Download immediately after secure checkout — no waiting.",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  },
  {
    icon: "🎯",
    title: "Interview-focused",
    text: "Topics mapped to real coding, technical, and HR round patterns.",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  },
];

const STEPS = [
  { step: "01", title: "Choose your kit", text: "Pick the notes that match your target role." },
  { step: "02", title: "Secure checkout", text: "Pay safely via SuperProfile — UPI, card, and more." },
  { step: "03", title: "Download & prepare", text: "Get your PDF instantly and start revising today." },
];

export function ProductDetailView({ product, showDemoBanner }: Props) {
  const learn = getWhatYouWillLearnBullets(product);
  const imageAlt = getProductImageAlt(product);
  const detailTitle = getProductDetailTitle(product);
  const hasStructuredContent = parseProductDescription(product.description).some(
    (b) => b.type === "heading"
  );
  const introText =
    product.shortDescription.trim() ||
    product.description.split("\n\n")[0]?.trim() ||
    product.description.slice(0, 280);

  return (
    <main className="relative pb-12 lg:pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-violet-100/80 via-violet-50/40 to-transparent dark:from-violet-950/40 dark:via-slate-950 dark:to-transparent" />

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
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

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              {product.badge && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-violet-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">
                  {product.badge}
                </span>
              )}
              <div className="overflow-hidden rounded-[1.85rem] border border-violet-200/70 bg-white p-4 shadow-2xl shadow-violet-500/10 ring-1 ring-violet-100 dark:border-violet-800/50 dark:bg-slate-900 dark:ring-violet-900/40">
                <div className="relative aspect-[3/4] w-full bg-slate-50 dark:bg-slate-800">
                  <Image
                    src={product.coverImage}
                    alt={imageAlt}
                    fill
                    className="object-contain"
                    priority
                    unoptimized={product.coverImage.includes("blob.vercel-storage.com")}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </div>

            <div className="lg:pt-2">
              <p className="inline-flex items-center rounded-full border border-violet-200/80 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:border-violet-800/60 dark:bg-violet-950/50 dark:text-violet-300">
                {product.category}
              </p>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-slate-900 text-balance dark:text-slate-100 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                {detailTitle}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {introText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="relative mt-12 bg-white py-12 dark:bg-slate-950 sm:mt-14">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${item.color}`}
                aria-hidden
              >
                {item.icon}
              </span>
              <div>
                <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Long-form content */}
      <section className="relative mt-14 sm:mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl lg:mx-auto">
            <div className="min-w-0 space-y-10">
              {hasStructuredContent ? (
                <ProductDescriptionContent description={product.description} />
              ) : (
                <section className="product-content-section">
                  <div className="product-content-section-header">
                    <span className="product-content-section-dot" aria-hidden />
                    <h2 className="product-content-section-title">About this product</h2>
                  </div>
                  <div className="product-content-section-body">
                    <ProductDescriptionContent
                      description={product.description}
                      excludeSections={[]}
                    />
                  </div>
                </section>
              )}

              <section className="product-content-section">
                <div className="product-content-section-header">
                  <span className="product-content-section-dot" aria-hidden />
                  <h2 className="product-content-section-title">What you will learn</h2>
                </div>
                <div className="product-content-section-body">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {learn.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/80"
                      >
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white"
                          aria-hidden
                        >
                          ✓
                        </span>
                        <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="product-content-section">
                <div className="product-content-section-header">
                  <span className="product-content-section-dot" aria-hidden />
                  <h2 className="product-content-section-title">How it works</h2>
                </div>
                <div className="product-content-section-body">
                  <ol className="grid gap-4 sm:grid-cols-3">
                    {STEPS.map((item) => (
                      <li
                        key={item.step}
                        className="relative rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/80"
                      >
                        <span className="inline-flex rounded-lg bg-violet-100 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                          Step {item.step}
                        </span>
                        <h3 className="mt-2 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {item.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <ProductDetailBottomBuy product={product} />

      <section className="pb-12 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
          >
            <span aria-hidden>←</span> Back to all products
          </Link>
        </div>
      </section>
    </main>
  );
}
