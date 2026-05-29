import Link from "next/link";
import { JobPrepLogo } from "@/components/JobPrepLogo";

const shopLinks = [
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
];

const legalLinks = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="border-t border-violet-200/70 bg-gradient-to-b from-violet-50/50 via-white to-slate-50/80">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <JobPrepLogo className="h-10 w-10" />
              <span className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                JobPrepNotes
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Interview prep PDF notes for coding, system design, and
              stack-specific rounds — instant delivery after checkout.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Explore
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-medium text-slate-700 transition hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav
          className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-2 border-t border-slate-200/80 pt-8 text-center text-sm text-slate-500 dark:border-slate-800"
          aria-label="Legal"
        >
          {legalLinks.map((l, i) => (
            <span key={l.href} className="inline-flex items-center">
              {i > 0 && (
                <span
                  className="mx-2 text-slate-300 dark:text-slate-600 sm:mx-3"
                  aria-hidden
                >
                  |
                </span>
              )}
              <Link
                href={l.href}
                className="transition hover:text-violet-600 hover:underline dark:hover:text-violet-400"
              >
                {l.label}
              </Link>
            </span>
          ))}
        </nav>

        <p className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} JobPrepNotes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
