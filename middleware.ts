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
  matcher: [
    /*
     * Match all request paths except for:
     * 1. The login path
     * 2. Any path that starts with `/api` (API routes)
     * 3. Any path that starts with `/_next` (Next.js internals)
     * 4. Any path that starts with `/static` (static files)
     */
    "/((?!login|community(|/.*)|api|_next/static|_next/image|favicon.ico).*)"
  ]
};
