import mongoose from "mongoose";
import TaxRecord from "./models/TaxRecord.js";
import "dotenv/config";

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const newRecords = [
      {
        id: "TX-2025-001",
        year: "2025",
        type: "Annual Return",
        status: "Verified",
        fileName: "t5_2025.pdf",
      },
      {
        id: "TX-2025-002",
        year: "2025",
        type: "T4 Statement",
        status: "Verified",
        fileName: "t4_2025.pdf",
      },
    ];

    // 1. CLEAR EXISTING DATA
    // This prevents the "Duplicate Key" error
    await TaxRecord.deleteMany({});
    console.log("Old records cleared.");

    // 2. INSERT NEW DATA
    await TaxRecord.insertMany(newRecords);
    console.log("Database successfully seeded with new records!");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
