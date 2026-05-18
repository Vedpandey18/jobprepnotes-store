import Link from "next/link";

const LINKS = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund", label: "Refunds" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

export function CheckoutLegalLinks() {
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 border-t border-slate-200/80 pt-6 text-center text-xs text-slate-500 dark:border-slate-700/80 dark:text-slate-400"
      aria-label="Legal policies"
    >
      {LINKS.map((l, i) => (
        <span key={l.href} className="inline-flex items-center">
          {i > 0 && (
            <span className="mx-2 text-slate-300 dark:text-slate-600" aria-hidden>
              |
            </span>
          )}
          <Link
            href={l.href}
            className="font-medium text-slate-600 underline-offset-4 transition hover:text-violet-600 hover:underline dark:text-slate-400 dark:hover:text-violet-400"
          >
            {l.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
