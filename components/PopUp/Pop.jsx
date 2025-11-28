"use client";
import { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [show, setShow] = useState(false);

  // Show popup after small delay
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-5 sm:p-8 text-center relative border border-yellow-200">
        
        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-700 mb-2">
          Welcome to Shyam Jewellers ✨
        </h2>

        {/* Subtitle */}
        <p className="text-gray-700 text-sm sm:text-base mb-3">
          Crafting timeless{" "}
          <span className="font-semibold text-yellow-700">
            gold, silver, and diamond
          </span>{" "}
          jewellery that adds sparkle to every occasion.
        </p>

        {/* Info Line */}
        <p className="text-gray-600 text-sm sm:text-base mb-4">
          Every piece is{" "}
          <span className="font-medium text-yellow-700">BIS Hallmarked</span> and made
          with purity, passion, and precision.
        </p>

        {/* Contact Info */}
        <div className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
          📞 +91-9896416786 <br className="sm:hidden" /> 🏪 Sector-3,Kurukshetra
        </div>

        {/* Button */}
        <a
          href="/collections/gold"
          className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-full font-semibold text-sm sm:text-base transition"
        >
          Explore Collections
        </a>
      </div>
    </div>
  );
}
