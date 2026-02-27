import axios from "axios";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function POST(req) {
  const token = req.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const accessToken = payload.access_token;

    const response = await axios.post(
      "https://lucira.live.ornaverse.in/Services/Administration/Stores/GetUserStores",
      { Take: 0 },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch stores" },
      { status: 401 }
    );
  }
}
