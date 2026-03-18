import express from 'express';
const router = express.Router();
import {
	getAllNotifications,
	createNotification,
	deleteNotification,
	updateNotification,
} from '../controllers/notificationsControllers.js';

router.route('/').get(getAllNotifications).post(createNotification);
router.route('/:id').delete(deleteNotification).patch(updateNotification);

export default router;
