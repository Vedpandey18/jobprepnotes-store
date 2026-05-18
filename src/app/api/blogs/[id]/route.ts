import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth-http";
import { prisma } from "@/lib/prisma";
import { resolveUniqueBlogSlug } from "@/lib/unique-blog-slug";

type Ctx = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: Ctx) {
  try {
    const b = await prisma.blog.findUnique({ where: { id: params.id } });
    if (!b) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(b);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 503 });
  }
}

export async function PUT(request: NextRequest, { params }: Ctx) {
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

  if (!title || !content) {
    return NextResponse.json({ error: "title and content are required" }, { status: 400 });
  }

  const slug = await resolveUniqueBlogSlug(title, slugInput, { excludeBlogId: params.id });

  try {
    const updated = await prisma.blog.update({
      where: { id: params.id },
      data: { title, slug, content },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error("[PUT /api/blogs]", e);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    await prisma.blog.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
