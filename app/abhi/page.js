"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AbhiPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    metal: "all",
    category: "all",
    minPrice: "",
    maxPrice: "",
  });
  const [sortBy, setSortBy] = useState("newest"); // newest, price-asc, price-desc
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    if (filters.metal !== "all" && product.metal !== filters.metal) return false;
    if (filters.category !== "all" && product.category !== filters.category) return false;
    if (filters.minPrice && product.price < parseFloat(filters.minPrice)) return false;
    if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) return false;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Handle buy now
  const handleBuyNow = async (product) => {
    try {
      // First check if user is logged in
      const authRes = await fetch("/api/auth/me");
      const authData = await authRes.json();
      
      if (!authData.user) {
        // Save intended purchase to session storage
        sessionStorage.setItem("intended_purchase", JSON.stringify(product));
        router.push("/login");
        return;
      }

      // Create an order
      if (!product.price) {
        alert("Product price is missing. Cannot place order.");
        return;
      }
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          product: {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
          },
          quantity: 1,
          address: "123 Main Street, City, State, 123456"
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();
      router.push(`/order/${data.order._id}`);
    } catch (err) {
      console.error("Error in buy now:", err);
      alert("Failed to process purchase. Please try again.");
    }
  };

  // Unique categories from products
  const categories = ["all", ...new Set(products.map(p => p.category))];
  
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center p-8">
      <p className="text-red-500 font-semibold">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-800">
        Exclusive Collection
      </h1>

      {/* Filters & Sort */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select
          value={filters.metal}
          onChange={(e) => setFilters({ ...filters, metal: e.target.value })}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
        >
          <option value="all">All Metals</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="diamond">Diamond</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-yellow-500 outline-none"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-yellow-500 outline-none"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 bg-white group"
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>

              <h2 className="text-xl font-semibold text-yellow-800 mb-2">
                {product.name}
              </h2>

              <div className="space-y-1 mb-4">
                <p className="text-gray-600">
                  <span className="font-medium">Category:</span> {product.category}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Metal:</span> {product.metal}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Purity:</span> {product.purity}
                </p>
                {product.weight && (
                  <p className="text-gray-600">
                    <span className="font-medium">Weight:</span> {product.weight}g
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-yellow-900">
                  <span className="text-sm">Price:</span>
                  <p className="text-xl font-bold">₹{product.price?.toLocaleString() || "N/A"}</p>
                </div>

                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-yellow-800">
                {selectedProduct.name}
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Modal content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-64 rounded-lg overflow-hidden">
                {selectedProduct.image ? (
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Category: {selectedProduct.category}</p>
                  <p className="text-gray-600">Metal: {selectedProduct.metal}</p>
                  <p className="text-gray-600">Purity: {selectedProduct.purity}</p>
                  <p className="text-gray-600">Weight: {selectedProduct.weight}g</p>
                </div>

                <div className="text-yellow-900">
                  <span className="text-sm">Price:</span>
                  <p className="text-2xl font-bold">
                    ₹{selectedProduct.price?.toLocaleString() || "N/A"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleBuyNow(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
