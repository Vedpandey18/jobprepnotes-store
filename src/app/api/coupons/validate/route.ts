import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateCouponDiscount } from "@/lib/coupon-calc";

export async function POST(request: Request) {
  let body: { code?: string; cartTotal?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const code = (body.code ?? "").trim().toUpperCase();
  const cartTotal = Number(body.cartTotal);
  if (!code || !Number.isFinite(cartTotal) || cartTotal <= 0) {
    return NextResponse.json(
      { valid: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code },
    });
    if (!coupon) {
      return NextResponse.json({
        valid: false,
        message: "Invalid or expired coupon.",
      });
    }
    const result = calculateCouponDiscount(coupon, cartTotal);
    if (!result.ok) {
      return NextResponse.json({ valid: false, message: result.reason });
    }
    return NextResponse.json({
      valid: true,
      discount: result.discount,
      message: "Coupon applied.",
      code: coupon.code,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { valid: false, message: "Could not validate coupon." },
      { status: 503 }
    );
  }
}
