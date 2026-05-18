export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function rupeesToPaisa(rupees: number): number {
  return Math.round(rupees * 100);
}

/** Amounts shown at checkout are the prices charged — no separate tax line. */
export type OrderBreakdown = {
  subtotal: number;
  finalTotal: number;
};

export function computeOrderBreakdown(inclusiveTotal: number): OrderBreakdown {
  const finalTotal = round2(inclusiveTotal);
  return { subtotal: finalTotal, finalTotal };
}
