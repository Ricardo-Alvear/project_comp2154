import mongoose from 'mongoose';

const TaxRecordSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true }, // e.g., "TX-2025-001"
	year: String,
	type: String,
	status: String,
	fileName: String, // e.g., "t5_2025.pdf"
});

export default mongoose.model('TaxRecord', TaxRecordSchema);
