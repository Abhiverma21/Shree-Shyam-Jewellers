"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Branding & Logo */}
          <div className="flex flex-col items-start">
            {/* Logo */}
            <div className="mb-4">
              <Image
                src="/images/logof.jpg" // <-- replace with your logo path
                alt="Shree Shyam Jewellers Logo"
                width={250}
                height={10}
                className="object-auto h-auto border rounded-lg sm:w-50 w-30"
              />
            </div>
            <h3 className="text-2xl font-semibold text-amber-500">Shree Shyam Jewellers</h3>
            <p className="mt-2 text-sm text-gray-400">Handcrafted gold, silver & diamond jewellery since 19XX</p>
            <p className="mt-4 text-sm text-gray-400">Visit our stores or explore online for timeless elegance.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-gray-300 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/collections" className="hover:text-white">Collections</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter + Map */}
          <div>
            <h4 className="text-xl font-semibold text-gray-300 mb-4">Connect With Us</h4>
            <p className="text-sm text-gray-400 mb-2">
              📞 <a href="tel:+911234567890" className="hover:text-white">+91 9896416786</a><br/>
              ✉️ <a href="mailto:shreeshyam.com" className="hover:text-white">shree.com</a><br/>
              📍 Store Locator: <Link href="/stores" className="hover:text-white">Find a store near you</Link>
            </p>

            <div className="mt-4">
              <h5 className="text-sm text-gray-300 mb-2">Subscribe to our Newsletter</h5>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full sm:flex-1 px-4 py-2 rounded-full border border-amber-600 focus:ring-amber-400 focus:ring-2 outline-none text-gray-900"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Embedded Map */}
            <div className="mt-6 overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6913.304512434896!2d76.89177999495118!3d29.96067957434251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1761400016581!5m2!1sen!2sin" 
                width="100%"
                height="250"
                allowFullScreen=""
                loading="lazy"
                className="border-0"
              ></iframe>
            </div>

            <div className="mt-6 flex gap-4 text-gray-400">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .1 2 .1v2.2h-1.1c-1.1 0-1.5.7-1.5 1.5v1.8H16l-.4 3h-2v7A10 10 0 0022 12z"/></svg>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zM12 8a4 4 0 110 8 4 4 0 010-8zm5-2a1 1 0 110 2 1 1 0 010-2z"/></svg>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.34-1.6.57-2.46.67a4.27 4.27 0 001.88-2.35 8.48 8.48 0 01-2.7 1.03 4.24 4.24 0 00-7.2 3.86 12 12 0 01-8.7-4.4 4.24 4.24 0 001.3 5.66 4.17 4.17 0 01-1.92-.53v.05a4.24 4.24 0 003.4 4.15 4.27 4.27 0 01-1.92.07 4.24 4.24 0 003.96 2.95 8.5 8.5 0 01-5.26 1.81c-.34 0-.68-.02-1.02-.06A12.05 12.05 0 009 19c6.04 0 9.35-5 9.35-9.35 0-.14-.01-.28-.02-.42A6.7 6.7 0 0022.46 6z"/></svg>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 12c0-1.4-.1-2.8-.4-4.1-.2-1.0-.8-1.9-1.8-2.4C20-0.4 19.4 0 18.8 0h-13.6C4.6 0 4 .4 3.4 1.3 2.4 1.8 1.8 2.7 1.6 3.7.3 5 0 6.4 0 7.8 0 12c0 4.2.3 5.8 1.6 7.3.2 1 .8 1.9 1.8 2.4.6.9 1.2 1.3 2.0 1.3h13.6c1.6 0 3.2-.6 4.2-1.6 1.0-.5 1.6-1.4 1.8-2.4.3-1.3.4-2.7.4-4.1z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Shree Shyam Jewellers. All rights reserved.</p>
          <p>CIN: UXXXXXXXXXX | GSTIN: 12AAAPL3456C1Z9</p>
          <p>Designed & Developed by Your Brand</p>
        </div>
      </div>
    </footer>
  );
}
