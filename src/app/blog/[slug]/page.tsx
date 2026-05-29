import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCategoryBadge } from "@/components/blog/BlogCategoryBadge";
import { LinkedInShareButton } from "@/components/blog/LinkedInShareButton";
import { prisma } from "@/lib/prisma";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await prisma.blog.findUnique({
      where: { slug: params.slug },
      select: { title: true, content: true },
    });
    if (!post) return { title: "Post" };
    const description = post.content
      .slice(0, 160)
      .replace(/\s+/g, " ")
      .trim();
    return {
      title: post.title,
      description: description || undefined,
      openGraph: {
        title: post.title,
        type: "article",
        description: description || undefined,
      },
    };
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  let post: { title: string; content: string; category: string; createdAt: Date } | null = null;
  try {
    post = await prisma.blog.findUnique({
      where: { slug: params.slug },
    });
  } catch {
    post = null;
  }
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
      >
        ← All posts
      </Link>
      <article className="mt-8">
        <BlogCategoryBadge category={post.category} />
        <h1 className="mt-3 font-display text-3xl font-semibold text-slate-900 dark:text-slate-100">
          {post.title}
        </h1>
        <p className="mt-2 text-xs text-slate-500">
          {post.createdAt.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="mt-6">
          <LinkedInShareButton path={`/blog/${params.slug}`} />
        </div>
        <div className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
          {post.content}
        </div>
      </article>
    </main>
  );
}
