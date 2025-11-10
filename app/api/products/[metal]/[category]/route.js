import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/ProductModels";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { metal, category } = params;
    const products = await Product.find({ metal, category });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
