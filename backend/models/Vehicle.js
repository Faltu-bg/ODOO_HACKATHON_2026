/**
 * Vehicle Model for TransitOps Fleet Management System
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehicleSchema = new Schema(
  {
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/, 'Please provide a valid vehicle registration number'],
    },
    name: {
      type: String,
      required: [true, 'Vehicle name is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Vehicle model is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Car', 'Van', 'SUV', 'Truck', 'Bus'],
      required: [true, 'Vehicle type is required'],
    },
    capacity: {
      type: Number,
      required: [true, 'Vehicle capacity is required'],
      min: [1, 'Capacity must be at least 1'],
    },
    odometer: {
      type: Number,
      required: [true, 'Odometer reading is required'],
      default: 0,
      min: [0, 'Odometer cannot be negative'],
    },
    acquisitionCost: {
      type: Number,
      required: [true, 'Acquisition cost is required'],
      min: [0, 'Acquisition cost cannot be negative'],
    },
    status: {
      type: String,
      enum: ['Available', 'On Trip', 'In Shop', 'Retired'],
      default: 'Available',
      required: true,
    },
    fuelType: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
      min: [1900, 'Year must be at least 1900'],
      max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
    },
    color: {
      type: String,
      trim: true,
    },
    vin: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      match: [/^[A-HJ-NPR-Z0-9]{17}$/, 'Please provide a valid VIN'],
    },
    insuranceExpiry: {
      type: Date,
    },
    lastServiceDate: {
      type: Date,
    },
    nextServiceDate: {
      type: Date,
    },
    currentLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: String,
    },
    assignedDriver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
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
VehicleSchema.index({ registrationNumber: 1 });
VehicleSchema.index({ status: 1 });
VehicleSchema.index({ type: 1 });
VehicleSchema.index({ assignedDriver: 1 });
VehicleSchema.index({ currentLocation: '2dsphere' });
VehicleSchema.index({ nextServiceDate: 1 });
VehicleSchema.index({ insuranceExpiry: 1 });

// Static method to find vehicle by registration number
VehicleSchema.statics.findByRegistrationNumber = async function (registrationNumber) {
  return this.findOne({ registrationNumber: registrationNumber.toUpperCase() });
};

// Static method to find available vehicles
VehicleSchema.statics.findAvailable = async function () {
  return this.find({ status: 'Available' });
};

// Virtual for vehicle age
VehicleSchema.virtual('age').get(function () {
  const currentYear = new Date().getFullYear();
  return this.year ? currentYear - this.year : 0;
});

// Virtual for service status
VehicleSchema.virtual('isServiceDue').get(function () {
  if (!this.nextServiceDate) return false;
  return this.nextServiceDate <= new Date();
});

// Pre-save middleware to uppercase registration number
VehicleSchema.pre('save', function (next) {
  if (this.registrationNumber) {
    this.registrationNumber = this.registrationNumber.toUpperCase();
  }
  next();
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
