import { BLOG_CATEGORIES, getCategoryLabel, isBlogCategory } from "@/lib/blog-categories";

export function BlogCategoryBadge({ category }: { category: string }) {
  const cat = isBlogCategory(category) ? category : "interview-tips";
  const styles = BLOG_CATEGORIES[cat].color;

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${styles}`}
    >
      {getCategoryLabel(category)}
    </span>
  );
}
