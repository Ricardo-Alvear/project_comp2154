import TaxRecord from '../models/TaxRecord.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadTaxFile = async (req, res) => {
	try {
		const { id } = req.params;

		// 1. Find the record in MongoDB
		const record = await TaxRecord.findOne({ id });

		if (!record) {
			return res
				.status(404)
				.json({ message: 'Record not found in database.' });
		}

		// 2. Construct path using manually defined __dirname
		const filePath = path.join(
			__dirname,
			'../uploads/tax_records',
			record.fileName,
		);

		// 3. Check if file exists on disk
		if (!fs.existsSync(filePath)) {
			return res
				.status(404)
				.json({ message: 'Physical file missing from server.' });
		}

		// 4. Stream the download
		res.download(filePath, record.fileName);
	} catch (error) {
		res.status(500).json({
			message: 'Server error during download',
			error: error.message,
		});
	}
};
