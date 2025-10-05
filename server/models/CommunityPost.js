import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 5000
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['general', 'adoption-stories', 'pet-care', 'questions', 'reviews', 'events', 'lost-found'],
    default: 'general'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 20
  }],
  images: [{
    type: String // array of image URLs
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  isPinned: {
    type: Boolean,
    default: false
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: {
    type: Date
  }
}, { 
  timestamps: true 
});

// Index for better performance
communityPostSchema.index({ category: 1, createdAt: -1 });
communityPostSchema.index({ author: 1, createdAt: -1 });
communityPostSchema.index({ tags: 1 });

const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);
export default CommunityPost;
