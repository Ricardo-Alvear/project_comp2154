import express from 'express';
import {
	getAllTaxRecords,
	downloadTaxFile,
	logDownload,
	getDownloadLogs,
} from '../controllers/taxController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateJWT, getAllTaxRecords);

router.get('/download/:id', authenticateJWT, downloadTaxFile);

router.post("/log", authenticateJWT, logDownload);
router.get("/logs", authenticateJWT, getDownloadLogs);

export default router;
