import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const raw = req.cookies.get("pb_auth")?.value;
  if (!raw) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { token } = JSON.parse(decodeURIComponent(raw));
    // decode JWT payload — just check expiry, signature verified by FastAPI
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (Date.now() / 1000 > payload.exp) throw new Error("expired");
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
