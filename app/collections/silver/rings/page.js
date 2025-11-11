"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SilverRings() {
  const [filter, setFilter] = useState("all");
  const [rings, setRings] = useState([]);
  const router = useRouter();

  // 🟢 Fetch Silver Rings
  useEffect(() => {
    async function fetchRings() {
      try {
        const res = await fetch(`/api/products/silver?category=ring`);
        const data = await res.json();
        if (data.success) {
          setRings(data.products);
        } else {
          console.error("Failed to fetch rings:", data.message);
        }
      } catch (err) {
        console.error("Error fetching rings:", err);
      }
    }
    fetchRings();
  }, []);

  // 🟡 Filter by subcategory (Ladies / Gents)
  const filteredRings =
    filter === "all"
      ? rings
      : rings.filter((item) => {
          const sc = (item.subCategory || item.subcategory || "").toLowerCase();
          return sc === filter.toLowerCase();
        });

  // 🟢 Navigate to product detail
  const handleViewDetails = (item) => {
    localStorage.setItem("selectedProduct", JSON.stringify(item));
    router.push(`/product/${item._id}`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 md:px-6 py-12 md:py-16 relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10 md:mb-12">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          💍 Elegant Silver Rings Collection 💍
        </motion.h1>
        <motion.p
          className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Discover our <strong>Ladies</strong> and <strong>Gents Rings</strong> — handcrafted in pure 925 Silver, a perfect blend of timeless charm and modern artistry.
        </motion.p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {["all", "ladies", "gents"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full border font-medium text-sm md:text-base transition-all ${
              filter === cat
                ? "bg-gray-700 text-white border-gray-700"
                : "bg-white text-gray-700 border-gray-500 hover:bg-gray-100"
            }`}
          >
            {cat === "all"
              ? "All Rings"
              : cat === "ladies"
              ? "Ladies Rings"
              : "Gents Rings"}
          </button>
        ))}
      </div>

      {/* Rings Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredRings.length > 0 ? (
          filteredRings.map((item) => (
            <motion.div
              key={item._id}
              className="bg-white/90 backdrop-blur-sm shadow-md rounded-xl p-3 md:p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col items-center"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 md:h-48 object-cover rounded-lg"
              />
              <h3 className="text-sm md:text-base font-semibold text-gray-800 mt-2 text-center">
                {item.name}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">{item.purity}</p>
              <p className="text-sm md:text-base font-bold text-gray-700 mt-1">
                ₹{item.price}
              </p>
              <button
                onClick={() => handleViewDetails(item)}
                className="mt-2 w-full bg-gray-700 text-white py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-800 transition-all"
              >
                View Details
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No rings found in database for the selected filter.
          </p>
        )}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12">
        <motion.a
          href="/collection/silver"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-gray-700 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg text-sm md:text-base"
        >
          ← Back to Silver Collection
        </motion.a>
      </div>
    </section>
  );
}
