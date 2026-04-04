import { NextResponse } from "next/server";

export async function POST(req) {
  const { storeCode, companyId } = await req.json();

  if (!storeCode) {
    return NextResponse.json({ message: "Store required" }, { status: 400 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("store", storeCode, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  if (companyId) {
    res.cookies.set("company_id", String(companyId), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
  }

  return res;
}
