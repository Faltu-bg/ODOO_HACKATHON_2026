/**
 * Notification Model for TransitOps Fleet Management System
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    type: {
      type: String,
      enum: ['Info', 'Success', 'Warning', 'Error', 'Trip Assigned', 'Trip Completed', 'Maintenance Due', 'Vehicle Issue'],
      default: 'Info',
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    actionUrl: String,
    relatedEntity: {
      type: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
NotificationSchema.index({ user: 1 });
NotificationSchema.index({ isRead: 1 });
NotificationSchema.index({ type: 1 });
NotificationSchema.index({ createdAt: -1 });
NotificationSchema.index({ user: 1, isRead: 1 });

// Static method to find notifications by user
NotificationSchema.statics.findByUser = async function (userId) {
  return this.find({ user: userId }).sort({ createdAt: -1 });
};

// Static method to find unread notifications
NotificationSchema.statics.findUnread = async function (userId) {
  return this.find({ user: userId, isRead: false }).sort({ createdAt: -1 });
};

// Static method to mark notification as read
NotificationSchema.statics.markAsRead = async function (notificationId) {
  return this.findByIdAndUpdate(
    notificationId,
    { isRead: true, readAt: new Date() },
    { new: true }
  );
};

// Pre-save middleware to set readAt when marking as read
NotificationSchema.pre('save', function (next) {
  if (this.isModified('isRead') && this.isRead && !this.readAt) {
    this.readAt = new Date();
  }
  next();
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
