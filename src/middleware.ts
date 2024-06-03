import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const userToken = request.cookies.get("userToken")?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/login" && userToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!userToken && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (userToken && pathname === "/") {
    return NextResponse.next();
  }

  // Allow the request to continue for other cases
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
