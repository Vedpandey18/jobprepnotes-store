import Link from "next/link";

const MARQUEE_ITEMS = [
  { icon: "🔥", label: "Limited-time launch pricing" },
  { icon: "⚡", label: "Instant PDF download after payment" },
  { icon: "📚", label: "Java · Data Engineer · Full Stack notes" },
  { icon: "✅", label: "Secure checkout — no subscription" },
  { icon: "🎯", label: "Structured for coding & system design rounds" },
  { icon: "💜", label: "Trusted by job seekers across India" },
];

function MarqueeTrack({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="marquee-track flex shrink-0 items-center gap-8 pr-8"
      aria-hidden={ariaHidden}
    >
      {MARQUEE_ITEMS.map((item) => (
        <span
          key={`${item.label}-${ariaHidden ? "dup" : "orig"}`}
          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-medium text-white/95"
        >
          <span className="text-base" aria-hidden>
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
      className="relative overflow-hidden border-b border-violet-500/30 bg-gradient-to-r from-violet-800 via-purple-700 to-violet-800 shadow-md shadow-violet-900/20"
      role="region"
      aria-label="Promotional announcements"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.12)_45%,transparent_90%)] animate-shimmer-banner"
        aria-hidden
      />

      <div className="relative flex items-stretch">
        <div className="relative z-10 flex shrink-0 items-center gap-2 border-r border-white/15 bg-violet-950/40 px-3 py-2.5 sm:px-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300 sm:inline">
            Live
          </span>
          <span className="rounded-md bg-amber-400/95 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-900">
            Offer
          </span>
        </div>

        <div className="marquee-mask relative min-w-0 flex-1 py-2.5">
          <div className="flex w-max animate-marquee-scroll">
            <MarqueeTrack />
            <MarqueeTrack ariaHidden />
          </div>
        </div>

        <Link
          href="/products"
          className="relative z-10 flex shrink-0 items-center gap-1 self-center border-l border-white/15 bg-white/10 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-white/20 sm:gap-1.5 sm:px-4 sm:text-xs"
        >
          Shop
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
