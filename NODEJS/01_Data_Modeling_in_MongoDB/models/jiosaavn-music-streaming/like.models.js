import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId, // we don't know which id will be stored [music,playlist,album] that's why we don't mention ref explicitly
    required: true,
  },
  entityType: {
    type: String,
    enum: ["music", "playlist", "album"],
    required: true,
  },
  likedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export const Like = mongoose.model("Like", likeSchema);
