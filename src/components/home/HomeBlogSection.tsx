import Link from "next/link";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_LIST,
  type BlogCategory,
} from "@/lib/blog-categories";
import { prisma } from "@/lib/prisma";

const PREVIEW_LIMIT = 3;

export async function HomeBlogSection() {
  let posts: {
    id: string;
    title: string;
    slug: string;
    category: string;
    createdAt: Date;
  }[] = [];

  try {
    posts = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, slug: true, category: true, createdAt: true },
    });
  } catch {
    return null;
  }

  if (posts.length === 0) {
    return null;
  }

  const postsByCategory = BLOG_CATEGORY_LIST.reduce(
    (acc, key) => {
      acc[key] = posts.filter((p) => p.category === key).slice(0, PREVIEW_LIMIT);
      return acc;
    },
    {} as Record<BlogCategory, typeof posts>
  );

  const hasAnyPosts = BLOG_CATEGORY_LIST.some((key) => postsByCategory[key].length > 0);
  if (!hasAnyPosts) {
    return null;
  }

  return (
    <section
      className="border-b border-violet-200/50 bg-white py-12 sm:py-16 lg:py-20"
      aria-labelledby="home-blog-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
          Blog
        </p>
        <h2
          id="home-blog-heading"
          className="mx-auto mt-2 max-w-3xl text-center font-display text-3xl font-semibold tracking-tight text-slate-900 text-balance sm:text-4xl"
        >
          Jobs, tips & Q&A
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-slate-600">
          Latest job openings, interview prep tips, and common interview questions.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {BLOG_CATEGORY_LIST.map((key) => (
            <HomeBlogCategoryColumn
              key={key}
              category={key}
              posts={postsByCategory[key]}
            />
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link href="/blog" className="btn-secondary inline-block px-8 py-3 text-sm">
            View all blog posts
          </Link>
        </p>
      </div>
    </section>
  );
}

function HomeBlogCategoryColumn({
  category,
  posts,
}: {
  category: BlogCategory;
  posts: {
    id: string;
    title: string;
    slug: string;
    category: string;
    createdAt: Date;
  }[];
}) {
  const meta = BLOG_CATEGORIES[category];

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-semibold text-slate-900">
            {meta.label}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">{meta.shortLabel}</p>
        </div>
        <Link
          href={`/blog?tab=${category}`}
          className="shrink-0 text-xs font-semibold text-violet-600 hover:underline"
        >
          All →
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Coming soon.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {posts.map((p) => (
            <li key={p.id}>
              <BlogPostCard
                slug={p.slug}
                title={p.title}
                category={p.category}
                createdAt={p.createdAt}
                showBadge={false}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
