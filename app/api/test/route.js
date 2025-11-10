import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return new Response("✅ MongoDB connection successful!");
  } catch (error) {
    return new Response("❌ Database connection failed!", { status: 500 });
  }
}
