"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SilverRingsPage() {
  const [filter, setFilter] = useState("all");
  const [selectedRing, setSelectedRing] = useState(null);

  const rings = [
    { id: 1, name: "Elegant Floral Ring", image: "/silver/rings/ring1.jpg", price: "₹1,499", category: "ladies", purity: "92.5% Silver", description: "A delicate floral design ring handcrafted in pure silver, perfect for daily wear or parties." },
    { id: 2, name: "Classic Men's Band", image: "/silver/rings/ring2.jpg", price: "₹1,999", category: "gents", purity: "92.5% Silver", description: "A sleek men's silver band with polished finish — timeless elegance." },
    { id: 3, name: "Oxidized Silver Ring", image: "/silver/rings/ring3.jpg", price: "₹2,499", category: "ladies", purity: "92.5% Silver", description: "Intricately oxidized silver ring giving a vintage look." },
    { id: 4, name: "Minimalist Band", image: "/silver/rings/ring4.jpg", price: "₹1,299", category: "gents", purity: "92.5% Silver", description: "Minimalist silver band suitable for everyday elegance." },
    { id: 5, name: "Gemstone Silver Ring", image: "/silver/rings/ring5.jpg", price: "₹2,999", category: "ladies", purity: "92.5% Silver", description: "Silver ring with embedded gemstone for sparkle and style." },
    { id: 6, name: "Designer Silver Band", image: "/silver/rings/ring6.jpg", price: "₹3,499", category: "gents", purity: "92.5% Silver", description: "Modern designer silver ring for men who like bold style." },
    { id: 7, name: "Pearl Silver Ring", image: "/silver/rings/ring7.jpg", price: "₹2,199", category: "ladies", purity: "92.5% Silver", description: "Elegant pearl-studded silver ring for special occasions." },
    { id: 8, name: "Textured Silver Band", image: "/silver/rings/ring8.jpg", price: "₹2,799", category: "gents", purity: "92.5% Silver", description: "Textured silver band with a modern touch for men." },
  ];

  const filteredRings =
    filter === "all" ? rings : rings.filter((item) => item.category === filter);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 md:px-6 py-12 md:py-16 relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10 md:mb-12">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-700 mb-3 md:mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ✨ Exquisite Silver Rings Collection ✨
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Explore our timeless <strong>Ladies Silver Rings</strong> and <strong>Gents Silver Bands</strong>, crafted with precision and elegance.
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
                : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
            }`}
          >
            {cat === "all" ? "All Rings" : cat === "ladies" ? "Ladies Rings" : "Gents Rings"}
          </button>
        ))}
      </div>

      {/* Rings Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredRings.map((item) => (
          <motion.div
            key={item.id}
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
            <h3 className="text-sm md:text-base font-semibold text-gray-700 mt-2 text-center">{item.name}</h3>
            <p className="text-gray-500 text-xs md:text-sm">{item.purity}</p>
            <p className="text-gray-500 text-xs md:text-sm mt-1">{item.weight}</p>
            <p className="text-sm md:text-base font-bold text-gray-800 mt-1">{item.price}</p>
            <button
              onClick={() => setSelectedRing(item)}
              className="mt-2 w-full bg-gray-700 text-white py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-800 transition-all"
            >
              View Details
            </button>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedRing && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg p-5 md:p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setSelectedRing(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg md:text-xl"
              >
                ✕
              </button>

              <img
                src={selectedRing.image}
                alt={selectedRing.name}
                className="w-full h-48 md:h-64 object-cover rounded-lg mb-3 md:mb-4"
              />
              <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-1">{selectedRing.name}</h2>
              <p className="text-gray-600 text-sm md:text-base mb-1">{selectedRing.purity}</p>
              <p className="text-gray-500 text-sm md:text-base mb-1">Weight: {selectedRing.weight}</p>
              <p className="text-gray-700 text-sm md:text-base mb-3">{selectedRing.description}</p>
              <p className="text-lg md:text-2xl font-bold text-gray-800 mb-4">{selectedRing.price}</p>
              <button
                onClick={() => alert("Added to Wishlist!")}
                className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all text-sm md:text-base"
              >
                Add to Wishlist 💍
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <div className="text-center mt-12">
        <motion.a
          href="/collections/silver"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-gray-700 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg text-sm md:text-base"
        >
          ← Back to Silver Collection
        </motion.a>
      </div>
    </section>
  );
}
