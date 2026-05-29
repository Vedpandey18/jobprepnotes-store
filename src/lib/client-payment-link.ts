"use client";

import type { Product } from "@/types/product";

function isHttpUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function getCheckoutUrlForProduct(product: Product): string {
  if (isHttpUrl(product.pdfUrl)) return product.pdfUrl;

  const slug = product.slug.toLowerCase();
  const title = product.title.toLowerCase();
  if (slug.includes("java-developer") || title.includes("java developer")) {
    return "https://superprofile.bio/vp/javadeveloper";
  }
  if (slug.includes("data-engineer") || title.includes("data engineer")) {
    return "https://superprofile.bio/vp/Data-Engineer";
  }

  const globalUrl = process.env.NEXT_PUBLIC_SUPERPROFILE_CHECKOUT_URL?.trim() ?? "";
  return isHttpUrl(globalUrl) ? globalUrl : "";
}

