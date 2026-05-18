import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/admin-auth-http";
import { prisma } from "@/lib/prisma";

type Ctx = { params: { id: string } };

export async function PUT(request: NextRequest, { params }: Ctx) {
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
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  try {
    const updated = await prisma.coupon.update({
      where: { id: params.id },
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
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest, { params }: Ctx) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  let body: { isActive?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.isActive !== "boolean") {
    return NextResponse.json({ error: "isActive boolean required" }, { status: 400 });
  }

  try {
    const updated = await prisma.coupon.update({
      where: { id: params.id },
      data: { isActive: body.isActive },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    await prisma.coupon.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
