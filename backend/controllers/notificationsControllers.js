import Notification from '../models/Notification.js';

// GET all notifications
export const getAllNotifications = async (req, res) => {
	const notifications = await Notification.find({}).sort('-createdAt');
	res.status(200).json({ notifications, count: notifications.length });
};

export const createNotification = async (req, res) => {
    const notification = await Notification.create(req.body);
    res.status(201).json({ notification });
};

// DELETE notification
export const deleteNotification = async (req, res) => {
	const { id } = req.params;
	const notification = await Notification.findByIdAndDelete(id);
	if (!notification) {
		return res.status(404).json({ msg: `No notification with id ${id}` });
	}
	res.status(200).json({ msg: 'Deleted successfully' });
};

// UPDATE notification
export const updateNotification = async (req, res) => {
	const { id } = req.params;
	const notification = await Notification.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ notification });
};
