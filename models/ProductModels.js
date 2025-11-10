import mongoose from "mongoose";
import productSchema from "./ProductSchema";

// Avoid model redefinition error in Next.js
export const GoldProduct =
  mongoose.models.GoldProduct || mongoose.model("GoldProduct", productSchema);

export const SilverProduct =
  mongoose.models.SilverProduct || mongoose.model("SilverProduct", productSchema);

export const DiamondProduct =
  mongoose.models.DiamondProduct || mongoose.model("DiamondProduct", productSchema);
