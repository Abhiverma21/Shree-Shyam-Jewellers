"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CoinsPage() {
  const [filter, setFilter] = useState("all");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch("/api/products/gold?category=coin");
        const data = await res.json();
        if (data.success) setCoins(data.products || []);
        else setCoins([]);
      } catch (err) {
        console.error("Error fetching coins:", err);
        setCoins([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  // normalize backend field name: accept subCategory or subcategory
  const filteredCoins =
    filter === "all"
      ? coins
      : coins.filter((item) => {
          const sc = (item.subCategory || item.subcategory || "").toString().toLowerCase();
          return sc === filter.toLowerCase();
        });

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-white px-4 md:px-6 py-12 md:py-16 relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10 md:mb-12">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-yellow-800 mb-3 md:mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ✨ Exquisite Gold Coins Collection ✨
        </motion.h1>
        <motion.p
          className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Explore our exclusive range of <strong>Gold Coins</strong> for gifting, investment, and auspicious occasions.
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
                ? "bg-yellow-600 text-white border-yellow-600"
                : "bg-white text-yellow-700 border-yellow-500 hover:bg-yellow-100"
            }`}
          >
            {cat === "all" ? "All Coins" : cat === "ladies" ? "Ladies Coins" : "Gents Coins"}
          </button>
        ))}
      </div>

      {/* Coins Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredCoins.length > 0 ? (
          filteredCoins.map((item) => (
            <motion.div
              key={item._id || item.id}
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
              <h3 className="text-sm md:text-base font-semibold text-yellow-800 mt-2 text-center">{item.name}</h3>
              <p className="text-gray-600 text-xs md:text-sm">{item.purity}</p>
              <p className="text-gray-500 text-xs md:text-sm">{item.weight}</p>
              <p className="text-sm md:text-base font-bold text-yellow-700 mt-1">{item.price}</p>
              <button
                onClick={() => {
                  localStorage.setItem("selectedProduct", JSON.stringify(item));
                  router.push(`/product/${item._id || item.id}`);
                }}
                className="mt-2 w-full bg-yellow-600 text-white py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-yellow-700 transition-all"
              >
                View Details
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No coins found for this category.</p>
        )}
      </div>

      {/* Popup removed: navigation goes to product page on View Details */}

      {/* CTA Section */}
      <div className="text-center mt-12">
        <motion.a
          href="/collections/gold"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-yellow-700 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg text-sm md:text-base"
        >
          ← Back to Gold Collection
        </motion.a>
      </div>
    </section>
  );
}
