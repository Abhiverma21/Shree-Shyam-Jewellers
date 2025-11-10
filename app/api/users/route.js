import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/UserModel";
import { jwtVerify } from "jose";

const ADMIN_EMAIL = "abhishekjbverma@gmail.com"; // your admin email

async function verifyAdmin(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);

  if (payload.email !== ADMIN_EMAIL) {
    throw new Error("Access denied");
  }

  return payload;
}

export async function GET(req) {
  try {
    await connectDB();
    await verifyAdmin(req); // ✅ req is now defined

    // Fetch all users except their password
    const users = await User.find().select("-password");

    return NextResponse.json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
