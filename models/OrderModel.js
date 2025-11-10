import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "product.metal"
    },
    product: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      weight: { type: Number, required: true },
      purity: { type: String, required: true },
      metal: { 
        type: String, 
        required: true,
        enum: ["GoldProduct", "SilverProduct"] 
      }
    },
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true }
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
      default: "pending"
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["online", "cod"],
      default: "online"
    },
    orderDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    paidAt: Date,
    deliveredAt: Date
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);