import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/admin-auth-http";
import { prisma } from "@/lib/prisma";
import { resolveUniqueProductSlug } from "@/lib/unique-product-slug";

type Ctx = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: Ctx) {
  try {
    const p = await prisma.product.findUnique({ where: { id: params.id } });
    if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(p);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 503 });
  }
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const description = String(body.description ?? "").trim();
  const price = Number(body.price);
  const discountPrice =
    body.discountPrice === "" || body.discountPrice == null
      ? null
      : Number(body.discountPrice);
  const imageUrl = String(body.imageUrl ?? "").trim();
  const pdfUrl = String(body.pdfUrl ?? "").trim();
  const bundlePdfUrls =
    typeof body.bundlePdfUrls === "string"
      ? body.bundlePdfUrls
          .split("\n")
          .map((u) => u.trim())
          .filter(Boolean)
      : [];
  const category = String(body.category ?? "Interview").trim() || "Interview";
  const badge =
    body.badge === "" || body.badge == null ? null : String(body.badge).trim();
  const slugInput = String(body.slug ?? "").trim() || undefined;

  if (!title || !Number.isFinite(price) || !imageUrl || !pdfUrl) {
    return NextResponse.json(
      { error: "title, price, imageUrl, and pdfUrl are required" },
      { status: 400 }
    );
  }

  const slug = await resolveUniqueProductSlug(title, slugInput, {
    excludeProductId: params.id,
  });

  try {
    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        title,
        description,
        slug,
        category,
        price: new Prisma.Decimal(price),
        discountPrice:
          discountPrice != null && Number.isFinite(discountPrice)
            ? new Prisma.Decimal(discountPrice)
            : null,
        imageUrl,
        pdfUrl,
        bundlePdfUrls: bundlePdfUrls.length > 0 ? bundlePdfUrls.join("\n") : null,
        badge,
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
