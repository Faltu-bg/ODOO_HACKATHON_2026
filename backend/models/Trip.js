/**
 * Trip Model for TransitOps Fleet Management System
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const TripSchema = new Schema(
  {
    tripId: {
      type: String,
      required: [true, 'Trip ID is required'],
      unique: true,
      trim: true,
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle is required'],
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: [true, 'Driver is required'],
    },
    status: {
      type: String,
      enum: ['Draft', 'Dispatched', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Draft',
      required: true,
    },
    origin: {
      address: {
        type: String,
        required: [true, 'Origin address is required'],
        trim: true,
      },
      coordinates: {
        type: [Number],
        default: undefined,
      },
      landmark: String,
    },
    destination: {
      address: {
        type: String,
        required: [true, 'Destination address is required'],
        trim: true,
      },
      coordinates: {
        type: [Number],
        default: undefined,
      },
      landmark: String,
    },
    scheduledStartTime: {
      type: Date,
      required: [true, 'Scheduled start time is required'],
    },
    scheduledEndTime: {
      type: Date,
      required: [true, 'Scheduled end time is required'],
    },
    actualStartTime: Date,
    actualEndTime: Date,
    dispatchTime: Date,
    completedTime: Date,
    distance: {
      type: Number,
      required: [true, 'Distance is required'],
      min: [0, 'Distance cannot be negative'],
    },
    cargoWeight: {
      type: Number,
      min: [0, 'Cargo weight cannot be negative'],
    },
    cargoType: String,
    passengerCount: {
      type: Number,
      min: [0, 'Passenger count cannot be negative'],
    },
    estimatedCost: {
      type: Number,
      required: [true, 'Estimated cost is required'],
      min: [0, 'Estimated cost cannot be negative'],
    },
    actualCost: {
      type: Number,
      min: [0, 'Actual cost cannot be negative'],
    },
    notes: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    assignedBy: {
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
TripSchema.index({ vehicle: 1 });
TripSchema.index({ driver: 1 });
TripSchema.index({ status: 1 });
TripSchema.index({ scheduledStartTime: 1 });
TripSchema.index({ assignedBy: 1 });
TripSchema.index({ 'origin.coordinates': '2dsphere' });
TripSchema.index({ 'destination.coordinates': '2dsphere' });

// Static method to find trip by trip ID
TripSchema.statics.findByTripId = async function (tripId) {
  return this.findOne({ tripId });
};

// Static method to find active trips
TripSchema.statics.findActiveTrips = async function () {
  return this.find({ status: { $in: ['Dispatched', 'In Progress'] } });
};

// Static method to find trips by vehicle
TripSchema.statics.findByVehicle = async function (vehicleId) {
  return this.find({ vehicle: vehicleId });
};

// Static method to find trips by driver
TripSchema.statics.findByDriver = async function (driverId) {
  return this.find({ driver: driverId });
};

// Virtual for trip duration
TripSchema.virtual('duration').get(function () {
  const start = this.actualStartTime || this.scheduledStartTime;
  const end = this.actualEndTime || this.scheduledEndTime;
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60)); // hours
});

// Virtual for trip delay status
TripSchema.virtual('isDelayed').get(function () {
  if (this.status === 'Completed') {
    return this.actualEndTime > this.scheduledEndTime;
  }
  return false;
});

// Pre-save middleware to set dispatch time when status changes to dispatched
TripSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'Dispatched' && !this.dispatchTime) {
    this.dispatchTime = new Date();
  }
  if (this.isModified('status') && this.status === 'In Progress' && !this.actualStartTime) {
    this.actualStartTime = new Date();
  }
  if (this.isModified('status') && this.status === 'Completed' && !this.completedTime) {
    this.completedTime = new Date();
    if (!this.actualEndTime) {
      this.actualEndTime = new Date();
    }
  }
  next();
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
