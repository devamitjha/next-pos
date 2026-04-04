import axios from "axios";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

/* ================= GET PRODUCTS ================= */
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 0);
  const limit = Number(searchParams.get("limit") || 16);
  const typeId = searchParams.get("t");
  const skip = page * limit;

  // 🔐 Read session cookie
  const session = req.cookies.get("session")?.value;
  const companyId = req.cookies.get("company_id")?.value;

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let accessToken;

  try {
    const { payload } = await jwtVerify(
      session,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    accessToken = payload.access_token;
  } catch {
    return NextResponse.json({ message: "Invalid session" }, { status: 401 });
  }

  try {
    /* ================= PRODUCT CATALOG ================= */
    const body = {
      Take: limit,
      Skip: skip,
      current_company_id: companyId ? Number(companyId) : null,
      show_out_of_stock: false,
    };

    if (typeId && typeId !== "40") { // 40 is "All" in the layout
      body.type_id = Number(typeId);
    }

    const productRes = await axios.post(
      "https://lucira.live.ornaverse.in/Services/Inventory/ProductCatalog/List",
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const products = productRes.data?.Entities || [];
    const totalCount = productRes.data?.TotalCount || 0;

    // 💰 Add mock price if missing (starting from 5000)
    const productsWithPrice = products.map((p) => ({
      ...p,
      price: p.price || (5000 + (p.item_id % 10000)),
    }));

    return NextResponse.json({
      page,
      limit,
      totalCount,
      hasMore: products.length === limit,
      products: productsWithPrice,
    });

  } catch (error) {
    console.error("Product API error:", error?.response?.data || error.message);
    return NextResponse.json(
      { message: "Failed to load products" },
      { status: 500 }
    );
  }
}
