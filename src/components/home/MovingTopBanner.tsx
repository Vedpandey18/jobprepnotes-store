import Link from "next/link";

const MARQUEE_ITEMS = [
  { icon: "🔥", label: "Limited-time launch pricing — grab your notes today" },
  { icon: "⚡", label: "Instant PDF download right after payment" },
  { icon: "📚", label: "Java · Data Engineer · Full Stack · HTML/CSS/JS" },
  { icon: "✅", label: "100% secure checkout — no subscription ever" },
  { icon: "🎯", label: "Coding rounds + system design — all in one kit" },
  { icon: "💜", label: "Trusted by job seekers across India" },
];

function MarqueeTrack({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={ariaHidden}
    >
      {MARQUEE_ITEMS.map((item) => (
        <span
          key={`${item.label}-${ariaHidden ? "dup" : "orig"}`}
          className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-white sm:text-[15px]"
        >
          <span className="text-lg" aria-hidden>
            {item.icon}
          </span>
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function MovingTopBanner() {
  return (
    <div
      className="sticky top-14 z-40 w-full border-b border-violet-400/40 bg-gradient-to-r from-violet-700 via-purple-600 to-violet-700 shadow-lg shadow-violet-900/25 sm:top-16"
      role="region"
      aria-label="Promotional announcements"
    >
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.18)_45%,transparent_90%)] animate-shimmer-banner"
          aria-hidden
        />

        <div className="relative flex min-h-[3rem] items-stretch sm:min-h-[3.25rem]">
          <div className="relative z-10 flex shrink-0 items-center gap-2 border-r border-white/20 bg-violet-950/50 px-3 py-2 sm:px-5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">
              Live
            </span>
            <span className="rounded-md bg-amber-400 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-900 shadow-sm">
              Offer
            </span>
          </div>

          <div className="marquee-mask relative min-w-0 flex-1 overflow-hidden py-3">
            <div className="flex w-max animate-marquee-scroll">
              <MarqueeTrack />
              <MarqueeTrack ariaHidden />
            </div>
          </div>

          <Link
            href="/products"
            className="relative z-10 flex shrink-0 items-center gap-1.5 self-stretch border-l border-white/20 bg-white/15 px-4 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/25 sm:px-5 sm:text-sm"
          >
            Shop now
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
