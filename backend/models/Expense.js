/**
 * Expense Model for TransitOps Fleet Management System
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle is required'],
    },
    trip: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
    },
    category: {
      type: String,
      enum: ['Fuel', 'Maintenance', 'Toll', 'Parking', 'Repair', 'Miscellaneous'],
      required: [true, 'Expense category is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'INR', 'GBP'],
      default: 'INR',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    receiptNumber: String,
    vendor: String,
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      required: true,
    },
    rejectionReason: String,
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
ExpenseSchema.index({ vehicle: 1 });
ExpenseSchema.index({ trip: 1 });
ExpenseSchema.index({ category: 1 });
ExpenseSchema.index({ date: -1 });
ExpenseSchema.index({ status: 1 });
ExpenseSchema.index({ approvedBy: 1 });

// Static method to find expenses by vehicle
ExpenseSchema.statics.findByVehicle = async function (vehicleId) {
  return this.find({ vehicle: vehicleId }).sort({ date: -1 });
};

// Static method to find expenses by category
ExpenseSchema.statics.findByCategory = async function (category) {
  return this.find({ category }).sort({ date: -1 });
};

// Static method to find expenses by date range
ExpenseSchema.statics.findByDateRange = async function (startDate, endDate) {
  return this.find({ 
    date: { 
      $gte: startDate, 
      $lte: endDate 
    } 
  }).sort({ date: -1 });
};

// Pre-save middleware to validate status transitions
ExpenseSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    if (this.status === 'approved' && !this.approvedBy) {
      return next(new Error('Approved expenses must have an approver'));
    }
    if (this.status === 'rejected' && !this.rejectionReason) {
      return next(new Error('Rejected expenses must have a rejection reason'));
    }
  }
  next();
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;
