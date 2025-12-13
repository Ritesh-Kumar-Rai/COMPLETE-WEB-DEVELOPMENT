import mongoose from "mongoose";

// mini schema
const orderedItemsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

// main schema
const orderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderedItems: [orderedItemsSchema],
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    deliveryStatus: {
      type: String,
      enum: [
        "out of delivery",
        "pending",
        "cancelled",
        "delivered",
        "order confirmed",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
