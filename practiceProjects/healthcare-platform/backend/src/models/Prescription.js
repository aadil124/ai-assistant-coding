import mongoose from 'mongoose';

const medicationItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  durationDays: { type: Number, required: true },
  refills: { type: Number, default: 0 }
}, { _id: false });

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
    unique: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  diagnosis: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['draft', 'signed_and_issued', 'revoked'],
    default: 'draft',
    required: true,
  },
  medications: [medicationItemSchema],
  signatureHash: {
    type: String, // Cryptographic hash signed by doctor
  },
  signedAt: {
    type: Date,
  }
}, {
  timestamps: true,
});

export const Prescription = mongoose.model('Prescription', prescriptionSchema);
