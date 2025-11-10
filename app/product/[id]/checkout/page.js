"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    customer: {
      fullName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "",
      pincode: ""
    },
    paymentMethod: "online" // or "cod"
  });
  const [showSummary, setShowSummary] = useState(true);

  useEffect(() => {
    // First try to get from localStorage
    const stored = localStorage.getItem("selectedProduct");
    if (stored) {
      setProduct(JSON.parse(stored));
      setLoading(false);
    } else {
      // Fallback to API if not in localStorage
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.product) {
            setProduct(data.product);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleInputChange = (e, section = null) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (section === 'customer') {
        return {
          ...prev,
          customer: {
            ...prev.customer,
            [name]: value
          }
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Build customer payload to match OrderModel (expects `address` string)
      const customerPayload = {
        fullName: formData.customer.fullName,
        email: formData.customer.email,
        phone: formData.customer.phone,
        // Concatenate address parts into a single address field
        address: [formData.customer.addressLine1, formData.customer.addressLine2, formData.customer.landmark]
          .filter(Boolean)
          .join(', '),
        city: formData.customer.city,
        state: formData.customer.state,
        pincode: formData.customer.pincode
      };

      const orderData = {
        productId: product._id,
        product: {
          name: product.name,
          price: product.price,
          image: product.image,
          weight: product.weight,
          purity: product.purity,
          metal: product.category?.includes("silver") ? "SilverProduct" : "GoldProduct"
        },
        customer: customerPayload,
        paymentMethod: formData.paymentMethod,
        orderDate: new Date().toISOString(),
        status: "pending",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Order placed successfully!");
        localStorage.removeItem("selectedProduct"); // Clear the selected product
        router.push("/orders"); // Redirect to orders page
      } else {
        const errorMessage = data.errors 
          ? `Order validation failed:\n${data.errors.join('\n')}`
          : data.message || "Failed to place order";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert(error.message || "Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-yellow-700">Loading checkout details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-8 px-3 sm:py-10 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-yellow-800 mb-6 text-center"
        >
          Checkout
        </motion.h1>

        {/* Mobile toggle for summary */}
        <div className="sm:hidden mb-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">Order</div>
          <button onClick={() => setShowSummary(s => !s)} className="text-sm px-2 py-1 border rounded">
            {showSummary ? 'Hide' : 'Show'} summary
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Product Summary */}
          {showSummary && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="sm:col-span-1 bg-white p-4 sm:p-6 rounded-lg shadow-sm"
            >
              <h2 className="font-semibold text-sm sm:text-base text-yellow-800 mb-3">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="w-full overflow-hidden rounded-md bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={160}
                    height={160}
                    className="w-full h-36 sm:h-44 object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-800 text-sm line-clamp-2">{product.name}</h3>
                <div className="text-xs text-gray-600">
                  <p>Weight: {product.weight}g</p>
                  <p>Purity: {product.purity}</p>
                </div>
                <div className="text-lg sm:text-xl font-bold text-yellow-700">₹{product.price?.toLocaleString()}</div>
              </div>
            </motion.div>
          )}

          {/* Checkout Form */}
          <motion.form
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="sm:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-sm space-y-4"
            onSubmit={handleSubmit}
          >
            <h2 className="font-semibold text-sm sm:text-base text-yellow-800 mb-1">Customer Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.customer.fullName}
                  onChange={(e) => handleInputChange(e, 'customer')}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.customer.email}
                  onChange={(e) => handleInputChange(e, 'customer')}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.customer.phone}
                  onChange={(e) => handleInputChange(e, 'customer')}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.customer.pincode}
                  onChange={(e) => handleInputChange(e, 'customer')}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
              <input
                name="addressLine1"
                required
                value={formData.customer.addressLine1}
                onChange={(e) => handleInputChange(e, 'customer')}
                className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />

              <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">Address Line 2 <span className="text-xs text-gray-400">(optional)</span></label>
              <input
                name="addressLine2"
                value={formData.customer.addressLine2}
                onChange={(e) => handleInputChange(e, 'customer')}
                className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />

              <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">Landmark <span className="text-xs text-gray-400">(optional)</span></label>
              <input
                name="landmark"
                value={formData.customer.landmark}
                onChange={(e) => handleInputChange(e, 'customer')}
                className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.customer.city}
                  onChange={(e) => handleInputChange(e, 'customer')}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.customer.state}
                  onChange={(e) => handleInputChange(e, 'customer')}
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Payment Method</label>
              <div className="flex items-center gap-4 text-sm">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === "online"}
                    onChange={handleInputChange}
                    className="text-yellow-600 focus:ring-yellow-500"
                  />
                  <span className="ml-2">Online</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="text-yellow-600 focus:ring-yellow-500"
                  />
                  <span className="ml-2">COD</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-2 rounded-md font-semibold hover:bg-yellow-700 transition-colors text-sm"
              >
                Place Order
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
