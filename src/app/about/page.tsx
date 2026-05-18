import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { AboutFaq } from "@/components/about/AboutFaq";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how JobPrepNotes helps developers prepare for interviews with structured PDF notes.",
};

const INTRO_BULLETS = [
  "AI-assisted research pipeline that converts scattered prep sources into concise revision notes.",
  "Signal-first curation across coding rounds, system design, and role-specific deep dives.",
  "Continuous updates based on interview trends, hiring signals, and learner feedback.",
];

const PROBLEM_POINTS = [
  "Interview prep content is noisy, repetitive, and spread across too many tabs",
  "Most candidates struggle to turn large resources into revision-friendly checklists",
  "Last-week prep requires high-signal summaries, not long-form theory",
];

const SOLUTION_POINTS = [
  "AI-guided synthesis that compresses broad topics into practical interview playbooks",
  "Human-reviewed structure so every chapter stays usable under time pressure",
  "Portable PDFs for quick revision on laptop, tablet, or phone",
];

const FEATURES = [
  {
    title: "Structured PDF notes",
    description:
      "Dense, skimmable sections you can revisit the night before a loop.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Coding & system design",
    description:
      "From patterns and DS&A to trade-offs and scalability—mapped to interview reality.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22 12l-4.75 5.25m-10.5 0L2 12l4.75-5.25m7.5 0l-1.5 1.5m-6 6l1.5 1.5" />
      </svg>
    ),
  },
  {
    title: "Stack-specific depth",
    description:
      "Go deeper on the tools and stacks interviewers actually ask about.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Built for busy schedules",
    description:
      "Short chapters and checklists so you progress even with limited time.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const TRUST_ITEMS = [
  "Instant PDF access",
  "Real interview questions",
  "One-time payment",
];

const AI_WORKFLOW = [
  { step: "01", title: "Collect", text: "We gather real interview patterns from role-specific sources and topic clusters." },
  { step: "02", title: "Synthesize", text: "AI condenses concepts into structured notes, examples, and rapid revision blocks." },
  { step: "03", title: "Refine", text: "We edit for clarity, remove fluff, and keep only interview-relevant material." },
  { step: "04", title: "Ship", text: "Final notes are packaged as clean PDFs optimized for fast reading and offline use." },
];

const HERO_HIGHLIGHTS = [
  { title: "Signal-first notes", text: "Only what interviewers ask — no fluff chapters." },
  { title: "Role-focused prep", text: "Pick a track and revise with confidence." },
  { title: "Fast to revise", text: "Skim-friendly structure built for busy schedules." },
];

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-4 text-sm leading-relaxed text-slate-600 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-400 sm:text-base">
      <span className="mt-0.5 text-emerald-600 dark:text-emerald-400" aria-hidden>
        ✔
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-violet-200/40 bg-slate-950 py-20 dark:border-violet-900/30">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_55%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-violet-200 transition hover:text-white hover:underline"
          >
            ← Back to home
          </Link>
          <p className="mx-auto mt-7 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-100 backdrop-blur">
            AI-native learning platform
          </p>
          <h1 className="mt-7 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-6xl">
            About{" "}
            <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-sky-200 bg-clip-text text-transparent">
              JobPrepNotes
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl font-medium leading-relaxed text-violet-100">
            AI-crafted interview prep for modern developers
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">
            JobPrepNotes combines AI synthesis with practical editing to turn
            scattered interview content into focused, revision-ready playbooks.
          </p>
          <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
            {HERO_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-left backdrop-blur-md"
              >
                <p className="font-display text-lg font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-200">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & what we provide */}
      <section className="border-b border-violet-200/40 bg-gradient-to-b from-violet-50 to-white py-12 dark:border-violet-900/30 dark:from-violet-950/40 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-violet-200/80 bg-white/90 p-7 shadow-lg shadow-violet-500/10 dark:border-violet-800/50 dark:bg-slate-900/80">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-300">
              What we provide
            </h2>
            <ul className="mt-5 grid gap-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:grid-cols-2 sm:text-base">
              <li className="flex gap-2 rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-900/60">
                <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
                  ✔
                </span>
                <span>
                  <strong className="text-slate-900 dark:text-slate-100">Structured notes</strong>{" "}
                  — dense, skimmable PDFs you can revise quickly before interviews.
                </span>
              </li>
              <li className="flex gap-2 rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-900/60">
                <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
                  ✔
                </span>
                <span>
                  <strong className="text-slate-900 dark:text-slate-100">Real interview questions</strong>{" "}
                  — patterns and prompts aligned with how technical rounds actually run.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-gray-50 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200/80 bg-white p-7 shadow-md transition-all duration-300 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-900/80">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl">
              Built with an AI-first workflow
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {INTRO_BULLETS.map((line) => (
                <Bullet key={line}>{line}</Bullet>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="relative bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-950/70 sm:p-8">
          <h2 className="text-center font-display text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            Why JobPrepNotes exists
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-200/60 bg-gradient-to-b from-rose-50/70 to-white p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-rose-900/40 dark:from-rose-950/20 dark:to-slate-900/80">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                The Problem
              </h3>
              <ul className="mt-4 space-y-3">
                {PROBLEM_POINTS.map((p) => (
                  <Bullet key={p}>{p}</Bullet>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-emerald-900/40 dark:from-emerald-950/20 dark:to-slate-900/80">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                Our Solution
              </h3>
              <ul className="mt-4 space-y-3">
                {SOLUTION_POINTS.map((p) => (
                  <Bullet key={p}>{p}</Bullet>
                ))}
              </ul>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="border-t border-violet-200/40 bg-gray-50 py-16 dark:border-violet-900/30 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-violet-200/70 bg-white/80 p-6 shadow-lg dark:border-violet-900/40 dark:bg-slate-950/60 sm:p-8">
          <h2 className="text-center font-display text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            What you get
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 dark:text-slate-400">
            Practical formats designed for interview pressure—not filler chapters.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <li
                key={f.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-900/70"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700 ring-4 ring-violet-100/60 dark:bg-violet-950/60 dark:text-violet-300 dark:ring-violet-900/40">
                  {f.icon}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-slate-900 dark:text-slate-100">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {f.description}
                </p>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>

      {/* AI workflow */}
      <section className="border-t border-violet-200/40 bg-white py-16 dark:border-violet-900/30 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-violet-200/70 bg-gradient-to-b from-violet-50/60 to-white p-6 shadow-lg dark:border-violet-900/40 dark:from-violet-950/20 dark:to-slate-950 sm:p-8">
          <h2 className="text-center font-display text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            How our AI workflow creates each guide
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 dark:text-slate-400">
            Fast to create, easy to trust, and optimized for interview week.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AI_WORKFLOW.map((item) => (
              <li
                key={item.step}
                className="relative rounded-2xl border border-violet-200/70 bg-gradient-to-b from-violet-50/70 to-white p-5 shadow-sm dark:border-violet-800/50 dark:from-violet-950/40 dark:to-slate-900"
              >
                <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-violet-400 animate-pulse" />
                <p className="font-mono text-xs font-semibold tracking-widest text-violet-600 dark:text-violet-300">
                  STEP {item.step}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>

      {/* Trust highlight */}
      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-violet-200/80 bg-gradient-to-r from-purple-50 via-violet-50 to-sky-50 p-7 shadow-md dark:border-violet-800/50 dark:from-violet-950/40 dark:via-violet-950/30 dark:to-slate-900">
            <h2 className="text-center font-display text-xl font-bold text-slate-900 dark:text-slate-100">
              Why developers use our notes
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {TRUST_ITEMS.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-xl bg-white/80 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm dark:bg-slate-900/60 dark:text-slate-100"
                >
                  <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
                    ✔
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AboutFaq />

      {/* CTA */}
      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl rounded-2xl border border-violet-200/80 bg-gradient-to-b from-violet-50/90 via-white to-sky-50/80 p-8 text-center shadow-md shadow-violet-500/10 transition-all duration-300 hover:shadow-xl dark:border-violet-800/50 dark:from-violet-950/40 dark:via-slate-900/90 dark:to-slate-900/90">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
              Start your AI-powered interview prep today
            </h2>
            <Link
              href="/products"
              className="btn-primary mt-8 inline-flex px-10 py-4 text-base"
            >
              🔥 Get Instant Access
            </Link>
            <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/products" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
                Browse products
              </Link>{" "}
              →
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
