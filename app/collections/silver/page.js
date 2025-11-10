"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function SilverCollection() {
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const element = document.querySelector("#categories");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const categories = [
    { name: "Rings", image: "/categories/silver/rings.jpg", link: "/collections/silver/rings" },
    { name: "Necklaces", image: "/categories/silver/necklaces.jpg", link: "/collections/silver/necklaces" },
    { name: "Earrings", image: "/categories/silver/earrings.jpg", link: "/collections/silver/earrings" },
    { name: "Bangles", image: "/categories/silver/bangles.jpg", link: "/collections/silver/bangles" },
    { name: "Pendants", image: "/categories/silver/pendants.jpg", link: "/collections/silver/pendants" },
    { name: "Coins", image: "/categories/silver/coins.jpg", link: "/collections/silver/coins" },
    { name: "Anklets", image: "/categories/silver/anklets.jpg", link: "/collections/silver/anklets" },
  ];

  const highlights = [
    { title: "92.5% Pure Silver", desc: "All our silver products are crafted with 92.5% purity, ensuring quality and shine." },
    { title: "Intricate Craftsmanship", desc: "Our artisans create stunning designs blending tradition and modern trends." },
    { title: "Affordable Elegance", desc: "Premium silver products at prices that celebrate every occasion." },
  ];

  const trending = [
    { name: "Silver Floral Necklace", image: "/silvertrending/trend1.jpg", price: "₹2,499" },
    { name: "Silver Hoop Earrings", image: "/silvertrending/trend2.jpg", price: "₹1,299" },
    { name: "Men's Silver Bracelet", image: "/silvertrending/trend3.jpg", price: "₹1,799" },
  ];

  return (
    <main className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[45vh] md:h-[65vh] flex justify-center items-center overflow-hidden rounded-b-3xl shadow-lg">
        <Image
          src="/banners/silverbanner.jpg"
          alt="Silver Collection Banner"
          fill
          className="object-cover opacity-90 rounded-b-3xl"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-100 drop-shadow-md">
            The Silver Collection
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg mt-2 max-w-xl">
            Explore the elegance of pure silver — crafted for every moment, celebration, and person.
          </p>
          <Link
            href="#categories"
            onClick={handleSmoothScroll}
            className="mt-4 sm:mt-6 bg-gray-700 hover:bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium shadow-lg transition transform hover:-translate-y-1 text-sm sm:text-base"
          >
            Explore Categories ↓
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center bg-gray-50 rounded-3xl -mt-12 shadow-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
          Crafted with Purity, Designed with Elegance
        </h2>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          At <span className="font-semibold text-gray-800">Shyam Jewellers</span>, silver is more than metal — it’s an expression of style and tradition.
          Each ornament reflects our passion for design, craftsmanship, and lasting quality.
        </p>
      </section>

      {/* Highlights */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10 px-4 sm:px-6 text-center">
          {highlights.map((item) => (
            <div key={item.title} className="p-4 sm:p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-sm sm:text-base">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-6 sm:mb-10">
          Explore by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-200 overflow-hidden transition transform hover:-translate-y-1"
            >
              <div className="relative h-36 sm:h-40 md:h-56">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
                />
              </div>
              <div className="p-2 sm:p-4 text-center">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-gray-700">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6 sm:mb-12">
            Trending in Silver ✨
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {trending.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-200 overflow-hidden transition transform hover:-translate-y-1"
              >
                <div className="relative h-36 sm:h-40 md:h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-2 sm:p-4 text-center">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-700 font-semibold mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 sm:py-16 bg-white border-t border-gray-200">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Experience the Silver Elegance
        </h3>
        <p className="text-gray-600 mt-2 sm:mt-3 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Visit our store or contact us to explore our complete silver collection — where elegance meets craftsmanship.
        </p>
        <Link
          href="/contact"
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 text-sm sm:text-base"
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}
