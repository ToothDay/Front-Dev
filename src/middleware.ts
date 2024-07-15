import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwtToken");
  if (!token) {
    return NextResponse.redirect(new URL("/welcome/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/my-page/:path*", "/medical/:path*", "/my-activity/:path*"]
};
