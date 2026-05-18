import { FeaturedProductCard } from "@/components/home/FeaturedProductCard";
import { getFeaturedProducts } from "@/lib/get-products";

export async function FeaturedProductsSection() {
  const products = await getFeaturedProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      className="border-b border-violet-200/50 bg-slate-50 py-12 dark:border-violet-900/40 dark:bg-slate-900/50 sm:py-16 lg:py-20"
      aria-labelledby="featured-interview-notes-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
          Catalog
        </p>
        <h2
          id="featured-interview-notes-heading"
          className="mx-auto mt-2 max-w-3xl text-center font-display text-3xl font-semibold tracking-tight text-slate-900 text-balance dark:text-slate-100 sm:text-4xl"
        >
          Featured interview notes
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Hand-picked PDFs — add to cart or checkout in one tap.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
