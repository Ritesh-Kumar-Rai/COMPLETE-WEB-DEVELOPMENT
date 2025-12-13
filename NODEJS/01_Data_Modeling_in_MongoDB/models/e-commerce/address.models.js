import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    recipientName: {
      type: String,
    },
    phone: {
      type: Number,
    },
    line1: {
      type: String,
      required: true,
    },
    line2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
      required: true,
      default: "india",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);
