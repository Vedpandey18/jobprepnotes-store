import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CountdownSaleBanner } from "@/components/home/CountdownSaleBanner";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
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
    <section className="border-b border-violet-200/50 bg-slate-50 py-12 dark:border-violet-900/40 dark:bg-slate-900/50 sm:py-16">
      <div className="mx-auto max-w-6xl animate-pulse px-4 sm:px-6 lg:px-8">
        <div className="mx-auto h-10 max-w-md rounded-lg bg-violet-100 dark:bg-violet-900/40" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-96 rounded-2xl bg-violet-100/80 dark:bg-violet-950/40"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <section className="relative flex min-h-[calc(100svh-7.5rem)] w-full flex-col overflow-hidden border-b border-slate-200/50 dark:border-slate-800/60 sm:min-h-[calc(100svh-7.25rem)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-50/95 via-white to-violet-50/35 dark:from-slate-950 dark:via-slate-950 dark:to-violet-950/35" />

        <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pb-12 pt-10 sm:px-6 lg:px-10 lg:pb-16 lg:pt-14">
          <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-x-12">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-violet-200/90 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-violet-800 shadow-sm backdrop-blur dark:border-violet-500/40 dark:bg-violet-950/55 dark:text-violet-200">
                Interview preparation
              </p>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 text-balance dark:text-slate-100 sm:text-5xl sm:leading-[1.08] lg:text-6xl">
                Study-ready interview preparation kit,{" "}
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-500 bg-clip-text text-transparent dark:from-violet-300 dark:via-purple-300 dark:to-violet-200">
                  for every role
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 text-balance dark:text-slate-400 sm:text-xl sm:leading-[1.65]">
                Condensed PDF notes for coding rounds, system design, and
                stack-specific interviews — structured references you can use
                from day one.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
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
              <ul className="mt-10 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
                {TRUST_BADGES.map((label) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400"
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs text-emerald-600 dark:text-emerald-400"
                      aria-hidden
                    >
                      ✔
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:justify-self-end">
              <div className="relative overflow-hidden rounded-[1.85rem] border border-violet-200/70 bg-gradient-to-br from-violet-100/95 via-purple-50/90 to-violet-50/70 p-6 shadow-2xl ring-1 ring-violet-300/40 dark:border-violet-800/60 dark:from-violet-950/90 dark:via-purple-950/70 dark:to-slate-900/80 dark:ring-violet-500/20 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
                  Curated prep library
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-slate-900 dark:text-slate-100 sm:text-2xl sm:leading-tight">
                  Ace your interviews with confidence
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Pick notes matched to your profile — from core software
                  engineering to data, cloud, and modern frontend stacks.
                </p>
                <LibraryToolIconGrid />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-b border-violet-200/40 bg-white py-8 dark:border-violet-900/30 dark:bg-slate-950 sm:py-10"
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
    </main>
  );
}
