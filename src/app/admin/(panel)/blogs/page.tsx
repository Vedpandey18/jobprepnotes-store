import type { Metadata } from "next";
import { AdminBlogsClient } from "@/components/admin/AdminBlogsClient";

export const metadata: Metadata = {
  title: "Admin — Blogs",
  robots: { index: false, follow: false },
};

export default function AdminBlogsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-100">Blog posts</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Create and manage articles for the public blog. If the slug matches an existing post, a
        suffix is added automatically (e.g. <code className="text-xs">java-1</code>).
      </p>
      <div className="mt-8">
        <AdminBlogsClient />
      </div>
    </div>
  );
}
