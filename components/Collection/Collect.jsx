"use client";
import React from "react";
import Image from "next/image";

export default function Collect() {
  const products = [
    {
      id: 1,
      name: "Gold Floral Necklace Set",
      price: "₹ 58,999",
      image: "/newarrival/new1.jpg", // replace later
    },
    {
      id: 2,
      name: "Elegant Diamond Ring",
      price: "₹ 34,499",
      image: "/newarrival/new2.jpg",
    },
    {
      id: 3,
      name: "Silver Crystal Bangles",
      price: "₹ 12,999",
      image: "/newarrival/new3.jpg",
    },
    {
      id: 4,
      name: "Traditional Kundan Earrings",
      price: "₹ 9,499",
      image: "/newarrival/new4.jpg",
    },
   
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-br from-white via-amber-50 to-amber-100 rounded-3xl shadow-sm mt-10">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-amber-800 tracking-wide">
          ✨ New Arrivals ✨
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Discover our latest handcrafted pieces — timeless beauty for every occasion.
        </p>
      </div>

  {/* Product Grid: base/mobile shows 2 columns */}
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-amber-100 transition-all duration-300 group overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                height={400}
                width={400}
                className="w-full h-40 sm:h-64 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                New
              </span>
            </div>

            {/* Product Info */}
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">Starting From</p>
              <p className="text-xl font-bold text-amber-700 mt-1">
                {product.price}
              </p>

              {/* Action Button: always visible on small screens, hover reveal on larger */}
              <button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300 col-span-full sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:translate-y-[-4px]">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <a
          href="/collections/gold"
          className="inline-block bg-amber-700 hover:bg-amber-800 text-white text-base font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
        >
          View All Products
        </a>
        <p className="mt-3 text-sm text-gray-500">
          Explore our complete range of fine jewelry and craftsmanship.
        </p>
      </div>
    </section>
  );
}
