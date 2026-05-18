import type { Metadata } from "next";
import { AdminCouponsClient } from "@/components/admin/AdminCouponsClient";

export const metadata: Metadata = {
  title: "Admin — Coupons",
  robots: { index: false, follow: false },
};

export default function AdminCouponsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-100">Coupons</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Discount codes for checkout. Codes are case-insensitive when customers apply them.
      </p>
      <div className="mt-8">
        <AdminCouponsClient />
      </div>
    </div>
  );
}
