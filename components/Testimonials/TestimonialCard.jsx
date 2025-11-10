"use client";
import React from "react";
import { motion } from "framer-motion";

export default function TestimonialCard({ name, city, text, rating }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 text-center border border-yellow-100"
    >
      {/* Star Rating */}
      <div className="text-yellow-500 text-xl mb-3">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 italic mb-4 leading-relaxed">
        “{text}”
      </p>

      {/* Customer Name & City */}
      <h3 className="text-yellow-700 font-semibold text-lg">{name}</h3>
      <p className="text-gray-500 text-sm">{city}</p>
    </motion.div>
  );
}
