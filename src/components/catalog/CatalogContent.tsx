import { ProductCard } from "@/components/catalog/ProductCard";
import { loadProducts } from "@/lib/get-products";

export async function CatalogContent() {
  const result = await loadProducts();
  if (!result.ok) {
    return (
      <div className="rounded-2xl border border-dashed border-amber-300/80 bg-amber-50/50 px-6 py-10 text-center dark:border-amber-900/50 dark:bg-amber-950/20">
        <p className="font-medium text-slate-900 dark:text-slate-100">
          Catalog unavailable
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {result.message}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {result.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
