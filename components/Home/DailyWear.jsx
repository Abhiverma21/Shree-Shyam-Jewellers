"use client";
import React from "react";
import Image from "next/image";

export default function DailyWear() {
  const items = [
    {
      id: 1,
      title: "Gold Daily Wear",
      img: "/daily/daily1.jpg", // 🔸 replace with your actual image path
    },
    {
      id: 2,
      title: "Office Elegance",
      img: "/daily/daily2.jpg",
    },
    {
      id: 3,
      title: "Minimal Diamonds",
      img: "/daily/daily3.jpg",
    },
     {
      id: 3,
      title: "Minimal Diamonds",
      img: "/daily/daily3.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      {/* Left Side: Cards — show 2 per row on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-2xl shadow-lg"
          >
            <Image
              src={item.img}
              alt={item.title}
              width={400}
              height={400}
              className="w-full h-40 sm:h-[220px] md:h-[280px] lg:h-[380px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold tracking-wide">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side: Text Section */}
      <div className="flex flex-col justify-center text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-800 leading-tight">
          Everyday Luxury — Effortlessly Elegant ✨
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Discover our curated *Daily Wear Collection* — lightweight designs
          crafted for modern comfort and timeless grace. Whether you’re heading
          to work, a coffee meet, or a festive gathering, these pieces add a
          touch of subtle brilliance to your everyday style.
        </p>
        <p className="mt-2 text-gray-500 text-sm">
          Explore the blend of simplicity and sophistication that defines
          today’s confident woman.
        </p>

        <a
          href="/collection/daily-wear"
          className="inline-block mt-6 bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-3 rounded-full shadow-md transition-transform duration-300 hover:scale-105 w-fit mx-auto lg:mx-0"
        >
          Explore Collection
        </a>
      </div>
    </section>
  );
}
