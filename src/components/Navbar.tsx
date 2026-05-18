"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { NavbarCart } from "@/components/cart/NavbarCart";
import { JobPrepLogo } from "@/components/JobPrepLogo";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
];

function navLinkClass(active: boolean, variant: "storefront" | "admin") {
  if (variant === "admin") {
    return `block rounded-lg px-4 py-3 text-sm font-medium transition-colors sm:rounded-full sm:px-4 sm:py-2 ${
      active
        ? "bg-white/15 text-white"
        : "text-violet-100/90 hover:bg-white/10 hover:text-white"
    }`;
  }
  return `block rounded-lg px-4 py-3 text-sm font-medium transition-colors sm:rounded-full sm:px-4 sm:py-2 ${
    active
      ? "bg-violet-100 text-violet-900 dark:bg-violet-950/60 dark:text-white"
      : "text-slate-600 hover:bg-violet-50 hover:text-violet-900 dark:text-slate-300 dark:hover:bg-violet-950/50 dark:hover:text-white"
  }`;
}

export function Navbar() {
  const pathname = usePathname();
  const isAdminPanel =
    pathname?.startsWith("/admin") && pathname !== "/admin/login";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const brand = (
    <Link
      href={brandLinkHref}
      className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5"
      onClick={() => setMobileOpen(false)}
    >
      <JobPrepLogo
        className="h-8 w-8 shrink-0 transition group-hover:brightness-110 sm:h-9 sm:w-9"
        priority
      />
      <span className={`truncate ${brandTextClass}`}>JobPrepNotes</span>
      {isAdminPanel && (
        <span className="hidden rounded-full border border-violet-400/40 bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-100 sm:inline">
          Admin
        </span>
      )}
    </Link>
  );

  const renderNavLinks = (variant: "storefront" | "admin", mobile = false) =>
    navLinks.map((item) => {
      const active =
        pathname === item.href ||
        (item.href !== "/" && pathname?.startsWith(item.href));
      return (
        <Link
          key={item.href}
          href={item.href}
          className={navLinkClass(!!active, variant)}
          onClick={() => setMobileOpen(false)}
        >
          {item.label}
        </Link>
      );
    });

  if (isAdminPanel) {
    return (
      <header
        className={`sticky top-0 z-50 border-b border-violet-300/50 bg-gradient-to-r from-slate-950 via-violet-950 to-slate-950 text-white transition-shadow duration-300 dark:border-violet-800/60 ${
          scrolled ? "shadow-lg shadow-violet-950/40" : "shadow-none"
        }`}
      >
        <div className="mx-auto max-w-[100vw]">
          <div className="flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:px-4 lg:px-8">
            {brand}
            <div className="flex items-center gap-1 sm:gap-2">
              <nav
                className="hidden items-center gap-0.5 md:flex md:gap-1"
                aria-label="Admin"
              >
                <Link
                  href="/"
                  className="rounded-full px-3 py-2 text-xs font-medium text-violet-100/90 transition-colors hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
                >
                  View storefront
                </Link>
                {renderNavLinks("admin")}
              </nav>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-violet-100 transition-colors hover:bg-white/10 md:hidden"
                aria-expanded={mobileOpen}
                aria-controls="admin-mobile-nav"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((o) => !o)}
              >
                {mobileOpen ? (
                  <HiXMark className="h-6 w-6" aria-hidden />
                ) : (
                  <HiBars3 className="h-6 w-6" aria-hidden />
                )}
              </button>
            </div>
          </div>
          {mobileOpen && (
            <nav
              id="admin-mobile-nav"
              className="border-t border-violet-400/30 px-3 py-3 md:hidden"
              aria-label="Admin mobile"
            >
              <div className="flex flex-col gap-1">
                <Link
                  href="/"
                  className={navLinkClass(false, "admin")}
                  onClick={() => setMobileOpen(false)}
                >
                  View storefront
                </Link>
                {renderNavLinks("admin", true)}
              </div>
            </nav>
          )}
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
      <div className="mx-auto max-w-[100vw]">
        <div className="flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:px-4 lg:px-8">
          {brand}
          <div className="flex items-center gap-0.5 sm:gap-2">
            <nav
              className="hidden items-center gap-0.5 md:flex md:gap-1"
              aria-label="Main"
            >
              {renderNavLinks("storefront")}
            </nav>
            <NavbarCart />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-900 dark:text-slate-200 dark:hover:bg-violet-950/50 md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <HiXMark className="h-6 w-6" aria-hidden />
              ) : (
                <HiBars3 className="h-6 w-6" aria-hidden />
              )}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav
            id="mobile-nav"
            className="border-t border-violet-200/60 bg-white/95 px-3 py-3 backdrop-blur-xl dark:border-violet-900/40 dark:bg-slate-950/95 md:hidden"
            aria-label="Main mobile"
          >
            <div className="flex flex-col gap-1">
              {renderNavLinks("storefront", true)}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
