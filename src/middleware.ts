import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

function secretKey() {
  const raw =
    process.env.ADMIN_JWT_SECRET ||
    "dev-insecure-default-change-me-32chars-minimum-x";
  return new TextEncoder().encode(raw);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname === "/admin/") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token")?.value;
    if (token) {
      try {
        await jwtVerify(token, secretKey());
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch {
        /* not logged in */
      }
    }
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  try {
    await jwtVerify(token, secretKey());
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
