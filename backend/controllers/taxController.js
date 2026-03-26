import TaxRecord from "../models/TaxRecord.js";
import DownloadLog from "../models/DownloadLog.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Define directory paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * GET: Fetch all available tax records from the vault
 */
export const getAllTaxRecords = async (req, res) => {
  try {
    const records = await TaxRecord.find({});
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records" });
  }
};

/**
 * GET: Download a specific file by its custom ID (e.g., TX-2025-001)
 */
export const downloadTaxFile = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the record in MongoDB
    const record = await TaxRecord.findOne({ id });

    if (!record) {
      return res.status(404).json({ message: "Record not found in database." });
    }

    // 2. Construct path
    // We use path.resolve to ensure we are getting an absolute path
    const filePath = path.resolve(
      __dirname,
      "../uploads/tax_records",
      record.fileName,
    );

    // 3. Check if file exists on disk
    if (!fs.existsSync(filePath)) {
      console.error(`File missing at: ${filePath}`);
      return res
        .status(404)
        .json({ message: "Physical file missing from server." });
    }

    // 4. Stream the download to the client
    res.download(filePath, record.fileName);
  } catch (error) {
    res.status(500).json({
      message: "Server error during download",
      error: error.message,
    });
  }
};

/**
 * POST: Log a successful download event for tracking
 */
export const logDownload = async (req, res) => {
  try {
    const { fileName, fileSize } = req.body;

    // Check if req.user exists (provided by authenticateJWT)
    if (!req.user || !req.user.email) {
      return res
        .status(401)
        .json({ message: "User identity not found in token." });
    }

    const newLog = new DownloadLog({
      fileName,
      fileSize,
      userEmail: req.user.email,
      downloadDate: new Date(), // Explicitly set current date
    });

    await newLog.save();
    console.log(`Log saved for ${req.user.email}: ${fileName}`); // Check your terminal for this!

    res.status(201).json({ message: "Download successfully logged" });
  } catch (error) {
    console.error("Log Error:", error.message);
    res.status(500).json({
      message: "Failed to log activity",
      error: error.message,
    });
  }
};

/**
 * GET: Retrieve all download history for the current user
 */
export const getDownloadLogs = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const logs = await DownloadLog.find({ userEmail: req.user.email }).sort({
      downloadDate: -1,
    });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activity logs" });
  }
};
