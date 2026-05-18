import type { Product } from "@/types/product";

export function productDetailPath(product: Pick<Product, "slug">): string {
  return `/products/${encodeURIComponent(product.slug)}`;
}
