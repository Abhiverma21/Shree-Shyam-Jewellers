import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { GoldProduct, SilverProduct, DiamondProduct } from "@/models/ProductModels";

export async function GET() {
  try {
    await connectDB();

    const goldCount = await GoldProduct.countDocuments();
    const silverCount = await SilverProduct.countDocuments();
    const diamondCount = await DiamondProduct.countDocuments();

    const total = goldCount + silverCount + diamondCount;

    return NextResponse.json({
      success: true,
      goldCount,
      silverCount,
      diamondCount,
      total,
    });
  } catch (error) {
    console.error("❌ Error fetching product counts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
