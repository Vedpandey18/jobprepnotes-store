import type { Metadata } from "next";
import { AdminProductsClient } from "@/components/admin/AdminProductsClient";

export const metadata: Metadata = {
  title: "Admin — Products",
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Products
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Add, edit, or remove ebook products. On Vercel, uploads are stored in{" "}
        <strong>Vercel Blob</strong> (permanent). Locally they go to{" "}
        <code className="rounded bg-slate-100 px-1 text-xs dark:bg-slate-800">/public/uploads</code>.
        If the title matches an existing product, the URL slug is auto-suffixed (e.g.{" "}
        <code className="text-xs">mysql-1</code>). For the public shop to use the database,
        set <code className="text-xs">USE_DEMO_CATALOG=false</code> in{" "}
        <code className="text-xs">.env</code>.
      </p>
      <div className="mt-8">
        <AdminProductsClient />
      </div>
    </div>
  );
}
