import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const session = req.cookies.get("session")?.value;
  const store = req.cookies.get("store")?.value;

  // 🔴 NOT LOGGED IN → ONLY "/" ALLOWED
  if (!session) {
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 🔐 VERIFY SESSION
  try {
    await jwtVerify(
      session,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
  } catch {
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.set("session", "", { maxAge: 0, path: "/" });
    res.cookies.set("store", "", { maxAge: 0, path: "/" });
    return res;
  }

  // 🟡 LOGGED IN BUT STORE NOT SELECTED → ONLY "/store"
  if (!store) {
    if (pathname !== "/store") {
      return NextResponse.redirect(new URL("/store", req.url));
    }
    return NextResponse.next();
  }

  // 🟢 LOGGED IN + STORE SELECTED → BLOCK "/" & "/store"
  if (pathname === "/" || pathname === "/store") {
    return NextResponse.redirect(new URL("/jewellery", req.url));
  }

  return NextResponse.next();
}
