import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth-http";
import { prisma } from "@/lib/prisma";
import { resolveUniqueBlogSlug } from "@/lib/unique-blog-slug";
import { isBlogCategory } from "@/lib/blog-categories";

function parseCategory(value: unknown): string {
  const raw = String(value ?? "interview-tips").trim();
  return isBlogCategory(raw) ? raw : "interview-tips";
}

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(blogs);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const content = String(body.content ?? "").trim();
  const slugInput = String(body.slug ?? "").trim() || undefined;
  const category = parseCategory(body.category);

  if (!title || !content) {
    return NextResponse.json({ error: "title and content are required" }, { status: 400 });
  }

  const slug = await resolveUniqueBlogSlug(title, slugInput);

  try {
    const created = await prisma.blog.create({
      data: { title, slug, content, category },
    });
    return NextResponse.json(created);
  } catch (e) {
    console.error("[POST /api/blogs]", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: `Could not create post: ${msg}` }, { status: 400 });
  }
}
