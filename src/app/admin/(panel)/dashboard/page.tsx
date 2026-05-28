import type { Metadata } from "next";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineCube,
  HiOutlineCurrencyRupee,
  HiOutlineDocumentText,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineTicket,
} from "react-icons/hi2";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export default async function AdminDashboardPage() {
  let productCount = 0;
  let blogCount = 0;
  let orderCount = 0;
  let revenue = 0;

  if (process.env.DATABASE_URL) {
    try {
      const [p, b, orders] = await Promise.all([
        prisma.product.count(),
        prisma.blog.count(),
        prisma.order.findMany({
          orderBy: { createdAt: "desc" },
          select: {
            amount: true,
            subtotal: true,
            discountAmount: true,
            taxAmount: true,
          },
        }),
      ]);
      productCount = p;
      blogCount = b;
      orderCount = orders.length;
      revenue = orders.reduce((sum, row) => {
        const amount = Number(row.amount ?? 0);
        const subtotal = row.subtotal != null ? Number(row.subtotal) : null;
        const discount = row.discountAmount != null ? Number(row.discountAmount) : 0;
        const tax = row.taxAmount != null ? Number(row.taxAmount) : 0;
        const calculated = subtotal != null ? subtotal - discount + tax : amount;
        return sum + (Number.isFinite(calculated) ? calculated : amount);
      }, 0);
    } catch {
      /* DB unreachable */
    }
  }

  const stats = [
    {
      label: "Products",
      sub: "In catalog",
      value: String(productCount),
      Icon: HiOutlineCube,
      className:
        "from-violet-500/10 to-fuchsia-500/5 ring-violet-500/15 dark:from-violet-500/20 dark:to-fuchsia-500/10",
      iconClass: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
    },
    {
      label: "Blog posts",
      sub: "Published",
      value: String(blogCount),
      Icon: HiOutlineDocumentText,
      className:
        "from-amber-500/10 to-orange-500/5 ring-amber-500/15 dark:from-amber-500/15 dark:to-orange-500/10",
      iconClass: "bg-amber-500/15 text-amber-800 dark:text-amber-200",
    },
    {
      label: "Orders",
      sub: "Paid only",
      value: String(orderCount),
      Icon: HiOutlineShoppingBag,
      className:
        "from-emerald-500/10 to-teal-500/5 ring-emerald-500/15 dark:from-emerald-500/15 dark:to-teal-500/10",
      iconClass: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
    },
    {
      label: "Revenue",
      sub: "Paid only",
      value: inr.format(revenue),
      Icon: HiOutlineCurrencyRupee,
      className:
        "from-sky-500/10 to-indigo-500/5 ring-sky-500/15 dark:from-sky-500/15 dark:to-indigo-500/10",
      iconClass: "bg-sky-500/15 text-sky-800 dark:text-sky-200",
    },
  ] as const;

  const quickLinks = [
    {
      href: "/admin/products",
      title: "Products",
      desc: "Add or edit interview notes & PDFs",
      Icon: HiOutlineCube,
      accent: "from-violet-600 to-purple-600",
    },
    {
      href: "/admin/blogs",
      title: "Blog",
      desc: "Publish articles & tips",
      Icon: HiOutlineDocumentText,
      accent: "from-amber-500 to-orange-600",
    },
    {
      href: "/admin/coupons",
      title: "Coupons",
      desc: "Discount codes for checkout",
      Icon: HiOutlineTicket,
      accent: "from-emerald-600 to-teal-600",
    },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="relative overflow-hidden rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white shadow-xl shadow-violet-600/20 sm:p-8 dark:border-violet-800/50">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 left-1/4 h-32 w-64 rounded-full bg-fuchsia-500/20 blur-2xl" />
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-violet-100/90">
              <HiOutlineSparkles className="h-4 w-4" aria-hidden />
              Store overview
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-violet-100/85">
              Track catalog, content, and orders at a glance — jump into any
              section from the shortcuts below.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/25 sm:self-auto"
          >
            View live site
            <HiOutlineArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.Icon;
          return (
            <div
              key={s.label}
              className={`relative overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br ${s.className} p-5 shadow-lg shadow-slate-900/[0.04] ring-1 backdrop-blur-sm dark:border-slate-700/80 dark:shadow-black/20`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {s.label}
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold tabular-nums tracking-tight text-slate-900 dark:text-slate-50">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {s.sub}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.iconClass}`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <aside className="space-y-3">
          <h2 className="px-1 font-display text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Quick actions
          </h2>
          {quickLinks.map((q) => {
            const Icon = q.Icon;
            return (
              <Link
                key={q.href}
                href={q.href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:border-violet-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-violet-800"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${q.accent} text-white shadow-lg shadow-violet-500/20`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold text-slate-900 dark:text-slate-100">
                    {q.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {q.desc}
                  </p>
                </div>
                <HiOutlineArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-violet-600 dark:group-hover:text-violet-400" />
              </Link>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
