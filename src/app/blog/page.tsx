import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: { id: string; title: string; slug: string; createdAt: Date }[] = [];
  try {
    posts = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, slug: true, createdAt: true },
    });
  } catch {
    posts = [];
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-slate-900 dark:text-slate-100">
        Blog
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Articles and interview prep tips from JobPrepNotes.
      </p>
      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">
          No posts yet. Check back soon — or browse our{" "}
          <Link href="/products" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
            interview notes
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-10 space-y-4">
          {posts.map((p) => (
            <li key={p.id}>
              <Link
                href={`/blog/${p.slug}`}
                className="block rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-violet-200 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:border-violet-800"
              >
                <span className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {p.title}
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  {p.createdAt.toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
