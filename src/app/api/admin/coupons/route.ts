import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/admin-auth-http";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(coupons);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const code = String(body.code ?? "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
  const discountType = body.discountType === "flat" ? "flat" : "percentage";
  const discountValue = Number(body.discountValue);
  const minAmount =
    body.minAmount === "" || body.minAmount == null
      ? null
      : Number(body.minAmount);
  const maxDiscount =
    body.maxDiscount === "" || body.maxDiscount == null
      ? null
      : Number(body.maxDiscount);
  const expiryDate = new Date(String(body.expiryDate ?? ""));
  const usageLimit =
    body.usageLimit === "" || body.usageLimit == null
      ? null
      : Number(body.usageLimit);

  if (!code || !Number.isFinite(discountValue) || Number.isNaN(expiryDate.getTime())) {
    return NextResponse.json({ error: "code, discountValue, expiryDate required" }, { status: 400 });
  }

  try {
    const created = await prisma.coupon.create({
      data: {
        code,
        discountType,
        discountValue: new Prisma.Decimal(discountValue),
        minAmount:
          minAmount != null && Number.isFinite(minAmount)
            ? new Prisma.Decimal(minAmount)
            : null,
        maxDiscount:
          maxDiscount != null && Number.isFinite(maxDiscount)
            ? new Prisma.Decimal(maxDiscount)
            : null,
        expiryDate,
        usageLimit: usageLimit != null && Number.isFinite(usageLimit) ? usageLimit : null,
        isActive: body.isActive !== false,
      },
    });
    return NextResponse.json(created);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not create coupon" }, { status: 400 });
  }
}
