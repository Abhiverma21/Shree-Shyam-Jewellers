"use client";
import React from "react";
import { RefreshCw, Gem, RotateCcw, Wrench } from "lucide-react"; // using lucide icons

export default function Assurance() {
  const assurances = [
    {
      id: 1,
      title: "Jewellery Exchange",
      desc: "Exchange your old gold for brand-new designs anytime with transparent valuation.",
      icon: <RefreshCw className="w-10 h-10 text-amber-600" />,
    },
    {
      id: 2,
      title: "Purity Guarantee",
      desc: "Every piece comes with BIS Hallmark certification ensuring 100% purity and trust.",
      icon: <Gem className="w-10 h-10 text-amber-600" />,
    },
    {
      id: 3,
      title: "Easy Replacement",
      desc: "Shop confidently — we offer easy returns and replacements for all online purchases.",
      icon: <RotateCcw className="w-10 h-10 text-amber-600" />,
    },
    {
      id: 4,
      title: "Lifetime Maintenance",
      desc: "Enjoy lifetime cleaning, polishing, and repair services on all our jewellery pieces.",
      icon: <Wrench className="w-10 h-10 text-amber-600" />,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-amber-50 via-white to-amber-100 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
          Our Assurances 💎
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Experience peace of mind with every purchase — because your trust is
          as precious as our jewellery.
        </p>

        {/* Cards: show 2 per row on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {assurances.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-amber-100 p-4 sm:p-6 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="bg-amber-100 rounded-full p-4 mb-4 group-hover:bg-amber-200 transition">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-amber-700 transition">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
