import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/admin-token";

export async function requireAdmin(
  request: NextRequest
): Promise<NextResponse | null> {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const p = await verifyAdminToken(token);
    if (p.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return null;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
