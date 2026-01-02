import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const config = {
  matcher: ["/profile/:path*", "/enroll/:path*", "/payment/:path*", "/success/:path*"],
};

export async function middleware(req) {
  const token = req.cookies.get("session")?.value;

  // 🚫 No cookie → redirect immediately
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    // ✅ Session valid
    return NextResponse.next();
  } catch (e) {
    // ❌ Expired or tampered token → destroy cookie & redirect
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.set("session", "", { maxAge: 0, path: "/" });
    return res;
  }
}
