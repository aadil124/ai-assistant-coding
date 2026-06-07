import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      return ret;
    }
  }
});

const PostSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
    index: true
  },
  caption: {
    type: String,
    required: [true, 'Caption content is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PENDING_REVIEW', 'APPROVED', 'PUBLISHED', 'FAILED'],
    default: 'DRAFT'
  },
  scheduledTime: {
    type: Date,
    required: [true, 'Scheduled time is required']
  },
  publishedTime: {
    type: Date
  },
  platforms: [{
    type: String,
    enum: ['instagram', 'linkedin', 'twitter', 'facebook']
  }],
  media: [{
    type: String
  }],
  author: {
    type: String,
    required: true
  },
  authorAvatar: {
    type: String,
    default: ''
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [CommentSchema],
  errorLog: {
    type: String
  }
}, {
  timestamps: true
});

// Configure toJSON to convert _id to id and remove __v
PostSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
