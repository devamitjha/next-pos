import axios from "axios";
import { NextResponse } from "next/server";
import { getORNToken } from "@/lib/ornTokenService";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const token = await getORNToken();

    const res = await axios.post(
      "https://lucira.live.ornaverse.in/Services/POS/SchemeEnrollment/Create",
      {
        Entity: body    // 🚨 THIS IS THE CRITICAL FIX
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return NextResponse.json(res.data);
  } catch (err) {
    console.error("ORN CREATE ERROR:", err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || "Enrollment creation failed" },
      { status: err.response?.status || 500 }
    );
  }
}
