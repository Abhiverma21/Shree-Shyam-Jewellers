"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MangalsutraCollection() {
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products/gold?category=mangalsutra");
        const data = await res.json();
        if (!mounted) return;
        if (data && data.success) setProducts(data.products || []);
        else setProducts([]);
      } catch (err) {
        console.error("Error fetching mangalsutra products:", err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  // normalize backend field name: accept subCategory or subcategory
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((item) => {
          const sc = (item.subCategory || item.subcategory || "").toString().toLowerCase();
          return sc === filter.toLowerCase();
        });

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-amber-100 py-14 px-4 sm:px-6 md:px-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-2xl mx-auto mb-10 md:mb-16 px-2"
      >
        <h1 className="text-3xl md:text-5xl font-semibold text-amber-800 mb-3 md:mb-4 leading-tight">
          💫 Gold Mangalsutra Collection 💫
        </h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
          Explore <span className="text-amber-700 font-medium">30+ elegant designs</span> — handcrafted to
          reflect love, tradition, and modern artistry.
        </p>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              key={product._id || product.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg border border-amber-100 transition-all duration-300 group overflow-hidden"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              viewport={{ once: true }}
            >
              {/* Product Image */}
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  height={300}
                  width={300}
                  className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-t-xl sm:rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-amber-700 text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                  New
                </span>
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4 text-center">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Starting From</p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-amber-700 mt-1">
                  {product.price}
                </p>

                <button
                  onClick={() => {
                    localStorage.setItem("selectedProduct", JSON.stringify(product));
                    router.push(`/product/${product._id || product.id}`);
                  }}
                  className="mt-3 sm:mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-md transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mt-14 md:mt-20 px-4"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-amber-800">
          Explore More Gold Collections
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Earrings, Rings, Bangles, Necklaces, and more — crafted with love and precision.
        </p>
        <a
          href="/collections/gold"
          className="inline-block mt-5 bg-amber-700 hover:bg-amber-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105" 
        >
          Back to Gold Collection
        </a>
      </motion.div>
    </section>
  );
}
