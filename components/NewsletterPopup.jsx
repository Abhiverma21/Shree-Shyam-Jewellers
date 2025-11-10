"use client";
import React, { useState, useEffect } from "react";

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);

  // Show popup automatically after 3 seconds (once per session)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("newsletterShown")) {
        setShow(true);
        sessionStorage.setItem("newsletterShown", "true");
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className={`
        fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 
        bg-white border border-amber-300 rounded-2xl shadow-2xl 
        w-[90%] sm:w-96 p-5 transition-all duration-500 animate-fadeIn
        ${window?.innerWidth < 640 ? "left-1/2 -translate-x-1/2" : ""}
      `}
    >
      {/* Close button */}
      <button
        onClick={() => setShow(false)}
        className="absolute top-2 right-3 text-gray-500 hover:text-amber-700 text-lg font-bold"
      >
        ×
      </button>

      {/* Title */}
      <h3 className="text-xl font-semibold text-amber-700 mb-2 text-center sm:text-left">
        Stay in Touch ✨
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 text-center sm:text-left">
        Be the first to know about our latest collections and gold updates.
      </p>

      {/* Input + Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thank you for subscribing!");
          setShow(false);
        }}
        className="flex flex-col sm:flex-row items-center gap-2"
      >
        <input
          type="email"
          required
          placeholder="Your Email"
          className="w-full px-3 py-2 text-sm border border-amber-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:ring-2 focus:ring-amber-400 outline-none"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
