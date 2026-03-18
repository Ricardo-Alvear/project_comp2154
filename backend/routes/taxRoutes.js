import express from 'express';
import { downloadTaxFile } from '../controllers/taxController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();


router.get('/download/:id', authenticateJWT, downloadTaxFile);

export default router;
