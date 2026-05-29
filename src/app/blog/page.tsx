import type { Metadata } from "next";
import Link from "next/link";
import { InstagramLinkButton } from "@/components/blog/InstagramLinkButton";
import { excerpt } from "@/lib/blog-utils";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Interview prep tips, coding round advice, and career guidance from JobPrepNotes.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: { id: string; title: string; slug: string; content: string; createdAt: Date }[] =
    [];
  try {
    posts = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, slug: true, content: true, createdAt: true },
    });
  } catch {
    posts = [];
  }

  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-gradient-to-b from-violet-50/70 to-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
            JobPrepNotes Blog
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Interview prep tips & guides
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Practical articles on coding interviews, system design, and job search — written for
            students and working professionals in India.
          </p>
          <div className="mt-6">
            <InstagramLinkButton />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-slate-600">No posts yet. Check back soon.</p>
            <Link
              href="/products"
              className="mt-4 inline-flex rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110"
            >
              Browse interview notes
            </Link>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-1">
            {posts.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md sm:p-6"
                >
                  <time
                    className="text-xs font-medium uppercase tracking-wide text-violet-600"
                    dateTime={p.createdAt.toISOString()}
                  >
                    {p.createdAt.toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 font-display text-xl font-semibold text-slate-900 group-hover:text-violet-700 sm:text-2xl">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {excerpt(p.content)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600">
                    Read article
                    <span className="transition group-hover:translate-x-0.5" aria-hidden>
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 rounded-2xl border border-violet-100 bg-violet-50/60 p-6 text-center sm:p-8">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Ready to prepare with structured notes?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Download interview PDFs for Java, Data Engineering, Full Stack, and more.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:brightness-110"
          >
            View all products
          </Link>
        </div>
      </section>
    </main>
  );
}
