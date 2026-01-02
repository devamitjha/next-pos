import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req) {
  const body = await req.json();

  const token = await new SignJWT(body)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  const res = NextResponse.json({ success: true });

  res.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return res;
}
