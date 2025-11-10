"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EarringsPage() {
  const [filter, setFilter] = useState("all");
  const [selectedEarring, setSelectedEarring] = useState(null);

  const earrings = [
    { id: 1, name: "Elegant Stud Earrings", image: "/images/earrings/earring1.jpg", price: "₹9,499", category: "ladies", purity: "925 Sterling Silver", description: "Classic stud earrings in 925 sterling silver, perfect for daily wear." },
    { id: 2, name: "Diamond Hoop Earrings", image: "/images/earrings/earring2.jpg", price: "₹14,999", category: "ladies", purity: "925 Sterling Silver", description: "Sparkling diamond hoop earrings crafted in sterling silver for elegance." },
    { id: 3, name: "Men's Silver Studs", image: "/images/earrings/earring3.jpg", price: "₹12,499", category: "gents", purity: "925 Sterling Silver", description: "Sleek stud earrings for men made in 925 sterling silver." },
    { id: 4, name: "Floral Drop Earrings", image: "/images/earrings/earring4.jpg", price: "₹11,999", category: "ladies", purity: "925 Sterling Silver", description: "Delicate floral drop earrings in sterling silver." },
    { id: 5, name: "Geometric Men's Hoops", image: "/images/earrings/earring5.jpg", price: "₹13,499", category: "gents", purity: "925 Sterling Silver", description: "Modern geometric hoop earrings for men." },
    { id: 6, name: "Pearl Silver Earrings", image: "/images/earrings/earring6.jpg", price: "₹10,999", category: "ladies", purity: "925 Sterling Silver", description: "Elegant pearl-studded earrings in 925 sterling silver." },
  ];

  const filteredEarrings = filter === "all" ? earrings : earrings.filter((item) => item.category === filter);

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
          ✨ Exquisite Silver Earrings Collection ✨
        </motion.h1>
        <motion.p
          className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Explore our exclusive range of <strong>Ladies Earrings</strong> and <strong>Gents Earrings</strong> crafted in 925 sterling silver — perfect for elegance and sophistication.
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
                ? "bg-gray-600 text-white border-gray-600"
                : "bg-white text-gray-700 border-gray-500 hover:bg-gray-100"
            }`}
          >
            {cat === "all" ? "All Earrings" : cat === "ladies" ? "Ladies Earrings" : "Gents Earrings"}
          </button>
        ))}
      </div>

      {/* Earrings Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredEarrings.map((item) => (
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
            <h3 className="text-sm md:text-base font-semibold text-gray-800 mt-2 text-center">{item.name}</h3>
            <p className="text-gray-600 text-xs md:text-sm">{item.purity}</p>
            <p className="text-sm md:text-base font-bold text-gray-700 mt-1">{item.price}</p>
            <button
              onClick={() => setSelectedEarring(item)}
              className="mt-2 w-full bg-gray-600 text-white py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-700 transition-all"
            >
              View Details
            </button>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedEarring && (
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
              {/* Close Button */}
              <button
                onClick={() => setSelectedEarring(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg md:text-xl"
              >
                ✕
              </button>

              {/* Product Details */}
              <img
                src={selectedEarring.image}
                alt={selectedEarring.name}
                className="w-full h-48 md:h-64 object-cover rounded-lg mb-3 md:mb-4"
              />
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{selectedEarring.name}</h2>
              <p className="text-gray-600 text-sm md:text-base mb-1">{selectedEarring.purity}</p>
              <p className="text-gray-700 text-sm md:text-base mb-3">{selectedEarring.description}</p>
              <p className="text-lg md:text-2xl font-bold text-gray-700 mb-4">{selectedEarring.price}</p>
              <button
                onClick={() => alert("Added to Wishlist!")}
                className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all text-sm md:text-base"
              >
                Add to Wishlist 💛
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
