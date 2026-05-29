import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_LIST,
  isBlogCategory,
  type BlogCategory,
} from "@/lib/blog-categories";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog",
  description: "Jobs, interview tips, and Q&A from JobPrepNotes.",
};

export const dynamic = "force-dynamic";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  createdAt: Date;
};

type Props = {
  searchParams: { tab?: string };
};

export default async function BlogPage({ searchParams }: Props) {
  const activeTab = isBlogCategory(searchParams.tab) ? searchParams.tab : null;

  let posts: BlogPost[] = [];

  try {
    posts = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, slug: true, category: true, createdAt: true },
    });
  } catch {
    posts = [];
  }

  const filteredPosts = activeTab
    ? posts.filter((p) => p.category === activeTab)
    : posts;

  const postsByCategory = BLOG_CATEGORY_LIST.reduce(
    (acc, key) => {
      acc[key] = posts.filter((p) => p.category === key);
      return acc;
    },
    {} as Record<BlogCategory, BlogPost[]>
  );

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-slate-900">Blog</h1>
      <p className="mt-4 text-slate-600">
        Jobs, interview tips, and Q&A — all in one place.
      </p>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Blog categories">
        <TabLink href="/blog" active={!activeTab} label="All" />
        {BLOG_CATEGORY_LIST.map((key) => (
          <TabLink
            key={key}
            href={`/blog?tab=${key}`}
            active={activeTab === key}
            label={BLOG_CATEGORIES[key].label}
          />
        ))}
      </nav>

      {!activeTab ? (
        <div className="mt-10 space-y-14">
          {BLOG_CATEGORY_LIST.map((key) => (
            <BlogCategorySection
              key={key}
              category={key}
              posts={postsByCategory[key]}
            />
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <EmptyPosts activeTab={activeTab} />
      ) : (
        <ul className="mt-8 space-y-4">
          {filteredPosts.map((p) => (
            <li key={p.id}>
              <BlogPostCard
                slug={p.slug}
                title={p.title}
                category={p.category}
                createdAt={p.createdAt}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function BlogCategorySection({
  category,
  posts,
}: {
  category: BlogCategory;
  posts: BlogPost[];
}) {
  const meta = BLOG_CATEGORIES[category];

  return (
    <section id={category} aria-labelledby={`blog-section-${category}`}>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h2
            id={`blog-section-${category}`}
            className="font-display text-xl font-semibold text-slate-900"
          >
            {meta.label}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{meta.shortLabel}</p>
        </div>
        {posts.length > 0 && (
          <Link
            href={`/blog?tab=${category}`}
            className="text-sm font-semibold text-violet-600 hover:underline"
          >
            View all →
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          No {meta.label.toLowerCase()} posts yet.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {posts.slice(0, 5).map((p) => (
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

      {posts.length > 5 && (
        <p className="mt-4">
          <Link
            href={`/blog?tab=${category}`}
            className="text-sm font-medium text-violet-600 hover:underline"
          >
            + {posts.length - 5} more in {meta.label}
          </Link>
        </p>
      )}
    </section>
  );
}

function EmptyPosts({ activeTab }: { activeTab: BlogCategory }) {
  return (
    <p className="mt-10 text-sm text-slate-500">
      No posts in {BLOG_CATEGORIES[activeTab].label} yet. Browse our{" "}
      <Link href="/products" className="font-medium text-violet-600 hover:underline">
        interview notes
      </Link>
      .
    </p>
  );
}

function TabLink({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-violet-600 text-white shadow-sm"
          : "border border-slate-200 bg-white text-slate-700 hover:border-violet-200 hover:text-violet-700"
      }`}
    >
      {label}
    </Link>
  );
}
