import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { getProductBySlug, isDemoCatalogMode } from "@/lib/get-products";
import { getProductMetaDescription, getProductMetaTitle } from "@/lib/seo/product-seo";
import { SITE_SEO_KEYWORDS } from "@/lib/seo/site-keywords";
import { productDetailPath } from "@/lib/urls";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(decodeURIComponent(params.slug));
  if (!product) return { title: "Product not found" };
  const canonical = productDetailPath(product);
  return {
    title: getProductMetaTitle(product),
    description: getProductMetaDescription(product),
    keywords: [...SITE_SEO_KEYWORDS],
    alternates: { canonical },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug);
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <ProductDetailView product={product} showDemoBanner={isDemoCatalogMode()} />
  );
}
