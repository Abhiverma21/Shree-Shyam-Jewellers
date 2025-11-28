"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  // 🧭 Fetch product data (from localStorage or backend)
  useEffect(() => {
    const stored = localStorage.getItem("selectedProduct");
    if (stored) {
      setProduct(JSON.parse(stored));
      setLoading(false);
    } else {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data?.product);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // 🧮 Rate Breakdown Calculation (use actual product data, not hardcoded values)
  const breakdown =
    product?.weight && product?.price
      ? (() => {
          // Use actual product metalRate, makingCharge, and gst from database
          const metalRate = product.metalRate || 7000; // fallback if not set
          const makingChargePercent = product.makingCharge || 10;
          const gstPercent = product.gst || 3;

          const metalValue = product.weight * metalRate;
          const makingCharges = (metalValue * makingChargePercent) / 100;
          const subtotal = metalValue + makingCharges;
          const gstAmount = (subtotal * gstPercent) / 100;
          const calculatedTotal = subtotal + gstAmount;

          return {
            metalRate,
            metalValue,
            makingCharges,
            makingChargePercent,
            gstAmount,
            gstPercent,
            subtotal,
            total: calculatedTotal,
            displayPrice: product.price, // actual stored price (may differ if recalculated on server)
          };
        })()
      : null;

  // 🛍 Handle Add to Wishlist
  const handleWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to add items to wishlist");
      return;
    }

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          productType: product.category || "GoldProduct",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setInWishlist(true);
        alert("💛 Added to Wishlist");
      } else {
        alert(data.message || "Failed to add to wishlist");
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
      alert("Something went wrong while adding to wishlist");
    }
  };

  // 🛒 Handle Buy Now
  const handleBuyNow = async () => {
    router.push(`/product/${product._id}/checkout`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-yellow-700 font-semibold">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found.
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-white px-6 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Product Section */}
        <div className="md:flex md:gap-10 p-6 md:p-12">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 flex justify-center items-center"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-[400px] md:h-[500px]"
              />
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:w-1/2 flex flex-col justify-between"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-800 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-1">{product.purity}</p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              <div className="text-3xl font-bold text-yellow-700 mb-4">
                ₹{product.price?.toLocaleString()}
              </div>

              {/* 💰 Rate Breakdown */}
              {breakdown && (
                <div className="bg-yellow-50 rounded-xl shadow-inner p-4 mb-6">
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="flex justify-between items-center w-full text-yellow-800 font-semibold text-sm md:text-base"
                  >
                    Price Breakdown
                    <span>{showBreakdown ? "▲" : "▼"}</span>
                  </button>
                  <AnimatePresence>
                    {showBreakdown && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-3 text-gray-700 text-sm space-y-1 border-t border-yellow-100 pt-3"
                      >
                        <div className="flex justify-between">
                          <span>Metal Value ({product.weight}g @ ₹{breakdown.metalRate}/g)</span>
                          <span>₹{breakdown.metalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Making Charges ({breakdown.makingChargePercent}%)</span>
                          <span>₹{breakdown.makingCharges.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>₹{breakdown.subtotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST ({breakdown.gstPercent}%)</span>
                          <span>₹{breakdown.gstAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-yellow-800 border-t border-yellow-200 pt-2">
                          <span>Final Price</span>
                          <span>₹{breakdown.displayPrice.toLocaleString()}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleWishlist}
                  disabled={inWishlist}
                  className={`${
                    inWishlist
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-yellow-600 hover:bg-yellow-700"
                  } text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md`}
                >
                  {inWishlist ? "❤️ In Wishlist" : "🤍 Add to Wishlist"}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-yellow-800 hover:bg-yellow-900 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => router.back()}
                className="text-yellow-700 hover:underline font-medium"
              >
                ← Back to Collection
              </button>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-gray-200 mt-4">
          <div className="px-6 md:px-12 py-8">
            <div className="flex space-x-6 border-b border-gray-200 mb-6 overflow-x-auto">
              {["description", "specs", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 capitalize font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-yellow-700 text-yellow-800"
                      : "text-gray-600 hover:text-yellow-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-700 space-y-2 leading-relaxed"
                >
                  <h3 className="font-semibold text-yellow-800">
                    Product Description
                  </h3>
                  <p>{product.description || "No description available."}</p>
                </motion.div>
              )}

              {activeTab === "specs" && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-700 space-y-3"
                >
                  <h3 className="font-semibold text-yellow-800">Specifications</h3>
                  {product.specifications?.length ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {product.specifications.map((spec, idx) => (
                        <li key={idx}>
                          <strong>{spec.label}:</strong> {spec.value}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No specifications available.</p>
                  )}
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-700"
                >
                  <h3 className="font-semibold text-yellow-800 mb-3">
                    Customer Reviews ({product.reviews?.length || 0})
                  </h3>
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((r, idx) => (
                      <div
                        key={idx}
                        className="border-b border-gray-200 py-4 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{r.user}</span>
                          <span className="text-xs text-gray-500">{r.date}</span>
                        </div>
                        <div className="text-yellow-600">
                          {"⭐".repeat(r.rating)}
                        </div>
                        <p>{r.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet. Be the first to review!</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
