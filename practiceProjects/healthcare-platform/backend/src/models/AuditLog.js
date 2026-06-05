import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  actorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  actionType: {
    type: String,
    required: true,
    index: true,
  },
  resourceId: {
    type: String,
    required: true,
    index: true,
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
  },
  clientIp: {
    type: String,
  }
}, {
  timestamps: { createdAt: true, updatedAt: false } // Immutable logs (no updates)
});

// Enforce read-only logic on document updates
auditLogSchema.pre('save', function (next) {
  if (!this.isNew) {
    return next(new Error('Audit logs are immutable and cannot be updated.'));
  }
  next();
});

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
