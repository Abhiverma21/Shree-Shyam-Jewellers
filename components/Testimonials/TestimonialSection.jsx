"use client";
import React from "react";
import TestimonialCard from "./TestimonialCard";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Riya Sharma",
      city: "Delhi",
      text: "I bought a gold necklace for my wedding from Shyam Jewellers, and it was absolutely stunning!",
      rating: 5,
    },
    {
      name: "Manish Verma",
      city: "Gurugram",
      text: "They customized a silver bracelet perfectly and delivered on time!",
      rating: 5,
    },
    {
      name: "Sneha Kapoor",
      city: "Panipat",
      text: "Beautiful diamond earrings and great purity guarantee.",
      rating: 5,
    },
    {
      name: "Sneha Kapoor",
      city: "Panipat",
      text: "Beautiful diamond earrings and great purity guarantee.",
      rating: 5,
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-[#f9f9f9]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-yellow-700 mb-3">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Hear from our happy customers who trusted Shyam Jewellers for their
          most precious moments.
        </p>
      </motion.div>

      {/* Grid of Testimonials */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-7xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </motion.div>
    </section>
  );
}
