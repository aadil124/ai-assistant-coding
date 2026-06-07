import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'EDITOR', 'APPROVER', 'VIEW_CLIENT'],
    default: 'EDITOR'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'PENDING'],
    default: 'ACTIVE'
  }
}, { _id: false });

const SocialChannelSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['instagram', 'linkedin', 'twitter', 'facebook'],
    required: true
  },
  platformUserId: {
    type: String,
    required: true
  },
  platformUsername: {
    type: String,
    required: true
  },
  encryptedAccessToken: {
    type: String,
    required: true
  },
  encryptedRefreshToken: {
    type: String
  },
  tokenExpiresAt: {
    type: Date
  }
}, { _id: true, timestamps: true });

const WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Workspace name is required'],
    trim: true
  },
  plan: {
    type: String,
    enum: ['Free Trial', 'Growth Plan', 'Enterprise Plan'],
    default: 'Growth Plan'
  },
  members: [MemberSchema],
  channels: [SocialChannelSchema],
  aiQuotaUsed: {
    type: Number,
    default: 0
  },
  aiQuotaLimit: {
    type: Number,
    default: 50000
  }
}, {
  timestamps: true
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);
export default Workspace;
