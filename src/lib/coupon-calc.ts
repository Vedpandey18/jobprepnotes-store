import type { Coupon } from "@prisma/client";
import { round2 } from "@/lib/money";

export function calculateCouponDiscount(
  coupon: Coupon,
  cartTotalInclusive: number
): { ok: true; discount: number } | { ok: false; reason: string } {
  if (!coupon.isActive) return { ok: false, reason: "Coupon is inactive." };
  if (new Date() > coupon.expiryDate) {
    return { ok: false, reason: "Coupon has expired." };
  }
  if (coupon.usageLimit != null && coupon.usedCount >= coupon.usageLimit) {
    return { ok: false, reason: "Coupon usage limit reached." };
  }
  const min = coupon.minAmount != null ? Number(coupon.minAmount) : 0;
  if (cartTotalInclusive < min) {
    return {
      ok: false,
      reason: `Minimum order amount is ₹${min.toFixed(0)}.`,
    };
  }

  let discount = 0;
  if (coupon.discountType === "flat") {
    discount = Number(coupon.discountValue);
  } else {
    discount = (cartTotalInclusive * Number(coupon.discountValue)) / 100;
    if (coupon.maxDiscount != null) {
      discount = Math.min(discount, Number(coupon.maxDiscount));
    }
  }
  discount = round2(Math.min(discount, cartTotalInclusive));
  if (discount <= 0) return { ok: false, reason: "Invalid discount." };
  return { ok: true, discount };
}
