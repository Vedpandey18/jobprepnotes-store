import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Admin login
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        JobPrepNotes — sign in to manage products, blogs, and coupons.
      </p>
      <AdminLoginForm />
    </main>
  );
}
