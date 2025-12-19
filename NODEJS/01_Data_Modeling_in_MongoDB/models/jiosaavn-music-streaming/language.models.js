import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    languageName: {
      type: String,
      required: true,
      unique: true,
      default: "hi",
    },
    originCountry: {
      type: String,
      required: true,
      default: "india",
    },
    originRegion: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Language = mongoose.model("Language", languageSchema);
