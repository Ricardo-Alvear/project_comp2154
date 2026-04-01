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
      index: true,
      // Added a simple regex match to ensure no malformed emails hit your logs
      match: [
        /^^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    downloadDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    // timestamps are great for knowing exactly when a record was created vs when the action happened
    timestamps: true,
  },
);

// Compound index for the "Recent Activity" view
// This allows MongoDB to find "Ricardo's" logs and sort them by "Date" in a single step
DownloadLogSchema.index({ userEmail: 1, downloadDate: -1 });

export default mongoose.model("DownloadLog", DownloadLogSchema);
