/* eslint-disable @next/next/no-server-import-in-page */
// import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Authentication by JWT
  let token = request.cookies.get("token")?.value;
  if (!token) {
    // TODO: cross-domainでcookieを使える状態にできていないため、一時的に無効化
    console.log("no token");
    // return NextResponse.redirect(new URL("/signin", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/documents/:path*", "/document/:path*"],
};
