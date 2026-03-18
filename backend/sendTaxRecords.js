import mongoose from 'mongoose';
import TaxRecord from './models/TaxRecord.js';
import 'dotenv/config';

const seedDB = async () => {
	await mongoose.connect(process.env.MONGO_URI);

	// Create a record that matches your frontend ID
	await TaxRecord.create({
		id: 'TX-2025-001',
		year: '2025',
		type: 'Annual Return',
		status: 'Verified',
		fileName: 't5_2025.pdf', 
	});

	console.log('Database seeded!');
	process.exit();
};

seedDB();
