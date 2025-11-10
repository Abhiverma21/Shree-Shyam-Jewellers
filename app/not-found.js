"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 overflow-hidden">
      {/* Soft glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#f9d976,#f39f86)] opacity-20 blur-3xl" />

      {/* 404 Number */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-[8rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400 drop-shadow-lg mb-2"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl font-semibold text-gray-800 mb-3"
      >
        Oops! Page Not Found
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-600 max-w-md text-center mb-8"
      >
        The page you’re looking for doesn’t exist or might have been moved.  
        Let’s get you back to something precious.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-yellow-200 transition-all"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </motion.div>

      {/* Floating sparkles */}
      <div className="absolute bottom-10 text-yellow-500/50 animate-pulse text-sm tracking-widest font-medium">
        ✨ Crafted with elegance by Abhishek Jewels
      </div>
    </div>
  );
}
