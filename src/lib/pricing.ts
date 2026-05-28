import type { Product } from "@/types/product";

export function formatPrice(amountRupees: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountRupees);
}

/** INR with paise for invoice-style lines. */
export function formatInrDetailed(amountRupees: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountRupees);
}

export function getDisplayPrices(product: Product): {
  current: number;
  original?: number;
} {
  const base = product.price;
  if (
    product.discountPrice != null &&
    product.discountPrice > 0 &&
    product.discountPrice < base
  ) {
    return { current: product.discountPrice, original: base };
  }
  if (product.discountPercent != null && product.discountPercent > 0) {
    const discounted =
      Math.round(base * (1 - product.discountPercent / 100) * 100) / 100;
    return { current: discounted, original: base };
  }
  return { current: base };
}
