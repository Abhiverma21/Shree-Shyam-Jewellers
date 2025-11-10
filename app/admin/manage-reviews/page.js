"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ManageReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customer: "Shruti Sharma",
      product: "Floral Diamond Ring",
      rating: 5,
      comment: "Absolutely stunning! The craftsmanship is beautiful 💛",
      date: "2025-10-25",
      visible: true,
    },
    {
      id: 2,
      customer: "Riya Mehta",
      product: "Gold Chain Necklace",
      rating: 4,
      comment: "Looks elegant, but delivery was slightly delayed.",
      date: "2025-10-24",
      visible: true,
    },
    {
      id: 3,
      customer: "Anjali Verma",
      product: "Bridal Set",
      rating: 5,
      comment: "Perfect set for my wedding day! Thank you ✨",
      date: "2025-10-22",
      visible: false,
    },
  ]);

  const toggleVisibility = (id) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, visible: !review.visible } : review
      )
    );
  };

  const deleteReview = (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews((prev) => prev.filter((review) => review.id !== id));
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-6 md:p-10">
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-yellow-800 mb-6">
          ⭐ Manage Customer Reviews
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-yellow-100">
              <tr>
                <th className="px-4 py-3 text-left text-yellow-900 font-semibold">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-yellow-900 font-semibold">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-yellow-900 font-semibold">
                  Rating
                </th>
                <th className="px-4 py-3 text-left text-yellow-900 font-semibold">
                  Comment
                </th>
                <th className="px-4 py-3 text-left text-yellow-900 font-semibold">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-yellow-900 font-semibold">
                  Visibility
                </th>
                <th className="px-4 py-3 text-left text-yellow-900 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review, index) => (
                <tr
                  key={review.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-white" : "bg-yellow-50"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {review.customer}
                  </td>
                  <td className="px-4 py-3">{review.product}</td>
                  <td className="px-4 py-3 text-yellow-600 font-semibold">
                    {"⭐".repeat(review.rating)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{review.comment}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {review.date}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        review.visible
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {review.visible ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => toggleVisibility(review.id)}
                      className="text-sm text-yellow-700 hover:underline"
                    >
                      {review.visible ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
