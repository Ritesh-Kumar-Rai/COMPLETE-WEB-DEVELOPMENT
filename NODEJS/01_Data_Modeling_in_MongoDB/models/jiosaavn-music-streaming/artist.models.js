import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profileImageUrl: {
      type: String,
    },
    musicCount: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Artist = mongoose.model("Artist", artistSchema);
