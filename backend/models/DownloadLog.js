import mongoose from "mongoose";

const DownloadLogSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, "File name is required for logging"],
      trim: true,
    },
    fileSize: {
      type: String,
      required: [true, "File size is required for tracking"],
    },
    userEmail: {
      type: String,
      required: [true, "User email is required to track ownership"],
      lowercase: true,
      index: true, // Speeds up queries when fetching history for a specific user
    },
    downloadDate: {
      type: Date,
      default: Date.now,
      index: true, // Speeds up "Sort by Date" on the Progress Page
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// Create a compound index if you ever want to find a specific file for a specific user faster
DownloadLogSchema.index({ userEmail: 1, downloadDate: -1 });

export default mongoose.model("DownloadLog", DownloadLogSchema);
