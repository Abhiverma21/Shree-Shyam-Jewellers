import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "productType",
    },
    productType: {
      type: String,
      required: true,
      enum: ["GoldProduct", "SilverProduct", "DiamondProduct"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);
