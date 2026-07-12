/**
 * ActivityLog Model for TransitOps Fleet Management System
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActivityLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    module: {
      type: String,
      enum: ['Users', 'Roles', 'Vehicles', 'Drivers', 'Trips', 'Maintenance', 'Fuel', 'Expenses', 'Settings'],
      required: [true, 'Module is required'],
    },
    action: {
      type: String,
      enum: ['Create', 'Update', 'Delete', 'View', 'Login', 'Logout', 'Export', 'Import'],
      required: [true, 'Action is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    ipAddress: String,
    userAgent: String,
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
ActivityLogSchema.index({ user: 1 });
ActivityLogSchema.index({ module: 1 });
ActivityLogSchema.index({ action: 1 });
ActivityLogSchema.index({ createdAt: -1 });
ActivityLogSchema.index({ user: 1, createdAt: -1 });

// Static method to find activity logs by user
ActivityLogSchema.statics.findByUser = async function (userId) {
  return this.find({ user: userId }).sort({ createdAt: -1 });
};

// Static method to find activity logs by module
ActivityLogSchema.statics.findByModule = async function (module) {
  return this.find({ module }).sort({ createdAt: -1 });
};

// Static method to find activity logs by date range
ActivityLogSchema.statics.findByDateRange = async function (startDate, endDate) {
  return this.find({ 
    createdAt: { 
      $gte: startDate, 
      $lte: endDate 
    } 
  }).sort({ createdAt: -1 });
};

const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);

module.exports = ActivityLog;
