/**
 * Maintenance Model for TransitOps Fleet Management System
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const MaintenanceSchema = new Schema(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle is required'],
    },
    type: {
      type: String,
      enum: ['Routine', 'Repair', 'Inspection', 'Emergency'],
      required: [true, 'Maintenance type is required'],
    },
    status: {
      type: String,
      enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled',
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: [true, 'Scheduled date is required'],
    },
    completedDate: Date,
    cost: {
      type: Number,
      required: [true, 'Cost is required'],
      min: [0, 'Cost cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    serviceCenter: String,
    mechanic: String,
    partsReplaced: [String],
    odometerReading: {
      type: Number,
      min: [0, 'Odometer reading cannot be negative'],
    },
    nextServiceDate: Date,
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
MaintenanceSchema.index({ vehicle: 1 });
MaintenanceSchema.index({ status: 1 });
MaintenanceSchema.index({ scheduledDate: 1 });
MaintenanceSchema.index({ nextServiceDate: 1 });
MaintenanceSchema.index({ performedBy: 1 });

// Static method to find maintenance by vehicle
MaintenanceSchema.statics.findByVehicle = async function (vehicleId) {
  return this.find({ vehicle: vehicleId }).sort({ scheduledDate: -1 });
};

// Static method to find scheduled maintenance
MaintenanceSchema.statics.findScheduled = async function () {
  return this.find({ status: 'Scheduled' }).sort({ scheduledDate: 1 });
};

// Static method to find overdue maintenance
MaintenanceSchema.statics.findOverdue = async function () {
  const today = new Date();
  return this.find({ 
    status: 'Scheduled',
    scheduledDate: { $lt: today }
  });
};

// Virtual for maintenance duration
MaintenanceSchema.virtual('duration').get(function () {
  if (this.completedDate && this.scheduledDate) {
    return Math.floor((this.completedDate.getTime() - this.scheduledDate.getTime()) / (1000 * 60 * 60 * 24)); // days
  }
  return null;
});

// Pre-save middleware to set completed date when status changes to completed
MaintenanceSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'Completed' && !this.completedDate) {
    this.completedDate = new Date();
  }
  next();
});

const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);

module.exports = Maintenance;
