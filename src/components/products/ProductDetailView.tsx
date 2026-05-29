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
    color: "bg-violet-100 text-violet-700",
  },
  {
    icon: "⚡",
    title: "Instant access",
    text: "Download immediately after secure checkout — no waiting.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: "🎯",
    title: "Interview-focused",
    text: "Topics mapped to real coding, technical, and HR round patterns.",
    color: "bg-emerald-100 text-emerald-700",
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
  const heroIntro =
    introText.length > 200 ? `${introText.slice(0, 197).trim()}…` : introText;

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-violet-50/60 to-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-violet-600">
              Home
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <Link href="/products" className="transition hover:text-violet-600">
              Products
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">{product.title}</span>
          </nav>

          {showDemoBanner && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              Demo catalog — connect a database and set{" "}
              <code className="rounded bg-amber-100 px-1">USE_DEMO_CATALOG=false</code>{" "}
              for production products.
            </div>
          )}

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
            <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md">
              {product.badge && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-violet-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
                  {product.badge}
                </span>
              )}
              <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white p-3 shadow-lg ring-1 ring-violet-50">
                <Image
                  src={product.coverImage}
                  alt={imageAlt}
                  width={640}
                  height={853}
                  className="h-auto w-full rounded-xl"
                  priority
                  unoptimized={product.coverImage.includes("blob.vercel-storage.com")}
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              </div>
            </div>

            <div>
              <p className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                {product.category}
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-slate-900 text-balance sm:text-4xl lg:text-[2.5rem]">
                {detailTitle}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                {heroIntro}
              </p>
              <a
                href="#purchase"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700"
              >
                See price & Buy Now
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-slate-100 bg-white py-6 sm:py-8">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${item.color}`}
                aria-hidden
              >
                {item.icon}
              </span>
              <div>
                <h2 className="font-display text-sm font-semibold text-slate-900 sm:text-base">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Long-form content */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
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
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white"
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700">{line}</span>
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
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <span className="inline-flex rounded-lg bg-violet-100 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest text-violet-700">
                      Step {item.step}
                    </span>
                    <h3 className="mt-2 font-display text-base font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      </section>

      <ProductDetailBottomBuy product={product} />

      <section className="border-t border-slate-100 bg-white pb-8 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700"
          >
            <span aria-hidden>←</span> Back to all products
          </Link>
        </div>
      </section>
    </main>
  );
}
