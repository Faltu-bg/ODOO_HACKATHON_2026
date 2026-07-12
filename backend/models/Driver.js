/**
 * Driver Model for TransitOps Fleet Management System
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const DriverSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Driver name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[+]?[\d\s-()]{10,}$/, 'Please provide a valid phone number'],
    },
    licenseNumber: {
      type: String,
      required: [true, 'License number is required'],
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z]{2}[0-9]{13}$/, 'Please provide a valid license number'],
    },
    licenseExpiry: {
      type: Date,
      required: [true, 'License expiry date is required'],
    },
    status: {
      type: String,
      enum: ['Available', 'On Trip', 'Off Duty', 'Suspended'],
      default: 'Available',
      required: true,
    },
    assignedVehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
    currentTrip: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
    },
    totalTrips: {
      type: Number,
      default: 0,
      min: [0, 'Total trips cannot be negative'],
    },
    totalDistance: {
      type: Number,
      default: 0,
      min: [0, 'Total distance cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    address: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      name: {
        type: String,
        required: [true, 'Emergency contact name is required'],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, 'Emergency contact phone is required'],
        trim: true,
        match: [/^[+]?[\d\s-()]{10,}$/, 'Please provide a valid phone number'],
      },
      relationship: {
        type: String,
        required: [true, 'Relationship is required'],
        trim: true,
      },
    },
    documents: {
      license: {
        type: String,
        required: [true, 'License document is required'],
      },
      aadhaar: String,
      pan: String,
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
DriverSchema.index({ status: 1 });
DriverSchema.index({ assignedVehicle: 1 });
DriverSchema.index({ currentTrip: 1 });
DriverSchema.index({ licenseExpiry: 1 });
DriverSchema.index({ rating: -1 });

// Static method to find driver by license number
DriverSchema.statics.findByLicenseNumber = async function (licenseNumber) {
  return this.findOne({ licenseNumber: licenseNumber.toUpperCase() });
};

// Static method to find available drivers
DriverSchema.statics.findAvailable = async function () {
  return this.find({ status: 'Available' });
};

// Static method to check for expired licenses
DriverSchema.statics.checkLicenseExpiry = async function () {
  const today = new Date();
  return this.find({ licenseExpiry: { $lt: today } });
};

// Virtual for license status
DriverSchema.virtual('isLicenseExpired').get(function () {
  return this.licenseExpiry < new Date();
});

// Virtual for license expiry in days
DriverSchema.virtual('licenseExpiryDays').get(function () {
  const today = new Date();
  const diffTime = this.licenseExpiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Pre-save middleware to uppercase license number
DriverSchema.pre('save', function (next) {
  if (this.licenseNumber) {
    this.licenseNumber = this.licenseNumber.toUpperCase();
  }
  next();
});

// Pre-save middleware to validate license expiry
DriverSchema.pre('save', function (next) {
  if (this.licenseExpiry && this.licenseExpiry < new Date()) {
    next(new Error('License has expired'));
  } else {
    next();
  }
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;
