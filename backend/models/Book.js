import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'The author is required'],
			trim: true,
		},
		author: {
			type: String,
			enum: {
				values: ['Orwell', 'Tolkien'],
				message: '{VALUE} is invalid',
			},
			required: [true, 'The author is required'],
			trim: true,
		},
		pages: {
			type: Number,
			required: [true, 'The page number is required'],
			trim: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model('Book', bookSchema);
