import type { Product } from "@/types/product";
import type { OrderBreakdown } from "@/lib/money";
import { rupeesToPaisa } from "@/lib/money";

export type CheckoutBilling = {
  email: string;
  fullName: string;
};

export type PaymentOrderPayload = CheckoutBilling & {
  subtotal: number;
  /** Optional breakdown field; always zero (no separate tax line). */
  taxAmount: number;
  finalTotal: number;
  totalAmount: number;
  amountPaisa: number;
  items: { id: string; title: string; quantity: 1 }[];
  couponCode?: string | null;
  couponDiscount?: number;
};

export function buildPaymentOrderPayload(
  cartItems: Product[],
  breakdown: OrderBreakdown,
  billing: CheckoutBilling,
  coupon?: { code: string; discount: number } | null
): PaymentOrderPayload {
  const { subtotal, finalTotal } = breakdown;
  return {
    email: billing.email.trim(),
    fullName: billing.fullName.trim(),
    subtotal,
    taxAmount: 0,
    finalTotal,
    totalAmount: finalTotal,
    amountPaisa: rupeesToPaisa(finalTotal),
    items: cartItems.map((p) => ({
      id: p.id,
      title: p.title,
      quantity: 1 as const,
    })),
    couponCode: coupon?.code ?? null,
    couponDiscount: coupon?.discount,
  };
}
