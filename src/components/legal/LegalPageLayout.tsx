import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  /** Show IST / Asia/Kolkata notice (legal & commerce pages). */
  showTimezoneNote?: boolean;
};

export function LegalPageLayout({
  title,
  description,
  children,
  showTimezoneNote = true,
}: Props) {
  return (
    <main className="border-b border-violet-200/40 bg-white dark:border-violet-900/30 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link
          href="/"
          className="inline-flex text-sm font-medium text-violet-600 transition hover:text-violet-700 hover:underline dark:text-violet-400"
        >
          ← Back to home
        </Link>

        <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{description}</p>
        ) : null}

        {showTimezoneNote ? (
          <aside
            className="mt-8 rounded-xl border border-violet-200/80 bg-violet-50/90 px-4 py-3 text-sm text-slate-700 dark:border-violet-800/60 dark:bg-violet-950/50 dark:text-slate-300"
            role="note"
          >
            <strong className="font-semibold text-slate-900 dark:text-slate-100">
              Timezone:
            </strong>{" "}
            All transactions and policies follow Indian Standard Time (IST),
            Asia/Kolkata.
          </aside>
        ) : null}

        <div className="mt-10 space-y-10 text-slate-700 dark:text-slate-300">
          {children}
        </div>
      </div>
    </main>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-24" id={id}>
      <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-violet-500">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
