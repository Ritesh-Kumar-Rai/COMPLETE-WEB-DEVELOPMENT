import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      enum: ["pro student", "pro individual", "jiotunes+", "pro lite"],
      default: "free tier",
    },
    validity: {
      type: String,
      enum: ["1month", "1day", "1week"],
      default: "1day",
    },
    price: {
      type: Number,
      default: 0,
    },
    adFree_Benefit: {
      type: Boolean,
      default: false,
    },
    unlimitedJioTunes_Benefit: {
      type: Boolean,
      default: false,
    },
    unlimitedDownloads_Benefit: {
      type: Boolean,
      default: false,
    },
    BetterSoundQuality2X_Benefit: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Plan = mongoose.model("Plan", planSchema);
