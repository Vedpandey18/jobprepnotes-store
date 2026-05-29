import type { Metadata } from "next";
import Link from "next/link";
import { SuccessPersistClient } from "@/app/success/SuccessPersistClient";

export const metadata: Metadata = {
  title: "Order confirmed",
};

type Props = {
  searchParams: {
    email?: string;
    fullName?: string;
    amount?: string;
    subtotal?: string;
    taxAmount?: string;
    coupon?: string;
    discount?: string;
    paid?: string;
  };
};

export default function SuccessPage({ searchParams }: Props) {
  const email = searchParams.email
    ? decodeURIComponent(searchParams.email)
    : null;
  const amount = searchParams.amount
    ? decodeURIComponent(searchParams.amount)
    : null;
  const fullName = searchParams.fullName
    ? decodeURIComponent(searchParams.fullName)
    : null;
  const subtotal = searchParams.subtotal
    ? decodeURIComponent(searchParams.subtotal)
    : null;
  const taxAmount = searchParams.taxAmount
    ? decodeURIComponent(searchParams.taxAmount)
    : null;
  const coupon = searchParams.coupon
    ? decodeURIComponent(searchParams.coupon)
    : null;
  const discount = searchParams.discount
    ? decodeURIComponent(searchParams.discount)
    : null;
  const paid = searchParams.paid
    ? decodeURIComponent(searchParams.paid)
    : null;

  return (
    <main className="mx-auto max-w-lg px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-2xl text-emerald-600">
        ✓
      </div>
      <h1 className="mt-6 font-display text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Access unlocked
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Payment completed successfully. Your interview notes are now available,
        and your receipt details are shown below.
      </p>
      {amount && (
        <p className="mt-4 font-display text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-100">
          Total: ₹{amount}
        </p>
      )}
      {coupon && discount && (
        <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">
          Coupon <strong>{coupon}</strong> saved you ₹{discount}
        </p>
      )}
      {email && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Receipt will go to <strong className="text-slate-800 dark:text-slate-200">{email}</strong>
        </p>
      )}
      <SuccessPersistClient
        email={email}
        fullName={fullName}
        amount={amount}
        subtotal={subtotal}
        taxAmount={taxAmount}
        coupon={coupon}
        discount={discount}
        paid={paid}
      />
      <Link
        href="/products"
        className="btn-primary mt-10 inline-flex px-8 py-3"
      >
        View your notes
      </Link>
    </main>
  );
}
