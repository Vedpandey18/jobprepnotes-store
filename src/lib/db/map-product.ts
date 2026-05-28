import type { Product as PrismaProduct } from "@prisma/client";
import type { Product } from "@/types/product";

export function prismaProductToProduct(p: PrismaProduct): Product {
  const price = Number(p.price);
  const discountPrice = p.discountPrice != null ? Number(p.discountPrice) : null;
  let discountPercent: number | null = null;
  if (discountPrice != null && discountPrice < price && price > 0) {
    discountPercent = Math.round(((price - discountPrice) / price) * 100);
  }
  const short =
    p.description.length > 220 ? `${p.description.slice(0, 217)}…` : p.description;
  const bundlePdfUrls = p.bundlePdfUrls
    ? p.bundlePdfUrls
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean)
    : [];

  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    shortDescription: short,
    coverImage: p.imageUrl,
    category: p.category,
    price,
    discountPrice,
    discountPercent,
    pdfUrl: p.pdfUrl,
    bundlePdfUrls,
    badge: p.badge ?? undefined,
  };
}
