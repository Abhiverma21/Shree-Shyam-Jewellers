"use client";
import React, { useEffect, useState } from "react";

export default function Rate({ rates: initialRates }) {
  const [rates, setRates] = useState({
    gold22: null, // ₹ / g
    silver: null, // ₹ / g (optional)
  });

  useEffect(() => {
    // Prefer provided props, otherwise fallback to sample/mock values
    if (initialRates && (initialRates.gold22 || initialRates.silver)) {
      setRates({
        gold22:
          typeof initialRates.gold22 === "number"
            ? initialRates.gold22
            : rates.gold22,
        silver:
          typeof initialRates.silver === "number"
            ? initialRates.silver
            : rates.silver,
      });
      return;
    }

    // Fallback mock values — replace with API later
    const mockFetch = () =>
      Promise.resolve({ gold22: 5924.5, silver: 78.2 }).then((r) =>
        setRates(r)
      );

    mockFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRates]);

  const fmt = (v) =>
    v == null
      ? "—"
      : new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 2,
        }).format(v) + " / g";

  return (
    <section className="max-w-5xl mx-auto px-6 py-8 bg-gradient-to-br from-amber-50 via-white to-amber-100 shadow-md rounded-2xl border border-amber-200 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Left: Title and Rates */}
        <div>
          <h2 className="text-2xl font-semibold text-amber-800 tracking-wide">
            Today’s Metal Rates
          </h2>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-10">
            {/* Gold Rate */}
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-gray-500 font-medium">
                Gold Rate (22K):
              </span>
              <span className="text-3xl font-bold text-amber-700">
                {rates.gold22 == null ? (
                  <span className="animate-pulse inline-block h-7 w-32 bg-amber-200 rounded-lg" />
                ) : (
                  fmt(rates.gold22)
                )}
              </span>
            </div>

            {/* Silver Rate */}
            <div className="flex items-baseline gap-3 mt-3 sm:mt-0">
              <span className="text-sm text-gray-500 font-medium">
                Silver Rate:
              </span>
              <span className="text-xl font-semibold text-gray-700">
                {rates.silver == null ? (
                  <span className="inline-block text-gray-400">Optional</span>
                ) : (
                  fmt(rates.silver)
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Features */}
        <div className="flex gap-6 items-center">
          <ul className="flex flex-col sm:flex-row gap-5">
            {/* Feature 1 */}
            <li className="flex items-center gap-3 group transition-all">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-700 ring-1 ring-amber-200 group-hover:bg-amber-600 group-hover:text-white transition-all">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-sm text-gray-700 font-medium group-hover:text-amber-700">
                100% BIS Hallmark
              </span>
            </li>

            {/* Feature 2 */}
            <li className="flex items-center gap-3 group transition-all">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-700 ring-1 ring-amber-200 group-hover:bg-amber-600 group-hover:text-white transition-all">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 2v7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 11c1.5 6 6.5 9 7 9s5.5-3 7-9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-sm text-gray-700 font-medium group-hover:text-amber-700">
                Lifetime Service
              </span>
            </li>

            {/* Feature 3 */}
            <li className="flex items-center gap-3 group transition-all">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-700 ring-1 ring-amber-200 group-hover:bg-amber-600 group-hover:text-white transition-all">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z" />
                </svg>
              </span>
              <span className="text-sm text-gray-700 font-medium group-hover:text-amber-700">
                Expert Craftsmanship
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="mt-6 border-t border-amber-200"></div>

      {/* Footer Info */}
      <div className="mt-3 text-xs text-gray-500 text-center">
        *Rates updated every 24 hours | Prices may vary based on market trends
      </div>
    </section>
  );
}
