import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InstagramLinkButton } from "@/components/blog/InstagramLinkButton";
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
  let post: { title: string; content: string; createdAt: Date } | null = null;
  try {
    post = await prisma.blog.findUnique({
      where: { slug: params.slug },
    });
  } catch {
    post = null;
  }
  if (!post) notFound();

  return (
    <main className="bg-white">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <Link
          href="/blog"
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          ← All posts
        </Link>

        <header className="mt-6 border-b border-slate-100 pb-6">
          <time
            className="text-xs font-medium uppercase tracking-wide text-violet-600"
            dateTime={post.createdAt.toISOString()}
          >
            {post.createdAt.toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <InstagramLinkButton label="Follow us on Instagram" />
          </div>
        </header>

        <div className="blog-prose mt-8 whitespace-pre-wrap text-base leading-[1.8] text-slate-700">
          {post.content}
        </div>

        <footer className="mt-12 space-y-6 border-t border-slate-100 pt-8">
          <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-6 text-center">
            <p className="font-display text-lg font-semibold text-slate-900">
              Want full interview notes?
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Structured PDF kits for coding, system design, and role-specific prep.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
            >
              Browse products
            </Link>
          </div>
          <InstagramLinkButton label="Follow JobPrepNotes on Instagram" />
        </footer>
      </article>
    </main>
  );
}
