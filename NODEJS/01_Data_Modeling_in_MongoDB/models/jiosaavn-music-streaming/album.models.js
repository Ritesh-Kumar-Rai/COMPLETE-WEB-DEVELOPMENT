import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    primaryArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],
    tracks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Music",
      },
    ],
  },
  { timestamps: true }
);

export const Album = mongoose.model("Album", albumSchema);
