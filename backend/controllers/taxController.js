import TaxRecord from "../models/TaxRecord.js";
import DownloadLog from "../models/DownloadLog.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Define directory paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * GET: Fetch all available tax records
 */
export const getAllTaxRecords = async (req, res) => {
  try {
    // We only want records that belong to the user or are public
    // If your TaxRecord model doesn't have a user field yet, this fetches all.
    const records = await TaxRecord.find({}).sort({ year: -1 });
    res.status(200).json(records);
  } catch (error) {
    console.error("Fetch Records Error:", error);
    res.status(500).json({ message: "Error fetching records from the vault." });
  }
};

/**
 * GET: Download a specific file
 */
export const downloadTaxFile = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await TaxRecord.findOne({ id });

    if (!record) {
      return res.status(404).json({ message: "Record not found in database." });
    }

    // Construct path using path.join for cross-platform compatibility (Windows vs Linux)
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      "tax_records",
      record.fileName,
    );

    // Check if file exists on disk before attempting download
    if (!fs.existsSync(filePath)) {
      console.error(`MISSING FILE: ${filePath}`);
      return res.status(404).json({
        message: "The physical document is not present on the server storage.",
      });
    }

    // Stream the download
    // res.download automatically sets Content-Disposition and Content-Type headers
    res.download(filePath, record.fileName, (err) => {
      if (err) {
        console.error("Download Stream Error:", err);
        // Don't send another response if headers were already sent
        if (!res.headersSent) {
          res.status(500).json({ message: "Could not transmit file." });
        }
      }
    });
  } catch (error) {
    console.error("Download Error:", error);
    res.status(500).json({ message: "Server error during download process." });
  }
};

/**
 * POST: Log a successful download event
 */
export const logDownload = async (req, res) => {
  try {
    const { fileName, fileSize } = req.body;

    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Identity verification failed." });
    }

    const newLog = new DownloadLog({
      fileName,
      fileSize,
      userEmail: req.user.email,
      downloadDate: new Date(),
    });

    await newLog.save();
    res.status(201).json({ message: "Activity logged to secure audit trail." });
  } catch (error) {
    console.error("Logging Error:", error);
    res.status(500).json({ message: "Audit log failed." });
  }
};

/**
 * GET: Retrieve download history for the current user
 */
export const getDownloadLogs = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    // Filter logs strictly by the user's email from the JWT
    const logs = await DownloadLog.find({ userEmail: req.user.email }).sort({
      downloadDate: -1,
    });

    res.status(200).json(logs);
  } catch (error) {
    console.error("Fetch Logs Error:", error);
    res.status(500).json({ message: "Error fetching activity logs." });
  }
};
