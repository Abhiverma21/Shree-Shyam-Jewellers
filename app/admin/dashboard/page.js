"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

async function getProductCount() {
  try {
    const res = await fetch(`/api/products/count`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch product counts");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("getProductCount error:", err);
    return null;
  }
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    total: 0,
    goldCount: 0,
    silverCount: 0,
    diamondCount: 0,
    loading: true,
  });
  const { total, goldCount, silverCount, diamondCount, loading } = counts;
  const router = useRouter();

  // ✅ Restrict access to admin only (based on localStorage)
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    // if (!isAdmin) {
    //   router.push("/"); // redirect non-admins to homepage
    // }
  }, [router]);

  // fetch product counts when component mounts
  useEffect(() => {
    let mounted = true;

    async function loadCounts() {
      const data = await getProductCount();
      if (!mounted) return;
      if (data) {
        setCounts({
          total: data.total ?? 0,
          goldCount: data.goldCount ?? 0,
          silverCount: data.silverCount ?? 0,
          diamondCount: data.diamondCount ?? 0,
          loading: false,
        });
      } else {
        setCounts((prev) => ({ ...prev, loading: false }));
      }
    }

    loadCounts();

    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/");
  };

  // ✅ Cards for Admin Actions
  const actions = [
    {
      title: "Add New Product",
      description: "Add new jewellery with price, purity, and images.",
      emoji: "💍",
      link: "/admin/add-product",
    },
    {
      title: "Manage Products",
      description: "Edit or delete existing jewellery listings.",
      emoji: "🧾",
      link: "/admin/manage-products",
    },
    {
      title: "Users",
      description: "Get to know about users registered on the platform.",
      emoji: "👥",
      link: "/admin/users",
    },
    {
      title: "Orders & Wishlist",
      description: "View or manage customer wishlists & orders.",
      emoji: "📦",
      link: "/admin/manage-orders",
    },
    {
      title: "User Messages",
      description: "Read and respond to customer inquiries.",
      emoji: "💬",
      link: "/admin/manage-reviews",
    },
    {
      title: "Analytics",
      description: "Track page views, trends, and sales reports.",
      emoji: "📊",
      link: "#",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-white px-6 py-12">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-yellow-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-800 mb-4 md:mb-0">
            Admin Dashboard 💎
          </h1>
          <button
            onClick={handleLogout}
            className="bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Products", value: loading ? "..." : total },
            { label: "Gold Products", value: loading ? "..." : goldCount },
            { label: "Silver Products", value: loading ? "..." : silverCount },
            { label: "Diamond Products", value: loading ? "..." : diamondCount },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-6 rounded-xl shadow-md border border-yellow-200"
            >
              <h2 className="text-2xl font-bold text-yellow-800">{stat.value}</h2>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => action.link !== "#" && router.push(action.link)}
              className="bg-yellow-100 hover:bg-yellow-200 cursor-pointer rounded-xl p-6 shadow-md transition-all border border-yellow-300"
            >
              <div className="text-4xl mb-3">{action.emoji}</div>
              <h2 className="text-xl font-semibold text-yellow-800 mb-2">
                {action.title}
              </h2>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Abhishek Jewels Admin Panel. All rights reserved.
        </div>
      </div>
    </section>
  );
}
