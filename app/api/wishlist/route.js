import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";
import { jwtVerify } from "jose";

// Helper: Extract and verify JWT from cookies
async function verifyUserFromCookie(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    throw new Error("No token found");
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return payload.id; // Returns user ID
}

export async function POST(req) {
  await connectDB();
  try {
    const userId = await verifyUserFromCookie(req);
    const body = await req.json();
    const { productId, productType } = body;

    // check if already in wishlist
    const exists = await Wishlist.findOne({ user: userId, product: productId });
    if (exists)
      return NextResponse.json({ message: "Already in wishlist" }, { status: 200 });

    const wishlistItem = await Wishlist.create({
      user: userId,
      product: productId,
      productType,
    });

    return NextResponse.json({ success: true, wishlistItem });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unauthorized or error adding to wishlist" }, { status: 401 });
  }
}

export async function GET(req) {
  await connectDB();
  try {
    const userId = await verifyUserFromCookie(req);

    const items = await Wishlist.find({ user: userId }).populate("product");
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unauthorized or failed to fetch wishlist" }, { status: 401 });
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { productId } = body;

    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = verifyJwt(token);

    await Wishlist.findOneAndDelete({ user: user.id, product: productId });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}
