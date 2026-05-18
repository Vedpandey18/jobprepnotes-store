import { notFound, redirect } from "next/navigation";
import { getProductById } from "@/lib/get-products";
import { productDetailPath } from "@/lib/urls";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

export default async function LegacyProductRedirect({ params }: Props) {
  const id = decodeURIComponent(params.id);
  const product = await getProductById(id);
  if (!product) notFound();
  redirect(productDetailPath(product));
}
