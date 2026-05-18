import type { Metadata } from "next";
import Link from "next/link";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-violet-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 dark:text-slate-100">Cart</span>
      </nav>
      <h1 className="mt-8 font-display text-3xl font-semibold text-slate-900 dark:text-slate-100">
        Your cart
      </h1>
      <div className="mt-10">
        <CartView />
      </div>
    </main>
  );
}
