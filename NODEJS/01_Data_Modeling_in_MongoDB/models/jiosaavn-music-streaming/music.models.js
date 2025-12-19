import mongoose from "mongoose";

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // length in seconds
      default: 0.0,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
    artists: [
      {
        artistId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Artist",
        },
        artistName: {
          type: String,
        },
      },
    ],
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    playCount: {
      type: Number,
      default: 0,
    },
    releaseDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Music = mongoose.model("Music", musicSchema);
