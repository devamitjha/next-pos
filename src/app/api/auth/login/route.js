import axios from "axios";
import qs from "qs";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req) {
  const { agentCode, password } = await req.json();

  if (!agentCode || !password) {
    return NextResponse.json(
      { message: "Agent code and password required" },
      { status: 400 }
    );
  }

  try {
    const data = qs.stringify({
      username: agentCode,
      password: password,
      grant_type: "password",
      client_id: "api_access",
      scope: "openid offline_access",
    });

    const response = await axios.post(
      "https://lucira.live.ornaverse.in/connect/token",
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    // 🔐 Create session JWT
    const token = await new SignJWT({
      sub: agentCode,
      access_token: response.data.access_token,
    })
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
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
