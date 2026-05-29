import Link from "next/link";
import { BlogCategoryBadge } from "@/components/blog/BlogCategoryBadge";

type BlogPostCardProps = {
  slug: string;
  title: string;
  category: string;
  createdAt: Date;
  showBadge?: boolean;
};

export function BlogPostCard({
  slug,
  title,
  category,
  createdAt,
  showBadge = true,
}: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-200"
    >
      {showBadge && <BlogCategoryBadge category={category} />}
      <span
        className={`block font-display text-lg font-semibold text-slate-900 ${
          showBadge ? "mt-2" : ""
        }`}
      >
        {title}
      </span>
      <span className="mt-1 block text-xs text-slate-500">
        {createdAt.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    </Link>
  );
}
