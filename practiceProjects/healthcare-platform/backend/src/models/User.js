import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: 'patient',
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emailAlerts: {
    type: Boolean,
    default: true,
  },
  smsAlerts: {
    type: Boolean,
    default: true,
  },
  pushAlerts: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const availabilityIntervalSchema = new mongoose.Schema({
  start: { type: String, required: true }, // Format HH:MM
  end: { type: String, required: true },   // Format HH:MM
  start_utc: { type: String },
  end_utc: { type: String }
}, { _id: false });

const weeklyHoursSchema = new mongoose.Schema({
  day_of_week: { type: Number, required: true }, // 1 (Mon) - 7 (Sun)
  is_active: { type: Boolean, default: true },
  intervals: [availabilityIntervalSchema]
}, { _id: false });

const doctorDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialty: { type: String, required: true, index: true },
  licenseNumber: { type: String, required: true, unique: true },
  licenseState: { type: String, required: true },
  licenseExpiry: { type: Date, required: true },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
    required: true,
    index: true,
  },
  consultationFee: { type: Number, required: true },
  ratingAverage: { type: Number, default: 0.0 },
  reviewCount: { type: Number, default: 0 },
  languages: [{ type: String }],
  clinicAddress: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true, index: true },
  },
  availabilitySettings: {
    slot_duration_minutes: { type: Number, default: 30 },
    weekly_hours: [weeklyHoursSchema]
  }
}, {
  timestamps: true,
});

// Composite Index for search queries
doctorDetailsSchema.index({ verificationStatus: 1, consultationFee: 1 });

export const User = mongoose.model('User', userSchema);
export const DoctorDetails = mongoose.model('DoctorDetails', doctorDetailsSchema);
