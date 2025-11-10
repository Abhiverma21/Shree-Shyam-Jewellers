"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ManageProducts() {
  const [metalType, setMetalType] = useState(""); // gold | silver | diamond
  const [subCategory, setSubCategory] = useState(""); // ring, necklace, etc.
  const [forFilter, setForFilter] = useState(""); // Ladies/Gents filter
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    purity: "",
    weight: "",
    category: "",
    subCategory: "",
    metalRate: "",
    makingCharge: "",
    gst: "3", // Default GST rate
    description: "",
    image: "",
    totalPrice: 0,
  });

  // Calculate total price based on weight, rate, making charge, and GST
  const calculateTotal = (values) => {
    const weight = parseFloat(values.weight) || 0;
    const rate = parseFloat(values.metalRate) || 0;
    const makingPct = parseFloat(values.makingCharge) || 0;
    const gstPct = parseFloat(values.gst) || 0;

    const metalValue = rate * weight;
    const makingAmount = metalValue * (makingPct / 100);
    const subtotal = metalValue + makingAmount;
    const gstAmount = subtotal * (gstPct / 100);

    return subtotal + gstAmount;
  };

  // Handle changes in price-affecting fields
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...editForm, [name]: value };
    const newTotal = calculateTotal(newForm);
    setEditForm({ ...newForm, totalPrice: newTotal });
  };

  // Fetch products when metal or subCategory changes
  useEffect(() => {
    if (!metalType) return;

    async function fetchProducts() {
      setLoading(true);
      try {
        let url = `/api/products/${metalType}`;
        const params = new URLSearchParams();
        if (subCategory) params.append("category", subCategory);
        if (forFilter) params.append("for", forFilter);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          // Filter by Ladies/Gents if specified
          let filteredProducts = data.products;
          if (forFilter) {
            filteredProducts = filteredProducts.filter(
              (p) => p.subCategory === forFilter
            );
          }
          setProducts(filteredProducts);
        } else {
          console.error("Failed to fetch:", data.message);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [metalType, subCategory, forFilter]);

  // Delete product
  const handleDelete = async (id) => {
    if (!metalType) return alert("Select metal type first!");
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`/api/products/${metalType}/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setProducts(products.filter((p) => p._id !== id));
          alert("✅ Product deleted successfully");
        } else {
          alert("❌ Failed to delete product");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Open edit modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name || "",
      category: product.category || "",
      subCategory: product.subCategory || "",
      purity: product.purity || "",
      weight: product.weight || "",
      metalRate: product.metalRate || "",
      makingCharge: product.makingCharge || "",
      gst: product.gst || "3",
      description: product.description || "",
      image: product.image || "",
      totalPrice: product.price || 0,
    });
  };

  // Update product
  const handleUpdate = async () => {
    if (!metalType || !editingProduct) return;
    try {
      // Calculate the total price
      const weight = parseFloat(editForm.weight) || 0;
      const rate = parseFloat(editForm.metalRate) || 0;
      const makingCharge = parseFloat(editForm.makingCharge) || 0;
      const gst = parseFloat(editForm.gst) || 0;

      const metalValue = rate * weight;
      const makingAmount = metalValue * (makingCharge / 100);
      const subtotal = metalValue + makingAmount;
      const gstAmount = subtotal * (gst / 100);
      const totalPrice = subtotal + gstAmount;

      const updatedData = {
        ...editForm,
        metal: metalType,
        price: totalPrice,
        metalRate: rate,
        weight: weight,
        makingCharge: makingCharge,
        gst: gst,
        category: editForm.category || editForm.subCategory,
      };

      const res = await fetch(
        `/api/products/${metalType}/${editingProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        const updatedProduct = data.product || { ...editingProduct, ...editForm };
        setProducts(
          products.map((p) =>
            p._id === editingProduct._id ? updatedProduct : p
          )
        );
        setEditingProduct(null);

        const refreshRes = await fetch(`/api/products/${metalType}`);
        const refreshData = await refreshRes.json();
        if (refreshRes.ok) {
          setProducts(refreshData.products);
        }

        alert("✅ Product updated successfully");
      } else {
        alert("❌ Failed to update: " + data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const subCategoryOptions = {
    gold: ["Rings", "Necklaces", "Bracelets", "Anklets", "Earrings", "Bangles"],
    silver: ["Rings", "Pendants", "Chains", "Earrings"],
    diamond: ["Rings", "Necklaces", "Bangles", "Bracelets"],
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-yellow-700">Manage Products</h1>

          <div className="flex gap-3 flex-wrap">
            <select
              value={metalType}
              onChange={(e) => {
                setMetalType(e.target.value);
                setSubCategory("");
              }}
              className="border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select Metal Type</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="diamond">Diamond</option>
            </select>

            {metalType && (
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                <option value="">All Types</option>
                {subCategoryOptions[metalType].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}

            <select
              value={forFilter}
              onChange={(e) => setForFilter(e.target.value)}
              className="border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">All (Ladies/Gents)</option>
              <option value="Ladies">Ladies</option>
              <option value="Gents">Gents</option>
            </select>

            <button
              onClick={() => (window.location.href = "/admin/add-product")}
              className="bg-yellow-600 text-white py-2 px-5 rounded-lg font-semibold hover:bg-yellow-700 transition-all"
            >
              + Add New Product
            </button>
          </div>
        </div>

        {!metalType ? (
          <p className="text-gray-600 text-center py-10">
            Please select a metal type 💎
          </p>
        ) : loading ? (
          <p className="text-center text-yellow-700 font-semibold py-10 animate-pulse">
            Loading {metalType} products...
          </p>
        ) : products.length === 0 ? (
          <p className="text-gray-600 text-center py-10">
            No {metalType} {subCategory && subCategory.toLowerCase()} products
            found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {products.map((p) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-yellow-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all bg-white"
                >
                  <Image
                    src={p.image || "/images/placeholder.jpg"}
                    alt={p.name}
                    height={100}
                    width={100}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-yellow-800">
                      {p.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-1">
                      Purity: {p.purity}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      Weight: {p.weight}g
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      Category: {p.category || "N/A"}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      For: {p.subCategory || "N/A"}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {p.description}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => openEditModal(p)}
                        className="text-yellow-700 font-medium hover:underline"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-500 font-medium hover:underline"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {editingProduct && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-4xl p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-2xl font-bold text-yellow-700 mb-6 text-center">
                Edit Product
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-2 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Product Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter product name"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          For
                        </label>
                        <select
                          value={editForm.subCategory}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              subCategory: e.target.value,
                            })
                          }
                          className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="Ladies">Ladies</option>
                          <option value="Gents">Gents</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Purity
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 22K, 18K"
                        value={editForm.purity}
                        onChange={(e) =>
                          setEditForm({ ...editForm, purity: e.target.value })
                        }
                        className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Weight (g)
                      </label>
                      <input
                        type="number"
                        placeholder="Weight"
                        value={editForm.weight}
                        onChange={handlePriceChange}
                        name="weight"
                        step="0.01"
                        className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Rate/g
                      </label>
                      <input
                        type="number"
                        placeholder="Rate"
                        value={editForm.metalRate}
                        onChange={handlePriceChange}
                        name="metalRate"
                        step="0.01"
                        className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Making (%)
                      </label>
                      <input
                        type="number"
                        placeholder="%"
                        value={editForm.makingCharge}
                        onChange={handlePriceChange}
                        name="makingCharge"
                        step="0.01"
                        className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        GST (%)
                      </label>
                      <select
                        value={editForm.gst}
                        onChange={handlePriceChange}
                        name="gst"
                        className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="1.5">1.5%</option>
                        <option value="3">3%</option>
                        <option value="5">5%</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter product description"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-1 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Image
                    </label>
                    {editForm.image && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">
                          Current Image:
                        </p>
                        <img
                          src={editForm.image}
                          alt="Product Preview"
                          className="w-32 h-32 object-cover rounded-lg border border-yellow-300"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setEditForm({ ...editForm, image: imageUrl });
                        }
                      }}
                      className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-yellow-800">
                        Total Price (₹)
                      </label>
                      <input
                        type="text"
                        value={editForm.totalPrice.toFixed(2)}
                        readOnly
                        className="w-1/2 bg-white border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none font-semibold text-yellow-700 text-right"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="bg-gray-200 w-full px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="bg-yellow-600 text-white w-full px-4 py-2 rounded-lg hover:bg-yellow-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
