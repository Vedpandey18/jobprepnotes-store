"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavbarCart } from "@/components/cart/NavbarCart";
import { JobPrepLogo } from "@/components/JobPrepLogo";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const isAdminPanel =
    pathname?.startsWith("/admin") && pathname !== "/admin/login";
  const [scrolled, setScrolled] = useState(false);
  const brandLinkHref = isAdminPanel ? "/admin/dashboard" : "/";
  const brandTextClass = isAdminPanel
    ? "font-display text-lg font-semibold tracking-tight text-white"
    : "font-display text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAdminPanel) {
    return (
      <header
        className={`sticky top-0 z-50 border-b border-violet-300/50 bg-gradient-to-r from-slate-950 via-violet-950 to-slate-950 text-white transition-shadow duration-300 dark:border-violet-800/60 ${
          scrolled ? "shadow-lg shadow-violet-950/40" : "shadow-none"
        }`}
      >
        <div className="flex h-16 w-full items-center justify-between gap-3 pl-3 pr-4 sm:h-[4.25rem] sm:pl-4 sm:pr-5 lg:pl-5 lg:pr-8">
          <Link
            href={brandLinkHref}
            className="group ml-2 flex min-w-0 shrink-0 items-center gap-2.5 sm:ml-3 lg:ml-10"
          >
            <JobPrepLogo
              className="h-9 w-9 shrink-0 transition group-hover:brightness-110"
              priority
            />
            <span className={brandTextClass}>
              JobPrepNotes
            </span>
            <span className="hidden rounded-full border border-violet-400/40 bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-100 sm:inline">
              Admin
            </span>
          </Link>

          <nav
            className="flex min-w-0 flex-1 items-center justify-end gap-0.5 sm:gap-1"
            aria-label="Admin"
          >
            <Link
              href="/"
              className="rounded-full px-2.5 py-2 text-xs font-medium text-violet-100/90 transition-colors hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
            >
              View storefront
            </Link>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hidden rounded-full px-2.5 py-2 text-xs font-medium text-violet-100/90 transition-colors hover:bg-white/10 hover:text-white sm:inline-block sm:px-4 sm:text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-violet-200/60 bg-white/90 backdrop-blur-xl transition-shadow duration-300 dark:border-violet-900/40 dark:bg-slate-950/90 ${
        scrolled
          ? "shadow-md shadow-slate-900/[0.06] dark:shadow-black/30"
          : "shadow-none"
      }`}
    >
      <div className="flex h-16 w-full items-center justify-between gap-3 pl-3 pr-4 sm:h-[4.25rem] sm:pl-4 sm:pr-5 lg:pl-5 lg:pr-8">
        <Link
          href={brandLinkHref}
          className="group ml-2 flex min-w-0 shrink-0 items-center gap-2.5 sm:ml-3 lg:ml-10"
        >
          <JobPrepLogo
            className="h-9 w-9 shrink-0 transition group-hover:brightness-110"
            priority
          />
          <span className={brandTextClass}>
            JobPrepNotes
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-2">
          <nav
            className="flex items-center gap-0.5 sm:gap-1"
            aria-label="Main"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-2.5 py-2 text-xs font-medium text-slate-600 transition-colors duration-200 hover:bg-violet-50 hover:text-violet-900 sm:px-4 sm:text-sm dark:text-slate-300 dark:hover:bg-violet-950/50 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <NavbarCart />
        </div>
      </div>
    </header>
  );
}
