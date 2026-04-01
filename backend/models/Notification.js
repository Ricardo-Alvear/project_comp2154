import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a notification title"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      trim: true,
    },
    deadline: {
      type: String,
      required: [true, "A deadline date is required"],
    },
    // CRITICAL: Link the notification to a specific user
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user ID"],
      index: true, // Optimizes fetching "My Notifications"
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds updatedAt automatically
  },
);

// Index to quickly sort notifications by deadline and user
NotificationSchema.index({ createdBy: 1, deadline: 1 });

export default mongoose.model("Notification", NotificationSchema);
