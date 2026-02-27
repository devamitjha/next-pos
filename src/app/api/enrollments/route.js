import axios from "axios";
import { NextResponse } from "next/server";
import { getORNToken } from "@/lib/ornTokenService";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const party_id = searchParams.get("party_id");

    if (!party_id) {
      return NextResponse.json({ error: "party_id required" }, { status: 400 });
    }

    const token = await getORNToken();

    const res = await axios.post(
      "https://lucira.live.ornaverse.in/Services/POS/SchemeEnrollment/List",
      {
        Take: 0,
        party_id: Number(party_id),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || "Failed to fetch enrollments" },
      { status: err.response?.status || 500 }
    );
  }
}
