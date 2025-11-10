import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { GoldProduct, SilverProduct, DiamondProduct } from "@/models/ProductModels";

// GET handler - fetch all products or filter by metal
export async function GET(req) {
  try {
    await connectDB();
    console.log("✅ DB connected, fetching products...");

    // Get all products from all collections
    const [goldProducts, silverProducts, diamondProducts] = await Promise.all([
      GoldProduct.find().lean(),
      SilverProduct.find().lean(),
      DiamondProduct.find().lean()
    ]);

    const allProducts = [
      ...goldProducts.map(p => ({ ...p, metal: 'gold' })),
      ...silverProducts.map(p => ({ ...p, metal: 'silver' })),
      ...diamondProducts.map(p => ({ ...p, metal: 'diamond' }))
    ];

    console.log(`📦 Found ${allProducts.length} products`);
    return NextResponse.json({ 
      success: true, 
      products: allProducts 
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" }, 
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    console.log("🟡 Incoming product data:", data);

    const { metal } = data;
    if (!metal) {
      return NextResponse.json({ error: "Metal type missing" }, { status: 400 });
    }

    let Model;
    switch (metal.toLowerCase()) {
      case "gold":
        Model = GoldProduct;
        break;
      case "silver":
        Model = SilverProduct;
        break;
      case "diamond":
        Model = DiamondProduct;
        break;
      default:
        return NextResponse.json({ error: "Invalid metal type" }, { status: 400 });
    }

    const product = new Model(data);
    await product.save();

    console.log("✅ Product saved:", product);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("❌ Error in POST /api/products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
