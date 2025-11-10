import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { GoldProduct, SilverProduct, DiamondProduct } from "@/models/ProductModels";

export async function DELETE(request, { params }) {
  const { metal, id } = params;
  await connectDB();
  let Model;
  if (metal === "gold") Model = GoldProduct;
  else if (metal === "silver") Model = SilverProduct;
  else if (metal === "diamond") Model = DiamondProduct;
  else
    return NextResponse.json({ success: false, message: "Invalid metal" }, { status: 400 });

  await Model.findByIdAndDelete(id);
  return NextResponse.json({ success: true, message: "Product deleted" });
}

export async function PUT(request, { params }) {
  const { metal, id } = params;
  const body = await request.json();
  await connectDB();

  let Model;
  if (metal === "gold") Model = GoldProduct;
  else if (metal === "silver") Model = SilverProduct;
  else if (metal === "diamond") Model = DiamondProduct;
  else
    return NextResponse.json({ success: false, message: "Invalid metal" }, { status: 400 });

  const updated = await Model.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({ success: true, product: updated });
}
