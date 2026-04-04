import axios from "axios";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

/* ================= GET CATEGORIES ================= */
export async function GET(req) {
  // 🔐 Read session cookie
  const session = req.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  let accessToken;

  try {
    const { payload } = await jwtVerify(
      session,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    accessToken = payload.access_token;
  } catch {
    return NextResponse.json(
      { message: "Invalid session" },
      { status: 401 }
    );
  }

  try {
    const body = {
      Take: 0, // 0 usually means fetch all
    };

    const response = await axios.post(
      "https://lucira.live.ornaverse.in/Services/Master/Type/List",
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const categories = response.data?.Entities || [];

    return NextResponse.json({
      total: categories.length,
      categories,
    });

  } catch (error) {
    console.error(
      "Category API error:",
      error?.response?.data || error.message
    );

    return NextResponse.json(
      { message: "Failed to load categories" },
      { status: 500 }
    );
  }
}