/**
 * TripTimeline Model for TransitOps Fleet Management System
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const TripTimelineSchema = new Schema(
  {
    trip: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: [true, 'Trip is required'],
    },
    status: {
      type: String,
      enum: ['Draft', 'Dispatched', 'In Progress', 'Completed', 'Cancelled'],
      required: [true, 'Status is required'],
    },
    remarks: String,
    location: {
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
    createdBy: {
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
TripTimelineSchema.index({ trip: 1 });
TripTimelineSchema.index({ status: 1 });
TripTimelineSchema.index({ createdAt: -1 });
TripTimelineSchema.index({ location: '2dsphere' });

// Static method to find timeline by trip
TripTimelineSchema.statics.findByTrip = async function (tripId) {
  return this.find({ trip: tripId }).sort({ createdAt: 1 });
};

const TripTimeline = mongoose.model('TripTimeline', TripTimelineSchema);

module.exports = TripTimeline;
