const FAQS = [
  {
    q: "How will I receive ebook?",
    a: "After payment you get instant download access, and we email your receipt with links so you can download again anytime.",
  },
  {
    q: "Is it beginner friendly?",
    a: "Yes. Notes are organized so you can start from fundamentals and go deeper on the topics your interviews emphasize.",
  },
  {
    q: "Do I get lifetime access?",
    a: "Purchases are one-time: you keep access to the PDFs you buy, with no subscription.",
  },
  {
    q: "Are prices final?",
    a: "Yes. The price you see is what you pay at checkout — no surprise fees on top.",
  },
  {
    q: "Can I download anytime?",
    a: "Yes. Save the PDFs on your devices and re-download from your email links when needed.",
  },
];

export function AboutFaq() {
  return (
    <section
      className="border-b border-violet-200/50 bg-gray-50 py-16 dark:border-violet-900/40 dark:bg-slate-900/40"
      aria-labelledby="about-faq-heading"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="about-faq-heading"
          className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        >
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-slate-600 dark:text-slate-400">
          Quick answers before you explore the catalog.
        </p>
        <div className="mt-10 space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-violet-200/70 bg-white px-5 py-1 shadow-md transition-all duration-300 hover:shadow-xl dark:border-violet-800/60 dark:bg-slate-900/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 font-display text-base font-semibold text-slate-900 transition group-open:text-violet-700 dark:text-slate-100 dark:group-open:text-violet-300 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 transition duration-300 group-open:rotate-180 dark:bg-violet-950/50 dark:text-violet-400"
                  aria-hidden
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>
              <p className="border-t border-slate-100 pb-4 pt-1 text-sm leading-relaxed text-slate-600 dark:border-slate-700/80 dark:text-slate-400">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
