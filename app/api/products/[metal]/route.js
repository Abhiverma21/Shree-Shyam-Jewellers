import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import {
  GoldProduct,
  SilverProduct,
  DiamondProduct,
} from "@/models/ProductModels";

export async function GET(_req, { params }) {
  try {
    await connectDB();

    const { metal } = await params;
    // Support optional category query param to filter by category stored in DB
    const url = new URL(_req.url);
    const category = url.searchParams.get("category");

    let products = [];
    let count = 0;

    // Use case-insensitive, partial match for category
    const categoryFilter = category ? { category: { $regex: category, $options: "i" } } : {};

    if (metal === "gold") {
      products = await GoldProduct.find(categoryFilter);
      count = await GoldProduct.countDocuments(categoryFilter);
    } else if (metal === "silver") {
      products = await SilverProduct.find(categoryFilter);
      count = await SilverProduct.countDocuments(categoryFilter);
    } else if (metal === "diamond") {
      products = await DiamondProduct.find(categoryFilter);
      count = await DiamondProduct.countDocuments(categoryFilter);
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid metal type (use gold, silver, or diamond)" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      metal,
      count,
      products,
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
