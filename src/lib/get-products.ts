import type { Product } from "@/types/product";
import { prismaProductToProduct } from "@/lib/db/map-product";
import { prisma } from "@/lib/prisma";

export type CatalogMode = "database" | "demo";

export type LoadProductsResult =
  | { ok: true; products: Product[]; mode: CatalogMode }
  | { ok: false; message: string };

const DEMO: Product[] = [
  {
    id: "demo-java-1",
    slug: "java-interview-notes",
    title: "Java Interview Notes",
    description:
      "Core Java, collections, concurrency, and JVM — interview-focused.",
    shortDescription:
      "Core Java, collections, concurrency, and JVM — interview-focused.",
    coverImage: "https://placehold.co/600x400/7c3aed/ffffff?text=Java",
    category: "Interview",
    price: 299,
    discountPrice: null,
    discountPercent: 50,
    pdfUrl: "https://example.com/sample.pdf",
    badge: "Best Seller",
  },
  {
    id: "demo-sd-1",
    slug: "system-design-interview-kit",
    title: "System Design Interview Kit",
    description:
      "Scalability, CAP, caching, and real system design interview patterns.",
    shortDescription:
      "Scalability, CAP, caching, and real system design interview patterns.",
    coverImage: "https://placehold.co/600x400/5b21b6/ffffff?text=System+Design",
    category: "Interview",
    price: 399,
    discountPrice: null,
    discountPercent: 37,
    pdfUrl: "https://example.com/sample.pdf",
    badge: "Limited Offer",
  },
  {
    id: "demo-python-1",
    slug: "python-interview-notes",
    title: "Python Interview Notes",
    description:
      "Python internals, DS&A patterns, and backend interview essentials.",
    shortDescription:
      "Python internals, DS&A patterns, and backend interview essentials.",
    coverImage: "https://placehold.co/600x400/8b5cf6/ffffff?text=Python",
    category: "Interview",
    price: 249,
    discountPrice: null,
    discountPercent: 20,
    pdfUrl: "https://example.com/sample.pdf",
    badge: "Best Seller",
  },
];

function shouldUseDemoCatalog(): boolean {
  return (
    !process.env.DATABASE_URL || process.env.USE_DEMO_CATALOG === "true"
  );
}

export function isDemoCatalogMode(): boolean {
  return shouldUseDemoCatalog();
}

export async function loadProducts(): Promise<LoadProductsResult> {
  if (shouldUseDemoCatalog()) {
    return { ok: true, products: DEMO, mode: "demo" };
  }
  try {
    const rows = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return {
      ok: true,
      products: rows.map(prismaProductToProduct),
      mode: "database",
    };
  } catch (e) {
    console.error("[loadProducts]", e);
    return {
      ok: false,
      message:
        "Could not load products from the database. Check DATABASE_URL and run `npx prisma db push`.",
    };
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (shouldUseDemoCatalog()) {
    const r = await loadProducts();
    if (!r.ok) return null;
    return r.products.find((p) => p.slug === slug) ?? null;
  }
  try {
    const p = await prisma.product.findUnique({ where: { slug } });
    return p ? prismaProductToProduct(p) : null;
  } catch {
    return null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (shouldUseDemoCatalog()) {
    const r = await loadProducts();
    if (!r.ok) return null;
    return r.products.find((p) => p.id === id) ?? null;
  }
  try {
    const p = await prisma.product.findUnique({ where: { id } });
    return p ? prismaProductToProduct(p) : null;
  } catch {
    return null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const r = await loadProducts();
  if (!r.ok) return [];
  return r.products.slice(0, 3);
}
