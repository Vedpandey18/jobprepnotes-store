"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";
import { buildPaymentOrderPayload } from "@/lib/checkout-payment";
import { computeOrderBreakdown, round2 } from "@/lib/money";
import {
  formatInrDetailed,
  formatPrice,
  getDisplayPrices,
} from "@/lib/pricing";
import { CheckoutAddMoreProducts } from "@/components/checkout/CheckoutAddMoreProducts";
import { CheckoutLegalLinks } from "@/components/checkout/CheckoutLegalLinks";
import { getProductImageAlt } from "@/lib/seo/product-seo";
import { productDetailPath } from "@/lib/urls";

type CheckoutViewProps = {
  buyNowProduct: Product | null;
  productNotFound: boolean;
  catalogProducts: Product[];
};

function cartSubtotal(cartItems: Product[]): number {
  const raw = cartItems.reduce((sum, p) => {
    return sum + getDisplayPrices(p).current;
  }, 0);
  return round2(raw);
}

function isDataEngineerProduct(product: Product): boolean {
  const slug = product.slug.toLowerCase();
  const title = product.title.toLowerCase();
  return slug.includes("data-engineer") || title.includes("data engineer");
}

function isJavaDeveloperProduct(product: Product): boolean {
  const slug = product.slug.toLowerCase();
  const title = product.title.toLowerCase();
  return slug.includes("java-developer") || title.includes("java developer");
}

function isHttpUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function CheckoutView({
  buyNowProduct,
  productNotFound,
  catalogProducts,
}: CheckoutViewProps) {
  const router = useRouter();
  const { buyNow, cartItems, ready } = useCart();
  const appliedBuyNow = useRef(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(
    null
  );
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [couponErr, setCouponErr] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const superProfileCheckoutUrl =
    process.env.NEXT_PUBLIC_SUPERPROFILE_CHECKOUT_URL?.trim() ?? "";

  useEffect(() => {
    if (!ready || !buyNowProduct || appliedBuyNow.current) return;
    appliedBuyNow.current = true;
    buyNow(buyNowProduct);
  }, [ready, buyNowProduct, buyNow]);

  const cartTotalInclusive = useMemo(() => cartSubtotal(cartItems), [cartItems]);

  const discountedInclusive = useMemo(() => {
    const d = appliedCoupon?.discount ?? 0;
    return round2(Math.max(0, cartTotalInclusive - d));
  }, [cartTotalInclusive, appliedCoupon]);

  const breakdown = useMemo(() => {
    return computeOrderBreakdown(discountedInclusive);
  }, [discountedInclusive]);

  const cartKey = cartItems.map((p) => p.id).join(",");
  useEffect(() => {
    setAppliedCoupon(null);
    setCouponMessage(null);
    setCouponErr(null);
  }, [cartKey]);

  async function applyCoupon() {
    setCouponErr(null);
    setCouponMessage(null);
    const code = couponInput.trim();
    if (!code) {
      setCouponErr("Enter a coupon code.");
      return;
    }
    if (cartTotalInclusive <= 0) {
      setCouponErr("Cart is empty.");
      return;
    }
    setCouponLoading(true);
    try {
      const r = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, cartTotal: cartTotalInclusive }),
      });
      const data = (await r.json()) as {
        valid?: boolean;
        discount?: number;
        message?: string;
        code?: string;
      };
      if (!data.valid || data.discount == null) {
        setCouponErr(data.message ?? "Invalid or expired coupon.");
        setAppliedCoupon(null);
        return;
      }
      setAppliedCoupon({ code: data.code ?? code.toUpperCase(), discount: data.discount });
      setCouponMessage(data.message ?? "Coupon applied.");
    } catch {
      setCouponErr("Could not validate coupon.");
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponMessage(null);
    setCouponErr(null);
  }

  if (productNotFound) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Product not found
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          That product link is invalid or no longer available.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
        >
          Browse products →
        </Link>
      </main>
    );
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center text-sm text-slate-500">
        Loading checkout…
      </div>
    );
  }

  const handleProceedToPay = async () => {
    setSubmitError(null);

    const nameTrimmed = fullName.trim();
    if (nameTrimmed.length < 2) {
      setFullNameError("Please enter your full name.");
      return;
    }
    setFullNameError(null);

    const trimmed = email.trim();
    const simpleValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!simpleValid) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(null);

    if (cartItems.length === 0) {
      setSubmitError("Your cart is empty. Add a product and try again.");
      return;
    }

    const payload = buildPaymentOrderPayload(
      cartItems,
      breakdown,
      { email: trimmed, fullName: nameTrimmed },
      appliedCoupon
    );

    setIsPaying(true);
    try {
      // Hook: replace with Razorpay / your API — open checkout, then confirm.
      console.log("[checkout] payment order payload:", payload);

      const amountStr = breakdown.finalTotal.toFixed(2);
      const subtotalStr = breakdown.subtotal.toFixed(2);
      const q = new URLSearchParams({
        email: trimmed,
        fullName: nameTrimmed,
        amount: amountStr,
        subtotal: subtotalStr,
        taxAmount: "0",
      });
      if (appliedCoupon) {
        q.set("coupon", appliedCoupon.code);
        q.set("discount", String(appliedCoupon.discount));
      }
      const productPaymentLink =
        cartItems.length === 1 && isHttpUrl(cartItems[0]?.pdfUrl)
          ? cartItems[0].pdfUrl
          : "";
      const hasDataEngineer = cartItems.some(isDataEngineerProduct);
      const hasJavaDeveloper = cartItems.some(isJavaDeveloperProduct);
      const selectedCheckoutUrl = productPaymentLink
        ? productPaymentLink
        : hasJavaDeveloper
          ? "https://superprofile.bio/vp/javadeveloper"
          : hasDataEngineer
            ? "https://superprofile.bio/vp/Data-Engineer"
            : superProfileCheckoutUrl;
      q.set("paid", selectedCheckoutUrl ? "1" : "0");
      const successUrl = `/success?${q.toString()}`;
      if (!selectedCheckoutUrl) {
        router.push(successUrl);
        return;
      }

      const checkoutUrl = new URL(selectedCheckoutUrl);
      checkoutUrl.searchParams.set("email", trimmed);
      checkoutUrl.searchParams.set("name", nameTrimmed);
      checkoutUrl.searchParams.set("amount", amountStr);
      checkoutUrl.searchParams.set(
        "redirect",
        `${window.location.origin}${successUrl}`
      );
      if (appliedCoupon) {
        checkoutUrl.searchParams.set("coupon", appliedCoupon.code);
        checkoutUrl.searchParams.set("discount", String(appliedCoupon.discount));
      }
      window.location.assign(checkoutUrl.toString());
    } catch (e) {
      console.error(e);
      setSubmitError("Something went wrong. Please try again.");
      setIsPaying(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">
        Checkout
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Review your order, billing details, and total.
      </p>

      {cartItems.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-violet-200/80 bg-violet-50/40 p-8 text-center dark:border-violet-900/50 dark:bg-violet-950/30">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your cart is empty.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-flex text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
          >
            Shop interview notes →
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          <section aria-labelledby="order-items-heading">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2
                id="order-items-heading"
                className="text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-400"
              >
                Order items
              </h2>
              <span className="text-[11px] text-slate-500">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
              </span>
            </div>
            <ul
              className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200/80 bg-white/90 dark:divide-slate-700/80 dark:border-slate-700/80 dark:bg-slate-900/50"
              role="list"
            >
              {cartItems.map((p) => {
                const { current } = getDisplayPrices(p);
                const thumbAlt = getProductImageAlt(p);
                return (
                  <li key={p.id}>
                    <div className="flex items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white p-0.5 sm:h-11 sm:w-11 dark:border-slate-700 dark:bg-slate-900">
                        <Image
                          src={p.coverImage}
                          alt={thumbAlt}
                          fill
                          unoptimized
                          className="object-contain"
                          sizes="44px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={productDetailPath(p)}
                          className="line-clamp-2 text-sm font-medium leading-snug text-slate-900 transition hover:text-violet-600 dark:text-slate-100 dark:hover:text-violet-400"
                        >
                          {p.title}
                        </Link>
                        <p className="mt-0.5 text-xs tabular-nums text-slate-500 sm:text-sm">
                          {formatPrice(current)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <CheckoutAddMoreProducts products={catalogProducts} />
          </section>

          <section className="rounded-2xl border border-emerald-200/70 bg-emerald-50/30 p-5 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Coupon code
            </h2>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value.toUpperCase());
                  setCouponErr(null);
                  setCouponMessage(null);
                }}
                placeholder="e.g. SAVE50"
                disabled={Boolean(appliedCoupon)}
                className="min-w-0 flex-1 rounded-xl border border-emerald-200/90 bg-white px-4 py-2.5 text-sm font-mono uppercase tracking-wide text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-emerald-900/50 dark:bg-slate-900 dark:text-slate-100"
              />
              {appliedCoupon ? (
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void applyCoupon()}
                  disabled={couponLoading}
                  className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:opacity-60"
                >
                  {couponLoading ? "Checking…" : "Apply"}
                </button>
              )}
            </div>
            {couponErr && (
              <p className="mt-2 text-sm text-rose-600 dark:text-rose-400" role="alert">
                {couponErr}
              </p>
            )}
            {couponMessage && (
              <p className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                {couponMessage}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-violet-200/80 bg-white p-5 shadow-sm dark:border-violet-800/50 dark:bg-slate-900/70">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-400">
              Order summary
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-slate-600 dark:text-slate-400">Cart total</span>
                <span className="tabular-nums text-slate-900 dark:text-slate-100">
                  {formatInrDetailed(cartTotalInclusive)}
                </span>
              </div>
              {appliedCoupon && (
                <div className="flex items-baseline justify-between gap-4 text-emerald-700 dark:text-emerald-400">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span className="tabular-nums font-medium">
                    −{formatInrDetailed(appliedCoupon.discount)}
                  </span>
                </div>
              )}
              <div
                className="border-t border-dashed border-slate-200 pt-4 dark:border-slate-600"
                role="separator"
              />
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                  Total payable
                </span>
                <span className="font-display text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                  {formatInrDetailed(breakdown.finalTotal)}
                </span>
              </div>
            </div>
          </section>

          <section aria-labelledby="billing-heading">
            <h2
              id="billing-heading"
              className="text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-400"
            >
              Billing details
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="checkout-full-name"
                  className="block text-sm font-medium text-slate-900 dark:text-slate-100"
                >
                  Full name{" "}
                  <span className="text-red-600 dark:text-red-400">*</span>
                </label>
                <input
                  id="checkout-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fullNameError) setFullNameError(null);
                  }}
                  className="mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="Your full name"
                />
                {fullNameError && (
                  <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {fullNameError}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="checkout-email"
                  className="block text-sm font-medium text-slate-900 dark:text-slate-100"
                >
                  Email{" "}
                  <span className="text-red-600 dark:text-red-400">*</span>
                </label>
                <input
                  id="checkout-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  className="mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="you@example.com"
                />
                {emailError && (
                  <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {emailError}
                  </p>
                )}
              </div>
            </div>
          </section>

          <p className="text-center text-xs leading-relaxed text-slate-500">
            You will receive a payment receipt on your email.
          </p>

          {submitError && (
            <p
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
              role="alert"
            >
              {submitError}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => void handleProceedToPay()}
              disabled={isPaying}
              aria-busy={isPaying}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
            >
              {isPaying ? "Processing…" : `Proceed to pay ${formatInrDetailed(breakdown.finalTotal)}`}
            </button>
            <Link
              href="/products"
              className="text-center text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400 sm:text-left"
            >
              ← Back to products
            </Link>
          </div>

          <CheckoutLegalLinks />
        </div>
      )}
    </main>
  );
}
