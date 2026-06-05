import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
    index: true,
  },
  durationMinutes: {
    type: Number,
    default: 45,
    required: true,
  },
  status: {
    type: String,
    enum: ['locked', 'confirmed', 'completed', 'canceled', 'no_show'],
    default: 'locked',
    required: true,
    index: true,
  },
  symptomsDescription: {
    type: String,
    trim: true,
  },
  lockExpiresAt: {
    type: Date, // For temporary Redis-like locking triggers
  }
}, {
  timestamps: true,
});

// Composite Index for slot verification
appointmentSchema.index({ doctorId: 1, scheduledTime: 1 });

const consultationSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
    unique: true,
  },
  webrtcChannelName: {
    type: String,
    required: true,
  },
  startedAt: {
    type: Date,
  },
  endedAt: {
    type: Date,
  },
  durationSeconds: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['scheduled', 'active', 'completed', 'interrupted'],
    default: 'scheduled',
    required: true,
  },
  // Encrypted observations details (AES-256)
  encryptedNotes: {
    type: String,
  },
  // Chat Logs Encrypted String
  encryptedChatHistory: {
    type: String,
  }
}, {
  timestamps: true,
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
export const Consultation = mongoose.model('Consultation', consultationSchema);
