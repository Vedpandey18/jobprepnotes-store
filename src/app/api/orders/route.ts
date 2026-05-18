import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: {
    email?: string;
    fullName?: string;
    amount?: number;
    subtotal?: number;
    taxAmount?: number;
    couponCode?: string | null;
    discountAmount?: number | null;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const fullName = body.fullName ? String(body.fullName).trim() : null;
  const amount = Number(body.amount);
  const subtotal = body.subtotal != null ? Number(body.subtotal) : null;
  const taxAmount = body.taxAmount != null ? Number(body.taxAmount) : null;
  const couponCode = body.couponCode ? String(body.couponCode).trim().toUpperCase() : null;
  const discountAmount =
    body.discountAmount != null && Number.isFinite(Number(body.discountAmount))
      ? Number(body.discountAmount)
      : null;

  if (!email || !Number.isFinite(amount)) {
    return NextResponse.json({ error: "email and amount required" }, { status: 400 });
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.order.create({
        data: {
          email,
          fullName,
          amount: new Prisma.Decimal(amount),
          subtotal: subtotal != null ? new Prisma.Decimal(subtotal) : null,
          taxAmount: taxAmount != null ? new Prisma.Decimal(taxAmount) : null,
          couponCode,
          discountAmount:
            discountAmount != null ? new Prisma.Decimal(discountAmount) : null,
        },
      });
      if (couponCode) {
        await tx.coupon.updateMany({
          where: { code: couponCode },
          data: { usedCount: { increment: 1 } },
        });
      }
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not save order" }, { status: 503 });
  }
}
