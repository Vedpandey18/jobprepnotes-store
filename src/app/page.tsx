import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CountdownSaleBanner } from "@/components/home/CountdownSaleBanner";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { HomeBlogSection } from "@/components/home/HomeBlogSection";
import { LibraryToolIconGrid } from "@/components/home/LibraryToolIcons";
import { PromoMarquee } from "@/components/home/PromoMarquee";
import { SITE_SEO_KEYWORDS } from "@/lib/seo/site-keywords";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "JobPrepNotes — Interview Prep PDFs & Coding Notes",
  },
  description:
    "Structured interview preparation PDF library: Java interview notes PDF, system design interview notes, coding interview notes, and backend prep — download after checkout.",
  keywords: [...SITE_SEO_KEYWORDS],
};

const TRUST_BADGES = [
  "Secure payment",
  "Instant download",
  "No subscription",
];

function FeaturedFallback() {
  return (
    <section className="border-b border-violet-200/50 bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl animate-pulse px-4 sm:px-6 lg:px-8">
        <div className="mx-auto h-10 max-w-md rounded-lg bg-violet-100" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-violet-100/80" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-200/60 bg-gradient-to-b from-violet-50 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14 lg:px-8 lg:py-14">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-violet-800">
              Interview preparation
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-slate-900 text-balance sm:mt-5 sm:text-4xl lg:text-6xl lg:leading-[1.08]">
              Study-ready interview preparation kit,{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-500 bg-clip-text text-transparent">
                for every role
              </span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-700 text-balance sm:text-lg">
              Condensed PDF notes for coding rounds, system design, and
              stack-specific interviews — structured references you can use from
              day one.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/products"
                className="btn-primary w-full px-8 py-4 text-center sm:w-auto"
              >
                🔥 Get instant access now
              </Link>
              <Link
                href="/blog"
                className="btn-secondary w-full px-8 py-4 text-center sm:w-auto"
              >
                Read the blog
              </Link>
            </div>
            <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
              {TRUST_BADGES.map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50/80 p-4 lg:hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                Curated prep library
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Java · Python · Data · Cloud · React & more
              </p>
              <LibraryToolIconGrid />
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-lg lg:mx-0 lg:block lg:max-w-none">
            <div className="overflow-hidden rounded-[1.85rem] border border-violet-200 bg-gradient-to-br from-violet-100 via-purple-50 to-white p-6 shadow-xl ring-1 ring-violet-100 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                Curated prep library
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-slate-900 sm:text-2xl">
                Ace your interviews with confidence
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Pick notes matched to your profile — from core software
                engineering to data, cloud, and modern frontend stacks.
              </p>
              <LibraryToolIconGrid />
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-b border-violet-200/40 bg-white py-6 sm:py-10"
        aria-label="Limited time offer"
      >
        <div className="mx-auto max-w-6xl space-y-4 px-4 sm:px-6 lg:px-8">
          <CountdownSaleBanner />
          <PromoMarquee />
        </div>
      </section>

      <Suspense fallback={<FeaturedFallback />}>
        <FeaturedProductsSection />
      </Suspense>

      <Suspense fallback={null}>
        <HomeBlogSection />
      </Suspense>
    </main>
  );
}
