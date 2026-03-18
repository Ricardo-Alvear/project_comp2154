import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String }, // Optional
	deadline: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Notification', NotificationSchema);
