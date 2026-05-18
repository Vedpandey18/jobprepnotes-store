import type { Metadata } from "next";
import { CheckoutView } from "./CheckoutView";
import { getProductById, loadProducts } from "@/lib/get-products";

export const metadata: Metadata = {
  title: "Checkout",
};

type Props = {
  searchParams: { product?: string };
};

export default async function CheckoutPage({ searchParams }: Props) {
  const rawId = searchParams.product;
  const id = rawId ? decodeURIComponent(rawId) : null;
  const buyNowProduct = id ? await getProductById(id) : null;
  const productNotFound = Boolean(id && !buyNowProduct);

  const catalog = await loadProducts();
  const catalogProducts = catalog.ok ? catalog.products : [];

  return (
    <CheckoutView
      buyNowProduct={buyNowProduct}
      productNotFound={productNotFound}
      catalogProducts={catalogProducts}
    />
  );
}
