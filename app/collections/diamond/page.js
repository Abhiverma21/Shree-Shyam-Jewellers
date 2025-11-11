"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function DiamondCollection() {
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const element = document.querySelector("#categories");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const categories = [
    { name: "Rings", image: "/categories/diamond/rings.jpg", link: "/collections/diamond/rings" },
    { name: "Necklaces", image: "/categories/diamond/necklaces.jpg", link: "/collections/diamond/necklaces" },
    { name: "Earrings", image: "/categories/diamond/earrings.jpg", link: "/collections/diamond/earrings" },
    { name: "Bangles", image: "/categories/diamond/bangles.jpg", link: "/collections/diamond/bangles" },
    { name: "Pendants", image: "/categories/diamond/pendants.jpg", link: "/collections/diamond/pendants" },
    { name: "Bracelets", image: "/categories/diamond/bracelets.jpg", link: "/collections/diamond/bracelets" },
    { name: "Mangalsutra", image: "/categories/diamond/mangalsutra.jpg", link: "/collections/diamond/mangalsutra" },
    { name: "Coins", image: "/categories/diamond/coins.jpg", link: "/collections/diamond/coins" },
  ];

  const highlights = [
    { title: "Certified Diamonds", desc: "All our diamonds are certified with authenticity and purity guarantees." },
    { title: "Exquisite Craftsmanship", desc: "Master artisans create timeless designs that capture the brilliance of diamonds." },
    { title: "Premium Quality", desc: "Handpicked diamonds with exceptional sparkle and lasting elegance." },
  ];

  const trending = [
    { name: "Diamond Solitaire Ring", image: "/diamondtrending/trend1.jpg", price: "Coming Soon" },
    { name: "Diamond Pendant Necklace", image: "/diamondtrending/trend2.jpg", price: "Coming Soon" },
    { name: "Diamond Stud Earrings", image: "/diamondtrending/trend3.jpg", price: "Coming Soon" },
  ];

  return (
    <main className="bg-gradient-to-br from-white via-amber-50 to-amber-100 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[45vh] md:h-[65vh] flex justify-center items-center overflow-hidden rounded-b-3xl shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 opacity-60"></div>
        <Image
          src="/banners/diamondbanner.jpg"
          alt="Diamond Collection Banner"
          fill
          className="object-cover opacity-40 rounded-b-3xl"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center px-4 rounded-b-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
            The Diamond Collection
          </h1>
          <p className="text-amber-50 text-sm sm:text-base md:text-lg mt-2 max-w-xl">
            Discover the timeless brilliance of premium diamonds — crafted for those who appreciate perfection.
          </p>
          <Link
            href="#categories"
            onClick={handleSmoothScroll}
            className="mt-4 sm:mt-6 bg-amber-600 hover:bg-amber-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium shadow-lg transition transform hover:-translate-y-1 text-sm sm:text-base"
          >
            Explore Categories ↓
          </Link>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 text-center bg-amber-100 rounded-3xl -mt-8 shadow-lg border-2 border-amber-300">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900 mb-2">
          ✨ Coming Soon ✨
        </h2>
        <p className="text-amber-800 text-sm sm:text-base font-semibold">
          Our exquisite diamond collection is being crafted to perfection. Stay tuned for the grand launch!
        </p>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-800 mb-4 sm:mb-6">
          Crafted with Brilliance, Designed with Dreams
        </h2>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          At <span className="font-semibold text-amber-700">Shyam Jewellers</span>, diamonds represent more than precious stones — they symbolize love, commitment, and timeless beauty.
          Each diamond is meticulously selected and expertly crafted to bring you jewelry that sparkles with perfection.
        </p>
      </section>

      {/* Highlights */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10 px-4 sm:px-6 text-center">
          {highlights.map((item) => (
            <div key={item.title} className="p-4 sm:p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-sm sm:text-base border border-amber-100">
              <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-amber-800 mb-6 sm:mb-10">
          Explore by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group block bg-white rounded-2xl shadow-md hover:shadow-lg border border-amber-100 overflow-hidden transition transform hover:-translate-y-1 cursor-not-allowed opacity-75"
            >
              <div className="relative h-36 sm:h-40 md:h-56">
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-center text-xs sm:text-sm font-semibold px-2">
                    {cat.name}
                  </span>
                </div>
              </div>
              <div className="p-2 sm:p-4 text-center bg-amber-50">
                <h3 className="text-sm sm:text-base font-semibold text-amber-900">{cat.name}</h3>
                <p className="text-xs sm:text-sm text-amber-700 mt-1">Coming Soon</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-amber-800 mb-6 sm:mb-12">
            Featured Designs (Preview) ✨
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {trending.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-amber-100 overflow-hidden transition transform hover:-translate-y-1 opacity-75"
              >
                <div className="relative h-36 sm:h-40 md:h-64 bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center">
                  <span className="text-amber-900 text-xs sm:text-sm font-semibold text-center px-2">
                    {item.name}
                  </span>
                </div>
                <div className="p-2 sm:p-4 text-center bg-amber-50">
                  <h3 className="text-sm sm:text-base font-semibold text-amber-900">{item.name}</h3>
                  <p className="text-amber-700 font-semibold mt-1 text-xs sm:text-sm">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-500 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Be the First to Know! 💎
          </h3>
          <p className="text-amber-50 mb-6 sm:mb-8 text-sm sm:text-base">
            Subscribe to receive exclusive updates when our Diamond Collection launches with special launch offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm sm:text-base"
            />
            <button className="px-6 py-3 bg-white text-amber-600 font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105 text-sm sm:text-base whitespace-nowrap">
              Notify Me
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 sm:py-16 bg-white border-t border-amber-200">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-amber-800">
          Experience the Diamond Brilliance
        </h3>
        <p className="text-gray-600 mt-2 sm:mt-3 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Contact us for more information about our upcoming Diamond Collection — where elegance meets perfection.
        </p>
        <Link
          href="/contact"
          className="bg-amber-700 hover:bg-amber-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 text-sm sm:text-base"
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}
