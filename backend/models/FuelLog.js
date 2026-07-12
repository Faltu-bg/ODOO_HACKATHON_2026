/**
 * FuelLog Model for TransitOps Fleet Management System
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const FuelLogSchema = new Schema(
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
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      default: 'liters',
    },
    cost: {
      type: Number,
      required: [true, 'Cost is required'],
      min: [0, 'Cost cannot be negative'],
    },
    costPerUnit: {
      type: Number,
      required: [true, 'Cost per unit is required'],
      min: [0, 'Cost per unit cannot be negative'],
    },
    fuelType: {
      type: String,
      required: [true, 'Fuel type is required'],
      trim: true,
    },
    fuelingStation: String,
    odometerReading: {
      type: Number,
      required: [true, 'Odometer reading is required'],
      min: [0, 'Odometer reading cannot be negative'],
    },
    filledBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiptNumber: String,
    notes: String,
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
FuelLogSchema.index({ vehicle: 1 });
FuelLogSchema.index({ trip: 1 });
FuelLogSchema.index({ date: -1 });
FuelLogSchema.index({ fuelType: 1 });
FuelLogSchema.index({ filledBy: 1 });

// Static method to find fuel logs by vehicle
FuelLogSchema.statics.findByVehicle = async function (vehicleId) {
  return this.find({ vehicle: vehicleId }).sort({ date: -1 });
};

// Static method to find fuel logs by date range
FuelLogSchema.statics.findByDateRange = async function (startDate, endDate) {
  return this.find({ 
    date: { 
      $gte: startDate, 
      $lte: endDate 
    } 
  }).sort({ date: -1 });
};

// Virtual for fuel efficiency
FuelLogSchema.virtual('efficiency').get(function () {
  // This would need to be calculated based on previous odometer reading
  // For now, returning null
  return null;
});

const FuelLog = mongoose.model('FuelLog', FuelLogSchema);

module.exports = FuelLog;
