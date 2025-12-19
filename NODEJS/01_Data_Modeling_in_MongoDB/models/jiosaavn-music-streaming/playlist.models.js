import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    playlistName: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    tracks: [
      {
        musicId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Music",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    coverImageUrl: {
      type: String,
    },
    followers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
