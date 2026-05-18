"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Path only, e.g. `/blog/my-post` */
  path: string;
};

export function LinkedInShareButton({ path }: Props) {
  const [shareHref, setShareHref] = useState<string | null>(null);

  useEffect(() => {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    const url = `${window.location.origin}${normalized}`;
    setShareHref(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    );
  }, [path]);

  if (!shareHref) {
    return (
      <span className="inline-block h-9 w-[140px] rounded-lg bg-slate-100 dark:bg-slate-800" aria-hidden />
    );
  }

  return (
    <a
      href={shareHref}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-[#0a66c2]/40 bg-[#0a66c2]/10 px-4 py-2 text-sm font-semibold text-[#0a66c2] transition hover:bg-[#0a66c2]/15 dark:border-[#70b7ff]/40 dark:bg-[#0a66c2]/20 dark:text-[#93c5fd] dark:hover:bg-[#0a66c2]/30"
    >
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
      Share on LinkedIn
    </a>
  );
}
