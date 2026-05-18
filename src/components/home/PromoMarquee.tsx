export function PromoMarquee() {
  return (
    <div className="rounded-xl border border-violet-200/60 bg-white/70 px-4 py-2 text-center text-xs font-medium text-violet-800 shadow-sm dark:border-violet-800/60 dark:bg-violet-950/40 dark:text-violet-200">
      <span className="font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
        Member perks
      </span>
      <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
      Instant PDF + email delivery · Secure checkout · No subscription
    </div>
  );
}
