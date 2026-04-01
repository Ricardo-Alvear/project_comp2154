import mongoose from "mongoose";

const TaxRecordSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Unique record ID is required"],
      unique: true,
      trim: true,
      uppercase: true, // Ensures "tx-2025" becomes "TX-2025"
    },
    year: {
      type: String,
      required: [true, "Tax year is required"],
      match: [/^\d{4}$/, "Please provide a valid 4-digit year"],
    },
    type: {
      type: String,
      required: [true, "Document type is required (e.g., T4, T5, NOA)"],
      enum: ["T4", "T5", "NOA", "Business Expenses", "Other"], // Restricts to specific types
    },
    status: {
      type: String,
      default: "Verified",
      enum: ["Pending", "Verified", "Archived"],
    },
    fileName: {
      type: String,
      required: [true, "Physical filename is required for download links"],
      trim: true,
    },
    // CRITICAL: Linking the record to a specific user
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A tax record must belong to a user"],
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexing for performance: quickly find all records for a user in a specific year
TaxRecordSchema.index({ owner: 1, year: -1 });

export default mongoose.model("TaxRecord", TaxRecordSchema);
