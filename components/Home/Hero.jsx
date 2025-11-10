"use client";
import React from "react";

export default function Hero() {
  return (
    <section
      className="relative w-full h-[65vh] sm:h-[90vh] md:h-[80vh] flex items-center justify-start px-6 sm:px-10 md:px-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/homeimage/herobanner.jpg')", // 🔹 Update this image later
      }}
      role="region"
      aria-label="Hero Banner - Signature Jewellery Collection"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 md:bg-black/50 backdrop-blur-[1px]"
        aria-hidden="true"
      ></div>

      {/* Content Section */}
      <div className="relative z-10 max-w-3xl text-left text-white space-y-5">
        {/* Tagline */}
        <p className="inline-block text-xs sm:text-sm uppercase tracking-widest bg-amber-100/20 text-amber-200 px-4 py-1 rounded-full backdrop-blur-sm shadow-sm">
          Signature Piece
        </p>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-2xl">
          <span className="block">Where Elegance</span>
          <span className="block text-amber-300">Meets Tradition</span>
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-base md:text-lg text-gray-100/90 max-w-xl leading-relaxed">
          Discover our timeless collection of handcrafted jewellery — from
          intricate gold bangles to dazzling diamond sets. A perfect blend of
          heritage and modern artistry.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
          <a
            href="/collection"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-gray-900 font-semibold py-3 px-7 rounded-full shadow-lg hover:scale-105 transform transition duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Explore Collection
          </a>

          <a
            href="/contact"
            className="text-sm sm:text-base text-white/90 underline underline-offset-4 hover:text-white transition"
          >
            Visit Store
          </a>
        </div>

        {/* Bottom Features */}
        <div className="hidden sm:flex flex-wrap gap-10 pt-12">
          {/* Feature 1 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center backdrop-blur-sm">
              <svg
                className="w-6 h-6 text-amber-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 3l2.09 4.26L19 8.27l-3.5 3.41.82 4.77L12 15.77 7.68 16.05l.82-4.77L4.99 8.27l4.91-.01L12 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-amber-100">
                Certified Craftsmanship
              </p>
              <p className="text-xs text-gray-200">
                Hallmarked gold & conflict-free diamonds
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center backdrop-blur-sm">
              <svg
                className="w-6 h-6 text-amber-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 21v-2a4 4 0 00-3-3.87M4 21v-2a4 4 0 013-3.87M12 3v18M12 3L4 9m8-6l8 6" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-amber-100">
                Exclusive Designs
              </p>
              <p className="text-xs text-gray-200">
                Custom jewellery crafted for every occasion
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
