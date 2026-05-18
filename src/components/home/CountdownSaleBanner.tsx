"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const INITIAL_SECONDS = 12 * 3600 + 49 * 60 + 5;

function formatHMS(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [
    h.toString().padStart(2, "0"),
    m.toString().padStart(2, "0"),
    s.toString().padStart(2, "0"),
  ].join(":");
}

export function CountdownSaleBanner() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? INITIAL_SECONDS : prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-violet-500/40 bg-gradient-to-r from-[#4c1d95] via-[#5b21b6] to-[#4c1d95] shadow-xl shadow-violet-900/30 ring-1 ring-white/10">
      <div className="grid grid-cols-1 items-center gap-4 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:justify-self-start">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-amber-300 ring-1 ring-white/20">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <div className="min-w-0 text-left">
            <p className="text-base font-extrabold leading-snug tracking-tight text-amber-300 sm:text-lg">
              ⏳ 24 HOURS LEFT – Limited Time Offer
            </p>
            <p className="mt-1 text-[11px] font-medium text-violet-200/90">
              Launch pricing ends when the timer hits zero
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center justify-self-center text-center">
          <p
            className="font-mono text-3xl font-bold tabular-nums tracking-widest text-white sm:text-4xl"
            suppressHydrationWarning
          >
            {formatHMS(secondsLeft)}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200/80">
            24 hrs left
          </p>
        </div>

        <div className="flex justify-center sm:justify-end">
          <Link
            href="/products"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-amber-900/20 transition hover:bg-amber-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
