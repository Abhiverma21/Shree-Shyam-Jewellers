"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Gallery() {
  const [current, setCurrent] = useState(0);

  // Placeholder images — replace later
const images = [
  "/homeimage/pic1.jpg",
  "/homeimage/pic2.jpg",
  "/homeimage/pic3.jpg",
  "/homeimage/pic4.jpg",
  "/homeimage/pic5.jpg",
  "/homeimage/pic6.jpg",
  "/homeimage/pic7.jpg",
  
];
  // Auto change every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-4">
            Discover the Art of Ornamentation
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
            Every ornament tells a story — of elegance, purity, and timeless
            beauty. Our handcrafted{" "}
            <span className="text-amber-700 font-medium">gold</span> and{" "}
            <span className="text-gray-500 font-medium">silver</span> pieces
            blend traditional artistry with modern sophistication.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            From delicately carved bangles to radiant pendants, each design is
            made to celebrate life’s precious moments with unmatched finesse.
          </p>

          <div className="mt-8">
            <a
              href="/collections/gold"
              className="inline-block bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 text-gray-900 font-semibold py-3 px-6 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
            >
              View Complete Gallery
            </a>
          </div>
        </div>

        {/* Right Carousel Section */}
        <div className="flex-1 w-full relative overflow-hidden rounded-3xl shadow-xl bg-white ring-1 ring-amber-100">
  {/* Image Carousel Placeholder */}
  <Image
    src={images[current]} // ✅ use your uploaded image path
    alt={`Gallery image ${current + 1}`}
    loading="lazy"
    height={600}
    width={700}
    className="w-full h-[500px] object-cover rounded-3xl transition-transform duration-500 ease-in-out"
  />



          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-md backdrop-blur-sm transition"
            aria-label="Previous image"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-md backdrop-blur-sm transition"
            aria-label="Next image"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-amber-500 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to image ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
