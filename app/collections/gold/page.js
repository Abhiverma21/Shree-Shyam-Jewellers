"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function GoldCollection() {
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const element = document.querySelector("#categories");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const categories = [
    { name: "Rings", image: "/goldpage/rings.webp", link: "/collections/gold/rings" },
    { name: "Necklaces", image: "/goldpage/necklaces.jpg", link: "/collections/gold/necklaces" },
    { name: "Earrings", image: "/goldpage/earrings.webp", link: "/collections/gold/earrings" },
    { name: "Bangles", image: "/goldpage/bangles.webp", link: "/collections/gold/bangles" },
    { name: "Mangalsutra", image: "/goldpage/mangalsutra.jpg", link: "/collections/gold/mangalsutra" },
    { name: "Anklets", image: "/goldpage/anklet.webp", link: "/collections/gold/anklets" },
    { name: "Pendants", image: "/goldpage/pendent.jpg", link: "/collections/gold/pendants" },
    { name: "Coins", image: "/goldpage/coins.jpg", link: "/collections/gold/coins" },
  ];

  const highlights = [
    { title: "BIS Hallmarked Purity", desc: "Every piece of gold we craft is BIS certified, assuring the highest standards of purity and trust." },
    { title: "Exquisite Craftsmanship", desc: "From traditional Kundan work to modern designs, our artisans bring your dream jewellery to life." },
    { title: "Trusted Legacy", desc: "Serving generations with honesty and elegance — where trust meets timeless designs." },
  ];

  const trending = [
    { name: "Royal Bridal Necklace", image: "/goldpage/bridal.jpg", price: "₹ 1,45,000" },
    { name: "Diamond-Studded Kada", image: "/goldpage/diamond.webp", price: "₹ 89,999" },
    { name: "Temple Design Earrings", image: "/goldpage/temple.jpg", price: "₹ 24,500" },
  ];

  return (
    <main className="bg-gradient-to-br from-white via-amber-50 to-amber-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] flex justify-center items-center overflow-hidden">
        <Image
          src="/goldpage/banner2.jpeg"
          alt="Gold Collection Banner"
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-300 drop-shadow-lg">
            The Gold Collection
          </h1>
          <p className="text-white text-base md:text-lg mt-3 max-w-2xl">
            Discover the elegance of pure gold — crafted to celebrate every emotion, every moment, and every relationship.
          </p>
          <Link
            href="#categories"
            onClick={handleSmoothScroll}
            className="mt-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition"
          >
            Explore Categories ↓
          </Link>
        </div>
      </section>

      {/* About / Brand Story */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold text-amber-800 mb-4 md:mb-6">
          Crafted with Purity, Designed with Passion
        </h2>
        <p className="text-gray-700 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto">
          At <span className="font-semibold text-amber-700">Shyam Jewellers</span>, gold is not just a metal — it’s an emotion.
          Each ornament is a masterpiece that carries the warmth of tradition and the touch of modern elegance.
          Our commitment to quality and authenticity makes every piece a timeless treasure.
        </p>
      </section>

      {/* Highlights */}
      <section className="bg-white py-10 md:py-12 border-t border-b border-amber-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-4 md:px-6 text-center">
          {highlights.map((item) => (
            <div key={item.title} className="p-4 md:p-6 bg-amber-50 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg md:text-xl font-semibold text-amber-800 mb-2 md:mb-3">{item.title}</h3>
              <p className="text-gray-700 text-xs md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section id="categories" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-amber-800 mb-8 md:mb-10">
          Explore by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.link}
              className="group block bg-white rounded-2xl shadow-md hover:shadow-lg border border-amber-100 overflow-hidden transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={400}
                  height={400}
                  className="w-full h-40 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="text-white text-sm md:text-lg font-semibold">View {cat.name}</span>
                </div>
              </div>
              <div className="p-2 md:p-4 text-center">
                <h3 className="text-sm md:text-lg font-semibold text-gray-800 group-hover:text-amber-700">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-gradient-to-r from-amber-100 to-amber-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-amber-800 mb-6 md:mb-8">
            Trending in Gold ✨
          </h2>
          <div className="grid grid-cols-2
           sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trending.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-amber-100 overflow-hidden transition"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-full h-40 md:h-64 object-cover"
                />
                <div className="p-2 md:p-5 text-center">
                  <h3 className="text-sm md:text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-amber-700 font-semibold text-xs md:text-base mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 md:py-16 bg-white border-t border-amber-200">
        <h3 className="text-xl md:text-2xl font-semibold text-amber-800">
          Experience the Gold Legacy
        </h3>
        <p className="text-gray-600 mt-2 md:mt-3 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
          Step into our store to witness our full collection — where artistry meets authenticity.
        </p>
        <Link
          href="/contact"
          className="bg-amber-700 hover:bg-amber-800 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 text-sm md:text-base"
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}
