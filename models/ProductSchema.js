import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    metal:{type: String, required: true, enum: ['gold', 'silver', 'diamond']},  
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, required: true, enum: ['Ladies', 'Gents'], trim: true },
    purity: { type: String, required: true },
    weight: { type: Number, required: true, min: 0 },
    makingCharge: { type: Number, default: 10, min: 0 },
    gst: { type: Number, default: 3, min: 0 },
    description: { type: String, default: "", trim: true },
    image: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default ProductSchema;
