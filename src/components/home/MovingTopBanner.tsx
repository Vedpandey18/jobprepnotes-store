import Link from "next/link";

const MARQUEE_ITEMS = [
  { icon: "🔥", label: "Limited-time launch pricing — grab your notes today" },
  { icon: "⚡", label: "Instant PDF download right after payment" },
  { icon: "📚", label: "Java · Data Engineer · Full Stack · HTML/CSS/JS" },
  { icon: "✅", label: "100% secure checkout — no subscription ever" },
  { icon: "🎯", label: "Coding rounds + system design — all in one kit" },
  { icon: "💜", label: "Trusted by job seekers across India" },
];

const MARQUEE_ITEMS_MOBILE = [
  { icon: "🔥", label: "Limited-time launch pricing" },
  { icon: "⚡", label: "Instant PDF download" },
  { icon: "📚", label: "Java · Data · Full Stack notes" },
  { icon: "✅", label: "Secure checkout · No subscription" },
  { icon: "🎯", label: "Coding + system design prep" },
];

function MarqueeTrack({
  items,
  ariaHidden,
  compact = false,
}: {
  items: typeof MARQUEE_ITEMS;
  ariaHidden?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 items-center ${compact ? "gap-6 pr-6" : "gap-10 pr-10"}`}
      aria-hidden={ariaHidden}
    >
      {items.map((item) => (
        <span
          key={`${item.label}-${ariaHidden ? "dup" : "orig"}`}
          className={`inline-flex shrink-0 items-center whitespace-nowrap font-semibold text-white ${
            compact ? "gap-2 text-xs" : "gap-2.5 text-sm sm:text-[15px]"
          }`}
        >
          <span className={compact ? "text-sm" : "text-lg"} aria-hidden>
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
      className="relative z-40 w-full overflow-hidden border-b border-violet-400/40 bg-gradient-to-r from-violet-700 via-purple-600 to-violet-700 shadow-lg shadow-violet-900/25 sm:sticky sm:top-16"
      role="region"
      aria-label="Promotional announcements"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.18)_45%,transparent_90%)] animate-shimmer-banner"
        aria-hidden
      />

      {/* Mobile: compact bar + full-width marquee */}
      <div className="relative sm:hidden">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-violet-950/40 px-3 py-1.5">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="rounded bg-amber-400 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-slate-900">
              Offer
            </span>
            <span className="truncate text-[10px] font-medium text-violet-100/90">
              Launch pricing live now
            </span>
          </div>
          <Link
            href="/products"
            className="shrink-0 rounded-md bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
          >
            Shop →
          </Link>
        </div>

        <div className="overflow-hidden py-2 [contain:layout]">
          <div className="flex w-max max-w-none animate-marquee-scroll-mobile">
            <MarqueeTrack items={MARQUEE_ITEMS_MOBILE} compact />
            <MarqueeTrack items={MARQUEE_ITEMS_MOBILE} compact ariaHidden />
          </div>
        </div>
      </div>

      {/* Desktop: three-column layout */}
      <div className="relative hidden min-h-[3.25rem] items-stretch sm:flex">
        <div className="relative z-10 flex shrink-0 items-center gap-2 border-r border-white/20 bg-violet-950/50 px-5 py-2">
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

        <div className="marquee-mask relative min-w-0 flex-1 overflow-hidden py-3 [contain:layout]">
          <div className="flex w-max max-w-none animate-marquee-scroll">
            <MarqueeTrack items={MARQUEE_ITEMS} />
            <MarqueeTrack items={MARQUEE_ITEMS} ariaHidden />
          </div>
        </div>

        <Link
          href="/products"
          className="relative z-10 flex shrink-0 items-center gap-1.5 self-stretch border-l border-white/20 bg-white/15 px-5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/25"
        >
          Shop now
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
