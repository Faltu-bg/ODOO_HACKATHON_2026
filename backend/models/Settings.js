/**
 * Settings Model for TransitOps Fleet Management System
 * Singleton collection - only one document should exist
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const SettingsSchema = new Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      default: 'TransitOps',
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'INR', 'GBP'],
      default: 'INR',
      required: true,
    },
    distanceUnit: {
      type: String,
      enum: ['km', 'miles'],
      default: 'km',
      required: true,
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'light',
      required: true,
    },
    logo: String,
    timezone: {
      type: String,
      required: [true, 'Timezone is required'],
      default: 'Asia/Kolkata',
    },
    dateFormat: {
      type: String,
      required: [true, 'Date format is required'],
      default: 'DD/MM/YYYY',
    },
    timeFormat: {
      type: String,
      enum: ['12h', '24h'],
      default: '24h',
      required: true,
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
      default: 'en',
    },
    notificationSettings: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
    },
    maintenanceSettings: {
      reminderDays: {
        type: Number,
        default: 7,
        min: [1, 'Reminder days must be at least 1'],
      },
      autoSchedule: {
        type: Boolean,
        default: false,
      },
    },
    tripSettings: {
      autoDispatch: {
        type: Boolean,
        default: false,
      },
      requireApproval: {
        type: Boolean,
        default: true,
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

// Indexes - ensure only one document exists
SettingsSchema.index({}, { unique: true });

// Static method to get settings
SettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

// Static method to update settings
SettingsSchema.statics.updateSettings = async function (data) {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create(data);
  } else {
    settings = await this.findOneAndUpdate({}, data, { new: true, runValidators: true });
  }
  return settings;
};

const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = Settings;
