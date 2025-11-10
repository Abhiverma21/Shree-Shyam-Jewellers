"use client";
import Link from "next/link";
import React from "react";

export default function AllCard() {
  const jewelleryItems = [
    { id: 1, name: "Gold Bangles", image: "/images/jewellery1.jpg", href: "/collections/gold/bangles" },
    { id: 2, name: "Diamond Ring", image: "/images/jewellery2.jpg", href: "/collections/diamond/" },
    { id: 3, name: "Silver Earrings", image: "/images/jewellery3.jpg", href: "/collections/silver/earrings" },
    { id: 4, name: "Gold Necklace", image: "/images/jewellery4.jpg", href: "/collections/gold/necklaces" },
    { id: 5, name: "Traditional Anklet", image: "/images/jewellery5.jpg", href: "/collections/silver/anklets" },
    { id: 6, name: "Pearl Pendant", image: "/images/jewellery6.jpg", href: "/product/6" },
    { id: 7, name: "Silver Bracelet", image: "/images/jewellery7.jpg", href: "/product/7" },
    { id: 8, name: "Gemstone Ring", image: "/images/jewellery8.jpg", href: "/collections/gold/rings" },
    { id: 9, name: "Choker Necklace", image: "/images/jewellery9.jpg", href: "/collections/silver/necklaces" },
    { id: 10, name: "Kundan Earrings", image: "/images/jewellery10.jpg", href: "/collections/gold/earrings" },
    { id: 11, name: "Gold Chain", image: "/images/jewellery11.jpg", href: "/collections/gold/chain" },
    { id: 12, name: "Diamond Bracelet", image: "/images/jewellery12.jpg", href: "/collections/diamond/bracelet" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-center text-yellow-700 font-semibold mb-12">
          Our Jewellery Collection
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 h-full w-full">
          {jewelleryItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group block text-center bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Image placeholder for now */}
              <div className="w-full h-28 md:h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="py-2">
                <p className="text-sm font-medium text-gray-800 group-hover:text-yellow-700 transition-colors duration-300">
                  {item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
