import type { Product } from "@/types/product";

export function getProductImageAlt(product: Product): string {
  const base = product.title;
  if (/java/i.test(product.title)) {
    return `${base} — Java interview notes PDF cover`;
  }
  if (/system design/i.test(product.title)) {
    return `${base} — system design interview notes cover`;
  }
  return `${base} — interview preparation PDF cover`;
}

export function getProductDetailTitle(product: Product): string {
  const s = product.slug.toLowerCase();
  if (s.includes("java")) {
    return "Structured Java interview notes PDF — core Java, collections & JVM";
  }
  if (s.includes("system-design")) {
    return "System design interview notes — scalability, caching & trade-offs";
  }
  return product.title;
}

export function getProductMetaTitle(product: Product): string {
  return `${product.title} | JobPrepNotes`;
}

export function getProductMetaDescription(product: Product): string {
  return `${product.shortDescription} Instant PDF download after purchase.`;
}

export function getWhatYouWillLearnBullets(product: Product): string[] {
  return [
    "Structured chapters mapped to real interview themes",
    "Checklists and talking points for quick revision",
    "PDF format for offline search and annotation",
  ];
}
