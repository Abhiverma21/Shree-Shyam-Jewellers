import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { GoldProduct, SilverProduct, DiamondProduct } from "@/models/ProductModels";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { metal, category } = params;

    // Select model based on metal type
    let Product;
    if (metal.toLowerCase() === "gold") {
      Product = GoldProduct;
    } else if (metal.toLowerCase() === "silver") {
      Product = SilverProduct;
    } else if (metal.toLowerCase() === "diamond") {
      Product = DiamondProduct;
    } else {
      return NextResponse.json({ success: false, message: "Invalid metal type" }, { status: 400 });
    }

    const products = await Product.find({ category });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
