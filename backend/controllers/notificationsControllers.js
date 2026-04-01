import Notification from "../models/Notification.js";

// GET all notifications (filtered by the logged-in user)
export const getAllNotifications = async (req, res) => {
  try {
    // Only fetch notifications created by the authenticated user
    const notifications = await Notification.find({
      createdBy: req.user.id,
    }).sort("-createdAt");
    res.status(200).json({ notifications, count: notifications.length });
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    res.status(500).json({ msg: "Failed to retrieve records" });
  }
};

// CREATE notification
export const createNotification = async (req, res) => {
  try {
    // Attach the user ID from the JWT token to the notification
    const notificationData = { ...req.body, createdBy: req.user.id };
    const notification = await Notification.create(notificationData);
    res.status(201).json({ notification });
  } catch (error) {
    console.error("Create Notification Error:", error);
    res.status(400).json({ msg: "Invalid notification data provided" });
  }
};

// DELETE notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the notification exists AND belongs to the user
    const notification = await Notification.findOneAndDelete({
      _id: id,
      createdBy: req.user.id,
    });

    if (!notification) {
      return res
        .status(404)
        .json({ msg: `No notification found with id ${id}` });
    }
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    console.error("Delete Notification Error:", error);
    res.status(500).json({ msg: "Server error during deletion" });
  }
};

// UPDATE notification
export const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!notification) {
      return res
        .status(404)
        .json({ msg: `Access denied or notification ${id} not found` });
    }
    res.status(200).json({ notification });
  } catch (error) {
    console.error("Update Notification Error:", error);
    res.status(400).json({ msg: "Update failed. Check your request body" });
  }
};
