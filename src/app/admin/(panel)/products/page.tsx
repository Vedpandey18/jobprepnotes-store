import type { Metadata } from "next";
import { AdminProductsClient } from "@/components/admin/AdminProductsClient";

export const metadata: Metadata = {
  title: "Admin — Products",
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-violet-200/70 bg-gradient-to-r from-violet-50 to-indigo-50 p-5 dark:border-violet-800/40 dark:from-violet-950/30 dark:to-indigo-950/20">
        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Products
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Manage your products in one place. Use cover image upload + optional SuperProfile payment link.
        </p>
      </div>
      <div>
        <AdminProductsClient />
      </div>
    </div>
  );
}
