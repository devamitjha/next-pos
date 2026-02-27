import axios from "axios";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

/* ================= GET PRODUCTS ================= */
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 0);
  const limit = Number(searchParams.get("limit") || 20);
  const skip = page * limit;

  // 🔐 Read session cookie
  const session = req.cookies.get("session")?.value;
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
    /* ================= PRODUCTS ================= */
    const productRes = await axios.post(
      "https://lucira.live.ornaverse.in/Services/Master/Style/GetDesigns",
      { Take: limit, Skip: skip },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const products = productRes.data.Entities || [];

    /* ================= MERGE DATA ================= */
    const enrichedProducts = await Promise.all(
      products.map(async (product) => {
        let reviews = { count: 0, average: 0, stats: [] };
        let images = [];

        if (product.external_product_id) {
          /* ---------- Reviews ---------- */
          try {
            const reviewRes = await axios.get(
              "https://platform.nector.io/api/v2/merchant/reviews",
              {
                params: {
                  reference_product_id: product.external_product_id,
                },
                headers: {
                  "x-apikey": process.env.NECTOR_API_KEY,
                  "x-source": "mobile",
                  "x-workspaceid": process.env.NECTOR_WORKSPACE_ID,
                },
              }
            );

            const reviewData = reviewRes.data.data;
            reviews = {
              count: reviewData.count || 0,
              stats: reviewData.stats || [],
              average: calculateAverage(reviewData.stats),
            };
          } catch {
            // safe fail
          }

          /* ---------- Images ---------- */
          try {
            const imgRes = await axios.get(
              `https://luciraonline.myshopify.com/admin/api/2025-10/products/${product.external_product_id}/images.json`,
              {
                headers: {
                  "X-Shopify-Access-Token":
                    process.env.SHOPIFY_ADMIN_TOKEN,
                },
              }
            );
            images = imgRes.data.images || [];
          } catch {
            // safe fail
          }
        }

        return {
          ...product,
          reviews,
          images,
        };
      })
    );

    return NextResponse.json({
      page,
      limit,
      hasMore: products.length === limit,
      products: enrichedProducts,
    });
  } catch (error) {
    console.error("Product API error:", error);
    return NextResponse.json(
      { message: "Failed to load products" },
      { status: 500 }
    );
  }
}

/* ⭐ Average rating helper */
const calculateAverage = (stats = []) => {
  let total = 0;
  let count = 0;

  stats.forEach((s) => {
    total += Number(s.rating) * Number(s.count);
    count += Number(s.count);
  });

  return count ? Number((total / count).toFixed(1)) : 0;
};
