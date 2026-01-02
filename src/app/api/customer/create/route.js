export const runtime = "nodejs";

import axios from "axios";
import { NextResponse } from "next/server";
import { getORNToken } from "@/lib/ornTokenService";

export async function POST(req) {
  try {
    const body = await req.json();
    const token = await getORNToken();

    const res = await axios.post(
      "https://lucira.uat.ornaverse.in/Services/MarketPlace/Customer/Generate",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json(
      { error: err.response?.data || "Customer create failed" },
      { status: err.response?.status || 500 }
    );
  }
}
