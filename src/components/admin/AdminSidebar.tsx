"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineChartPie,
  HiOutlineCube,
  HiOutlineDocumentText,
  HiOutlineTicket,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", Icon: HiOutlineChartPie },
  { href: "/admin/products", label: "Products", Icon: HiOutlineCube },
  { href: "/admin/blogs", label: "Blogs", Icon: HiOutlineDocumentText },
  { href: "/admin/coupons", label: "Coupons", Icon: HiOutlineTicket },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-full shrink-0 border-b border-violet-200/60 bg-gradient-to-b from-white via-violet-50/40 to-slate-50/90 dark:border-slate-800 dark:from-slate-900 dark:via-violet-950/30 dark:to-slate-950 lg:w-60 lg:border-b-0 lg:border-r lg:border-violet-200/40 dark:lg:border-slate-800">
      <div className="flex flex-col gap-1 p-4 lg:sticky lg:top-[4.25rem] lg:flex lg:min-h-[calc(100vh-4.25rem)] lg:flex-col lg:py-6">
        <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600/80 dark:text-violet-400/90">
          Admin
        </p>
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.Icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-600/25 ring-1 ring-violet-500/30"
                  : "text-slate-700 hover:bg-white/80 hover:shadow-sm dark:text-slate-300 dark:hover:bg-slate-800/80"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 ${
                  active
                    ? "text-white"
                    : "text-violet-600 dark:text-violet-400"
                }`}
                aria-hidden
              />
              {item.label}
            </Link>
          );
        })}
        <div className="my-3 hidden border-t border-violet-200/60 dark:border-slate-700 lg:block" />
        <button
          type="button"
          onClick={() => void logout()}
          className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 lg:mt-auto"
        >
          <HiOutlineArrowRightOnRectangle className="h-5 w-5 shrink-0" aria-hidden />
          Logout
        </button>
      </div>
    </aside>
  );
}
