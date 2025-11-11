"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    subCategory: "",
    metal: "",
    metalRate: "",
    purity: "",
    weight: "",
    makingCharge: "",
    gst: "",
    description: "",
    image: "",
    price: "",
  });

  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // Handle text/select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Handle Image Upload to Cloudinary
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
      const localPreview = URL.createObjectURL(file);
  setForm({ ...form, image: localPreview });

    const formData = new FormData();
    formData.append("image", file);

    // Upload to your Next.js Cloudinary route with metal as folder
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.imageUrl) {
      setForm({ ...form, image: data.imageUrl });
    } else {
      alert("❌ Failed to upload image");
    }

    setUploading(false);
  };

  // ✅ Calculate Total Price
  const calculateTotal = () => {
    const weight = parseFloat(form.weight) || 0;
    const rate = parseFloat(form.metalRate) || 0;
    const makingPct = parseFloat(form.makingCharge) || 0;
    const gstPct = parseFloat(form.gst) || 0;

    const metalValue = rate * weight;
    const makingAmount = metalValue * (makingPct / 100);
    const taxable = metalValue + makingAmount;
    const gstAmount = taxable * (gstPct / 100);
    const total = taxable + gstAmount;

    return Number.isFinite(total) ? total : 0;
  };

  // ✅ Submit Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) return alert("Please upload an image first!");

    const totalPrice = +calculateTotal().toFixed(2);

    // Map client form keys to schema keys. The Product schema expects
    // `subcategory` (lowercase) while the form uses `subCategory`.
    const payload = {
      name: form.name,
      metal: form.metal,
      category: form.category,
      subcategory: form.subCategory, // maps to schema's 'subcategory'
      purity: form.purity,
      weight: Number(form.weight) || 0,
      makingCharge: Number(form.makingCharge) || 0,
      gst: Number(form.gst) || 0,
      description: form.description,
      image: form.image,
      // price is required and should be a Number
      price: Number(totalPrice) || 0,
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("✅ Product added successfully!");
      router.push("/admin/dashboard");
    } else {
      alert("❌ Failed to add product.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-yellow-700 mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-yellow-700 font-semibold mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              placeholder="e.g., Elegant Floral Ring"
            />
          </div>

          {/* Metal Type + Category + SubCategory + Purity */}
          <div className="grid md:grid-cols-4 gap-4">
            {/* Metal */}
            <div>
              <label className="block text-yellow-700 font-semibold mb-1">Metal Type</label>
              <select
                name="metal"
                value={form.metal}
                onChange={handleChange}
                required
                className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                <option value="">Select Metal</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="diamond">Diamond</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-yellow-700 font-semibold mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                <option value="">Select Category</option>
                <option value="Rings">Rings</option>
                <option value="coins">Coins</option>
                <option value="pendants">Pendant</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Bracelets">Bracelets</option>
                <option value="Earrings">Earrings</option>
                <option value="Anklets">Anklets</option>
                <option value="Bangles">Bangles</option>
              </select>
            </div>

            {/* For (Ladies/Gents) */}
            <div>
              <label className="block text-yellow-700 font-semibold mb-1">For</label>
              <select
                name="subCategory"
                value={form.subCategory}
                onChange={handleChange}
                required
                className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                <option value="">Select For</option>
                <option value="Ladies">Ladies</option>
                <option value="Gents">Gents</option>
              </select>
            </div>

            {/* Purity */}
            <div>
              <label className="block text-yellow-700 font-semibold mb-1">Purity</label>
              <select
                name="purity"
                value={form.purity}
                onChange={handleChange}
                required
                className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                <option value="">Select Purity</option>
                <option value="24K">24K</option>
                <option value="22K">22K</option>
                <option value="18K">18K</option>
                <option value="14K">14K</option>
              </select>
            </div>
          </div>

          {/* Weight + Rate + Making + GST */}
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-yellow-700 font-semibold mb-1">Weight (grams)</label>
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                required
                className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-yellow-700 font-semibold mb-1">Metal Rate (per gram)</label>
              <input
                type="number"
                name="metalRate"
                value={form.metalRate}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="e.g., 5500"
              />
            </div>

            <div>
              <label className="block text-yellow-700 font-semibold mb-1">Making Charge (%)</label>
              <input
                type="number"
                name="makingCharge"
                value={form.makingCharge}
                onChange={handleChange}
                required
                className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-yellow-700 font-semibold mb-1">GST (%)</label>
              <select
                name="gst"
                value={form.gst}
                onChange={handleChange}
                required
                className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                <option value="">Select GST</option>
                <option value="1.5">1.5%</option>
                <option value="3">3%</option>
                <option value="5">5%</option>
              </select>
            </div>
          </div>

          {/* Total Price */}
          <div className="mt-4">
            <label className="block text-yellow-700 font-semibold mb-1">Total Amount (INR)</label>
            <input
              type="text"
              readOnly
              value={calculateTotal().toFixed(2)}
              className="w-full border border-yellow-300 rounded-lg px-3 py-2 bg-yellow-50 text-yellow-800 font-semibold"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-yellow-700 font-semibold mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleImage}
              className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
            {uploading && (
              <p className="text-yellow-600 text-sm mt-1">Uploading image...</p>
            )}
          </div>

          {form.image && (
            <div className="mt-4">
              <img
                src={form.image}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-xl border border-yellow-200 shadow-md"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-yellow-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              placeholder="Describe this jewellery item..."
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`${
              uploading ? "bg-gray-400" : "bg-yellow-600 hover:bg-yellow-700"
            } text-white py-3 px-6 rounded-lg font-semibold transition-all w-full`}
          >
            {uploading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </section>
  );
}
