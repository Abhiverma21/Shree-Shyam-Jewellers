import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// ✅ Replace this with your admin email
const ADMIN_EMAIL = "abhishekjbverma@gmail.com";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // ===============================
  // 🧩 1️⃣ Protect Admin Routes
  // ===============================
  if (pathname.startsWith("/admin")) {
    console.log("🛡️ Admin route requested:", pathname);

    if (!token) {
      console.warn("❌ No token found, redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      console.log("✅ JWT Verified Payload:", payload);

      if (!payload.email) {
        console.warn("⚠️ Token payload missing email");
        return NextResponse.redirect(new URL("/login", req.url));
      }

      if (payload.email !== ADMIN_EMAIL) {
        console.warn(`🚫 Access denied for ${payload.email} (not admin)`);
        return NextResponse.redirect(new URL("/", req.url));
      }

      console.log("✅ Admin verified:", payload.email);
      return NextResponse.next();
    } catch (err) {
      console.error("❌ JWT verification failed:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ===============================
  // 👥 2️⃣ Protect User Routes (Cart / Orders / Checkout)
  // ===============================
  const protectedUserRoutes = ["/cart", "/orders", "/checkout"];

  if (protectedUserRoutes.some((path) => pathname.startsWith(path))) {
    if (!token) {
      console.warn("🔒 User not logged in — redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret); // only verify, no need for admin check
      console.log("✅ User verified, access granted:", pathname);
      return NextResponse.next();
    } catch (err) {
      console.error("❌ JWT verification failed (user routes):", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow all other routes
  return NextResponse.next();
}

// ✅ Apply middleware to admin + user protected routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/cart/:path*",
    "/orders/:path*",
    "/checkout/:path*",
  ],
};
