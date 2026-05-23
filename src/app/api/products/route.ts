import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/admin-auth-http";
import { prisma } from "@/lib/prisma";
import { resolveUniqueProductSlug } from "@/lib/unique-product-slug";
import { isValidMediaUrl, mediaUrlError } from "@/lib/validate-media-url";

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Database unavailable. Set DATABASE_URL and run prisma db push." },
      { status: 503 }
    );
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

  if (!isValidMediaUrl(imageUrl)) {
    return NextResponse.json({ error: mediaUrlError("Cover image URL") }, { status: 400 });
  }
  if (!isValidMediaUrl(pdfUrl)) {
    return NextResponse.json({ error: mediaUrlError("PDF URL") }, { status: 400 });
  }

  const slug = await resolveUniqueProductSlug(title, slugInput);

  try {
    const created = await prisma.product.create({
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
    return NextResponse.json(created);
  } catch (e) {
    console.error("[POST /api/products]", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { error: `Could not create product: ${msg}` },
      { status: 400 }
    );
  }
}
