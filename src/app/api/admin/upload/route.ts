import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/admin-auth-http";

function safeFilename(original: string) {
  const safe = original.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  const ext = path.extname(safe) || "";
  const name = `${Date.now()}-${safe}`;
  return ext ? name : `${name}.bin`;
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof Blob) || file.size === 0) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  const original = (form.get("filename") as string) || "upload";
  const finalName = safeFilename(original);
  const buf = Buffer.from(await file.arrayBuffer());
  const contentType = file.type || undefined;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/${finalName}`, buf, {
      access: "public",
      contentType,
      addRandomSuffix: false,
    });
    return NextResponse.json({ url: blob.url });
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, finalName), buf);

  return NextResponse.json({ url: `/uploads/${finalName}` });
}
