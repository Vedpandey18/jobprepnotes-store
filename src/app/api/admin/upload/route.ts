import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/admin-auth-http";

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
  const safe = original.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  const name = `${Date.now()}-${safe}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(safe) || "";
  const finalName = ext ? name : `${name}.bin`;
  const full = path.join(dir, finalName);
  await writeFile(full, buf);

  return NextResponse.json({ url: `/uploads/${finalName}` });
}
