import axios from "axios";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(req, { params }) {
  const { id } = await params;

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
    /* ================= PRODUCT RETRIEVE ================= */
    const body = {
      entityId: Number(id)
    };

    const productRes = await axios.post(
      "https://lucira.live.ornaverse.in/Services/Master/Items/Retrieve",
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const product = productRes.data?.Entity;

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // 💰 Add mock price if missing
    product.price = product.price || (5000 + (product.item_id % 10000));

    // 🛍️ Fetch Shopify Images if external_product_id exists
    if (product.external_product_id) {
      try {
        const shopifyQuery = `
          query {
            product(id: "gid://shopify/Product/${product.external_product_id}") {
              images(first: 10) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        `;

        const shopifyRes = await fetch(
          `https://${process.env.SHOPIFY_STORE}/admin/api/2025-10/graphql.json`,
          {
            method: "POST",
            headers: {
              "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_TOKEN,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: shopifyQuery }),
            cache: "no-store",
          }
        );

        const shopifyJson = await shopifyRes.json();
        if (shopifyJson.data?.product?.images?.edges) {
          product.shopify_images = shopifyJson.data.product.images.edges.map(edge => ({
            url: edge.node.url,
            alt: edge.node.altText
          }));
        }
      } catch (shopError) {
        console.error("Shopify fetch error:", shopError.message);
        // Continue without shopify images if it fails
      }
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error("Product Detail API error:", error?.response?.data || error.message);
    return NextResponse.json(
      { message: "Failed to load product detail" },
      { status: 500 }
    );
  }
}
