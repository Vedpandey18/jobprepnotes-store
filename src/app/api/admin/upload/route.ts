import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";
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

  const ct = request.headers.get("content-type") ?? "";

  if (ct.includes("application/json")) {
    try {
      const body = await request.json();
      const response = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async () => ({
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "application/pdf",
          ],
          maximumSizeInBytes: 100 * 1024 * 1024,
        }),
        onUploadCompleted: async () => {},
      });
      return NextResponse.json(response);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload handler error";
      return NextResponse.json({ error: msg }, { status: 400 });
    }
  }

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
