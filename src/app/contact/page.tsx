import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact JobPrepNotes — support@jobprepnotes.com. We reply within 24–48 hours.",
};

export default function ContactPage() {
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
          Contact Us
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          We&apos;re here to help with orders, downloads, and general questions
          about JobPrepNotes.
        </p>

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

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
            Email
          </h2>
          <p className="mt-2 text-slate-700 dark:text-slate-300">
            Prefer email? Write to us at{" "}
            <a
              href="mailto:support@jobprepnotes.com"
              className="font-medium text-violet-600 hover:underline dark:text-violet-400"
            >
              support@jobprepnotes.com
            </a>
            .
          </p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Typical response time: <strong>within 24–48 hours</strong> on business
            days (IST).
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
            Send a message
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Fill in the form below. Your email app will open with a pre-filled
            message to our support address.
          </p>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
