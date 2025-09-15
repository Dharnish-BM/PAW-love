import asyncHandler from "express-async-handler";
import Notification from "../models/Notification.js";

// Get user's notifications
// GET /api/notifications
// Access: logged-in users
export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.json(notifications);
});

// Mark notification as read
// PUT /api/notifications/:id/read
// Access: logged-in users
export const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findOne({
    _id: id,
    user: req.user._id
  });

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  notification.read = true;
  await notification.save();

  res.json({ message: "Notification marked as read" });
});

// Mark all notifications as read
// PUT /api/notifications/mark-all-read
// Access: logged-in users
export const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { user: req.user._id, read: false },
    { read: true }
  );

  res.json({ message: "All notifications marked as read" });
});

// Delete notification
// DELETE /api/notifications/:id
// Access: logged-in users
export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findOne({
    _id: id,
    user: req.user._id
  });

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  await Notification.findByIdAndDelete(id);

  res.json({ message: "Notification deleted" });
});

// Get unread count
// GET /api/notifications/unread-count
// Access: logged-in users
export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.countDocuments({
    user: req.user._id,
    read: false
  });

  res.json({ count });
});
