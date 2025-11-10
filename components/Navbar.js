"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  // ✅ Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error verifying user:", err);
        setUser(null);
      }
    };
    fetchUser();
  }, [pathname]);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ✅ Helper to get initials
  const getInitials = (userOrFirstName, lastName) => {
    if (!userOrFirstName) return "";
    if (typeof userOrFirstName === "object") {
      const u = userOrFirstName;
      const nameCandidate =
        u.firstName ||
        u.name ||
        u.fullName ||
        (u.email ? u.email.split("@")[0] : "");
      if (!nameCandidate) return "";
      const parts = nameCandidate.trim().split(/\s+/);
      if (parts.length === 1) return parts[0][0].toUpperCase();
      return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
    }
    return (userOrFirstName[0] + (lastName ? lastName[0] : "")).toUpperCase();
  };

  // ✅ Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-amber-200">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* 🪙 Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={120}
              height={70}
              className="object-contain rounded-full"
            />
            <Link
              href="/"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-amber-700 tracking-wide hover:text-amber-800 transition-all"
            >
              Shree Shyam Jewellers
            </Link>
          </div>

          {/* 🔍 Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 justify-center max-w-2xl mx-4"
          >
            <input
              type="text"
              placeholder="Search jewellery, gold, silver, or diamonds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-2 border border-amber-300 rounded-l-full focus:ring-2 focus:ring-amber-400 focus:outline-none text-gray-700"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-r-full transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
          </form>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`hover:text-amber-700 transition ${
                pathname === "/" ? "text-amber-700 font-semibold" : "text-gray-700"
              }`}
            >
              Home
            </Link>

            {/* Collections Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen((s) => !s)}
                className={`flex items-center gap-1 hover:text-amber-700 transition ${
                  pathname.includes("/collections")
                    ? "text-amber-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                Collections
                <svg
                  className={`w-4 h-4 mt-1 transform transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`absolute left-0 mt-1 w-44 bg-white border border-amber-100 rounded-lg shadow-lg py-2 z-50 transition-all duration-150 transform origin-top ${
                  dropdownOpen
                    ? "opacity-100 visible translate-y-0 mt-5"
                    : "opacity-0 invisible translate-y-1"
                }`}
              >
                {["Gold", "Silver", "Diamond", "Bridal"].map((item) => (
                  <Link
                    key={item}
                    href={`/collections/${item.toLowerCase()}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-all duration-150 transform hover:translate-x-1"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className={`hover:text-amber-700 transition ${
                pathname === "/contact"
                  ? "text-amber-700 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Contact
            </Link>

            {/* 👤 User Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold shadow-md">
                  {getInitials(user)}
                </div>
                <span className="font-medium text-gray-700">
                  {user.firstName || user.name || (user.email ? user.email.split("@")[0] :"User")}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 text-gray-700 hover:text-amber-700 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A4 4 0 0112 15a4 4 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Login
              </Link>
            )}

            {/* 🛒 Cart */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-amber-700 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6M17 13l1.2 6M6 21h12"
                />
              </svg>
              <span className="absolute -top-1 -right-2 inline-flex items-center justify-center w-4 h-4 text-xs font-bold bg-amber-600 text-white rounded-full">
                2
              </span>
            </Link>
          </div>

          {/* 📱 Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 📱 Mobile Menu */}
        {open && (
          <div className="md:hidden bg-white border-t border-amber-100 py-4 space-y-3 animate-slideDown">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex mx-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-amber-300 rounded-l-full focus:ring-2 focus:ring-amber-400 focus:outline-none text-gray-700"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-r-full transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </button>
            </form>

            {/* Links */}
            <Link
              href="/"
              className="block text-gray-700 hover:text-amber-700 px-4"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            {/* Collections Dropdown */}
            <div className="px-4">
              <button
                onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                className="flex justify-between w-full text-gray-700 hover:text-amber-700"
              >
                <span>Collections</span>
                <svg
                  className={`w-4 h-4 mt-1 transform transition-transform ${
                    mobileCollectionsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {mobileCollectionsOpen && (
                <div className="pl-4 mt-2 space-y-2 animate-slideDown">
                  {["Gold", "Silver", "Diamond", "Bridal"].map((item) => (
                    <Link
                      key={item}
                      href={`/collections/${item.toLowerCase()}`}
                      className="block text-gray-600 hover:text-amber-700"
                      onClick={() => setOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="block text-gray-700 hover:text-amber-700 px-4"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>

            {/* User Section */}
            <div className="px-4 border-t border-amber-100 pt-3">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold shadow-md">
                      {getInitials(user)}
                    </div>
                    <span className="font-medium text-gray-700">
                      {user.firstName ||
                        user.name ||
                        (user.email ? user.email.split("@")[0] : "User")}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-gray-700 hover:text-amber-700"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A4 4 0 0112 15a4 4 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Login
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-amber-700 px-4"
              onClick={() => setOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6M17 13l1.2 6M6 21h12"
                />
              </svg>
              <span className="absolute left-9 -top-1 w-4 h-4 text-xs font-bold bg-amber-600 text-white rounded-full flex items-center justify-center">
                2
              </span>
              Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
