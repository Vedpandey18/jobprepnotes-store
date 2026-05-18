import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogContent } from "@/components/catalog/CatalogContent";
import { CatalogLoading } from "@/components/catalog/CatalogLoading";
import { SITE_SEO_KEYWORDS } from "@/lib/seo/site-keywords";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Interview Notes PDF Catalog",
  description:
    "Browse JobPrepNotes — Java, system design, Python interview notes and more.",
  keywords: [...SITE_SEO_KEYWORDS],
};

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-12">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Interview preparation PDF library
        </h1>
        <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-400">
          Hand-picked coding interview notes — add to cart or buy in one tap.
          Prices in INR.
        </p>
      </div>

      <Suspense fallback={<CatalogLoading />}>
        <CatalogContent />
      </Suspense>
    </section>
  );
}
